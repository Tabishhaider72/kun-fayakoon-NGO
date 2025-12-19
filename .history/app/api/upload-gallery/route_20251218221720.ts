import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabase, SUPABASE_BUCKET } from "@/lib/supabase";
import { saveGalleryMetadata } from "@/lib/gallery-actions";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const maxSize = 500 * 1024; // 500 KB

    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Accepted: JPEG, PNG, WebP, GIF" },
        { status: 400 }
      );
    }

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size exceeds 500 KB limit` },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate storage path (path within bucket)
    const timestamp = Date.now();
    const fileName = file.name.replace(/\s+/g, "-");
    const storagePath = `${timestamp}_${fileName}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(SUPABASE_BUCKET)
      .upload(storagePath, buffer, { contentType: file.type });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get public URL (depends on bucket policy; adjust if using signed URLs)
    const { data: urlData } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(storagePath);
    const downloadUrl = urlData?.publicUrl || "";

    // Save metadata to database via server action. If DB insert fails (for
    // example due to RLS), delete the uploaded file to keep storage and DB
    // in sync.
    let result;
    try {
      result = await saveGalleryMetadata(downloadUrl, storagePath, title, subtitle);
    } catch (dbError) {
      console.error("DB insert failed, attempting to rollback storage upload:", dbError);
      try {
        const { error: removeError } = await supabase.storage
          .from(SUPABASE_BUCKET)
          .remove([storagePath]);
        if (removeError) console.warn("Failed to remove uploaded file during rollback:", removeError.message);
      } catch (removeEx) {
        console.error("Error while attempting to remove uploaded file:", removeEx);
      }

      // Surface the original DB error to the client (do not leak sensitive
      // details in production - consider mapping to a safer message).
      return NextResponse.json(
        { error: dbError instanceof Error ? dbError.message : "Failed to save metadata" },
        { status: 500 }
      );
    }

    try {
      // Revalidate the gallery page so UI reflects the new item immediately
      revalidatePath("/gallery");
    } catch (revalErr) {
      console.warn("Revalidate path failed:", revalErr);
    }

    return NextResponse.json({ success: true, id: result.id, imageUrl: result.imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to upload image",
      },
      { status: 500 }
    );
  }
}

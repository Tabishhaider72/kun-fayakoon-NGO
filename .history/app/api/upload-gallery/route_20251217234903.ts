import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { saveGalleryMetadata } from "@/lib/gallery-actions";
import { NextRequest, NextResponse } from "next/server";

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

    // Generate storage path
    const timestamp = Date.now();
    const fileName = file.name.replace(/\s+/g, "-");
    const storagePath = `gallery/${timestamp}_${fileName}`;

    // Upload to Firebase Storage
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, buffer, {
      contentType: file.type,
    });

    // Get download URL
    const downloadUrl = await getDownloadURL(storageRef);

    // Save metadata to Firestore via server action
    const result = await saveGalleryMetadata(
      downloadUrl,
      storagePath,
      title,
      subtitle
    );

    return NextResponse.json({
      success: true,
      id: result.id,
      imageUrl: result.imageUrl,
    });
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

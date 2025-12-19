import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { supabaseAdmin, SUPABASE_BUCKET } from "@/lib/supabase";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  try {
    const record = await prisma.gallery.findUnique({ where: { id } });
    if (!record) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Remove from storage
    try {
      const { error } = await supabaseAdmin.storage.from(SUPABASE_BUCKET).remove([record.storagePath]);
      if (error) console.warn("Supabase remove warning:", error.message);
    } catch (err) {
      console.warn("Error removing from Supabase:", err);
    }

    await prisma.gallery.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

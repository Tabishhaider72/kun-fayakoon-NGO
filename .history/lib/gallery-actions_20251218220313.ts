"use server";

import prisma from "./prisma";
import { supabase, SUPABASE_BUCKET } from "./supabase";

interface GalleryRecord {
  id: string;
  title: string;
  subtitle?: string | null;
  imageUrl: string;
  storagePath: string;
  createdAt: Date;
}

/**
 * Verify admin privileges - customize based on your auth method
 * This example checks for a simple environment secret.
 */
async function verifyAdminAuth(): Promise<boolean> {
  try {
    const adminSecret = process.env.ADMIN_SECRET_KEY;
    return !!adminSecret;
  } catch (error) {
    console.error("Error verifying admin auth:", error);
    return false;
  }
}

/**
 * Save gallery metadata to Prisma (Postgres)
 */
export async function saveGalleryMetadata(
  imageUrl: string,
  storagePath: string,
  title: string,
  subtitle?: string
): Promise<{ id: string; imageUrl: string }> {
  const isAdmin = await verifyAdminAuth();
  if (!isAdmin) throw new Error("Unauthorized: Admin access required");

  try {
    // Prefer calling a SECURITY DEFINER Postgres function which inserts while
    // bypassing row-level-security for server-side trusted operations.
    // If the function doesn't exist or is not usable, fall back to Prisma create.
    try {
      // The SQL function `public.insert_gallery_metadata` should be created
      // in the database (see project README or migration). It must return
      // a row with `id` and `imageUrl`.
      const rows: Array<{ id: string; imageurl: string }> = (await prisma.$queryRaw`
        SELECT id, "imageUrl" as imageurl
        FROM public.insert_gallery_metadata(${title}, ${subtitle}, ${imageUrl}, ${storagePath})
      `) as any;

      if (rows && rows.length > 0) {
        return { id: rows[0].id, imageUrl: rows[0].imageurl };
      }
    } catch (fnError: any) {
      // If the function doesn't exist or permission denied, we'll log and fall
      // back to using Prisma's ORM insert. Important RLS errors will propagate
      // if Prisma itself can't insert due to policies.
      const msg = fnError?.message || String(fnError);
      console.warn("insert_gallery_metadata function call failed, falling back to Prisma:", msg);
    }

    // Fallback: regular Prisma insert (may fail if RLS blocks it)
    const created = await prisma.gallery.create({
      data: {
        title,
        subtitle,
        imageUrl,
        storagePath,
      },
    });

    return { id: created.id, imageUrl: created.imageUrl };
  } catch (error) {
    console.error("Error saving gallery metadata:", error);
    throw error instanceof Error ? error : new Error("Failed to save gallery metadata");
  }
}

/**
 * Delete gallery image from Supabase Storage and remove DB record
 */
export async function deleteGalleryImageServer(id: string): Promise<void> {
  const isAdmin = await verifyAdminAuth();
  if (!isAdmin) throw new Error("Unauthorized: Admin access required");

  try {
    const record = await prisma.gallery.findUnique({ where: { id } });
    if (!record) {
      console.warn(`Gallery image with ID ${id} not found`);
      return;
    }

    // Attempt to remove from Supabase Storage
    try {
      const { error } = await supabase.storage.from(SUPABASE_BUCKET).remove([record.storagePath]);
      if (error) {
        // If file not found, log and continue
        if (error.message && !error.message.includes("not found")) {
          console.warn("Supabase storage removal warning:", error.message);
        }
      }
    } catch (storageError) {
      console.warn("Error removing file from Supabase storage:", storageError);
    }

    // Delete DB record
    await prisma.gallery.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    throw error instanceof Error ? error : new Error("Failed to delete gallery image");
  }
}

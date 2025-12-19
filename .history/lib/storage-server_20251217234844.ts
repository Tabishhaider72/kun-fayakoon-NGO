"use server";

import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Server-side file upload to Firebase Storage
 * Bypasses CORS issues completely by handling upload on the server
 */
export async function uploadFileToStorage(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<{ downloadUrl: string; storagePath: string }> {
  try {
    // Generate storage path: gallery/{timestamp}_{originalFileName}
    const timestamp = Date.now();
    const cleanFileName = fileName.replace(/\s+/g, "-");
    const storagePath = `gallery/${timestamp}_${cleanFileName}`;

    // Create storage reference
    const storageRef = ref(storage, storagePath);

    // Create a blob-like object from buffer
    const metadata = { contentType: mimeType };

    // Upload to Firebase Storage
    await uploadBytes(storageRef, fileBuffer, metadata);

    // Get download URL
    const downloadUrl = await getDownloadURL(storageRef);

    return {
      downloadUrl,
      storagePath,
    };
  } catch (error) {
    console.error("Error uploading file to storage:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to upload file to storage");
  }
}

/**
 * Server-side file deletion from Firebase Storage
 */
export async function deleteFileFromStorage(storagePath: string): Promise<void> {
  try {
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
  } catch (error: any) {
    // Gracefully handle if file doesn't exist
    if (error.code !== "storage/object-not-found") {
      throw error;
    }
    console.warn(`Storage file ${storagePath} not found`);
  }
}

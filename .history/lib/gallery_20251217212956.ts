import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "./firebase";

export interface GalleryImage {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

interface FirestoreGalleryDoc {
  title: string;
  subtitle: string;
  imageUrl: string;
  storagePath: string;
  createdAt: any;
}

/**
 * Validates if a file is a valid image and meets size requirements
 */
function validateImageFile(file: File): { valid: boolean; error?: string } {
  const VALID_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const MAX_SIZE = 500 * 1024; // 500 KB

  if (!VALID_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Accepted formats: JPEG, PNG, WebP, GIF`,
    };
  }

  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      error: `File size exceeds 500 KB limit. Current size: ${(file.size / 1024).toFixed(2)} KB`,
    };
  }

  return { valid: true };
}

/**
 * Uploads a gallery image to Firebase Storage and saves metadata to Firestore
 */
export async function uploadGalleryImage(
  file: File,
  title: string,
  subtitle: string
): Promise<{ id: string; imageUrl: string }> {
  try {
    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Generate storage path: gallery/{timestamp}_{originalFileName}
    const timestamp = Date.now();
    const originalFileName = file.name.replace(/\s+/g, "-");
    const storagePath = `gallery/${timestamp}_${originalFileName}`;

    // Upload image to Firebase Storage
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, file);

    // Get download URL
    const imageUrl = await getDownloadURL(storageRef);

    // Save metadata to Firestore
    const galleryRef = collection(db, "gallery");
    const docRef = await addDoc(galleryRef, {
      title,
      subtitle,
      imageUrl,
      storagePath,
      createdAt: serverTimestamp(),
    } as FirestoreGalleryDoc);

    return {
      id: docRef.id,
      imageUrl,
    };
  } catch (error) {
    console.error("Error uploading gallery image:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to upload gallery image");
  }
}

/**
 * Fetches all gallery images from Firestore, ordered by creation date (newest first)
 */
export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const galleryRef = collection(db, "gallery");
    const q = query(galleryRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data() as FirestoreGalleryDoc;
      return {
        id: doc.id,
        title: data.title,
        subtitle: data.subtitle,
        image: data.imageUrl,
      };
    });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to fetch gallery images");
  }
}

/**
 * Deletes a gallery image from Storage and removes its document from Firestore
 */
export async function deleteGalleryImage(id: string): Promise<void> {
  try {
    // Fetch the document to get storage path
    const docRef = doc(db, "gallery", id);
    const docSnapshot = await getDocs(collection(db, "gallery"));
    const galleryDoc = docSnapshot.docs.find((d) => d.id === id);

    if (!galleryDoc) {
      console.warn(`Gallery image with ID ${id} not found`);
      return;
    }

    const data = galleryDoc.data() as FirestoreGalleryDoc;
    const storagePath = data.storagePath;

    // Delete image from Firebase Storage
    const storageRef = ref(storage, storagePath);
    try {
      await deleteObject(storageRef);
    } catch (storageError: any) {
      // Gracefully handle if file doesn't exist in storage
      if (storageError.code !== "storage/object-not-found") {
        throw storageError;
      }
      console.warn(`Storage file ${storagePath} not found, continuing...`);
    }

    // Delete Firestore document
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to delete gallery image");
  }
}

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
import { ref, uploadBytes, getDownloadURL, deleteObject, UploadTask } from "firebase/storage";
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

export interface ImageDimensions {
  width: number;
  height: number;
}

const MIN_WIDTH = 400;
const MAX_WIDTH = 4000;
const MIN_HEIGHT = 300;
const MAX_HEIGHT = 4000;

/**
 * Gets image dimensions from a File object
 */
function getImageDimensions(file: File): Promise<ImageDimensions> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        reject(new Error("Failed to load image dimensions"));
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Validates if a file is a valid image and meets size/dimension requirements
 */
async function validateImageFile(file: File): Promise<{ valid: boolean; error?: string }> {
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

  try {
    const dimensions = await getImageDimensions(file);
    
    if (dimensions.width < MIN_WIDTH || dimensions.width > MAX_WIDTH) {
      return {
        valid: false,
        error: `Image width must be between ${MIN_WIDTH}px and ${MAX_WIDTH}px. Current: ${dimensions.width}px`,
      };
    }

    if (dimensions.height < MIN_HEIGHT || dimensions.height > MAX_HEIGHT) {
      return {
        valid: false,
        error: `Image height must be between ${MIN_HEIGHT}px and ${MAX_HEIGHT}px. Current: ${dimensions.height}px`,
      };
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: `Failed to validate image dimensions: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * Uploads a gallery image to Firebase Storage with progress tracking
 * Returns task object for monitoring progress
 * Client-side only (uploads/deletes handled by server actions for auth)
 */
export function uploadGalleryImageClient(
  file: File,
  title: string,
  subtitle: string,
  onProgress?: (progress: number) => void
): { task: Promise<{ id: string; imageUrl: string }>; cancel: () => void } {
  let cancelled = false;

  const task = (async () => {
    try {
      // Validate file
      const validation = await validateImageFile(file);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Generate storage path: gallery/{timestamp}_{originalFileName}
      const timestamp = Date.now();
      const originalFileName = file.name.replace(/\s+/g, "-");
      const storagePath = `gallery/${timestamp}_${originalFileName}`;

      // Upload image to Firebase Storage
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytes(storageRef, file);

      // Monitor progress
      await uploadTask;
      onProgress?.(100);

      if (cancelled) throw new Error("Upload cancelled");

      // Get download URL
      const imageUrl = await getDownloadURL(storageRef);

      return {
        id: storagePath, // Use storage path as temporary ID
        imageUrl,
      };
    } catch (error) {
      console.error("Error uploading gallery image:", error);
      throw error instanceof Error
        ? error
        : new Error("Failed to upload gallery image");
    }
  })();

  return {
    task,
    cancel: () => {
      cancelled = true;
    },
  };
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

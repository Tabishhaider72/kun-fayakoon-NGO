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
  subtitle?: string;
  image: string;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

const MIN_WIDTH = 400;
const MAX_WIDTH = 4000;
const MIN_HEIGHT = 300;
const MAX_HEIGHT = 4000;

function getImageDimensions(file: File): Promise<ImageDimensions> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = () => reject(new Error("Failed to load image dimensions"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

async function validateImageFile(file: File): Promise<{ valid: boolean; error?: string }> {
  const VALID_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  const MAX_SIZE = 500 * 1024; // 500 KB

  if (!VALID_TYPES.includes(file.type)) {
    return { valid: false, error: `Invalid file type. Accepted formats: JPEG, PNG, WebP, GIF` };
  }

  if (file.size > MAX_SIZE) {
    return { valid: false, error: `File size exceeds 500 KB limit. Current size: ${(file.size / 1024).toFixed(2)} KB` };
  }

  try {
    const dimensions = await getImageDimensions(file);
    if (dimensions.width < MIN_WIDTH || dimensions.width > MAX_WIDTH) {
      return { valid: false, error: `Image width must be between ${MIN_WIDTH}px and ${MAX_WIDTH}px. Current: ${dimensions.width}px` };
    }
    if (dimensions.height < MIN_HEIGHT || dimensions.height > MAX_HEIGHT) {
      return { valid: false, error: `Image height must be between ${MIN_HEIGHT}px and ${MAX_HEIGHT}px. Current: ${dimensions.height}px` };
    }
    return { valid: true };
  } catch (error) {
    return { valid: false, error: `Failed to validate image dimensions: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}

/**
 * Client-side upload helper that POSTs the file to `/api/upload-gallery` using XHR
 * so we can report upload progress.
 */
export function uploadGalleryImageClient(
  file: File,
  title: string,
  subtitle: string,
  onProgress?: (progress: number) => void
): { task: Promise<{ id: string; imageUrl: string }>; cancel: () => void } {
  let xhr: XMLHttpRequest | null = null;
  const task = new Promise<{ id: string; imageUrl: string }>(async (resolve, reject) => {
    try {
      const validation = await validateImageFile(file);
      if (!validation.valid) return reject(new Error(validation.error));

      const form = new FormData();
      form.append("file", file, file.name);
      form.append("title", title);
      form.append("subtitle", subtitle || "");

      xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/upload-gallery");

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress?.(percent);
        }
      };

      xhr.onload = () => {
        if (xhr?.status && xhr.status >= 200 && xhr.status < 300) {
          try {
            const json = JSON.parse(xhr.responseText);
            if (json?.success) {
              resolve({ id: json.id, imageUrl: json.imageUrl });
            } else {
              reject(new Error(json?.error || "Upload failed"));
            }
          } catch (err) {
            reject(err);
          }
        } else {
          reject(new Error(`Upload failed with status ${xhr?.status}`));
        }
      };

      xhr.onerror = () => reject(new Error("Network error during upload"));
      xhr.send(form);
    } catch (err) {
      reject(err instanceof Error ? err : new Error("Upload failed"));
    }
  });

  return {
    task,
    cancel: () => {
      if (xhr && xhr.readyState !== XMLHttpRequest.DONE) xhr.abort();
    },
  };
}

/**
 * Fetches gallery images via server API (Prisma on server)
 */
export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const res = await fetch("/api/gallery");
    if (!res.ok) throw new Error("Failed to fetch gallery");
    const data = await res.json();
    return data as GalleryImage[];
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    throw error instanceof Error ? error : new Error("Failed to fetch gallery images");
  }
}

/**
 * Client-side deletion wrapper (calls server API)
 */
export async function deleteGalleryImage(id: string): Promise<void> {
  try {
    const res = await fetch(`/api/gallery/${encodeURIComponent(id)}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete gallery image");
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    throw error instanceof Error ? error : new Error("Failed to delete gallery image");
  }
}

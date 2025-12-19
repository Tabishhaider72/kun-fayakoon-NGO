"use server";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "./firebase";
import { getAuth } from "firebase/auth";

interface FirestoreGalleryDoc {
  title: string;
  subtitle: string;
  imageUrl: string;
  storagePath: string;
  createdAt: any;
}

/**
 * Verify admin privileges - customize based on your auth method
 * This example checks for a custom claim or admin role
 */
async function verifyAdminAuth(): Promise<boolean> {
  try {
    // Option 1: If using Firebase Auth with custom claims
    // const auth = getAuth();
    // const user = auth.currentUser;
    // const tokenResult = await user?.getIdTokenResult();
    // return tokenResult?.claims?.admin === true;

    // Option 2: Check environment variable for admin token/API key
    const adminSecret = process.env.ADMIN_SECRET_KEY;
    
    // For now, return true to allow testing. 
    // Replace with actual auth logic based on your setup
    return adminSecret !== undefined;
  } catch (error) {
    console.error("Error verifying admin auth:", error);
    return false;
  }
}

/**
 * Server action: Save gallery metadata after client upload
 * Auth protected
 */
export async function saveGalleryMetadata(
  imageUrl: string,
  storagePath: string,
  title: string,
  subtitle: string
): Promise<{ id: string; imageUrl: string }> {
  // Verify admin authorization
  const isAdmin = await verifyAdminAuth();
  if (!isAdmin) {
    throw new Error("Unauthorized: Admin access required");
  }

  try {
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
    console.error("Error saving gallery metadata:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to save gallery metadata");
  }
}

/**
 * Server action: Delete gallery image
 * Auth protected
 */
export async function deleteGalleryImageServer(id: string): Promise<void> {
  // Verify admin authorization
  const isAdmin = await verifyAdminAuth();
  if (!isAdmin) {
    throw new Error("Unauthorized: Admin access required");
  }

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

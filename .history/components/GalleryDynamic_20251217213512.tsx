"use client";

import { useEffect, useState } from "react";
import { getGalleryImages, uploadGalleryImageClient, type GalleryImage } from "@/lib/gallery";
import { saveGalleryMetadata, deleteGalleryImageServer } from "@/lib/gallery-actions";

/**
 * Example usage of the Gallery module with:
 * - Server actions for auth-protected operations
 * - Upload progress bar
 * - Optimistic delete
 * - Image dimension validation
 */
export default function GalleryExample() {
  const [galleryItems, setGalleryItems] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  // Fetch gallery from server
  useEffect(() => {
    const loadGalleryImages = async () => {
      try {
        setLoading(true);
        const images = await getGalleryImages();
        setGalleryItems(images);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load gallery"
        );
        console.error("Error loading gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    loadGalleryImages();
  }, []);

  // Handle file upload with progress tracking
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    title: string = "New Gallery Item",
    subtitle: string = ""
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Start client-side upload with progress tracking
      const { task, cancel } = uploadGalleryImageClient(
        file,
        title,
        subtitle,
        (progress) => {
          setUploadProgress(progress);
        }
      );

      const { imageUrl, id: storagePath } = await task;

      // Save metadata via server action (auth protected)
      const result = await saveGalleryMetadata(
        imageUrl,
        storagePath,
        title,
        subtitle
      );

      // Add to local state
      setGalleryItems((prev) => [
        {
          id: result.id,
          title,
          subtitle,
          image: imageUrl,
        },
        ...prev,
      ]);

      setUploadProgress(0);
      setIsUploading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setError(errorMessage);
      console.error("Error uploading image:", err);
      setIsUploading(false);
    }
  };

  // Handle optimistic delete
  const handleDelete = async (id: string) => {
    // Optimistic delete: remove from UI immediately
    const originalItems = galleryItems;
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
    setDeletingIds((prev) => new Set(prev).add(id));

    try {
      // Delete via server action (auth protected)
      await deleteGalleryImageServer(id);
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } catch (err) {
      // Restore on error
      setGalleryItems(originalItems);
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });

      const errorMessage =
        err instanceof Error ? err.message : "Delete failed";
      setError(errorMessage);
      console.error("Error deleting image:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-600">Loading gallery...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error: {error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-sm text-red-700 underline hover:text-red-900"
          >
            Dismiss
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-container p-6">
      {/* Upload Section */}
      <div className="mb-8 bg-slate-50 p-6 rounded-lg border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Upload Gallery Image (Admin)
        </h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, "My Gallery Item", "Item description")}
          disabled={isUploading}
          className="mb-4"
        />

        {isUploading && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">
                Uploading...
              </span>
              <span className="text-sm text-slate-600">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Gallery Items */}
      {galleryItems.length === 0 ? (
        <p className="text-center text-slate-600">No gallery items found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all ${
                deletingIds.has(item.id) ? "opacity-50" : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2">{item.subtitle}</p>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deletingIds.has(item.id)}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                >
                  {deletingIds.has(item.id) ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

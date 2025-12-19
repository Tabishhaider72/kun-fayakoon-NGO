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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#f6f4ef] to-white">
        <div className="text-center">
          {/* Loading Animation */}
          <svg className="w-32 h-32 mx-auto mb-6" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Gallery Frame */}
            <rect x="15" y="20" width="70" height="55" fill="none" stroke="#2E8B57" strokeWidth="2" rx="3" />
            
            {/* Left Image */}
            <rect x="20" y="25" width="20" height="20" fill="#E8F5E9" stroke="#2E8B57" strokeWidth="1" rx="2" />
            <circle cx="30" cy="32" r="3" fill="#2E8B57" />
            <line x1="20" y1="44" x2="40" y2="44" stroke="#2E8B57" strokeWidth="1" opacity="0.5" />
            
            {/* Center Image */}
            <rect x="46" y="25" width="20" height="20" fill="#E8F5E9" stroke="#2E8B57" strokeWidth="1" rx="2" />
            <circle cx="56" cy="32" r="3" fill="#2E8B57" />
            <line x1="46" y1="44" x2="66" y2="44" stroke="#2E8B57" strokeWidth="1" opacity="0.5" />
            
            {/* Right Image */}
            <rect x="72" y="25" width="20" height="20" fill="#E8F5E9" stroke="#2E8B57" strokeWidth="1" rx="2" />
            <circle cx="82" cy="32" r="3" fill="#2E8B57" />
            <line x1="72" y1="44" x2="92" y2="44" stroke="#2E8B57" strokeWidth="1" opacity="0.5" />
            
            {/* Loading dots with animation */}
            <circle cx="30" cy="60" r="2" fill="#2E8B57">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="60" r="2" fill="#2E8B57">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" begin="0.2s" />
            </circle>
            <circle cx="70" cy="60" r="2" fill="#2E8B57">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" begin="0.4s" />
            </circle>
          </svg>
          
          <p className="text-lg font-semibold text-[#111D15] mb-2">Loading Gallery</p>
          <p className="text-sm text-slate-600">Fetching your amazing images...</p>
        </div>
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
        <div className="flex flex-col items-center justify-center py-16 px-4">
          {/* Empty State Illustration */}
          <svg className="w-48 h-48 mb-6" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            {/* Background circle */}
            <circle cx="100" cy="100" r="95" fill="#E8F5E9" stroke="#2E8B57" strokeWidth="2" />
            
            {/* Main picture frame */}
            <rect x="50" y="40" width="100" height="80" fill="none" stroke="#2E8B57" strokeWidth="2.5" rx="4" />
            
            {/* Frame inner details */}
            <line x1="55" y1="45" x2="145" y2="45" stroke="#2E8B57" strokeWidth="1" opacity="0.3" />
            <line x1="55" y1="115" x2="145" y2="115" stroke="#2E8B57" strokeWidth="1" opacity="0.3" />
            
            {/* Mountain/landscape inside frame */}
            <path d="M 55 100 L 75 70 L 95 85 L 115 60 L 145 95 L 145 110 L 55 110" fill="#C8E6C9" stroke="none" />
            <circle cx="110" cy="65" r="8" fill="#FFE082" />
            
            {/* Clouds */}
            <ellipse cx="70" cy="55" rx="8" ry="5" fill="#B2DFDB" opacity="0.6" />
            <ellipse cx="130" cy="50" rx="10" ry="6" fill="#B2DFDB" opacity="0.6" />
            
            {/* Sad/empty state indicator */}
            <text x="100" y="165" fontSize="24" fontWeight="bold" fill="#2E8B57" textAnchor="middle">?</text>
          </svg>
          
          <h3 className="text-2xl font-bold text-[#111D15] mb-2">No Gallery Items Yet</h3>
          <p className="text-center text-slate-600 mb-6 max-w-sm">
            Start sharing your moments! Upload your first gallery image to get started.
          </p>
          <div className="bg-[#2E8B57] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#267948] transition-colors">
            Ask for Upload Image
          </div>
        </div>
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

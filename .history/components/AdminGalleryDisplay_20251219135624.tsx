"use client";

import { useEffect, useState } from "react";
import { getGalleryImages, type GalleryImage } from "@/lib/gallery";
import { deleteGalleryImageServer } from "@/lib/gallery-actions";
import ImageLightbox from "./ImageLightbox";

/**
 * Admin gallery display component for /admin/gallery page
 * - Displays gallery with delete functionality
 * - Modern grid layout with hover effects
 * - Clickable images open in lightbox modal
 * - Delete buttons with confirmation
 */
export default function AdminGalleryDisplay() {
  const [galleryItems, setGalleryItems] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [deleteError, setDeleteError] = useState<string | null>(null);

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

  // Handle delete with confirmation
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    const originalItems = galleryItems;
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
    setDeletingIds((prev) => new Set(prev).add(id));
    setDeleteError(null);

    try {
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
      setDeleteError(errorMessage);
      console.error("Error deleting image:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-[#2E8B57] border-t-transparent rounded-full animate-spin mb-4"></div>
          </div>
          <p className="text-lg font-semibold text-[#111D15] mb-2">Loading Gallery</p>
          <p className="text-sm text-slate-600">Fetching gallery images...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-600 font-medium">Failed to Load Gallery</p>
          <p className="text-red-500 text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (galleryItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#111D15] mb-2">No Gallery Items</h3>
        <p className="text-center text-slate-600 max-w-sm">
          Upload your first gallery image using the upload form above to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      {deleteError && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{deleteError}</p>
          <button
            onClick={() => setDeleteError(null)}
            className="mt-2 text-sm text-red-700 hover:text-red-900 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <div
            key={item.id}
            className={`gallery-card group ${
              deletingIds.has(item.id) ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {/* Image Container - Clickable for lightbox */}
            <div
              className="gallery-image-wrapper overflow-hidden bg-slate-100 cursor-pointer"
              onClick={() => setSelectedIndex(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedIndex(index);
                }
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover gallery-image"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="gallery-content p-4">
              <h3 className="text-lg font-semibold text-[#111D15] line-clamp-2">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="text-sm text-slate-600 mt-1.5 line-clamp-2">
                  {item.subtitle}
                </p>
              )}

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(item.id)}
                disabled={deletingIds.has(item.id)}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {deletingIds.has(item.id) ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <ImageLightbox
          items={galleryItems}
          selectedIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onPrevious={() =>
            setSelectedIndex(
              selectedIndex === 0 ? galleryItems.length - 1 : selectedIndex - 1
            )
          }
          onNext={() =>
            setSelectedIndex(
              selectedIndex === galleryItems.length - 1 ? 0 : selectedIndex + 1
            )
          }
        />
      )}
    </>
  );
}

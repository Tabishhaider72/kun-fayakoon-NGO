"use client";

import { useEffect, useState } from "react";
import { getGalleryImages, type GalleryImage } from "@/lib/gallery";

/**
 * Example usage of the Gallery module
 * Replace static galleryItems array with dynamic Firestore data
 */
export default function GalleryExample() {
  const [galleryItems, setGalleryItems] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      {galleryItems.length === 0 ? (
        <p className="text-center text-slate-600">No gallery items found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

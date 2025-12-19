"use client";

import { useEffect } from "react";

interface GalleryImage {
  id: string;
  subtitle?: string;
  image: string;
}

interface ImageLightboxProps {
  items: GalleryImage[];
  selectedIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

/**
 * Modern lightbox component for viewing gallery images
 * - Full-screen modal with image preview
 * - Keyboard navigation support (arrow keys, ESC)
 * - Previous/Next navigation controls
 * - Smooth animations
 */
export default function ImageLightbox({
  items,
  selectedIndex,
  onClose,
  onPrevious,
  onNext,
}: ImageLightboxProps) {
  const currentItem = items[selectedIndex];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onPrevious();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose, onPrevious, onNext]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="lightbox-close-btn"
          aria-label="Close lightbox"
          title="Press ESC to close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Main Image */}
        <div className="lightbox-image-wrapper">
          <img
            src={currentItem.image}
            alt={currentItem.subtitle ?? "Gallery image"}
            className="lightbox-image"
          />
        </div>

        {/* Navigation: Previous Button */}
        <button
          onClick={onPrevious}
          className="lightbox-nav-btn lightbox-prev-btn"
          aria-label="Previous image"
          title="Press ← to go to previous"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Navigation: Next Button */}
        <button
          onClick={onNext}
          className="lightbox-nav-btn lightbox-next-btn"
          aria-label="Next image"
          title="Press → to go to next"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Image Information */}
        <div className="lightbox-info">
          <div className="lightbox-info-content">
            {currentItem.subtitle && (
              <p className="text-sm text-slate-200">{currentItem.subtitle}</p>
            )}
          </div>

          {/* Counter */}
          <div className="lightbox-counter">
            <span className="text-white font-medium">
              {selectedIndex + 1} / {items.length}
            </span>
          </div>
        </div>

        {/* Thumbnail Navigation Bar (optional) */}
        {items.length > 1 && (
          <div className="lightbox-thumbnails">
            {items.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  // Calculate steps needed to reach the target index
                  let stepsNeeded = index - selectedIndex;
                  if (stepsNeeded < 0) {
                    stepsNeeded += items.length;
                  }
                  
                  // Execute the navigation
                  for (let i = 0; i < stepsNeeded; i++) {
                    onNext();
                  }
                }}
                className={`lightbox-thumbnail ${
                  index === selectedIndex ? "active" : ""
                }`}
                aria-label={`Go to image ${index + 1}`}
              >
                <img
                  src={item.image}
                  alt={item.subtitle ?? "Gallery image"}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { saveGalleryMetadata } from "@/lib/gallery-actions";
import Link from "next/link";
import AdminGalleryDisplay from "@/components/AdminGalleryDisplay";

export default function AdminGalleryPage() {
  const [subtitle, setSubtitle] = useState("");
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [refreshGallery, setRefreshGallery] = useState(0);

  // Simple admin authentication (replace with your actual auth method)
  const handleAdminLogin = () => {
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
    if (adminPassword === correctPassword) {
      setAdminAuth(true);
      setError(null);
    } else {
      setError("Invalid admin password");
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Title is not collected in the UI; API expects a title parameter, so send empty string

    // Validate file type and size on client
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const maxSize = 500 * 1024; // 500 KB

    if (!validTypes.includes(file.type)) {
      setError(`Invalid file type. Accepted: JPEG, PNG, WebP, GIF`);
      return;
    }

    if (file.size > maxSize) {
      setError(`File size exceeds 500 KB. Current: ${(file.size / 1024).toFixed(2)} KB`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);
    setSuccess(false);

    try {
      // Upload via API
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", "");
      formData.append("subtitle", subtitle);

      // Simulate progress
      setUploadProgress(30);

      const response = await fetch("/api/upload-gallery", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      setUploadProgress(100);

      // Reset form
      setSubtitle("");
      setUploadProgress(0);
      setSuccess(true);
      setIsUploading(false);

      // Refresh gallery display
      setRefreshGallery((prev) => prev + 1);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setError(errorMessage);
      console.error("Error uploading image:", err);
      setIsUploading(false);
    }
  };

  if (!adminAuth) {
    return (
      <main className="min-h-screen bg-[#f6f4ef] flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-[#111D15] mb-6 text-center">
            Admin Login
          </h1>
          <p className="text-slate-600 text-center mb-6">
            Enter the admin password to access the gallery management panel.
          </p>

          <div className="space-y-4">
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
              onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              onClick={handleAdminLogin}
              className="w-full bg-[#2E8B57] hover:bg-[#267948] text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Login
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <Link href="/gallery" className="text-[#2E8B57] hover:underline text-sm">
              ← Back to Gallery
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f4ef] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-[#111D15]">
              Gallery Management
            </h1>
            <button
              onClick={() => setAdminAuth(false)}
              className="text-sm text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
          <p className="text-slate-600">Upload new images and manage your gallery.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Form Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-[#111D15] mb-6">Upload Image</h2>

              <div className="space-y-4">
                {/* Title Input */}
                <div>
                  <label className="block text-sm font-semibold text-[#111D15] mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Winter Relief"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
                  />
                </div>

                {/* Subtitle Input */}
                <div>
                  <label className="block text-sm font-semibold text-[#111D15] mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Brief description"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-semibold text-[#111D15] mb-2">
                    Image *
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-[#2E8B57] transition cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="w-full cursor-pointer text-sm"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      JPEG, PNG, WebP, GIF (Max 500 KB)
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-700">Uploading...</span>
                      <span className="text-xs text-slate-600">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#2E8B57] h-full rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-700 text-sm font-semibold">✓ Uploaded!</p>
                  </div>
                )}
              </div>

              {/* Links */}
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-2">
                <Link
                  href="/gallery"
                  className="block text-center text-[#2E8B57] hover:underline text-sm font-medium"
                >
                  View Public Gallery
                </Link>
                <Link
                  href="/"
                  className="block text-center text-[#2E8B57] hover:underline text-sm font-medium"
                >
                  Go Home
                </Link>
              </div>
            </div>
          </div>

          {/* Gallery Display */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-[#111D15] mb-6">
                Gallery Items
              </h2>
              <AdminGalleryDisplay key={refreshGallery} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


"use client";

import { useState } from "react";
import { uploadGalleryImageClient } from "@/lib/gallery";
import { saveGalleryMetadata } from "@/lib/gallery-actions";
import Link from "next/link";

export default function AdminGalleryPage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

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

    if (!title.trim()) {
      setError("Please enter an image title");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);
    setSuccess(false);

    try {
      // Upload file with progress tracking
      const { task } = uploadGalleryImageClient(
        file,
        title,
        subtitle,
        (progress) => {
          setUploadProgress(progress);
        }
      );

      const { imageUrl, id: storagePath } = await task;

      // Save metadata via server action
      await saveGalleryMetadata(
        imageUrl,
        storagePath,
        title,
        subtitle
      );

      // Reset form
      setTitle("");
      setSubtitle("");
      setUploadProgress(0);
      setSuccess(true);
      setIsUploading(false);

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
            Enter the admin password to access the gallery upload panel.
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
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-[#111D15]">Upload Gallery Image</h1>
            <button
              onClick={() => setAdminAuth(false)}
              className="text-sm text-slate-600 hover:text-slate-900 underline"
            >
              Logout
            </button>
          </div>

          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold text-[#111D15] mb-2">
                Image Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Winter Relief Drive"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
              />
            </div>

            {/* Subtitle Input */}
            <div>
              <label className="block text-sm font-semibold text-[#111D15] mb-2">
                Image Subtitle
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g., Distributing blankets to families in need"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-[#111D15] mb-2">
                Select Image
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-[#2E8B57] transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="w-full cursor-pointer"
                />
                <p className="text-xs text-slate-500 mt-2">
                  Accepted: JPEG, PNG, WebP, GIF (Max 500 KB, 400-4000px dimensions)
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Uploading...</span>
                  <span className="text-sm text-slate-600">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-[#2E8B57] h-full rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-700 font-semibold">✓ Image uploaded successfully!</p>
              </div>
            )}
          </div>

          {/* Links */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex gap-4">
            <Link
              href="/gallery"
              className="text-[#2E8B57] hover:underline font-medium"
            >
              ← View Gallery
            </Link>
            <Link
              href="/"
              className="text-[#2E8B57] hover:underline font-medium"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

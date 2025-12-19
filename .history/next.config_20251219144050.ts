import type { NextConfig } from "next";
import path from "path";

// Ensure Turbopack uses the correct workspace root (fixes multiple lockfile/root detection on Vercel)
const nextConfig: NextConfig & { turbopack?: { root?: string } } = {
  /* config options here */
  turbopack: {
    // Use absolute path to this project directory
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

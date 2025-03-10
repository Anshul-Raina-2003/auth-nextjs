import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Disables ESLint during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

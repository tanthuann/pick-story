import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove static export for development, enable only for production GitHub Pages
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // distDir: 'out',
  // basePath: process.env.NODE_ENV === 'production' ? '/demo-la' : '',
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/demo-la' : '',
};

export default nextConfig;

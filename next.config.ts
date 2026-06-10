// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — pure front-end, no server needed
  output: "export",

  // Clean URLs — /about instead of /about.html
  trailingSlash: false,

  // Disable the built-in image optimisation API
  // (not available in static export mode)
  images: {
    unoptimized: true,
  },

  // Strict mode catches subtle React bugs during development
  reactStrictMode: true,
};

export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    path: "/",
    formats: ["image/avif", "image/webp, image/png, image/jpeg, image/jpg"],
  },
};

export default nextConfig;

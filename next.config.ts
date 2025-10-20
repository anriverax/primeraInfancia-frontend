import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "anriverax.s3.us-east-2.amazonaws.com",
        pathname: "/**"
      }
    ]
  },
  // Root redirect is handled via middleware for auth-aware behavior
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://anriverax.s3.us-east-2.amazonaws.com/**")]
  },

  async redirects() {
    return [
      {
        source: "/", // Desde la raíz (localhost:3000)
        destination: "/auth/iniciar-sesion", // Hacia la página deseada
        permanent: false // false = redirección temporal (307)
      }
    ];
  }
};

export default nextConfig;

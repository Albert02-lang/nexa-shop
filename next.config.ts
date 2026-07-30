import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nxizowwblihqgiklkeno.supabase.co",
      },
    ],
  },
};

export default nextConfig;
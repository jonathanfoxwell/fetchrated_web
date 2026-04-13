import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/find/practice/:slug',
        destination: '/find/location/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

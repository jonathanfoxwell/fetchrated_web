import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'static.parastorage.com',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/unimatch',
        destination: '/match',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

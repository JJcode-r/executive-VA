import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-d601c571f0b54a8489f5bcee7f72415b.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
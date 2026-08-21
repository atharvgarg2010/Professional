import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 828, 1080, 1200, 1920, 2400],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // Allow large JPEGs from the photography directory
  experimental: {},
};

export default nextConfig;

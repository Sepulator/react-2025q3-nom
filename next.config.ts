import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: './dist',
  images: {
    remotePatterns: [new URL('https://m.media-amazon.com/images/**')],
  },
};

export default nextConfig;

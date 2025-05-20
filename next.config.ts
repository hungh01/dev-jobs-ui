import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: [
      'cdn-new.topcv.vn',
      'static.topcv.vn',
      'cdn.vietnamworks.com',
      'images.vietnamworks.com',
      'www.topcv.vn',
      'images.careerviet.vn',
      'static.careerviet.vn'
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";
const isLocal = process.env.NODE_ENV === 'development';


const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "codemoly.blr1.digitaloceanspaces.com"
      },
    ],
    unoptimized: !!isLocal
  },

  experimental: {
      serverActions: {
          bodySizeLimit: '32mb',
      },
    },
  
   async redirects() {
    return [
      {
        source: '/inventory',
        destination: '/inventory/product',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;


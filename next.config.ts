import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => {
    if(process.env.NODE_ENV === 'development'){
      return [
        {
          source: '/api/graphql/:path*',
          destination: 'http://127.0.0.1:8000/graphql/',
        },
        {
          source: '/openapi.json',
          destination: 'http://127.0.0.1:8000/openapi.json',
        },
        {
          source: '/api/:path*',
          destination: 'http://127.0.0.1:8000/api/:path*',
        },
      ];
    } else {
      return [];
    }
  },
};

export default nextConfig;

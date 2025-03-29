import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/portfoilo/:path*", // 誤ったURL
        destination: "/portfolio/:path*", // 正しいURL
        permanent: true, // 永続リダイレクト
      },
    ];
  },
};

export default nextConfig;

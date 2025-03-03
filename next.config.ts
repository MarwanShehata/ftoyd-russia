import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["app.ftoyd.com"],
  },
  swcMinify: true,
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://dmb6bsbqze3ds.cloudfront.net/**")],
  },
};

export default nextConfig;

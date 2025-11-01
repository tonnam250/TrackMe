import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // <- build จะไม่ fail แม้ warnings
  },
};

export default nextConfig;

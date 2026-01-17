import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000", // porta configurada aqui
        pathname: "/uploads/**", // path configurado aqui
      },
      {
        protocol: "https",
        hostname: "uniko-delta.vercel.app",
        pathname: "/uploads/**", // path configurado aqui
      },
      {
        protocol: "https",
        hostname: "cdn.vistahost.com.br",
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    amp: false
  },
  // other Next.js configurations can go here
};

module.exports = nextConfig;

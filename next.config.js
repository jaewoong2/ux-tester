/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: 'edge',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ndavhlqivyieuaehsnne.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/image/**',
      },
    ],
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  webpack: (config) => {
    // pdfjs-dist references canvas (native module) — not needed in browser builds
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false,
    }
    return config
  },
}

export default nextConfig

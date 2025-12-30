/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed "output: export" to enable dynamic routing
  // If you need static export, you'll need a different approach for dynamic product pages
  output: 'export',
  reactStrictMode: true,
  
  // Image optimization configuration
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Page extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  
  // Compiler options for better performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
  
  // Note: async headers() and redirects() are not supported with output: 'export'
  // These would need to be configured on your hosting platform (e.g., Netlify, Vercel, etc.)
};

export default nextConfig;

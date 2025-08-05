/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   appDir: true,
  //   // Typed routes help catch invalid hrefs during development. See docs for details.
  //   typedRoutes: true
  // },
  // i18n: {
  //   // Supported locales; the first value is the default
  //   locales: ['en', 'tr'],
  //   defaultLocale: 'en',
  //   localeDetection: false
  // },
  images: {
    // Allow images hosted on the Calvero CDN and unsplash for the mock data
    domains: ['calvero.club', 'images.pexels.com', 'images.unsplash.com']
  }
};

export default nextConfig;
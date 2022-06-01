const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  env: {
    REACTION_API_DOMAIN: process.env.REACTION_API_DOMAIN,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  i18n: {
    locales: ['bg-BG'],
    defaultLocale: 'bg-BG',
  },
  images: {
    domains: [
      'api.treble.bg',
      'images.ctfassets.net',
      'localhost',
      'undefined',
    ],
  },
  experimental: {
    emotion: true,
    modularizeImports: {
      '@mui': {
        transform: '@mui/material/{{Member}}',
      },
    },
  },
})

const commerce = require('./commerce.config.json')
const { withCommerceConfig } = require('./framework/commerce/config')

module.exports = withCommerceConfig({
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
  commerce,
  i18n: {
    locales: ['bg-BG'],
    defaultLocale: 'bg-BG',
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

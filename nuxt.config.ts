export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  compatibilityDate: '2026-01-01',

  devServer: {
    port: 3001
  },
  nitro: {
    preset: 'node-server',
    compressPublicAssets: true
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://test.com',
      appVersion: process.env.npm_package_version
    }
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      title: 'Starter',
      titleTemplate: '%s | Nuxt Template Starter',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        {
          name: 'title',
          key: 'title',
          content: 'Nuxt Template Starter'
        },
        {
          name: 'description',
          key: 'description',
          content: 'Nuxt 3 app starter template for development.'
        },
        {
          name: 'theme-color',
          key: 'theme-color',
          content: '#ffffff',
          media: '(prefers-color-scheme: light)'
        },
        {
          name: 'theme-color',
          key: 'theme-color',
          content: '#121212',
          media: '(prefers-color-scheme: dark)'
        }
      ],
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  css: [
    '@/assets/scss/integrations.scss',
    '@/assets/scss/main.scss'
  ],

  modules: [
    '@colorffy/ui/nuxt',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/color-mode',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt'
  ],

  // SEO
  site: {
    url: process.env.BASE_URL,
    name: 'Nuxt Template Starter',
    description: 'Nuxt 3 app starter template for development.',
    defaultLocal: 'en'
  },
  robots: {
  },
  sitemap: {
    experimentalCompression: true,
    xslColumns: [
      { label: 'URL', width: '50%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '25%' },
      { label: 'Priority', select: 'sitemap:priority', width: '12.5%' },
      { label: 'Change Frequency', select: 'sitemap:changefreq', width: '12.5%' }
    ]
  },

  // Color mode
  colorMode: {
    preference: 'system',
    classSuffix: '-mode'
  },

  // Fonts
  fonts: {
    assets: {
      prefix: '/fonts/'
    },
    provider: 'fontsource',
    families: [
      {
        name: 'Plus Jakarta Sans',
        preload: true,
        weights: ['400 800']
      },
      {
        name: 'Mona Sans',
        weights: ['400 800']
      },
      {
        name: 'Material Symbols Rounded',
        provider: 'none'
      }
    ],
    defaults: {
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      preload: false
    },
    processCSSVariables: 'font-prefixed-only'
  },

  // PWA
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Nuxt Template Starter',
      short_name: 'Nuxt Starter',
      description: 'Nuxt 3 app starter template for development.',
      display: 'standalone',
      start_url: '/?standalone=true',
      background_color: '#f5f4fe',
      theme_color: '#121212',
      lang: 'en'
    },
    pwaAssets: {
      config: true
    },
    workbox: {
      navigateFallback: '/',
      cleanupOutdatedCaches: true,
      globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],
      runtimeCaching: [
        {
          urlPattern: 'https://fonts.googleapis.com/*',
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              purgeOnQuotaError: true
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: 'https://fonts.gstatic.com/*',
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              purgeOnQuotaError: true
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  }
})

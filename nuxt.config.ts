export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  compatibilityDate: '2026-01-01',

  devServer: {
    port: 3029
  },
  nitro: {
    preset: 'node-server',
    compressPublicAssets: true,
    prerender: {
      routes: ['/', '/questionnaire', '/es/cuestionario'],
      crawlLinks: true
    }
  },

  routeRules: {
    '/questionnaire': { robots: false, sitemap: false },
    '/es/cuestionario': { robots: false, sitemap: false }
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://giancarlos.dev',
      appVersion: process.env.npm_package_version
    }
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      title: 'Giancarlos Garza',
      titleTemplate: '%s | Giancarlos Garza',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        {
          name: 'title',
          key: 'title',
          content: 'Giancarlos Garza, Front-End Engineer and UI/UX Designer'
        },
        {
          name: 'description',
          key: 'description',
          content: 'Front-end engineer and UI/UX designer building high-performance interfaces, design systems and dependable web products with Vue, Nuxt and TypeScript.'
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
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/icon-fonts/material-symbols-rounded-subset.woff2',
          crossorigin: 'anonymous'
        }
      ]
    }
  },

  css: [
    '@/assets/scss/integrations.scss',
    '@/assets/css/material-symbols.generated.css',
    '@/assets/scss/main.scss'
  ],

  modules: [
    '@colorffy/ui/nuxt',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
    'nuxt-vuefire'
  ],

  // SEO
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://giancarlos.dev',
    name: 'Giancarlos Garza',
    description: 'Front-end engineer and UI/UX designer building high-performance interfaces and design systems.',
    defaultLocale: 'en',
    trailingSlash: true
  },
  robots: {
    sitemap: '/sitemap.xml'
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

  // i18n
  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://giancarlos.dev',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    trailingSlash: true,
    locales: [
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        files: ['en.json', 'questionnaire-en.json', 'pricing-en.json']
      },
      {
        code: 'es',
        language: 'es-MX',
        name: 'Español',
        files: ['es.json', 'questionnaire-es.json', 'pricing-es.json']
      }
    ],
    customRoutes: 'config',
    pages: {
      questionnaire: {
        en: '/questionnaire',
        es: '/cuestionario'
      },
      pricing: {
        en: '/pricing',
        es: '/planes'
      }
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  // Color mode
  colorMode: {
    preference: 'system',
    classSuffix: '-mode'
  },

  // Firebase
  vuefire: {
    emulators: {
      enabled: false
    },
    appCheck: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY
      ? {
          provider: 'ReCaptchaV3',
          key: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY,
          isTokenAutoRefreshEnabled: true
        }
      : undefined,
    config: {
      apiKey: process.env.NUXT_PUBLIC_VUEFIRE_CONFIG_API_KEY || 'placeholder-api-key',
      authDomain: process.env.NUXT_PUBLIC_VUEFIRE_CONFIG_AUTH_DOMAIN || 'placeholder-auth-domain',
      projectId: process.env.NUXT_PUBLIC_VUEFIRE_CONFIG_PROJECT_ID || 'placeholder-project-id',
      storageBucket: process.env.NUXT_PUBLIC_VUEFIRE_CONFIG_STORAGE_BUCKET || 'placeholder-storage-bucket',
      appId: process.env.NUXT_PUBLIC_VUEFIRE_CONFIG_APP_ID || 'placeholder-app-id'
    }
  },

  // Fonts
  fonts: {
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
      name: 'Giancarlos Garza, Front-End Engineer',
      short_name: 'Giancarlos',
      description: 'Front-end engineer and UI/UX designer building high-performance interfaces and design systems.',
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
      globIgnores: ['**/material-symbols-rounded-full.woff2'],
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

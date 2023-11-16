export default defineNuxtConfig({
  postcss: {
    plugins: {
      'postcss-nesting': {}
    }
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: [
    '@nuxtjs/i18n',
    '@vant/nuxt',
    '@nuxtseo/module'
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.ts'
      },
      {
        code: 'zh',
        file: 'zh-CH.ts'
      }
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'zh',
    experimental: {
      jsTsFormatResource: true,
    },
  },
  vant: {
    /** Options */
  },
  css: ['~/assets/css/common.css'],
  runtimeConfig: {
    app:{
      imgUrl:"https://image.aiavr.com"
    },
    // Public keys that are exposed to the client
    public: {
      baseUrl:  process.env.BASE_URL || 'https://admin.aiavr.com'
    }
  },
  sitemap:{
    sources: [
      '/api/__sitemap__/urls',
    ]
  }

})
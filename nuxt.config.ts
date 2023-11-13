export default defineNuxtConfig({
  postcss: {
    plugins: {
      'postcss-nesting': {}
    }
  },
  devtools: {
    enabled: true
  },
  modules: [
    '@nuxtjs/i18n',
    '@vant/nuxt'
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
  css: ['~/assets/css/common.css']

})

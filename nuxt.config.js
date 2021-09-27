import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '',
    title: 'TECH SHOP',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Multi Language E-commerce Website For  Selling Laptops, Mobiles, Tablets' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'vue-agile/dist/VueAgile.css'

    // '@/assets/typography.css'
  ],



  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/Vue-agile', mode: 'client' },
    { src: "~/plugins/vee-validate"},
    { src: '~/plugins/persistedState', mode:'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-i18n',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  i18n:{
    seo:false,
    defaultLocale:'en',
    langDir:'~/lang/',
    lazy:true,
    baseUrl:'https://www.tech-shop.com',
    vuex:{
        synceLocale:true
      },
    locales:[
          {code: 'en', iso:'en-US',file:'en.js', dir:'ltr' },
          {code: 'ar', iso:'ar-EG',file:'ar.js', dir:'rtl' }
        ],
    detectBrowserLanguage:{
          onlyOnRoot:true
      },
  },


  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],

  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      "vee-validate/dist/rules"
    ],
  },
  auth: {
    strategies: {
     'laravelSanctum':{
       provider: 'laravel/sanctum',
       url:'http://localhost:8000',
       endpoints:{
         login:{
         url:'/api/login',
         method:'post'
         },
         logout:{
          url:'/api/logout',
          method:'post'
          },
        }
     }
    }
  }
}

export default {
  ssr: false,
  server: {
    port: 3030,
    host: '0.0.0.0'
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '도란누리',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js', async: true },
      { src: "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js", async: true },
      { src: 'https://developers.kakao.com/sdk/js/kakao.js', defer: true },
      { src: 'https://code.jquery.com/jquery-1.11.3.min.js', defer: true },
      // { src: '../../assets/script/script', type: 'text/javascript', body: true }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/style/app.scss',
    'normalize.css/normalize.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    { src: '@/plugins/vue-burger-menu', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module'
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['@nuxtjs/dotenv', { systemvars: true }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.NODE_ENV === 'development' ? 'http://115.85.180.96:8080' : 'https://youthapi.co.kr'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
  }
}

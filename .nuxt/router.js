import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _52ad7b9c = () => interopDefault(import('../pages/announce-detail.vue' /* webpackChunkName: "pages/announce-detail" */))
const _23244a3f = () => interopDefault(import('../pages/announce-list.vue' /* webpackChunkName: "pages/announce-list" */))
const _a1e9e1aa = () => interopDefault(import('../pages/excavation-detail.vue' /* webpackChunkName: "pages/excavation-detail" */))
const _8551fd10 = () => interopDefault(import('../pages/excavation-list.vue' /* webpackChunkName: "pages/excavation-list" */))
const _5bb8f806 = () => interopDefault(import('../pages/excavation-register.vue' /* webpackChunkName: "pages/excavation-register" */))
const _9a262a52 = () => interopDefault(import('../pages/freeboard-detail.vue' /* webpackChunkName: "pages/freeboard-detail" */))
const _85d84fb8 = () => interopDefault(import('../pages/freeboard-list.vue' /* webpackChunkName: "pages/freeboard-list" */))
const _64fd24a9 = () => interopDefault(import('../pages/freeboard-register.vue' /* webpackChunkName: "pages/freeboard-register" */))
const _2486b000 = () => interopDefault(import('../pages/kakao.vue' /* webpackChunkName: "pages/kakao" */))
const _7e03fda9 = () => interopDefault(import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _1127ac66 = () => interopDefault(import('../pages/naver.vue' /* webpackChunkName: "pages/naver" */))
const _0209482a = () => interopDefault(import('../pages/notice.vue' /* webpackChunkName: "pages/notice" */))
const _7b9a69a3 = () => interopDefault(import('../pages/notice-detail.vue' /* webpackChunkName: "pages/notice-detail" */))
const _6fd623d4 = () => interopDefault(import('../pages/oauth.vue' /* webpackChunkName: "pages/oauth" */))
const _793fad7e = () => interopDefault(import('../pages/partners.vue' /* webpackChunkName: "pages/partners" */))
const _83cda4b6 = () => interopDefault(import('../pages/platform-intro.vue' /* webpackChunkName: "pages/platform-intro" */))
const _655e6305 = () => interopDefault(import('../pages/privacy.vue' /* webpackChunkName: "pages/privacy" */))
const _2c32162b = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _3258a066 = () => interopDefault(import('../pages/suggest-detail.vue' /* webpackChunkName: "pages/suggest-detail" */))
const _4a993acc = () => interopDefault(import('../pages/suggest-list.vue' /* webpackChunkName: "pages/suggest-list" */))
const _3a46841f = () => interopDefault(import('../pages/suggest-register.vue' /* webpackChunkName: "pages/suggest-register" */))
const _22775b6d = () => interopDefault(import('../pages/survey.vue' /* webpackChunkName: "pages/survey" */))
const _d86b583e = () => interopDefault(import('../pages/survey-detail.vue' /* webpackChunkName: "pages/survey-detail" */))
const _4aa766c4 = () => interopDefault(import('../pages/terms.vue' /* webpackChunkName: "pages/terms" */))
const _7d62a7ad = () => interopDefault(import('../pages/user-info.vue' /* webpackChunkName: "pages/user-info" */))
const _69d205cc = () => interopDefault(import('../pages/login/kakao.vue' /* webpackChunkName: "pages/login/kakao" */))
const _56730232 = () => interopDefault(import('../pages/login/naver.vue' /* webpackChunkName: "pages/login/naver" */))
const _beacaee2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/announce-detail",
    component: _52ad7b9c,
    name: "announce-detail"
  }, {
    path: "/announce-list",
    component: _23244a3f,
    name: "announce-list"
  }, {
    path: "/excavation-detail",
    component: _a1e9e1aa,
    name: "excavation-detail"
  }, {
    path: "/excavation-list",
    component: _8551fd10,
    name: "excavation-list"
  }, {
    path: "/excavation-register",
    component: _5bb8f806,
    name: "excavation-register"
  }, {
    path: "/freeboard-detail",
    component: _9a262a52,
    name: "freeboard-detail"
  }, {
    path: "/freeboard-list",
    component: _85d84fb8,
    name: "freeboard-list"
  }, {
    path: "/freeboard-register",
    component: _64fd24a9,
    name: "freeboard-register"
  }, {
    path: "/kakao",
    component: _2486b000,
    name: "kakao"
  }, {
    path: "/login",
    component: _7e03fda9,
    name: "login"
  }, {
    path: "/naver",
    component: _1127ac66,
    name: "naver"
  }, {
    path: "/notice",
    component: _0209482a,
    name: "notice"
  }, {
    path: "/notice-detail",
    component: _7b9a69a3,
    name: "notice-detail"
  }, {
    path: "/oauth",
    component: _6fd623d4,
    name: "oauth"
  }, {
    path: "/partners",
    component: _793fad7e,
    name: "partners"
  }, {
    path: "/platform-intro",
    component: _83cda4b6,
    name: "platform-intro"
  }, {
    path: "/privacy",
    component: _655e6305,
    name: "privacy"
  }, {
    path: "/signup",
    component: _2c32162b,
    name: "signup"
  }, {
    path: "/suggest-detail",
    component: _3258a066,
    name: "suggest-detail"
  }, {
    path: "/suggest-list",
    component: _4a993acc,
    name: "suggest-list"
  }, {
    path: "/suggest-register",
    component: _3a46841f,
    name: "suggest-register"
  }, {
    path: "/survey",
    component: _22775b6d,
    name: "survey"
  }, {
    path: "/survey-detail",
    component: _d86b583e,
    name: "survey-detail"
  }, {
    path: "/terms",
    component: _4aa766c4,
    name: "terms"
  }, {
    path: "/user-info",
    component: _7d62a7ad,
    name: "user-info"
  }, {
    path: "/login/kakao",
    component: _69d205cc,
    name: "login-kakao"
  }, {
    path: "/login/naver",
    component: _56730232,
    name: "login-naver"
  }, {
    path: "/",
    component: _beacaee2,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}

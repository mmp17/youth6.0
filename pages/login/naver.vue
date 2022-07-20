<template>
  <div>
    <h1>
      naver login page
    </h1>
    <el-button
      v-loading.fullscreen.lock="fullscreenLoading"
      type="primary"
      @click="openFullScreen1"
    >
      As a directive
    </el-button>
  </div>
</template>

<script>
/* eslint-disable new-cap */
/* eslint-disable no-new */
export default {
  data () {
    return {
      fullscreenLoading: false
    }
  },
  async mounted () {
    const naverIdLogin = new window.naver_id_login('HKHwkmhqjhOQ5jy4tD3c', 'http://localhost:3030/login/naver')
    const accessToken = naverIdLogin.getAccessToken()
    const res = await this.$axios.$get('user/user_insert_sns.do', {
      params: {
        access_token: accessToken
      }
    })
    const validResponse = typeof res === 'object' && Object.keys(res).length
    if (validResponse) {
      const { idx } = res
      localStorage.setItem('idx', idx)
      await this.$store.commit('SET_USER_INFO', res)
      const hasPath = !!this.$route.query.path
      if (hasPath) {
        return this.$router.push(this.$route.query.path)
      }
      return this.$router.push('/')
    }
    alert('로그인에 실패했습니다.')
    this.$router.push('/')
  },
  methods: {
    openFullScreen1 () {
      this.fullscreenLoading = true
      setTimeout(() => {
        this.fullscreenLoading = false
      }, 2000)
    }
  }
}
</script>

  <style>

  </style>

<template>
  <div>
    <h1>
      kakao login page
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
export default {
  data () {
    return {
      fullscreenLoading: false
    }
  },
  async mounted () {
    try {
      const { code } = this.$route.query
      const kakaoClientId = 'd70a047f4d2a4a76ee7fe93bb10094d0'
      const kakaoRedirectUri = process.env.NODE_ENV === 'production' ? 'https://www.dorannuri.co.kr/login/kakao' : 'http://localhost:3030/login/kakao'

      const tokenResponse = await this.$axios({
        method: 'post',
        url: 'https://kauth.kakao.com/oauth/token',
        params: {
          grant_type: 'authorization_code',
          client_id: kakaoClientId,
          redirect_uri: kakaoRedirectUri,
          code
        },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      const { access_token: accessToken } = tokenResponse.data
      var response = await this.$axios.$get('/user/user_insert_sns_kakao.do', {
        params: {
          access_token: accessToken
        }
      })
      await this.$store.commit('SET_USER_INFO', response)
    } catch (e) {

    }
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

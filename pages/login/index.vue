<template>
  <div class="login-page">
    <GlobalMain title="로그인" />
    <section class="login-form">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="아이디">
          <el-input v-model="form.id" placeholder="아이디" />
        </el-form-item>
        <el-form-item label="비밀번호">
          <el-input v-model="form.password" placeholder="비밀번호" type="password" />
        </el-form-item>
        <div class="submit-btns">
          <el-button @click="handleLogin">
            로그인
          </el-button>
          <nuxt-link to="/signup">
            <el-button>
              회원가입
            </el-button>
          </nuxt-link>
        </div>
        <div class="sns-login-btns">
          <a :href="kakaoLoginLink" alt="kakao login">
            <img alt="kakao logo" src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg">
          </a>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import GlobalMain from '~/components/shared/GlobalMain'

export default {
  components: {
    GlobalMain
  },
  data () {
    return {
      form: {
        id: '',
        password: ''
      },
      client_id: '0814d058ce732a3b3fc2f5d3c7adf885',
      redirect_uri: 'https://www.dorannuri.co.kr/login/kakao'
    }
  },
  computed: {
    kakaoLoginLink () {
      return `https://kauth.kakao.com/oauth/authorize?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=code`
    }
  },
  methods: {
    handleKakaoLogin () {
      window.Kakao.Auth.authorize({
        redirectUri: 'https://www.dorannuri.co.kr/signup'
      })
    },
    async handleLogin () {
      try {
        const { id, password } = this.form
        const isInvalid = !(id && password)
        if (isInvalid) { return alert('아이디와 비밀번호를 입력해주세요.') }
        const res = await this.$axios.$get('/user/login_ok.do', {
          params: {
            user_id: id,
            user_pw: password
          }
        })
        if (typeof res === 'string' && res.includes('틀렸습니다')) { return alert('아이디와 패스워드가 틀렸습니다.') }
        if (Object.keys(res).length) {
          const { idx } = res
          localStorage.setItem('idx', idx)
          await this.$store.commit('SET_USER_INFO', res)
          const hasPath = !!this.$route.query.path
          if (hasPath) {
            return this.$router.push(this.$route.query.path)
          }
          this.$router.push('/')
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style>

</style>

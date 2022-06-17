<template>
  <el-dialog
    :visible.sync="showLoginModal"
    custom-class="login-modal"
    @close="close"
  >
    <div class="title">
      로그인
    </div>
    <section class="login-form">
      <el-form ref="form" :model="form">
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
          <el-button @click="toggleSignupModal(true)">
            회원가입
          </el-button>
        </div>
        <div class="sns-logins">
          <button type="button" class="kakao" @click="handleSns('kakao')">
            <img src="@/assets/images/kakao_logo.png" alt="">
            <span>카카오 로그인</span>
            <a id="kakao_id_login" style="display:none;" :href="kakaoLoginLink" alt="kakao login">
              <img alt="kakao logo" src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg">
            </a>
          </button>
          <div id="naver_id_login" style="display:none;" />
          <button type="button" class="naver" @click="handleSns('naver')">
            <img src="@/assets/images/naver_logo.png" alt="">
            <span>네이버 로그인</span>
          </button>
          <button type="button" class="facebook" @click="handleSns('facebook')">
            <img src="@/assets/images/facebook_logo.png" alt="">
            <span>페이스북 로그인</span>
            <v-facebook-login style="display:none;" :app-id="facebookAppId" @sdk-init="handleSdkInit" />
          </button>
        </div>
        <div class="sns-login-btns" />
      </el-form>
    </section>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import VFacebookLogin from 'vue-facebook-login-component'

export default {
  components: {
    VFacebookLogin
  },
  data () {
    return {
      dialogVisible: false,
      form: {
        id: '',
        password: ''
      },
      client_id: '0814d058ce732a3b3fc2f5d3c7adf885', // 둘중에 뭐가 맞는지 모름
      redirect_uri: 'http://localhost:3030/oauth'
    }
  },
  computed: {
    ...mapState({
      showLoginModal: state => state.showLoginModal
    }),
    kakaoLoginLink () {
      const kakaoClientId = 'd70a047f4d2a4a76ee7fe93bb10094d0'
      const kakaoRedirectUri = process.env.NODE_ENV === 'production' ? 'https://www.youthtory.co.kr/login/kakao' : 'http://localhost:3030/login/kakao'
      return `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}&response_type=code`
    },
    facebookAppId () {
      return process.env.NODE_ENV === 'production' ? '1203616750130623' : '3032612726978732'
    }
  },
  created () {
    (function (d, s, id) {
      let js; const fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) { return }
      // eslint-disable-next-line prefer-const
      js = d.createElement(s); js.id = id
      // ko_KR 을 en_US 로 바꾸면 영문으로 로그인버튼을 사용할 수 있어요.
      js.src = '//connect.facebook.net/ko_KR/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  },
  methods: {
    ...mapMutations([
      'toggleLoginModal',
      'toggleSignupModal'
    ]),
    handleSns (type) {
      if (type === 'naver') {
        const callbackUrl = process.env.NODE_ENV === 'production' ? 'https://www.youthtory.co.kr/login/naver' : 'http://localhost:3030/login/naver'
        const clientId = process.env.NODE_ENV === 'production' ? 'LRyrn7vuSLJFc8fFs9cz' : 'HKHwkmhqjhOQ5jy4tD3c'
        // eslint-disable-next-line new-cap
        const naverIdLogin = new window.naver_id_login(clientId, callbackUrl)
        naverIdLogin.init_naver_id_login()
        const naverElement = document.querySelector('#naver_id_login > a')
        naverElement.click()
      } else if (type === 'kakao') {
        const kakaoElement = document.querySelector('#kakao_id_login')
        kakaoElement.click()
      } else {
        this.fbClick()
      }
    },
    handleSdkInit ({ FB, scope }) {
      this.FB = FB
      this.scope = scope
    },
    fbClick () {
      const that = this
      // eslint-disable-next-line no-undef
      FB.login(function (response) {
        if (response.status === 'connected') {
          // eslint-disable-next-line no-undef
          FB.api('/me', 'get', { fields: 'name,email,gender' }, async (r) => {
            const {
              gender,
              id,
              name
            } = r
            // http://115.85.180.96/user/user_insert_sns_facebook.do
            const result = await that.$axios({
              method: 'get',
              url: '/user/user_insert_sns_facebook.do',
              params: {
                user_id: id,
                user_name: name,
                user_gender: gender
              }
            })
            const isSuccess = result.status === 200
            if (isSuccess) {
              const { idx } = result.data
              localStorage.setItem('idx', idx)
              await that.$store.dispatch('GET_USER_DATA')
              that.close()
              return that.$router.push('/')
            }
            alert('로그인에 실패했습니다.')
            that.close()
            that.$router.push('/')
          })
        } else if (response.status === 'not_authorized') {
          // 사람은 Facebook에 로그인했지만 앱에는 로그인하지 않았습니다.
          alert('앱에 로그인해야 이용가능한 기능입니다.')
        } else {
          // 그 사람은 Facebook에 로그인하지 않았으므로이 앱에 로그인했는지 여부는 확실하지 않습니다.
          alert('페이스북에 로그인해야 이용가능한 기능입니다.')
        }
      }, { scope: 'public_profile,email,user_gender,user_birthday' })
    },
    kakaoLogin () {
      window.Kakao.Auth.login({
        scope: 'account_email',
        success (response) {
        // 사용자 정보 가져오기
          window.Kakao.API.request({
            url: '/v2/user/me', // 계정 정보를 가져오는 request url
            success (response) {
              const user = response.kakao_account // 카카오 계정 정보
              user.host = 'kakao' // 다른 로그인 서비스와 구분하기 위해서 개인적으로 추가했음
              // 해당 페이지에서 객체를 만들고 곧바로 user 정보를 사용할 수 도 있고,
              // input 엘리먼트에 json으로 저장해뒀다가 나중에 사용할 수도 있음. 여기서는 input에 저장
              const userinfo = document.querySelector('#userinfo')
              if (userinfo) { userinfo.value = JSON.stringify(user) } // user를 json문자열로 변환해서 저장해두기
            },
            fail (error) {
              console.log(error)
            }
          })
        },
        fail (error) {
          console.log(error)
        }
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
          this.toggleLoginModal(false)
        }
      } catch (e) {
        console.error(e)
      }
    },
    handleKakaoLogin () {
      window.Kakao.Auth.authorize({
        redirectUri: 'http://localhost:3030/signup'
      })
    },
    goPage (path) {
      this.toggleLoginModal()
      this.$router.push(path)
    },
    close () {
      this.toggleLoginModal()
    }
  }
}
</script>

<style>

</style>

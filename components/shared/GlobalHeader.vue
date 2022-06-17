<template>
  <div class="global-header">
    <nuxt-link to="/">
      <img :src="require(`~/assets/images/top_logo.png`)" class="top_logos">
    </nuxt-link>
    <SlideMenu
      right
      no-overlay
    >
      <button v-if="userName" @click="e => goPage(e, '/user-info')">
        <span class="logout-border">{{ userName }}</span>
      </button>
      <button v-if="!userName" @click="toggleLoginModal(true)">
        <span class="lohout-border">로그인</span>
      </button>
      <button v-else @click="handleLogout">
        <span class="logout-border">로그아웃</span>
      </button>
      <ul id="main-menu">
        <li><a href="#" style="color:black; width:50px;">소개</a>
          <ul id="sub-menu">
            <li><nuxt-link class="alal" to="/platform-intro" aria-label="subemnu">플랫폼 소개</nuxt-link></li>
            <li><nuxt-link class="alal" to="/announce-list" aria-label="subemnu">공지사항</nuxt-link></li>
            <li><nuxt-link class="alal" to="/partners" aria-label="subemnu">천안시 청소년<br>유관기관 소개</nuxt-link></li>
          </ul>
        </li>
        <li><a href="#" style="color:black">정보</a>
          <ul id="sub-menu">
            <li><nuxt-link class="alal" to="/notice" aria-label="subemnu">교육자료 </nuxt-link></li>
            <li><nuxt-link class="alal" to="/freeboard-list" aria-label="subemnu">자율게시판</nuxt-link></li>
          </ul>
        </li>
        <li><a href="#" style="color:black">참여</a>
          <ul id="sub-menu">
            <li><nuxt-link class="alal" to="/excavation-list" aria-label="subemnu"> 의제발굴</nuxt-link></li>
            <li><nuxt-link class="alal" to="/excavation-list?type=children" aria-label="subemnu">의제발굴 (어린이)</nuxt-link></li>
            <li><nuxt-link class="alal" to="/suggest-list" aria-label="subemnu">정책제안</nuxt-link></li>
            <li><nuxt-link class="alal" to="/suggest-list?type=children" aria-label="subemnu">정책제안 (어린이)</nuxt-link></li>
          </ul>
        </li>
        <li><a href="#" style="color:black">설문</a>
          <ul id="sub-menu">
            <li><nuxt-link class="alal" to="/survey" aria-label="subemnu">청소년설문</nuxt-link></li>
          </ul>
        </li>
      </ul>
    </SlideMenu>
    <div class="navbar">
      <div class="pc global-menu">
        <div class="dropdown">
          <button class="dropbtn">소개</button>
          <div class="dropdown-content">
            <nuxt-link to="/platform-intro">
              <button class="nav_btn"><p>플랫폼 소개</p></button>
            </nuxt-link>
            <nuxt-link to="/announce-list">
              <button class="nav_btn"><p>공지사항</p></button>
            </nuxt-link>
            <nuxt-link to="/partners">
              <button class="nav_btn"><p>천안시 청소년<br>유관기관 소개</p></button>
            </nuxt-link>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">정보</button>
          <div class="dropdown-content">
            <nuxt-link to="/notice">
              <button class="nav_btn"><p>교육자료</p></button>
            </nuxt-link>
            <nuxt-link to="/freeboard-list">
              <button class="nav_btn"><p>자율게시판</p></button>
            </nuxt-link>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">참여</button>
          <div class="dropdown-content">
            <nuxt-link to="/excavation-list">
              <button class="nav_btn"><p>의제발굴</p></button>
            </nuxt-link>
            <nuxt-link to="/excavation-list?type=children">
              <button class="nav_btn"><p>의제발굴 (어린이)</p></button>
            </nuxt-link>
            <nuxt-link to="/suggest-list">
              <button class="nav_btn"><p>정책제안</p></button>
            </nuxt-link>
            <nuxt-link to="/suggest-list?type=children">
              <button class="nav_btn"><p>정책제안 (어린이)</p></button>
            </nuxt-link>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">설문</button>
          <div class="dropdown-content">
            <nuxt-link to="/survey">
              <button class="nav_btn"><p>청소년설문</p></button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="pc global-login">
      <template v-if="!userName">
        <button @click="toggleLoginModal">
          로그인
        </button>
        <button @click="toggleSignupModal(true)">
          <button>
            회원가입
          </button>
        </button>
      </template>
      <template v-else>
        <button @click="e => goPage(e, '/user-info')">
          {{ userName }}
        </button>
        <button @click="handleLogout">
          로그아웃
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
  },
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      showLoginModal: state => state.showLoginModal
    }),
    ...mapGetters([
      'getUserInfo'
    ]),
    userName () {
      return this.getUserInfo.user_name || ''
    },
    isEditMode () {
      return !!this.$route.query.idx
    }
  },
  created () {
    this.GET_USER_DATA()
  },
  methods: {
    ...mapActions([
      'GET_USER_DATA'
    ]),
    ...mapMutations([
      'toggleLoginModal',
      'toggleSignupModal'
    ]),
    goPage (e, path) {
      e.preventDefault()
      e.stopPropagation()
      this.$router.push(path)
    },
    async handleLogout () {
      localStorage.removeItem('idx')
      await this.GET_USER_DATA()
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>


<template>
  <div class="suggest-agree">
    <button class="wrapper" @click="handleAgree">
      <img src="@/assets/images/icon_like_zero.png" alt="">
      <span class="">제안에 공감해요</span>
      <h4>{{ likes }}</h4>
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    likes: {
      type: [String, Number],
      default: '0'
    }
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'getUserInfo'
    ])
  },
  methods: {
    async handleAgree () {
      if (!this.isLoggedIn) { return alert('로그인 해주세요.') }
      const res = await this.$axios.$get('/agreement/insert_agreement.do', {
        params: {
          agr_pro_idx: this.$route.query.idx,
          agr_user_idx: this.getUserInfo.idx
        }
      })
      const REQUEST_SUCCESS = 0
      if (res === REQUEST_SUCCESS) {
        await this.$store.dispatch('GET_SUGGEST_DETAIL', { idx: this.$route.query.idx })
        return alert('제안에 공감했습니다.')
      }
      if (typeof res === 'string') {
        return alert('이미 동의 했습니다.')
      }
    }
  }
}
</script>

<style>

</style>

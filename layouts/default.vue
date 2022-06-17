<template>
  <div class="default-layout">
    <GlobalHeader />
    <Nuxt />
    <GlobalFooter />
    <LoginModal v-if="showLoginModal" />
    <SignUpModal />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GlobalHeader from '@/components/shared/GlobalHeader.vue'
import GlobalFooter from '@/components/shared/GlobalFooter.vue'
import LoginModal from '@/components/LoginModal.vue'
import SignUpModal from '@/components/SignUpModal.vue'

export default {
  components: {
    GlobalHeader,
    GlobalFooter,
    LoginModal,
    SignUpModal
  },
  computed: {
    ...mapState({
      showLoginModal: state => state.showLoginModal
    })
  }
}
</script>

<style>

</style>

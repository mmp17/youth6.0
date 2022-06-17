<template>
  <div>
    <h1>naver</h1>
    <div id="naver_id_login" />
  </div>
</template>

<script>
/* eslint-disable new-cap */
export default {
  mounted () {
    const naverIdLogin = new window.naver_id_login('HKHwkmhqjhOQ5jy4tD3c', 'http://localhost:3030/login/naver')
    naverIdLogin.init_naver_id_login()
  },
  methods: {}
}
</script>

<style>

</style>

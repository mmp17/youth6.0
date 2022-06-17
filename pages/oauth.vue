<template>
  <div>
    login
  </div>
</template>

<script>
export default {
  async mounted () {
    try {
      window.Kakao.init('0814d058ce732a3b3fc2f5d3c7adf885')
      // eslint-disable-next-line no-undef
      const { query } = this.$route
      await this.$axios({
        url: 'https://kauth.kakao.com/oauth/token',
        method: 'post',
        params: {
          grant_type: 'authorization_code',
          client_id: '0814d058ce732a3b3fc2f5d3c7adf885',
          redirect_uri: 'http://localhost:3030/oauth',
          code: query.code
        },
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
    } catch (e) {
    }
  }
}
</script>

<style>

</style>

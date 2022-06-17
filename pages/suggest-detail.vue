<template>
  <div class="suggest-detail-page">
    <GlobalMain title="제안" />
    <StatusBar :status="suggest.pro_state" />
    <SuggestDetail :suggest="suggest" />
    <SuggestComments />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import GlobalMain from '~/components/shared/GlobalMain'
import StatusBar from '~/components/shared/StatusBar'
import SuggestDetail from '~/components/SuggestDetail'
import SuggestComments from '~/components/SuggestComments'

export default {
  components: {
    GlobalMain,
    StatusBar,
    SuggestDetail,
    SuggestComments
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      suggest: state => state.suggestDetail
    })
  },
  async created () {
    try {
      const { query: { idx, type } } = this.$route
      const isChildrenType = type === 'children'
      await this.GET_SUGGEST_DETAIL({ idx, isChildrenType })
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    ...mapActions([
      'GET_SUGGEST_DETAIL'
    ])
  }
}
</script>

<style>

</style>

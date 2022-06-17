<template>
  <div class="suggest-detail-page">
    <GlobalMain title="의제발굴" />
    <StatusBar :status="excavation.pro_state" />
    <ExcavationDetail :excavation="excavation" />
    <ExcavationComments />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import GlobalMain from '~/components/shared/GlobalMain'
import StatusBar from '~/components/shared/StatusBar'
import ExcavationDetail from '~/components/ExcavationDetail'
import ExcavationComments from '~/components/ExcavationComments'

export default {
  components: {
    GlobalMain,
    StatusBar,
    ExcavationDetail,
    ExcavationComments
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      excavation: state => state.excavationDetail
    })
  },
  async created () {
    try {
      const { query: { idx, type } } = this.$route
      const isChildrenType = type === 'children'
      await this.GET_EXCAVATION_DETAIL({ idx, isChildrenType })
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    ...mapActions([
      'GET_EXCAVATION_DETAIL'
    ])
  }
}
</script>

<style>

</style>

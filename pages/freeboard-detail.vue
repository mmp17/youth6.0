<template>
  <div class="notice-detail-page">
    <GlobalMain title="자율게시판" />
    <section class="notice-detail-page__list">
      <div class="title">
        <h2>{{ freeboard.commu_sub }}</h2>
        <div class="desc">
          <span>{{ freeboard.regdate }}</span>
          <span>{{ freeboard.commu_hit }}</span><br><br>
          <div>작성자&nbsp;&nbsp;&nbsp;&nbsp;{{ freeboard.commu_user_name }}</div>
          <!-- <span>{{ freeboard.name }}</span> -->
        </div>
      </div>
      <p>
        <Youtube v-show="freeboard.video_url" ref="youtube" :video-id="getIdFromUrl(freeboard.video_url)" @playing="playing" />
        <br v-show="freeboard.video_url">
        <!-- <br v-show="freeboard.video_url"> -->
        {{ freeboard.commu_con }}
        <template v-for="(image, index) in imageList">
          <img
            :key= "index"
            class="care-images"
            :src="`https://youthapi.co.kr${image.file_url}`"
            alt=""
          >
        </template>
      </p>
      <nuxt-link to="/freeboard-list">
        목록으로
      </nuxt-link>
    </section>
    <FreeboardComments />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { Youtube, getIdFromUrl } from 'vue-youtube'
import GlobalMain from '~/components/shared/GlobalMain'
import FreeboardComments from '~/components/FreeboardComments'

export default {
  components: {
    GlobalMain,
    Youtube,
    FreeboardComments
  },
  async asyncData ({ app, route }) {
    try {
      const { query: { idx } } = route
      const res = await app.$axios({
        url: `/community/community_read.do?idx=${idx}`,
        method: 'get'
      })
      return {
        freeboard: res.data
      }
    } catch (e) {
      console.error(e)
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo,
      freeboard: state => state.freeboardDetail
    }),
    imageList () {
      // console.log('file_list', this.freeboard.file_list)aa
      return this.freeboard.file_list
    }
  },
  async created () {
    try {
      const { query: { idx } } = this.$route
      await this.GET_FREEBOARD_DETAIL({ idx })
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    ...mapActions([
      'GET_FREEBOARD_DETAIL'
    ]),
    getIdFromUrl,
    playing () {
      console.log('o/ we are watching!!!')
    }
  }
}
</script>

<style>

</style>

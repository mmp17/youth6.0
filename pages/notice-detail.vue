<template>
  <div class="notice-detail-page">
    <GlobalMain title="교육자료" />
    <section class="notice-detail-page__list">
      <div class="title">
        <h2>{{ notice.noti_sub }}</h2>
        <div class="desc">
          <span>{{ notice.regdate }}</span>
          <span>{{ notice.noti_hit }}</span>
        </div>
      </div>
      <p>
        <Youtube v-show="notice.you_url" ref="youtube" :video-id="getIdFromUrl(notice.you_url)" @playing="playing" />
        <br v-show="notice.you_url">
        <br v-show="notice.you_url">
        {{ notice.noti_con }}
        <template v-for="(image, index) in imageList">
          <img
            :key="index"
            class="care-images"
            :src="`https://www.youthapi.co.kr${image.url}`"
            alt=""
          >
        </template>
      </p>
      <nuxt-link to="/notice" style="margin-top:-90px">
        목록으로
      </nuxt-link>
    </section>
  </div>
</template>

<script>
import { Youtube, getIdFromUrl } from 'vue-youtube'
import GlobalMain from '~/components/shared/GlobalMain'

export default {
  components: {
    GlobalMain,
    Youtube
  },
  async asyncData ({ app, route }) {
    try {
      const { query: { idx } } = route
      const res = await app.$axios({
        url: `/notice/read_notice.do?idx=${idx}`,
        method: 'get'
      })
      return {
        notice: res.data
      }
    } catch (e) {
      console.error(e)
    }
  },
  computed: {
    imageList () {
      return this.notice.care_image_list
    }
  },
  methods: {
    getIdFromUrl,
    playing () {
      console.log('o/ we are watching!!!')
    }
  }
}
</script>

<style>

</style>

<template>
  <div class="notice-detail-page">
    <GlobalMain title="공지사항" />
    <section class="notice-detail-page__list">
      <div class="title">
        <h2>{{ notice.noti_sub }}</h2>
        <div class="desc2">
          <span> : {{ notice.regdate }}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span> 시작일 : {{ notice.start_date }} &nbsp;&nbsp; 마감일 : {{ notice.end_date }}</span>
          <span>{{ notice.noti_hit }}</span>
        </div>
      </div>
      <p>
        <Youtube v-show="notice.you_url" ref="youtube" :video-id="getIdFromUrl(notice.you_url)" @playing="playing" />
        <br v-show="notice.you_url">
        <br v-show="notice.you_url">
        <span v-html="notice.noti_con"></span><br><br>
        <template v-for="(image, index) in imageList">
          <img
            :key="index"
            class="care-images"
            :src="`https://www.youthapi.co.kr${image.url}`"
            alt=""
          >
        </template>
      </p>
      <div class="content">
        <nuxt-link to="/announce-list">
          목록으로
        </nuxt-link>
      </div>
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
        url: `/noticenoti/read_noticenoti.do?idx=${idx}`,
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

<template>
  <div class="notice-page">
    <GlobalMain title="교육자료" />
    <section class="notice-page__list mobile">
      <nuxt-link v-for="notice in noticeList" :key="notice.idx" :to="`/notice-detail?idx=${notice.idx}`">
        <div class="content">
          <div class="title">
            {{ notice.noti_sub }}
          </div>
          <div class="desc">
            <span>{{ notice.regdate }}</span>
            <span>조회수 {{ notice.noti_hit }}</span>
          </div>
        </div>
      </nuxt-link>
    </section>
    <section class="notice-page__list pc">
      <div class="content">
        <div class="row-header">
          <span class="no">No.</span>
          <span class="title">제목</span>
          <span class="write-date">작성일</span>
          <span class="view">조회수</span>
        </div>
        <nuxt-link v-for="notice in noticeList" :key="notice.idx" :to="`/notice-detail?idx=${notice.idx}`">
          <div class="row-data">
            <span class="no">{{ notice.idx }}</span>
            <span class="title">{{ notice.noti_sub }}</span>
            <span class="write-date">{{ notice.regdate }}</span>
            <span class="view">{{ notice.noti_hit }}</span>
          </div>
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
import GlobalMain from '~/components/shared/GlobalMain'

export default {
  components: {
    GlobalMain
  },
  async asyncData ({ app }) {
    const res = await app.$axios({
      url: '/notice/notice_list.do',
      method: 'get'
    })
    return {
      noticeList: res.data
    }
  }
}
</script>

<style>

</style>

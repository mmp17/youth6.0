<template>
  <div class="notice-page">
    <GlobalMain title="공지사항" />
    <section class="notice-page__list mobile">
      <nuxt-link v-for="notice in noticeList" :key="notice.idx" :to="`/announce-detail?idx=${notice.idx}`">
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
        <nuxt-link v-for="notice in noticeList" :key="notice.idx" :to="`/announce-detail?idx=${notice.idx}`">
          <div class="row-data">
            <span v-if="notice.notice_top === 1" class="no"><div class="no"><img src="../assets/images/announce-clip.png" alt=""></div></span>
            <span v-if="notice.notice_top === 0" class="no">{{ notice.idx }}</span>
            <span class="title">{{ notice.noti_sub }}</span>
            <span class="write-date">{{ notice.regdate }}</span>
            <span class="view">{{ notice.noti_hit }}</span>
          </div>
          <!-- idx: {{ notice.idx }}<br>
          regdate: {{ notice.regdate }}<br>
          editdate: {{ notice.editdate }}<br>
          noti_user_idx: {{ notice.noti_user_idx }}<br>
          video_url: {{ notice.video_url }}<br>
          noti_name: {{ notice.noti_name }}<br>
          notice_top: {{ notice.notice_top }} -->
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
      url: '/noticenoti/noticenoti_list.do',
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

<template>
  <div class="notice-page">
    <GlobalMain title="공유설문" />
    <section class="notice-page__list mobile">
      <nuxt-link v-for="survey in surveyList" :key="survey.idx" :to="`/survey-detail?idx=${survey.idx}`">
        <div class="content">
          <div class="title">
            {{ survey.surv_sub }}
          </div>
          <div class="desc">
            <span>{{ survey.regdate }}</span>
          </div>
        </div>
      </nuxt-link>
    </section>
    <section class="notice-page__list pc">
      <div class="content">
        <div class="row-header">
          <span class="no">No.</span>
          <span class="title">제목</span>
          <span class="surv-show">활성여부</span>
          <span class="surv-regdate">작성일</span>
          <span class="surv-editdate">마감일</span>
          <span class="surv-participants">참여인원</span>
          <span class="surv-target">참여목표인원</span>
        </div>
        <nuxt-link v-for="survey in surveyList" :key="survey.idx" :to="`/survey-detail?idx=${survey.idx}`">
          <div class="row-data">
            <span class="no">{{ survey.idx }}</span>
            <span class="title">{{ survey.surv_sub }}</span>
            <span class="surv-show">{{ survey.surv_show }}</span>
            <span class="surv-regdate">{{ survey.regdate }}</span>
            <span class="surv-editdate">{{ survey.editdate }}</span>
            <span class="surv-participants">{{ survey.surv_participants_num }}</span>
            <span class="surv-target">{{ survey.surv_target_num }}</span>
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
      url: '/sharesurvey/sharesurvey_list.do',
      method: 'get'
    })
    return {
      surveyList: res.data
    }
  }
}
</script>

<style>

</style>

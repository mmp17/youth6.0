<template>
  <div class="survey-page">
    <section class="survey-page__gnb">
      <!---------------------------------------------->
      <!-- 2022-05-23/오늘 방문자 수/유기홍 -->
      <!-- 2022-05-23/today-hit/yoogihong -->
      <!---------------------------------------------->
      <!-- <div class="today-hit">
        <p>오늘 총 방문자:<span></span></p>
      </div> -->
      <!---------------------------------------------->
      <div class="d-day">
        D{{ survEndDDay }}
      </div>
      <h2>{{ main.surv_sub }}</h2>
      <el-progress :text-inside="true" :stroke-width="15" :percentage="survParticipationRate" />
      <div class="achieve">
        달성률 {{ survParticipationRate }}%
      </div>
      <div class="involve">
        <span>참여인원 : {{ main.surv_participants_num }}명</span>
        <span>참여 목표인원 : {{ main.surv_target_num }}명</span>
      </div>
      <a v-if="main.surv_show === 1" class="participate-survey" :href="main.surv_url" target="_blank">설문 참여하기 <i class="el-icon-right" /></a>
      <a v-if="main.surv_show === 0" class="participate-survey2">설문이 종료되었습니다.</a>
      <br>
      <br>
      <el-button @click="goPage('/survey')">목록으로</el-button>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import 'swiper/css/swiper.css'
import dayjs from 'dayjs'

export default {
  components: {
  },
  async asyncData ({ app, route }) {
    const { query: { idx } } = route
    const res = await app.$axios.$get(`/sharesurvey/sharesurvey_read.do?idx=${idx}`)
    return {
      main: res
    }
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 1,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      categorys: {
        전체: { src: require('~/assets/images/suggest-all.png'), label: '전체' },
        교육: { src: require('~/assets/images/suggest-edu.png'), label: '교육' },
        문화: { src: require('~/assets/images/suggest-culture.png'), label: '문화' },
        환경: { src: require('~/assets/images/suggest-environment.png'), label: '환경' },
        안전: { src: require('~/assets/images/suggest-safety.png'), label: '안전' },
        기타: { src: require('~/assets/images/suggest-etc.png'), label: '기타' }
      }
    }
  },
  computed: {
    ...mapGetters([
      'isMobileSize'
    ]),
    survEndDDay () {
      console.log('surv_sub', this.main.surv_sub)
      const remainHour = dayjs(this.main.surv_end_date).diff(new Date(), 'hour')
      const remainDays = Math.floor(remainHour / 24) + 1
      return remainDays > 0 ? `-${Math.abs(remainDays)}` : `+${Math.abs(remainDays)}`
    },
    survParticipationRate () {
      const {
        surv_participants_num: survParticipantsNum,
        surv_target_num: survTargetNum
      } = this.main
      return ((survParticipantsNum / survTargetNum) * 100)
    }
  },
  created () {

  },
  methods: {
    convertNewLine (str) {
      try {
        return str.split('\n').join('<br />')
      } catch (e) {
        return str
      }
    },
    goPage (path) {
      this.$router.push(path)
    }
  }
}
</script>

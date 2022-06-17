<template>
  <div class="suggest-detail-title">
    <div class="pc">
      <div class="wrapper">
        <div class="category">
          <img :src="category.src">
          <span class="label">{{ category.label }}</span>
        </div>
        <div class="desc">
          <h3>{{ suggest.pro_sub || '' }}</h3>
          <h4>{{ endDate }}</h4>
          <h5>작성자 : {{ suggest.pro_user_name }} &nbsp;&nbsp;||&nbsp;&nbsp; 작성일 : {{ suggest.regdate }}</h5>
        </div>
      </div>
      <div class="likes-views">
        <div class="likes">
          <img src="@/assets/images/icon_like.png" alt="">
          <span>{{ suggest.agreeCount }}</span>
        </div>
        <div class="views">
          <img src="@/assets/images/icon_see.png" alt="">
          <span>{{ suggest.pro_hit }}</span>
        </div>
      </div>
    </div>

    <div class="mobile">
      <div class="desc">
        <div class="category">
          <img :src="category.src">
          <span class="label">{{ category.label }}</span>
        </div>
        <div class="likes-views">
          <div class="likes">
            <img src="@/assets/images/icon_like.png" alt="">
            <span>{{ suggest.agreeCount }}</span>
          </div>
          <div class="views">
            <img src="@/assets/images/icon_see.png" alt="">
            <span>{{ suggest.pro_hit }}</span>
          </div>
        </div>
      </div>
      <h3>{{ suggest.pro_sub || '' }}</h3>
      <h4>{{ endDate }}</h4>
      <h5>작성자 : {{ suggest.pro_user_name }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    suggest: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    endDate () {
      try {
        return `~${this.suggest.end_date} 까지`
      } catch (e) {
        console.error(e)
        return ''
      }
    },
    type () {
      return this.suggest.pro_cate || '전체'
    },
    category () {
      const map = {
        전체: { src: require('~/assets/images/suggest-all.png'), label: '전체' },
        교육: { src: require('~/assets/images/suggest-edu.png'), label: '교육' },
        문화: { src: require('~/assets/images/suggest-culture.png'), label: '문화' },
        환경: { src: require('~/assets/images/suggest-environment.png'), label: '환경' },
        안전: { src: require('~/assets/images/suggest-safety.png'), label: '안전' },
        기타: { src: require('~/assets/images/suggest-etc.png'), label: '기타' }
      }
      return map[this.type]
    }
  }
}
</script>

<style>

</style>

<template>
  <div class="category-icon-page">
    <section>
      <img :src="category.src" alt="">
      <span class="label">{{ category.label }}</span>
      <span class="status">{{ selectedTabMenu }}</span>
      <span class="d-day">D{{ endDDay }}</span>
    </section>
  </div>
</template>

<script>

export default {
  props: {
    type: {
      type: String,
      default: 'all'
    },
    selectedTabMenu: {
      type: String,
      default: '진행중'
    },
    endDDay: {
      type: String,
      default: '0'
    }
  },
  computed: {
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

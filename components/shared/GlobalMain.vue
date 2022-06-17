<template>
  <div class="global-main">
    <img :src="imgSrc">
    <p>&nbsp;&nbsp;{{ title }}&nbsp;&nbsp;</p>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'small'
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    imgSrc () {
      const src = this.size === 'small' ? 'gnb-image.png' : 'gnb-main-image.png'
      return require(`~/assets/images/${src}`)
    }
  }
}
</script>

<style>

</style>

<template>
  <div class="suggest-detail">
    <SuggestDetailTitle :suggest="suggest" />
    <SuggestDetailParagraph v-if="!isChildrenType" title="배경" :paragraph="suggest.pro_content1" />
    <SuggestDetailParagraph title="주요내용" :paragraph="suggest.pro_content2" />
    <SuggestDetailParagraph v-if="!isChildrenType" title="기대효과" :paragraph="suggest.pro_content3" />
    <SuggestAgree :likes="suggest.agreeCount" />
  </div>
</template>

<script>
import SuggestDetailTitle from '~/components/SuggestDetailTitle'
import SuggestDetailParagraph from '~/components/SuggestDetailParagraph'
import SuggestAgree from '~/components/SuggestAgree'

export default {
  components: {
    SuggestDetailTitle,
    SuggestDetailParagraph,
    SuggestAgree
  },
  props: {
    suggest: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isChildrenType () {
      const { type } = this.$route.query
      return type === 'children'
    }
  }
}
</script>

<style>

</style>

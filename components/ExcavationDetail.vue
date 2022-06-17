<template>
  <div class="suggest-detail">
    <ExcavationDetailTitle :excavation="excavation" />
    <ExcavationDetailParagraph v-if="!isChildrenType" title="배경" :paragraph="excavation.pro_content1" />
    <ExcavationDetailParagraph title="주요내용" :paragraph="excavation.pro_content2" />
    <ExcavationDetailParagraph v-if="!isChildrenType" title="기대효과" :paragraph="excavation.pro_content3" />
    <ExcavationAgree :likes="excavation.agreeCount" />
  </div>
</template>

<script>
import ExcavationDetailTitle from '~/components/ExcavationDetailTitle'
import ExcavationDetailParagraph from '~/components/ExcavationDetailParagraph'
import ExcavationAgree from '~/components/ExcavationAgree'

export default {
  components: {
    ExcavationDetailTitle,
    ExcavationDetailParagraph,
    ExcavationAgree
  },
  props: {
    excavation: {
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

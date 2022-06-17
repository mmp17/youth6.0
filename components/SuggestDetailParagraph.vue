<template>
  <div class="suggest-detail-paragraph">
    <div class="pc">
      <div class="title">
        {{ title }}
      </div>
      <div class="paragraph">
        <p v-html="convertNewLine(paragraph)" />
      </div>
    </div>
    <div class="mobile">
      <div class="title">
        {{ title }}
      </div>
      <div class="paragraph">
        <p v-html="convertNewLine(paragraph)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '배경'
    },
    paragraph: {
      type: String,
      default: '바로 청소년 예산정책 제안대회에 참여하는 방법인데요! 천안시는 2019년 주민참여예산제 운영을 위해 천안시에 거주하는 청소년을 대상으로 청소년 예산정책 제안대회를 개최하고 있답니다. 우수 제안으로 선정된 사업에 대하여는 사업부서와 타당성 검토를 통해 2020년 예산편성에 반영할 계획이오니, 청소년 여러분들의 많은 참여를 부탁드 립니다.'
    }
  },
  methods: {
    convertNewLine (str) {
      try {
        return str.split('\n').join('<br />')
      } catch (e) {
        return str
      }
    }
  }
}
</script>

<style>

</style>

<template>
  <div class="status-bar-container">
    <div class="status-bar">
      <span class="background-status" />
      <span :class="classes" />
      <div class="label">
        <span>진행중</span>
        <span>완료</span>
        <span>실현</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: Number,
      default: 1
    }
  },
  computed: {
    classes () {
      return ['current-status', `step${this.status}`]
    }
  }
}
</script>

<style>

</style>

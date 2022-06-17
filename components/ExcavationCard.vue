<template>
  <div class="suggest-card">
    <nuxt-link :to="nuxtLink(excavation.idx)">
      <section class="pc" />
      <section class="mobile">
        <div class="about">
          <CategoryIcon
            :type="excavation.pro_cate"
            :selected-tab-menu="selectedTabMenu"
            :end-d-day="endDDay"
          />
        </div>
        <h2>{{ excavation.pro_sub }}</h2>
        <p>
          {{ excavation.pro_sub }}
        </p>
        <div class="summary">
          <span class="expired-day">
            {{ endDate }}
          </span>
          <div class="traffic">
            <img src="~/assets/images/icon_like.png" alt="">
            <span>
              {{ excavation.agreeCount }}
            </span>
            <img src="~/assets/images/icon_see.png" alt="">
            <span>
              {{ excavation.pro_hit }}
            </span>
          </div>
        </div>
      </section>
    </nuxt-link>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import CategoryIcon from '@/components/CategoryIcon'

export default {
  components: {
    CategoryIcon
  },
  props: {
    excavation: {
      type: Object,
      default: () => {}
    },
    selectedTabMenu: {
      type: String,
      default: '진행중'
    }
  },
  computed: {
    endDate () {
      try {
        return `~${this.excavation.end_date.slice(0, 10)} 까지`
      } catch (e) {
        return ''
      }
    },
    endDDay () {
      const remainHour = dayjs(this.excavation.end_date).diff(new Date(), 'hour')
      const dDay = Math.floor(remainHour / 24) + 1
      if (dDay > 0) { return `-${dDay}` }
      return `+${dDay * (-1)}`
    }
  },
  methods: {
    nuxtLink (idx) {
      const isChildrenType = this.$route.query.type === 'children'
      if (isChildrenType) { return `/excavation-detail?idx=${idx}&type=children` }
      return `/excavation-detail?idx=${idx}`
    }
  }
}
</script>

<style>

</style>

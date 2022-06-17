<template>
  <div class="notice-page">
    <GlobalMain title="자율게시판" />
    <section class="notice-page__list mobile">
      <nuxt-link v-for="freeboard in freeboardList" :key="freeboard.idx" :to="`/freeboard-detail?idx=${freeboard.idx}`">
        <div class="content">
          <div class="title">
            {{ freeboard.commu_sub }}
          </div>
          <div class="desc">
            <span>{{ freeboard.regdate }}</span>
            <span>조회수 {{ freeboard.commu_hit }}</span>
          </div>
        </div>
      </nuxt-link>
    </section>
    <section class="notice-page__list pc">
      <div class="content">
        <!-------------------------------------------------->
        <!-- 2022-05-23/글쓰기 버튼/유기홍 -->
        <!-- 2022-05-23/write-button/yoogihong -->
        <!-------------------------------------------------->
        <div class="row-bottom">
          <el-button to="/freeboard-register" @click="goPage('/freeboard-register')">
            글쓰기
          </el-button>
        </div>
        <!-------------------------------------------------->
        <div class="row-header">
          <span class="no">No.</span>
          <span class="title">제목</span>
          <span class="writer">작성자</span>
          <span class="write-date">작성일</span>
          <span class="view">조회수</span>
        </div>
        <nuxt-link v-for="freeboard in freeboardList" :key="freeboard.idx" :to="`/freeboard-detail?idx=${freeboard.idx}`">
          <div class="row-data">
            <span class="no">{{ freeboard.idx }}</span>
            <span class="title">{{ freeboard.commu_sub }}</span>
            <span class="writer">{{ freeboard.commu_user_name }}</span>
            <span class="write-date">{{ freeboard.regdate }}</span>
            <span class="view">{{ freeboard.commu_hit }}</span>
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
      url: '/community/community_list.do',
      method: 'get'
    })
    return {
      freeboardList: res.data
    }
  },
  methods: {
    goPage (path) {
      // const isChildrenType = this.$route.query.type === 'children'
      // if (isChildrenType) { return this.$router.push(`${path}?type=children`) }
      this.$router.push(path)
    }
  }
}

</script>

<style>

</style>

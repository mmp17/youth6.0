<template>
  <div class="suggest-page">
    <span v-if="isChildren==''"><GlobalMain title="정책제안" /></span>
    <span v-else><GlobalMain title="정책제안 (어린이)" /></span>
    <!-- 정책제안 -->
    <section class="suggest-types">
      <div v-for="category in categoryMenus" :key="category.src">
        <button :class="[category.label === selectedTypeMenu ? 'selected': '']" @click="handleTypeMenu(category.label)">
          <img :src="category.src">
          <span>{{ category.label }}</span>
        </button>
      </div>
    </section>
    <section class="suggest-list">
      <div class="tab-menus">
        <button v-for="menu in tabMenus" :key="menu" :class="[menu === selectedTabMenu ? 'selected' : '']" @click="handleTabMenu(menu)">
          {{ menu }}
        </button>
      </div>
      <div class="suggest-search">
        <el-button to="/suggest-register" @click="goPage('/suggest-register')">
          의견 제안하기
        </el-button>
      </div>
      <div class="total">
        <span>
          총 게시물 : {{ selectedSuggestData.length }}건
        </span>
      </div>
      <div
        class="suggest-card-container"
        :class="[isChildren ? 'children' : '']"
      >
        <SuggestCard
          v-for="(data, index) in selectedSuggestData"
          :key="index"
          :suggest="data"
          :selected-tab-menu="selectedTabMenu"
          :class="[isChildren ? 'children' : '']"
        />
      </div>
      <div v-if="!selectedSuggestData.length" class="suggest-card empty">
        <h2>
          데이터가 없습니다.
        </h2>
      </div>
    </section>
  </div>
</template>

<script>
import GlobalMain from '~/components/shared/GlobalMain'
import SuggestCard from '~/components/SuggestCard'

export default {
  components: {
    GlobalMain, SuggestCard
  },
  data () {
    return {
      select: '',
      selectedTypeMenu: '전체',
      categoryMenus: [
        { src: require('~/assets/images/suggest-all.png'), label: '전체' },
        { src: require('~/assets/images/suggest-edu.png'), label: '교육' },
        { src: require('~/assets/images/suggest-culture.png'), label: '문화' },
        { src: require('~/assets/images/suggest-environment.png'), label: '환경' },
        { src: require('~/assets/images/suggest-safety.png'), label: '안전' },
        { src: require('~/assets/images/suggest-etc.png'), label: '기타' }
      ],
      selectedTabMenu: '진행중',
      tabMenus: [
        '진행중', '완료된 제안', '실현된 제안'
      ],
      suggestList: []
    }
  },
  computed: {
    selectedSuggestData () {
      if (this.selectedTypeMenu === '전체') { return this.suggestList }
      const filteredByCategoryList = this.suggestList.filter(({ pro_cate: proCate }) => this.selectedTypeMenu === proCate)
      return filteredByCategoryList
    },
    isChildren () {
      const { type } = this.$route.query
      return type === 'children'
    }
  },
  watch: {
    '$route' (to, from) {
      const url = this.isChildren ? '/proposal/proposal_list_chil.do' : '/proposal/proposal_list.do'
      this.getSuggestList(url)
    }
  },
  created () {
    const url = this.isChildren ? '/proposal/proposal_list_chil.do' : '/proposal/proposal_list.do'
    this.getSuggestList(url)
  },
  methods: {
    goPage (path) {
      const isChildrenType = this.$route.query.type === 'children'
      if (isChildrenType) { return this.$router.push(`${path}?type=children`) }
      this.$router.push(path)
    },
    handleTypeMenu (type) {
      this.selectedTypeMenu = type
    },
    handleTabMenu (menu) {
      const map = !this.isChildren
        ? {
            진행중: '/proposal/proposal_list.do',
            '완료된 제안': '/proposal/proposal_end_list.do',
            '실현된 제안': '/proposal/proposal_realized_list.do'
          }
        : {
            진행중: '/proposal/proposal_list_chil.do',
            '완료된 제안': '/proposal/proposal_end_list_chil.do',
            '실현된 제안': '/proposal/proposal_realized_list_chil.do'
          }
      this.getSuggestList(map[menu])
      this.selectedTabMenu = menu
    },
    async getSuggestList (url) {
      const res = await this.$axios.$get(url)
      if (Array.isArray(res)) {
        this.suggestList = res
      }
    }
  }
}
</script>

<style>

</style>

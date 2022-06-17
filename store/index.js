export const state = () => ({
  counter: 0,
  userInfo: {},
  suggestDetail: {},
  freeboardDetail: {},
  excavationDetail: {},
  showLoginModal: false,
  showSignupModal: false
})

export const getters = {
  isLoggedIn: (state) => {
    return !!Object.keys(state.userInfo).length
  },
  getUserInfo: (state) => {
    return state.userInfo
  },
  getSuggestDetail: (state) => {
    return state.suggestDetail
  },
  getFreeboardDetail: (state) => {
    return state.freeboardDetail
  },
  getExcavationDetail: (state) => {
    return state.excavationDetail
  },
  isMobileSize: (state) => {
    return (window.innerWidth < 769)
  }
}

export const mutations = {
  increment (state) {
    state.counter++
  },
  SET_USER_INFO (state, obj) {
    state.userInfo = { ...obj }
  },
  SET_SUGGEST_DETAIL (state, obj) {
    state.suggestDetail = obj
  },
  SET_FREEBOARD_DETAIL (state, obj) {
    state.freeboardDetail = obj
  },
  SET_EXCAVATION_DETAIL (state, obj) {
    state.excavationDetail = obj
  },
  toggleLoginModal (state) {
    state.showLoginModal = !state.showLoginModal
  },
  toggleSignupModal (state, modalStatus) {
    state.showSignupModal = modalStatus
  }
}

export const actions = {
  async GET_SUGGEST_DETAIL (context, { idx, isChildrenType }) {
    const url = !isChildrenType ? '/proposal/read_proposal.do' : '/proposal/read_proposal_chil.do'
    const res = await this.$axios.$get(`${url}?idx=${idx}`)
    const isNotExistData = typeof res === 'string' && res.includes('수정할 제안 조회수')
    if (isNotExistData) {
      window.alert('존재하지 않는 제안입니다.')
      this.$router.push('/suggest-list')
      return
    }
    context.commit('SET_SUGGEST_DETAIL', res || {})
  },
  async GET_FREEBOARD_DETAIL (context, { idx }) {
    const url = '/community/community_read.do'
    const res = await this.$axios.$get(`${url}?idx=${idx}`)
    const isNotExistData = typeof res === 'string' && res.includes('수정할 제안 조회수')
    if (isNotExistData) {
      window.alert('존재하지 않는 제안입니다.')
      this.$router.push('/freeboard-list')
      return
    }
    context.commit('SET_FREEBOARD_DETAIL', res || {})
  },
  async GET_EXCAVATION_DETAIL (context, { idx, isChildrenType }) {
    const url = !isChildrenType ? '/excavation/read_excavation.do' : '/excavation/read_excavation_chil.do'
    const res = await this.$axios.$get(`${url}?idx=${idx}`)
    const isNotExistData = typeof res === 'string' && res.includes('수정할 제안 조회수')
    if (isNotExistData) {
      window.alert('존재하지 않는 제안입니다.')
      this.$router.push('/excavation-list')
      return
    }
    context.commit('SET_EXCAVATION_DETAIL', res || {})
  },
  async GET_USER_DATA (context) {
    try {
      if (!process.client) { return }
      const idx = localStorage.getItem('idx')
      if (!idx) {
        context.commit('SET_USER_INFO', {})
        return
      }
      const res = await this.$axios.$get('/user/login_info.do', {
        params: {
          idx
        }
      })
      if (Object.keys(res).length) {
        context.commit('SET_USER_INFO', res)
      }
    } catch (e) {
      console.error(e)
    }
  }
}

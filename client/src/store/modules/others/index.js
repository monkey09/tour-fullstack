const state = {
  sideBarStatus: true
}

const getters = {
  sideBarStatus: state => state.sideBarStatus
}

const actions = { 
  toggleSideBar ({ commit }, data) {
    commit('SET_SIDEBAR', data)
  }
}

const mutations = {
  SET_SIDEBAR (state, payload) {
    state.sideBarStatus = payload
  }
}

const othersModule = {
  state,
  getters,
  actions,
  mutations
}

export default othersModule
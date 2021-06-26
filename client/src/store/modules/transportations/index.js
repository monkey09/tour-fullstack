import axios from 'axios'

const state = {
  transportations: null,
  transportationsProgress: 0
}

const getters = {
  transportations: state => state.transportations,
  transportationsProgress: state => state.transportationsProgress,
}

const actions = {
  async getTransportations ({ commit }) {
    try {
      commit ('SET_TRANSPORTAIONSPROGRESS', 0)
      const transportations = await axios.get('/api/transportations', {
        onDownloadProgress: progressEvent => {
          commit ('SET_TRANSPORTAIONSPROGRESS', Math.round(progressEvent.loaded / progressEvent.total * 100))
        }
      })
      commit('SET_TRANSPORTAIONS', transportations.data)
      return
    } catch (e) {
      commit('SET_TRANSPORTAIONS', null)
      throw new Error()
    }
  },
  resetTransportations ({ commit }) {
    commit('SET_TRANSPORTAIONS', null)
    commit('SET_TRANSPORTAIONSPROGRESS', 0)
    return
  }
}

const mutations = {
  SET_TRANSPORTAIONS (state, payload) {
    state.transportations = payload
  },
  SET_TRANSPORTAIONSPROGRESS (state, payload) {
    state.transportationsProgress = payload
  },
}

const transportationModule = {
  state,
  getters,
  actions,
  mutations
}

export default transportationModule
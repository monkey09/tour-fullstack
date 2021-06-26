import axios from 'axios'

const state = {
  places: null,
  placesProgress: 0
}

const getters = {
  places: state => state.places,
  placesProgress: state => state.placesProgress
}

const actions = {
  async getPlaces ({ commit }) {
    try {
      commit ('SET_PLACESPROGRESS', 0)
      const places = await axios.get('/api/places', {
        onDownloadProgress: progressEvent => {
          commit ('SET_PLACESPROGRESS', Math.round(progressEvent.loaded / progressEvent.total * 100))
        }
      })
      commit('SET_PLACES', places.data)
      return
    } catch (e) {
      commit('SET_PLACES', null)
      throw new Error()
    }
  },
  resetPlaces ({ commit }) {
    commit('SET_PLACES', null)
    commit('SET_PLACESPROGRESS', 0)
    return
  }
}

const mutations = {
  SET_PLACES (state, payload) {
    state.places = payload
  },
  SET_PLACESPROGRESS (state, payload) {
    state.placesProgress = payload
  }
}

const placeModule = {
  state,
  getters,
  actions,
  mutations
}

export default placeModule
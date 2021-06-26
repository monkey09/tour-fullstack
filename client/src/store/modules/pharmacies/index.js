import axios from 'axios'

const state = {
  pharmacies: null,
  pharmaciesProgress: 0
}

const getters = {
  pharmacies: state => state.pharmacies,
  pharmaciesProgress: state => state.pharmaciesProgress
}

const actions = {
  async getPharmacies ({ commit }) {
    try {
      commit ('SET_PHARMACIESPROGRESS', 0)
      const pharmacies = await axios.get('/api/pharmacies', {
        onDownloadProgress: progressEvent => {
          commit ('SET_PHARMACIESPROGRESS', Math.round(progressEvent.loaded / progressEvent.total * 100))
        }
      })
      commit('SET_PHARMACIES', pharmacies.data)
      return
    } catch (e) {
      commit('SET_PHARMACIES', null)
      throw new Error()
    }
  },
  resetPharmacies ({ commit }) {
    commit('SET_PHARMACIES', null)
    commit('SET_PHARMACIESPROGRESS', 0)
    return
  }
}

const mutations = {
  SET_PHARMACIES (state, payload) {
    state.pharmacies = payload
  },
  SET_PHARMACIESPROGRESS (state, payload) {
    state.pharmaciesProgress = payload
  }
}

const pharmacyModule = {
  state,
  getters,
  actions,
  mutations
}

export default pharmacyModule
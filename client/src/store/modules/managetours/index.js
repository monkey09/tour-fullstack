import axios from 'axios'

const state = {
  manageTours: null,
  manageToursProgress: 0
}

const getters = {
  manageTours: state => state.manageTours,
  manageToursProgress: state => state.manageToursProgress
}

const actions = {
  async getManageTours ({ commit }) {
    try {
      commit ('SET_MANAGETOURSPROGRESS', 0)
      const manageTours = await axios.get('/api/tours/manage', {
        onDownloadProgress: progressEvent => {
          commit ('SET_MANAGETOURSPROGRESS', Math.round(progressEvent.loaded / progressEvent.total * 100))
        }
      })
      commit('SET_MANAGETOURS', manageTours.data)
      return
    } catch (e) {
      commit('SET_MANAGETOURS', null)
      throw new Error()
    }
  },
  async deleteUser ( _ , { id, tour }) {
    try {
      await axios.patch(`/api/tours/deleteuser/${id}`, tour)
      return 
    } catch (e) {
      throw new Error()
    }
  },
  shiftManageTour ({ state, commit }, { id, tourId}) {
    const checkTour = tour => tour._id == tourId
    const indexInTours = state.manageTours.findIndex(checkTour)
    const tours = state.manageTours
    tours[indexInTours].users = tours[indexInTours].users.filter(tourUser => {
      return tourUser._id !== id
    })
    commit('SET_MANAGETOURS', tours)
  },
  async deleteTour ({ dispatch } , id) {
    try {
      await axios.delete(`/api/tours/deletetour/${id}`)
      await dispatch('getManageTours')
      return
    } catch (e) {
      throw new Error()
    }
  },
  resetManageTours ({ commit }) {
    commit('SET_MANAGETOURS', null)
    commit('SET_MANAGETOURSPROGRESS', 0)
    return
  }
}

const mutations = {
  SET_MANAGETOURS (state, payload) {
    state.manageTours = payload
  },
  SET_MANAGETOURSPROGRESS (state, payload) {
    state.manageToursProgress = payload
  }
}

const manageToursModule = {
  state,
  getters,
  actions,
  mutations
}

export default manageToursModule
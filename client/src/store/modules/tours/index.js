import axios from 'axios'

const state = {
  tours: null,
  tour: null,
  toursProgress: 0,
  placeTours: null
}

const getters = {
  tours: state => state.tours,
  tour: state => state.tour,
  toursProgress: state => state.toursProgress,
  placeTours: state => state.placeTours
}

const actions = {
  async getTours ({ commit }) {
    try {
      commit ('SET_TOURSPROGRESS',0)
      const tours = await axios.get('/api/tours', {
        onDownloadProgress: progressEvent => {
          commit('SET_TOURSPROGRESS', Math.round(progressEvent.loaded / progressEvent.total * 100))
        }
      })
      commit('SET_TOURS', tours.data)
      return
    } catch (e) {
      commit('SET_TOURS', null)
      throw new Error()
    }
  },
  async addTour ( _ , data) {
    try {
      await axios.post('/api/tours', data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  updateTour ({ state, commit }, { user, tourId}) {
    const checkTour = tour => tour._id == tourId
    const indexInTours = state.tours.findIndex(checkTour)
    const tours = state.tours
    tours[indexInTours].users = tours[indexInTours].users.concat(user)
    commit('SET_TOURS', tours)
  },
  shiftTour ({ state, commit }, { user, tourId}) {
    const checkTour = tour => tour._id == tourId
    const indexInTours = state.tours.findIndex(checkTour)
    const tours = state.tours
    tours[indexInTours].users = tours[indexInTours].users.filter(tourUser => {
      return tourUser._id !== user._id
    })
    commit('SET_TOURS', tours)
  },
  async getUserTour ({ commit }, id) {
    try {
      const tour = await axios.get(`/api/tours/${id}`)
      commit('SET_TOUR', tour.data)
      return
    } catch (e) {
      commit('SET_TOUR', null)
      throw new Error()
    }
  },
  leaveTour ({ commit }) {
    commit('SET_TOUR', null)
  },
  async getPlaceTours({ commit }, id) {
    try { 
      const tours = await axios.get(`/api/tours/place/${id}`)
      commit('SET_PLACETOURS', tours.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  resetTours ({ commit }) {
    commit('SET_TOURS', null)
    commit('SET_TOUR', null)
    commit('SET_TOURSPROGRESS', 0)
    commit('SET_PLACETOURS', null)
    return
  }
}

const mutations = {
  SET_TOURS (state, payload) {
    state.tours = payload
  },
  SET_TOUR (state, payload) {
    state.tour = payload
  },
  SET_TOURSPROGRESS (state, payload) {
    state.toursProgress = payload
  },
  SET_PLACETOURS (state, payload) {
    state.placeTours = payload
  }
}

const tourModule = {
  state,
  getters,
  actions,
  mutations
}

export default tourModule
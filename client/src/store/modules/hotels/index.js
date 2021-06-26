import axios from 'axios'

const state = {
  hotels: null,
  hotel: null,
  hotelsProgress: 0
}

const getters = {
  hotels: state => state.hotels,
  hotel: state => state.hotel,
  hotelsProgress: state => state.hotelsProgress,
}

const actions = {
  async getHotels ({ commit }) {
    try {
      commit ('SET_HOTELSPROGRESS', 0)
      const hotels = await axios.get('/api/hotels', {
        onDownloadProgress: progressEvent => {
          commit ('SET_HOTELSPROGRESS', Math.round(progressEvent.loaded / progressEvent.total * 100))
        }
      })
      commit('SET_HOTELS', hotels.data)
      return
    } catch (e) {
      commit('SET_HOTELS', null)
      throw new Error()
    }
  },
  async getHotel ({ commit }, id) {
    try {
      const hotel = await axios.get(`/api/hotels/${id}`)
      commit('SET_HOTEL', hotel.data)
      return
    } catch (e) {
      commit('SET_HOTEL', null)
      throw new Error()
    }
  },
  resetHotels ({ commit }) {
    commit('SET_HOTELS', null)
    commit('SET_HOTEL', null)
    commit('SET_HOTELSPROGRESS', 0)
    return
  }
}

const mutations = {
  SET_HOTELS (state, payload) {
    state.hotels = payload
  },
  SET_HOTEL (state, payload) {
    state.hotel = payload
  },
  SET_HOTELSPROGRESS (state, payload) {
    state.hotelsProgress = payload
  },
}

const hotelModule = {
  state,
  getters,
  actions,
  mutations
}

export default hotelModule
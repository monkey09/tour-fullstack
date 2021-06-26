import axios from 'axios'

const state = {
  restaurants: null,
  restaurant: null,
  restaurantsProgress: 0
}

const getters = {
  restaurants: state => state.restaurants,
  restaurant: state => state.restaurant,
  restaurantsProgress: state => state.restaurantsProgress,
}

const actions = {
  async getRestaurants ({ commit }) {
    try {
      commit ('SET_RESTAURANTSPROGRESS', 0)
      const restaurants = await axios.get('/api/restaurants', {
        onDownloadProgress: progressEvent => {
          commit ('SET_RESTAURANTSPROGRESS', Math.round(progressEvent.loaded / progressEvent.total * 100))
        }
      })
      commit('SET_RESTAURANTS', restaurants.data)
      return
    } catch (e) {
      commit('SET_RESTAURANTS', null)
      throw new Error()
    }
  },
  async getRestaurant ({ commit }, id) {
    try {
      const restaurant = await axios.get(`/api/restaurants/${id}`)
      commit('SET_RESTAURANT', restaurant.data)
      return
    } catch (e) {
      commit('SET_RESTAURANT', null)
      throw new Error()
    }
  },
  resetRestaurant ({ commit }) {
    commit('SET_RESTAURANTS', null)
    commit('SET_RESTAURANT', null)
    commit('SET_RESTAURANTSPROGRESS', 0)
    return
  }
}

const mutations = {
  SET_RESTAURANTS (state, payload) {
    state.restaurants = payload
  },
  SET_RESTAURANT (state, payload) {
    state.restaurant = payload
  },
  SET_RESTAURANTSPROGRESS (state, payload) {
    state.restaurantsProgress = payload
  },
}

const restaurantModule = {
  state,
  getters,
  actions,
  mutations
}

export default restaurantModule
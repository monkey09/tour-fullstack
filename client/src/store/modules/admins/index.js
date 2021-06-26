import axios from 'axios'

const state = {
  tokenAdmin: null,
  admin: null,
  adPlaces: null,
  adHotels: null,
  adRestaurants: null,
  adTransportations: null,
  adPharmacies: null,
  adNews: null,
  users: null,
  guides: null,
  adUserPosts: null,
  adUserHotel: null,
  adUserRestaurant: null,
  adUserTour: null,
  adGuidePosts: null,
  adGuideTours: null,
  allPosts: null,
  allComments: null,
  month: null,
  placesCount: null,
  hotelsCount: null,
  restaurantsCount: null,
  transportationsCount: null,
  pharmaciesCount: null,
  newsCount: null,
  userMessages: null,
}

const getters = {
  authAdmin: state => state.tokenAdmin && state.admin,
  admin: state => state.admin,
  adPlaces: state => state.adPlaces,
  adHotels: state => state.adHotels,
  adRestaurants: state => state.adRestaurants,
  adTransportations: state => state.adTransportations,
  adPharmacies: state => state.adPharmacies,
  adNews: state => state.adNews,
  users: state => state.users,
  guides: state => state.guides,
  adUserPosts: state => state.adUserPosts,
  adUserHotel: state => state.adUserHotel,
  adUserRestaurant: state => state.adUserRestaurant,
  adUserTour: state => state.adUserTour,
  adGuidePosts: state => state.adGuidePosts,
  adGuideTours: state => state.adGuideTours,
  allPosts: state => state.allPosts,
  allComments: state => state.allComments,
  month: state => state.month,
  placesCount: state => state.placesCount,
  hotelsCount: state => state.hotelsCount,
  restaurantsCount: state => state.restaurantsCount,
  transportationsCount: state => state.transportationsCount,
  pharmaciesCount: state => state.pharmaciesCount,
  newsCount: state => state.newsCount,
  userMessages: state => state.userMessages,
}

const actions = {
  async loginAdmin ({ dispatch }, credentials) {
    try {
      const response = await axios.post('/api/admins/login', credentials)
      return dispatch('attempt', response.data.token)
    } catch (e) {
      throw new Error()
    }
  },
  async attempt ({ commit, state }, token) {
    if (token) commit ('SET_TOKEN', token)
    if (!state.tokenAdmin) return
    try {
      const admin = await axios.get('/api/admins/me')
      commit ('SET_ADMIN', admin.data)
    } catch (e) {
      //dispatch('logoutUser')
      // commit ('SET_TOKEN', null)
      // commit ('SET_USER', null)
      throw new Error()
    }
  },
  async logoutAdmin ({ commit }) {
    try {
        const response = await axios.post('/api/admins/logout')
        commit('SET_TOKEN', null)
        commit('SET_ADMIN', null)   
        localStorage.removeItem('token')
        return response
    } catch (e) {
        throw new Error()
    }   
  },
  async updateAdminAction ({ commit }, data) {
    const formContainer = Object.keys(data)
    let validateForm = {}
    formContainer.forEach(content => {
        if (data[content] !== '') {
          validateForm[content] = data[content]
        }
    })
    try {
        const admin = await axios.patch('/api/admins', validateForm)
        commit('SET_ADMIN', admin.data)
    } catch (e) {
        throw new Error()
    }
  },
  async updateAdminAvatar ({ commit }, formData) {
    try {
      const admin = await axios.post('/api/admins/uploadimage', formData)
      commit('SET_ADMIN', admin.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async deleteAdminAvatar ({ commit }) {
    try {
      const admin = await axios.delete('/api/admins/deleteimage')
      commit('SET_ADMIN', admin.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async getAdPlaces ({ commit }) {
    try {
      const places = await axios.get('/api/places/')
      commit('SET_ADPLACES', places.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async getAdHotels ({ commit }) {
    try {
      const hotels = await axios.get('/api/hotels/')
      commit('SET_ADHOTELS', hotels.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async getAdRestaurants ({ commit }) {
    try {
      const restaurants = await axios.get('/api/restaurants/')
      commit('SET_ADRESTAURANTS', restaurants.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async getAdTransportations ({ commit }) {
    try {
      const transportations = await axios.get('/api/transportations/')
      commit('SET_ADTRANSPORTATIONS', transportations.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async getAdPharmacies ({ commit }) {
    try {
      const pharmacies = await axios.get('/api/pharmacies/')
      commit('SET_ADPHARMACIES', pharmacies.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async getAdNews ({ commit }) {
    try {
      const news = await axios.get('/api/news/')
      commit('SET_ADNEWS', news.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async getUsers ({ commit }) {
    try{
      const users = await axios.get('/api/users/')
      commit('SET_USERS', users.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async userPosts ({ commit }, id) {
    try {
      const posts = await axios.get(`/api/posts/adposts/${id}`)
      commit('SET_ADUSERPOSTS', posts.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async userHotel ({ commit }, id) {
    try {
      const hotel = await axios.get(`/api/hotels/${id}`)
      commit('SET_ADUSERHOTEL', hotel.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async userRestaurant ({ commit }, id) {
    try {
      const restaurant = await axios.get(`/api/restaurants/${id}`)
      commit('SET_ADUSERRESTAURANT', restaurant.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async userTour ({ commit }, id) {
    try {
      const tour = await axios.get(`/api/tours/${id}`)
      commit('SET_ADUSERTOUR', tour.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async getGuides ({ commit }) {
    try{
      const guides = await axios.get('/api/tourguides/')
      commit('SET_GUIDES', guides.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async guidePosts ({ commit }, id) {
    try {
      const posts = await axios.get(`/api/posts/adposts/${id}`)
      commit('SET_ADGUIDEPOSTS', posts.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async guideTours ({ commit }, id) {
    try {
      const tours = await axios.get(`/api/tours/guide/${id}`)
      commit('SET_ADGUIDETOURS', tours.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async getAllPosts ({ commit }) {
    try {
      const posts = await axios.get(`/api/posts/`)
      commit('SET_ALLPOSTS', posts.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async getAllComments ({ commit }) {
    try {
      const comments = await axios.get(`/api/comments/`)
      commit('SET_ALLCOMMENTS', comments.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async addNew ({ dispatch }, data) {
    try {
      await axios.post('/api/news/', data)
      dispatch('getAdNews')
      return
    } catch (e) {
      throw new Error()
    }
  },
  async addPlace ({ dispatch }, data) {
    try {
      await axios.post('/api/places/', data)
      dispatch('getAdPlaces')
      return
    } catch (e) {
      throw new Error()
    }
  },
  async addHotel ({ dispatch }, data) {
    try {
      await axios.post('/api/hotels/', data)
      dispatch('getAdHotels')
      return
    } catch (e) {
      throw new Error()
    }
  },
  async addRestaurant ({ dispatch }, data) {
    try {
      await axios.post('/api/restaurants/', data)
      dispatch('getAdRestaurants')
      return
    } catch (e) {
      throw new Error()
    }
  },
  async addPharmacy ({ dispatch }, data) {
    try {
      await axios.post('/api/pharmacies/', data)
      dispatch('getAdPharmacies')
      return
    } catch (e) {
      throw new Error()
    }
  },
  async addTransportation ({ dispatch }, data) {
    try {
      await axios.post('/api/transportations/', data)
      dispatch('getAdTransportations')
      return
    } catch (e) {
      throw new Error()
    }
  },
  async deleteHotel ({ dispatch } , id) {
    try {
      await axios.delete(`/api/hotels/${id}`)
      dispatch('getAdHotels')
      return
    } catch (e) {
      throw new Error()
    }
  },
  async deleteRestaurant ({ dispatch } , id) {
    try {
      await axios.delete(`/api/restaurants/${id}`)
      dispatch('getAdRestaurants')
      return
    } catch (e) {
      throw new Error()
    }
  },
  async deleteTransportation ({ dispatch } , id) {
    try {
      await axios.delete(`/api/transportations/${id}`)
      dispatch('getAdTransportations')
      return
    } catch (e) {
      throw new Error()
    }
  },
  async deletePharmacy ({ dispatch } , id) {
    try {
      await axios.delete(`/api/pharmacies/${id}`)
      dispatch('getAdPharmacies')
      return
    } catch (e) {
      throw new Error()
    }
  },
  async deleteNew ({ dispatch } , id) {
    try {
      await axios.delete(`/api/news/${id}`)
      dispatch('getAdNews')
      return
    } catch (e) {
      throw new Error()
    }
  },
  async deleteAdPost ({ dispatch } , id) {
    try {
      await axios.delete(`/api/posts/${id}`)
      dispatch('getAllPosts')
      return
    } catch (e) {
      throw new Error()
    }
  },
  async deleteComment ({ dispatch } , id) {
    try {
      await axios.delete(`/api/comments/${id}`)
      dispatch('getAllComments')
      return
    } catch (e) {
      throw new Error()
    }
  },
  async getMonth ({ commit }) {
    try {
      const response = await axios.get('/api/tourguides/month')
      commit('SET_MONTH', response.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async getPlacesCount ({ commit }) {
    try {
      const response = await axios.get('/api/places/count')
      commit('SET_PLACESCOUNT', response.data.count)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async getHotelsCount ({ commit }) {
    try {
      const response = await axios.get('/api/hotels/count')
      commit('SET_HOTELSCOUNT', response.data.count)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async getRestaurantsCount ({ commit }) {
    try {
      const response = await axios.get('/api/restaurants/count')
      commit('SET_RESTAURANTSCOUNT', response.data.count)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async getTransportationsCount ({ commit }) {
    try {
      const response = await axios.get('/api/transportations/count')
      commit('SET_TRANSPORTATIONSCOUNT', response.data.count)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async getPharmaciesCount ({ commit }) {
    try {
      const response = await axios.get('/api/pharmacies/count')
      commit('SET_PHARMACIESCOUNT', response.data.count)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async getNewsCount ({ commit }) {
    try {
      const response = await axios.get('/api/news/count')
      commit('SET_NEWSCOUNT', response.data.count)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async getUserMessages ({ commit }, id) {
    try {
      const messages = await axios.get(`/api/contacts/${id}`)
      commit('SET_USERMESSAGES', messages.data)
    } catch (e) {
      throw new Error()
    }
  },
  async addAnswer ({ dispatch } , data) {
    try {
      await axios.post('/api/contacts/answer/', data)
      await dispatch('getUserMessages', data.creator)
      return
    } catch (e) {
      throw new Error()
    }
  },
  refreshUser ({ commit }) {
    commit('SET_ADUSERPOSTS', null)
    commit('SET_ADUSERHOTEL', null)
    commit('SET_ADUSERRESTAURANT', null)
    commit('SET_ADUSERTOUR', null)
    return
  },
  refreshGuide ({ commit }) {
    commit('SET_ADGUIDEPOSTS', null)
    commit('SET_ADGUIDETOURS', null)
    return
  },
  resetAdmin ({ commit }) {
    commit('SET_USERS', null)
    commit('SET_GUIDES', null)
    commit('SET_ADPLACES', null)
    commit('SET_ADHOTELS', null)
    commit('SET_ADRESTAURANTS', null)
    commit('SET_ADTRANSPORTATIONS', null)
    commit('SET_ADPHARMACIES', null)
    commit('SET_ADNEWS', null)
    commit('SET_ADUSERPOSTS', null)
    commit('SET_ADUSERHOTEL', null)
    commit('SET_ADUSERRESTAURANT', null)
    commit('SET_ADUSERTOUR', null)
    commit('SET_ADGUIDETOURS', null)
    commit('SET_ADGUIDEPOSTS', null)
    commit('SET_ALLPOSTS', null)
    commit('SET_ALLCOMMENTS', null)
    commit('SET_MONTH', null)
    commit('SET_PLACESCOUNT', null)
    commit('SET_HOTELSCOUNT', null)
    commit('SET_RESTAURANTSCOUNT', null)
    commit('SET_TRANSPORTATIONSCOUNT', null)
    commit('SET_PHARMACIESCOUNT', null)
    commit('SET_NEWSCOUNT', null)
    commit('SET_USERMESSAGES', null)
    return
  }
}

const mutations = {
  SET_TOKEN (state, payload) {
    state.tokenAdmin = payload
  },
  SET_ADMIN (state, payload) {
    state.admin = payload
  },
  SET_ADPLACES (state, payload) {
    state.adPlaces = payload
  },
  SET_ADHOTELS (state, payload) {
    state.adHotels = payload
  },
  SET_ADRESTAURANTS (state, payload) {
    state.adRestaurants = payload
  },
  SET_ADTRANSPORTATIONS (state, payload) {
    state.adTransportations = payload
  },
  SET_ADPHARMACIES (state, payload) {
    state.adPharmacies = payload
  },
  SET_ADNEWS (state, payload) {
    state.adNews = payload
  },
  SET_USERS (state, payload) {
    state.users = payload
  },
  SET_GUIDES (state, payload) {
    state.guides = payload
  },
  SET_ADUSERPOSTS (state, payload) {
    state.adUserPosts = payload
  },
  SET_ADUSERHOTEL (state, payload) {
    state.adUserHotel = payload
  },
  SET_ADUSERRESTAURANT (state, payload) {
    state.adUserRestaurant = payload
  },
  SET_ADUSERTOUR (state, payload) {
    state.adUserTour = payload
  },
  SET_ADGUIDEPOSTS (state, payload) {
    state.adGuidePosts = payload
  },
  SET_ADGUIDETOURS (state, payload) {
    state.adGuideTours = payload
  },
  SET_ALLPOSTS (state, payload) {
    state.allPosts = payload
  },
  SET_ALLCOMMENTS (state, payload) {
    state.allComments = payload
  },
  SET_MONTH (state, payload) {
    state.month = payload
  },
  SET_PLACESCOUNT (state, payload) {
    state.placesCount = payload
  },
  SET_HOTELSCOUNT (state, payload) {
    state.hotelsCount = payload
  },
  SET_RESTAURANTSCOUNT (state, payload) {
    state.restaurantsCount = payload
  },
  SET_TRANSPORTATIONSCOUNT (state, payload) {
    state.transportationsCount = payload
  },
  SET_PHARMACIESCOUNT (state, payload) {
    state.pharmaciesCount = payload
  },
  SET_NEWSCOUNT (state, payload) {
    state.newsCount = payload
  },
  SET_USERMESSAGES (state, payload) {
    state.userMessages = payload
  },
}

const adminModule = {
  state,
  getters,
  actions,
  mutations
}

export default adminModule
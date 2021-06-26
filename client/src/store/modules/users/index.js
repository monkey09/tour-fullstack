import axios from 'axios'

const state = {
  tokenUser: null,
  user: null,
  userPosts: null,
  userPostsProgress: 0
}

const getters = {
  authUser: state => state.tokenUser && state.user,
  user: state => state.user,
  userPosts: state => state.userPosts,
  userPostsProgress: state => state.userPostsProgress
}

const actions = {
  async loginUser ({ dispatch }, credentials) {
    try {
      let response = await axios.post('/api/users/login', credentials)
      if (response.data.user) {
        await dispatch('attempt', response.data.token)
        return undefined
      } else return response.data.token
    } catch (e) {
      throw new Error()
    }
  },
  async attempt ({ commit, state }, token) {
    if (token) commit ('SET_TOKEN', token)
    if (!state.tokenUser) return
    try {
      const user = await axios.get('/api/users/me')
      commit ('SET_USER', user.data)
    } catch (e) {
      //dispatch('logoutUser')
      // commit ('SET_TOKEN', null)
      // commit ('SET_USER', null)
      throw new Error()
    }
  },
  async logoutUser ({ commit }) {
    try {
        const response = await axios.post('/api/users/logout')
        commit('SET_TOKEN', null)
        commit('SET_USER', null)   
        localStorage.removeItem('token')
        return response
    } catch (e) {
        throw new Error()
    }   
  },
  async signupUser ( _ , data) {
    try {
        return await axios.post("/api/users", data)
    } catch (e) {
        throw new Error()
    }
  },
  async updateUserAction ({ commit }, data) {
    const formContainer = Object.keys(data)
    let validateForm = {}
    formContainer.forEach(content => {
        if (data[content] !== '') {
          validateForm[content] = data[content]
        }
    })
    try {
        const user = await axios.patch('/api/users', validateForm)
        commit('SET_USER', user.data)
    } catch (e) {
        throw new Error()
    }
  },
  async updateUserAvatar ({ commit }, formData) {
    try {
      const user = await axios.post('/api/users/uploadimage', formData)
      commit('SET_USER', user.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async deleteUserAvatar ({ commit }) {
    try {
      const user = await axios.delete('/api/users/deleteimage')
      commit('SET_USER', user.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async pushUserLike ({ commit } , id) {
    try {
      const response = await axios.patch(`/api/users/like/${id}`)
      commit('SET_USER', response.data.user)
      return response.data.alreadyLiked
    } catch (e) {
      throw new Error()
    }
  },
  async getUserPosts ({ commit }) {
    try {
      commit('SET_USERPOSTSPROGRESS', 0)
      const posts = await axios.get('/api/posts/myposts', {
        onDownloadProgress: progressEvent => {
          commit ('SET_USERPOSTSPROGRESS', Math.round(progressEvent.loaded / progressEvent.total * 100))
        }
      })
      commit ('SET_USERPOSTS', posts.data)
      return
    } catch (e) {
      commit ('SET_USERPOSTS', null)
      throw new Error()
    }
  },
  async deleteUserPost ({ dispatch }, id) {
    try {
      await axios.delete(`/api/posts/${id}`)
      dispatch('getUserPosts')
      return
    } catch (e) {
      throw new Error()
    }
  },
  async reserveHotel ({ commit }, data) {
    try {
      const user = await axios.post('/api/users/hotel', data)
      commit('SET_USER', user.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async reserveRestaurant ({ commit }, data) {
    try {
      const user = await axios.post('/api/users/restaurant', data)
      commit('SET_USER', user.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async joinTour ({ commit }, id) {
    try {
      const user = await axios.post(`/api/users/jointour/${id}`)
      commit('SET_USER', user.data)
      return user.data
    } catch (e) {
      throw new Error()
    }
  },
  async unJoinTour ({ commit }) {
    try {
      const user = await axios.post('/api/users/unjointour')
      commit('SET_USER', user.data)
      return user.data
    } catch (e) {
      throw new Error()
    }
  },
  resetUser ({ commit }) {
    commit('SET_USERPOSTS', null)
    commit('SET_USERPOSTSPROGRESS', 0)
    return
  }
}

const mutations = {
  SET_TOKEN (state, payload) {
    state.tokenUser = payload
  },
  SET_USER (state, payload) {
    state.user = payload
  },
  SET_USERPOSTS (state, payload) {
    state.userPosts = payload
  },
  SET_USERPOSTSPROGRESS (state, payload) {
    state.userPostsProgress = payload
  }
}

const userModule = {
  state,
  getters,
  actions,
  mutations
}

export default userModule
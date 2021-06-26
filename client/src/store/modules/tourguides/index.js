import axios from 'axios'

const state = {
  tokenGuide: null,
  tourguide: null,
  guidePosts: null,
  guidePostsProgress: 0
}

const getters = {
  authGuide: state => state.tokenGuide && state.tourguide,
  tourguide: state => state.tourguide,
  guidePosts: state => state.guidePosts,
  guidePostsProgress: state => state.guidePostsProgress
}

const actions = {
  async loginGuide ({ dispatch }, token) {
    return dispatch('attempt', token)
  },
  async attempt ({ commit, state }, token) {
    if (token) commit ('SET_TOKEN', token)
    if (!state.tokenGuide) return
    try {
      const tourguide = await axios.get('/api/tourguides/me')
      commit ('SET_TOURGUIDE', tourguide.data)
    } catch (e) {
      // commit ('SET_TOKEN', null)
      // commit ('SET_TOURGUIDE', null)
      throw new Error()
    }
  },
  async logoutGuide ({ commit }) {
    try {
        const response = await axios.post('/api/tourguides/logout')
        commit('SET_TOKEN', null)
        commit('SET_TOURGUIDE', null)
        localStorage.removeItem('token')
        return response
    } catch (e) {
        throw new Error()
    }   
  },
  async signupGuide ( _ , data) {
    try {
        return await axios.post("/api/tourguides", data)
    } catch (e) {
        throw new Error()
    }
  },
  async updateGuideAction ({ commit }, data) {
    const formContainer = Object.keys(data)
    let validateForm = {}
    formContainer.forEach(content => {
        if (data[content] !== '') {
          validateForm[content] = data[content]
        }
    })
    try {
        const tourguide = await axios.patch('/api/tourguides', validateForm)
        commit('SET_TOURGUIDE', tourguide.data)
    } catch (e) {
        throw new Error()
    }
  },
  async updateGuideAvatar ({ commit }, formData) {
    try {
      const guide = await axios.post('/api/tourguides/uploadimage', formData)
      commit('SET_TOURGUIDE', guide.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async deleteGuideAvatar ({ commit }) {
    try {
      const guide = await axios.delete('/api/tourguides/deleteimage')
      commit('SET_TOURGUIDE', guide.data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  async pushGuideLike ({ commit } , id) {
    try {
      const response = await axios.patch(`/api/tourguides/like/${id}`)
      commit('SET_TOURGUIDE', response.data.tourguide)
      return response.data.alreadyLiked
    } catch (e) {
      throw new Error()
    }
  },
  async getGuidePosts ({ commit }) {
    try {
      commit('SET_GUIDEPOSTSPROGRESS', 0)
      const posts = await axios.get('/api/posts/myposts', {
        onDownloadProgress: progressEvent => {
          commit ('SET_GUIDEPOSTSPROGRESS', Math.round(progressEvent.loaded / progressEvent.total * 100))
        }
      })
      commit ('SET_GUIDEPOSTS', posts.data)
      return
    } catch (e) {
      commit ('SET_GUIDEPOSTS', null)
      throw new Error()
    }
  },
  async deleteGuidePost ({ dispatch }, id) {
    try {
      await axios.delete(`/api/posts/${id}`)
      dispatch('getGuidePosts')
      return
    } catch (e) {
      throw new Error()
    }
  },
  resetGuide ({ commit }) {
    commit('SET_GUIDEPOSTS', null)
    commit('SET_GUIDEPOSTSPROGRESS', 0)
    return
  }
}

const mutations = {
  SET_TOKEN (state, payload) {
    state.tokenGuide = payload
  },
  SET_TOURGUIDE (state, payload) {
    state.tourguide = payload
  },
  SET_GUIDEPOSTS (state, payload) {
    state.guidePosts = payload
  },
  SET_GUIDEPOSTSPROGRESS (state, payload) {
    state.guidePostsProgress = payload
  }
}

const tourguideModule = {
  state,
  getters,
  actions,
  mutations
}

export default tourguideModule
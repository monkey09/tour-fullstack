import axios from 'axios'

const state = {
  comments: null
}

const getters = {
  comments: state => state.comments
}

const actions = {
  async getComments ({ commit }, id) {
    try {
      const comments = await axios.get(`/api/comments/${id}`)
      commit ('SET_COMMENTS', comments.data)
      return
    } catch (e) {
      commit ('SET_COMMENTS', null)
      throw new Error()
    }
  },
  async addCommentAction ({ dispatch }, data) {
    try {
        await axios.post('/api/comments', data)
        dispatch('getComments', data.post)
        return
    } catch (e) {
        throw new Error()
    }
  },
  resetComments ({ commit }) {
    commit('SET_COMMENTS', null)
    return
  }
}

const mutations = {
  SET_COMMENTS (state, payload) {
    state.comments = payload
  }
}

const commentModule = {
  state,
  getters,
  actions,
  mutations
}

export default commentModule


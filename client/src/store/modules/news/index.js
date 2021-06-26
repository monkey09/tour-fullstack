import axios from 'axios'

const state = {
  news: null,
  brief: null,
  newsProgress: 0
}

const getters = {
  news: state => state.news,
  brief: state => state.brief,
  newsProgress: state => state.newsProgress
}

const actions = {
  async getNews ({ commit }) {
    try {
      commit ('SET_NEWSPROGRESS',0)
      const news = await axios.get('/api/news', {
        onDownloadProgress: progressEvent => {
          commit ('SET_NEWSPROGRESS', Math.round(progressEvent.loaded / progressEvent.total * 100))
        }
      })
      commit('SET_NEWS', news.data)
      return
    } catch (e) {
      commit('SET_NEWS', null)
      throw new Error()
    }
  },
  async getBrief ({ commit }) {
    try {
      const news = await axios.get('/api/news/brief')
      commit('SET_BRIEF', news.data)
    } catch (e) {
      throw new Error()
    }
  },
  resetNews ({ commit }) {
    commit('SET_NEWS', null)
    commit('SET_BRIEF', null)
    commit('SET_NEWSPROGRESS', 0)
    return
  }
}

const mutations = {
  SET_NEWS (state, payload) {
    state.news = payload
  },
  SET_BRIEF (state, payload) {
    state.brief = payload
  },
  SET_NEWSPROGRESS (state, payload) {
    state.newsProgress = payload
  }
}

const newModule = {
  state,
  getters,
  actions,
  mutations
}

export default newModule
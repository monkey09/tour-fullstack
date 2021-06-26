import axios from 'axios'

const state = {
  posts: null,
  post: null,
  postsProgress: 0
}

const getters = {
  posts: state => state.posts,
  post: state => state.post,
  postsProgress: state => state.postsProgress
}

const actions = {
  async getPosts ({ commit }) {
    try {
      commit ('SET_POSTSPROGRESS', 0)
      const posts = await axios.get('/api/posts', {
        onDownloadProgress: progressEvent => {
            commit ('SET_POSTSPROGRESS', Math.round(progressEvent.loaded / progressEvent.total * 100))
        }
    })
      commit ('SET_POSTS', posts.data)
      return
    } catch (e) {
      commit ('SET_POSTS', null)
      throw new Error()
    }
  },
  async getMorePosts ({ state, commit }) {  
    try {
      let posts = state.posts
      const morePosts = await axios.get(`/api/posts/more/${posts.length}`)
      posts = posts.concat(morePosts.data)
      commit ('SET_POSTS', posts)
      return
    } catch (e) {
      commit ('SET_POSTS', null)
      throw new Error()
    }
  },
  async getPost ({ commit }, id) {  
    try {
      const post = await axios.get(`/api/posts/onepost/${id}`)
      commit ('SET_POST', post.data)
      return
    } catch (e) {
      commit ('SET_POST', null)
      throw new Error()
    }
  },
  async addPostAction ({ dispatch }, data) {
    try {
        await axios.post('/api/posts', data)
        dispatch('getPosts')
    } catch (e) {
        throw new Error()
    }
  },
  async updatePostAction ( _ , data) {
    try {
      await axios.patch(`/api/posts/${data.id}`, data.updates)
    } catch (e) {
      throw new Error()
    }
  },
  async likePost ({ state, commit }, data) {
    try {
      const post = await axios.patch(`/api/posts/like/${data.id}`, data.status)
      const checkPost = post => post._id == data.id
      const indexInPosts = state.posts.findIndex(checkPost)
      const posts = state.posts
      posts[indexInPosts].likes = post.data.likes
      commit('SET_POSTS', posts)
      return
    } catch (e) {
      throw new Error()
    }
  },
  resetPosts ({ commit }) {
    commit('SET_POSTS', null)
    commit('SET_POST', null)
    commit('SET_POSTSPROGRESS', 0)
    return
  }
}

const mutations = {
  SET_POSTS (state, payload) {
    state.posts = payload
  },
  SET_POST (state, payload) {
    state.post = payload
  },
  SET_POSTSPROGRESS (state, payload) {
    state.postsProgress = payload
  }
}

const postModule = {
  state,
  getters,
  actions,
  mutations
}

export default postModule


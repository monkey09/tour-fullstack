import axios from 'axios'

const state = {
  contacts: null
}

const getters = {
  contacts: state => state.contacts
}

const actions = {
  async getContacts ({ commit }) {
    try {
      const contacts = await axios.get('/api/contacts')
      commit('SET_CONTACTS', contacts.data)
      return
    } catch (e) {
      commit('SET_CONTACTS', null)
      throw new Error()
    }
  },
  async addContact ( _ , data) {
    try {
      await axios.post('/api/contacts', data)
      return
    } catch (e) {
      throw new Error()
    }
  },
  resetContacts ({ commit }) {
    commit('SET_CONTACTS', null)
    return
  }
}

const mutations = {
  SET_CONTACTS (state, payload) {
    state.contacts = payload
  }
}

const contactModule = {
  state,
  getters,
  actions,
  mutations
}

export default contactModule
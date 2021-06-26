import Vuex from 'vuex'
import Vue from 'vue'
import admins from './modules/admins'
import users from './modules/users'
import tourguides from './modules/tourguides'
import posts from './modules/posts'
import comments from './modules/comments'
import hotels from './modules/hotels'
import restaurants from './modules/restaurants'
import transportations from './modules/transportations'
import pharmacies from './modules/pharmacies'
import news from './modules/news'
import contacts from './modules/contacts'
import places from './modules/places'
import managetours from './modules/managetours'
import tours from './modules/tours'
import others from './modules/others'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    admins,
    users,
    tourguides,
    posts,
    comments,
    hotels,
    restaurants,
    transportations,
    pharmacies,
    news,
    contacts,
    places,
    managetours,
    tours,
    others
  }
})
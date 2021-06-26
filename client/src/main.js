import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueMoment from 'vue-moment'
import vuetify from './plugins/vuetify'
require('@/store/subscriber')

Vue.config.productionTip = false

Vue.use(VueMoment)
store.dispatch ('attempt', localStorage.getItem('token')).then (() => {
  new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
}).catch(() => {
  console.log('ops')
})
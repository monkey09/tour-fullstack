import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#03528A',
        lightBar: '#03528A',
        lightHeader: '#F5F5F5',
        lightPayment: '#ddeefc',
        lightText: '#FFF',
        clock: '#9E9E9E'
      },
      dark: {
        primary: '#FFA200',
        darkAside: '#272727',
        grey: '#121212',
        clock: '#9E9E9E',
        darkText: '#E5E5E5',
        darkCard: '#1E1E1E',
        darkBg: '#121212',
      }
    },
    
  }
})

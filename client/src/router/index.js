import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import LoginAdmin from '@/views/LoginAdmin'
import Dashboard from '@/views/Dashboard'
import Login from '@/views/Login'
import Signup from '@/views/Signup'
import SignAsGuide from '@/views/SignAsGuide'
import Home from '@/views/Home'
import About from '@/views/About'
import Profile from '@/views/Profile'
import Services from '@/views/Services'
import News from '@/views/News'
import Places from '@/views/Places'
import ManageTours from '@/views/ManageTours'
import Tours from '@/views/Tours'
import Payment from '@/views/Payment'
import Chat from '@/views/Chat'
import GuideChat from '@/views/GuideChat'
import NotFound from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/loginadmin',
    name: 'LoginAdmin',
    component: LoginAdmin,
    beforeEnter: (to, from, next) => {
      if (store.getters['authUser'] || store.getters['authGuide']) next('/')
      else if (store.getters['authAdmin']) next('/dashboard')
      else next()
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (!store.getters['authAdmin']) next('/login')
      else next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters['authUser'] || store.getters['authGuide']) next('/')
      else next()
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: (to, from, next) => {
      if (store.getters['authUser'] || store.getters['authGuide']) next('/')
      else next()
    }
  },
  {
    path: '/signasguide',
    name: 'SignAsGuide',
    component: SignAsGuide,
    beforeEnter: (to, from, next) => {
      if (store.getters['authUser'] || store.getters['authGuide']) next('/')
      else next()
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (!store.getters['authUser'] && !store.getters['authGuide']) next('/login')
      else next()
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    beforeEnter: (to, from, next) => {
      if (!store.getters['authUser'] && !store.getters['authGuide']) next('/login')
      else next()
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      if (!store.getters['authUser'] && !store.getters['authGuide']) next('/login')
      else next()
    }
  },
  {
    path: '/services',
    name: 'Services',
    component: Services,
    beforeEnter: (to, from, next) => {
      if (!store.getters['authUser'] || store.getters['authGuide']) next('/login')
      else next()
    }
  },
  {
    path: '/news',
    name: 'News',
    component: News,
    beforeEnter: (to, from, next) => {
      if (!store.getters['authUser'] && !store.getters['authGuide']) next('/login')
      else next()
    }
  },
  {
    path: '/tours',
    name: 'Tours',
    component: Tours,
    beforeEnter: (to, from, next) => {
      if (!store.getters['authUser'] || store.getters['authGuide']) next('/login')
      else next()
    }
  },
  {
    path: '/places',
    name: 'Places',
    component: Places,
    beforeEnter: (to, from, next) => {
      if (store.getters['authUser'] || !store.getters['authGuide']) next('/login')
      else next()
    }
  },
  {
    path: '/managetours',
    name: 'ManageTours',
    component: ManageTours,
    beforeEnter: (to, from, next) => {
      if (store.getters['authUser'] || !store.getters['authGuide']) next('/login')
      else next()
    }
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment,
    beforeEnter: (to, from, next) => {
      if (!store.getters['authUser'] && !store.getters['authGuide']) next('/login')
      else next()
    }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    beforeEnter: (to, from, next) => {
      if (!store.getters['authUser'] || store.getters['authGuide']) next('/login')
      else next()
    }
  },
  {
    path: '/guidechat',
    name: 'GuideChat',
    component: GuideChat,
    beforeEnter: (to, from, next) => {
      if (store.getters['authUser'] || !store.getters['authGuide']) next('/login')
      else next()
    }
  },
  {
    path: '*',
    name: 'Not-Found',
    component: NotFound,
    beforeEnter: (to, from, next) => {
      if (!store.getters['authUser'] && !store.getters['authGuide']) next('/login')
      else next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

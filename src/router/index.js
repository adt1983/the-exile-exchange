import Vue from 'vue'
import Router from 'vue-router'

// import { settings } from 'settings'

import Home from 'views/Home'
// import ContactInfoView from 'views/ContactInfoView'
import CurrencyView from 'views/CurrencyView'
import ExchangeView from 'views/ExchangeView'
import NotFound from 'views/NotFound'

Vue.use(Router)

// function cleanParams (dirty) {
//   let clean
//   if (dirty.indexOf(settings.paramDiv) >= 0) {
//     clean = dirty.split(settings.paramDiv)
//   } else {
//     clean = dirty
//   }
//   return clean
// }

// function exchangeViewPropsFn (route) {
//   const now = new Date()
//   return {
//     name: (now.getFullYear() + parseInt(route.params.years)) + '!'
//   }
// }

export default new Router({
  // mode: 'history',
  // base: __dirname,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/currency/:leagueid',
      props: true,
      // path: '/currency/:askids',
      name: 'currency',
      component: CurrencyView
    },
    {
      // todo ;; add route for pre-programmed offer match
      path: '/exchange/:leagueid/:askids',
      props: true,
      name: 'exchange',
      component: ExchangeView
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

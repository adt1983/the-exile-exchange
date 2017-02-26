import Vue from 'vue'
import Router from 'vue-router'

// import { settings } from 'settings'

import Home from 'views/Home'
import CurrencyView from 'views/CurrencyView'
import ExchangeView from 'views/ExchangeView'
import NotFound from 'views/NotFound'

import ExchangeViewExample from 'views/ExchangeViewExample'

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
      path: '/exchange/:askids/:offerids',
      props: true,
      name: 'exchange-view',
      component: ExchangeView
    },
    {
      path: '/exchange-example/:askids/:offerids',
      props: true,
      name: 'exchange-view-example',
      component: ExchangeViewExample
    },
    {
      path: '/currency',
      props: true,
      // path: '/currency/:askids',
      name: 'currency-view',
      component: CurrencyView
    },

    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
// import { parseParams } from '../services/util'
// import settings from 'settings'

import Home from 'views/Home'
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
//   const params = route.params
//   console.log('route', route)
//   if (!params.askids) {
//     params.askids = settings.defaults.currencyIndexes
//     // router.push({ name: 'user', params: { userId: 123 }})
//   }
//   // const now = new Date()
//   // return {
//   //   name: (now.getFullYear() + parseInt(route.params.years)) + '!'
//   // }
//   // router.push({ name: 'user', params: { userId: 123 }})
//   console.log('this', this)
//   return {
//     leagueid: params.leagueid
//   }
// }

// function exchangeViewPropsFn (route) {

// }

export default new Router({
  // mode: 'history',
  // base: __dirname,
  routes: [
    {
      path: '/',
      props: true,
      name: 'home',
      component: Home
    },
    {
      path: '/currency/:leagueid',
      // props: {
      //   routeaction: 'name: \'exchange\', params: { leagueid: leagueid, askids: askParams() }'
      // },
      props: true,
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

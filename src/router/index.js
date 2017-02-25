import Vue from 'vue'
import Router from 'vue-router'

import Home from 'views/Home'
import CurrencyView from 'views/CurrencyView'
import ExchangeView from 'views/ExchangeView'
import NotFound from 'views/NotFound'

Vue.use(Router)

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
      // path: '/exchange/:askId/:offerId',
      path: '/currency',
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

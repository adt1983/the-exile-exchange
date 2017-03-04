// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { VTooltip } from 'v-tooltip'
// import { http } from './services' // instace of axios
// import axios from 'axios'

// Vue.prototype.$http = http // axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

Vue.use(VueAxios, axios)

// `v-tooltip.top-center`
Vue.directive('tooltip', VTooltip)

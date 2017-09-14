import Vue from 'vue'
import VueRouter from 'vue-router'
import vClickOutside from 'v-click-outside'

import App from './App.vue'
import { routes } from './router.js'

Vue.use(VueRouter);
Vue.use(vClickOutside);

const router = new VueRouter({ routes });

new Vue({
  el: '#app',
  render: h => h(App),
  router
})

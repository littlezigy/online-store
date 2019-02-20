// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import bulma from '../node_modules/bulma'
import '../node_modules/bulma/css/bulma.min.css'
import  './globals'
//import dotenv from 'dotenv'
//dotenv.config()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  data: {
    uid: null,
    uname: null,
    cartid: null,
    farts: 'So many stinky farts...',
  },
  template: '<App/>'
})

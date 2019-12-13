// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import Vuex from 'vuex'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5000';


//import our css files
import './css/main.css';
import './css/restaurantView.css'

Vue.use(Buefy, {
  defaultIconPack: "fas",
});

Vue.use(Vuex);

/* The vuex Store */
const store = new Vuex.Store({
  state: {
    loggedIn: false,
    authToken: null,
  },
  mutations: {
    newAuthToken(state, authToken) {
      state.authToken = authToken;
    },
  },

  getters: {
    loggedIn(state) {
      return state.loggedIn;
    },

    authToken(state) {
      return state.authToken;
    },
  },

  actions: {
    loginSuccessful(state, authToken) {
      state.loggedIn = true;
      this.newAuthToken(state, authToken)
    },

    logoutSuccessful(state) {
      state.loggedIn = false;
      this.newAuthToken(state, null);
    },
  },
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

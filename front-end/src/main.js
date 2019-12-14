// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import Vuex from 'vuex';
import axios from 'axios';
import cookieHandler from './utils/CookieHandler.js';

//import our css files
import './css/main.css';
import './css/restaurantView.css';


//set the baseURL for axios calls, all urls in axios will then be relative to this base
axios.defaults.baseURL = 'http://localhost:5000';


//import buefy into Vue
Vue.use(Buefy, {
  defaultIconPack: "fas",
});


//use the Vuex store
Vue.use(Vuex);


//declare and initialise the Vuex Store
const store = new Vuex.Store({
  state: {
    loggedIn: false,
    authToken: null,
  },
  mutations: {
    setAuthToken(state, authToken) {
      state.authToken = authToken;
    },

    setLoggedIn(state, bool) {
      state.loggedIn = bool;
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
    newAuthToken(state, params) {
      this.commit('setAuthToken', params.authToken);
      cookieHandler.createCookie('authToken', params.authToken, params.tokenLifetime);
    },

    loginSuccessful(state, params) {
      state.commit('setLoggedIn', true);
      this.dispatch('newAuthToken', params);
    },

    logoutSuccessful(state) {
      state.commit('setLoggedIn', false);
      this.dispatch('newAuthToken', {});
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

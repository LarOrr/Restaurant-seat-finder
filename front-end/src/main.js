// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Buefy from 'buefy';
import Vuex from 'vuex';
import axios from 'axios';
import cookieHandler from './utils/CookieHandler.js';

//import our css files
import './css/main.css';
import './css/restaurantView.css';

//set the baseURL for axios calls, all urls in axios will then be relative to this base
//if we are running in production, use the production api, if we are running in development, use the local api
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://restaurant-seat-finder-api.herokuapp.com' : 'http://localhost:5000';


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
    collectData: false,
    position: null,
  },

  mutations: {
    setAuthToken(state, authToken) {
      state.authToken = authToken;
    },

    setLoggedIn(state, bool) {
      state.loggedIn = bool;
    },

    canCollectData(state, bool) {
      state.collectData = bool;
    },

    setPosition(state, position) {
      state.position = position;
    }
  },

  getters: {
    loggedIn(state) {
      return state.loggedIn;
    },

    authToken(state) {
      return state.authToken;
    },

    collectData(state) {
      return state.collectData;
    },

    position(state) {
      return state.position;
    }
  },

  actions: {
    newAuthToken(state, params) {
      this.commit('setAuthToken', params.authToken);
      cookieHandler.createCookieIfNotExists('authToken', params.authToken, params.tokenLifetime);
    },

    loginSuccessful(state, params) {
      state.commit('setLoggedIn', true);
      this.dispatch('newAuthToken', params);
    },

    logoutSuccessful(state) {
      state.commit('setLoggedIn', false);
      this.commit('setAuthToken', null);
      cookieHandler.deleteCookie('authToken');
    },

    newPosition(state, params) {
      state.commit('setPosition', params.position);
    },

    // canCollectData(state, params) {
    //   state.commit('canCollectData', params.tf);
    //   //only add mouseflow if the user agrees to have data collected
    //   if(params.tf) {
    //     (function() {
    //       var mf = document.createElement("script");
    //       mf.type = "text/javascript"; mf.async = true;
    //       mf.src = "//cdn.mouseflow.com/projects/614bc48f-503b-4d03-9f17-b5044a6a94c3.js";
    //       document.getElementsByTagName("head")[0].appendChild(mf);
    //     })();
    //
    //     window._mfq.push(['newPageView', router.currentRoute.path]);
    //   }
    //
    //   //add the choice to the cookies
    //   cookieHandler.createCookie('collectionConsent', params.tf, 100*365);
    //
    //   if(process.env.NODE_ENV === 'development' && params.tf) {
    //     console.log('sending newPageView: ' + router.currentRoute.path + ' to mouseflow');
    //   }
    // },
  },
});

router.afterEach((to) => {
  // if(store.getters.collectData) {
  //   if(process.env.NODE_ENV === 'development') {
  //     console.log('sending newPageView: ' + to.path + ' to mouseflow');
  //   }
  //
  //   window._mfq.push(['newPageView', to.path]);
  // }
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

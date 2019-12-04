import Vue from 'vue'
import Router from 'vue-router'
import HomePage from "../components/HomePage";
import RestaurantMainView from "../components/RestaurantView/RestaurantMainView";
import NotFoundPage from "../components/NotFoundPage";

Vue.use(Router);

export default new Router({
  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: HomePage,
    },
    {
      path: '/myrestaurant',
      name: 'MyRestaurant',
      component: RestaurantMainView,
    },
    {
      //This path has to be last in the list, it catches all paths that haven't been caught by the paths above!
      path: '*',
      name: 'NotFoundPage',
      component: NotFoundPage,
    }
  ],
})

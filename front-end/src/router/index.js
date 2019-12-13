import Vue from 'vue';
import Router from 'vue-router';
import HomePage from "../components/UserView/HomePage";
import RestaurantMainView from "../components/RestaurantView/RestaurantMainView";
import NotFoundPage from "../components/PageAddons/NotFoundPage";
import RestaurantAuthenticationPage from "../components/RestaurantView/RestaurantAuthenticationPage";
import RestaurantRegisterPage from "../components/RestaurantView/RestaurantRegisterPage";

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
      path: '/login',
      name: 'Login',
      component: RestaurantAuthenticationPage,
      props: true,
    },
    {
      path: '/register',
      name: 'Register',
      component: RestaurantRegisterPage,
      props: true,
    },
    {
      path: '/myrestaurant',
      name: 'MyRestaurant',
      component: RestaurantMainView,
      props: true,
    },
    {
      //This path has to be last in the list, it catches all paths that haven't been caught by the paths above!
      path: '*',
      name: 'NotFoundPage',
      component: NotFoundPage,
    }
  ],
})

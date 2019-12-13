<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">
    <Header></Header>
    <router-view id="main-router"/>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/PageAddons/Header";
import Footer from "./components/PageAddons/Footer";
export default {
  name: 'App',
  components: {Footer, Header},
}
</script>

<style>
  html,
  body {
    height: 100%;
    min-height:100% !important;
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    background-color: var(--lightGrey);
    /*margin-top: 60px;*/
    right: 0;
    width: 100%;

    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-height: 100% !important;
  }

  #main-router {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }

</style>

<style lang="scss">
  // Import Bulma's core
  @import "~bulma/sass/utilities/_all";

  // Set your colors
  $primary: #1abc9c;
  $primary-invert: findColorInvert($primary);
  $twitter: #4099FF;
  $twitter-invert: findColorInvert($twitter);

  // Setup $colors to use as bulma classes (e.g. 'is-twitter')
  $colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
  );

  // Links
  $link: $primary;
  $link-invert: $primary-invert;
  $link-focus-border: $primary;


  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>

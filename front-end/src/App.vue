<template>
  <div id="app">
    <!-- font awesome for icons-->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css">

    <!-- our components -->
    <Header></Header>
    <ConsentMessage :open-by-default="!userHasDecidedOnConsent"></ConsentMessage>

    <router-view id="main-router"/>

    <Footer></Footer>
  </div>
</template>

<script>
  import Header from "./components/PageAddons/Header";
  import Footer from "./components/PageAddons/Footer";
  import cookieHandler from "./utils/CookieHandler";
  import api from "./api/api_wrapper";
  import ConsentMessage from "./components/PageAddons/ConsentMessage";

  export default {
    name: 'App',
    components: {ConsentMessage, Footer, Header},

    computed: {
      userHasDecidedOnConsent() {
        // let collectionConsent = cookieHandler.getCookie('collectionConsent');
        // return (collectionConsent === 'true') || (collectionConsent === 'false');
        return true;
      },
    },

    mounted() {
      this.reauthenticate();
      this.getLocation();
    },


    methods: {
      enableMouseflow() {
        // let consentCookie = cookieHandler.getCookie('collectionConsent');
        // if(window._mfq === [] && consentCookie !== 'false') {
        //   (function() {
        //     var mf = document.createElement("script");
        //     mf.type = "text/javascript"; mf.async = true;
        //     mf.src = "//cdn.mouseflow.com/projects/614bc48f-503b-4d03-9f17-b5044a6a94c3.js";
        //     document.getElementsByTagName("head")[0].appendChild(mf);
        //   })();
        //
        //   window._mfq.push(['newPageView', this.$route.path]);
        // }
      },


      reauthenticate() {
        //try to reauthenticate the current user if possible
        let cookieToken = cookieHandler.getCookie('authToken', 512);
        if(cookieToken) {
          api.reAuthenticate(cookieToken).then((response) => {
            //authenticated
            if(response.status === 200) {
              this.$store.dispatch('loginSuccessful', {authToken: cookieToken});
            }
            //not authenticated
            else {
              cookieHandler.deleteCookie('authToken');
            }
          });
        }
      },


      getLocation() {
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.$store.dispatch('newPosition', {position: position});
          }, (error) => {
            console.error(error);
            this.$buefy.toast.open({
              message: 'Restaurant distances will be unavailable',
              type: 'is-danger',
            });
          });
        }
        else {
          this.$buefy.snackbar.open({
            message: 'It looks like location is not available for your device',
            type: 'is-warning',
            position: 'is-bottom-right',
            queue: 'false',
            indefinite: true,
            onAction: () => {
              this.$buefy.toast.open({
                message: 'Action pressed',
                queue: false
              });
            }
          });
        }
      },
    },
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

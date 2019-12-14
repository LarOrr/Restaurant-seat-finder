<template>
  <header class="header has-text-centered">
    <div class="columns is-mobile">
      <div class="column content font-header">
        <router-link tag="p" to="/" style="display:inline-block; cursor: pointer;">
          <p id="headerContent">Restaurant Seat Finder</p>
        </router-link>
      </div>

      <div class="column has-text-right" style="margin-right: 5%">
        <b-field grouped position="is-right">
        <b-button class="button is-primary" style="margin-right: 2%" @click="redirectLogin" v-show="!loggedIn">
          Login
        </b-button>
        <b-button class="button is-primary" @click="redirectRegister" v-show="!loggedIn">
          Register
        </b-button>
        </b-field>
        <b-button class="button is-primary" @click="redirectAccountPage" v-show="loggedIn">
          My Restaurant
        </b-button>
      </div>
    </div>

  </header>
</template>

<script>
  export default {
    name: "Header",

    computed: {
      loggedIn() {
        return this.$store.state.loggedIn;
      },
    },

    methods: {
      redirectLogin() {
        if(!(this.$route.name === 'Login')) {
          this.$router.push('Login');
        }
      },

      redirectRegister() {
        if(!(this.$route.name === 'Register')) {
          this.$router.push('Register');
        }
      },

      redirectAccountPage() {
        if(!(this.$route.name === 'MyRestaurant')) {
          this.$router.push({name: 'MyRestaurant', params: {authToken: this.$store.state.authToken, resData: null}});
        }
      },
    },
  }
</script>

<style scoped>

  header {
    position: relative;
    /*background: linear-gradient(to bottom, #960d04 0%, #d10d00 100%);*/
    background-image: url("../../assets/background4.jpg");
    background-size: cover;
    margin: 0 0 5% 0;
    height: 10%;
    width: 105%;
  }

</style>

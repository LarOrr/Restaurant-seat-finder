<template>
  <header class="header has-text-centered">
    <div class="columns is-mobile">
      <div class="column content font-header">
        <router-link class="is-hidden-mobile" tag="p" to="/" style="display:inline-block; cursor: pointer; margin-top: 14px">
          <p id="headerContentDesktop">Restaurant Seat Finder</p>
        </router-link>

        <router-link class="is-hidden-tablet" tag="div" to="/" style="display:inline-block; cursor: pointer">
          <div>
            <p id="headerContentMobile">Restaurant Seat</p>
            <br>
            <p id="headerContentMobile2" style="margin-top: -54px">Finder</p>
          </div>

        </router-link>
      </div>

      <div class="column has-text-right" style="margin-right: 5%">
        <b-field grouped position="is-right" style="margin-top:1.5%;">
          <b-button class="button is-primary" style="margin-right: 2%" @click="redirectLogin" v-show="!loggedIn">
            Log in
          </b-button>
          <b-button class="button is-primary" @click="redirectRegister" v-show="!loggedIn">
            Register
          </b-button>
        </b-field>

        <b-field grouped position="is-right" style="margin-top:-1.5%">
          <b-dropdown hoverable aria-role="list">
            <b-button class="button is-primary" @click="redirectAccountPage" v-show="loggedIn" slot="trigger">
              <span>My Restaurant</span>
              <b-icon pack="fas" icon="fas fa-caret-down"></b-icon>
            </b-button>

            <b-dropdown-item aria-role="listitem" @click="redirectAccountPage">Manage Seats</b-dropdown-item>
            <b-dropdown-item aria-role="listitem" @click="redirectEditAccountPage">Edit Account</b-dropdown-item>
          </b-dropdown>


          <b-button class="button is-primary" style="margin-left: 2%" @click="logout" v-show="loggedIn">
            Log out
          </b-button>
        </b-field>

      </div>
      <b-loading :active="isLoading"></b-loading>
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

    data() {
      return {
        isLoading: false,
      }
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

      redirectEditAccountPage(){
        if(!(this.$route.name === 'EditAccount')) {
          this.$router.push({name: 'EditAccount', params: {authToken: this.$store.state.authToken, resData: null}});
        }
      },

      logout(){
        this.isLoading = true;
        if(!(this.$route.name === 'MainPage')) {
          this.$router.push('/');
        }
        this.$store.dispatch('logoutSuccessful');
        this.isLoading = false;
        this.$buefy.toast.open({message: 'successfully logged out', type: 'is-info'})
      }
    },
  }
</script>

<style scoped>

  header {
    position: relative;
    /*background: linear-gradient(to bottom, #960d04 0%, #d10d00 100%);*/
    background-image: url("../../assets/background4.jpg");
    background-size: cover;
    margin: 0 0 30px 0;
    height: 60px;
    width: 105%;
  }

</style>

<template>
  <div class="columns is-mobile">
    <div class="column is-5 is-hidden-touch is-offset-1">
      <h2>{{$props.reasonMessage}}</h2>
      <b-field label="username">
        <b-input placeholder="username"></b-input>
      </b-field>

      <b-field label="password">
        <b-input type="password" placeholder="password" password-reveal></b-input>
      </b-field>

      <div class="columns">
        <div class="column is-1">
          <b-button class="button is-primary" @click="authenticate" style="display: inline-block;">log in</b-button>
        </div>

        <div class="column has-text-right is-mobile">
          <router-link to="/register"><p style="margin: 1% 1% 0 0; display:inline-block;">I don't have a restaurant account yet</p></router-link>
        </div>
      </div>

    </div>

    <div class="column is-10 is-hidden-desktop is-offset-1">
      <h2>{{$props.reasonMessage}}</h2>
      <b-field label="username">
        <b-input placeholder="username"></b-input>
      </b-field>

      <b-field label="password">
        <b-input type="password" placeholder="password" password-reveal></b-input>
      </b-field>

      <div class="columns is-mobile">
        <div class="column is-1">
          <b-button class="button is-primary" @click="authenticate" style="display: inline-block;">log in</b-button>
        </div>

        <div class="column has-text-right">
          <router-link to="/register">
            <p class="is-hidden-mobile" style="margin: 1% 1% 0 0; display:inline-block;">I don't have a restaurant account yet</p>
            <p class="is-hidden-tablet">Register</p>
          </router-link>
        </div>
      </div>
    </div>

    
    <b-loading :active="isLoading"></b-loading>
  </div>
</template>

<script>
  import timing from '../../utils/Timing';

  export default {
    name: "RestaurantAuthenticationPage",

    props: {
      reasonMessage: {
        type: String,
        required: false,
        default: 'Please log in to your restaurant account',
      },
    },

    data() {
      return {
        isLoading: false,
      }
    },

    methods: {
      async authenticate() {
        //for now, just move on
        this.isLoading = true;
        await timing.sleep(1000);
        this.isLoading = false;
        this.$router.push({name: 'MyRestaurant', params: {sessionId: 'fakeSessionId'}});
        this.$store.commit('loginSuccessful');
      },
    },
  }
</script>

<style scoped>

</style>

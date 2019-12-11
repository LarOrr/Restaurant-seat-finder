<template>
  <div class="columns">
    <div class="column is-4 is-offset-1">
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

        <div class="column has-text-right">
          <router-link to="/register"><p style="margin: 1% 1% 0 0; display:inline-block;">I don't have a restaurant account yet</p></router-link>
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

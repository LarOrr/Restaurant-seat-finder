<template>
  <div class="content">
  <div class="columns">
    <div class="column is-4 is-offset-1">
      <h2>{{$props.reasonMessage}}</h2>
      <b-field label="username" style = "width: 80%">
        <b-input placeholder="username"></b-input>
      </b-field>

      <b-field label="password" style = "width: 80%">
        <b-input type="password" placeholder="password" password-reveal></b-input>
      </b-field>

      <div class="columns">
        <div class="column is-1">
          <b-button class="button is-primary" @click="authenticate" style="display: inline-block;">log in</b-button>
        </div>
      </div>
        <div class="column">
          <router-link to="/register"><p style="margin: 1% 1% 0 0; display:inline-block; color: red;">I don't have a restaurant account yet</p></router-link>
        </div>


    </div>

    <b-loading :active="isLoading"></b-loading>
  </div>
  </div>
</template>

<script>
  import timing from '../../utils/Timing';
  import BField from "buefy/src/components/field/Field";

  export default {
    name: "RestaurantAuthenticationPage",
    components: {BField},
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
.content{
  width: 105%;
  margin-left: 2%;
  background-color: var(--lightGrey);
}
</style>

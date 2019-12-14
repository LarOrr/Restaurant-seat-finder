<!-- This component assumes the restaurant is already authenticated, represented by the session-id prop -->
<template>
  <div>
    <div>
      <h2 class="rest-view-heading">{{resData.name}}</h2>
      <h3>Amount of free seats:</h3>
    </div>

    <div style="text-align: right; margin-right: calc(4% + 50px);">
      <b-icon
        pack="fas"
        icon="fas fa-user-circle"
        class="is-primary-color rest-view-account-manage-icon"
      >
      </b-icon>
    </div>

    <RestaurantSeatCounter :free-seats="resData.free_seats" :total-seats="resData.total_seats" v-on:seat-update="updateSeats($event)">
    </RestaurantSeatCounter>


  </div>
</template>

<script>
  import RestaurantSeatCounter from "./RestaurantSeatCounter";
  import api from '../../api/api_wrapper';
  import cookieHandler from '../../utils/CookieHandler';

  export default {
    name: "RestaurantMainView",
    components: {RestaurantSeatCounter},

    props: {
      authToken: {
        type: String,
        required: false,
        default: null,
      },

      resData: {
        type: Object,
        required: true,
        default: null,
      },
    },

    beforeRouteEnter(to, from, next) {
      if(!(from.params.authToken || cookieHandler.getCookie('authToken', 512))) {
        next({name: 'Login', params: {reasonMessage: 'No session token found, please log in'}});
      }
      //else is important, otherwise next() would be called twice if the user is not authorized!
      else {
        next();
      }
    },

    mounted() {
      this.$store.dispatch('loginSuccessful', {authToken: this.$props.authToken});
    },

    methods: {
      updateSeats(newAmount) {
        console.log('the amount of free seats will be updated to ' + newAmount);
        api.updateSeats(this.$props.resData.id, newAmount, this.$props.authToken).then((response) => {
          if(response.status === 200) {
            this.$buefy.toast.open({message: 'successfully updated the amount of seats to' + newAmount, type:'is-success'});
          }
          else {
            this.$buefy.toast.open({message: 'could not update the amount of seats: ' + ((response && response.data && response.data.message) ? response.data.message : '')});
            console.error('update could not be completed', response);
          }
        });
      },
    },
  }
</script>

<style scoped>

</style>

<template>
  <div>
    <div style="text-align: center;">
      <h2 class="rest-view-heading" style="text-align:center;">{{resData ? resData.name : 'invalid restaurant name'}}</h2>
      <h3>Amount of free seats:</h3>
    </div>

    <RestaurantSeatCounter
      v-if="finishedAuthentication"
      v-bind:free-seats="resData ? resData.free_seats : NaN"
      v-bind:total-seats="resData ? resData.total_seats : NaN"
      v-on:seat-update="updateSeats($event)"
    >
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

    data() {
      return {
        authToken: '',
        resData: {},
        finishedAuthentication: false,
      }
    },

    async beforeRouteEnter(to, from, next) {
      let cookieToken = cookieHandler.getCookie('authToken', 512);
      if(!(from.params.authToken || cookieToken)) {
        next({name: 'Login', params: {reasonMessage: 'No session token found, please log in'}});
      }
      else {
        api.reAuthenticate(cookieToken).then((response) => {
          //authenticated
          if(response.status === 200) {
            next(vm => {
              vm.authToken = from.params.authToken ? from.params.authToken : cookieToken;
              vm.resData = response.data;
              vm.finishedAuthentication = true;
            });
          }
          //not authenticated
          else {
            next({name: 'Login', params: {reasonMessage: 'Your session could not be verified, please log in again'}});
          }
        });
      }
    },

    async mounted() {
      await this.$nextTick();
      this.$store.dispatch('loginSuccessful', {authToken: this.authToken});
    },

    methods: {
      updateSeats(newAmount) {
        //console.log('the amount of free seats will be updated to ' + newAmount);
        api.updateSeats(this.resData.id, newAmount, this.authToken).then((response) => {
          if(response.status === 200) {
            this.$buefy.toast.open({message: 'successfully updated the amount of seats to ' + newAmount, type:'is-success'});
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

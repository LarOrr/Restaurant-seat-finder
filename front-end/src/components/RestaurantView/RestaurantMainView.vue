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
        required: true,
      },

      resData: {
        type: Object,
        required: true,
      },
    },

    data() {
      return {
        authToken: this.$props.authToken,
        resData: this.$props.resData,
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
            next({params: {authToken: from.params.authToken ? from.params.authToken : cookieToken, resData: response.status.place}});
          }
          //not authenticated
          else {
            next({name: 'Login', params: {reasonMessage: 'Your session could not be verified, please log in again'}});
          }
        });
      }
    },

    mounted() {
      this.$store.dispatch('loginSuccessful', {authToken: this.authToken});
    },

    methods: {
      updateSeats(newAmount) {
        console.log('the amount of free seats will be updated to ' + newAmount);
        api.updateSeats(this.$props.resData.id, newAmount, this.authToken).then((response) => {
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

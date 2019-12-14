<!-- This component assumes the restaurant is already authenticated, represented by the session-id prop -->
<template>
  <div>
    <div>
      <h2 class="rest-view-heading">{{resData.name}}</h2>
      <h3>Amount of free seats:</h3>
    </div>

    <div style="text-align: right; margin-right: calc(4% + 50px); ">
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

  export default {
    name: "RestaurantMainView",
    components: {RestaurantSeatCounter},

    props: {
      authToken: {
        type: String,
        required: true,
      },
    },

    data() {
      return {
        //TODO: probably make this a prop later, when it comes from the actual back end
        resData: {
          name: 'Test Restaurant',
          free_seats: 69,
          total_seats: 420,
          id: 8008135,
          address: {
            city: "Groningen",
            country: "Netherlands",
            house_number: "2",
            postcode: "9321CV",
            street: "Greenstraat",
          }
        },
      }
    },

    beforeRouteEnter(to, from, next) {
      if(!from.params.authToken) {
        next({name: 'Login', params: {reasonMessage: 'No session token found, please log in'}});
      }
      //else is important, otherwise next() would be called twice if the user is not authorized!
      else {
        next();
      }
    },

    methods: {
      updateSeats(newAmount) {
        console.log('the amount of free seats will be updated to ' + newAmount);
        api.updateSeats(this.$props.resData.id, newAmount, this.$props.authToken).then((response) => {
          if(response.status === 200) {
            //TODO: handle a success by updating the view
            console.log('successful update');
          }
          else {
            console.error('update could not be completed', response);
          }
        });
      },
    },
  }
</script>

<style scoped>

</style>

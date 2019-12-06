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
  export default {
    name: "RestaurantMainView",
    components: {RestaurantSeatCounter},
    props: {
      sessionId: {
        type: String,
        required: false,
        default: null,
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

    methods: {
      updateSeats(newAmount) {
        console.log('the amount of free seats will be updated to ' + newAmount);
      },
    },
  }
</script>

<style scoped>

</style>

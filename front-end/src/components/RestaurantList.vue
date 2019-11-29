<template>
  <div class="columns">
    <div class="column is-10 is-offset-1">
      <h2 style="margin-bottom:0.25em; margin-left:0.2em;">Restaurants Nearby</h2>
      <b-loading :active="isLoading"></b-loading>
      <b-collapse
        class="card has-rounded-corners"
        v-for="res in restaurants"
        :key="res.id"
        :open="opened[res.id]"
        @open="toggleOpen(res.id)"
        @close="toggleOpen(res.id)"
        v-show="!isLoading"
        style="margin-bottom:0.33em; margin-left: 0.5em; margin-right: 0.5em"
      >
        <div
          slot="trigger"
          slot-scope="props"
          class="card-header"
          role="button"
          style="border-radius: 1em;">
          <CompactRestaurant :res-data="res" class="card-header-title"></CompactRestaurant>
          <a class="card-header-icon">
            <b-icon
              pack="fas"
              :icon="props.open ? 'fa fa-caret-up' : 'fa fa-caret-down'">
            </b-icon>
          </a>
        </div>


        <div class="card-content">
          <DetailedRestaurant :res-data="res" class="content"></DetailedRestaurant>
        </div>


        <footer class="card-footer">
          <a class="card-footer-item rest-list-footer-item" href="https://google.com" target="_blank">Visit Website</a>
        </footer>
        <footer class="card-footer">
          <a
            class="card-footer-item rest-list-footer-item"
            @click="initUpdateSeats(res.id)"
            v-show="updatingStatuses[res.id] === FALSE"
          >Update Amount of Seats</a>

          <RestaurantSeatUpdater
            :res-data="res"
            v-show="updatingStatuses[res.id] === TRUE || updatingStatuses[res.id] === LOADING"
            v-on:confirm="confirmUpdate(res.id, $event)"
            v-on:cancel="closeUpdate(res.id)"
            class="card-footer-item rest-list-footer-item"
          >
          </RestaurantSeatUpdater>
        </footer>


      </b-collapse>
    </div>

  </div>

</template>

<script>
  import CompactRestaurant from "./CompactRestaurant";
  import api from "../api/api_wrapper";
  import DetailedRestaurant from "./DetailedRestaurant";
  import RestaurantSeatUpdater from "./RestaurantSeatUpdater";

  export default {
    name: "RestaurantList",
    components: {DetailedRestaurant, CompactRestaurant, RestaurantSeatUpdater},
    data() {
      return {
        //constants:
        TRUE: 'true',
        FALSE: 'false',
        LOADING: 'loading',

        restaurants: [],
        opened: {},
        isLoading: true,
        updatingStatuses: {},

        testData: [
          {id: 1, name: 'my restaurant', free_seats: 16, total_seats: 20},
          {id: 2, name: 'another restaurant', free_seats: 10, total_seats: 36},
          {id: 3, name: 'mama mia', free_seats: 2, total_seats: 40}
        ],
      }
    },

    async mounted() {
      await this.getRestaurants();
    },

    methods: {
      async getRestaurants() {
        this.isLoading = true;
        await api.getPlaces().then((response) => {
          if(response && response.status === 200) {
            this.restaurants = response.data;
          }
          else {
            this.$buefy.toast.open({message: 'request failed with status code: ' + ((response && response.status) ? response.status : 'unknown status'), type: 'is-danger'});
            console.error(response);
            this.restaurants = this.testData;
          }
          this.isLoading = false;

          for(let i = 0; i < this.restaurants.length; i++){
            this.opened[i+1] = false;
            this.$set(this.updatingStatuses, this.restaurants[i].id, this.FALSE);
          }
        });
      },

      toggleOpen(resId) {
        this.$set(this.opened, resId, !this.opened[resId]);
      },

      initUpdateSeats(resId) {
        this.$set(this.updatingStatuses, resId, this.TRUE);
      },

      confirmUpdate(resId, amount) {
        console.log(resId + "'s amount of seats will be updated to " + amount);
        this.$set(this.updatingStatuses, resId, this.LOADING);
        api.updateSeats(resId, amount).then((response) => {
          if(response && response.status === 200) {
            this.$buefy.toast.open({message: 'thank you for your contribution, the amount of free seats has been updated', type: 'is-success'});

            for(let i = 0; i < this.restaurants.length; i++) {
              let newRest = this.restaurants[i];
              if(newRest.id === resId) {
                newRest.free_seats = response.data.free_seats;
                this.restaurants.splice(i, 1, newRest)
              }
            }
          }
          else {
            this.$buefy.toast.open({message: 'request failed with status code: ' + ((response && response.status) ? response.status : 'unknown status'), type: 'is-danger'});
            console.error(response);
          }
          this.closeUpdate(resId);
        });
      },

      closeUpdate(resId) {
        this.$set(this.updatingStatuses, resId, this.FALSE);
      },
    }
  }
</script>

<style scoped>

</style>

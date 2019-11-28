<template>
  <div class="columns">
    <div class="column is-10 is-offset-1">
      <h2 style="margin-bottom:0.25em; margin-left:0.1em;">Restaurants Nearby</h2>
      <b-loading :active="isLoading"></b-loading>
      <b-collapse
        class="card has-rounded-corners"
        v-for="(res, index) in restaurants"
        :key="index"
        :open="opened[index]"
        @open="toggleOpen(index)"
        @close="toggleOpen(index)"
        v-show="!isLoading"
        style="margin-bottom:0.33em;"
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
          <a class="card-footer-item" href="https://google.com" target="_blank">Visit Website</a>
          <a class="card-footer-item" href="https://github.com" target="_blank">Update Amount of Seats</a>
        </footer>
      </b-collapse>
    </div>

  </div>

</template>

<script>
  import CompactRestaurant from "./CompactRestaurant";
  import api from "../api/api_wrapper";
  import DetailedRestaurant from "./DetailedRestaurant";

  export default {
    name: "RestaurantList",
    components: {DetailedRestaurant, CompactRestaurant},
    data() {
      return {
        restaurants: [],
        opened: {},
        isLoading: true,

        testData: [{name: 'my restaurant', free_seats: 16, total_seats: 20}, {name: 'another restaurant', free_seats: 10, total_seats: 36}, {name: 'mama mia', free_seats: 2, total_seats: 40}]
      }
    },

    async mounted() {
      this.restaurants = await this.getRestaurants();
      for(let i = 0; i < this.restaurants.length; i++){
        this.opened[i] = false;
      }
    },

    methods: {
      async getRestaurants() {
        this.isLoading = true;
        let result;
        await api.getPlaces().then((response) => {
          console.log("done making request");
          result = response;
        });
        this.isLoading = false;
        return result ? result : this.testData;
      },

      toggleOpen(resIndex) {
        this.opened[resIndex] = !this.opened[resIndex];
      },
    }
  }
</script>

<style scoped>

</style>

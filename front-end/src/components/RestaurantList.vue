<template>
  <div class="columns">
    <div class="column is-10 is-offset-1">
      <b-loading :active="isLoading"></b-loading>
      <b-collapse
        class="card"
        v-for="(res, index) in restaurants"
        :key="index"
        :open="opened[index]"
        @open="toggleOpen(index)"
        @close="toggleOpen(index)"
        v-show="!isLoading"
      >
        <div
          slot="trigger"
          slot-scope="props"
          class="card-header"
          role="button">
          <CompactRestaurant :res-data="res" class="card-header-title"></CompactRestaurant>
          <a class="card-header-icon">
            <b-icon
              pack="fas"
              :icon="props.open ? 'fa fa-caret-up' : 'fa fa-caret-down'">
            </b-icon>
          </a>
        </div>
        <div class="card-content">
          <div class="content">
            {{res.name}}'s description
          </div>
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
  import Timing from "../utils/Timing";
  export default {
    name: "RestaurantList",
    components: {CompactRestaurant},
    data() {
      return {
        restaurants: [],
        opened: {},
        isLoading: true,
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
        //for now this is a stub method, replace this with the actual api call later
        this.isLoading = true;
        //fake some loading time (1 second)
        await Timing.sleep(1000);
        this.isLoading = false;
        //return placeholder data
        return [{name: "my restaurant", freeSeats: 5, totalSeats: 50}, {name: "another restaurant", freeSeats: 8, totalSeats: 30}, {name: "mama mia", freeSeats: 2, totalSeats: 24}];
      },

      toggleOpen(resIndex) {
        this.opened[resIndex] = !this.opened[resIndex];
      },
    }
  }
</script>

<style scoped>

</style>

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
  import api from "../api/api_wrapper";

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
        this.isLoading = true;
        let result;
        await api.getPlaces().then((response) => {
          result = response;
        });
        this.isLoading = false;
        return result;
      },

      toggleOpen(resIndex) {
        this.opened[resIndex] = !this.opened[resIndex];
      },
    }
  }
</script>

<style scoped>

</style>

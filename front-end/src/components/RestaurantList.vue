<template>
  <div>
    <template v-for="restaurant in restaurants">
      <Restaurant :res-data="restaurant"></Restaurant>
    </template>
  </div>
</template>

<script>
  import Restaurant from "./Restaurant";
  export default {
    name: "RestaurantList",
    components: {Restaurant},
    data() {
      return {
        restaurants: [],
        isLoading: true,
      }
    },

    mounted() {
      this.restaurants = this.getRestaurants();
    },

    methods: {
      getRestaurants() {
        //for now this is a stub method, replace this with the actual api call later
        this.isLoading = true;
        this.isLoading = false;
        return [{name: "my restaurant"}, {name: "another restaurant"}, {name: "mama mia"}]
      },
    }
  }
</script>

<style scoped>

</style>

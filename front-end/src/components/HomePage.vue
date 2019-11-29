<template>
  <div class="content">
    <RestaurantList></RestaurantList>
  </div>
</template>

<script>
  import RestaurantList from "./RestaurantList";
  export default {
    name: "HomePage",
    components: {RestaurantList},
  }
</script>

<style scoped>
  .content{
    margin-bottom: 3%;
  }
</style>

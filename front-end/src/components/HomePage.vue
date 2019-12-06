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
    background-color: var(--lightGrey);
    margin-bottom: 3%;
    margin-right: -1%;
    margin-left: 1%;
  }
</style>

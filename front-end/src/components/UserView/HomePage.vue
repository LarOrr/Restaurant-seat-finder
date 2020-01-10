<template>
  <div class="content">
    <RestaurantSet></RestaurantSet>
  </div>
</template>

<script>
  import RestaurantSet from "./RestaurantSet";
  import RestaurantFilters from "./RestaurantFilters";
  export default {
    name: "HomePage",
    components: {RestaurantFilters, RestaurantSet},
  }
</script>

<style scoped>
  .content{
    background-color: var(--lightGrey);
    width: 100%;
    margin-bottom: 30px;
    margin-right: -1%;
    margin-left: 1%;
  }
</style>

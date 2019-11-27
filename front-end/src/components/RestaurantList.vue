<template>
  <div>
    <template v-for="restaurant in restaurants">
      <p>this represents a restaurant</p>
    </template>
  </div>
</template>

<script>
  export default {
    name: "RestaurantList",

    data() {
      return {
        restaurants: ["joe", "mama", "shrek"],
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <div class="level">
    <p class="level-left">{{resData.name}}</p>
    <p class="level-right">{{resData.freeSeats}} /  {{resData.totalSeats}} free</p>
  </div>
</template>

<script>
  export default {
    name: "CompactRestaurant",
    props: {
      resData: {
        type: Object,
        required: true,
      }
    },

    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  .level {
    margin-bottom: -0.25em;
  }
</style>

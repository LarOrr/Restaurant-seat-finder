<template>
  <div class="level" style="margin-bottom: -0.33%">
    <span class="level-left">
      <span>{{resData.name}}</span>
      &nbsp
      <span style="font-weight: normal; font-size:0.75em;">({{this.getResDist}})</span>
    </span>
    <span class="level-right">
      <span :class="this.getSeatAvailability">{{resData.free_seats}}</span>
      &nbsp
      <span>/ {{resData.total_seats}} free</span>
    </span>
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

    computed: {
      getSeatAvailability() {
        let fs = this.$props.resData.free_seats;
        let ts = this.$props.resData.total_seats;
        if(fs <= ts * 0.1) {
          return 'is-low-amount-of-seats';
        }
        else if (fs <= ts * 0.33) {
          return 'is-medium-amount-of-seats';
        }
        else return 'is-high-amount-of-seats';
      },

      getResDist() {
        //TODO: implement google maps api to get the distance between us and the restaurant
        return '1 km';
      }
    },
  }
</script>

<style scoped>
</style>

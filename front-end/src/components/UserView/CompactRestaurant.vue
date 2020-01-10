<template>
  <div class="columns" style="margin-bottom: -16px;">
    <div class="column">
      <span>{{resData.name}}</span>
      <span style="font-weight: normal; font-size:75%; white-space: nowrap;" v-show="this.getResDist !== ''">({{this.getResDist}})</span>
      <br>
      <span style="font-weight: normal; font-size:90%; font-style:italic;">{{resData.type}}</span>
    </div>
    <div class="column is-narrow-mobile is-narrow has-text-right">
      <span :class="this.getSeatAvailability">{{resData.free_seats}}</span>
      <span style="margin-left: 2px">/ {{resData.total_seats}} free</span>
    </div>
  </div>
</template>

<script>
  import DOS from "../../utils/DistanceOnSphere";

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
        let myLocation = this.$store.getters.position;
        if(myLocation) {
          myLocation = myLocation.coords;
        }
        else {
          return '';
        }

        let dist = DOS.calcDistOnEarth(myLocation.latitude, myLocation.longitude, this.$props.resData.address.coord_lat, this.$props.resData.address.coord_lon);
        return dist.toFixed(2) + ' km';
      }
    },
  }
</script>

<style scoped>
</style>

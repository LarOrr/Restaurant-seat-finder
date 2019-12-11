<template>
  <div class="columns">
    <div class="column is-10 is-offset-1" style="text-align: center;">
      <div class="columns">
        <!-- TODO: Make this section look better on mobile -->
        <div class="column is-5" style="text-align: right;">
          <SeatCountModifyingButtonSet :direction="PNenum.negative" v-on:modify-seats="modifySeats($event)"
          >
          </SeatCountModifyingButtonSet>
        </div>

        <!-- seat number for anything else-->
        <div class="column is-2 is-hidden-mobile">
          <p class="rest-view-seat-count">{{emptySeats}}</p>
        </div>

        <!-- seat number for mobile -->
        <div class="column is-2 is-hidden-tablet" style="margin: -4%;">
          <p class="rest-view-seat-count">{{emptySeats}}</p>
        </div>

        <div class="column is-5" style="text-align: left;">
          <SeatCountModifyingButtonSet :direction="PNenum.positive" v-on:modify-seats="modifySeats($event)"
          >
          </SeatCountModifyingButtonSet>
        </div>

      </div>

      <b-button type="is-primary" @click="confirmUpdate" class="is-huge">confirm</b-button>
    </div>

  </div>
</template>

<script>
  import PosNegEnum from '../../utils/enums/positiveNegativeEnum';
  import SeatCountModifyingButtonSet from "./SeatCountModifyingButtonSet";

  export default {
    name: "RestaurantSeatCounter",
    components: {SeatCountModifyingButtonSet},
    props: {
      freeSeats: {
        type: Number,
        required: true,
      },
      totalSeats: {
        type: Number,
        required: true,
      },
    },

    data() {
      return {
        PNenum: PosNegEnum.enum,
        emptySeats: this.$props.freeSeats,
      }
    },

    methods: {
      modifySeats(val) {
        if(val === Number.MAX_SAFE_INTEGER) {
          this.emptySeats = this.totalSeats;
        }
        else if(val === Number.MIN_SAFE_INTEGER) {
          this.emptySeats = 0;
        }
        else {
          this.emptySeats += val;
        }
        this.capSeats();
      },

      capSeats() {
        this.emptySeats = Math.min(Math.max(this.emptySeats, 0), this.totalSeats);
      },

      confirmUpdate() {
        this.$emit('seat-update', this.emptySeats);
      },
    }
  }
</script>

<style scoped>

</style>

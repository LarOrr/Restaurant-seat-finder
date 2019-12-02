<template>
  <div>
    <!-- input for desktop -->
    <b-field grouped>
      <b-numberinput rounded v-model="freeSeats" min="0" :max="$props.resData.total_seats" @blur="capSeats" class="is-hidden-mobile"></b-numberinput>
      <!-- input for mobile -->
      <b-numberinput rounded controls-position="compact" v-model="freeSeats" min="0" :max="$props.resData.total_seats" @blur="capSeats" class="is-hidden-tablet" style="width: 60%"></b-numberinput>

      <!-- Buttons for desktop site -->
      <b-button type="is-primary" @click="confirmUpdate" class="is-hidden-touch">confirm</b-button>
      <b-button type="is-danger" @click="cancelUpdate" class="is-hidden-touch" style="margin-left:1%">cancel</b-button>

      <!-- Buttons for mobile site -->
      <b-button type="is-primary" @click="confirmUpdate" class="is-hidden-desktop">
        <b-icon
          pack="fas"
          icon="fa fa-check"
        >
        </b-icon>

      </b-button>
      <b-button type="is-danger" @click="cancelUpdate" class="is-hidden-desktop" style="margin-left:1%">
        <b-icon
          pack="fas"
          icon="fa fa-times"
        >
        </b-icon>
      </b-button>
    </b-field>

  </div>
</template>

<script>
  export default {
    name: "RestaurantSeatUpdater",

    props: {
      resData: {
        type: Object,
        required: true,
      },
    },

    data() {
      return {
        freeSeats: this.$props.resData.free_seats,
      }
    },

    methods: {
      confirmUpdate() {
        this.$emit('confirm', this.freeSeats);
      },

      cancelUpdate() {
        this.$emit('cancel');
      },

      capSeats() {
        this.freeSeats = Math.min(Math.max(this.freeSeats, 0), this.$props.resData.total_seats);
      }
    },
  }
</script>

<style scoped>

</style>

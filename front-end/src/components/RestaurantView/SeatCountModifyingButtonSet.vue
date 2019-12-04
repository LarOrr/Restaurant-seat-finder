<template>
  <div>
    <!-- TODO: Make these buttons look better on mobile -->
    <b-button type="is-primary" @click="modifySeats(1)" class="is-large">{{getSimpleSign()}}</b-button>
    <br>
    <b-button v-for="i in Array.from({length: modifiers.length}, (v, ind) => ind)" type="is-primary" @click="modifySeats(orderedModifiers[i])" :key="i">{{getButtonString(orderedModifiers[i])}}</b-button>
  </div>
</template>

<script>
  import PosNegEnum from '../../utils/enums/positiveNegativeEnum';

  export default {
    name: "SeatCountModifyingButtonSet",

    props: {
      direction: {
        type: String,
        required: true,
      },
    },

    data() {
      return {
        modifiers: [2,4,5,6, Number.MAX_SAFE_INTEGER],
      }
    },

    computed: {
      orderedModifiers() {
        return (this.getSimpleSign() === '-' ? this.modifiers.reverse() : this.modifiers);
      },
    },


    methods: {
      getMinOrMax() {
        return (PosNegEnum.getSignString(this.$props.direction) === '+' ? 'empty' : 'full');
      },

      getSimpleSign() {
        return PosNegEnum.getSignString(this.$props.direction);
      },

      getSignedNum(num) {
        if(num === Number.MAX_SAFE_INTEGER) {return (this.getSimpleSign() === '-' ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER)}
        return PosNegEnum.getSignMultiplier(this.$props.direction) * num;
      },

      getSignedNumString(num) {
        return this.getSimpleSign() + num;
      },

      getButtonString(num) {
        return (num === Number.MAX_SAFE_INTEGER ? this.getMinOrMax() : this.getSignedNumString(num));
      },

      modifySeats(unsignedNum) {
        this.$emit('modify-seats', this.getSignedNum(unsignedNum));
      }
    },
  }
</script>

<style scoped>

</style>

<template>
  <div>
    <div class="is-hidden-mobile">
      <!-- For non mobile -->
      <!-- TODO: make the size of these buttons more consistent by giving all of them the same width -->
      <b-button type="is-primary" @click="modifySeats(1)" class="is-large" style="margin: 0.5%;">{{getSimpleSign()}}</b-button>
      <br>
      <b-button
        v-for="i in Array.from({length: modifiers.length}, (v, ind) => ind)"
        type="is-primary"
        @click="modifySeats(orderedModifiers[i])"
        :key="i"
        style="margin: 0.5%;"
      >
        {{getButtonString(orderedModifiers[i])}}
      </b-button>
    </div>

    <div class="is-hidden-tablet has-text-centered">
      <!-- Button for positive direction on mobile-->
      <template  v-if="isPos()">
        <b-button type="is-primary" class="is-large" @click="modifySeats(1)" style="margin: 0 0.5% 3px 0.5%;">{{getSimpleSign()}}</b-button>
        <br>
      </template>

      <b-button
        v-for="i in Array.from({length: modifiers.length}, (v, ind) => ind)"
        type="is-primary"
        @click="modifySeats(orderedModifiers[i])"
        :key="i"
        style="margin: 0.5%;"
      >
        {{getButtonString(orderedModifiers[i])}}
      </b-button>

      <!-- Button for negative direction on mobile -->
      <template v-if="!isPos()">
        <br>
        <b-button type="is-primary" class="is-large" @click="modifySeats(1)" style="margin: 3px 0.5% 0 3px;">{{getSimpleSign()}}</b-button>
      </template>

    </div>
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
        return (PosNegEnum.isPositive(this.$props.direction) ? 'empty' : 'full');
      },

      getSimpleSign() {
        return PosNegEnum.getSignString(this.$props.direction);
      },

      getSignedNum(num) {
        if(num === Number.MAX_SAFE_INTEGER) {return PosNegEnum.getSignedLimit(this.$props.direction)}
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
      },

      isPos() {
        return PosNegEnum.isPositive(this.$props.direction);
      },
    },
  }
</script>

<style scoped>

</style>

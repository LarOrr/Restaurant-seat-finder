<template>
  <b-message
    title="Attention"
    type="is-primary"
    style="margin: -23px 5% 0 5%; background-color: whitesmoke;"
    :closable="false"
    :active.sync="dataCollectionMessageOpen"
  >
    We would like to collect usage statistics and data to improve our website. By clicking 'Agree' you agree that we can collect anonymous data from your usage.
    <strong>We will never collect personal or sensitive data!</strong>
    <div>
      <b-button type="is-primary" @click="canCollectData(true)">Agree</b-button>
      <b-button @click="canCollectData(false)">Decline</b-button>
    </div>
  </b-message>
</template>

<script>
  export default {
    name: "ConsentMessage",
    props: {
      openByDefault: {
        type: Boolean,
        required: false,
        default: true,
      }
    },

    data() {
      return {
        dataCollectionMessageOpen: this.$props.openByDefault,
      }
    },


    methods: {
      canCollectData(bool) {
        // this.$store.dispatch('canCollectData', {tf: bool});
        this.dataCollectionMessageOpen = false;
      },
    },
  }
</script>

<style scoped>

</style>

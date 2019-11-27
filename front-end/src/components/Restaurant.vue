<template>
  <div>
    <p>{{resData.name}}</p>
  </div>
</template>

<script>
  export default {
    name: "Restaurant",
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

</style>

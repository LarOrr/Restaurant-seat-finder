<template>
  <div>
    <span>
      {{resData.name}}'s description
    </span>
    <br>
    <span>
      Address: {{resData.address ? resData.address : 'N/A'}}
    </span>
  </div>
</template>

<script>
  export default {
    name: "DetailedRestaurant",

    props: {
      resData: {
        type: Object,
        required: true,
      },
    },
  }
</script>

<style scoped>

</style>

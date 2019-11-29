<template>
  <div>
    <span>
      {{resData.name}}'s description
    </span>
    <br>
    <span>
      Address: {{resData.address ? resData.address.street + ' ' + resData.address.house_number + ', ' + resData.address.city + ', ' + resData.address.country : 'N/A'}}
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

<template>
  <header class="header has-text-centered">
    <div class="content font-header">
      <p id="headerContent">Restaurant Seat Finder</p>
    </div>
  </header>
</template>

<script>
  export default {
    name: "Header",
  }
</script>

<style scoped>

  header {
    position: relative;
    /*background: linear-gradient(to bottom, #960d04 0%, #d10d00 100%);*/
    background-image: url("../assets/background4.jpg");
    background-size:cover;
    margin: 0% 0 5% 0;
    height: 50px;
    width: 105%;
  }

</style>

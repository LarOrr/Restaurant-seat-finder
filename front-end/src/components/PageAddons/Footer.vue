<template>
  <footer class="footer has-text-left">
    <div class="content">
      <p class="font-header footer-text" id="footerSelfLink">This page: <a href="https://ress-restaurant-seat-finder.herokuapp.com">ress-restaurant-seat-finder.herokuapp.com</a></p>
<!--      <p class="font-header" id="footerFeedbackLink" style="font-size: 1em; font-weight: bold">If you have any feedback, please leave it here: </p>-->
      <p class="font-header footer-text"></p>
    </div>
  </footer>
</template>

<script>
  export default {
    name: "Footer",
  }
</script>

<style scoped>

  footer {
    height: 100px;
    width: 105%;
    margin-top: 30px;
    /*background: linear-gradient(to top, #960d04 0%, #d10d00 100%);*/
    background-image: url("../../assets/background4.jpg");
    background-repeat:no-repeat;
    background-size:cover;
  }

  .footer-text {
    font-size: 1em; font-weight: bold;
  }

</style>

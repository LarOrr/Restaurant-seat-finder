<template>
  <div class="content">
    <div class="columns">
      <div class="column is-10 is-offset-1">
        <div class="block is-centered">
          <h4 style="font-weight: bold; margin-bottom: 1%">Type</h4>
          <b-radio v-model="labelPosition"
                   native-value="restaurant">
            Restaurant
          </b-radio>
          <b-radio v-model="labelPosition"
                   native-value="cafe">
            Cafe
          </b-radio>
          <b-radio v-model="labelPosition"
                   native-value="pub">
            Pub/Bar
          </b-radio>
          <b-radio v-model="labelPosition"
                   native-value="fast-food">
            Fast food
          </b-radio>
          <b-radio v-model="labelPosition"
                   native-value="fast-casual">
            Fast casual
          </b-radio>
        </div>
        <b-field label="Name" id="registerNameText" style="width: 60%">
          <b-input
            type="name"
            placeholder="Your name"
            required
            id="nameRegister"
            rounded
          >
          </b-input>
        </b-field>
        <b-field label="Email" id="registerEmailText" style="width: 60%">
          <b-input
            type="email"
            placeholder="Your email"
            required
            id="emailRegister"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Password" id="registerPasswordText" style="width: 60%">
          <b-input
            type="password"
            password-reveal
            placeholder="Your password"
            required
            id="passwordRegister"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Repeat password" id="registerRepeatPasswordText" style="width: 60%">
          <b-input
            type="password"
            password-reveal
            placeholder="Your password"
            required
            id="passwordRegister"
            rounded
          >
          </b-input>
        </b-field>
        <h4 style="font-weight: bold; margin-bottom: 1%">Address</h4>
        <b-field grouped>
          <b-field label="HN" style="width: 10%">
            <b-input
              type="house-number"
              placeholder="Your house number"
              required
              id="houseNumberRegister"
              rounded
            >
            </b-input>
          </b-field>
          <b-field label="Street" style="width: 40%">
            <b-input
              type="street"
              placeholder="Your street"
              required
              id="streetRegister"
              rounded
            >
            </b-input>
          </b-field>
        </b-field>
        <b-field label="Postcode" style="width: 15%">
          <b-input
            type="postcode"
            placeholder="Your postcode"
            required
            id="postcodeRegister"
            rounded
          >

          </b-input>
        </b-field>
        <b-field grouped>
          <b-field label="City" style="width: 25%">
            <b-input
              type="city"
              placeholder="Your city"
              required
              id="cityRegister"
              rounded
            >

            </b-input>
          </b-field>
          <b-field label="Country" style="width: 25%">
            <b-input
              type="country"
              placeholder="Your country"
              required
              id="countryRegister"
              rounded
            >
            </b-input>
          </b-field>
        </b-field>
        <b-field label="Total seats" style="width: 10%">
          <b-input
            type="house-number"
            placeholder="Your house number"
            required
            id="houseNumberRegister"
            rounded
          >
          </b-input>
        </b-field>
        <b-field label="Description" style="width: 90%">
          <b-input maxlength="300" type="textarea"></b-input>
        </b-field>
        <b-field>
        <b-checkbox id="rememberCheckRegister" v-model="remember"><p id="registerRemember">Remember me</p></b-checkbox>
        </b-field>
          <button class="button is-right is-primary" @click.prevent="register" id="registerButton">Sign Up</button>
      </div>

      <b-loading :active="isLoading"></b-loading>
    </div>
  </div>
</template>

<script>
  import BField from "buefy/src/components/field/Field";

  export default {
    name: "RestaurantRegisterPage",
    components: {BField},
    data() {
      return {
        labelPosition: 'on-border'
      }
    }
  }
</script>

<style scoped>
  .content {
    width: 105%;
    background-color: var(--lightGrey);
    margin-left: 2%;
  }
</style>

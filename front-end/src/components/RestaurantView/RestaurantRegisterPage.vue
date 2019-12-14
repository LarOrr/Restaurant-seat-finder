<template>
  <div class="content">
    <div class="columns is-mobile">
      <div class="column is-6 is-offset-1">
        <h4 style="font-weight: bold; margin-bottom: 1%">Type</h4>
        <b-field>
          <b-radio native-value="restaurant" v-model="placeType">
            Restaurant
          </b-radio>
          <b-radio native-value="cafe" v-model="placeType">
            Cafe
          </b-radio>
          <b-radio native-value="pub" v-model="placeType">
            Pub/Bar
          </b-radio>
          <b-radio native-value="fast-food" v-model="placeType">
            Fast food
          </b-radio>
          <b-radio native-value="fast-casual" v-model="placeType">
            Fast casual
          </b-radio>
        </b-field>

        <b-field label="Name" id="registerNameText">
          <b-input
            v-model="placeName"
            type="name"
            placeholder="Your name"
            required
            id="nameRegister"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Username" id="registerUsernameText">
          <b-input
            v-model="placeUserName"
            type="username"
            placeholder="Your Username"
            required
            id="userNameRegister"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Email" id="registerEmailText">
          <b-input
            v-model="placeEmail"
            type="email"
            placeholder="Your email"
            required
            id="emailRegister"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Password" id="registerPasswordText">
          <b-input
            v-model="placePassword"
            type="password"
            password-reveal
            placeholder="Your password"
            required
            id="passwordRegister"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Repeat password" id="registerRepeatPasswordText">
          <b-input
            v-model="placePasswordRepeat"
            type="password"
            password-reveal
            placeholder="Repeat your password"
            required
            id="passwordRegisterRepeat"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Restaurant website" id="websiteText">
          <b-input
            v-model="placeWebsite"
            type="url"
            placeholder="Your website"
            required
            id="websiteRegister"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Restaurant phone number" id="phoneNumberText">
          <b-input
            v-model="placePhoneNumber"
            type="tel"
            placeholder="Your phone number"
            required
            id="websiteRegister"
            rounded
          >
          </b-input>
        </b-field>

        <h4 style="font-weight: bold; margin-bottom: 1%">Address</h4>
        <b-field grouped>
          <b-field label="HN" style="width: 20%">
            <b-input
              v-model="placeHouseNumber"
              type="number"
              placeholder="Your house number"
              required
              id="houseNumberRegister"
              rounded
            >
            </b-input>
          </b-field>

          <b-field label="Street">
            <b-input
              v-model="placeStreet"
              type="street"
              placeholder="Your street"
              required
              id="streetRegister"
              rounded
            >
            </b-input>
          </b-field>
        </b-field>

        <b-field label="Postcode" style="width:25%;">
          <b-input
            v-model="placePostcode"
            type="postcode"
            placeholder="Your postcode"
            required
            id="postcodeRegister"
            rounded
          >
          </b-input>
        </b-field>

        <b-field grouped>
          <b-field label="City">
            <b-input
              v-model="placeCity"
              type="city"
              placeholder="Your city"
              required
              id="cityRegister"
              rounded
            >

            </b-input>
          </b-field>

          <b-field label="Country">
            <b-input
              v-model="placeCountry"
              type="country"
              placeholder="Your country"
              required
              id="countryRegister"
              rounded
            >
            </b-input>
          </b-field>
        </b-field>

        <b-field label="Total seats" style="width: 20%">
          <b-input
            v-model="placeTotalSeats"
            type="number"
            placeholder="Your maximum number of seats"
            required
            id="houseNumberRegister"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Description">
          <b-input v-model="placeDescription" maxlength="300" type="textarea"></b-input>
        </b-field>

        <b-field grouped>
          <b-checkbox v-model="shouldRemember">
            remember me
          </b-checkbox>
          &nbsp
          <b-select v-model="tokenLifetime" placeholder="select time" :disabled="!shouldRemember">
            <option v-for="dayCount in lifetimes" :value="dayCount.value" :key="dayCount.value">
              {{dayCount.displayName + ' ' + dayCount.displaySuffix}}
            </option>
          </b-select>
        </b-field>


        <button class="button is-right is-primary" @click.prevent="register" id="registerButton">Sign Up</button>
      </div>

      <b-loading :active="isLoading"></b-loading>
    </div>
  </div>
</template>

<script>
import api from '../../api/api_wrapper';
import cookieHandler from '../../utils/CookieHandler';

  export default {
    name: "RestaurantRegisterPage",

    computed: {
      lifetimes() {
        return cookieHandler.lifetimes;
      },
    },

    data() {
      return {
        shouldRemember: false,
        isLoading: false,
        tokenLifetime: 1,

        //all of the variables for the register form
        placeType: '',
        placeName: '',
        placeUserName: '',
        placeEmail: '',
        placePassword: '',
        placePasswordRepeat: '',
        placeWebsite: '',
        placePhoneNumber: '',
        placeHouseNumber: '',
        placeStreet: '',
        placePostcode: '',
        placeCity: '',
        placeCountry: '',
        placeTotalSeats: '',
        placeDescription: '',
      }
    },

    methods: {
      register() {
        if(!(this.placeType && this.placeName && this.placeUserName && this.placeEmail && this.placePassword &&
            this.placePasswordRepeat === this.placePassword && this.placeHouseNumber && this.placeStreet &&
            this.placePostcode && this.placeCity && this.placeCountry && this.placeTotalSeats && this.placeDescription)) {
          this.$buefy.toast.open({message: 'please fill in all required fields', type: 'is-danger'});
          return;
        }

        api.register(this.placeType, this.placeName, this.placeUserName, this.placeEmail, this.placePassword,
            this.placeWebsite, this.placePhoneNumber, this.placeHouseNumber, this.placeStreet, this.placePostcode,
            this.placeCity, this.placeCountry, this.placeTotalSeats, this.placeDescription)
            .then((response) => {
          console.log(response);
          if(response.status === 200 || response.status === 201) {
            this.$store.dispatch('loginSuccessful', {authToken: response.data.token, tokenLifetime: this.shouldRemember ? this.tokenLifetime : 0});
            this.$router.push({name: 'MyRestaurant', params: {authToken: response.data.token, resData: response.data.place}});
          }
          else {
            this.$buefy.toast.open({message: 'could not register your account', type:'is-danger'});
          }
        });
      },
    },
  }
</script>

<style scoped>
  .content {
    width: 100%;
    background-color: var(--lightGrey);
  }
</style>

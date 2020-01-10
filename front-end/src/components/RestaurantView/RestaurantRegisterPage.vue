<template>
  <div class="content">
    <div class="columns is-mobile">
      <div class="column is-6 is-offset-1">
        <h4 style="font-weight: bold; margin-bottom: 5px">Type</h4>
        <b-field required>
          <b-radio native-value="restaurant" v-model="placeType">
            Restaurant
          </b-radio>
          <b-radio native-value="cafe" v-model="placeType">
            Cafe
          </b-radio>
          <b-radio native-value="pub" v-model="placeType">
            Pub/Bar
          </b-radio>
          <b-radio native-value="fast food" v-model="placeType">
            Fast food
          </b-radio>
          <b-radio native-value="fast casual" v-model="placeType">
            Fast casual
          </b-radio>
        </b-field>

        <b-field label="Restaurant Name" id="registerNameText">
          <b-input
            v-model="placeName"
            type="name"
            placeholder="Your restaurant's name"
            required
            id="nameRegister"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Username" id="registerUsernameText">
          <b-input
            v-model="placeUsername"
            type="username"
            placeholder="Your Username"
            required
            id="usernameRegister"
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

        <b-field label="Password" id="registerPasswordText" class="is-private-info">
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

        <b-field label="Repeat password" id="registerRepeatPasswordText" class="is-private-info">
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
            id="phoneRegister"
            rounded
          >
          </b-input>
        </b-field>

        <h4 style="font-weight: bold; margin-bottom: 5px">Address</h4>
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
              id="countryRegister"
              rounded
            >
            </b-input>
          </b-field>
        </b-field>

        <b-button class="button is-primary" @click="lookupCoords" style="margin-top:-2%">
          Verify address
        </b-button>

        <div v-show="addressOptions.length > 0">
          <b-select v-model="selectedAddress" placeholder="Please pick your address" style="margin-top:1%;">
            <option
              v-for="option in addressOptions"
              :value="option"
              :key="option.place_id"
            >
              {{option.display_name}}
            </option>
          </b-select>

          <b-tooltip
            label="try to be more specific and make sure that your address details do not contain any typos"
            :delay="300"
          >
            <p style="color:gray; text-align: right;">Help! The correct address is not in the list</p>
          </b-tooltip>
        </div>


        <b-field label="Total seats" style="width: 20%; margin-top:3%;">
          <b-input
            v-model="placeTotalSeats"
            type="number"
            placeholder="Your maximum number of seats"
            required
            id="totalSeatsRegister"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Description">
          <b-input v-model="placeDescription" maxlength="300" type="textarea"></b-input>
        </b-field>


        <p style="text-align:right; font-size:0.9em; margin-top: -6px">Fields marked with an asterisk (*) are required</p>

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
  import thirdPartyApi from '../../api/thirdparty_api_requests';
  import cookieHandler from '../../utils/CookieHandler';
  import tokens from "../../top_secret_files/tokenList";

  export default {
    name: "RestaurantRegisterPage",

    computed: {
      lifetimes() {
        return cookieHandler.lifetimes;
      },

      isAllRequiredFieldsFilledIn() {
        for(let i = 0; i < this.requiredFields.length; i++) {
          if(!(this[this.requiredFields[i].name])) {
            return false;
          }
        }
        return true;
      }
    },

    data() {
      return {
        shouldRemember: false,
        isLoading: false,
        tokenLifetime: 1,


        //all of the variables for the register form
        placeType: 'restaurant',
        placeName: '',
        placeUsername: '',
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

        requiredFields: [
          {name: 'placeName', id: 'nameRegister'},
          {name: 'placeUsername', id: 'usernameRegister'},
          {name: 'placeEmail', id: 'emailRegister'},
          {name: 'placePassword', id: 'passwordRegister'},
          {name: 'placePasswordRepeat', id: 'passwordRegisterRepeat'},
          {name: 'placeHouseNumber', id :'houseNumberRegister'},
          {name: 'placeStreet', id: 'streetRegister'},
          {name: 'placeTotalSeats', id: 'totalSeatsRegister'},
          {name: 'selectedAddress'}
        ],

        //the options the user will have to select their correct address from
        addressOptions: [],
        selectedAddress: null,
      }
    },

    mounted() {
      this.markAllRequiredFields();
    },

    methods: {
      lookupCoords() {
        if(!(this.placeStreet && this.placeHouseNumber)) {
          this.$buefy.toast.open({message: 'please fill in a street and a house number', type: 'is-danger'});
          return;
        }

        //first clear the old selected address
        this.selectedAddress = null;

        //for some reason our third party api does not like postcodes, so that is not included here
        let params = [this.placeHouseNumber, this.placeStreet, this.placeCity, this.placeCountry].filter(x => x);
        thirdPartyApi.getCoords(params, tokens.locationIqToken).then((response) => {
          if(response.status === 200) {
            this.addressOptions = response.data;
          }
          else {
            this.$buefy.toast.open({message: 'something went wrong when looking up the address, status: ' + status, type: 'is-danger'});
          }
        });
      },

      register() {
        if(!this.isAllRequiredFieldsFilledIn || !(this.placePassword === this.placePasswordRepeat) || !this.selectedAddress) {
          this.$buefy.toast.open({message: 'please fill in all required fields', type: 'is-danger'});
          return;
        }

        api.register(this.placeType, this.placeName, this.placeUsername, this.placeEmail, this.placePassword,
            this.placeWebsite, this.placePhoneNumber, this.placeHouseNumber, this.placeStreet, this.placePostcode,
            this.placeCity, this.placeCountry, this.selectedAddress.lat, this.selectedAddress.lon, this.placeTotalSeats, this.placeDescription)
            .then((response) => {
          if(response.status === 200 || response.status === 201) {
            this.$store.dispatch('loginSuccessful', {authToken: response.data.token, tokenLifetime: this.shouldRemember ? this.tokenLifetime : 0});
            this.$router.push({name: 'MyRestaurant', params: {authToken: response.data.token, resData: response.data.place}});
          }
          else {
            this.$buefy.toast.open({message: 'could not register your account', type:'is-danger'});
          }
        });
      },

      markAllRequiredFields() {
        for(let i = 0; i < this.requiredFields.length; i++) {
          if(this.requiredFields[i].id) {
            let parent = document.getElementById(this.requiredFields[i].id).parentElement.parentElement;
            let label = parent.getElementsByTagName('label')[0];
            label.innerText = label.innerText + '*';
          }
        }
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

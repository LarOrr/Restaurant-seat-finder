<template>
  <div class="content">
    <div class="columns is-mobile">
      <div class="column is-5 is-hidden-touch is-offset-1">
        <h2>{{$props.reasonMessage}}</h2>
        <b-field label="username"  :type="authenticationFailed ? 'is-danger' : ''">
          <b-input v-model="username" placeholder="username" @input="authenticationFailed = false"></b-input>
        </b-field>

        <b-field label="password" :type="authenticationFailed ? 'is-danger' : ''">
          <b-input v-model="password" type="password" placeholder="password" password-reveal @input="authenticationFailed = false"></b-input>
        </b-field>

        <b-field grouped>
          <b-checkbox v-model="rememberMe">
            remember me
          </b-checkbox>
          &nbsp
          <b-select v-model="tokenLifetime" placeholder="select time" :disabled="!rememberMe">
            <option v-for="dayCount in lifetimes" :value="dayCount.value" :key="dayCount.value">
              {{dayCount.displayName + ' ' + dayCount.displaySuffix}}
            </option>
          </b-select>
        </b-field>

        <div class="columns">
          <div class="column is-1">
            <b-button class="button is-primary" @click="authenticate" style="display: inline-block;">log in</b-button>
          </div>

          <div class="column has-text-right is-mobile">
            <router-link to="/register">
              <p style="margin: 1% 1% 0 0; display:inline-block;">I don't have a restaurant account yet</p>
            </router-link>
          </div>
        </div>

      </div>

      <div class="column is-10 is-offset-1 is-hidden-desktop">
        <h2>{{$props.reasonMessage}}</h2>
        <b-field label="username" :type="authenticationFailed ? 'is-danger' : ''">
          <b-input v-model="username" placeholder="username" @input="authenticationFailed = false"></b-input>
        </b-field>

        <b-field label="password" :type="authenticationFailed ? 'is-danger' : ''">
          <b-input v-model="password" type="password" placeholder="password" password-reveal @input="authenticationFailed = false"></b-input>
        </b-field>

        <b-field grouped>
          <b-checkbox v-model="rememberMe">
            remember me
          </b-checkbox>
          &nbsp
          <b-select v-model="tokenLifetime" placeholder="select time" :disabled="!rememberMe">
            <option v-for="dayCount in lifetimes" :value="dayCount.value" :key="dayCount.value">
              {{dayCount.displayName + ' ' + dayCount.displaySuffix}}
            </option>
          </b-select>
        </b-field>

        <div class="columns is-mobile">
          <div class="column is-1">
            <b-button class="button is-primary" @click="authenticate" style="display: inline-block;">log in</b-button>
          </div>

          <div class="column has-text-right">
            <router-link to="/register">
              <p class="is-hidden-mobile" style="margin: 1% 1% 0 0; display:inline-block;">I don't have a restaurant account yet</p>
              <p class="is-hidden-tablet" style="margin: 3% 1% 0 0; display:inline-block;">Register</p>
            </router-link>
          </div>
        </div>
      </div>


      <b-loading :active="isLoading"></b-loading>
    </div>
  </div>
</template>

<script>
  import api from '../../api/api_wrapper';
  import cookieHandler from '../../utils/CookieHandler';

  export default {
    name: "RestaurantAuthenticationPage",

    props: {
      reasonMessage: {
        type: String,
        required: false,
        default: 'Please log in to your restaurant account',
      },
    },

    computed: {
      lifetimes() {
        return cookieHandler.lifetimes;
      },
    },

    data() {
      return {
        isLoading: false,

        username: null,
        password: null,

        rememberMe: false,
        tokenLifetime: 1,

        authenticationFailed: false,
      }
    },

    methods: {
      authenticate() {
        if(!(this.username && this.password)) {
          this.$buefy.toast.open({message: 'Please fill in both fields', type: 'is-danger'});
          return;
        }

        this.isLoading = true;
        let authToken;
        api.requestAuthToken(this.username, this.password).then((response) => {
          if(response.status === 200) {
            authToken = response.data.token;
            this.$store.dispatch('loginSuccessful', {authToken: authToken, tokenLifetime: (this.rememberMe ? this.tokenLifetime : 0)});
            this.$router.push({name: 'MyRestaurant', params: {authToken: authToken, resData: response.data.place}});
          }
          else {
            this.$buefy.toast.open({
              message: 'Unable to login, reason: ' +
                  ((response && response.data && response.data.message) ? response.data.message : 'no reason provided'),
              type: 'is-danger',
            });
            this.authenticationFailed = true;
            console.error(response.data.message);
          }
        });
        this.isLoading = false;
      },
    },
  }
</script>

<style scoped>
.content{
  width: 100%;
  background-color: var(--lightGrey);
}
</style>

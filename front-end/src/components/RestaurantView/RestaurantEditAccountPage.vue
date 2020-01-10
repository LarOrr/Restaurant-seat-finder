<template>
  <div class="content">
    <h1 style="margin-left: 2%">Edit Account</h1>
    <div class="columns is-mobile">
      <div class="column is-6 is-offset-1">
        <button
          class="button is-right is-primary"
          id="ChangePasswordButton"
          style="margin-bottom: 2%"
          @click="isCardModalActive = true"
        >Change Password
        </button>

        <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
          <div class="card">
            <div class="card-content">
              <b-field label="Your Password" id="passwordText" class="is-private-info">
                <b-input
                  v-model="resData.password"
                  id="oldPassword"
                  rounded
                  type=password
                  placeholder="Your password"
                  required
                  password-reveal
                >
                </b-input>
              </b-field>
              <b-field label="New Password" id="newPasswordText" class="is-private-info">
                <b-input
                  v-model="placeNewPassword"
                  id="newPasswordUpdate"
                  type=password
                  rounded
                  placeholder="New password"
                  required
                  password-reveal
                >
                </b-input>
              </b-field>
              <b-field label="Repeat New Password" id="repeatNewPasswordText">
                <b-input
                  v-model="placeRepeatNewPassword"
                  id="repeatNewPassword"
                  type=password
                  rounded
                  placeholder="Repeat password"
                  required
                  password-reveal
                >
                </b-input>
              </b-field>
              <button class="button is-right is-primary" @click.prevent="updatePassword(resData.id)"
                      id="updatePasswordButton">Confirm
              </button>
            </div>
          </div>
        </b-modal>


        <b-field label="Restaurant Name" id="registerNameText">
          <b-input
            v-model="resData.name"
            id="nameUpdate"
            type="name"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Email" id="registerEmailText">
          <b-input
            v-model="resData.email"
            id="emailUpdate"
            type="email"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Restaurant website" id="websiteText">
          <b-input
            v-model="resData.website"
            id="websiteRegister"
            type="website"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Restaurant phone number" id="phoneNumberText">
          <b-input
            v-model="resData.phone_number"
            id="phoneUpdate"
            type="phonenumber"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Total seats" style="width: 20%">
          <b-input
            v-model="resData.total_seats"
            id="totalSeatsUpdate"
            type="number"
            rounded
          >
          </b-input>
        </b-field>

        <b-field label="Description">
          <b-input v-model="resData.description" maxlength="300" type="textarea"></b-input>
        </b-field>

        <button class="button is-right is-primary" @click.prevent="updateAccount(resData.id)" id="editButton">Confirm
        </button>
        <!--<button class="button is-right is-primary" @click.prevent="deleteAccount(resData.id)" style="margin-left: 1%"-->
                <!--id="deleteButton">Delete Account-->
        <!--</button>-->
        <button class="button is-right is-danger" @click="confirm(resData.id)" style="margin-left: 1%">Delete Account
        </button>
      </div>

      <!--      <b-loading :active="isLoading"></b-loading>-->
    </div>
  </div>
</template>
<script>
  import api from '../../api/api_wrapper';
  import cookieHandler from '../../utils/CookieHandler';

  export default {
    name: "RestaurantEditAccountPage",

    computed: {

      isAllRequiredFieldsFilledIn() {
        for (let i = 0; i < this.requiredFields.length; i++) {
          if (!(this[this.requiredFields[i].name])) {
            return false;
          }
        }
        return true;
      }
    },


    data() {
      return {
        authToken: '',
        resData: {},
        finishedAuthentication: false,
        isCardModalActive: false,

        placePassword: '',
        placeNewPassword: '',
        placeRepeatNewPassword: '',
      }
    },

    mounted() {
      this.markAllRequiredFields();
    },

    async beforeRouteEnter(to, from, next) {
      let cookieToken = cookieHandler.getCookie('authToken', 512);
      if (!(from.params.authToken || cookieToken)) {
        next({name: 'Login', params: {reasonMessage: 'No session token found, please log in'}});
      } else {
        api.reAuthenticate(cookieToken).then((response) => {
          //authenticated
          if (response.status === 200) {
            // console.log(response);
            next(vm => {
              vm.authToken = from.params.authToken ? from.params.authToken : cookieToken;
              vm.resData = response.data;
              vm.finishedAuthentication = true;
            });
          }
          //not authenticated
          else {
            next({name: 'Login', params: {reasonMessage: 'Your session could not be verified, please log in again'}});
          }
        });
      }
    },

    async mounted() {
      await this.$nextTick();
      this.$store.dispatch('loginSuccessful', {authToken: this.authToken});
    },

    methods: {
      confirm(resId) {
        this.$buefy.dialog.confirm({
          message: 'Are you sure you want to delete your account?',
          confirmText: 'Delete Account',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.deleteAccount(resId)
        })
      },

      async deleteAccount(resId) {
        await this.$nextTick();
        console.log("Deleted");
        api.deleteAccount(resId, this.authToken).then((response) => {
          if (response && response.status === 200) {
            this.$buefy.toast.open({message: 'Account was deleted successfully', type: 'is-success'});
            if (!(this.$route.name === 'MainPage')) {
              this.$router.push('/');
            }
            this.$store.dispatch('logoutSuccessful');
          } else {
            this.$buefy.toast.open({message: 'could not delete your account', type: 'is-danger'});
          }
        })
      },

      async updatePassword(resId, oldPassword) {
        await this.$nextTick();
        console.log("Update password");
        if (!(this.placeNewPassword === this.placeRepeatNewPassword)) {
          this.$buefy.toast.open({message: 'Passwords do not match. Please, try again.', type: 'is-danger'});
          return;
        }
        if ((this.placeNewPassword === this.placePassword)) {
          this.$buefy.toast.open({message: 'Use a new password', type: 'is-danger'});
          return;
        }
        api.updatePassword(resId, this.placeNewPassword, this.authToken).then((response) => {
          if (response && response.status === 200) {
            this.$buefy.toast.open({
              message: 'Password has been updated. Login again using a new password',
              type: 'is-success'
            });
            if (!(this.$route.name === 'MainPage')) {
              this.$router.push('/');
            }
            this.$store.dispatch('logoutSuccessful');
          } else {
            this.$buefy.toast.open({message: 'could not update your password', type: 'is-danger'});
          }
        });
      },

      async updateAccount(resId) {
        await this.$nextTick();
        console.log("Update Account");
        let newFreeSeats = Math.min(this.resData.free_seats, this.resData.total_seats);
        api.update(resId, this.resData.name, this.resData.email, this.resData.website, this.resData.phone_number,
          newFreeSeats, this.resData.total_seats, this.resData.description, this.authToken).then((response) => {
          if (response && response.status === 200) {
            this.$buefy.toast.open({message: 'Account has been updated', type: 'is-success'});
            this.$router.push('MyRestaurant');
          } else {
            this.$buefy.toast.open({message: 'Could not update your account', type: 'is-danger'});
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>

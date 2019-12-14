import axios from 'axios';

/**
 * this file provides a wrapper around the actual back end for ease of use in the front end
 */
export default {

  getPlaces() {
    console.log('making get request to /places');
    return axios.get('/places').then((response) => {
      return response;
    }, (error) => {
      console.error(error);
      return error.response;
    });
  },

  updateSeats(id, updatedNum, authToken) {
    let requestBody = {free_seats: updatedNum};
    let config = {headers: {Authorization: 'Bearer ' + authToken}};
    console.log('making patch request to /places/' + id, requestBody, config);
    return axios.patch('/places/' + id, requestBody, config).then((response) => {
      return response;
    }, (error) => {
      console.error(error);
      return error.response;
    });
  },

  requestAuthToken(username, password) {
    let requestBody = {username: username, password: password};
    console.log('making post request to /login with: ', requestBody);
    return axios.post('/login', requestBody).then((response) => {
      console.log(response);
      return response;
    }, (error) => {
      console.error(error);
      return error.response;
    });
  },

  reAuthenticate(authToken) {
    //TODO: implement this method when the back end is ready
    return null;
  },

  register(placeType, placeName, placeUserName, placeEmail, placePassword, placeWebsite, placePhoneNumber, placeHouseNumber,
      placeStreet, placePostcode, placeCity, placeCountry, placeTotalSeats, placeDescription) {
    let requestBody = {
      type: placeType,
      name: placeName,
      username: placeUserName,
      email: placeEmail,
      password: placePassword,
      website: placeWebsite,
      phone_number: placePhoneNumber,
      house_number: placeHouseNumber,
      street: placeStreet,
      postcode: placePostcode,
      city: placeCity,
      country: placeCountry,
      total_seats: placeTotalSeats,
      free_seats: placeTotalSeats,
      description: placeDescription,
    };
    console.log('making post request to /places with: ', requestBody);
    return axios.post('/places', requestBody).then((response) => {
      console.log(response);
      return response;
    }, (error) => {
      console.error(error);
      return error.response;
    });
  },
}

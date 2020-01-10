import axios from 'axios';

/**
 * this file provides a wrapper around the actual back end for ease of use in the front end
 */
export default {

  getPlaces() {
    //console.log('making get request to /places');
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
    //console.log('making patch request to /places/' + id, requestBody, config);
    return axios.patch('/places/' + id, requestBody, config).then((response) => {
      return response;
    }, (error) => {
      console.error(error);
      return error.response;
    });
  },

  updatePassword(id, placeNewPassword, authToken) {
    let requestBody = {password: placeNewPassword};
    let config = {headers: {Authorization: 'Bearer ' + authToken}};
    //console.log('making patch request to /places/' + id, requestBody, config);
    return axios.patch('/places/' + id, requestBody, config).then((response) => {
      return response;
    }, (error) => {
      console.error(error);
      return error.response;
    });
  },

  update(id, placeName, placeEmail, placeWebsite, placePhoneNumber, placeFreeSeats, placeTotalSeats, placeDescription, authToken) {
    let requestBody = {
      name: placeName,
      email: placeEmail,
      website: placeWebsite,
      phone_number: placePhoneNumber,
      free_seats: placeFreeSeats,
      total_seats: placeTotalSeats,
      description: placeDescription,
    };
    let config = {headers: {Authorization: 'Bearer ' + authToken}};
    return axios.patch('/places/' + id, requestBody, config).then((response) => {
      return response;
    }, (error) => {
      console.error(error);
      return error.response;
    });
  },

  requestAuthToken(username, password) {
    let requestBody = {username: username, password: password};
    //console.log('making post request to /login');
    return axios.post('/login', requestBody).then((response) => {
      return response;
    }, (error) => {
      console.error(error);
      return error.response;
    });
  },

  reAuthenticate(authToken) {
    let config = {headers: {Authorization: 'Bearer ' + authToken}};
    return axios.get('/current-place', config).then((response) => {
      return response;
    }, (error) => {
      console.error(error);
      return error.response;
    });
  },

  register(placeType, placeName, placeUserName, placeEmail, placePassword, placeWebsite, placePhoneNumber, placeHouseNumber,
      placeStreet, placePostcode, placeCity, placeCountry, latitude, longitude, placeTotalSeats, placeDescription) {
    let requestBody = {
      type: placeType,
      name: placeName,
      username: placeUserName,
      email: placeEmail,
      password: placePassword,
      website: placeWebsite,
      phone_number: placePhoneNumber,
      address: {
        house_number: placeHouseNumber,
        street: placeStreet,
        postcode: placePostcode,
        city: placeCity,
        country: placeCountry,
        coord_lat: latitude,
        coord_lon: longitude,
      },
      total_seats: placeTotalSeats,
      free_seats: placeTotalSeats,
      description: placeDescription,
    };

    return axios.post('/places', requestBody).then((response) => {
      return response;
    }, (error) => {
      console.error(error);
      return error.response;
    });
  },

  deleteAccount(id, authToken){
    let config = {headers: {Authorization: 'Bearer ' + authToken}};
    return axios.delete("/places/" + id, config).then((response) => {
      return response;
    }, (error) => {
      console.error(error);
      return error.response;
    });
  },
}

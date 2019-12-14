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
    return axios.patch('/places/' + id, requestBody).then((response) => {
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
}

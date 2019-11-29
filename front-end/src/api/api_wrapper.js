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

  updateSeats(id, updatedNum) {
    console.log('making patch request to /places/' + id);
    return axios.patch('/places/' + id, {free_seats: updatedNum}).then((response) => {
      return response;
    }, (error) => {
      console.error(error);
      return error.response;
    });
  },
}

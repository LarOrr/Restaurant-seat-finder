import axios from 'axios';

export default {
  getCoords(params, token) {
    return axios.get('https://eu1.locationiq.com/v1/search.php?key=' + token + '&q=' + params.join(', ') + '&format=json').then((response) => {
      return response;
    }, (error) => {
      console.error(error);
      return error.response;
    });
  }
}

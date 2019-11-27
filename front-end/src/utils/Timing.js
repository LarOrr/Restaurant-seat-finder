export default {
  /**
   * allows a component to easily wait for a given amount of milliseconds
   * @param {Number} milliseconds: the amount of time in milliseconds to wait
   * @returns {Promise<any>}: a promise will resolve in a given amount of milliseconds so it can be awaited
   */
  sleep(milliseconds) {
    return new Promise(function(resolve) {setTimeout(resolve, milliseconds)});
  }
}

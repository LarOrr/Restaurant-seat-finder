export default {
  /**
   * creates a cookie
   * @param {String} key: the key of the cookie
   * @param {String} value: the value of the cookie
   * @param {Number} expire: potential argument for the number of days it should remain valid,
   *                leave out for expiration after the session
   */
  createCookie(key, value, ...expire) { //potentially has a third argument for number of days
    //if an amount of days is given, use that,
    //otherwise assume that it should only last for the current session (0 days)
    let days = 0;
    if(arguments.length > 2) {
      days = arguments[2];
    }

    //if an amount of days is given, we need to format it so we can store that in the cookie,
    //otherwise we leave it as an empty, which will essentially do nothing once we append it to the rest
    let expires = "";
    if (days > 0) {
      let date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }

    //this is the way to add a cookie,
    //the format is important here
    document.cookie = key + "=" + value.toString() + expires + "; path=/";
  },

  /**
   * deletes a cookie if present, or simply returns silently if not present
   * @param {String} key: the key of the cookie to be deleted
   */
  deleteCookie(key) {
    if(this.getCookie(key) !== undefined) {
      this.createCookie(key, "");
    }
  },

  /**
   * keeps the value of the cookie, but sets the expiring date to a given amount of days from the current date
   * @param {String} key: the key of the cookie
   * @param {Number} days: the amount of days it should remain valid, starting from the current date, NOT the original date!
   */
  extendCookie(key, days) {
    let value = this.getCookie(key);
    if (value !== undefined) {
      this.createCookie(key, value, days);
    }
  },

  /**
   * takes from a string until it reaches the given character or undefined (out of bounds)
   * @param {String} string: the string to take from
   * @param {String} endChar: the character that it should stop at (will not be included in return value)
   * @param {Number} others: potential argument for starting index,
   *                potential argument for maxbound (only take given of amount of characters)
   * @returns {string|undefined}: the requested substring, or undefined if nothing was found
   */
  takeUntil(string, endChar, ...others) {
    let startIndex = 0;
    let maxBound = 100;
    if(arguments.length > 2) {
      startIndex = arguments[2];
    }
    if(arguments.length > 3) {
      maxBound = arguments[3];
    }
    let result = "";
    for(let i = startIndex; string[i] !== endChar && string[i] !== undefined; i++) {
      if(i > startIndex + maxBound) {
        console.error("SUBSTRING_MAXBOUND_EXCEEDED_ERROR : " + result);
        return "SUBSTRING_MAXBOUND_EXCEEDED_ERROR";
      }
      result += string[i];
    }
    if(result === "") {
      return undefined;
    }
    return result;
  },

  /**
   * gets the value of a cookie
   * @param {String} key: the key of the cookie
   * @param {Number} maxLength: the maximum length of the cookie, leave empty for 100
   * @returns {undefined|*|string}: the value of the cookie, or undefined if the cookie does not exist
   */
  getCookie(key, maxLength) {
    //we get the index of the first letter, add the length of the key to get to the end index of the key,
    //and then add one to 'skip' the '=' sign between the key and the value
    let startInd = document.cookie.indexOf(key) + key.length + 1;
    //if the startInd >= key.length + 1, indexOf must have returned 0 or higher, i.e. the key was found
    if(startInd >= key.length+1) {
      return this.takeUntil(document.cookie, ';', startInd, maxLength);
    }
    //if the startInd < key.length + 1, indexOf must have returned -1, i.e. the key was not found
    return undefined;
  },

  /**
   * gets the authToken of the current session
   * @returns {*|*|string}: the authToken
   */
  getToken() {
    return this.getCookie("authToken");
  },


  lifetimes: [
    {displayName: '1', displaySuffix: 'day', value: 1},
    {displayName: '7', displaySuffix: 'days', value: 7},
    {displayName: '30', displaySuffix: 'days', value: 30},
    {displayName: '1', displaySuffix: 'year', value: 365},
    {displayName: 'forever', displaySuffix: '', value: 36500},
  ],
}

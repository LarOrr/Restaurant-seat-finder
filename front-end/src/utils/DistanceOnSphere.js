export default {

  earthRadius: 6371,

  /**
   * calculates the distance between two sets of coordinates on earth using the haversine formula
   * @see{@link https://en.wikipedia.org/wiki/Haversine_formula}
   * @param lat1 latitude of the first point
   * @param long1 longitude of the first point
   * @param lat2 latitude of the second point
   * @param long2 longitude of the second point
   * @returns the distance in kilometers
   */
  calcDistOnEarth(lat1, long1, lat2, long2) {
    return this.calcDist(lat1, long1, lat2, long2, this.earthRadius);
  },

  calcDist(lat1, long1, lat2, long2, r) {
    let h = this.calcH(lat1, long1, lat2, long2);
    return 2*r*Math.asin(Math.sqrt(h));
  },

  calcH(lat1, long1, lat2, long2) {
    lat1 = this.degreesToRadians(lat1);
    long1 = this.degreesToRadians(long1);
    lat2 = this.degreesToRadians(lat2);
    long2 = this.degreesToRadians(long2);

    let havLat = this.haversine(lat2 - lat1);
    let havLong = this.haversine(long2 - long1);
    return havLat + Math.cos(lat1)*Math.cos(lat2)*havLong;
  },

  /**
   * implementation of the haversine formula
   * @see{@link https://en.wikipedia.org/wiki/Haversine_formula}
   * @param theta the argument of the haversine formula
   * @returns {number} the result of the haversine formula
   */
  haversine(theta) {
    let s = Math.sin(theta/2);
    return s*s;
  },

  degreesToRadians(degrees) {
    return degrees/180*Math.PI;
  },
}

export default {
  enum: {positive: "POSITIVE", negative: "NEGATIVE"},

  getSignMultiplier(enumVal) {
    return (enumVal === this.enum.negative ? -1 : 1);
  },

  getSignString(enumVal) {
    return (enumVal === this.enum.negative ? '-' : '+');
  },

  isPositive(enumVal) {
    return enumVal === this.enum.positive;
  },

  isPositiveNum(num) {
    return num >= 0;
  },

  getSignedLimit(enumVal) {
    return (this.isPositive(enumVal) ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER);
  }
};


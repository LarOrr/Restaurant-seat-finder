export default {
  enum: {positive: "POSITIVE", negative: "NEGATIVE"},

  getSignMultiplier(enumVal) {
    return (enumVal === this.enum.negative ? -1 : 1);
  },

  getSignString(enumVal) {
    return (enumVal === this.enum.negative ? '-' : '+');
  },
};


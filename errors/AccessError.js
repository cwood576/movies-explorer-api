module.exports.AccessError = class AccessError extends Error {
  constructor(message) {
    super(message);
    this.code = 403;
  }
};

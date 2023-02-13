module.exports.InvalidUserDataError = class InvalidUserDataError extends Error {
  constructor(message) {
    super(message);
    this.code = 401;
  }
};

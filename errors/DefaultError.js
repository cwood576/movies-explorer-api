module.exports.DefaultError = class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.code = 500;
  }
};

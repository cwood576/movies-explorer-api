module.exports.AlreadyExistError = class AlreadyExistError extends Error {
  constructor(message) {
    super(message);
    this.code = 409;
  }
};

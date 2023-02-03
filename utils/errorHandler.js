const { DefaultError } = require('../errors/DefaultError');

const { defaultMessage } = require('../constants/messages');

module.exports = (err, req, res, next) => {
  if (err.code) {
    res.status(err.code).send({ message: err.message });
  } else {
    const e = new DefaultError(defaultMessage);
    res.status(e.code).send({ message: e.message });
  }
};

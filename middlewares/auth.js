const jwt = require('jsonwebtoken');
require('dotenv').config();
const { InvalidUserDataError } = require('../errors/InvalidUserDataError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    const err = new InvalidUserDataError('Необходима авторизация');
    next(err);
    return true;
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = payload;
  } catch (e) {
    const err = new InvalidUserDataError('Необходима авторизация');
    next(err);
    return true;
  }
  next();
  return true;
};

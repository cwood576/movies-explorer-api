// Подключение зависимостей
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Подключаем модель пользователя
const Users = require('../models/users');

// Подключаем файл с константами
const {
  alreadyExistEmail,
  userNotFound,
  invalidPassword,
  successAuth,
  successLogout,
  defaultMessage,
} = require('../constants/messages');

// Подключаем классы ошибок
const { NotFoundError } = require('../errors/NotFoundError');
const { InvalidUserDataError } = require('../errors/InvalidUserDataError');
const { AlreadyExistError } = require('../errors/AlreadyExistError');
const { DefaultError } = require('../errors/DefaultError');

// Подключение переменных окружения
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = async (req, res, next) => {
  const {
    name,
    password,
    email,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await Users.create({
      name,
      password: hash,
      email,
    });
    res.send({
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    if (e.code === 11000) {
      const err = new AlreadyExistError(alreadyExistEmail);
      next(err);
      return true;
    }
    const err = new DefaultError(defaultMessage);
    next(err);
  }
  return true;
};

module.exports.login = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    const user = await Users.findOne({ email }).select('+password');
    if (user === null) {
      const err = new InvalidUserDataError(userNotFound);
      next(err);
    } else {
      const matched = bcrypt.compare(password, user.password);
      if (!matched) {
        const err = new InvalidUserDataError(invalidPassword);
        next(err);
        return true;
      }
      const token = jwt.sign(
        { id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
      return res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          sameSite: 'none',
          secure: true,
          httpOnly: true,
        })
        .send({ message: successAuth });
    }
  } catch (err) {
    next(err);
  }
  return true;
};

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.id);
    if (user === null) {
      const err = new NotFoundError(userNotFound);
      next(err);
    } else {
      return res.send({ data: user });
    }
  } catch (err) {
    next(err);
  }
  return true;
};

module.exports.updateProfile = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const user = await Users.findByIdAndUpdate(req.user.id, { name, email }, {
      new: true,
      runValidators: true,
    });
    if (user === null) {
      const err = new NotFoundError(userNotFound);
      next(err);
      return true;
    }
    return res.send({ data: user });
  } catch (e) {
    if (e.code === 11000) {
      const err = new AlreadyExistError(alreadyExistEmail);
      next(err);
      return true;
    }
    next(e);
  }
  return true;
};

module.exports.resetCookie = (req, res, next) => res.clearCookie('jwt').send({ message: successLogout });

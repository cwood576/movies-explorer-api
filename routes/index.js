const router = require('express').Router();
const { errors } = require('celebrate');

// Подключаем модуль валидации
const { createUserValidator, loginValidator } = require('../utils/validation');

// Подключаем файл с константами
const { pageNotFound } = require('../constants/messages');

// Подключаем классы ошибок
const { NotFoundError } = require('../errors/NotFoundError');

const { login, createUser } = require('../controllers/users');

router.post('/signin', loginValidator, login);

router.post('/signup', createUserValidator, createUser);

router.use(require('../middlewares/auth'));

router.use(require('./movies'));
router.use(require('./users'));

router.use(errors());

router.use('/*', (req, res, next) => {
  const err = new NotFoundError(pageNotFound);
  next(err);
});

module.exports = router;

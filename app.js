// Подключение зависимостей
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// Подключаем ограничитель количества запросов
const limiter = require('./utils/rateLimiter');

// Подключаем модуль валидации
const { createUserValidator, loginValidator } = require('./utils/validation');

// Подключаем файл с параметрами
const { helmetConfig, corsConfig, mongoConfig } = require('./constants/configs');

// Подключаем функции логгирования
const { requestLogger, errorLogger } = require('./middlewares/logger');

// Подключаем файл с константами
const { pageNotFound } = require('./constants/messages');

// Подключаем классы ошибок
const { NotFoundError } = require('./errors/NotFoundError');

const { PORT = 3000, MONGO_SERVER } = process.env;

const app = express();

const { login, createUser } = require('./controllers/users');

mongoose.connect(MONGO_SERVER, mongoConfig);

app.use(limiter);
app.use(helmet(helmetConfig));

app.use(cors(corsConfig));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.post('/api/signin', loginValidator, login);

app.post('/api/signup', createUserValidator, createUser);

app.use(require('./middlewares/auth'));

app.use('/api', require('./routes/index'));

app.use(errors());

app.use('*', (req, res, next) => {
  const err = new NotFoundError(pageNotFound);
  next(err);
});

app.use(errorLogger);

app.use(require('./utils/errorHandler'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

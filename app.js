// Подключение зависимостей
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// Подключаем ограничитель количества запросов
const limiter = require('./utils/rateLimiter');

// Подключаем файл с параметрами
const { helmetConfig, corsConfig, mongoConfig } = require('./constants/configs');

// Подключаем функции логгирования
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGO_SERVER = mongoConfig.devServer } = process.env;

const app = express();

mongoose.connect(MONGO_SERVER, mongoConfig.options);

app.use(requestLogger);

app.use(limiter);
app.use(helmet(helmetConfig));
app.use(cors(corsConfig));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(require('./utils/errorHandler'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

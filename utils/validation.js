const { celebrate, Joi } = require('celebrate');

const config = {
  shortString: Joi.string().trim().min(2).max(30)
    .required(),
  longString: Joi.string().trim().min(2).max(150)
    .required(),
  url: Joi.string().trim().min(2).required()
    .pattern(/https?:\/\/(www\.)?([\w-])+\.(\w)+\/?[\w\-_~:/?[\]@!$&'()*+,;=]*/),
  email: Joi.string().trim().required().email({ minDomainSegments: 2 }),
  password: Joi.string().trim().min(8).required(),
};

const postMovieValidator = celebrate({
  body: Joi.object().keys({
    country: config.shortString,
    director: config.shortString,
    duration: Joi.number().integer().required(),
    year: Joi.string().trim().length(4).required(),
    description: config.longString,
    image: config.url,
    trailerLink: config.url,
    thumbnail: config.url,
    nameRU: config.shortString.pattern(/^[а-яА-ЯЁ\-0-9\s]+$/),
    nameEN: config.shortString.pattern(/^[\w\s]+$/),
  }),
});
const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const patchUserValidator = celebrate({
  body: Joi.object().keys({
    name: config.shortString,
    email: config.email,
  }),
});
const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: config.shortString,
    password: config.password,
    email: config.email,
  }),
});
const loginValidator = celebrate({
  body: Joi.object().keys({
    password: config.password,
    email: config.email,
  }),
});
module.exports = {
  postMovieValidator,
  deleteMovieValidator,
  patchUserValidator,
  createUserValidator,
  loginValidator,
};

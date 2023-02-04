const { celebrate, Joi } = require('celebrate');

const config = {
  string: Joi.string().trim().required(),
  url: Joi.string().trim().min(2).required()
    .pattern(/https?:\/\/(www\.)?([\w-])+\.(\w)+\/?[\w\-_~:/?[\]@!$&'()*+,;=]*/),
  email: Joi.string().trim().required().email({ minDomainSegments: 2 }),
  password: Joi.string().trim().required(),
};

const postMovieValidator = celebrate({
  body: Joi.object().keys({
    country: config.string,
    director: config.string,
    duration: Joi.number().required(),
    year: config.string,
    description: config.string,
    image: config.url,
    trailerLink: config.url,
    thumbnail: config.url,
    nameRU: config.string,
    nameEN: config.string,
    movieId: Joi.number().integer().required(),
  }),
});
const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const patchUserValidator = celebrate({
  body: Joi.object().keys({
    name: config.string.min(2).max(30),
    email: config.email,
  }),
});
const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: config.string.min(2).max(30),
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

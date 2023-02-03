// Подключаем модель фильма
const Movies = require('../models/movies');

// Подключаем файл с константами
const {
  filmNotFound,
  permissionDenied,
  defaultMessage,
} = require('../constants/messages');

// Подключаем классы ошибок
const { NotFoundError } = require('../errors/NotFoundError');
const { AccessError } = require('../errors/AccessError');
const { DefaultError } = require('../errors/DefaultError');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movies.find({ owner: req.user.id });
    res.send({ data: movies });
  } catch (e) {
    const err = new DefaultError(defaultMessage);
    next(err);
  }
};
module.exports.postMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;
  try {
    const movie = await Movies.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      owner: req.user.id,
    });
    res.send({ data: movie });
  } catch (e) {
    const err = new DefaultError(defaultMessage);
    next(err);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movies.findById(req.params.id);
    if (movie === null) {
      const err = new NotFoundError(filmNotFound);
      next(err);
      return;
    }
    if (movie.owner.equals(req.user.id)) {
      try {
        const item = await Movies.findByIdAndRemove(req.params.id);
        res.send({ data: item });
      } catch (err) {
        next(err);
      }
    } else {
      const err = new AccessError(permissionDenied);
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

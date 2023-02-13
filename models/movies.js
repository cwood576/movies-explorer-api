const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
    required: true,
  },
  trailerLink: {
    type: String,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: 'MovieID not an integer',
    },
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movies', movieSchema);

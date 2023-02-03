const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  director: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    length: 4,
    required: true,
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 150,
    required: true,
  },
  image: {
    type: String,
    minlength: 2,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
    required: true,
  },
  trailerLink: {
    type: String,
    minlength: 2,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
    required: true,
  },
  thumbnail: {
    type: String,
    minlength: 2,
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
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return validator.isAlphanumeric(v, 'ru-RU', {
          ignore: /[-\s]*/g,
        });
      },
    },
    required: true,
  },
  nameEN: {
    type: String,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        return validator.isAlphanumeric(v, 'en-US', {
          ignore: /[-\s]*/g,
        });
      },
    },
    required: true,
  },
});

module.exports = mongoose.model('movies', movieSchema);

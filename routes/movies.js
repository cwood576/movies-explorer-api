const router = require('express').Router();

const {
  postMovieValidator,
  deleteMovieValidator,
} = require('../utils/validation');
const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', postMovieValidator, postMovie);
router.delete('/movies/:id', deleteMovieValidator, deleteMovie);

module.exports = router;

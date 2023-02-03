const router = require('express').Router();
const { patchUserValidator } = require('../utils/validation');

const {
  updateProfile,
  getCurrentUser,
  resetCookie,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.get('/exit', resetCookie);
router.patch('/users/me', patchUserValidator, updateProfile);

module.exports = router;

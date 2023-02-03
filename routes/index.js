const router = require('express').Router();

router.use(require('./movies'));
router.use(require('./users'));

module.exports = router;

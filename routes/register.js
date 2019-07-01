const express = require('express');
const router = express.Router();
const { register } = require('../controllers/auth.js');

// @route  POST /register
// @desc   Register new user
// @access Public
router.post('/', register);

// Export the router
module.exports = router;

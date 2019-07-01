const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth.js');

// @route  POST /login
// @desc   Login to account
// @access Public
router.post('/', login);

// Export the router
module.exports = router;

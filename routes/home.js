const express = require('express');
const router = express.Router();
const { auth } = require('../controllers/auth');

// @route  GET /
// @desc   Access to home API
// @access Private
router.get('/', auth, (req, res) => {
  // If the object user defined in request, means the user is authorized
  if(req.user) {
    res.send('The user authorized, and can access to this page!');
  }
  else {
    res.send('Access to this page has been denied!');
  }
});

// Export the router
module.exports = router;

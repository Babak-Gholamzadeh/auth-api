const User = require('../models/user');

// The object controller that's going to be exported
const authController = {};

// Register new user
authController.register = async (req, res) => {
  res.send('register page');
};

// Login to account
authController.login = async (req, res) => {
  res.send('login page');
};

// Authorize the user
authController.auth = async (req, res, next) => {
  // res.send('register page');
};

module.exports = authController;

const User = require('../models/user');
const validate = require('../lib/validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// The object controller that's going to be exported
const authController = {};

// Register new user
authController.register = async (req, res) => {
  try {
    // Exract the require fields form request body
    let {
      name,
      email,
      password
    } = req.body;
    // Validate name field, Not be null or empty
    validate(name).isEmpty('The name field is required!');
    // Validate email field, Not be null or empty
    validate(email).isEmpty('The email field is required!');
    // Validate password field, Not be null or empty, and be at least 3 characters
    validate(password).isEmpty('The password field is required!').lenLessThan(3, 'The password must be at least 3 chatacters!');

    // Hash the password
    password = bcrypt.hashSync(password, 10);

    // If everything is fine then create a new user
    const user = new User({
      name,
      email,
      password
    });

    // Add the user to DB
    await user.save();

    // Avoid to send back the password
    user.password = undefined;

    // Send back the created user
    res.json(user);

  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};

// Login to account
authController.login = async (req, res) => {
  try {
    // Exract the require fields form request body
    const {
      email,
      password
    } = req.body;
    // Validate email field, Not be null or empty
    validate(email).isEmpty('The email field is required!');
    // Validate password field, Not be null or empty
    validate(password).isEmpty('The password field is required!');

    // Check the user exists
    const user = await User.findOne({ email });
    // If the user doesn't exists, throw an error
    if(!user) {
      throw new Error('The username or/and password is incorrect!');
    }
    // If the password is incorrect, throw an error
    if(!bcrypt.compareSync(password, user.password)) {
      throw new Error('The username or/and password is incorrect!');
    }
    // If username and password are valid, send back a token for authorization the user
    res.json({
      token: jwt.sign({ name: user.name, email: user.email, _id: user.id }, 'SecretAPIKey')
    });

  } catch (err) {
    res.status(401).json({
      error: err.message
    });
  }
};

// Authorize the user
// This function is used as middleware
authController.auth = async (req, res, next) => {
  // For authorization just check if the valid token exists in request header
  // If it does, then attach the user object to request object
  // Else req.user = undefined
  try {
    if(req.headers.token) {
      // If the token is valid, the decode will equal to payload
      const decode = jwt.verify(req.headers.token, 'SecretAPIKey');
      // Check if the user still exists in DB
      const user = await User.findOne({ email: decode.email }).select('-password');
      req.user = user;
    }
    else {
      req.user = undefined;
    }
  } catch (err) {
    req.user = undefined;
  } finally {
    next();
  }
};

// Export controller object
module.exports = authController;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a user schema
const User = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

// Export the defined user schema
module.exports = mongoose.model('User', User);

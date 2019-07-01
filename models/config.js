const mongoose = require('mongoose');
module.exports = async () => {
  try {
    // Connect to DB
    await mongoose.connect('mongodb://localhost:27017/authapi', {
      useNewUrlParser: true
    });
  } catch (err) {
    // If any error occurring, show the error message and terminate the server
    console.log(err.massage);
    process.exit(1);
  }
};

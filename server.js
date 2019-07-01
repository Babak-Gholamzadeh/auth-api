const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./models/config');
const { auth } = require('./controllers/auth');

// Connect to DB
connectDB();

// Use port 3000 if there isn't any port sat
const PORT = process.env.PORT || 3000;

// Parse the data in request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// The Authorization can be used for all end points or just some of them
// app.use(auth);

// Define the routers as middleware to controll the routes
// Register Route
app.use('/register', require('./routes/register'));
// Login Route
app.use('/login', require('./routes/login'));

// Home Route
app.get('/', auth, (req, res) => {
  if(req.user) {
    res.send('The user authorized, and can access to this page!');
  }
  else {
    res.send('Access to this page has been denied!');
  }
});

// Server listen to the port and waiting for a request
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

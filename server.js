const express = require('express');
const app = express();
const connectDB = require('./models/config');

// Connect to DB
connectDB();

// Use port 3000 if there isn't any port sat
const PORT = process.env.PORT || 3000;

// Define the routers as middleware to controll the routes
// Register Route
app.use('/register', require('./routes/register'));
// Login Route
app.use('/login', require('./routes/login'));


app.get('/', (req, res) => {
  res.send('Home');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

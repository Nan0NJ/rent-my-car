const express = require('express');
const session = require('express-session');
const cors = require('cors');
// UNCOMMENT TO USE THE BUILD FOLDER
const path = require('path');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 8228;

app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // We set it to TRUE if we are gonna use https, i'll set it to true
})); // This is used for the session

// Configurations
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3001', // front-end connection
  credentials: true, // Allows for credentials (cookies, authorization headers, etc.)
  methods: ['GET', 'POST'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// UNCOMMENT TO USE THE BUILD FOLDER
// // Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

const cars = require('./routes/cars');
const users = require('./routes/users');
const admins = require('./routes/admins');
const model_cars = require('./routes/model_cars');
const reviews = require('./routes/reviews');

app.use('/cars', cars);
app.use('/users', users);
app.use('/admins', admins);
app.use('/model_cars', model_cars);
app.use('/reviews', reviews);

// app.get('/', (req, res) => {
//   res.send('Rent My Car API');
// });

// app.get('/admins', (req, res) => {
//   res.send('Rent My Car ADMIN API');
// });

// UNCOMMENT TO USE THE BUILD FOLDER
// Serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => { console.log(`Server is running on port ${port}`); });
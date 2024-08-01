const express = require('express');
const session = require('express-session');
const cors = require('cors');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 8228;

app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true } // We set it to TRUE if we are gonna use https, i'll set it to true
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
const cars = require('./routes/cars');
const users = require('./routes/users');

app.use('/cars', cars);
app.use('/users', users);

app.get('/', (req, res) => {
  res.send('Rent My Car API');
});

app.listen(port, () => { console.log(`Server is running on port ${port}`); });
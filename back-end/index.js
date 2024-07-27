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
  cookie: { secure: true }
})); // This is used for the session

// Configurations
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  methods: ['GET', 'POST'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cars = require('./routes/cars');

app.use('/cars', cars);

app.get('/', (req, res) => {
  res.send('Rent My Car API');
});

app.listen(port, () => { console.log(`Server is running on port ${port}`); });
const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

conn.connect((err) => {
    if(err){
        console.log("ERROR: " + err.message);
        return;
    }
    console.log('Connection established');
});

let dataPool = {};

dataPool.getAllCars = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM cars', (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};


dataPool.getCarById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM cars WHERE id = ?', [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

// dataPool.addCar = (car) => { LATER ON

// Authenticate user
dataPool.AuthUser = (email) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

// Using bcrypt with a hash function to secure passwords getting stored in the data base
const bcrypt = require('bcrypt');
const saltRounds = 10; 
// Add user with hashed password
dataPool.AddUser = (email, password, fullname, age, imageBuffer) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
            if (err) {
                return reject(err);
            }
            conn.query('INSERT INTO users (email, password, fullname, age, image) VALUES (?, ?, ?, ?, ?)', [email, hashedPassword, fullname, age, imageBuffer], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        });
    });
};

// Get all users FOR ME TO CHECK THAT SMT IS WORKING ;/////// 
dataPool.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT email, password, age, approved FROM users', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

// Check if email exists
dataPool.CheckEmailExists = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT email FROM users WHERE email = ?';
        conn.query(query, [email], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return reject(err);
            }
            return resolve(results.length > 0);
        });
    });
};

module.exports = dataPool;
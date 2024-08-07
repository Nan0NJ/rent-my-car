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
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

dataPool.getCarById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM cars WHERE car_id = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

// Add a car to the database
dataPool.addCar = (car) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO cars (car_id, car_name, car_category, car_owner, model_year, car_information, car_location, car_mileage, green_card, car_img)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        conn.query(query, [
            car.car_id, car.car_name, car.car_category, car.car_owner, car.model_year,
            car.car_information, car.car_location, car.car_mileage, car.green_card, car.car_img
        ], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

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

// Authenticate admin
dataPool.AuthAdmin = (email) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM admins WHERE email = ?', [email], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

// Get all users with approval status 0
dataPool.getUnapprovedUsers = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT email, fullname, age, image FROM users WHERE approved = 0', (err, results) => {
            if (err) {
                return reject(err);
            }
            // Convert image BLOB to base64 string
            const users = results.map(user => ({
                email: user.email,
                fullname: user.fullname,
                age: user.age,
                image: user.image ? Buffer.from(user.image).toString('base64') : null
            }));
            return resolve(users);
        });
    });
};

// Get all information from DB for a specific user
dataPool.getUserDetails = (email) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT email, fullname, age, cars_for_rent, rented_cars FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};


// AdminMatch: Update user approval status to 1 based on email
dataPool.AdminMatch = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE users SET approved = 1 WHERE email = ?';
        conn.query(query, [email], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

// Delete user by email
dataPool.deleteUser = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM users WHERE email = ?';
        conn.query(query, [email], (err, results) => {
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

// Get all car models prices
dataPool.getCarPriceByName = (carName) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT car_full_price FROM model_cars WHERE LOWER(car_name) = ?';
        conn.query(query, [carName.toLowerCase()], (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length > 0) {
                return resolve(results[0].car_full_price);
            } else {
                return resolve(null); // Car not found
            }
        });
    });
};

module.exports = dataPool;
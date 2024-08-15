const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

conn.connect((err) => {
    if (err) {
        console.log("ERROR: " + err.message);
        return;
    }
    console.log('Connection established');
});

let dataPool = {};

dataPool.getAllCars = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT car_name, car_category, car_location, car_information, car_owner, car_img, car_price, car_approved, car_mileage, model_year FROM cars';
        conn.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            // Convert car_img BLOB to base64 string
            const cars = results.map(car => ({
                ...car,
                car_img: car.car_img ? Buffer.from(car.car_img).toString('base64') : null
            }));
            return resolve(cars);
        });
    });
};

dataPool.getCarById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM cars WHERE car_id = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length > 0) {
                const car = results[0];
                car.car_img = car.car_img ? Buffer.from(car.car_img).toString('base64') : null;
                return resolve([car]);
            } else {
                return resolve([]); // No car found
            }
        });
    });
};

// Add a car to the database
dataPool.addCar = (car) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO cars (car_id, car_name, car_category, car_owner, model_year, car_information, car_location, car_mileage, green_card, car_img, car_price)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        conn.query(query, [
            car.car_id, car.car_name, car.car_category, car.car_owner, car.model_year,
            car.car_information, car.car_location, car.car_mileage, car.green_card, car.car_img, car.price
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

// Get all cars with approval status 0
dataPool.getUnapprovedCars = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT car_name, car_category, car_owner, model_year, car_information, car_location, car_mileage, car_price, car_img, green_card FROM cars WHERE car_approved = 0', (err, results) => {
            if (err) {
                return reject(err);
            }
            // Convert image and green_card BLOBs to base64 strings
            const cars = results.map(car => ({
                car_name: car.car_name,
                car_category: car.car_category,
                car_owner: car.car_owner,
                model_year: car.model_year,
                car_information: car.car_information,
                car_location: car.car_location,
                car_mileage: car.car_mileage,
                car_price: car.car_price,
                car_img: car.car_img ? Buffer.from(car.car_img).toString('base64') : null,
                green_card: car.green_card ? Buffer.from(car.green_card).toString('base64') : null
            }));
            return resolve(cars);
        });
    });
};


dataPool.getUserDetails = (email) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT email, fullname, age, cars_for_rent, rented_cars, image FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
                return reject(err);
            }

            // Check if results were returned
            if (results.length > 0) {
                const user = results[0];
                // Convert image BLOB to base64 string
                user.image = user.image ? Buffer.from(user.image).toString('base64') : null;
                return resolve([user]);
            } else {
                return resolve([]); // No user found
            }
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

// CarMatch: Update car approval status to 1 based on car_id
dataPool.CarMatch = (car_id) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE cars SET car_approved = 1 WHERE car_id = ?';
        conn.query(query, [car_id], (err, results) => {
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

// Delete car by car_id
dataPool.deleteCar = (car_id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM cars WHERE car_id = ?';
        conn.query(query, [car_id], (err, results) => {
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

// Get all cars information for a specific user
dataPool.UserPublished = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM cars WHERE car_owner = ?';
        conn.query(query, [email], (err, results) => {
            if (err) {
                return reject(err);
            }
            // Convert car_img BLOB to Base64 string
            const cars = results.map(car => ({
                ...car,
                car_img: car.car_img ? Buffer.from(car.car_img).toString('base64') : null
            }));
            return resolve(cars);
        });
    });
};

// Add a review to the database
dataPool.addReview = (review) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO reviews (car_id, user_email, user_fullname, review_text, review_date)
            VALUES (?, ?, ?, ?, NOW())
        `;
        conn.query(query, [
            review.car_id, review.user_email, review.user_fullname, review.review_text
        ], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

// Get all reviews for a specific car
dataPool.getReviewsByCarId = (car_id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM reviews WHERE car_id = ? ORDER BY review_date DESC', [car_id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

// Get all comments
dataPool.getAllComments = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT r.*, u.fullname as user_fullname FROM reviews r JOIN users u ON r.user_email = u.email';
        conn.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

// Delete a comment by its ID
dataPool.deleteCommentById = (review_id) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM reviews WHERE review_id = ?';
        conn.query(query, [review_id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = dataPool;
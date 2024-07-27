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

module.exports = dataPool;
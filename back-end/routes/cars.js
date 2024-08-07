const express = require('express');
const cars = express.Router();
const DB = require('../db/dbConn');
const multer = require('multer');

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

cars.post('/add', upload.fields([{ name: 'green_card', maxCount: 1 }, { name: 'car_img', maxCount: 1 }]), async (req, res) => {
    const {
        car_id,
        car_name,
        car_category,
        car_owner,
        model_year,
        car_information,
        car_location,
        car_mileage,
        is_damaged,
        price,
    } = req.body;

    const greenCard = req.files['green_card'][0];
    const carImg = req.files['car_img'][0];

    if (!car_id || !car_name || !car_category || !car_owner || !model_year || !car_information || !car_location || !car_mileage || !greenCard || !carImg || !price) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const car = {
        car_id,
        car_name,
        car_category,
        car_owner,
        model_year,
        car_information,
        car_location,
        car_mileage: parseInt(car_mileage),
        green_card: greenCard.buffer,
        car_img: carImg.buffer,
        price: parseFloat(price),
        is_damaged: is_damaged === 'true'
    };

    try {
        const result = await DB.addCar(car);
        res.status(201).json({ message: 'Car added successfully', carId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add car' });
    }
});

module.exports = cars;

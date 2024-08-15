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

// Route to get all cars
cars.get('/all', async (req, res) => {
    try {
        const cars = await DB.getAllCars();
        res.status(200).json(cars);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch cars' });
    }
});

// Get all unapproved cars
cars.get('/unapproved', async (req, res) => {
    try {
        const cars = await DB.getUnapprovedCars();
        res.status(200).json(cars);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve unapproved users' });
    }
});

// Cars match to update approval status
cars.post('/matchcar', async (req, res) => {
    const { car_id } = req.body;

    if (!car_id) {
        return res.status(400).json({ error: 'Car_id is required' });
    }

    try {
        const result = await DB.CarMatch(car_id);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Car approval status updated successfully' });
        } else {
            res.status(404).json({ error: 'Car not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update car approval status' });
    }
});

// Get all cars published by the user
cars.get('/published-cars', async (req, res) => {
    const email = req.query.email;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const cars = await DB.UserPublished(email);
        res.status(200).json(cars);
    } catch (error) {
        console.error('Error fetching published cars:', error);
        res.status(500).json({ error: 'Failed to fetch published cars' });
    }
});

// Delete car by car_id
cars.post('/deletecar', async (req, res) => {
    const { car_id } = req.body;

    if (!car_id) {
        return res.status(400).json({ error: 'Car_id is required' });
    }

    try {
        const result = await DB.deleteCar(car_id);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Car deleted successfully' });
        } else {
            res.status(404).json({ error: 'Car not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete car' });
    }
});

// Get car details by ID
cars.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const car = await DB.getCarById(id);
        if (!car || car.length === 0) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json(car[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve car details' });
    }
});

module.exports = cars;

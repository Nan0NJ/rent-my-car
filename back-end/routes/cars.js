const express = require('express');
const cars = express.Router();
const DB = require('../db/dbConn');

// Get all cars
cars.get('/', async (req, res) => {
    try {
        let cars = await DB.getAllCars();
        res.json(cars);
    } catch (error) {
        console.log(error);
        error.sendStatus(500);
        next();
    }
});

// Get car by id
cars.get('/:id', async (req, res) => {
    try {
        let car = await DB.getCarById(req.params.id);
        res.json(car);
    } catch (error) {
        console.log(error);
        error.sendStatus(500);
        next();
    }
});


module.exports = cars;
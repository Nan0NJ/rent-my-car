const express = require('express');
const models = express.Router();
const DB = require('../db/dbConn');

models.get('/car-price', async (req, res) => {
    const carName = req.query.name;

    if (!carName) {
        return res.status(400).json({ error: 'Car name is required' });
    }

    try {
        const price = await DB.getCarPriceByName(carName);
        if (price !== null) {
            res.status(200).json({ price });
        } else {
            res.status(404).json({ error: 'Car not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve car price' });
    }
});

module.exports = models;
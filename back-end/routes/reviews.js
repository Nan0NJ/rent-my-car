const express = require('express');
const reviews = express.Router();
const DB = require('../db/dbConn');

// Add a review
reviews.post('/add', async (req, res) => {
    const { car_id, user_email, user_fullname, review_text } = req.body;

    if (!car_id || !user_email || !user_fullname || !review_text) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const review = {
        car_id,
        user_email,
        user_fullname,
        review_text,
    };

    try {
        const result = await DB.addReview(review);
        res.status(201).json({ message: 'Review added successfully', reviewId: result.insertId });
    } catch (err) {
        console.error('Error adding review:', err);
        res.status(500).json({ error: 'Failed to add review' });
    }
});

// Get all reviews for a specific car
reviews.get('/', async (req, res) => {
    const { car_id } = req.query;

    if (!car_id) {
        return res.status(400).json({ error: 'Car ID is required' });
    }

    try {
        const reviews = await DB.getReviewsByCarId(car_id);
        res.status(200).json(reviews);
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

module.exports = reviews;
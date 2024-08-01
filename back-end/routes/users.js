const express = require('express');
const users = express.Router();
const DB = require('../db/dbConn');
const bcrypt = require('bcrypt');

// User REGISTER
users.post('/register', async (req, res) => {
    const { email, password, age } = req.body;

    if (!email || !password || !age) {
        return res.status(400).json({ error: 'Email, password, and age are required' });
    }

    try {
        const result = await DB.AddUser(email, password, age);
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// User LOGIN
users.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const users = await DB.AuthUser(email);
        const user = users[0];

        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                req.session.user = user;
                res.status(200).json({ message: 'Login successful', user, approvalStatus: user.approved });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to login' });
    }
});

// Get all user approvals
users.get('/all-approvals', async (req, res) => {
    try {
        const approvals = await DB.getApproval();
        res.status(200).json(approvals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve user approvals' });
    }
});

// Get all users
users.get('/all', async (req, res) => {
    try {
        const users = await DB.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});

// User session
users.get('/session', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ error: 'No active session' });
    }
});

module.exports = users;
const express = require('express');
const admins = express.Router();
const DB = require('../db/dbConn');
const bcrypt = require('bcrypt');

// Admin LOGIN
admins.post('/loginadmin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const users = await DB.AuthAdmin(email);
        const user = users[0];

        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                req.session.user = user;
                res.status(200).json({ message: 'Login successful', user });
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

// Check if email exists in admins table
admins.post('/checkemail', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ exists: false, message: 'Email is required' });
    }

    try {
        const users = await DB.AuthAdmin(email);
        const user = users[0];

        if (user) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ exists: false, message: 'Failed to check email' });
    }
});

module.exports = admins;
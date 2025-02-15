const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/auth.models');
const { body } = require('express-validator');
const { loginUser, registerUser } = require('../controller/auth.controller');

const router = express.Router();

router.post('/register-admin', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await User.hashPassword(password);
        const user = new User({
            email,
            password: hashedPassword,
            role: 'admin'
        });

        await user.save();

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        res.status(201).json({ message: 'Admin registered successfully!', data: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], loginUser);

module.exports = router;
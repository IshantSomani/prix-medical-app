const User = require("../models/auth.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ message: "Users Fetched", data: users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};

exports.registerUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await User.hashPassword(password);
        const user = new User({
            email,
            password: hashedPassword,
            role: "user"
        });

        await user.save();
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return res.status(201).json({ message: "User Created", data: userWithoutPassword });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        const token = jwt.sign(
            {
                role: user.role,
                email: user.email,
                _id: user._id
            },
            process.env.JWT_SECRET,
            { expiresIn: "10h" }
        );

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        res.status(200).json({
            message: "Login successful",
            data: userWithoutPassword,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error during login", error: error.message });
    }
};
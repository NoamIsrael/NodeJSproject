const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

const router = express.Router();

// User registration route
router.post('/register', async (req, res) => {
    try {
        const { email, password, isBusiness, isAdmin } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            isBusiness,
            isAdmin,
        });

        await newUser.save();

        const token = jwt.sign(
            {
                _id: newUser._id,
                isBusiness: newUser.isBusiness,
                isAdmin: newUser.isAdmin,
            },
            'your-secret-key',
            { expiresIn: '1h' }
        );

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
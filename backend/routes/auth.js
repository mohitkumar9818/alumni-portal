const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d'
    });
};

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password, gradYear, company, location } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create user
        user = await User.create({
            name,
            email,
            password,
            gradYear,
            company,
            location
        });

        // Schedule CRM sync (simulate async job)
        setTimeout(async () => {
            try {
                // Simulate CRM API call
                user.crmSynced = true;
                user.crmSyncedAt = new Date();
                await user.save();
                console.log(`User ${user.email} synced to CRM`);
            } catch (error) {
                console.error('CRM sync error:', error);
            }
        }, 2000); // 2 seconds for demo (spec: within 5 minutes)

        const token = generateToken(user._id);

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                gradYear: user.gradYear
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        // Find user with password field
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                gradYear: user.gradYear
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

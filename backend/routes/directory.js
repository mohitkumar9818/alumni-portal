const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/directory
// @desc    Search alumni directory
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const { name, year, company, location, skills } = req.query;

        const query = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }

        if (year) {
            query.gradYear = parseInt(year);
        }

        if (company) {
            query.company = { $regex: company, $options: 'i' };
        }

        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        if (skills) {
            const skillsArray = skills.split(',').map(s => s.trim());
            query.skills = { $in: skillsArray };
        }

        const users = await User.find(query)
            .select('-password')
            .limit(50)
            .sort({ name: 1 });

        res.json({
            count: users.length,
            users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

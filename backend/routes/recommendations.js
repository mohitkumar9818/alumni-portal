const express = require('express');
const router = express.Router();
const axios = require('axios');
const { protect } = require('../middleware/auth');

// @route   POST /api/recommendations
// @desc    Get AI recommendations (proxy to AI service)
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';

        const response = await axios.post(`${aiServiceUrl}/recommend`, {
            userId: req.user.id.toString(),
            profile: {
                skills: req.user.skills || [],
                interests: req.user.interests || [],
                gradYear: req.user.gradYear,
                company: req.user.company,
                industry: req.user.industry
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('AI service error:', error.message);
        res.status(500).json({
            error: 'Failed to get recommendations',
            details: error.response?.data || error.message
        });
    }
});

module.exports = router;

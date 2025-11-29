const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Job = require('../models/Job');

// @route   GET /api/jobs
// @desc    Get all jobs
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const { tags, type, company } = req.query;
        const query = { active: true };

        if (tags) {
            const tagsArray = tags.split(',').map(t => t.trim());
            query.tags = { $in: tagsArray };
        }

        if (type) {
            query.type = type;
        }

        if (company) {
            query.company = { $regex: company, $options: 'i' };
        }

        const jobs = await Job.find(query)
            .populate('postedBy', 'name email')
            .sort({ createdAt: -1 });

        res.json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   POST /api/jobs
// @desc    Create job posting
// @access  Private (Admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
    try {
        const job = await Job.create({
            ...req.body,
            postedBy: req.user.id
        });
        res.status(201).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   GET /api/jobs/:id
// @desc    Get job by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate('postedBy', 'name email');

        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

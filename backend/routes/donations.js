const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Donation = require('../models/Donation');

// @route   POST /api/donations
// @desc    Create donation
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { amount, message } = req.body;

        if (!amount || amount < 1) {
            return res.status(400).json({ error: 'Valid amount is required' });
        }

        const donation = await Donation.create({
            userId: req.user.id,
            amount,
            message,
            status: 'pending'
        });

        // Simulate Stripe payment link generation
        const paymentUrl = `https://donate.stripe.com/test_${donation._id}`;

        // In production, integrate with Stripe:
        // const session = await stripe.checkout.sessions.create({...});
        // paymentUrl = session.url;

        res.status(201).json({
            donation,
            paymentUrl,
            message: 'Donation created. Complete payment to finalize.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   GET /api/donations/my
// @desc    Get user's donations
// @access  Private
router.get('/my', protect, async (req, res) => {
    try {
        const donations = await Donation.find({ userId: req.user.id })
            .sort({ createdAt: -1 });
        res.json(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   GET /api/donations/stats
// @desc    Get donation statistics (admin)
// @access  Private (Admin)
router.get('/stats', protect, async (req, res) => {
    try {
        const stats = await Donation.aggregate([
            { $match: { status: 'completed' } },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(stats[0] || { totalAmount: 0, count: 0 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

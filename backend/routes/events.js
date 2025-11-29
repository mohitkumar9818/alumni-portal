const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Event = require('../models/Event');

// @route   GET /api/events
// @desc    Get all events
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const events = await Event.find()
            .populate('createdBy', 'name email')
            .sort({ startDate: 1 });
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   POST /api/events
// @desc    Create event
// @access  Private (Admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
    try {
        const event = await Event.create({
            ...req.body,
            createdBy: req.user.id
        });
        res.status(201).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   POST /api/events/:id/register
// @desc    Register for event
// @access  Private
router.post('/:id/register', protect, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        if (event.attendees.includes(req.user.id)) {
            return res.status(400).json({ error: 'Already registered for this event' });
        }

        if (event.attendees.length >= event.capacity) {
            return res.status(400).json({ error: 'Event is full' });
        }

        event.attendees.push(req.user.id);
        await event.save();

        res.json({ message: 'Successfully registered for event', event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// @route   GET /api/events/:id
// @desc    Get event by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('createdBy', 'name email')
            .populate('attendees', 'name email');

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

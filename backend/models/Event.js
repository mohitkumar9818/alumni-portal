const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required']
    },
    location: {
        type: String,
        trim: true
    },
    capacity: {
        type: Number,
        default: 100
    },
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    ticketUrl: String,
    ticketPrice: {
        type: Number,
        default: 0
    },
    imageUrl: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);

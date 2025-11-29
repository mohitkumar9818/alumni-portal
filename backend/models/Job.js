const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    company: {
        type: String,
        required: [true, 'Company is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    location: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
        default: 'Full-time'
    },
    tags: [{
        type: String,
        trim: true
    }],
    applyUrl: {
        type: String,
        required: [true, 'Apply URL is required']
    },
    salary: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);

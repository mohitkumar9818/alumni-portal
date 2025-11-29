const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: 1
    },
    currency: {
        type: String,
        default: 'USD'
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    paymentMethod: String,
    transactionId: String,
    message: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Donation', donationSchema);

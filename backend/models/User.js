const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false
    },
    gradYear: {
        type: Number,
        required: false
    },
    skills: [{
        type: String,
        trim: true
    }],
    interests: [{
        type: String,
        trim: true
    }],
    company: {
        type: String,
        trim: true
    },
    industry: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ['alumnus', 'admin'],
        default: 'alumnus'
    },
    optInMentor: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String,
        maxlength: 500
    },
    linkedIn: String,
    phone: String,
    crmSynced: {
        type: Boolean,
        default: false
    },
    crmSyncedAt: Date
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

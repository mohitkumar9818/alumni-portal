const mongoose = require('mongoose')

const leaderboardEntrySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    scores: {
        mentorship: { type: Number, default: 0 },
        engagement: { type: Number, default: 0 },
        achievement: { type: Number, default: 0 },
        contribution: { type: Number, default: 0 },
        total: { type: Number, default: 0 }
    },
    metrics: {
        mentorshipSessions: { type: Number, default: 0 },
        requestsAccepted: { type: Number, default: 0 },
        postsCreated: { type: Number, default: 0 },
        repliesMade: { type: Number, default: 0 },
        groupsJoined: { type: Number, default: 0 },
        certificationsEarned: { type: Number, default: 0 },
        promotionsReceived: { type: Number, default: 0 },
        awardsWon: { type: Number, default: 0 },
        eventsAttended: { type: Number, default: 0 },
        donationsMade: { type: Number, default: 0 },
        volunteerHours: { type: Number, default: 0 }
    },
    badges: [{
        type: String,
        enum: ['Gold', 'Silver', 'Bronze', 'Elite Mentor', 'Active Contributor', 'Rising Star', 'Community Champion', 'Event Enthusiast']
    }],
    rank: { type: Number, default: 0 },
    previousRank: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
}, {
    timestamps: true
})

// Calculate total score
leaderboardEntrySchema.methods.calculateTotalScore = function () {
    const { mentorship, engagement, achievement, contribution } = this.scores
    this.scores.total = mentorship + engagement + achievement + contribution
    return this.scores.total
}

// Assign badges based on scores
leaderboardEntrySchema.methods.assignBadges = function () {
    const badges = []
    const { total, mentorship, engagement, contribution } = this.scores

    // Elite badges
    if (total >= 80) badges.push('Elite Mentor')
    if (total >= 60) badges.push('Active Contributor')

    // Specific achievement badges
    if (mentorship >= 25) badges.push('Community Champion')
    if (contribution >= 20) badges.push('Event Enthusiast')

    // Rising star (high score with recent activity)
    const daysSinceUpdate = (Date.now() - this.lastUpdated) / (1000 * 60 * 60 * 24)
    if (total >= 40 && daysSinceUpdate <= 7) badges.push('Rising Star')

    this.badges = badges
    return badges
}

// Index for faster queries
leaderboardEntrySchema.index({ userId: 1 }, { unique: true })
leaderboardEntrySchema.index({ 'scores.total': -1 })
leaderboardEntrySchema.index({ rank: 1 })

module.exports = mongoose.model('LeaderboardEntry', leaderboardEntrySchema)

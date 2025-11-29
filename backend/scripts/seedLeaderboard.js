require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const mongoose = require('mongoose')
const User = require('../models/User')
const LeaderboardEntry = require('../models/LeaderboardEntry')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI)
        console.log('MongoDB connected')
    } catch (error) {
        console.error('MongoDB connection error:', error)
        process.exit(1)
    }
}

const calculateScores = (metrics) => {
    const scores = {
        mentorship: 0,
        engagement: 0,
        achievement: 0,
        contribution: 0
    }

    scores.mentorship = Math.min(30,
        (metrics.mentorshipSessions * 2) +
        (metrics.requestsAccepted * 1.5)
    )

    scores.engagement = Math.min(25,
        (metrics.postsCreated * 2) +
        (metrics.repliesMade * 0.5) +
        (metrics.groupsJoined * 1)
    )

    scores.achievement = Math.min(25,
        (metrics.certificationsEarned * 5) +
        (metrics.promotionsReceived * 3) +
        (metrics.awardsWon * 4)
    )

    scores.contribution = Math.min(20,
        (metrics.eventsAttended * 1.5) +
        (metrics.donationsMade * 2) +
        (metrics.volunteerHours * 0.5)
    )

    scores.total = scores.mentorship + scores.engagement + scores.achievement + scores.contribution

    return scores
}

const seedLeaderboard = async () => {
    try {
        await connectDB()

        console.log('Clearing existing leaderboard entries...')
        await LeaderboardEntry.deleteMany({})

        console.log('Fetching users...')
        const users = await User.find()

        if (users.length === 0) {
            console.log('No users found. Please run seed.js first.')
            process.exit(0)
        }

        console.log(`Creating leaderboard entries for ${users.length} users...`)

        const entries = []

        for (const user of users) {
            // Generate random but realistic metrics
            const metrics = {
                mentorshipSessions: Math.floor(Math.random() * 15),
                requestsAccepted: Math.floor(Math.random() * 20),
                postsCreated: Math.floor(Math.random() * 25),
                repliesMade: Math.floor(Math.random() * 50),
                groupsJoined: Math.floor(Math.random() * 8),
                certificationsEarned: Math.floor(Math.random() * 5),
                promotionsReceived: Math.floor(Math.random() * 3),
                awardsWon: Math.floor(Math.random() * 4),
                eventsAttended: Math.floor(Math.random() * 12),
                donationsMade: Math.floor(Math.random() * 6),
                volunteerHours: Math.floor(Math.random() * 30)
            }

            const scores = calculateScores(metrics)

            const entry = new LeaderboardEntry({
                userId: user._id,
                metrics,
                scores,
                lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random time in last week
            })

            entry.calculateTotalScore()
            entry.assignBadges()

            entries.push(entry)
        }

        // Sort by total score and assign ranks
        entries.sort((a, b) => b.scores.total - a.scores.total)
        entries.forEach((entry, index) => {
            entry.rank = index + 1
            entry.previousRank = index + 1 + Math.floor(Math.random() * 5) - 2 // Random previous rank
        })

        await LeaderboardEntry.insertMany(entries)

        console.log(`✅ Successfully created ${entries.length} leaderboard entries`)

        // Show top 5
        console.log('\n🏆 Top 5 Alumni:')
        for (let i = 0; i < Math.min(5, entries.length); i++) {
            const entry = entries[i]
            const user = await User.findById(entry.userId)
            console.log(`${i + 1}. ${user.name} - Score: ${entry.scores.total.toFixed(1)} - Badges: ${entry.badges.join(', ')}`)
        }

        process.exit(0)
    } catch (error) {
        console.error('Error seeding leaderboard:', error)
        process.exit(1)
    }
}

seedLeaderboard()

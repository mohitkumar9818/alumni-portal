require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const mongoose = require('mongoose')
const User = require('../models/User')
const Event = require('../models/Event')
const LeaderboardEntry = require('../models/LeaderboardEntry')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI)
        console.log('✅ Connected to MongoDB Atlas!')
        console.log('📊 Database:', mongoose.connection.name)
        console.log('')
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message)
        process.exit(1)
    }
}

const viewData = async () => {
    try {
        await connectDB()

        // View Users
        console.log('👥 === USERS ===')
        const users = await User.find().limit(10).select('name email gradYear company location')
        if (users.length === 0) {
            console.log('   No users found. Run seed-database.bat to add sample data.')
        } else {
            users.forEach((user, i) => {
                console.log(`   ${i + 1}. ${user.name}`)
                console.log(`      Email: ${user.email}`)
                console.log(`      Class: ${user.gradYear || 'N/A'}`)
                console.log(`      Company: ${user.company || 'N/A'}`)
                console.log(`      Location: ${user.location || 'N/A'}`)
                console.log('')
            })
        }
        const totalUsers = await User.countDocuments()
        console.log(`   📊 Total Users: ${totalUsers}`)
        console.log('')

        // View Events
        console.log('📅 === EVENTS ===')
        const events = await Event.find().limit(5).select('title date location')
        if (events.length === 0) {
            console.log('   No events found.')
        } else {
            events.forEach((event, i) => {
                console.log(`   ${i + 1}. ${event.title}`)
                console.log(`      Date: ${event.date ? new Date(event.date).toLocaleDateString() : 'N/A'}`)
                console.log(`      Location: ${event.location || 'N/A'}`)
                console.log('')
            })
        }
        const totalEvents = await Event.countDocuments()
        console.log(`   📊 Total Events: ${totalEvents}`)
        console.log('')

        // View Leaderboard
        console.log('🏆 === LEADERBOARD (Top 5) ===')
        const leaderboard = await LeaderboardEntry.find()
            .sort({ 'scores.total': -1 })
            .limit(5)
            .populate('userId', 'name email')

        if (leaderboard.length === 0) {
            console.log('   No leaderboard data found. Run seed-leaderboard.bat to add data.')
        } else {
            leaderboard.forEach((entry, i) => {
                console.log(`   ${i + 1}. ${entry.userId?.name || 'Unknown'}`)
                console.log(`      Total Score: ${entry.scores.total.toFixed(1)}`)
                console.log(`      Badges: ${entry.badges.join(', ') || 'None'}`)
                console.log('')
            })
        }
        const totalLeaderboard = await LeaderboardEntry.countDocuments()
        console.log(`   📊 Total Leaderboard Entries: ${totalLeaderboard}`)
        console.log('')

        // Summary
        console.log('📈 === DATABASE SUMMARY ===')
        console.log(`   Users: ${totalUsers}`)
        console.log(`   Events: ${totalEvents}`)
        console.log(`   Leaderboard Entries: ${totalLeaderboard}`)
        console.log('')

        await mongoose.disconnect()
        console.log('✅ Disconnected from MongoDB')

    } catch (error) {
        console.error('❌ Error viewing data:', error.message)
        process.exit(1)
    }
}

viewData()

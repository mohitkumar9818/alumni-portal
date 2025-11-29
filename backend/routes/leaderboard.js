const express = require('express')
const router = express.Router()
const LeaderboardEntry = require('../models/LeaderboardEntry')
const User = require('../models/User')
const { protect } = require('../middleware/auth')

// Calculate scores for a user based on their activity
const calculateScores = (metrics) => {
    const scores = {
        mentorship: 0,
        engagement: 0,
        achievement: 0,
        contribution: 0
    }

    // Mentorship score (max 30 points)
    scores.mentorship = Math.min(30,
        (metrics.mentorshipSessions * 2) +
        (metrics.requestsAccepted * 1.5)
    )

    // Engagement score (max 25 points)
    scores.engagement = Math.min(25,
        (metrics.postsCreated * 2) +
        (metrics.repliesMade * 0.5) +
        (metrics.groupsJoined * 1)
    )

    // Achievement score (max 25 points)
    scores.achievement = Math.min(25,
        (metrics.certificationsEarned * 5) +
        (metrics.promotionsReceived * 3) +
        (metrics.awardsWon * 4)
    )

    // Contribution score (max 20 points)
    scores.contribution = Math.min(20,
        (metrics.eventsAttended * 1.5) +
        (metrics.donationsMade * 2) +
        (metrics.volunteerHours * 0.5)
    )

    scores.total = scores.mentorship + scores.engagement + scores.achievement + scores.contribution

    return scores
}

// GET /api/leaderboard - Get leaderboard with filters
router.get('/', protect, async (req, res) => {
    try {
        const {
            limit = 10,
            year,
            company,
            domain,
            country,
            city,
            page = 1
        } = req.query

        const limitNum = parseInt(limit)
        const skip = (parseInt(page) - 1) * limitNum

        // Build user filter
        const userFilter = {}
        if (year) userFilter.gradYear = parseInt(year)
        if (company) userFilter.company = new RegExp(company, 'i')
        if (domain) userFilter.skills = new RegExp(domain, 'i')
        if (country) userFilter.location = new RegExp(country, 'i')
        if (city) userFilter.location = new RegExp(city, 'i')

        // Get filtered users
        let userIds = null
        if (Object.keys(userFilter).length > 0) {
            const users = await User.find(userFilter).select('_id')
            userIds = users.map(u => u._id)
        }

        // Build leaderboard query
        const leaderboardFilter = userIds ? { userId: { $in: userIds } } : {}

        // Get leaderboard entries
        const entries = await LeaderboardEntry.find(leaderboardFilter)
            .sort({ 'scores.total': -1, 'lastUpdated': -1 })
            .skip(skip)
            .limit(limitNum)
            .populate('userId', 'name email gradYear company location skills profilePicture')

        // Get total count for pagination
        const total = await LeaderboardEntry.countDocuments(leaderboardFilter)

        // Format response
        const leaderboard = entries.map((entry, index) => ({
            rank: skip + index + 1,
            user: {
                id: entry.userId._id,
                name: entry.userId.name,
                email: entry.userId.email,
                gradYear: entry.userId.gradYear,
                company: entry.userId.company,
                location: entry.userId.location,
                skills: entry.userId.skills,
                profilePicture: entry.userId.profilePicture
            },
            scores: entry.scores,
            badges: entry.badges,
            metrics: entry.metrics,
            rankChange: entry.previousRank ? entry.previousRank - entry.rank : 0
        }))

        res.json({
            success: true,
            data: leaderboard,
            pagination: {
                total,
                page: parseInt(page),
                limit: limitNum,
                pages: Math.ceil(total / limitNum)
            }
        })
    } catch (error) {
        console.error('Leaderboard fetch error:', error)
        res.status(500).json({ error: 'Failed to fetch leaderboard' })
    }
})

// GET /api/leaderboard/summary - Get AI summary
router.get('/summary', protect, async (req, res) => {
    try {
        const now = new Date()
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

        // Get current stats
        const totalEntries = await LeaderboardEntry.countDocuments()
        const recentEntries = await LeaderboardEntry.countDocuments({
            createdAt: { $gte: weekAgo }
        })

        // Calculate average scores
        const avgScores = await LeaderboardEntry.aggregate([
            {
                $group: {
                    _id: null,
                    avgMentorship: { $avg: '$scores.mentorship' },
                    avgEngagement: { $avg: '$scores.engagement' },
                    avgAchievement: { $avg: '$scores.achievement' },
                    avgContribution: { $avg: '$scores.contribution' },
                    avgTotal: { $avg: '$scores.total' }
                }
            }
        ])

        // Get top performers
        const topPerformers = await LeaderboardEntry.find()
            .sort({ 'scores.total': -1 })
            .limit(3)
            .populate('userId', 'name')

        // Calculate week-over-week changes
        const recentActivity = await LeaderboardEntry.aggregate([
            { $match: { lastUpdated: { $gte: weekAgo } } },
            {
                $group: {
                    _id: null,
                    totalMentorshipSessions: { $sum: '$metrics.mentorshipSessions' },
                    totalPosts: { $sum: '$metrics.postsCreated' },
                    totalEvents: { $sum: '$metrics.eventsAttended' }
                }
            }
        ])

        const summary = {
            overview: `This week, ${recentEntries} new alumni joined the leaderboard. ` +
                `Mentorship activity increased with ${recentActivity[0]?.totalMentorshipSessions || 0} sessions completed. ` +
                `Community engagement is strong with ${recentActivity[0]?.totalPosts || 0} new posts and ` +
                `${recentActivity[0]?.totalEvents || 0} events attended.`,
            stats: {
                totalAlumni: totalEntries,
                newThisWeek: recentEntries,
                averageScores: avgScores[0] || {},
                topPerformers: topPerformers.map(p => ({
                    name: p.userId.name,
                    score: p.scores.total
                }))
            },
            trends: {
                mentorshipSessions: recentActivity[0]?.totalMentorshipSessions || 0,
                communityPosts: recentActivity[0]?.totalPosts || 0,
                eventsAttended: recentActivity[0]?.totalEvents || 0
            }
        }

        res.json({ success: true, data: summary })
    } catch (error) {
        console.error('Summary fetch error:', error)
        res.status(500).json({ error: 'Failed to fetch summary' })
    }
})

// GET /api/leaderboard/user/:userId - Get specific user's leaderboard position
router.get('/user/:userId', protect, async (req, res) => {
    try {
        const entry = await LeaderboardEntry.findOne({ userId: req.params.userId })
            .populate('userId', 'name email gradYear company location skills profilePicture')

        if (!entry) {
            return res.status(404).json({ error: 'User not found in leaderboard' })
        }

        // Calculate rank
        const rank = await LeaderboardEntry.countDocuments({
            'scores.total': { $gt: entry.scores.total }
        }) + 1

        res.json({
            success: true,
            data: {
                rank,
                user: entry.userId,
                scores: entry.scores,
                badges: entry.badges,
                metrics: entry.metrics,
                rankChange: entry.previousRank ? entry.previousRank - rank : 0
            }
        })
    } catch (error) {
        console.error('User leaderboard fetch error:', error)
        res.status(500).json({ error: 'Failed to fetch user leaderboard data' })
    }
})

// POST /api/leaderboard/update - Update user's leaderboard entry (admin or system)
router.post('/update/:userId', protect, async (req, res) => {
    try {
        const { metrics } = req.body

        // Find or create entry
        let entry = await LeaderboardEntry.findOne({ userId: req.params.userId })

        if (!entry) {
            entry = new LeaderboardEntry({
                userId: req.params.userId,
                metrics: metrics || {}
            })
        } else {
            // Update metrics
            if (metrics) {
                entry.metrics = { ...entry.metrics, ...metrics }
            }
            entry.previousRank = entry.rank
        }

        // Calculate scores
        entry.scores = calculateScores(entry.metrics)
        entry.calculateTotalScore()
        entry.assignBadges()
        entry.lastUpdated = Date.now()

        await entry.save()

        res.json({ success: true, data: entry })
    } catch (error) {
        console.error('Leaderboard update error:', error)
        res.status(500).json({ error: 'Failed to update leaderboard' })
    }
})

// POST /api/leaderboard/refresh - Recalculate all ranks (admin only)
router.post('/refresh', protect, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Admin access required' })
        }

        // Get all entries sorted by score
        const entries = await LeaderboardEntry.find().sort({ 'scores.total': -1 })

        // Update ranks
        for (let i = 0; i < entries.length; i++) {
            entries[i].previousRank = entries[i].rank
            entries[i].rank = i + 1
            await entries[i].save()
        }

        res.json({
            success: true,
            message: `Refreshed ${entries.length} leaderboard entries`
        })
    } catch (error) {
        console.error('Leaderboard refresh error:', error)
        res.status(500).json({ error: 'Failed to refresh leaderboard' })
    }
})

// GET /api/leaderboard/filters - Get available filter options
router.get('/filters/options', protect, async (req, res) => {
    try {
        const users = await User.find().select('gradYear company location skills')

        const years = [...new Set(users.map(u => u.gradYear).filter(Boolean))].sort()
        const companies = [...new Set(users.map(u => u.company).filter(Boolean))].sort()
        const locations = [...new Set(users.map(u => u.location).filter(Boolean))].sort()
        const skills = [...new Set(users.flatMap(u => u.skills || []))].sort()

        res.json({
            success: true,
            data: {
                years,
                companies,
                locations,
                skills
            }
        })
    } catch (error) {
        console.error('Filter options fetch error:', error)
        res.status(500).json({ error: 'Failed to fetch filter options' })
    }
})

module.exports = router

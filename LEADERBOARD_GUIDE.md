# 🏆 Alumni Leaderboard Module - Complete Guide

## Overview
The Alumni Leaderboard is a comprehensive gamification system that ranks alumni based on their engagement, contributions, and achievements within the portal.

## Features

### 📊 Scoring System

#### Total Impact Score = Mentorship + Engagement + Achievement + Contribution

**1. Mentorship Score (Max 30 points)**
- Mentorship sessions conducted: 2 points each
- Mentorship requests accepted: 1.5 points each

**2. Engagement Score (Max 25 points)**
- Posts created: 2 points each
- Replies made: 0.5 points each
- Groups joined: 1 point each

**3. Achievement Score (Max 25 points)**
- Certifications earned: 5 points each
- Promotions received: 3 points each
- Awards won: 4 points each

**4. Contribution Score (Max 20 points)**
- Events attended: 1.5 points each
- Donations made: 2 points each
- Volunteer hours: 0.5 points per hour

**Maximum Total Score: 100 points**

### 🏅 Badge System

**Rank-Based Badges:**
- 🥇 **Gold** - Rank 1
- 🥈 **Silver** - Rank 2
- 🥉 **Bronze** - Rank 3

**Achievement Badges:**
- 👑 **Elite Mentor** - Total score ≥ 80
- ⭐ **Active Contributor** - Total score ≥ 60
- 🌟 **Rising Star** - Score ≥ 40 with activity in last 7 days
- 🏆 **Community Champion** - Mentorship score ≥ 25
- 🎉 **Event Enthusiast** - Contribution score ≥ 20

### 🔍 Filtering Options

**Filter by:**
- Graduation Year (batch)
- Company
- Domain/Skills
- Country/City

**View Options:**
- Top 10 (default)
- Top 50
- Custom filters

### 🤖 AI Summary

Weekly insights showing:
- Total alumni on leaderboard
- New alumni this week
- Mentorship sessions completed
- Community posts created
- Events attended
- Trend analysis

## API Endpoints

### GET /api/leaderboard
Get leaderboard with optional filters

**Query Parameters:**
```javascript
{
  limit: 10,           // Number of results (10, 50, etc.)
  page: 1,             // Page number for pagination
  year: 2024,          // Filter by graduation year
  company: "Google",   // Filter by company
  domain: "AI",        // Filter by skill/domain
  country: "USA",      // Filter by country
  city: "New York"     // Filter by city
}
```

**Response:**
```javascript
{
  success: true,
  data: [
    {
      rank: 1,
      user: {
        id: "...",
        name: "John Doe",
        email: "john@example.com",
        gradYear: 2020,
        company: "Google",
        location: "San Francisco, USA",
        skills: ["AI", "ML"],
        profilePicture: "..."
      },
      scores: {
        mentorship: 28.5,
        engagement: 22.0,
        achievement: 20.0,
        contribution: 18.5,
        total: 89.0
      },
      badges: ["Gold", "Elite Mentor", "Community Champion"],
      metrics: {
        mentorshipSessions: 12,
        requestsAccepted: 15,
        postsCreated: 20,
        // ... other metrics
      },
      rankChange: 2  // Moved up 2 positions
    }
  ],
  pagination: {
    total: 150,
    page: 1,
    limit: 10,
    pages: 15
  }
}
```

### GET /api/leaderboard/summary
Get AI-generated weekly summary

**Response:**
```javascript
{
  success: true,
  data: {
    overview: "This week, 12 new alumni joined the leaderboard...",
    stats: {
      totalAlumni: 150,
      newThisWeek: 12,
      averageScores: {
        avgMentorship: 15.2,
        avgEngagement: 12.5,
        avgAchievement: 10.8,
        avgContribution: 8.3,
        avgTotal: 46.8
      },
      topPerformers: [
        { name: "John Doe", score: 89.0 },
        { name: "Jane Smith", score: 85.5 },
        { name: "Bob Johnson", score: 82.0 }
      ]
    },
    trends: {
      mentorshipSessions: 45,
      communityPosts: 78,
      eventsAttended: 32
    }
  }
}
```

### GET /api/leaderboard/user/:userId
Get specific user's leaderboard position

### POST /api/leaderboard/update/:userId
Update user's leaderboard metrics (admin/system)

**Request Body:**
```javascript
{
  metrics: {
    mentorshipSessions: 15,
    requestsAccepted: 20,
    postsCreated: 25,
    // ... other metrics
  }
}
```

### POST /api/leaderboard/refresh
Recalculate all ranks (admin only)

### GET /api/leaderboard/filters/options
Get available filter options (years, companies, locations, skills)

## Database Schema

### LeaderboardEntry Model

```javascript
{
  userId: ObjectId,           // Reference to User
  scores: {
    mentorship: Number,       // 0-30
    engagement: Number,       // 0-25
    achievement: Number,      // 0-25
    contribution: Number,     // 0-20
    total: Number            // 0-100
  },
  metrics: {
    mentorshipSessions: Number,
    requestsAccepted: Number,
    postsCreated: Number,
    repliesMade: Number,
    groupsJoined: Number,
    certificationsEarned: Number,
    promotionsReceived: Number,
    awardsWon: Number,
    eventsAttended: Number,
    donationsMade: Number,
    volunteerHours: Number
  },
  badges: [String],           // Array of badge names
  rank: Number,               // Current rank
  previousRank: Number,       // Previous rank for change tracking
  lastUpdated: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Frontend Components

### Leaderboard Page (`frontend/src/pages/Leaderboard.jsx`)

**Features:**
- Responsive leaderboard table
- Real-time filtering
- Pagination
- AI summary card
- Score breakdown visualization
- Badge display
- Rank change indicators

**Component Structure:**
```
Leaderboard
├── Header
├── AI Summary Card
│   ├── Weekly insights
│   └── Statistics
├── Tabs (Top 10 / Top 50 / Filters)
├── Filters Section
│   ├── Year filter
│   ├── Company filter
│   ├── Domain filter
│   └── Location filter
└── Leaderboard Table
    └── Leaderboard Row
        ├── Rank badge
        ├── User info
        ├── Score breakdown
        └── Badges
```

## Setup Instructions

### 1. Backend Setup

The leaderboard routes are already integrated in `backend/server.js`:
```javascript
app.use('/api/leaderboard', require('./routes/leaderboard'))
```

### 2. Frontend Setup

The leaderboard page is already added to the routing in `frontend/src/App.jsx`:
```javascript
<Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
```

### 3. Seed Sample Data

Run the leaderboard seeding script:
```bash
# Windows
seed-leaderboard.bat

# Or manually
cd backend
node scripts/seedLeaderboard.js
```

This will:
- Clear existing leaderboard entries
- Generate realistic metrics for all users
- Calculate scores and assign badges
- Rank all alumni

### 4. Access the Leaderboard

Navigate to: `http://localhost:5173/leaderboard`

Or click the "Leaderboard" menu item in the sidebar (🏆 icon)

## Usage Examples

### Updating User Metrics

When a user completes an action, update their leaderboard:

```javascript
// Example: User completes a mentorship session
const updateMetrics = async (userId) => {
  const entry = await LeaderboardEntry.findOne({ userId })
  
  if (entry) {
    entry.metrics.mentorshipSessions += 1
    entry.scores = calculateScores(entry.metrics)
    entry.calculateTotalScore()
    entry.assignBadges()
    entry.lastUpdated = Date.now()
    await entry.save()
  }
}
```

### Scheduled Rank Refresh

Set up a cron job to refresh ranks weekly:

```javascript
const cron = require('node-cron')

// Run every Sunday at midnight
cron.schedule('0 0 * * 0', async () => {
  const entries = await LeaderboardEntry.find().sort({ 'scores.total': -1 })
  
  for (let i = 0; i < entries.length; i++) {
    entries[i].previousRank = entries[i].rank
    entries[i].rank = i + 1
    await entries[i].save()
  }
  
  console.log('Leaderboard ranks refreshed')
})
```

## Customization

### Adjusting Score Weights

Edit `backend/routes/leaderboard.js` - `calculateScores()` function:

```javascript
// Increase mentorship importance
scores.mentorship = Math.min(40,  // Changed from 30
    (metrics.mentorshipSessions * 3) +  // Changed from 2
    (metrics.requestsAccepted * 2)      // Changed from 1.5
)
```

### Adding New Badges

Edit `backend/models/LeaderboardEntry.js` - `assignBadges()` method:

```javascript
// Add new badge
if (this.metrics.donationsMade >= 10) {
    badges.push('Generous Donor')
}
```

Update the enum in the schema:
```javascript
badges: [{
    type: String,
    enum: [...existingBadges, 'Generous Donor']
}]
```

### Customizing UI Colors

Edit `frontend/src/pages/Leaderboard.css`:

```css
/* Change elite score color */
.score-circle.elite {
    background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}
```

## Mobile Responsiveness

The leaderboard is fully responsive with breakpoints at:
- 1024px - Tablet layout
- 768px - Mobile layout
- 480px - Small mobile layout

## Performance Optimization

### Indexes
The LeaderboardEntry model has indexes on:
- `scores.total` (descending) - Fast sorting
- `userId` - Fast user lookups
- `rank` - Fast rank queries

### Pagination
Use pagination for large datasets:
```javascript
const { limit = 10, page = 1 } = req.query
const skip = (page - 1) * limit
```

### Caching
Consider implementing Redis caching for:
- Top 10 leaderboard (cache for 5 minutes)
- Filter options (cache for 1 hour)
- User rankings (cache for 10 minutes)

## Testing

### Manual Testing Checklist
- [ ] View Top 10 leaderboard
- [ ] View Top 50 leaderboard
- [ ] Filter by graduation year
- [ ] Filter by company
- [ ] Filter by domain/skill
- [ ] Filter by location
- [ ] Clear all filters
- [ ] Check pagination
- [ ] Verify AI summary displays
- [ ] Check rank badges (Gold, Silver, Bronze)
- [ ] Verify achievement badges
- [ ] Test mobile responsiveness
- [ ] Check dark mode compatibility

### API Testing with Postman

Import the Postman collection and test:
1. GET /api/leaderboard
2. GET /api/leaderboard/summary
3. GET /api/leaderboard/user/:userId
4. POST /api/leaderboard/update/:userId
5. GET /api/leaderboard/filters/options

## Troubleshooting

### Issue: Leaderboard is empty
**Solution:** Run `seed-leaderboard.bat` to populate sample data

### Issue: Scores not updating
**Solution:** Check that metrics are being updated correctly and `calculateTotalScore()` is called

### Issue: Badges not showing
**Solution:** Verify `assignBadges()` is called after score updates

### Issue: Filters not working
**Solution:** Check that User model has the required fields (gradYear, company, location, skills)

## Future Enhancements

- [ ] Real-time leaderboard updates with WebSockets
- [ ] Historical rank tracking and charts
- [ ] Team/company leaderboards
- [ ] Monthly/yearly leaderboard archives
- [ ] Leaderboard achievements and milestones
- [ ] Social sharing of leaderboard position
- [ ] Leaderboard notifications
- [ ] Custom leaderboard categories
- [ ] Export leaderboard data

## Support

For issues or questions:
1. Check this guide
2. Review the code comments
3. Check the console for errors
4. Verify database connection
5. Ensure all dependencies are installed

## Files Created

**Backend:**
- `backend/models/LeaderboardEntry.js` - Database model
- `backend/routes/leaderboard.js` - API routes
- `backend/scripts/seedLeaderboard.js` - Seeding script

**Frontend:**
- `frontend/src/pages/Leaderboard.jsx` - Main component
- `frontend/src/pages/Leaderboard.css` - Styles

**Scripts:**
- `seed-leaderboard.bat` - Windows batch file for seeding

**Documentation:**
- `LEADERBOARD_GUIDE.md` - This file

## Summary

The Alumni Leaderboard module is now fully integrated into your Alumni Portal with:
✅ Complete scoring system (100-point scale)
✅ 8 different badge types
✅ Multiple filtering options
✅ AI-powered weekly summaries
✅ Mobile-responsive design
✅ Dark mode support
✅ Pagination for large datasets
✅ Real-time rank change tracking
✅ Comprehensive API endpoints
✅ Sample data seeding

The leaderboard is ready to use and can be accessed from the sidebar navigation!

# 🏆 Alumni Leaderboard - Visual Structure

## Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│  🏆 Alumni Leaderboard                                      │
│  Celebrating our most active and impactful alumni           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  🤖 Weekly Insights                                         │
│  This week, mentorship activity increased by 32%...         │
│  ┌──────────┬──────────┬──────────┬──────────┐            │
│  │   150    │    12    │    45    │    78    │            │
│  │  Total   │   New    │ Sessions │  Posts   │            │
│  └──────────┴──────────┴──────────┴──────────┘            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  [Top 10]  [Top 50]  [Filters]                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Rank  │  User Info          │  Scores        │  Badges    │
├────────┼─────────────────────┼────────────────┼────────────┤
│  🥇    │  👤 John Doe        │  ⭕ 89.0      │  👑 ⭐ 🏆 │
│   1    │  Google             │  🎓 28.5      │            │
│  ↑ 2   │  Class of 2020      │  💬 22.0      │            │
│        │  San Francisco      │  🏆 20.0      │            │
│        │                     │  🤝 18.5      │            │
├────────┼─────────────────────┼────────────────┼────────────┤
│  🥈    │  👤 Jane Smith      │  ⭕ 85.5      │  👑 ⭐    │
│   2    │  Microsoft          │  🎓 26.0      │            │
│  ↓ 1   │  Class of 2019      │  💬 24.0      │            │
│        │  Seattle            │  🏆 18.5      │            │
│        │                     │  🤝 17.0      │            │
├────────┼─────────────────────┼────────────────┼────────────┤
│  🥉    │  👤 Bob Johnson     │  ⭕ 82.0      │  👑 🏆    │
│   3    │  Amazon             │  🎓 25.0      │            │
│   →    │  Class of 2021      │  💬 21.0      │            │
│        │  New York           │  🏆 19.0      │            │
│        │                     │  🤝 17.0      │            │
└────────┴─────────────────────┴────────────────┴────────────┘

┌─────────────────────────────────────────────────────────────┐
│  [Previous]  Page 1 of 15  [Next]                          │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
Leaderboard Page
│
├── Header Section
│   ├── Title: "🏆 Alumni Leaderboard"
│   └── Subtitle: "Celebrating our most active..."
│
├── AI Summary Card
│   ├── Icon: 🤖
│   ├── Title: "Weekly Insights"
│   ├── Overview Text
│   └── Statistics Grid
│       ├── Total Alumni
│       ├── New This Week
│       ├── Mentorship Sessions
│       └── Community Posts
│
├── Tab Navigation
│   ├── Top 10 Tab
│   ├── Top 50 Tab
│   └── Filters Tab
│
├── Filters Section (when Filters tab active)
│   ├── Graduation Year Dropdown
│   ├── Company Dropdown
│   ├── Domain/Skill Dropdown
│   ├── Location Dropdown
│   └── Clear Filters Button
│
├── Leaderboard Table
│   └── Leaderboard Row (repeated)
│       ├── Rank Section
│       │   ├── Rank Badge (🥇/🥈/🥉/number)
│       │   └── Rank Change (↑/↓)
│       │
│       ├── User Section
│       │   ├── Avatar/Initial
│       │   ├── Name
│       │   ├── Company
│       │   ├── Graduation Year
│       │   └── Location
│       │
│       ├── Scores Section
│       │   ├── Total Score Circle
│       │   └── Score Breakdown
│       │       ├── 🎓 Mentorship
│       │       ├── 💬 Engagement
│       │       ├── 🏆 Achievement
│       │       └── 🤝 Contribution
│       │
│       └── Badges Section
│           ├── 👑 Elite Mentor
│           ├── ⭐ Active Contributor
│           ├── 🌟 Rising Star
│           ├── 🏆 Community Champion
│           └── 🎉 Event Enthusiast
│
└── Pagination
    ├── Previous Button
    ├── Page Indicator
    └── Next Button
```

## Data Flow

```
User Action
    ↓
Frontend Component (Leaderboard.jsx)
    ↓
API Service (api.js)
    ↓
HTTP Request
    ↓
Backend Route (leaderboard.js)
    ↓
Database Query (MongoDB)
    ↓
LeaderboardEntry Model
    ↓
Response Data
    ↓
Frontend State Update
    ↓
UI Re-render
```

## Score Calculation Flow

```
User Activity
    ↓
Metrics Updated
    ├── mentorshipSessions
    ├── requestsAccepted
    ├── postsCreated
    ├── repliesMade
    ├── groupsJoined
    ├── certificationsEarned
    ├── promotionsReceived
    ├── awardsWon
    ├── eventsAttended
    ├── donationsMade
    └── volunteerHours
    ↓
Calculate Scores
    ├── Mentorship Score (0-30)
    ├── Engagement Score (0-25)
    ├── Achievement Score (0-25)
    └── Contribution Score (0-20)
    ↓
Total Score (0-100)
    ↓
Assign Badges
    ├── Rank Badges (Gold/Silver/Bronze)
    └── Achievement Badges
    ↓
Update Rank
    ↓
Save to Database
```

## Badge Assignment Logic

```
Total Score >= 80
    → 👑 Elite Mentor

Total Score >= 60
    → ⭐ Active Contributor

Total Score >= 40 AND Active in Last 7 Days
    → 🌟 Rising Star

Mentorship Score >= 25
    → 🏆 Community Champion

Contribution Score >= 20
    → 🎉 Event Enthusiast

Rank = 1
    → 🥇 Gold

Rank = 2
    → 🥈 Silver

Rank = 3
    → 🥉 Bronze
```

## Filter Logic

```
User Selects Filters
    ↓
Build User Filter Object
    ├── gradYear: 2020
    ├── company: "Google"
    ├── skills: "AI"
    └── location: "USA"
    ↓
Query Users Collection
    ↓
Get Matching User IDs
    ↓
Query Leaderboard Collection
    ├── Filter by User IDs
    ├── Sort by Total Score
    └── Apply Pagination
    ↓
Return Filtered Results
```

## Responsive Breakpoints

```
Desktop (1400px+)
├── Full 4-column layout
├── All details visible
└── Large score circles

Tablet (768px - 1024px)
├── 2-column layout
├── Scores move to new row
└── Medium score circles

Mobile (480px - 768px)
├── Single column
├── Stacked layout
└── Small score circles

Small Mobile (<480px)
├── Compact layout
├── Minimal spacing
└── Essential info only
```

## Color Coding

```
Score Circles:
├── Elite (80-100)   → Purple gradient
├── High (60-79)     → Indigo gradient
├── Medium (40-59)   → Blue gradient
└── Low (0-39)       → Gray gradient

Rank Badges:
├── Gold (#1)        → Gold gradient
├── Silver (#2)      → Silver gradient
├── Bronze (#3)      → Bronze gradient
└── Default (4+)     → Primary color

Rank Changes:
├── Up (↑)           → Green background
├── Down (↓)         → Red background
└── No change (→)    → No indicator
```

## API Endpoint Structure

```
/api/leaderboard
├── GET /
│   ├── Query: limit, page, year, company, domain, country, city
│   └── Returns: Ranked alumni with pagination
│
├── GET /summary
│   └── Returns: AI-generated weekly insights
│
├── GET /user/:userId
│   └── Returns: Specific user's rank and scores
│
├── POST /update/:userId
│   ├── Body: { metrics }
│   └── Returns: Updated leaderboard entry
│
├── POST /refresh
│   └── Returns: Recalculated ranks (admin only)
│
└── GET /filters/options
    └── Returns: Available filter options
```

## Database Schema

```
LeaderboardEntry
├── userId (ObjectId) → References User
├── scores
│   ├── mentorship (Number 0-30)
│   ├── engagement (Number 0-25)
│   ├── achievement (Number 0-25)
│   ├── contribution (Number 0-20)
│   └── total (Number 0-100)
├── metrics
│   ├── mentorshipSessions
│   ├── requestsAccepted
│   ├── postsCreated
│   ├── repliesMade
│   ├── groupsJoined
│   ├── certificationsEarned
│   ├── promotionsReceived
│   ├── awardsWon
│   ├── eventsAttended
│   ├── donationsMade
│   └── volunteerHours
├── badges [Array of Strings]
├── rank (Number)
├── previousRank (Number)
├── lastUpdated (Date)
├── createdAt (Date)
└── updatedAt (Date)
```

This visual structure guide helps understand how all the pieces fit together! 🎯

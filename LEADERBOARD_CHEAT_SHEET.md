# 🏆 Alumni Leaderboard - Cheat Sheet

## Quick Access
**URL:** `http://localhost:5173/leaderboard`  
**Sidebar:** Click 🏆 Leaderboard

---

## Scoring (Max 100 points)

| Category | Max | Calculation |
|----------|-----|-------------|
| 🎓 Mentorship | 30 | Sessions×2 + Requests×1.5 |
| 💬 Engagement | 25 | Posts×2 + Replies×0.5 + Groups×1 |
| 🏆 Achievement | 25 | Certs×5 + Promotions×3 + Awards×4 |
| 🤝 Contribution | 20 | Events×1.5 + Donations×2 + Hours×0.5 |

---

## Badges

| Badge | Requirement |
|-------|-------------|
| 🥇 Gold | Rank #1 |
| 🥈 Silver | Rank #2 |
| 🥉 Bronze | Rank #3 |
| 👑 Elite Mentor | Score ≥ 80 |
| ⭐ Active Contributor | Score ≥ 60 |
| 🌟 Rising Star | Score ≥ 40 + Active (7 days) |
| 🏆 Community Champion | Mentorship ≥ 25 |
| 🎉 Event Enthusiast | Contribution ≥ 20 |

---

## API Endpoints

```bash
# Get leaderboard
GET /api/leaderboard?limit=10&page=1

# Get summary
GET /api/leaderboard/summary

# Get user rank
GET /api/leaderboard/user/:userId

# Update metrics (admin)
POST /api/leaderboard/update/:userId

# Refresh ranks (admin)
POST /api/leaderboard/refresh

# Get filter options
GET /api/leaderboard/filters/options
```

---

## Filters

- **Year:** Graduation year (2020, 2021, etc.)
- **Company:** Current company
- **Domain:** Skills/expertise
- **Location:** Country or city

---

## Setup Commands

```bash
# Seed sample data
seed-leaderboard.bat

# Or manually
cd backend
node scripts/seedLeaderboard.js
```

---

## Files

**Backend:**
- `backend/models/LeaderboardEntry.js`
- `backend/routes/leaderboard.js`
- `backend/scripts/seedLeaderboard.js`

**Frontend:**
- `frontend/src/pages/Leaderboard.jsx`
- `frontend/src/pages/Leaderboard.css`

**Docs:**
- `LEADERBOARD_GUIDE.md` (detailed)
- `LEADERBOARD_QUICK_START.md` (setup)
- `LEADERBOARD_STRUCTURE.md` (visual)
- `LEADERBOARD_CHEAT_SHEET.md` (this file)

---

## Common Tasks

### Update User Metrics
```javascript
await updateLeaderboard(userId, {
  mentorshipSessions: 15,
  postsCreated: 20,
  eventsAttended: 8
})
```

### Get Top 10
```javascript
const response = await getLeaderboard({ limit: 10 })
```

### Filter by Year
```javascript
const response = await getLeaderboard({ 
  limit: 50, 
  year: 2020 
})
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Empty leaderboard | Run `seed-leaderboard.bat` |
| 404 error | Check backend is running on port 5000 |
| No data showing | Verify MongoDB connection |
| Filters not working | Check User model has required fields |

---

## Quick Stats

- **Total Endpoints:** 7
- **Badge Types:** 8
- **Filter Options:** 4
- **Max Score:** 100
- **Score Categories:** 4
- **Responsive Breakpoints:** 4

---

**Need more info?** See `LEADERBOARD_GUIDE.md`

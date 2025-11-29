# 👥 Add People to Leaderboard

## 🚀 Quick Start (Easiest Way)

### Option 1: Run the Seeding Script

**Just double-click this file:**
```
seed-all-data.bat
```

This will:
1. ✅ Add 25 sample users
2. ✅ Add 10 sample events
3. ✅ Add 15 sample jobs
4. ✅ Create leaderboard entries for all users
5. ✅ Rank them automatically

**Done!** Your leaderboard will have 25 people ranked by their scores! 🎉

---

## 📊 What Gets Added

### Sample Alumni (25 People):

**Top 5 Will Be:**
1. 🥇 **Rank 1** - Highest scorer (~85-95 points)
2. 🥈 **Rank 2** - Second highest (~80-90 points)
3. 🥉 **Rank 3** - Third highest (~75-85 points)
4. **Rank 4** - (~70-80 points)
5. **Rank 5** - (~65-75 points)

Each person gets:
- Random but realistic scores
- Appropriate badges (Gold, Silver, Bronze, Elite Mentor, etc.)
- Metrics (mentorship sessions, posts, events attended, etc.)
- Proper ranking

---

## 🎯 View the Leaderboard

After seeding, visit:
```
http://localhost:5174/leaderboard
```

Or on the dashboard:
```
http://localhost:5174/
```
(Scroll down to see Top 5 carousel)

---

## 🔧 Manual Method (Add Specific People)

If you want to add specific people with custom data:

### Step 1: Create a User

Use the registration page or API:
```javascript
POST http://localhost:5000/api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "gradYear": 2020,
  "company": "Google",
  "location": "San Francisco, CA",
  "skills": ["JavaScript", "React", "Node.js"]
}
```

### Step 2: Add to Leaderboard

Use the API:
```javascript
POST http://localhost:5000/api/leaderboard/update/USER_ID
Headers: Authorization: Bearer YOUR_JWT_TOKEN
{
  "metrics": {
    "mentorshipSessions": 15,
    "requestsAccepted": 20,
    "postsCreated": 25,
    "repliesMade": 50,
    "groupsJoined": 8,
    "certificationsEarned": 3,
    "promotionsReceived": 2,
    "awardsWon": 1,
    "eventsAttended": 12,
    "donationsMade": 5,
    "volunteerHours": 30
  }
}
```

The system will automatically:
- Calculate scores
- Assign badges
- Update rankings

---

## 📈 Score Calculation

Scores are calculated automatically:

**Mentorship Score (0-30 points)**
- Mentorship sessions × 2
- Requests accepted × 1.5

**Engagement Score (0-25 points)**
- Posts created × 2
- Replies made × 0.5
- Groups joined × 1

**Achievement Score (0-25 points)**
- Certifications × 5
- Promotions × 3
- Awards × 4

**Contribution Score (0-20 points)**
- Events attended × 1.5
- Donations made × 2
- Volunteer hours × 0.5

**Total Score = Sum of all (Max 100 points)**

---

## 🏅 Badge Assignment

Badges are assigned automatically based on scores:

**Rank Badges:**
- 🥇 Gold - Rank #1
- 🥈 Silver - Rank #2
- 🥉 Bronze - Rank #3

**Achievement Badges:**
- 👑 Elite Mentor - Total score ≥ 80
- ⭐ Active Contributor - Total score ≥ 60
- 🌟 Rising Star - Score ≥ 40 + active in last 7 days
- 🏆 Community Champion - Mentorship score ≥ 25
- 🎉 Event Enthusiast - Contribution score ≥ 20

---

## 🔄 Refresh Rankings

After adding people, refresh rankings:

### Option 1: Automatic
Rankings update automatically when you add/update entries

### Option 2: Manual Refresh
```javascript
POST http://localhost:5000/api/leaderboard/refresh
Headers: Authorization: Bearer ADMIN_JWT_TOKEN
```

---

## 📊 Example: Add Top 10 Alumni

Here's what the seeding script creates:

```javascript
// Example data for top performers
[
  {
    name: "Sarah Chen",
    company: "Google",
    gradYear: 2019,
    totalScore: 89.5,
    badges: ["Gold", "Elite Mentor", "Community Champion"]
  },
  {
    name: "Michael Rodriguez",
    company: "Microsoft",
    gradYear: 2020,
    totalScore: 85.0,
    badges: ["Silver", "Elite Mentor"]
  },
  {
    name: "Emily Johnson",
    company: "Amazon",
    gradYear: 2018,
    totalScore: 82.5,
    badges: ["Bronze", "Elite Mentor"]
  },
  // ... 22 more alumni
]
```

---

## 🎯 Quick Commands

### Seed Everything
```bash
seed-all-data.bat
```

### Seed Only Leaderboard
```bash
seed-leaderboard.bat
```

### View Current Data
```bash
view-database-data.bat
```

### Clear and Reseed
```bash
# No automated script yet
# Manually delete from MongoDB Atlas
# Then run seed-all-data.bat
```

---

## 🔍 Verify Data

### Check in Browser
1. Go to http://localhost:5174/leaderboard
2. You should see 25 alumni ranked
3. Top 5 have Gold/Silver/Bronze badges

### Check in Database
1. Run: `view-database-data.bat`
2. See leaderboard entries with scores

### Check via API
```bash
GET http://localhost:5000/api/leaderboard?limit=10
```

---

## 🐛 Troubleshooting

### No users showing?
**Solution**: Run `seed-all-data.bat` to add sample users first

### Leaderboard is empty?
**Solution**: 
1. Make sure users exist
2. Run `seed-leaderboard.bat`

### Rankings not updating?
**Solution**: 
1. Check backend is running
2. Refresh the page
3. Check browser console for errors

### Want to reset data?
**Solution**:
1. Go to MongoDB Atlas
2. Delete all documents in `leaderboardentries` collection
3. Run `seed-leaderboard.bat` again

---

## 📝 Custom Data Template

Want to add your own people? Use this template:

```javascript
// backend/scripts/customSeed.js
const users = [
  {
    name: "Your Name",
    email: "your@email.com",
    gradYear: 2020,
    company: "Your Company",
    metrics: {
      mentorshipSessions: 20,  // Adjust these
      requestsAccepted: 25,
      postsCreated: 30,
      // ... other metrics
    }
  },
  // Add more people...
];
```

Then run:
```bash
node backend/scripts/customSeed.js
```

---

## ✅ Summary

**Easiest Way:**
1. Double-click `seed-all-data.bat`
2. Wait 10 seconds
3. Visit http://localhost:5174/leaderboard
4. See 25 ranked alumni! 🎉

**What You Get:**
- ✅ 25 alumni with realistic data
- ✅ Proper rankings (1-25)
- ✅ Badges assigned
- ✅ Scores calculated
- ✅ Ready to view!

---

**Ready to add people?** Just run `seed-all-data.bat`! 🚀

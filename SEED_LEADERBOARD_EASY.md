# 🚀 Easy Way to Seed Leaderboard

## ✅ Method 1: PowerShell (Most Reliable)

### Right-click on this file and select "Run with PowerShell":
```
seed-all-data.ps1
```

**That's it!** This will add 25 ranked people to your leaderboard! 🎉

---

## ✅ Method 2: Command Prompt (Manual)

### Open Command Prompt and run these commands:

```cmd
cd C:\Users\manit\OneDrive\Desktop\AI_ALUMINI_PORTAL\backend
node scripts\seed.js
node scripts\seedLeaderboard.js
```

**Done!** 25 people added with rankings! ✅

---

## ✅ Method 3: Batch File (If Working)

### Double-click this file:
```
seed-all-data.bat
```

---

## 🎯 What Gets Added

After running any method above, you'll have:

**25 Alumni with:**
- ✅ Names, emails, companies
- ✅ Graduation years
- ✅ Scores (0-100 points)
- ✅ Rankings (1-25)
- ✅ Badges (Gold, Silver, Bronze, etc.)

**Top 5 Example:**
1. 🥇 Rank 1 - ~89 points - Gold + Elite Mentor
2. 🥈 Rank 2 - ~85 points - Silver + Elite Mentor
3. 🥉 Rank 3 - ~82 points - Bronze + Elite Mentor
4. Rank 4 - ~78 points - Active Contributor
5. Rank 5 - ~75 points - Active Contributor

---

## 📊 View the Results

### Option 1: Leaderboard Page
```
http://localhost:5174/leaderboard
```

### Option 2: Dashboard (Top 5)
```
http://localhost:5174/
```
(Scroll down to see the carousel)

### Option 3: View in Terminal
Run:
```cmd
cd C:\Users\manit\OneDrive\Desktop\AI_ALUMINI_PORTAL\backend
node scripts\viewData.js
```

---

## 🐛 If You Get Errors

### Error: "node is not recognized"
**Fix**: Make sure Node.js is installed
```cmd
node --version
```
If not installed: https://nodejs.org/

### Error: "Cannot find module"
**Fix**: Install dependencies
```cmd
cd C:\Users\manit\OneDrive\Desktop\AI_ALUMINI_PORTAL\backend
npm install
```

### Error: "MongoDB connection failed"
**Fix**: Check backend/.env file has correct MONGO_URI

### Error: "Path not found"
**Fix**: Make sure you're in the right directory
```cmd
cd C:\Users\manit\OneDrive\Desktop\AI_ALUMINI_PORTAL
```

---

## ✅ Verify It Worked

### Check 1: Terminal Output
You should see:
```
✅ Successfully created 25 leaderboard entries
🏆 Top 5 Alumni:
1. [Name] - Score: 89.0 - Badges: Gold, Elite Mentor
2. [Name] - Score: 85.5 - Badges: Silver, Elite Mentor
...
```

### Check 2: Browser
Visit http://localhost:5174/leaderboard
- You should see 25 people
- Top 3 have Gold/Silver/Bronze badges
- Scores are displayed

### Check 3: Dashboard
Visit http://localhost:5174/
- Scroll down to "Top Alumni"
- See carousel with top 5
- Click on cards to see profiles

---

## 🎯 Quick Summary

**Easiest Method:**
1. Right-click `seed-all-data.ps1`
2. Select "Run with PowerShell"
3. Wait 10 seconds
4. Visit http://localhost:5174/leaderboard
5. See 25 ranked people! 🎉

**Manual Method:**
```cmd
cd C:\Users\manit\OneDrive\Desktop\AI_ALUMINI_PORTAL\backend
node scripts\seed.js
node scripts\seedLeaderboard.js
```

**Both work perfectly!** Choose whichever is easier for you! 😊

---

## 📝 Files Available

- **seed-all-data.ps1** - PowerShell script (recommended)
- **seed-all-data.bat** - Batch file
- **test-scripts.bat** - Test if everything is set up correctly
- **FIX_BATCH_FILES.md** - Troubleshooting guide

---

**Ready?** Just run the PowerShell script and you're done! 🚀

# 🔧 Fix "Failed to Load" Errors

## ❌ Problem

You're seeing "Failed to load directories" on Events, Mentors, Jobs pages because:
- **Backend is NOT running** on port 5000
- Port 5000 is being used by another process

---

## ✅ Solution: Kill the Process on Port 5000

### Step 1: Find What's Using Port 5000

Open **Command Prompt as Administrator** and run:

```cmd
netstat -ano | findstr :5000
```

You'll see something like:
```
TCP    0.0.0.0:5000    0.0.0.0:0    LISTENING    12345
```

The last number (12345) is the Process ID (PID).

### Step 2: Kill That Process

```cmd
taskkill /PID 12345 /F
```

Replace `12345` with the actual PID from step 1.

### Step 3: Start Backend

```cmd
cd /d "C:\Users\manit\OneDrive\Desktop\AI_ALUMINI_PORTAL"
start-backend.bat
```

---

## ✅ Alternative: Use Different Port

If you can't kill the process, change the backend port:

### Edit backend/.env:

```env
PORT=5001
```

### Update frontend API URL:

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5001
```

### Restart Both:
```cmd
# Stop frontend (Ctrl+C)
# Stop backend (Ctrl+C)

# Start backend
start-backend.bat

# Start frontend  
start-frontend.bat
```

---

## ✅ Quick Fix (Easiest)

### Just restart your computer! 🔄

This will:
- Kill all processes
- Free up port 5000
- Give you a fresh start

Then run:
```cmd
start-backend.bat
start-frontend.bat
```

---

## 🔍 Verify Backend is Running

### Check 1: Visit Health Endpoint
```
http://localhost:5000/health
```

Should show:
```json
{"status":"ok","timestamp":"..."}
```

### Check 2: Check Console
Backend console should show:
```
Server running on port 5000
MongoDB Connected: ...
```

### Check 3: Test API
```
http://localhost:5000/api/events
```

Should return events data (or empty array if no data).

---

## 🎯 Complete Fix Steps

### 1. Kill Process on Port 5000

**Open Command Prompt as Administrator:**

```cmd
netstat -ano | findstr :5000
taskkill /PID [THE_PID_NUMBER] /F
```

### 2. Start Backend

```cmd
cd /d "C:\Users\manit\OneDrive\Desktop\AI_ALUMINI_PORTAL"
start-backend.bat
```

### 3. Verify Backend Running

Visit: http://localhost:5000/health

### 4. Seed Data

```cmd
cd /d "C:\Users\manit\OneDrive\Desktop\AI_ALUMINI_PORTAL\backend"
node scripts\seed.js
node scripts\seedLeaderboard.js
```

### 5. Refresh Browser

Visit: http://localhost:5174/

**All pages should work now!** ✅

---

## 📊 What Should Work After Fix

- ✅ Dashboard loads
- ✅ Events page shows events
- ✅ Mentors page shows mentors
- ✅ Jobs page shows jobs
- ✅ Directory shows alumni
- ✅ Leaderboard shows rankings
- ✅ AI chat responds

---

## 🐛 Still Having Issues?

### Check Backend Logs

Look at the backend console for errors:
- MongoDB connection errors?
- Missing environment variables?
- Module not found errors?

### Check Frontend Console

Press F12 in browser:
- Network tab: Are API calls failing?
- Console tab: Any JavaScript errors?

### Check MongoDB Connection

Make sure MongoDB Atlas is accessible:
```cmd
cd backend
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGO_URI).then(() => console.log('✅ Connected!')).catch(err => console.error('❌ Error:', err.message));"
```

---

## ✅ Summary

**The problem**: Backend not running on port 5000

**The fix**:
1. Kill process on port 5000
2. Start backend
3. Seed data
4. Refresh browser

**Quick command**:
```cmd
netstat -ano | findstr :5000
taskkill /PID [PID] /F
start-backend.bat
```

**Then everything will work!** 🚀

---

**Need more help?** Let me know the exact error message! 😊

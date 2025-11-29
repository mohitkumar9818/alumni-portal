# Fix "Failed to Load" Errors - Events, Jobs, Mentors

## Problem
When you visit the Events, Jobs, or Mentors pages, you see "Failed to load events/jobs/mentors" error messages.

## Root Causes
1. **Backend server is not running** (most common)
2. **Database has no data** (nothing to display)
3. **Backend port conflict** (server crashed)
4. **CORS or connection issues**

---

## Quick Fix Steps

### Step 1: Check if Backend is Running

Open a new terminal and run:
```bash
curl http://localhost:5000/health
```

**If you get an error** → Backend is NOT running. Go to Step 2.
**If you get `{"status":"ok",...}`** → Backend IS running. Go to Step 3.

---

### Step 2: Start the Backend

Run this command:
```bash
start-backend.bat
```

Wait 5-10 seconds for it to start, then check again:
```bash
curl http://localhost:5000/health
```

**If it still fails**, you might have a port conflict. See the troubleshooting section below.

---

### Step 3: Seed the Database

The database needs data! Run:
```bash
seed-all-data.bat
```

This will populate:
- ✅ Users (including mentors)
- ✅ Events
- ✅ Jobs
- ✅ Leaderboard data

Wait for it to complete (should take 10-20 seconds).

---

### Step 4: Refresh Your Browser

1. Go back to your browser
2. Press `Ctrl + Shift + R` (hard refresh)
3. Navigate to Events, Jobs, or Mentors pages
4. Data should now load! 🎉

---

## Troubleshooting

### Backend Won't Start (Port 5000 in use)

If you see `EADDRINUSE` error:

1. Kill the process on port 5000:
```bash
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

2. Start backend again:
```bash
start-backend.bat
```

### Database Connection Failed

Check your `.env` file in the `backend` folder:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Make sure your MongoDB Atlas cluster is:
- ✅ Running (not paused)
- ✅ Allows connections from your IP (0.0.0.0/0 for testing)
- ✅ Has correct username/password

### Still Getting Errors?

Check the browser console (F12) for specific error messages:
- `Network Error` → Backend not running
- `401 Unauthorized` → Login again
- `404 Not Found` → Route issue (check backend logs)
- `500 Server Error` → Database issue (check backend logs)

---

## Verify Everything Works

Run this command to test all endpoints:
```bash
test-scripts.bat
```

This will check:
- ✅ Backend health
- ✅ Events endpoint
- ✅ Jobs endpoint
- ✅ Directory endpoint (mentors)

---

## Quick Reference

| Issue | Command |
|-------|---------|
| Start backend | `start-backend.bat` |
| Seed database | `seed-all-data.bat` |
| Check backend | `curl http://localhost:5000/health` |
| View data | `view-database-data.bat` |
| Kill port 5000 | `netstat -ano \| findstr :5000` then `taskkill /PID <PID> /F` |

---

## Prevention

To avoid this in the future:
1. Always start backend before using the app
2. Keep backend running while using the app
3. Seed database at least once after setup
4. Check backend logs if issues occur

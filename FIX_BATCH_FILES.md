# 🔧 Fix Batch File Errors

## ❌ Common Error

If you see errors like:
- "The system cannot find the path specified"
- "node is not recognized"
- "scripts\viewData.js not found"

**Don't worry!** Here's how to fix it:

---

## ✅ Solution 1: Run from Project Root

### Make sure you're in the right directory:

1. **Open Command Prompt**
2. **Navigate to your project folder**:
   ```cmd
   cd C:\Users\manit\OneDrive\Desktop\AI_ALUMINI_PORTAL
   ```
3. **Then run the batch file**:
   ```cmd
   view-database-data.bat
   ```

---

## ✅ Solution 2: Double-Click the File

### From File Explorer:

1. **Open File Explorer**
2. **Navigate to**: `C:\Users\manit\OneDrive\Desktop\AI_ALUMINI_PORTAL`
3. **Double-click**: `view-database-data.bat`

**This should work!** The batch file will automatically find the correct directory.

---

## ✅ Solution 3: Test Your Setup

Run this test script first:
```cmd
test-scripts.bat
```

This will show you:
- Current directory
- If scripts are found
- What's wrong

---

## 🔧 Manual Method (If Batch Files Don't Work)

### View Database Data Manually:

```cmd
cd C:\Users\manit\OneDrive\Desktop\AI_ALUMINI_PORTAL\backend
node scripts\viewData.js
```

### Seed All Data Manually:

```cmd
cd C:\Users\manit\OneDrive\Desktop\AI_ALUMINI_PORTAL\backend
node scripts\seed.js
node scripts\seedLeaderboard.js
```

---

## 🐛 Troubleshooting

### Error: "node is not recognized"
**Solution**: Node.js is not installed or not in PATH
```cmd
# Check if Node.js is installed:
node --version

# If not installed, download from: https://nodejs.org/
```

### Error: "Cannot find module"
**Solution**: Dependencies not installed
```cmd
cd backend
npm install
```

### Error: "MongoDB connection failed"
**Solution**: Check your .env file
```cmd
# Make sure backend/.env has:
MONGO_URI=your_mongodb_connection_string
```

### Error: "The system cannot find the path"
**Solution**: Run from project root directory
```cmd
cd C:\Users\manit\OneDrive\Desktop\AI_ALUMINI_PORTAL
view-database-data.bat
```

---

## ✅ Fixed Batch Files

I've updated these files to work correctly:

1. **view-database-data.bat** - Now uses `cd /d "%~dp0backend"`
2. **seed-all-data.bat** - Already correct
3. **seed-leaderboard.bat** - Already correct

These should work when double-clicked from File Explorer!

---

## 🎯 Quick Test

### Test 1: Check Scripts Exist
```cmd
test-scripts.bat
```

### Test 2: View Data
```cmd
view-database-data.bat
```

### Test 3: Seed Data
```cmd
seed-all-data.bat
```

---

## 📝 Alternative: Use PowerShell

If batch files still don't work, use PowerShell:

```powershell
# View data
cd backend
node scripts/viewData.js

# Seed data
node scripts/seed.js
node scripts/seedLeaderboard.js
```

---

## ✅ Summary

**Best Method:**
1. Open File Explorer
2. Go to: `C:\Users\manit\OneDrive\Desktop\AI_ALUMINI_PORTAL`
3. Double-click: `seed-all-data.bat`

**If that doesn't work:**
1. Open Command Prompt
2. Run:
   ```cmd
   cd C:\Users\manit\OneDrive\Desktop\AI_ALUMINI_PORTAL\backend
   node scripts\seed.js
   node scripts\seedLeaderboard.js
   ```

**Done!** Your leaderboard will have 25 ranked people! 🎉

---

**Still having issues?** Let me know the exact error message! 😊

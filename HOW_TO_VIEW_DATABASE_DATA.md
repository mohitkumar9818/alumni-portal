# 📊 How to View Your Database Data

## 3 Easy Methods to View Your MongoDB Data

---

## 🌐 **Method 1: MongoDB Atlas Web Dashboard** (Recommended)

### Step-by-Step:

1. **Open MongoDB Atlas**
   ```
   https://cloud.mongodb.com/
   ```

2. **Login**
   - Email: Your MongoDB Atlas account email
   - Password: Your MongoDB Atlas password

3. **Navigate to Your Cluster**
   - You should see: **"AlumniPortal"** cluster
   - Click on it

4. **Browse Collections**
   - Click the **"Browse Collections"** button
   - Or click **"Collections"** in the left menu

5. **Select Database**
   - Database name: `alumni_portal`
   - You'll see collections like:
     - `users`
     - `events`
     - `jobs`
     - `donations`
     - `leaderboardentries`

6. **View Data**
   - Click on any collection (e.g., `users`)
   - You'll see all documents (records)
   - Click on a document to see full details

### What You Can Do:
- ✅ View all data
- ✅ Search and filter
- ✅ Edit documents
- ✅ Delete documents
- ✅ Add new documents
- ✅ Export data

---

## 💻 **Method 2: MongoDB Compass** (Desktop App)

### Step 1: Download
```
https://www.mongodb.com/try/download/compass
```
- Choose your operating system
- Download and install

### Step 2: Connect

1. **Open MongoDB Compass**

2. **New Connection**
   - Click "New Connection"

3. **Paste Connection String**
   ```
   mongodb+srv://mohit753287_db_user:753287@Mohit@alumniportal.i4ztxmh.mongodb.net/alumni_portal
   ```

4. **Click "Connect"**

### Step 3: Browse Data

1. **Select Database**
   - Click on `alumni_portal`

2. **Select Collection**
   - Click on `users`, `events`, etc.

3. **View Documents**
   - See all your data in a nice interface
   - Use filters, sort, and search

### Features:
- ✅ Visual interface
- ✅ Query builder
- ✅ Schema analysis
- ✅ Performance insights
- ✅ Import/Export data

---

## 🔧 **Method 3: Command Line Script** (Quick View)

### Run the Script:

```bash
# Double-click this file:
view-database-data.bat
```

Or manually:
```bash
cd backend
node scripts/viewData.js
```

### What It Shows:
- ✅ First 10 users
- ✅ First 5 events
- ✅ Top 5 leaderboard entries
- ✅ Total counts for each collection

### Sample Output:
```
✅ Connected to MongoDB Atlas!
📊 Database: alumni_portal

👥 === USERS ===
   1. John Doe
      Email: john@example.com
      Class: 2020
      Company: Google
      Location: San Francisco

   📊 Total Users: 25

📅 === EVENTS ===
   1. Alumni Tech Meetup
      Date: 12/15/2024
      Location: New York

   📊 Total Events: 10

🏆 === LEADERBOARD (Top 5) ===
   1. Jane Smith
      Total Score: 89.5
      Badges: Gold, Elite Mentor

   📊 Total Leaderboard Entries: 25
```

---

## 🔍 **Method 4: Using Your Backend API**

### View Data Through API Endpoints:

1. **Make sure backend is running**
   ```bash
   start-backend.bat
   ```

2. **Open browser or Postman**

3. **Test these endpoints:**

   **Get All Users:**
   ```
   GET http://localhost:5000/api/users
   ```

   **Get All Events:**
   ```
   GET http://localhost:5000/api/events
   ```

   **Get Leaderboard:**
   ```
   GET http://localhost:5000/api/leaderboard
   ```

   **Get Current User:**
   ```
   GET http://localhost:5000/api/users/me
   Headers: Authorization: Bearer YOUR_JWT_TOKEN
   ```

---

## 📊 **What Data is Stored?**

### Users Collection
```javascript
{
  _id: ObjectId,
  name: "John Doe",
  email: "john@example.com",
  password: "hashed_password",
  gradYear: 2020,
  company: "Google",
  location: "San Francisco, CA",
  skills: ["JavaScript", "React", "Node.js"],
  bio: "Software Engineer...",
  createdAt: Date,
  updatedAt: Date
}
```

### Events Collection
```javascript
{
  _id: ObjectId,
  title: "Alumni Tech Meetup",
  description: "Join us for...",
  date: Date,
  location: "New York, NY",
  attendees: [userId1, userId2],
  createdAt: Date
}
```

### Leaderboard Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  scores: {
    mentorship: 28.5,
    engagement: 22.0,
    achievement: 20.0,
    contribution: 18.5,
    total: 89.0
  },
  badges: ["Gold", "Elite Mentor"],
  rank: 1,
  createdAt: Date
}
```

---

## 🎯 **Quick Commands**

### View Data
```bash
view-database-data.bat
```

### Seed Sample Data
```bash
seed-database.bat          # Seed users, events, jobs
seed-leaderboard.bat       # Seed leaderboard data
```

### Check Connection
```bash
cd backend
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGO_URI).then(() => console.log('✅ Connected!')).catch(err => console.error('❌ Error:', err.message));"
```

---

## 🔐 **Your MongoDB Credentials**

**Connection String:**
```
mongodb+srv://mohit753287_db_user:753287@Mohit@alumniportal.i4ztxmh.mongodb.net/alumni_portal
```

**Breakdown:**
- **Username:** `mohit753287_db_user`
- **Password:** `753287@Mohit`
- **Cluster:** `alumniportal.i4ztxmh.mongodb.net`
- **Database:** `alumni_portal`

---

## 🐛 **Troubleshooting**

### Can't Login to MongoDB Atlas?
- Check your email for MongoDB Atlas account
- Use "Forgot Password" if needed
- Make sure you're using the correct account

### Connection String Not Working?
- Check if password has special characters
- URL encode special characters:
  - `@` becomes `%40`
  - `#` becomes `%23`
  - `$` becomes `%24`

### No Data Showing?
- Run seed scripts to add sample data:
  ```bash
  seed-database.bat
  seed-leaderboard.bat
  ```

### MongoDB Compass Won't Connect?
- Check your internet connection
- Verify connection string is correct
- Make sure MongoDB Atlas allows your IP address

---

## 📈 **Data Statistics**

To see how much data you have:

```bash
# Run this:
view-database-data.bat
```

You'll see:
- Total number of users
- Total number of events
- Total leaderboard entries
- Sample data from each collection

---

## 🎯 **Recommended Method**

**For Beginners:** Use **MongoDB Atlas Web Dashboard** (Method 1)
- No installation needed
- Easy to use
- Visual interface
- Works from any browser

**For Developers:** Use **MongoDB Compass** (Method 2)
- Better performance
- Advanced features
- Offline access
- Query builder

**For Quick Checks:** Use **Command Line Script** (Method 3)
- Fastest way
- No browser needed
- See summary instantly

---

## 📚 **Additional Resources**

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- MongoDB Compass Docs: https://docs.mongodb.com/compass/
- Your Project Docs: See `MONGODB_SETUP.md`

---

## ✅ **Summary**

You have **3 easy ways** to view your data:

1. **MongoDB Atlas Web** - https://cloud.mongodb.com/
2. **MongoDB Compass** - Desktop app
3. **Command Line** - `view-database-data.bat`

**Easiest:** Just go to https://cloud.mongodb.com/ and login! 🚀

---

**Need help?** Let me know! 😊

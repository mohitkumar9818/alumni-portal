# 🚀 Alumni Portal - Quick Start Guide

## ✅ What's Already Done

- ✅ Backend dependencies installed
- ✅ Frontend dependencies installed  
- ✅ AI Service dependencies installed
- ✅ Environment files created (.env)
- ✅ Startup scripts created

## 📋 What You Need to Do

### Step 1: Setup MongoDB (5 minutes)

**Choose ONE option:**

#### Option A: MongoDB Atlas (Cloud - Easiest) ⭐ RECOMMENDED

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create free cluster (M0)
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Edit `backend\.env` and replace MONGO_URI with your connection string

#### Option B: Install MongoDB Locally

1. Download from https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. MongoDB will run automatically as Windows service
4. Connection string is already set in `backend\.env`

See `MONGODB_SETUP.md` for detailed instructions.

### Step 2: Start All Services (3 terminals)

Open 3 separate Command Prompt or PowerShell windows:

**Terminal 1 - Backend:**
```cmd
start-backend.bat
```
Wait for "Server running on port 5000" message

**Terminal 2 - AI Service:**
```cmd
start-ai-service.bat
```
Wait for "Application startup complete" message

**Terminal 3 - Frontend:**
```cmd
start-frontend.bat
```
Wait for "Local: http://localhost:5173" message

### Step 3: Seed Test Data (Optional but Recommended)

Open a 4th terminal:
```cmd
seed-database.bat
```

This creates:
- 5 mentor users
- 3 job postings
- 2 events
- 1 admin user

### Step 4: Open the Application

Open your browser and go to:
```
http://localhost:5173
```

## 🔑 Test Accounts (After Seeding)

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | admin123 | Admin |
| sarah@example.com | password123 | Mentor |
| alice@example.com | password123 | User |

## 🎯 What to Try

1. **Register** a new account at http://localhost:5173/register
2. **Complete your profile** - add skills and interests
3. **View Dashboard** - see AI-powered mentor and job recommendations
4. **Browse Mentors** - see available mentors
5. **Search Directory** - find alumni by filters
6. **View Events** - register for events
7. **Browse Jobs** - see job opportunities
8. **Admin Panel** (login as admin) - create events and post jobs

## 🌐 Service URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | React app |
| Backend API | http://localhost:5000 | REST API |
| AI Service | http://localhost:8000 | Recommendations |
| API Docs | http://localhost:8000/docs | Swagger UI |

## ✅ Verify Everything is Working

### Check Backend
Open http://localhost:5000/health in browser
Should see: `{"status":"ok","timestamp":"..."}`

### Check AI Service
Open http://localhost:8000/health in browser
Should see: `{"status":"healthy","timestamp":"..."}`

### Check Frontend
Open http://localhost:5173
Should see the login page

## 🐛 Troubleshooting

### Backend won't start
- ❌ **Error: "MongoDB connection failed"**
  - ✅ Make sure MongoDB is running
  - ✅ Check MONGO_URI in `backend\.env`
  - ✅ If using Atlas, verify connection string

- ❌ **Error: "Port 5000 already in use"**
  - ✅ Close other applications using port 5000
  - ✅ Or change PORT in `backend\.env`

### AI Service won't start
- ❌ **Error: "ModuleNotFoundError"**
  - ✅ Make sure you ran `setup-project.bat`
  - ✅ Virtual environment should be activated

- ❌ **Error: "Port 8000 already in use"**
  - ✅ Close other applications using port 8000

### Frontend won't start
- ❌ **Error: "Failed to fetch"**
  - ✅ Make sure backend is running first
  - ✅ Check VITE_API_URL in `frontend\.env`

### Can't see recommendations
- ❌ **No mentors showing**
  - ✅ Run `seed-database.bat` to create test data
  - ✅ Complete your profile with skills and interests
  - ✅ Make sure AI service is running

## 📁 Project Structure

```
AI_ALUMINI_PORTAL/
├── backend/              # Node.js API
│   ├── .env             # ✅ Created
│   └── node_modules/    # ✅ Installed
├── frontend/            # React app
│   ├── .env             # ✅ Created
│   └── node_modules/    # ✅ Installed
├── ai-service/          # FastAPI
│   ├── .env             # ✅ Created
│   └── venv/            # ✅ Created
├── start-backend.bat    # ✅ Start backend
├── start-ai-service.bat # ✅ Start AI service
├── start-frontend.bat   # ✅ Start frontend
└── seed-database.bat    # ✅ Seed test data
```

## 🎬 Quick Demo Flow

1. Start all 3 services (backend, AI, frontend)
2. Seed database with test data
3. Open http://localhost:5173
4. Login as alice@example.com / password123
5. Go to Profile and add skills: "Python, Machine Learning, React"
6. Go to Dashboard - see mentor recommendations!
7. Browse other pages (Mentors, Jobs, Events, Directory)
8. Logout and login as admin@example.com / admin123
9. Go to Admin panel and create an event or post a job

## 📚 Additional Documentation

- `README.md` - Project overview
- `SETUP_GUIDE.md` - Detailed setup instructions
- `MONGODB_SETUP.md` - MongoDB installation guide
- `DEMO_SCRIPT.md` - Feature walkthrough
- `QUICK_REFERENCE.md` - Command reference
- `ARCHITECTURE.md` - Technical details

## 🆘 Need Help?

1. Check the error message in the terminal
2. Review the troubleshooting section above
3. Check the relevant documentation file
4. Make sure all 3 services are running
5. Verify MongoDB is accessible

## 🎉 Success Checklist

- [ ] MongoDB is running (local or Atlas)
- [ ] Backend started successfully (port 5000)
- [ ] AI Service started successfully (port 8000)
- [ ] Frontend started successfully (port 5173)
- [ ] Database seeded with test data
- [ ] Can access http://localhost:5173
- [ ] Can login with test account
- [ ] Can see recommendations on dashboard

---

**Ready to start?** Follow Step 1 above! 🚀

# Quick Test Without MongoDB

If you want to test the frontend and AI service without setting up MongoDB first, you can do a partial test:

## What Works Without MongoDB:
- ✅ Frontend UI (all pages load)
- ✅ AI Service (recommendation algorithm)
- ❌ Backend API (needs MongoDB)
- ❌ Login/Register (needs backend)
- ❌ Data persistence (needs backend)

## Quick Test Steps:

1. **Start AI Service Only:**
   ```cmd
   start-ai-service.bat
   ```
   - Open http://localhost:8000/docs
   - You can test the recommendation endpoint

2. **Start Frontend Only:**
   ```cmd
   start-frontend.bat
   ```
   - Open http://localhost:5173
   - You'll see the login page
   - UI will load but login won't work without backend

## To Get Full Functionality:

You MUST setup MongoDB first. Choose one:

### Option 1: MongoDB Atlas (5 minutes, no installation)
1. Go to https://mongodb.com/cloud/atlas/register
2. Create free account
3. Create free cluster
4. Get connection string
5. Update `backend\.env` with connection string
6. Start backend with `start-backend.bat`

### Option 2: Install MongoDB Locally (15 minutes)
1. Download from https://mongodb.com/try/download/community
2. Install MongoDB Community Server
3. MongoDB runs automatically
4. Start backend with `start-backend.bat`

See `MONGODB_SETUP.md` for detailed instructions.

# Project Verification Checklist

Use this checklist to verify that the Alumni Portal is set up correctly and all features are working.

## ✅ Initial Setup

### Files & Structure
- [ ] All root documentation files present (README, SETUP_GUIDE, etc.)
- [ ] docker-compose.yml exists
- [ ] .gitignore configured
- [ ] Postman collection available

### Backend
- [ ] backend/package.json exists
- [ ] backend/server.js exists
- [ ] backend/.env.example exists
- [ ] All models created (User, Event, Job, Donation)
- [ ] All routes created (auth, users, events, jobs, donations, recommendations, directory)
- [ ] Middleware (auth.js) exists
- [ ] Database config (db.js) exists
- [ ] Seed script exists
- [ ] Test file exists

### Frontend
- [ ] frontend/package.json exists
- [ ] frontend/index.html exists
- [ ] frontend/vite.config.js exists
- [ ] frontend/.env.example exists
- [ ] All components created (Header, Footer, Card, FormInput, ProtectedRoute)
- [ ] All pages created (Login, Register, Dashboard, Profile, etc.)
- [ ] AuthContext exists
- [ ] API service layer exists
- [ ] CSS files exist

### AI Service
- [ ] ai-service/app.py exists
- [ ] ai-service/requirements.txt exists
- [ ] ai-service/.env.example exists
- [ ] ai-service/Dockerfile exists

## ✅ Installation

### Backend Installation
```bash
cd backend
npm install
```
- [ ] Dependencies installed successfully
- [ ] No error messages
- [ ] node_modules folder created

### Frontend Installation
```bash
cd frontend
npm install
```
- [ ] Dependencies installed successfully
- [ ] No error messages
- [ ] node_modules folder created

### AI Service Installation
```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```
- [ ] Virtual environment created
- [ ] Dependencies installed successfully
- [ ] No error messages

## ✅ Configuration

### Backend .env
```bash
cd backend
cp .env.example .env
```
- [ ] .env file created
- [ ] MONGO_URI configured
- [ ] JWT_SECRET set (min 32 chars)
- [ ] AI_SERVICE_URL set
- [ ] PORT set (5000)

### Frontend .env
```bash
cd frontend
cp .env.example .env
```
- [ ] .env file created
- [ ] VITE_API_URL set (http://localhost:5000)
- [ ] VITE_AI_SERVICE_URL set (http://localhost:8000)

### AI Service .env
```bash
cd ai-service
cp .env.example .env
```
- [ ] .env file created
- [ ] BACKEND_URL set (http://localhost:5000)

### MongoDB
- [ ] MongoDB installed or Docker container ready
- [ ] MongoDB running on port 27017
- [ ] Can connect with mongosh or Compass

## ✅ Service Startup

### Start MongoDB
```bash
# Docker
docker run -d -p 27017:27017 --name alumni-mongo mongo
# Or use local MongoDB installation
```
- [ ] MongoDB running
- [ ] Accessible on port 27017
- [ ] No connection errors

### Start Backend
```bash
cd backend
npm run dev
```
- [ ] Server starts successfully
- [ ] "MongoDB Connected" message appears
- [ ] "Server running on port 5000" message appears
- [ ] No error messages
- [ ] http://localhost:5000/health returns JSON

### Start AI Service
```bash
cd ai-service
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn app:app --reload --port 8000
```
- [ ] Service starts successfully
- [ ] "Application startup complete" message appears
- [ ] No error messages
- [ ] http://localhost:8000/health returns JSON
- [ ] http://localhost:8000/docs shows Swagger UI

### Start Frontend
```bash
cd frontend
npm run dev
```
- [ ] Dev server starts successfully
- [ ] "Local: http://localhost:5173" message appears
- [ ] No error messages
- [ ] Browser opens automatically or can access manually

## ✅ Seed Test Data

```bash
cd backend
node scripts/seed.js
```
- [ ] Script runs successfully
- [ ] "MongoDB Connected" message
- [ ] "Cleared existing data" message
- [ ] "Created admin user" message
- [ ] "Created mentor users" message
- [ ] "Created regular users" message
- [ ] "Created jobs" message
- [ ] "Created events" message
- [ ] "Database seeding completed!" message
- [ ] Test account credentials displayed

## ✅ Frontend Testing

### Access & Navigation
- [ ] Can access http://localhost:5173
- [ ] Login page loads
- [ ] Register page loads
- [ ] No console errors in browser DevTools

### User Registration
- [ ] Navigate to /register
- [ ] Fill in registration form
- [ ] Submit form
- [ ] Redirects to profile page
- [ ] No errors in console
- [ ] Backend logs show "User synced to CRM"

### User Login
- [ ] Navigate to /login
- [ ] Enter test credentials (alice@example.com / password123)
- [ ] Submit form
- [ ] Redirects to dashboard
- [ ] User name appears in header
- [ ] No errors in console

### Dashboard
- [ ] Dashboard loads
- [ ] Welcome message with user name
- [ ] "Recommended Mentors" section visible
- [ ] At least 3 mentors displayed (if profile has skills)
- [ ] "Recommended Jobs" section visible
- [ ] Match scores displayed
- [ ] No errors in console

### Profile Page
- [ ] Navigate to /profile
- [ ] Profile form loads with user data
- [ ] Can edit fields
- [ ] Can add skills (comma-separated)
- [ ] Can add interests (comma-separated)
- [ ] Can check "I want to be a mentor"
- [ ] Save button works
- [ ] Success message appears
- [ ] No errors in console

### Mentors Page
- [ ] Navigate to /mentors
- [ ] Mentor list loads
- [ ] Mentor cards display
- [ ] Skills shown as tags
- [ ] Company and grad year visible
- [ ] No errors in console

### Jobs Page
- [ ] Navigate to /jobs
- [ ] Job listings load
- [ ] Job cards display
- [ ] Can filter by type
- [ ] Tags displayed
- [ ] "Apply Now" links work
- [ ] No errors in console

### Events Page
- [ ] Navigate to /events
- [ ] Event listings load
- [ ] Event cards display
- [ ] Dates formatted correctly
- [ ] Capacity shown
- [ ] "Register" button works
- [ ] Success message on registration
- [ ] Attendee count updates
- [ ] No errors in console

### Directory Page
- [ ] Navigate to /directory
- [ ] Search form visible
- [ ] Can search by name
- [ ] Can search by year
- [ ] Can search by company
- [ ] Can search by location
- [ ] Results display correctly
- [ ] No errors in console

### Admin Panel (Login as admin@example.com)
- [ ] Navigate to /admin
- [ ] Admin panel loads
- [ ] "Create Event" tab visible
- [ ] "Post Job" tab visible
- [ ] Can create event
- [ ] Can post job
- [ ] Success messages appear
- [ ] No errors in console

## ✅ Backend API Testing

### Health Check
```bash
curl http://localhost:5000/health
```
- [ ] Returns JSON with status "ok"

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"password123"}'
```
- [ ] Returns token and user object
- [ ] Status code 201

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}'
```
- [ ] Returns token and user object
- [ ] Status code 200

### Get Profile (with token)
```bash
curl http://localhost:5000/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```
- [ ] Returns user profile
- [ ] Status code 200

### Get Recommendations (with token)
```bash
curl -X POST http://localhost:5000/api/recommendations \
  -H "Authorization: Bearer YOUR_TOKEN"
```
- [ ] Returns mentors and jobs arrays
- [ ] Status code 200

## ✅ AI Service Testing

### Health Check
```bash
curl http://localhost:8000/health
```
- [ ] Returns JSON with status "healthy"

### API Documentation
- [ ] Visit http://localhost:8000/docs
- [ ] Swagger UI loads
- [ ] Can see /recommend endpoint
- [ ] Can test endpoint from UI

### Recommendation Endpoint
```bash
curl -X POST http://localhost:8000/recommend \
  -H "Content-Type: application/json" \
  -d '{"userId":"123","profile":{"skills":["Python"],"interests":["AI"],"gradYear":2020}}'
```
- [ ] Returns mentors and jobs arrays
- [ ] Mentors have scores
- [ ] Jobs have matched tags
- [ ] Status code 200

## ✅ Database Verification

### Connect to MongoDB
```bash
mongosh
use alumni_portal
```

### Check Collections
```bash
show collections
```
- [ ] users collection exists
- [ ] events collection exists
- [ ] jobs collection exists
- [ ] donations collection exists

### Check Data
```bash
db.users.countDocuments()
db.events.countDocuments()
db.jobs.countDocuments()
```
- [ ] Users exist (should be 7+ after seeding)
- [ ] Events exist (should be 3 after seeding)
- [ ] Jobs exist (should be 4 after seeding)

## ✅ Acceptance Criteria Verification

### 1. AI Mentor Matching
- [ ] Dashboard shows mentor recommendations
- [ ] At least 3 mentors recommended
- [ ] Match scores displayed
- [ ] Shared skills/interests shown
- [ ] Scores indicate >80% relevance (15+ out of 20)

### 2. Mobile Donation Flow
- [ ] Open frontend on mobile or use DevTools mobile view
- [ ] Navigate to donation page
- [ ] Start timer
- [ ] Enter amount and message
- [ ] Submit donation
- [ ] Redirected to payment URL
- [ ] Stop timer
- [ ] Total time < 60 seconds

### 3. Event Registration
- [ ] Navigate to events page
- [ ] Start timer
- [ ] Click "Register" on an event
- [ ] Confirm registration
- [ ] If ticket required, complete payment flow
- [ ] Stop timer
- [ ] Total time < 3 minutes

### 4. CRM Sync
- [ ] Register new user
- [ ] Note timestamp
- [ ] Check backend logs for "User synced to CRM" message
- [ ] Verify message appears within 5 minutes (2 seconds in demo)
- [ ] Check user document in MongoDB for crmSynced: true

## ✅ Docker Testing (Optional)

### Docker Compose
```bash
docker-compose up --build
```
- [ ] All services build successfully
- [ ] MongoDB container starts
- [ ] Backend container starts
- [ ] AI service container starts
- [ ] Frontend container starts
- [ ] All services accessible
- [ ] No error messages

### Access Services
- [ ] Frontend: http://localhost:5173
- [ ] Backend: http://localhost:5000
- [ ] AI Service: http://localhost:8000
- [ ] All services respond correctly

## ✅ Error Handling

### Invalid Login
- [ ] Try login with wrong password
- [ ] Error message displayed
- [ ] No console errors

### Protected Routes
- [ ] Logout
- [ ] Try to access /profile directly
- [ ] Redirected to /login
- [ ] No console errors

### Invalid Form Data
- [ ] Try to register with invalid email
- [ ] Validation error shown
- [ ] Try to register with short password
- [ ] Validation error shown

### Network Errors
- [ ] Stop backend
- [ ] Try to login from frontend
- [ ] Error message displayed
- [ ] Restart backend and verify recovery

## ✅ Performance

### Page Load Times
- [ ] Dashboard loads in < 2 seconds
- [ ] Recommendations load in < 3 seconds
- [ ] Directory search returns in < 1 second
- [ ] Event registration completes in < 5 seconds

### API Response Times
- [ ] Login responds in < 500ms
- [ ] Get profile responds in < 300ms
- [ ] Get recommendations responds in < 2 seconds
- [ ] Search directory responds in < 500ms

## ✅ Security

### Authentication
- [ ] Cannot access protected routes without token
- [ ] Invalid token returns 401
- [ ] Expired token returns 401
- [ ] Password not returned in API responses

### Authorization
- [ ] Regular user cannot access admin endpoints
- [ ] Admin can create events
- [ ] Admin can post jobs
- [ ] Role-based access working

### Input Validation
- [ ] Email validation works
- [ ] Password length validation works
- [ ] Required fields enforced
- [ ] SQL injection prevented (NoSQL)

## ✅ Documentation

### Files Present
- [ ] README.md
- [ ] SETUP_GUIDE.md
- [ ] DEPLOYMENT.md
- [ ] ARCHITECTURE.md
- [ ] DEMO_SCRIPT.md
- [ ] PROJECT_SUMMARY.md
- [ ] QUICK_REFERENCE.md
- [ ] VERIFICATION_CHECKLIST.md (this file)
- [ ] Postman_Collection.json

### Documentation Quality
- [ ] Clear instructions
- [ ] Code examples provided
- [ ] Troubleshooting sections
- [ ] Complete and accurate

## ✅ Code Quality

### Backend
- [ ] Consistent code style
- [ ] Error handling implemented
- [ ] Input validation present
- [ ] Comments where needed
- [ ] Modular structure

### Frontend
- [ ] Component reusability
- [ ] Consistent styling
- [ ] Error handling
- [ ] Loading states
- [ ] Responsive design

### AI Service
- [ ] Clear algorithm logic
- [ ] Type hints used
- [ ] Error handling
- [ ] Documentation strings

## 📊 Final Score

Count your checkmarks:
- **Total Possible**: ~200 items
- **Your Score**: _____ / 200
- **Percentage**: _____ %

### Scoring Guide
- **90-100%**: Excellent! Ready for production
- **80-89%**: Very good, minor issues to fix
- **70-79%**: Good, some work needed
- **Below 70%**: Review setup and fix issues

## 🎯 Next Steps

After completing this checklist:

1. ✅ Fix any failing items
2. ✅ Review DEMO_SCRIPT.md for feature walkthrough
3. ✅ Test all acceptance criteria
4. ✅ Review DEPLOYMENT.md for production setup
5. ✅ Deploy to staging environment
6. ✅ Perform final testing
7. ✅ Deploy to production

## 📝 Notes

Use this space to note any issues found:

```
Issue 1: 
Solution: 

Issue 2:
Solution:

Issue 3:
Solution:
```

---

**Verification Date**: _______________
**Verified By**: _______________
**Status**: ⬜ Pass  ⬜ Fail  ⬜ Needs Review

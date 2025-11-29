# Setup Guide - Alumni Portal

Complete step-by-step guide to get the Alumni Portal running locally.

## Prerequisites

Install the following on your system:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Python** 3.9+ ([Download](https://www.python.org/))
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community) or use Docker)
- **Git** ([Download](https://git-scm.com/))

Optional:
- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop))

## Quick Start (Docker - Recommended)

If you have Docker installed, this is the fastest way:

```bash
# Clone the repository
git clone <repository-url>
cd alumni-portal

# Start all services
docker-compose up --build
```

Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- AI Service: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Manual Setup

### 1. MongoDB Setup

#### Option A: Local MongoDB

```bash
# Windows (using Chocolatey)
choco install mongodb

# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
mongod --dbpath /path/to/data/directory
```

#### Option B: Docker MongoDB

```bash
docker run -d -p 27017:27017 --name alumni-mongo mongo:latest
```

#### Option C: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string
4. Use in backend .env file

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env  # Windows
# or
cp .env.example .env    # macOS/Linux

# Edit .env file with your settings
# Minimum required:
# MONGO_URI=mongodb://localhost:27017/alumni_portal
# JWT_SECRET=your_secret_key_min_32_characters
# AI_SERVICE_URL=http://localhost:8000

# Start development server
npm run dev
```

Backend should now be running on http://localhost:5000

Test it:
```bash
curl http://localhost:5000/health
```

### 3. AI Service Setup

```bash
# Navigate to ai-service directory
cd ai-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env  # Windows
# or
cp .env.example .env    # macOS/Linux

# Edit .env file
# BACKEND_URL=http://localhost:5000

# Start development server
uvicorn app:app --reload --port 8000
```

AI Service should now be running on http://localhost:8000

Test it:
```bash
curl http://localhost:8000/health
```

### 4. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env  # Windows
# or
cp .env.example .env    # macOS/Linux

# Edit .env file
# VITE_API_URL=http://localhost:5000
# VITE_AI_SERVICE_URL=http://localhost:8000

# Start development server
npm run dev
```

Frontend should now be running on http://localhost:5173

## Verify Installation

### 1. Check All Services

Open these URLs in your browser:
- Frontend: http://localhost:5173 (should show login page)
- Backend Health: http://localhost:5000/health (should return JSON)
- AI Service Health: http://localhost:8000/health (should return JSON)
- AI Service Docs: http://localhost:8000/docs (should show Swagger UI)

### 2. Test Registration Flow

1. Go to http://localhost:5173/register
2. Fill in registration form
3. Submit
4. Should redirect to profile page
5. Check backend console for "User synced to CRM" message

### 3. Test AI Recommendations

1. Complete your profile with skills and interests
2. Go to Dashboard
3. Should see mentor and job recommendations

## Seed Test Data

To populate the database with test data:

```bash
cd backend
node scripts/seed.js
```

This creates:
- 5 mentor users
- 3 job postings
- 2 upcoming events
- 1 admin user (admin@example.com / admin123)

## Troubleshooting

### MongoDB Connection Issues

**Error**: "MongoServerError: Authentication failed"
- Check MONGO_URI in backend/.env
- Verify MongoDB is running: `mongosh` or check Docker container

**Error**: "MongooseServerSelectionError"
- Ensure MongoDB is running
- Check firewall settings
- Try connection string: `mongodb://127.0.0.1:27017/alumni_portal`

### Backend Issues

**Error**: "Port 5000 already in use"
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

**Error**: "JWT_SECRET is not defined"
- Ensure .env file exists in backend/
- Check .env has JWT_SECRET set
- Restart backend server

### AI Service Issues

**Error**: "ModuleNotFoundError: No module named 'fastapi'"
- Ensure virtual environment is activated
- Run: `pip install -r requirements.txt`

**Error**: "Connection refused to backend"
- Check BACKEND_URL in ai-service/.env
- Ensure backend is running
- Try: `http://localhost:5000` or `http://127.0.0.1:5000`

### Frontend Issues

**Error**: "Failed to fetch"
- Check VITE_API_URL in frontend/.env
- Ensure backend is running
- Check browser console for CORS errors

**Error**: "Cannot find module"
- Delete node_modules and package-lock.json
- Run: `npm install` again

### CORS Issues

If you see CORS errors in browser console:
1. Check backend CORS configuration in server.js
2. Ensure frontend URL is allowed
3. Restart backend server

## Development Tips

### Hot Reload

All services support hot reload:
- Backend: Uses nodemon (auto-restarts on file changes)
- AI Service: Uses uvicorn --reload
- Frontend: Uses Vite HMR (instant updates)

### Database GUI

Use MongoDB Compass to view/edit database:
1. Download: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. Select database: `alumni_portal`

### API Testing

Use Postman collection:
1. Import `Postman_Collection.json`
2. Set `baseUrl` variable to `http://localhost:5000/api`
3. Register/login to get token
4. Set `token` variable
5. Test all endpoints

### VS Code Extensions

Recommended extensions:
- ESLint
- Prettier
- Python
- MongoDB for VS Code
- REST Client

## Next Steps

1. Read [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) for feature walkthrough
2. Check [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
3. Review API documentation at http://localhost:8000/docs
4. Explore code structure in README.md

## Getting Help

- Check logs in terminal windows
- Review error messages carefully
- Ensure all prerequisites are installed
- Verify all services are running
- Check .env files are configured correctly

## Common Commands Reference

```bash
# Start all services (Docker)
docker-compose up

# Stop all services (Docker)
docker-compose down

# Backend
cd backend
npm run dev          # Start dev server
npm test            # Run tests

# AI Service
cd ai-service
source venv/bin/activate  # Activate venv
uvicorn app:app --reload  # Start server

# Frontend
cd frontend
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build
```

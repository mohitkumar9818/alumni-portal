# Quick Reference Guide

## 🚀 Start Commands

### Docker (Easiest)
```bash
docker-compose up --build
```

### Manual Start
```bash
# Backend (Terminal 1)
cd backend && npm run dev

# AI Service (Terminal 2)
cd ai-service && uvicorn app:app --reload --port 8000

# Frontend (Terminal 3)
cd frontend && npm run dev
```

## 🔗 URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | React app |
| Backend | http://localhost:5000 | API server |
| AI Service | http://localhost:8000 | Recommendations |
| API Docs | http://localhost:8000/docs | Swagger UI |

## 👤 Test Accounts

After running seed script (`node backend/scripts/seed.js`):

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | admin123 | Admin |
| sarah@example.com | password123 | Mentor |
| alice@example.com | password123 | User |

## 📋 API Endpoints Cheat Sheet

### Auth
```bash
POST /api/auth/register  # Register
POST /api/auth/login     # Login
```

### Users
```bash
GET  /api/users/me       # Get profile
PUT  /api/users/me       # Update profile
GET  /api/users/:id      # Get user
```

### Recommendations
```bash
POST /api/recommendations  # Get AI recommendations
```

### Directory
```bash
GET /api/directory?name=&year=&company=  # Search alumni
```

### Events
```bash
GET  /api/events              # List events
POST /api/events              # Create (admin)
POST /api/events/:id/register # Register
```

### Jobs
```bash
GET  /api/jobs       # List jobs
POST /api/jobs       # Create (admin)
```

### Donations
```bash
POST /api/donations     # Create donation
GET  /api/donations/my  # My donations
```

## 🔧 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/alumni_portal
JWT_SECRET=your_secret_min_32_chars
AI_SERVICE_URL=http://localhost:8000
PORT=5000
```

### AI Service (.env)
```env
BACKEND_URL=http://localhost:5000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_AI_SERVICE_URL=http://localhost:8000
```

## 🐛 Troubleshooting

### MongoDB not connecting?
```bash
# Check if MongoDB is running
mongosh

# Or start with Docker
docker run -d -p 27017:27017 mongo
```

### Port already in use?
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### AI service not responding?
```bash
# Check if running
curl http://localhost:8000/health

# Restart with logs
cd ai-service
uvicorn app:app --reload --port 8000 --log-level debug
```

### Frontend can't reach backend?
1. Check VITE_API_URL in frontend/.env
2. Verify backend is running on port 5000
3. Check browser console for CORS errors
4. Restart frontend: `npm run dev`

## 📦 Install Dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install

# AI Service
cd ai-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 🧪 Testing

```bash
# Backend tests
cd backend && npm test

# Seed test data
cd backend && node scripts/seed.js

# Test API with Postman
# Import Postman_Collection.json
```

## 📊 Database Commands

```bash
# Connect to MongoDB
mongosh

# Use database
use alumni_portal

# View collections
show collections

# View users
db.users.find().pretty()

# Clear all data
db.users.deleteMany({})
db.events.deleteMany({})
db.jobs.deleteMany({})
db.donations.deleteMany({})
```

## 🎯 Common Tasks

### Create Admin User
```bash
# Use seed script or register and manually update:
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

### Reset Password
```bash
# In MongoDB
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { password: "$2a$10$..." } }  # Use bcrypt hash
)
```

### View Logs
```bash
# Backend logs (in terminal running npm run dev)
# AI Service logs (in terminal running uvicorn)
# Frontend logs (browser console)
```

## 🚢 Deployment Quick Start

### Vercel (Frontend)
```bash
cd frontend
vercel
# Set env vars in dashboard
```

### Railway (Backend)
```bash
cd backend
railway init
railway up
# Set env vars in dashboard
```

### MongoDB Atlas
1. Create cluster at mongodb.com/cloud/atlas
2. Get connection string
3. Update MONGO_URI in backend

## 📝 File Structure

```
alumni-portal/
├── frontend/          # React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   └── package.json
├── backend/           # Express API
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── ai-service/        # FastAPI
│   ├── app.py
│   └── requirements.txt
└── docker-compose.yml
```

## 🎨 Frontend Routes

| Route | Component | Access |
|-------|-----------|--------|
| /login | Login | Public |
| /register | Register | Public |
| / | Dashboard | Protected |
| /profile | Profile | Protected |
| /mentors | MentorList | Protected |
| /jobs | JobsList | Protected |
| /events | EventsList | Protected |
| /directory | Directory | Protected |
| /admin | Admin | Admin only |

## 🔐 Auth Flow

1. User registers/logs in
2. Backend returns JWT token
3. Frontend stores token in localStorage
4. Frontend includes token in Authorization header
5. Backend validates token on protected routes

## 💡 Tips

- Use MongoDB Compass for database GUI
- Use Postman for API testing
- Check browser DevTools Network tab for API errors
- Use React DevTools for component debugging
- Check terminal logs for backend errors
- Use `console.log()` liberally during development

## 📚 Documentation Files

- **README.md** - Project overview
- **SETUP_GUIDE.md** - Detailed setup instructions
- **DEPLOYMENT.md** - Production deployment
- **ARCHITECTURE.md** - Technical details
- **DEMO_SCRIPT.md** - Feature walkthrough
- **PROJECT_SUMMARY.md** - Complete summary
- **QUICK_REFERENCE.md** - This file

## 🆘 Need Help?

1. Check error messages in terminal
2. Review relevant documentation file
3. Verify environment variables
4. Check service health endpoints
5. Review logs in browser console
6. Test with Postman collection
7. Try restarting services
8. Clear browser cache/localStorage

## ⚡ Performance Tips

- Use MongoDB indexes for frequent queries
- Implement pagination for large lists
- Cache API responses when appropriate
- Optimize images and assets
- Use React.memo for expensive components
- Lazy load routes with React.lazy()

## 🔄 Update Dependencies

```bash
# Backend
cd backend && npm update

# Frontend
cd frontend && npm update

# AI Service
cd ai-service && pip install --upgrade -r requirements.txt
```

## 🎯 Next Steps

1. ✅ Get all services running
2. ✅ Seed test data
3. ✅ Test registration flow
4. ✅ Complete profile
5. ✅ View recommendations
6. ✅ Test all features
7. ✅ Deploy to production

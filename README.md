# 🎓 Alumni Portal

A full-stack AI-powered alumni networking platform connecting graduates with mentorship, job opportunities, events, and community engagement.

## ✨ Features

- **AI-Powered Recommendations** - Smart mentor and job matching using skill-based algorithms
- **User Authentication** - Secure JWT-based authentication with role-based access
- **Alumni Directory** - Search and connect with alumni by skills, company, location
- **Mentorship Program** - Connect with experienced mentors in your field
- **Job Board** - Browse and apply for job opportunities
- **Event Management** - Discover and register for alumni events
- **Leaderboard** - Gamified engagement with badges and rankings
- **Donations** - Support the alumni network with secure donations
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🏗️ Architecture

```
Frontend (React)     → Netlify
Backend (Node.js)    → Render
AI Service (Python)  → Render
Database (MongoDB)   → MongoDB Atlas
```

## 🚀 Live Demo

- **Frontend**: https://ai-alumini-portal.netlify.app
- **Backend API**: https://alumni-portal-5s33.onrender.com
- **API Docs**: https://alumni-portal-5s33.onrender.com/api/health

## 📋 Prerequisites

- Node.js 18+
- Python 3.9+
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/mohitkumar9818/alumni-portal.git
cd alumni-portal
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### 3. AI Service Setup
```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app:app --reload --port 8000
```

### 4. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with API URLs
npm run dev
```

## 📁 Project Structure

```
alumni-portal/
├── frontend/              # React SPA (Vite)
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route pages
│   │   ├── context/      # Auth & Theme context
│   │   ├── services/     # API service layer
│   │   └── App.jsx       # Main app component
│   └── package.json
├── backend/              # Node.js + Express API
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth & validation
│   ├── scripts/         # Database seeding
│   ├── server.js        # Express server
│   └── package.json
├── ai-service/          # FastAPI microservice
│   ├── app.py           # Main application
│   └── requirements.txt
└── README.md
```

## 🔑 Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/alumni_portal
JWT_SECRET=your_secret_key_min_32_chars
JWT_EXPIRE=7d
AI_SERVICE_URL=http://localhost:8000
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
VITE_AI_SERVICE_URL=http://localhost:8000
```

### AI Service (.env)
```
BACKEND_URL=http://localhost:5000
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update profile
- `GET /api/users/:id` - Get user by ID

### Recommendations
- `POST /api/recommendations` - Get AI recommendations

### Directory
- `GET /api/directory` - Search alumni

### Events
- `GET /api/events` - List events
- `POST /api/events` - Create event (admin)
- `POST /api/events/:id/register` - Register for event

### Jobs
- `GET /api/jobs` - List jobs
- `POST /api/jobs` - Create job (admin)

### Donations
- `POST /api/donations` - Create donation
- `GET /api/donations/my` - Get user donations

### Leaderboard
- `GET /api/leaderboard` - Get rankings
- `GET /api/leaderboard/summary` - Get summary stats

## 🧪 Testing

### Seed Test Data
```bash
cd backend
node scripts/seed.js
```

### Test Accounts (After Seeding)
| Email | Password | Role |
|-------|----------|------|
| admin@example.com | admin123 | Admin |
| sarah@example.com | password123 | Mentor |
| alice@example.com | password123 | User |

## 🚀 Deployment

### Deploy to Netlify (Frontend)
1. Connect GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_API_URL`

### Deploy to Render (Backend & AI)
1. Create new Web Service on Render
2. Connect GitHub repo
3. Set root directory and build/start commands
4. Add environment variables

### MongoDB Atlas
1. Create free cluster at mongodb.com/cloud/atlas
2. Configure Network Access (allow 0.0.0.0/0)
3. Get connection string and add to backend .env

## 🔐 Security

- Passwords hashed with bcrypt (10 rounds)
- JWT token authentication
- Protected API routes with middleware
- Input validation and sanitization
- CORS configured
- Environment variables for secrets

## 📊 Tech Stack

**Frontend**
- React 18
- Vite
- React Router v6
- Axios
- Context API

**Backend**
- Node.js 18+
- Express.js
- MongoDB + Mongoose
- JWT
- bcryptjs

**AI Service**
- FastAPI
- Python 3.9+
- Pydantic

**Database**
- MongoDB 6.0+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Mohit Kumar** - Initial work - [GitHub](https://github.com/mohitkumar9818)

## 🙏 Acknowledgments

- MongoDB for database hosting
- Render for backend deployment
- Netlify for frontend hosting
- Google Gemini API for AI recommendations

## 📞 Support

For support, email support@alumniportal.com or open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Real-time notifications with WebSockets
- [ ] Advanced AI with embeddings-based recommendations
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] File uploads (profile pictures, documents)
- [ ] Direct messaging between alumni
- [ ] Analytics dashboard
- [ ] Integration with LinkedIn

---

**Made with ❤️ by the Alumni Portal Team**

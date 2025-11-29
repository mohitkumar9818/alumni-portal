# AI-First Alumni Portal

Full-stack alumni networking platform with AI-powered mentor matching, job recommendations, event management, and donation support.

## Architecture

- **Frontend**: React SPA (Vite)
- **Backend**: Node.js + Express + MongoDB
- **AI Service**: FastAPI (Python)
- **Database**: MongoDB

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB (local or Atlas)
- Docker & Docker Compose (optional)

### Local Development

1. **Start MongoDB** (if using Docker):
```bash
docker run -d -p 27017:27017 --name alumni-mongo mongo:latest
```

2. **Backend Setup**:
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

3. **AI Service Setup**:
```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

4. **Frontend Setup**:
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with API URLs
npm run dev
```

### Using Docker Compose

```bash
docker-compose up --build
```

Access:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- AI Service: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Project Structure

```
alumni-portal/
├── frontend/          # React SPA
├── backend/           # Node.js API
├── ai-service/        # FastAPI microservice
├── docker-compose.yml
└── README.md
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update profile
- `GET /api/directory` - Search alumni

### AI Recommendations
- `POST /api/recommendations` - Get mentor/job recommendations

### Events
- `GET /api/events` - List events
- `POST /api/events` - Create event (admin)
- `POST /api/events/:id/register` - Register for event

### Jobs
- `GET /api/jobs` - List jobs
- `POST /api/jobs` - Create job (admin)

### Donations
- `POST /api/donations` - Process donation

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E demo script
npm run demo
```

## Deployment

- **Frontend**: Vercel/Netlify
- **Backend**: Railway/Heroku
- **AI Service**: Railway/Cloud Run
- **Database**: MongoDB Atlas

## Acceptance Criteria

✅ AI mentor matching suggests ≥3 mentors with >80% relevance
✅ Mobile donation completes within 60 seconds
✅ Event registration + ticket purchase within 3 minutes
✅ New user registration syncs to CRM within 5 minutes

## License

MIT

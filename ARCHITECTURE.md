# Alumni Portal - Architecture Documentation

## System Overview

The Alumni Portal is a full-stack web application built with a microservices architecture, consisting of three main services and a database.

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│                    http://localhost:5173                     │
└────────────┬────────────────────────────────┬────────────────┘
             │                                │
             │ REST API                       │ REST API
             │                                │
┌────────────▼────────────────┐  ┌───────────▼────────────────┐
│   Backend (Node.js/Express) │  │  AI Service (FastAPI)      │
│   http://localhost:5000     │◄─┤  http://localhost:8000     │
└────────────┬────────────────┘  └────────────────────────────┘
             │
             │ MongoDB Driver
             │
┌────────────▼────────────────┐
│   MongoDB Database          │
│   mongodb://localhost:27017 │
└─────────────────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3 (Custom)
- **State Management**: Context API

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **CORS**: cors middleware

### AI Microservice
- **Framework**: FastAPI
- **Runtime**: Python 3.9+
- **HTTP Client**: httpx
- **Data Validation**: Pydantic
- **ASGI Server**: Uvicorn

### Database
- **Database**: MongoDB 6.0+
- **ODM**: Mongoose (Node.js)
- **Deployment**: MongoDB Atlas (production)

### DevOps
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions (optional)
- **Hosting**: Railway/Heroku (backend), Vercel (frontend)

## Architecture Patterns

### 1. Microservices Architecture

The application is split into independent services:

- **Frontend Service**: Handles UI/UX and user interactions
- **Backend Service**: Manages business logic, authentication, and data persistence
- **AI Service**: Provides recommendation algorithms (isolated for scalability)

**Benefits**:
- Independent scaling
- Technology flexibility
- Fault isolation
- Easier maintenance

### 2. RESTful API Design

All services communicate via REST APIs:
- Standard HTTP methods (GET, POST, PUT, DELETE)
- JSON data format
- Stateless communication
- Resource-based URLs

### 3. JWT Authentication

Token-based authentication flow:
```
1. User logs in → Backend validates credentials
2. Backend generates JWT token
3. Frontend stores token (localStorage)
4. Frontend includes token in Authorization header
5. Backend validates token on protected routes
```

### 4. MVC Pattern (Backend)

```
Routes → Controllers → Models → Database
  ↓
Middleware (auth, validation, error handling)
```

## Data Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  gradYear: Number,
  skills: [String],
  interests: [String],
  company: String,
  industry: String,
  location: String,
  role: String (enum: 'alumnus', 'admin'),
  optInMentor: Boolean,
  bio: String,
  linkedIn: String,
  phone: String,
  crmSynced: Boolean,
  crmSyncedAt: Date,
  timestamps: true
}
```

### Event
```javascript
{
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  location: String,
  capacity: Number,
  attendees: [ObjectId → User],
  ticketUrl: String,
  ticketPrice: Number,
  imageUrl: String,
  createdBy: ObjectId → User,
  timestamps: true
}
```

### Job
```javascript
{
  title: String,
  company: String,
  description: String,
  location: String,
  type: String (enum),
  tags: [String],
  applyUrl: String,
  salary: String,
  postedBy: ObjectId → User,
  active: Boolean,
  timestamps: true
}
```

### Donation
```javascript
{
  userId: ObjectId → User,
  amount: Number,
  currency: String,
  status: String (enum),
  paymentMethod: String,
  transactionId: String,
  message: String,
  timestamps: true
}
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user (protected)
- `PUT /api/users/me` - Update profile (protected)
- `GET /api/users/:id` - Get user by ID (protected)

### Directory
- `GET /api/directory` - Search alumni (protected, with filters)

### Recommendations
- `POST /api/recommendations` - Get AI recommendations (protected)

### Events
- `GET /api/events` - List events (protected)
- `POST /api/events` - Create event (admin only)
- `GET /api/events/:id` - Get event details (protected)
- `POST /api/events/:id/register` - Register for event (protected)

### Jobs
- `GET /api/jobs` - List jobs (protected, with filters)
- `POST /api/jobs` - Create job (admin only)
- `GET /api/jobs/:id` - Get job details (protected)

### Donations
- `POST /api/donations` - Create donation (protected)
- `GET /api/donations/my` - Get user donations (protected)
- `GET /api/donations/stats` - Get statistics (admin only)

### AI Service
- `POST /recommend` - Get recommendations
- `GET /health` - Health check

## AI Recommendation Algorithm

### Current Implementation (MVP - Rule-Based)

```python
def calculate_mentor_score(user_profile, mentor):
    score = 0
    
    # Skill matching (+5 per match)
    for skill in user_profile.skills:
        if skill in mentor.skills:
            score += 5
    
    # Interest matching (+3 per match)
    for interest in user_profile.interests:
        if interest in mentor.interests:
            score += 3
    
    # Grad year proximity (+2 if within 10 years)
    if abs(user_profile.gradYear - mentor.gradYear) <= 10:
        score += 2
    
    # Same company (+4)
    if user_profile.company == mentor.company:
        score += 4
    
    # Same industry (+4)
    if user_profile.industry == mentor.industry:
        score += 4
    
    return score
```

**Scoring System**:
- Max score: ~20+ points
- Threshold for recommendation: score > 0
- Returns top 5 mentors sorted by score

### Future Enhancement (Embeddings-Based)

```python
# Planned upgrade using sentence transformers
from sentence_transformers import SentenceTransformer
import faiss

model = SentenceTransformer('all-MiniLM-L6-v2')

# Create embeddings for user profile
user_embedding = model.encode(user_profile_text)

# Create embeddings for all mentors
mentor_embeddings = model.encode(mentor_profiles)

# Use FAISS for similarity search
index = faiss.IndexFlatL2(embedding_dim)
index.add(mentor_embeddings)
distances, indices = index.search(user_embedding, k=5)
```

## Security Measures

### 1. Authentication & Authorization
- JWT tokens with expiration
- Password hashing with bcrypt (10 rounds)
- Protected routes with middleware
- Role-based access control (admin vs user)

### 2. Input Validation
- express-validator for backend
- Pydantic for AI service
- Client-side validation in frontend

### 3. Data Protection
- Passwords never stored in plain text
- Sensitive fields excluded from API responses
- CORS configured for allowed origins
- Environment variables for secrets

### 4. API Security
- Rate limiting (planned)
- Request size limits
- SQL injection prevention (NoSQL)
- XSS protection

## Performance Considerations

### Current Optimizations
- MongoDB indexing on frequently queried fields
- Pagination for large result sets
- Efficient queries with Mongoose
- Frontend code splitting with Vite

### Scalability Plan
1. **Horizontal Scaling**: Deploy multiple backend instances behind load balancer
2. **Caching**: Add Redis for session management and frequent queries
3. **CDN**: Serve static assets via CDN
4. **Database**: MongoDB replica sets for read scaling
5. **AI Service**: Separate scaling for compute-intensive recommendations

## Monitoring & Logging

### Current Logging
- Console logs for development
- Error logging in backend
- Request/response logging

### Production Monitoring (Planned)
- Application monitoring: Sentry
- Performance monitoring: New Relic
- Log aggregation: LogRocket
- Uptime monitoring: UptimeRobot

## Deployment Architecture

### Development
```
Local Machine
├── MongoDB (Docker or local)
├── Backend (npm run dev)
├── AI Service (uvicorn --reload)
└── Frontend (npm run dev)
```

### Production
```
Cloud Infrastructure
├── MongoDB Atlas (Database)
├── Railway/Heroku (Backend API)
├── Railway/Cloud Run (AI Service)
└── Vercel/Netlify (Frontend)
```

## Error Handling

### Backend
```javascript
// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});
```

### Frontend
```javascript
// API error handling
try {
  const response = await api.get('/endpoint');
} catch (error) {
  if (error.response) {
    // Server responded with error
    setError(error.response.data.error);
  } else {
    // Network error
    setError('Network error. Please try again.');
  }
}
```

## Testing Strategy

### Unit Tests
- Backend: Jest + Supertest
- Frontend: Vitest + React Testing Library
- AI Service: pytest

### Integration Tests
- API endpoint testing
- Database operations
- Authentication flows

### E2E Tests
- User registration flow
- Recommendation generation
- Event registration
- Donation process

## Future Enhancements

1. **Real-time Features**: WebSocket for live notifications
2. **Advanced Search**: Elasticsearch for full-text search
3. **Analytics Dashboard**: Data visualization for admins
4. **Email Notifications**: SendGrid integration
5. **File Uploads**: S3 for profile pictures and documents
6. **Mobile App**: React Native version
7. **Social Features**: Messaging between alumni
8. **Advanced AI**: Embeddings-based recommendations with FAISS

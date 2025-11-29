# Alumni Portal - System Diagrams

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                     http://localhost:5173                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP/REST
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      FRONTEND (React)                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Components: Header, Footer, Card, FormInput, etc.       │  │
│  │  Pages: Login, Register, Dashboard, Profile, etc.        │  │
│  │  Context: AuthContext (JWT token management)             │  │
│  │  Services: API wrapper (axios)                           │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ REST API (JWT Auth)
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    BACKEND (Node.js/Express)                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Routes: auth, users, events, jobs, donations, etc.      │  │
│  │  Middleware: JWT auth, validation, error handling        │  │
│  │  Models: User, Event, Job, Donation (Mongoose)           │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────┬──────────────────────────────┬────────────────────┘
              │                              │
              │ MongoDB Driver               │ HTTP/REST
              │                              │
┌─────────────▼──────────────┐  ┌───────────▼────────────────────┐
│   MongoDB Database         │  │   AI Service (FastAPI)         │
│   - users collection       │  │   - Recommendation algorithm   │
│   - events collection      │  │   - Mentor scoring             │
│   - jobs collection        │  │   - Job matching               │
│   - donations collection   │  │   - Pydantic validation        │
└────────────────────────────┘  └────────────────────────────────┘
```

## Data Flow - User Registration

```
1. User fills registration form
   │
   ▼
2. Frontend validates input
   │
   ▼
3. POST /api/auth/register
   │
   ▼
4. Backend validates data (express-validator)
   │
   ▼
5. Check if email exists in MongoDB
   │
   ├─ Exists → Return 400 error
   │
   └─ New → Continue
      │
      ▼
6. Hash password with bcrypt
   │
   ▼
7. Create user document in MongoDB
   │
   ▼
8. Generate JWT token
   │
   ▼
9. Schedule CRM sync (async)
   │
   ▼
10. Return token + user data
    │
    ▼
11. Frontend stores token in localStorage
    │
    ▼
12. Redirect to profile page
```

## Data Flow - AI Recommendations

```
1. User navigates to Dashboard
   │
   ▼
2. Frontend: POST /api/recommendations (with JWT)
   │
   ▼
3. Backend validates JWT token
   │
   ▼
4. Backend extracts user profile
   │
   ▼
5. Backend: POST to AI Service /recommend
   │
   ▼
6. AI Service receives user profile
   │
   ▼
7. AI Service: Fetch all mentors from Backend
   │
   ▼
8. AI Service: Calculate scores for each mentor
   │   - Skills match: +5 per skill
   │   - Interests match: +3 per interest
   │   - Grad year proximity: +2
   │   - Same company: +4
   │   - Same industry: +4
   │
   ▼
9. AI Service: Sort by score, take top 5
   │
   ▼
10. AI Service: Fetch all jobs from Backend
    │
    ▼
11. AI Service: Calculate job scores
    │   - Skills match tags: +10
    │   - Interests match tags: +5
    │
    ▼
12. AI Service: Sort by score, take top 5
    │
    ▼
13. AI Service: Return recommendations
    │
    ▼
14. Backend: Forward to Frontend
    │
    ▼
15. Frontend: Display mentor and job cards
```

## Authentication Flow

```
┌──────────┐                 ┌──────────┐                 ┌──────────┐
│ Frontend │                 │ Backend  │                 │ MongoDB  │
└────┬─────┘                 └────┬─────┘                 └────┬─────┘
     │                            │                            │
     │ POST /api/auth/login       │                            │
     │ {email, password}          │                            │
     ├───────────────────────────►│                            │
     │                            │                            │
     │                            │ Find user by email         │
     │                            ├───────────────────────────►│
     │                            │                            │
     │                            │ User document              │
     │                            │◄───────────────────────────┤
     │                            │                            │
     │                            │ Compare password (bcrypt)  │
     │                            │                            │
     │                            │ Generate JWT token         │
     │                            │                            │
     │ {token, user}              │                            │
     │◄───────────────────────────┤                            │
     │                            │                            │
     │ Store token in localStorage│                            │
     │                            │                            │
     │ GET /api/users/me          │                            │
     │ Authorization: Bearer token│                            │
     ├───────────────────────────►│                            │
     │                            │                            │
     │                            │ Verify JWT token           │
     │                            │                            │
     │                            │ Find user by ID from token │
     │                            ├───────────────────────────►│
     │                            │                            │
     │                            │ User document              │
     │                            │◄───────────────────────────┤
     │                            │                            │
     │ User profile               │                            │
     │◄───────────────────────────┤                            │
     │                            │                            │
```

## Database Schema

```
┌─────────────────────────────────────────────────────────────┐
│                         USERS                                │
├─────────────────────────────────────────────────────────────┤
│ _id: ObjectId (PK)                                          │
│ name: String                                                │
│ email: String (unique, indexed)                             │
│ password: String (hashed)                                   │
│ gradYear: Number                                            │
│ skills: [String]                                            │
│ interests: [String]                                         │
│ company: String                                             │
│ industry: String                                            │
│ location: String                                            │
│ role: String (enum: 'alumnus', 'admin')                     │
│ optInMentor: Boolean                                        │
│ bio: String                                                 │
│ linkedIn: String                                            │
│ phone: String                                               │
│ crmSynced: Boolean                                          │
│ crmSyncedAt: Date                                           │
│ createdAt: Date                                             │
│ updatedAt: Date                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ 1:N
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│    EVENTS     │    │     JOBS      │    │   DONATIONS   │
├───────────────┤    ├───────────────┤    ├───────────────┤
│ _id: ObjectId │    │ _id: ObjectId │    │ _id: ObjectId │
│ title         │    │ title         │    │ userId (FK)   │
│ description   │    │ company       │    │ amount        │
│ startDate     │    │ description   │    │ currency      │
│ endDate       │    │ location      │    │ status        │
│ location      │    │ type          │    │ paymentMethod │
│ capacity      │    │ tags: [String]│    │ transactionId │
│ attendees: [] │    │ applyUrl      │    │ message       │
│ ticketUrl     │    │ salary        │    │ createdAt     │
│ ticketPrice   │    │ postedBy (FK) │    │ updatedAt     │
│ imageUrl      │    │ active        │    └───────────────┘
│ createdBy(FK) │    │ createdAt     │
│ createdAt     │    │ updatedAt     │
│ updatedAt     │    └───────────────┘
└───────────────┘
```

## Component Hierarchy (Frontend)

```
App
├── Router
│   ├── Header
│   │   └── Navigation Links
│   │
│   ├── Routes
│   │   ├── Login
│   │   │   ├── Card
│   │   │   └── FormInput (x2)
│   │   │
│   │   ├── Register
│   │   │   ├── Card
│   │   │   └── FormInput (x6)
│   │   │
│   │   ├── Dashboard (Protected)
│   │   │   ├── Mentor Recommendations
│   │   │   │   └── Card (x5)
│   │   │   └── Job Recommendations
│   │   │       └── Card (x5)
│   │   │
│   │   ├── Profile (Protected)
│   │   │   ├── Card
│   │   │   └── FormInput (x11)
│   │   │
│   │   ├── MentorList (Protected)
│   │   │   └── Card (xN)
│   │   │
│   │   ├── JobsList (Protected)
│   │   │   ├── Filters
│   │   │   └── Card (xN)
│   │   │
│   │   ├── EventsList (Protected)
│   │   │   └── Card (xN)
│   │   │
│   │   ├── Directory (Protected)
│   │   │   ├── Search Form
│   │   │   │   └── FormInput (x4)
│   │   │   └── Card (xN)
│   │   │
│   │   └── Admin (Protected)
│   │       ├── Tabs
│   │       ├── Create Event Form
│   │       │   └── FormInput (x7)
│   │       └── Post Job Form
│   │           └── FormInput (x8)
│   │
│   └── Footer
│
└── AuthContext (Provider)
    ├── user state
    ├── loading state
    ├── loginUser()
    ├── logout()
    └── refreshUser()
```

## API Endpoint Map

```
/api
├── /auth
│   ├── POST /register      → Create new user
│   └── POST /login         → Authenticate user
│
├── /users
│   ├── GET  /me            → Get current user (protected)
│   ├── PUT  /me            → Update profile (protected)
│   └── GET  /:id           → Get user by ID (protected)
│
├── /directory
│   └── GET  /              → Search alumni (protected, filters)
│
├── /recommendations
│   └── POST /              → Get AI recommendations (protected)
│
├── /events
│   ├── GET  /              → List all events (protected)
│   ├── POST /              → Create event (admin only)
│   ├── GET  /:id           → Get event details (protected)
│   └── POST /:id/register  → Register for event (protected)
│
├── /jobs
│   ├── GET  /              → List all jobs (protected, filters)
│   ├── POST /              → Create job (admin only)
│   └── GET  /:id           → Get job details (protected)
│
└── /donations
    ├── POST /              → Create donation (protected)
    ├── GET  /my            → Get user donations (protected)
    └── GET  /stats         → Get statistics (admin only)
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      PRODUCTION                              │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐
│   Vercel/Netlify │         │  MongoDB Atlas   │
│   (Frontend)     │         │  (Database)      │
│                  │         │                  │
│  - React SPA     │         │  - Managed DB    │
│  - CDN           │         │  - Auto backups  │
│  - SSL           │         │  - Replication   │
└────────┬─────────┘         └────────▲─────────┘
         │                            │
         │ HTTPS                      │ MongoDB Driver
         │                            │
         ▼                            │
┌──────────────────┐         ┌────────┴─────────┐
│  Railway/Heroku  │◄───────►│  Railway/Heroku  │
│  (Backend API)   │  HTTP   │  (AI Service)    │
│                  │         │                  │
│  - Node.js       │         │  - FastAPI       │
│  - Express       │         │  - Python        │
│  - JWT Auth      │         │  - Uvicorn       │
└──────────────────┘         └──────────────────┘
```

## Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                           │
└─────────────────────────────────────────────────────────────┘

Layer 1: Transport Security
├── HTTPS/TLS encryption
└── Secure WebSocket (WSS)

Layer 2: Authentication
├── JWT tokens with expiration
├── Secure token storage (localStorage)
└── Token refresh mechanism

Layer 3: Authorization
├── Role-based access control (RBAC)
├── Protected routes (middleware)
└── Admin-only endpoints

Layer 4: Data Protection
├── Password hashing (bcrypt, 10 rounds)
├── Input validation (express-validator)
├── SQL injection prevention (NoSQL)
└── XSS protection

Layer 5: API Security
├── CORS configuration
├── Rate limiting (planned)
├── Request size limits
└── Error message sanitization

Layer 6: Database Security
├── Connection string in env vars
├── MongoDB authentication
├── Network access restrictions
└── Encrypted connections
```

## Scaling Strategy

```
Current (MVP)                    Future (Scale)
─────────────                    ──────────────

Single Backend Instance    →     Load Balanced Backend
                                 ┌─────────┐
┌─────────┐                     │Backend 1│
│ Backend │                     ├─────────┤
└─────────┘                     │Backend 2│  ← Load Balancer
                                 ├─────────┤
                                 │Backend 3│
                                 └─────────┘

Direct MongoDB             →     MongoDB Replica Set
┌─────────┐                     ┌─────────┐
│ MongoDB │                     │ Primary │
└─────────┘                     ├─────────┤
                                 │Secondary│
                                 ├─────────┤
                                 │Secondary│
                                 └─────────┘

No Caching                 →     Redis Cache Layer
                                 ┌─────────┐
                                 │  Redis  │
                                 └─────────┘
                                      ↕
                                 ┌─────────┐
                                 │ Backend │
                                 └─────────┘

Single AI Service          →     Multiple AI Workers
┌──────────┐                    ┌──────────┐
│AI Service│                    │AI Worker1│
└──────────┘                    ├──────────┤
                                 │AI Worker2│
                                 ├──────────┤
                                 │AI Worker3│
                                 └──────────┘
```

## Monitoring & Observability

```
┌─────────────────────────────────────────────────────────────┐
│                    MONITORING STACK                          │
└─────────────────────────────────────────────────────────────┘

Application Monitoring
├── Sentry (Error tracking)
├── LogRocket (Session replay)
└── New Relic (Performance)

Infrastructure Monitoring
├── UptimeRobot (Uptime checks)
├── CloudWatch (AWS metrics)
└── Datadog (System metrics)

Logging
├── Winston (Backend logs)
├── Console (Frontend logs)
└── CloudWatch Logs (Centralized)

Analytics
├── Google Analytics (User behavior)
├── Mixpanel (Event tracking)
└── Custom dashboard (Admin metrics)
```

---

These diagrams provide a visual understanding of the Alumni Portal's architecture, data flows, and deployment strategy.

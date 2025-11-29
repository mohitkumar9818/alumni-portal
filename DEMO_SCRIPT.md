# Alumni Portal Demo Script

This script demonstrates all key features and acceptance criteria of the Alumni Portal.

## Prerequisites
- All services running (backend, AI service, frontend, MongoDB)
- Clean database or test data loaded

## Demo Flow (15 minutes)

### 1. User Registration & Profile Setup (3 min)

**Acceptance Criteria**: New user registration syncs to CRM within 5 minutes

1. Navigate to http://localhost:5173/register
2. Register new user:
   - Name: "Alice Johnson"
   - Email: "alice@example.com"
   - Password: "password123"
   - Grad Year: 2018
   - Company: "TechCorp"
   - Location: "San Francisco"
3. Verify redirect to profile page
4. Complete profile:
   - Skills: "Python, Machine Learning, React"
   - Interests: "AI, Startups, Education"
   - Check "I want to be a mentor"
   - Add bio and LinkedIn
5. Save profile
6. Check backend logs for CRM sync confirmation (within 5 min)

### 2. AI Mentor Recommendations (4 min)

**Acceptance Criteria**: AI mentor matching suggests ≥3 relevant mentors with >80% perceived relevance

1. Navigate to Dashboard (/)
2. View "Recommended Mentors" section
3. Verify:
   - At least 3 mentors displayed
   - Shared skills/interests shown
   - Match scores visible
   - Relevance >80% (score >15 out of 20 max)
4. Click on mentor to view full profile
5. Navigate to /mentors to see all available mentors

### 3. Job Recommendations (2 min)

1. On Dashboard, view "Recommended Jobs" section
2. Verify jobs match user's skills/interests
3. Navigate to /jobs
4. Filter by job type
5. Click "Apply Now" on a job listing

### 4. Event Registration & Ticket Purchase (3 min)

**Acceptance Criteria**: Event registration + ticket purchase completes within 3 minutes

**Start Timer**

1. Navigate to /events
2. View upcoming events
3. Click "Register" on an event
4. Verify registration success message
5. If event has ticket price:
   - Click payment link
   - Complete mock payment flow
6. Verify attendee count updated

**Stop Timer** - Should be < 3 minutes

### 5. Alumni Directory Search (2 min)

1. Navigate to /directory
2. Search by:
   - Name: partial match
   - Graduation year: 2018
   - Company: "TechCorp"
   - Location: "San Francisco"
3. View filtered results
4. Verify alumni profiles displayed with relevant info

### 6. Admin Functions (1 min)

**Note**: Login as admin user first

1. Navigate to /admin
2. Create new event:
   - Fill in event details
   - Set capacity and ticket price
   - Submit
3. Switch to "Post Job" tab
4. Create new job posting:
   - Fill in job details
   - Add relevant tags
   - Submit
5. Verify new event/job appears in respective lists

### 7. Mobile Donation Flow (< 60 seconds)

**Acceptance Criteria**: Mobile donation completes within 60 seconds

**Start Timer** (Use mobile device or browser dev tools mobile view)

1. Navigate to profile or dedicated donation page
2. Click "Donate" button
3. Enter donation amount: $50
4. Add optional message
5. Click "Donate Now"
6. Redirected to payment URL
7. Complete mock payment

**Stop Timer** - Should be < 60 seconds

## Test Data Setup

### Create Test Mentors (Run before demo)

```bash
# Use Postman or curl to create 5 mentor users with varied profiles
POST /api/auth/register
{
  "name": "Bob Smith",
  "email": "bob@example.com",
  "password": "password123",
  "gradYear": 2015,
  "company": "TechCorp",
  "skills": ["Python", "Machine Learning", "Data Science"],
  "interests": ["AI", "Research"],
  "optInMentor": true
}
```

### Create Test Jobs

```bash
POST /api/jobs (as admin)
{
  "title": "ML Engineer",
  "company": "AI Startup",
  "description": "Looking for ML engineer...",
  "tags": ["Python", "Machine Learning", "TensorFlow"],
  "applyUrl": "https://example.com/apply",
  "type": "Full-time"
}
```

### Create Test Events

```bash
POST /api/events (as admin)
{
  "title": "Alumni Networking Night",
  "description": "Join us for networking...",
  "startDate": "2025-12-15T18:00:00Z",
  "endDate": "2025-12-15T21:00:00Z",
  "location": "San Francisco",
  "capacity": 50,
  "ticketPrice": 25
}
```

## Verification Checklist

- [ ] User registration completes successfully
- [ ] Profile updates save correctly
- [ ] Dashboard shows ≥3 mentor recommendations
- [ ] Mentor match scores >80% relevance
- [ ] Job recommendations match user skills
- [ ] Event registration works
- [ ] Event registration + ticket < 3 minutes
- [ ] Directory search filters work
- [ ] Admin can create events
- [ ] Admin can post jobs
- [ ] Donation flow < 60 seconds on mobile
- [ ] CRM sync occurs within 5 minutes
- [ ] All pages are responsive
- [ ] No console errors

## Performance Metrics

Record these during demo:
- Registration to CRM sync time: _____ seconds
- Event registration + ticket time: _____ seconds
- Mobile donation time: _____ seconds
- Number of mentor recommendations: _____
- Average mentor match score: _____

## Troubleshooting

If AI recommendations don't show:
1. Check AI service is running (http://localhost:8000/health)
2. Verify backend can reach AI service
3. Check user has skills/interests in profile
4. Ensure mentor users exist with optInMentor=true

If events/jobs don't appear:
1. Verify admin user role
2. Check MongoDB connection
3. Verify data was created successfully

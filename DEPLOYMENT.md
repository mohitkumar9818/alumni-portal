# Deployment Guide

## Production Deployment

### 1. MongoDB Atlas Setup

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create new cluster (free tier available)
3. Configure network access (allow your app IPs)
4. Create database user
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/alumni_portal`

### 2. Backend Deployment (Railway/Heroku)

#### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
cd backend
railway init

# Add environment variables in Railway dashboard:
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secure_secret_min_32_chars
AI_SERVICE_URL=https://your-ai-service.railway.app
NODE_ENV=production

# Deploy
railway up
```

#### Heroku

```bash
# Install Heroku CLI
# Login
heroku login

# Create app
cd backend
heroku create alumni-portal-api

# Set environment variables
heroku config:set MONGO_URI=mongodb+srv://...
heroku config:set JWT_SECRET=your_secure_secret
heroku config:set AI_SERVICE_URL=https://your-ai-service.herokuapp.com

# Deploy
git push heroku main
```

### 3. AI Service Deployment (Railway/Cloud Run)

#### Railway

```bash
cd ai-service
railway init

# Add environment variables:
BACKEND_URL=https://your-backend.railway.app

railway up
```

#### Google Cloud Run

```bash
# Build and push Docker image
gcloud builds submit --tag gcr.io/PROJECT_ID/alumni-ai-service

# Deploy
gcloud run deploy alumni-ai-service \
  --image gcr.io/PROJECT_ID/alumni-ai-service \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars BACKEND_URL=https://your-backend.com
```

### 4. Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

cd frontend

# Deploy
vercel

# Set environment variables in Vercel dashboard:
VITE_API_URL=https://your-backend.railway.app
VITE_AI_SERVICE_URL=https://your-ai-service.railway.app

# Production deployment
vercel --prod
```

#### Netlify Alternative

```bash
# Build
npm run build

# Deploy via Netlify CLI or drag-and-drop dist/ folder
# Set environment variables in Netlify dashboard
```

### 5. Environment Variables Summary

#### Backend
```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/alumni_portal
JWT_SECRET=your_secure_random_string_min_32_characters
JWT_EXPIRE=7d
AI_SERVICE_URL=https://your-ai-service-url.com
STRIPE_SECRET_KEY=sk_live_your_stripe_key
CRM_API_URL=https://your-crm-api.com
CRM_API_KEY=your_crm_api_key
```

#### AI Service
```
BACKEND_URL=https://your-backend-url.com
```

#### Frontend
```
VITE_API_URL=https://your-backend-url.com
VITE_AI_SERVICE_URL=https://your-ai-service-url.com
```

## Docker Deployment

### Build Images

```bash
# Backend
cd backend
docker build -t alumni-backend .

# AI Service
cd ai-service
docker build -t alumni-ai-service .

# Frontend
cd frontend
docker build -t alumni-frontend .
```

### Deploy with Docker Compose (VPS/VM)

```bash
# Update docker-compose.yml with production settings
# Set environment variables in .env file

docker-compose -f docker-compose.prod.yml up -d
```

### Production docker-compose.yml

```yaml
version: '3.8'

services:
  backend:
    image: alumni-backend
    restart: always
    environment:
      - NODE_ENV=production
      - MONGO_URI=${MONGO_URI}
      - JWT_SECRET=${JWT_SECRET}
      - AI_SERVICE_URL=http://ai-service:8000
    ports:
      - "5000:5000"
    depends_on:
      - ai-service

  ai-service:
    image: alumni-ai-service
    restart: always
    environment:
      - BACKEND_URL=http://backend:5000
    ports:
      - "8000:8000"

  frontend:
    image: alumni-frontend
    restart: always
    environment:
      - VITE_API_URL=https://your-domain.com
    ports:
      - "80:80"
    depends_on:
      - backend
```

## SSL/HTTPS Setup

### Using Caddy (Automatic HTTPS)

```bash
# Install Caddy
# Create Caddyfile

your-domain.com {
    reverse_proxy localhost:5173
}

api.your-domain.com {
    reverse_proxy localhost:5000
}

ai.your-domain.com {
    reverse_proxy localhost:8000
}
```

### Using Nginx + Let's Encrypt

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com -d api.your-domain.com

# Nginx config
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:5173;
    }
}
```

## Monitoring & Logging

### Setup Application Monitoring

1. **Sentry** for error tracking
2. **LogRocket** for session replay
3. **Google Analytics** for usage metrics

### Health Checks

```bash
# Backend
curl https://api.your-domain.com/health

# AI Service
curl https://ai.your-domain.com/health
```

## Backup Strategy

### MongoDB Backups

```bash
# Automated daily backups with MongoDB Atlas
# Or manual backup:
mongodump --uri="mongodb+srv://..." --out=/backup/$(date +%Y%m%d)
```

## Security Checklist

- [ ] HTTPS enabled on all services
- [ ] Environment variables secured (not in code)
- [ ] MongoDB network access restricted
- [ ] JWT secret is strong and unique
- [ ] CORS configured for production domains only
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] Passwords hashed with bcrypt
- [ ] Dependencies updated regularly
- [ ] Security headers configured (helmet.js)

## Post-Deployment Testing

1. Test user registration flow
2. Verify AI recommendations work
3. Test event registration
4. Verify donation flow
5. Check mobile responsiveness
6. Test all API endpoints
7. Monitor error logs
8. Check performance metrics

## Rollback Plan

```bash
# Railway/Heroku: Rollback to previous deployment
railway rollback
# or
heroku rollback

# Docker: Use previous image tag
docker-compose down
docker-compose up -d --build
```

## Cost Estimates (Monthly)

- MongoDB Atlas (Free tier): $0
- Railway/Heroku (Hobby): $5-10
- Vercel (Hobby): $0
- Domain: $10-15
- **Total**: ~$15-25/month for MVP

## Scaling Considerations

- Use Redis for session management
- Implement CDN for static assets
- Add load balancer for multiple backend instances
- Use MongoDB replica sets
- Implement caching layer
- Add queue system for background jobs (Bull/Redis)

# 🚀 Deploy Alumni Portal to Vercel + Render

## Overview

This guide will help you deploy your Alumni Portal to the cloud:
- **Frontend** → Vercel (Free)
- **Backend** → Render (Free)
- **AI Service** → Render (Free)
- **Database** → MongoDB Atlas (Already deployed!)

**Total Cost: FREE** 🎉

---

## 📋 Prerequisites

- ✅ GitHub account
- ✅ Vercel account (sign up at vercel.com)
- ✅ Render account (sign up at render.com)
- ✅ Your project code
- ✅ MongoDB Atlas already set up

---

## Part 1: Prepare Your Project

### Step 1: Push to GitHub

1. **Create a GitHub repository**
   - Go to https://github.com/new
   - Name: `alumni-portal`
   - Make it public or private

2. **Push your code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/alumni-portal.git
   git push -u origin main
   ```

### Step 2: Update Environment Variables

Create production environment files:

**backend/.env.production**
```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_min_32_characters
JWT_EXPIRE=7d
AI_SERVICE_URL=https://your-ai-service.onrender.com
GEMINI_API_KEY=your_gemini_api_key
```

**frontend/.env.production**
```env
VITE_API_URL=https://your-backend.onrender.com
```

---

## Part 2: Deploy Backend to Render

### Step 1: Create Render Account
1. Go to https://render.com/
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 2: Deploy Backend

1. **Click "New +"** → **"Web Service"**

2. **Connect Repository**
   - Select your `alumni-portal` repository
   - Click "Connect"

3. **Configure Service**
   ```
   Name: alumni-portal-backend
   Region: Choose closest to you
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable"
   
   Add these:
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   GEMINI_API_KEY=your_gemini_api_key
   ```

5. **Select Plan**
   - Choose "Free" plan
   - Click "Create Web Service"

6. **Wait for Deployment**
   - Takes 2-5 minutes
   - You'll get a URL like: `https://alumni-portal-backend.onrender.com`

7. **Test Backend**
   ```
   https://your-backend.onrender.com/health
   ```
   Should return: `{"status":"ok"}`

---

## Part 3: Deploy AI Service to Render

### Step 1: Create Another Web Service

1. **Click "New +"** → **"Web Service"**

2. **Connect Same Repository**

3. **Configure Service**
   ```
   Name: alumni-portal-ai
   Region: Same as backend
   Branch: main
   Root Directory: ai-service
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn app:app --host 0.0.0.0 --port $PORT
   ```

4. **Add Environment Variables**
   ```
   GEMINI_API_KEY=your_gemini_api_key
   ```

5. **Create Service**
   - Choose "Free" plan
   - Wait for deployment
   - Get URL: `https://alumni-portal-ai.onrender.com`

---

## Part 4: Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to https://vercel.com/
2. Sign up with GitHub
3. Authorize Vercel

### Step 2: Deploy Frontend

1. **Click "Add New..."** → **"Project"**

2. **Import Repository**
   - Select `alumni-portal`
   - Click "Import"

3. **Configure Project**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install --legacy-peer-deps
   ```

4. **Add Environment Variables**
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Get URL: `https://alumni-portal.vercel.app`

---

## Part 5: Update Backend CORS

### Update backend/server.js

Add your Vercel URL to CORS:

```javascript
const cors = require('cors');

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://alumni-portal.vercel.app',
        'https://your-custom-domain.com'
    ],
    credentials: true
}));
```

Commit and push:
```bash
git add .
git commit -m "Update CORS for production"
git push
```

Render will auto-deploy the update!

---

## Part 6: Test Your Deployment

### Test Checklist:

1. **Frontend**
   - ✅ Visit your Vercel URL
   - ✅ Page loads correctly
   - ✅ No console errors

2. **Backend**
   - ✅ Visit `https://your-backend.onrender.com/health`
   - ✅ Returns `{"status":"ok"}`

3. **Registration**
   - ✅ Create a new account
   - ✅ Receive success message

4. **Login**
   - ✅ Login with credentials
   - ✅ Redirected to dashboard

5. **Dashboard**
   - ✅ All components load
   - ✅ KPI cards display
   - ✅ Leaderboard shows data

6. **AI Chat**
   - ✅ Open AI widget
   - ✅ Send a message
   - ✅ Receive response

---

## 🎯 Your Deployed URLs

After deployment, you'll have:

```
Frontend:  https://alumni-portal.vercel.app
Backend:   https://alumni-portal-backend.onrender.com
AI Service: https://alumni-portal-ai.onrender.com
Database:  MongoDB Atlas (already deployed)
```

---

## 🔧 Troubleshooting

### Frontend can't connect to backend
**Solution**: Check VITE_API_URL in Vercel environment variables

### Backend returns 500 errors
**Solution**: Check Render logs for errors
- Go to Render dashboard
- Click on your service
- View "Logs" tab

### CORS errors
**Solution**: Make sure Vercel URL is in CORS whitelist

### MongoDB connection fails
**Solution**: 
- Check MONGO_URI in Render environment variables
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### AI Service not responding
**Solution**: Check AI service logs on Render

---

## 💰 Cost Breakdown

### Free Tier Limits:

**Vercel (Frontend)**
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains

**Render (Backend + AI)**
- ✅ 750 hours/month (enough for 1 service 24/7)
- ✅ Automatic HTTPS
- ✅ Auto-deploy from GitHub
- ⚠️ Spins down after 15 min inactivity (free tier)
- ⚠️ Cold start: 30-60 seconds

**MongoDB Atlas**
- ✅ 512 MB storage
- ✅ Shared cluster
- ✅ Enough for development/small production

**Total: $0/month** 🎉

---

## 🚀 Upgrade Options

### When to Upgrade?

**Render ($7/month per service)**
- No cold starts
- Always running
- Better performance

**Vercel Pro ($20/month)**
- More bandwidth
- Better analytics
- Team features

**MongoDB Atlas ($9/month)**
- More storage
- Better performance
- Backups

---

## 📈 Monitoring

### Vercel Analytics
- Go to your project dashboard
- Click "Analytics"
- See visitor stats, performance

### Render Logs
- Go to service dashboard
- Click "Logs"
- See real-time logs

### MongoDB Atlas Monitoring
- Go to Atlas dashboard
- Click "Metrics"
- See database performance

---

## 🔄 Continuous Deployment

### Automatic Updates:

1. **Make changes locally**
2. **Commit and push to GitHub**
   ```bash
   git add .
   git commit -m "Update feature"
   git push
   ```
3. **Automatic deployment**
   - Vercel auto-deploys frontend
   - Render auto-deploys backend
   - Takes 2-5 minutes

---

## 🎯 Custom Domain (Optional)

### Add Your Own Domain:

**Vercel (Frontend)**
1. Go to project settings
2. Click "Domains"
3. Add your domain
4. Update DNS records

**Render (Backend)**
1. Go to service settings
2. Click "Custom Domain"
3. Add your domain
4. Update DNS records

---

## ✅ Deployment Checklist

Before going live:

- [ ] Push code to GitHub
- [ ] Deploy backend to Render
- [ ] Deploy AI service to Render
- [ ] Deploy frontend to Vercel
- [ ] Update CORS settings
- [ ] Test all features
- [ ] Check environment variables
- [ ] Test on mobile devices
- [ ] Monitor logs for errors
- [ ] Set up custom domain (optional)

---

## 🎉 You're Live!

Your Alumni Portal is now deployed and accessible worldwide!

**Share your URL**: `https://alumni-portal.vercel.app`

---

## 📚 Additional Resources

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com/

---

**Need help?** Check the logs or let me know! 🚀

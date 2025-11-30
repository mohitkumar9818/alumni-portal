# 🚀 Deployment Guide: Vercel + Render

This guide will walk you through deploying your Alumni Portal to production.

## Architecture
- **Frontend**: Vercel (React + Vite)
- **Backend API**: Render (Node.js + Express)
- **AI Service**: Render (Python + FastAPI)
- **Database**: MongoDB Atlas (already configured)

---

## 📋 Prerequisites

1. **GitHub Account** - Your code needs to be in a GitHub repository
2. **Vercel Account** - Sign up at https://vercel.com
3. **Render Account** - Sign up at https://render.com
4. **MongoDB Atlas** - Already configured (from your .env)

---

## 🗂️ Step 1: Push Code to GitHub

If you haven't already:

```bash
git init
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## 🎨 Step 2: Deploy Frontend to Vercel

### 2.1 Import Project
1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect it as a Vite project

### 2.2 Configure Build Settings
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 2.3 Add Environment Variables
Click **"Environment Variables"** and add:

```
VITE_API_URL=https://alumni-portal-backend.onrender.com
```

**Note**: You'll update this URL after deploying the backend in Step 3.

### 2.4 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://your-project.vercel.app`

---

## 🔧 Step 3: Deploy Backend to Render

### 3.1 Create Web Service
1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:

**Basic Settings:**
- **Name**: `alumni-portal-backend`
- **Region**: Oregon (US West) or closest to you
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

**Instance Type:**
- Select **"Free"** plan

### 3.2 Add Environment Variables
Click **"Environment"** tab and add these variables:

```
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://mohit753287_db_user:753287%40Mohit@alumniportal.i4ztxmh.mongodb.net/alumni_portal?retryWrites=true&w=majority&appName=AlumniPortal
JWT_SECRET=your_jwt_secret_change_in_production_min_32_chars_12345
JWT_EXPIRE=7d
GEMINI_API_KEY=AIzaSyDZhkFc_JZG0FxQGkjRH2d80q6GRvqjEXQ
AI_SERVICE_URL=https://alumni-portal-ai.onrender.com
```

**⚠️ IMPORTANT SECURITY NOTES:**
- Change `JWT_SECRET` to a new random 32+ character string
- Consider rotating your `GEMINI_API_KEY` for production
- Update MongoDB password if needed

### 3.3 Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. You'll get a URL like: `https://alumni-portal-backend.onrender.com`

### 3.4 Test Backend
Visit: `https://alumni-portal-backend.onrender.com/api/health`

You should see: `{"status":"ok"}`

---

## 🤖 Step 4: Deploy AI Service to Render

### 4.1 Create Another Web Service
1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Connect same GitHub repository
3. Configure:

**Basic Settings:**
- **Name**: `alumni-portal-ai`
- **Region**: Same as backend (Oregon)
- **Branch**: `main`
- **Root Directory**: `ai-service`
- **Runtime**: Python 3
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn app:app --host 0.0.0.0 --port 10000`

**Instance Type:**
- Select **"Free"** plan

### 4.2 Add Environment Variables
```
BACKEND_URL=https://alumni-portal-backend.onrender.com
```

### 4.3 Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes
3. You'll get a URL like: `https://alumni-portal-ai.onrender.com`

### 4.4 Test AI Service
Visit: `https://alumni-portal-ai.onrender.com/health`

You should see: `{"status":"healthy","timestamp":"..."}`

---

## 🔄 Step 5: Update Frontend with Backend URL

### 5.1 Update Vercel Environment Variable
1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Update `VITE_API_URL` to your actual backend URL:
   ```
   VITE_API_URL=https://alumni-portal-backend.onrender.com
   ```
4. Click **"Save"**

### 5.2 Redeploy Frontend
1. Go to **"Deployments"** tab
2. Click the three dots on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

---

## 🔐 Step 6: Configure MongoDB Atlas Network Access

Your MongoDB needs to allow connections from Render:

1. Go to https://cloud.mongodb.com
2. Click **"Network Access"** in left sidebar
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Click **"Confirm"**

**Note**: For better security, you can add specific Render IP ranges instead.

---

## ✅ Step 7: Test Your Deployment

### 7.1 Test Frontend
Visit your Vercel URL: `https://your-project.vercel.app`

### 7.2 Test Full Flow
1. **Register** a new account
2. **Login** with credentials
3. Check **Dashboard** loads
4. Test **AI Chat** feature
5. Check **Leaderboard** displays

### 7.3 Check All Services
- Frontend: `https://your-project.vercel.app`
- Backend: `https://alumni-portal-backend.onrender.com/api/health`
- AI Service: `https://alumni-portal-ai.onrender.com/health`

---

## 🐛 Troubleshooting

### Frontend shows "Failed to load"
- Check browser console for errors
- Verify `VITE_API_URL` is set correctly in Vercel
- Make sure backend is running

### Backend not responding
- Check Render logs: Dashboard → Logs tab
- Verify MongoDB connection string is correct
- Check all environment variables are set

### AI Service errors
- Check Render logs for Python errors
- Verify `BACKEND_URL` points to correct backend
- Ensure requirements.txt installed correctly

### CORS errors
- Backend already has CORS configured for all origins
- If issues persist, check backend logs

### MongoDB connection failed
- Verify Network Access allows 0.0.0.0/0
- Check connection string is URL-encoded
- Test connection from Render logs

---

## 📊 Free Tier Limitations

**Render Free Tier:**
- Services spin down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free (enough for 1 service 24/7)

**Vercel Free Tier:**
- 100 GB bandwidth/month
- Unlimited deployments
- Always-on (no spin-down)

**MongoDB Atlas Free Tier:**
- 512 MB storage
- Shared cluster
- Good for development/small apps

---

## 🚀 Going to Production

For production use, consider:

1. **Upgrade Render plans** to prevent spin-down
2. **Use custom domain** on Vercel
3. **Rotate secrets** (JWT_SECRET, API keys)
4. **Set up monitoring** (Render has built-in metrics)
5. **Configure MongoDB IP whitelist** properly
6. **Enable HTTPS** (automatic on both platforms)
7. **Set up CI/CD** (auto-deploy on git push)

---

## 📝 Quick Reference

### Your URLs (update after deployment)
```
Frontend:  https://your-project.vercel.app
Backend:   https://alumni-portal-backend.onrender.com
AI Service: https://alumni-portal-ai.onrender.com
```

### Important Commands
```bash
# Local development
npm run dev          # Frontend
node server.js       # Backend
uvicorn app:app      # AI Service

# Deploy updates
git push origin main  # Auto-deploys to Vercel & Render
```

---

## ✨ Success!

Your Alumni Portal is now live! 🎉

Share your frontend URL with users and start testing in production.

**Need help?** Check the logs in Render/Vercel dashboards or review the troubleshooting section above.

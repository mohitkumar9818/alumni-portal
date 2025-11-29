# 🚀 Deploy Now - Step by Step Guide

## You Chose: Vercel + Render (Free Forever)

Follow these steps **exactly** in order:

---

## ✅ STEP 1: Push to GitHub (5 minutes)

### 1.1 Create GitHub Repository

1. Open your browser
2. Go to: **https://github.com/new**
3. Repository name: `alumni-portal`
4. Description: `Alumni Portal - Full Stack Application`
5. Keep it **Public** (or Private if you prefer)
6. **DO NOT** initialize with README
7. Click **"Create repository"**

### 1.2 Push Your Code

Open a **NEW terminal** (not the ones running your app) and run these commands:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Alumni Portal ready for deployment"

# Add remote (REPLACE YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/alumni-portal.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Wait for upload to complete** (may take 1-2 minutes)

✅ **Verify:** Go to your GitHub repo URL and see all files uploaded

---

## ✅ STEP 2: Deploy Backend to Render (5 minutes)

### 2.1 Sign Up for Render

1. Go to: **https://render.com**
2. Click **"Get Started"**
3. Click **"Sign up with GitHub"**
4. Authorize Render to access your GitHub

### 2.2 Create Web Service

1. Click **"New +"** (top right)
2. Select **"Web Service"**
3. Click **"Connect a repository"**
4. Find and select your **`alumni-portal`** repo
5. Click **"Connect"**

### 2.3 Configure Backend

Fill in these settings:

**Name:** `alumni-portal-backend`

**Region:** `Oregon (US West)` (or closest to you)

**Root Directory:** `backend`

**Environment:** `Node`

**Build Command:** `npm install`

**Start Command:** `node server.js`

**Plan:** Select **"Free"**

### 2.4 Add Environment Variables

Click **"Advanced"** → Scroll to **"Environment Variables"**

Add these variables one by one (click "Add Environment Variable" for each):

```
Key: NODE_ENV
Value: production

Key: PORT
Value: 5000

Key: MONGO_URI
Value: mongodb+srv://mohit753287_db_user:753287%40Mohit@alumniportal.i4ztxmh.mongodb.net/alumni_portal?retryWrites=true&w=majority&appName=AlumniPortal

Key: JWT_SECRET
Value: your_jwt_secret_change_in_production_min_32_chars_12345

Key: JWT_EXPIRE
Value: 7d

Key: GEMINI_API_KEY
Value: [YOUR_GEMINI_API_KEY_HERE]
```

**IMPORTANT:** Replace `[YOUR_GEMINI_API_KEY_HERE]` with your actual Gemini API key!

### 2.5 Deploy Backend

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. Watch the logs - should see "MongoDB Connected" and "Server running on port 5000"
4. Once deployed, you'll see a green **"Live"** badge
5. **COPY YOUR BACKEND URL** (looks like: `https://alumni-portal-backend.onrender.com`)

✅ **Verify:** Click on your backend URL and add `/health` - should show `{"status":"ok"}`

---

## ✅ STEP 3: Update Frontend Configuration (1 minute)

### 3.1 Update Production Environment File

The file `frontend/.env.production` already exists. Update it with your backend URL:

```
VITE_API_URL=https://alumni-portal-backend.onrender.com
```

**REPLACE** `https://alumni-portal-backend.onrender.com` with **YOUR ACTUAL BACKEND URL** from Step 2.5

### 3.2 Commit and Push

```bash
git add frontend/.env.production
git commit -m "Update backend URL for production"
git push origin main
```

---

## ✅ STEP 4: Deploy Frontend to Vercel (5 minutes)

### 4.1 Sign Up for Vercel

1. Go to: **https://vercel.com**
2. Click **"Sign Up"**
3. Click **"Continue with GitHub"**
4. Authorize Vercel

### 4.2 Import Project

1. Click **"Add New..."** → **"Project"**
2. Find your **`alumni-portal`** repository
3. Click **"Import"**

### 4.3 Configure Frontend

**Framework Preset:** Should auto-detect as **"Vite"** ✅

**Root Directory:** Click **"Edit"** → Enter: `frontend`

**Build Command:** `npm run build` (should be auto-filled)

**Output Directory:** `dist` (should be auto-filled)

### 4.4 Add Environment Variable

Click **"Environment Variables"** section

Add this variable:

```
Key: VITE_API_URL
Value: https://alumni-portal-backend.onrender.com
```

**REPLACE** with **YOUR ACTUAL BACKEND URL** from Step 2.5

### 4.5 Deploy Frontend

1. Click **"Deploy"**
2. Wait 2-3 minutes for build and deployment
3. Watch the build logs
4. Once complete, you'll see **"Congratulations!"** 🎉
5. **COPY YOUR FRONTEND URL** (looks like: `https://alumni-portal.vercel.app`)

✅ **Verify:** Click "Visit" to open your live app!

---

## ✅ STEP 5: Update CORS (2 minutes)

### 5.1 Add Frontend URL to Backend

1. Go back to **Render Dashboard**
2. Click on your **`alumni-portal-backend`** service
3. Go to **"Environment"** tab
4. Click **"Add Environment Variable"**
5. Add:
   ```
   Key: FRONTEND_URL
   Value: https://alumni-portal.vercel.app
   ```
   **REPLACE** with **YOUR ACTUAL FRONTEND URL** from Step 4.5

6. Click **"Save Changes"**
7. Backend will automatically redeploy (wait 1-2 minutes)

---

## ✅ STEP 6: Test Your Deployed App (2 minutes)

### 6.1 Open Your App

Go to your frontend URL: `https://alumni-portal.vercel.app`

### 6.2 Test Login

1. You should see the login page
2. Login with:
   ```
   Email: sarah@example.com
   Password: password123
   ```

### 6.3 Test Features

- ✅ Dashboard loads
- ✅ Events page shows events
- ✅ Jobs page shows jobs
- ✅ Mentors page shows mentors
- ✅ Leaderboard shows rankings
- ✅ AI Assistant responds to questions

---

## 🎉 YOU'RE DONE!

Your Alumni Portal is now **LIVE** and accessible worldwide!

**Your URLs:**
- **Frontend:** https://alumni-portal.vercel.app
- **Backend:** https://alumni-portal-backend.onrender.com

**Share the frontend URL with anyone!**

---

## 📊 What You Got

✅ **Free hosting** (forever)
✅ **Automatic HTTPS/SSL**
✅ **Global CDN** (fast worldwide)
✅ **Auto-deployments** (push to GitHub = auto-deploy)
✅ **Custom domain support** (can add later)

---

## 🔄 Future Updates

To update your app:

```bash
# Make changes to your code
git add .
git commit -m "Your update message"
git push origin main
```

Both Vercel and Render will **automatically redeploy**!

---

## ⚠️ IMPORTANT NOTES

### Render Free Tier Limitations:
- Backend **sleeps after 15 minutes** of inactivity
- First request after sleep takes **30-60 seconds** to wake up
- This is normal for free tier

### To Keep Backend Awake (Optional):
Use a service like **UptimeRobot** (free) to ping your backend every 10 minutes:
- Sign up at: https://uptimerobot.com
- Add monitor: Your backend URL + `/health`
- Interval: 10 minutes

---

## 🆘 Troubleshooting

### Backend not connecting to MongoDB?
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify `MONGO_URI` in Render environment variables

### Frontend shows "Network Error"?
- Check `VITE_API_URL` in Vercel environment variables
- Verify backend is running (check Render logs)
- Make sure CORS is configured (Step 5)

### AI Assistant not working?
- Verify `GEMINI_API_KEY` in Render environment variables
- Check backend logs for API errors

### Login not working?
- Check backend logs in Render dashboard
- Verify MongoDB connection
- Try seeding database again (see below)

---

## 🌱 Seed Production Database (Optional)

If you need to add data to production:

### Option 1: Use Render Shell
1. Go to Render Dashboard → Your backend service
2. Click **"Shell"** tab
3. Run:
   ```bash
   node scripts/seed.js
   node scripts/seedLeaderboard.js
   ```

### Option 2: Run Locally
Your local seed scripts will seed the production MongoDB (same Atlas cluster).

---

## 📱 Share Your App

Your app is now live! Share this URL:

**https://alumni-portal.vercel.app**

Anyone can:
- Register for an account
- Login and explore
- Use all features
- Access from anywhere in the world

---

## 🎯 Next Steps

1. ✅ Test all features thoroughly
2. ✅ Share with friends/colleagues
3. ✅ Add custom domain (optional)
4. ✅ Set up monitoring
5. ✅ Collect feedback

---

**Congratulations! Your Alumni Portal is deployed! 🚀**

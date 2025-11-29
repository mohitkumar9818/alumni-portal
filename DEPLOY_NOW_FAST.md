# 🚀 Deploy Your Alumni Portal in 15 Minutes

## Fastest Method: Vercel + Render

### Prerequisites (Already Done ✅)
- ✅ MongoDB Atlas (already configured)
- ✅ Code is working locally
- ✅ Environment variables ready

---

## STEP 1: Push to GitHub (5 minutes)

### 1.1 Create .gitignore (if not exists)
Already exists! Just verify it includes:
```
node_modules/
.env
*.log
```

### 1.2 Initialize Git and Push
```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Alumni Portal"

# Create repo on GitHub (go to github.com/new)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/alumni-portal.git
git branch -M main
git push -u origin main
```

---

## STEP 2: Deploy Backend to Render (5 minutes)

### 2.1 Go to Render
1. Visit: https://render.com
2. Sign up with GitHub (free)
3. Click "New +" → "Web Service"

### 2.2 Connect Repository
1. Select your `alumni-portal` repo
2. Configure:
   - **Name:** `alumni-portal-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free

### 2.3 Add Environment Variables
Click "Advanced" → "Add Environment Variable":

```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://mohit753287_db_user:753287%40Mohit@alumniportal.i4ztxmh.mongodb.net/alumni_portal?retryWrites=true&w=majority&appName=AlumniPortal
JWT_SECRET=your_jwt_secret_change_in_production_min_32_chars_12345
JWT_EXPIRE=7d
GEMINI_API_KEY=YOUR_NEW_API_KEY_HERE
```

### 2.4 Deploy
1. Click "Create Web Service"
2. Wait 3-5 minutes for deployment
3. Copy your backend URL (e.g., `https://alumni-portal-backend.onrender.com`)

---

## STEP 3: Deploy Frontend to Vercel (5 minutes)

### 3.1 Create Frontend .env
Create `frontend/.env.production`:
```
VITE_API_URL=https://alumni-portal-backend.onrender.com
```

### 3.2 Go to Vercel
1. Visit: https://vercel.com
2. Sign up with GitHub (free)
3. Click "Add New" → "Project"

### 3.3 Import Repository
1. Select your `alumni-portal` repo
2. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 3.4 Add Environment Variable
In "Environment Variables":
```
VITE_API_URL=https://alumni-portal-backend.onrender.com
```

### 3.5 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Get your live URL (e.g., `https://alumni-portal.vercel.app`)

---

## STEP 4: Update CORS (2 minutes)

### 4.1 Update Backend CORS
In Render dashboard, add environment variable:
```
FRONTEND_URL=https://alumni-portal.vercel.app
```

### 4.2 Update backend/server.js
Already configured! The CORS is set to allow all origins in development.

For production, update:
```javascript
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));
```

Commit and push - Render will auto-deploy.

---

## STEP 5: Seed Production Database (2 minutes)

### Option A: Use Render Shell
1. In Render dashboard → Your service
2. Click "Shell" tab
3. Run:
```bash
node scripts/seed.js
node scripts/seedLeaderboard.js
```

### Option B: Run Locally
Your local seed scripts will seed the production MongoDB (since it's the same Atlas cluster).

---

## ✅ VERIFICATION

### Test Backend
```bash
curl https://alumni-portal-backend.onrender.com/health
```
Should return: `{"status":"ok"}`

### Test Frontend
Visit: `https://alumni-portal.vercel.app`
- Should load login page
- Login with: sarah@example.com / password123
- All features should work!

---

## 🎯 DEPLOYMENT CHECKLIST

- [ ] Code pushed to GitHub
- [ ] Backend deployed to Render
- [ ] Environment variables added to Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables added to Vercel
- [ ] CORS configured
- [ ] Database seeded
- [ ] Tested login and features
- [ ] AI Assistant working

---

## 🔧 TROUBLESHOOTING

### Backend not connecting to MongoDB?
- Check MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Verify MONGO_URI in Render environment variables

### Frontend can't reach backend?
- Check VITE_API_URL in Vercel
- Verify backend is running (check Render logs)
- Check CORS settings

### AI Assistant not working?
- Verify GEMINI_API_KEY in Render environment variables
- Check backend logs for API errors

---

## 💰 COST

**Total: $0/month (Free Tier)**

- Render Free: 750 hours/month
- Vercel Free: Unlimited
- MongoDB Atlas Free: 512MB storage

**Note:** Render free tier sleeps after 15 min of inactivity. First request takes 30-60 seconds to wake up.

---

## 🚀 FASTER ALTERNATIVES

### If you need instant deployment:

**Railway** (Easiest - 10 minutes total):
1. Visit railway.app
2. "New Project" → "Deploy from GitHub"
3. Select repo
4. Add environment variables
5. Done! Both frontend and backend deployed

**Netlify** (Similar to Vercel):
- Same process as Vercel
- Slightly different UI
- Also free tier

---

## 📱 YOUR LIVE URLS

After deployment, you'll have:

**Frontend:** `https://alumni-portal.vercel.app`
**Backend:** `https://alumni-portal-backend.onrender.com`
**Database:** MongoDB Atlas (already running)

Share the frontend URL with anyone!

---

## 🔄 AUTO-DEPLOYMENT

Both Vercel and Render support auto-deployment:
- Push to GitHub → Automatic deployment
- No manual steps needed
- See deployment status in dashboards

---

## 📊 MONITORING

**Render Dashboard:**
- View logs
- Monitor CPU/Memory
- See request metrics

**Vercel Dashboard:**
- View deployment history
- Monitor performance
- See analytics

---

## 🎉 YOU'RE DONE!

Your Alumni Portal is now live and accessible worldwide!

**Next Steps:**
1. Share the URL with users
2. Monitor logs for issues
3. Add custom domain (optional)
4. Set up monitoring/alerts

---

**Estimated Total Time: 15-20 minutes** ⚡

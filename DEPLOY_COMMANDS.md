# 🚀 Quick Deploy Commands

Copy and paste these commands to deploy your project.

## Step 1: Prepare Git Repository

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create main branch
git branch -M main

# Add your GitHub repository (REPLACE WITH YOUR REPO URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git push -u origin main
```

---

## Step 2: Deploy Backend on Render

**Manual Steps in Render Dashboard:**

1. Go to: https://dashboard.render.com
2. Click: **New +** → **Web Service**
3. Connect your GitHub repo
4. Fill in:
   - **Name**: `alumni-portal-backend`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free

5. Add Environment Variables:
```
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://mohit753287_db_user:753287%40Mohit@alumniportal.i4ztxmh.mongodb.net/alumni_portal?retryWrites=true&w=majority&appName=AlumniPortal
JWT_SECRET=CHANGE_THIS_TO_RANDOM_32_CHARS_STRING_NOW
JWT_EXPIRE=7d
GEMINI_API_KEY=AIzaSyDZhkFc_JZG0FxQGkjRH2d80q6GRvqjEXQ
AI_SERVICE_URL=https://alumni-portal-ai.onrender.com
```

6. Click **Create Web Service**
7. Wait 5-10 minutes
8. **Copy your backend URL** (e.g., `https://alumni-portal-backend.onrender.com`)

---

## Step 3: Deploy AI Service on Render

**Manual Steps in Render Dashboard:**

1. Click: **New +** → **Web Service**
2. Connect same GitHub repo
3. Fill in:
   - **Name**: `alumni-portal-ai`
   - **Root Directory**: `ai-service`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app:app --host 0.0.0.0 --port 10000`
   - **Plan**: Free

4. Add Environment Variable:
```
BACKEND_URL=https://alumni-portal-backend.onrender.com
```
(Use the URL from Step 2)

5. Click **Create Web Service**
6. Wait 5-10 minutes
7. **Copy your AI service URL** (e.g., `https://alumni-portal-ai.onrender.com`)

---

## Step 4: Update Backend with AI Service URL

1. Go back to your backend service in Render
2. Click **Environment** tab
3. Update `AI_SERVICE_URL` with the URL from Step 3
4. Service will auto-redeploy

---

## Step 5: Deploy Frontend on Vercel

**Manual Steps in Vercel Dashboard:**

1. Go to: https://vercel.com/dashboard
2. Click: **Add New...** → **Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variable:
```
VITE_API_URL=https://alumni-portal-backend.onrender.com
```
(Use the URL from Step 2)

6. Click **Deploy**
7. Wait 2-3 minutes
8. **Copy your frontend URL** (e.g., `https://your-project.vercel.app`)

---

## Step 6: Configure MongoDB Atlas

1. Go to: https://cloud.mongodb.com
2. Click **Network Access** (left sidebar)
3. Click **Add IP Address**
4. Select **Allow Access from Anywhere** (0.0.0.0/0)
5. Click **Confirm**

---

## Step 7: Test Everything

### Test Backend
```bash
# In browser or curl:
https://alumni-portal-backend.onrender.com/api/health
```
Should return: `{"status":"ok"}`

### Test AI Service
```bash
# In browser or curl:
https://alumni-portal-ai.onrender.com/health
```
Should return: `{"status":"healthy","timestamp":"..."}`

### Test Frontend
Open your Vercel URL in browser:
```
https://your-project.vercel.app
```

Try:
- Register new account
- Login
- View Dashboard
- Test AI Chat
- Check Leaderboard

---

## 🔄 Deploy Updates Later

After making code changes:

```bash
# Commit changes
git add .
git commit -m "Your update message"

# Push to GitHub
git push origin main
```

Both Vercel and Render will auto-deploy! 🎉

---

## 📝 Your Deployment URLs

Fill these in after deployment:

```
Frontend:     https://_________________________________.vercel.app
Backend:      https://_________________________________.onrender.com  
AI Service:   https://_________________________________.onrender.com
```

---

## ⚠️ Important Security Notes

1. **Change JWT_SECRET** to a random string:
   ```bash
   # Generate random secret (PowerShell):
   -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
   ```

2. **Don't commit .env files** - They're already in .gitignore

3. **Rotate API keys** for production use

---

## 🐛 Common Issues

### "Failed to load" on frontend
- Check browser console
- Verify VITE_API_URL is correct
- Make sure backend is running

### Backend won't start
- Check Render logs
- Verify MongoDB connection string
- Check all env variables are set

### MongoDB connection error
- Ensure Network Access allows 0.0.0.0/0
- Check connection string is correct
- Verify password is URL-encoded

### Services are slow
- Free tier spins down after 15 min
- First request takes 30-60 seconds
- Consider upgrading for production

---

## ✅ Success Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed on Render
- [ ] AI Service deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] MongoDB Network Access configured
- [ ] All services tested and working
- [ ] JWT_SECRET changed from default
- [ ] URLs documented above

---

**Need detailed help?** See `DEPLOYMENT_STEPS.md` for full guide.

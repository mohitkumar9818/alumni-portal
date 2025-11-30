# ✅ Deployment Checklist

Use this checklist to track your deployment progress.

## Pre-Deployment
- [ ] Code is committed to Git
- [ ] GitHub repository is created and code is pushed
- [ ] MongoDB Atlas is accessible (Network Access configured)
- [ ] You have accounts on Vercel and Render

## Vercel (Frontend)
- [ ] Project imported from GitHub
- [ ] Root directory set to `frontend`
- [ ] Build settings configured (Vite preset)
- [ ] Environment variable `VITE_API_URL` added (placeholder first)
- [ ] First deployment successful
- [ ] Frontend URL obtained: `_______________________________`

## Render - Backend
- [ ] Web Service created from GitHub repo
- [ ] Root directory set to `backend`
- [ ] Runtime set to Node
- [ ] Build command: `npm install`
- [ ] Start command: `node server.js`
- [ ] All environment variables added:
  - [ ] NODE_ENV=production
  - [ ] PORT=10000
  - [ ] MONGO_URI
  - [ ] JWT_SECRET (changed from default!)
  - [ ] JWT_EXPIRE=7d
  - [ ] GEMINI_API_KEY
  - [ ] AI_SERVICE_URL
- [ ] Backend deployed successfully
- [ ] Backend URL obtained: `_______________________________`
- [ ] Health check works: `/api/health`

## Render - AI Service
- [ ] Web Service created from GitHub repo
- [ ] Root directory set to `ai-service`
- [ ] Runtime set to Python 3
- [ ] Build command: `pip install -r requirements.txt`
- [ ] Start command: `uvicorn app:app --host 0.0.0.0 --port 10000`
- [ ] Environment variable added:
  - [ ] BACKEND_URL (points to backend)
- [ ] AI Service deployed successfully
- [ ] AI Service URL obtained: `_______________________________`
- [ ] Health check works: `/health`

## Connect Services
- [ ] Updated `VITE_API_URL` in Vercel with actual backend URL
- [ ] Redeployed frontend on Vercel
- [ ] Updated `AI_SERVICE_URL` in backend Render service
- [ ] Redeployed backend on Render
- [ ] Updated `BACKEND_URL` in AI service
- [ ] Redeployed AI service on Render

## MongoDB Atlas
- [ ] Network Access allows connections (0.0.0.0/0 or Render IPs)
- [ ] Database user has correct permissions
- [ ] Connection string is URL-encoded

## Testing
- [ ] Frontend loads without errors
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Dashboard displays correctly
- [ ] AI Chat works
- [ ] Leaderboard loads
- [ ] Events page works
- [ ] Jobs page works
- [ ] Profile page works

## Security (Important!)
- [ ] Changed JWT_SECRET from default value
- [ ] Considered rotating GEMINI_API_KEY
- [ ] MongoDB password is secure
- [ ] No sensitive data in GitHub repo
- [ ] Environment variables not committed to Git

## Optional Enhancements
- [ ] Custom domain configured on Vercel
- [ ] Auto-deploy on push enabled
- [ ] Monitoring/alerts set up
- [ ] Upgraded to paid plans (to avoid spin-down)
- [ ] Database backups configured

---

## Quick URLs Reference

Fill these in as you deploy:

```
Frontend:     https://_________________________________.vercel.app
Backend:      https://_________________________________.onrender.com
AI Service:   https://_________________________________.onrender.com
GitHub Repo:  https://github.com/_______________/_______________
```

---

## Notes

Use this space for any deployment notes, issues, or reminders:

```
[Your notes here]
```

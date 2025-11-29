# Google Gemini API Setup Guide

## Get Your Free Gemini API Key

### Step 1: Go to Google AI Studio
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with your Google account

### Step 2: Create API Key
1. Click "Create API Key" button
2. Select "Create API key in new project" (or use existing project)
3. Copy the generated API key

### Step 3: Add to Backend
1. Open `backend/.env` file
2. Replace `your_gemini_api_key_here` with your actual API key:
   ```
   GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
3. Save the file

### Step 4: Restart Backend
```bash
# Stop the backend (Ctrl+C in the terminal)
# Then restart it
cd backend
npm run dev
```

## Test the AI Chat

1. Go to http://localhost:5173
2. Login to your account
3. Click "AI Assistant" in the sidebar
4. Start chatting!

## Features

The AI Assistant can help with:
- ✅ Career advice and guidance
- ✅ Resume and interview tips
- ✅ Job search strategies
- ✅ Networking recommendations
- ✅ Skill development suggestions
- ✅ Alumni connections

## Troubleshooting

### Error: "AI service not configured"
- Make sure you added GEMINI_API_KEY to backend/.env
- Restart the backend server

### Error: "Invalid API key"
- Check that your API key is correct
- Make sure there are no extra spaces
- Generate a new API key if needed

### Error: "Failed to get AI response"
- Check your internet connection
- Verify the API key is active
- Check backend console for detailed error messages

## API Limits (Free Tier)

- 60 requests per minute
- Completely free to use
- No credit card required

## Alternative: OpenAI API

If you prefer to use OpenAI instead, I can modify the code to use ChatGPT API. Just let me know!

---

**Note**: Keep your API key secret! Never commit it to Git or share it publicly.

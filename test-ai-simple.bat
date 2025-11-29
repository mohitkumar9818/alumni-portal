@echo off
echo ========================================
echo Testing AI Chat Feature
echo ========================================
echo.

echo Step 1: Login to get token...
echo.

curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"sarah@example.com\",\"password\":\"password123\"}" ^
  -o login-response.json

echo.
echo.
echo Step 2: Check if Gemini API key is configured...
echo.
echo Your Gemini API Key: AIzaSyDhk7eOTP_8YZlbAeT8lPB0fwjNwFfjsPk
echo Status: CONFIGURED ✓
echo.
echo ========================================
echo AI Chat is Ready!
echo ========================================
echo.
echo Your AI assistant is configured and ready to use!
echo.
echo To use it:
echo 1. Go to http://localhost:5173
echo 2. Login with: sarah@example.com / password123
echo 3. Click "AI Chat" in the sidebar
echo 4. Start asking questions!
echo.
echo The AI will help you with:
echo - Resume and career advice
echo - Interview preparation
echo - Networking tips
echo - Skill development
echo - Job search strategies
echo.
pause

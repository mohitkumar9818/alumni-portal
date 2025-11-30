@echo off
echo ========================================
echo Deployment Readiness Check
echo ========================================
echo.

echo [1/5] Checking Git status...
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Git not initialized
    echo     Run: git init
) else (
    echo [OK] Git initialized
)
echo.

echo [2/5] Checking if code is committed...
git diff-index --quiet HEAD -- >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] Uncommitted changes detected
    echo     Run: git add . && git commit -m "Ready for deployment"
) else (
    echo [OK] All changes committed
)
echo.

echo [3/5] Checking GitHub remote...
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] No GitHub remote configured
    echo     Run: git remote add origin https://github.com/USERNAME/REPO.git
) else (
    for /f "tokens=*" %%i in ('git remote get-url origin') do set REMOTE=%%i
    echo [OK] Remote configured: !REMOTE!
)
echo.

echo [4/5] Checking required files...
if exist "frontend\package.json" (
    echo [OK] frontend/package.json exists
) else (
    echo [X] frontend/package.json missing
)

if exist "backend\package.json" (
    echo [OK] backend/package.json exists
) else (
    echo [X] backend/package.json missing
)

if exist "ai-service\requirements.txt" (
    echo [OK] ai-service/requirements.txt exists
) else (
    echo [X] ai-service/requirements.txt missing
)

if exist "vercel.json" (
    echo [OK] vercel.json exists
) else (
    echo [X] vercel.json missing
)

if exist "render.yaml" (
    echo [OK] render.yaml exists
) else (
    echo [X] render.yaml missing
)
echo.

echo [5/5] Checking environment files...
if exist "backend\.env" (
    echo [OK] backend/.env exists
    echo     Remember: Don't commit this file!
) else (
    echo [X] backend/.env missing
)
echo.

echo ========================================
echo Next Steps:
echo ========================================
echo 1. Push code to GitHub (if not done):
echo    git push -u origin main
echo.
echo 2. Open DEPLOYMENT_STEPS.md for full guide
echo.
echo 3. Follow DEPLOYMENT_CHECKLIST.md to track progress
echo.
echo 4. Deploy in this order:
echo    - Backend on Render (get URL)
echo    - AI Service on Render (get URL)
echo    - Frontend on Vercel (use backend URL)
echo ========================================
echo.
pause

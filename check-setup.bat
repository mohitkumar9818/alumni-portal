@echo off
echo ========================================
echo Alumni Portal - Setup Verification
echo ========================================
echo.

echo Checking Node.js...
node --version
if %errorlevel% neq 0 (
    echo ❌ Node.js not found!
    goto :end
)
echo ✅ Node.js installed
echo.

echo Checking Python...
python --version
if %errorlevel% neq 0 (
    echo ❌ Python not found!
    goto :end
)
echo ✅ Python installed
echo.

echo Checking Backend dependencies...
if exist "backend\node_modules" (
    echo ✅ Backend dependencies installed
) else (
    echo ❌ Backend dependencies not installed
    echo    Run: setup-project.bat
)
echo.

echo Checking Frontend dependencies...
if exist "frontend\node_modules" (
    echo ✅ Frontend dependencies installed
) else (
    echo ❌ Frontend dependencies not installed
    echo    Run: setup-project.bat
)
echo.

echo Checking AI Service virtual environment...
if exist "ai-service\venv" (
    echo ✅ AI Service virtual environment created
) else (
    echo ❌ AI Service virtual environment not found
    echo    Run: setup-project.bat
)
echo.

echo Checking environment files...
if exist "backend\.env" (
    echo ✅ Backend .env file exists
) else (
    echo ❌ Backend .env file missing
)

if exist "frontend\.env" (
    echo ✅ Frontend .env file exists
) else (
    echo ❌ Frontend .env file missing
)

if exist "ai-service\.env" (
    echo ✅ AI Service .env file exists
) else (
    echo ❌ AI Service .env file missing
)
echo.

echo ========================================
echo Next Steps:
echo 1. Setup MongoDB (see MONGODB_SETUP.md)
echo 2. Run start-backend.bat
echo 3. Run start-ai-service.bat
echo 4. Run start-frontend.bat
echo 5. Run seed-database.bat (optional)
echo 6. Open http://localhost:5173
echo ========================================
echo.

:end
pause

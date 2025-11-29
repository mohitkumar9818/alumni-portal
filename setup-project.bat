@echo off
echo ========================================
echo Alumni Portal - Setup Script
echo ========================================
echo.

echo [1/3] Installing Frontend Dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
cd ..
echo Frontend dependencies installed successfully!
echo.

echo [2/3] Installing AI Service Dependencies...
cd ai-service
python -m venv venv
call venv\Scripts\activate.bat
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: AI Service installation failed!
    pause
    exit /b 1
)
cd ..
echo AI Service dependencies installed successfully!
echo.

echo [3/3] Setup Complete!
echo.
echo ========================================
echo Next Steps:
echo 1. Make sure MongoDB is running
echo 2. Run start-all.bat to start all services
echo ========================================
pause

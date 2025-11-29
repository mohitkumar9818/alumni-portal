@echo off
echo ========================================
echo Diagnosing "Failed to Load" Errors
echo ========================================
echo.

echo [1/4] Checking if Backend is running...
curl -s http://localhost:5000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Backend is RUNNING on port 5000
    curl http://localhost:5000/health
) else (
    echo ✗ Backend is NOT running
    echo.
    echo SOLUTION: Run start-backend.bat
    echo.
)
echo.

echo [2/4] Checking if Frontend is running...
curl -s http://localhost:5173 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Frontend is RUNNING on port 5173
) else (
    echo ✗ Frontend is NOT running
    echo.
    echo SOLUTION: Run start-frontend.bat
    echo.
)
echo.

echo [3/4] Testing Events API...
curl -s http://localhost:5000/api/events >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Events API is responding
) else (
    echo ✗ Events API is not responding
    echo   This usually means backend is not running or database is not connected
)
echo.

echo [4/4] Testing Jobs API...
curl -s http://localhost:5000/api/jobs >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Jobs API is responding
) else (
    echo ✗ Jobs API is not responding
    echo   This usually means backend is not running or database is not connected
)
echo.

echo ========================================
echo Diagnosis Complete
echo ========================================
echo.
echo NEXT STEPS:
echo 1. If backend is not running: start-backend.bat
echo 2. If APIs respond but pages show no data: seed-all-data.bat
echo 3. If still having issues: Check FIX_FAILED_TO_LOAD_ERRORS.md
echo.
pause

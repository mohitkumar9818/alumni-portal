@echo off
echo ========================================
echo View MongoDB Database Data
echo ========================================
echo.

cd /d "%~dp0backend"
node scripts\viewData.js

echo.
echo ========================================
echo Press any key to exit...
echo ========================================
pause

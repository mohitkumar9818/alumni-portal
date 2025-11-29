@echo off
echo ========================================
echo Seeding All Database Data
echo ========================================
echo.

cd /d "%~dp0backend"

echo Step 1: Seeding Users, Events, and Jobs...
echo.
node scripts\seed.js

echo.
echo Step 2: Seeding Leaderboard Data...
echo.
node scripts\seedLeaderboard.js

echo.
echo ========================================
echo All data seeded successfully!
echo ========================================
echo.
echo You can now:
echo - View leaderboard at: http://localhost:5174/leaderboard
echo - View dashboard at: http://localhost:5174/
echo.
pause

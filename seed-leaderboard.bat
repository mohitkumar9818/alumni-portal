@echo off
echo ========================================
echo Seeding Leaderboard Data
echo ========================================
echo.

cd /d "%~dp0backend"
node scripts\seedLeaderboard.js

echo.
echo ========================================
echo Leaderboard seeding complete!
echo ========================================
pause

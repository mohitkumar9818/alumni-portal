@echo off
echo ========================================
echo Testing All Scripts
echo ========================================
echo.

echo Current directory: %CD%
echo Script location: %~dp0
echo.

echo Testing path resolution...
cd /d "%~dp0backend"
echo Backend directory: %CD%
echo.

if exist "scripts\viewData.js" (
    echo ✓ viewData.js found
) else (
    echo ✗ viewData.js NOT found
)

if exist "scripts\seed.js" (
    echo ✓ seed.js found
) else (
    echo ✗ seed.js NOT found
)

if exist "scripts\seedLeaderboard.js" (
    echo ✓ seedLeaderboard.js found
) else (
    echo ✗ seedLeaderboard.js NOT found
)

echo.
echo ========================================
echo Test Complete
echo ========================================
pause

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Seeding Database with Sample Data" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Change to backend directory
Set-Location -Path "backend"

Write-Host "[1/2] Seeding Users, Events, and Jobs..." -ForegroundColor Yellow
node scripts/seed.js

Write-Host ""
Write-Host "[2/2] Seeding Leaderboard Data..." -ForegroundColor Yellow
node scripts/seedLeaderboard.js

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Database Seeding Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "You can now refresh your browser and see the data!" -ForegroundColor White
Write-Host ""

# Go back to root
Set-Location -Path ".."

Read-Host "Press Enter to exit"

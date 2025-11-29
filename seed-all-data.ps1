# PowerShell script to seed all data
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Seeding All Database Data" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path $scriptPath "backend"

# Change to backend directory
Set-Location $backendPath

Write-Host "Step 1: Seeding Users, Events, and Jobs..." -ForegroundColor Yellow
Write-Host ""
node scripts\seed.js

Write-Host ""
Write-Host "Step 2: Seeding Leaderboard Data..." -ForegroundColor Yellow
Write-Host ""
node scripts\seedLeaderboard.js

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "All data seeded successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "You can now:" -ForegroundColor White
Write-Host "- View leaderboard at: http://localhost:5174/leaderboard" -ForegroundColor Cyan
Write-Host "- View dashboard at: http://localhost:5174/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

@echo off
title Alumni Portal - Seed Database
echo Seeding database with test data...
cd backend
node scripts\seed.js
echo.
echo Database seeded successfully!
echo.
echo Test accounts created:
echo - Admin: admin@example.com / admin123
echo - Mentor: sarah@example.com / password123
echo - User: alice@example.com / password123
echo.
pause

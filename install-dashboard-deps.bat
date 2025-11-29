@echo off
echo ========================================
echo Installing Dashboard Dependencies
echo ========================================
echo.

cd frontend
echo Installing: framer-motion recharts lucide-react @react-three/fiber @react-three/drei three
echo.

npm install framer-motion recharts lucide-react @react-three/fiber @react-three/drei three --legacy-peer-deps

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Restart the frontend: start-frontend.bat
echo 2. Access dashboard: http://localhost:5173
echo.
pause

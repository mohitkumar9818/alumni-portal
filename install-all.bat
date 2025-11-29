@echo off
echo Installing Frontend Dependencies...
cd frontend
call npm install
cd ..

echo.
echo Installing AI Service Dependencies...
cd ai-service
python -m venv venv
call venv\Scripts\activate.bat
pip install -r requirements.txt
cd ..

echo.
echo All dependencies installed!
pause

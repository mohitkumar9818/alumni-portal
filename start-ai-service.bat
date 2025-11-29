@echo off
title Alumni Portal - AI Service
echo Starting AI Service...
cd ai-service
call venv\Scripts\activate.bat
uvicorn app:app --reload --port 8000

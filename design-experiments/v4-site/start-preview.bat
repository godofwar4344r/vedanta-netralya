@echo off
title Vedanta Netralya - Preview Server
cd /d "%~dp0"
echo.
echo Starting Vedanta Netralya preview server...
echo.
echo Once it says "Local: http://localhost:4173/", open that URL in your browser.
echo Close this window to stop the server.
echo.
call npm run preview
pause

@echo off
cd /d "C:\Users\deshm\Downloads\DarkHarvest (2) (1)\DarkHarvest"

REM Initialize git
"C:\Program Files\Git\cmd\git.exe" init

REM Add remote
"C:\Program Files\Git\cmd\git.exe" remote add origin https://github.com/ramjadhav21/DarkHarvest-.git

REM Stage all files
"C:\Program Files\Git\cmd\git.exe" add .

REM Commit
"C:\Program Files\Git\cmd\git.exe" commit -m "DarkHarvest Beard Oil E-commerce with Razorpay and Oracle Cloud"

REM Set branch
"C:\Program Files\Git\cmd\git.exe" branch -M main

REM Push
"C:\Program Files\Git\cmd\git.exe" push -u origin main

echo Done!
pause
@echo off
chcp 65001 >nul
echo ======================================
echo 🚀 تشغيل High Safety محلياً
echo ======================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo ⏳ تثبيت المكتبات الأساسية...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ فشل تثبيت المكتبات
        pause
        exit /b 1
    )
    echo ✅ تم تثبيت المكتبات
    echo.
)

REM Check if client/node_modules exists
if not exist "client\node_modules" (
    echo ⏳ تثبيت مكتبات الواجهة...
    cd client
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ فشل تثبيت مكتبات الواجهة
        pause
        exit /b 1
    )
    cd ..
    echo ✅ تم تثبيت مكتبات الواجهة
    echo.
)

REM Setup database
echo ⏳ إعداد قاعدة البيانات المحلية (SQLite)...
node server/database-setup.js

if %errorlevel% neq 0 (
    echo ❌ فشل إعداد قاعدة البيانات
    pause
    exit /b 1
)

echo ✅ قاعدة البيانات جاهزة!
echo.
echo ======================================
echo 🌐 تشغيل الموقع...
echo ======================================
echo.
echo 📱 الموقع سيفتح على:
echo    - الخادم: http://localhost:3000
echo    - الواجهة: http://localhost:5000
echo.

npm run dev

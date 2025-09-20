@echo off
chcp 65001 >nul
echo.
echo 🌱 منصة الكربون الهجينة - Hybrid Carbon Platform
echo ================================================
echo.

echo 📦 تثبيت التبعيات...
call npm install

if %errorlevel% neq 0 (
    echo ❌ فشل في تثبيت التبعيات
    pause
    exit /b 1
)

echo.
echo 🔧 إصلاح التبعيات المفقودة...
node fix-dependencies.js

echo.
echo 🚀 تشغيل المشروع...
echo.
echo 🌐 سيتم فتح المتصفح على: http://localhost:3000
echo.
echo ⏹️  لإيقاف المشروع، اضغط Ctrl+C
echo.

call npm run dev

pause

@echo off
chcp 65001 >nul
echo.
echo 🚀 نشر منصة الكربون الهجينة على Vercel
echo =====================================
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
echo 🏗️ بناء المشروع...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ فشل في بناء المشروع
    pause
    exit /b 1
)

echo.
echo ✅ تم بناء المشروع بنجاح!
echo.

echo 🌐 خيارات النشر:
echo 1. النشر عبر Vercel CLI
echo 2. رفع مجلد dist يدوياً
echo 3. ربط مع GitHub
echo.

set /p choice="اختر خيار النشر (1-3): "

if "%choice%"=="1" (
    echo.
    echo 📤 النشر عبر Vercel CLI...
    echo تأكد من تثبيت Vercel CLI: npm install -g vercel
    echo.
    vercel --prod
) else if "%choice%"=="2" (
    echo.
    echo 📁 مجلد dist جاهز للرفع
    echo اذهب إلى vercel.com وارفع مجلد dist
    echo.
    explorer dist
) else if "%choice%"=="3" (
    echo.
    echo 🔗 ربط مع GitHub:
    echo 1. ارفع المشروع إلى GitHub
    echo 2. اذهب إلى vercel.com
    echo 3. اختر "New Project"
    echo 4. اختر المستودع
    echo 5. اضغط "Deploy"
    echo.
    echo 📋 أوامر Git:
    echo git init
    echo git add .
    echo git commit -m "Initial commit"
    echo git branch -M main
    echo git remote add origin YOUR_REPO_URL
    echo git push -u origin main
) else (
    echo ❌ خيار غير صحيح
)

echo.
echo 🎉 تم إعداد المشروع للنشر!
echo.
pause

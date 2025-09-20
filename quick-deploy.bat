@echo off
chcp 65001 >nul
echo.
echo 🚀 نشر سريع لمنصة الكربون الهجينة
echo ===================================
echo.

echo 📦 الخطوة 1: تثبيت التبعيات...
call npm install

if %errorlevel% neq 0 (
    echo ❌ فشل في تثبيت التبعيات
    pause
    exit /b 1
)

echo.
echo 🔧 الخطوة 2: إصلاح التبعيات...
node fix-dependencies.js

echo.
echo 🏗️ الخطوة 3: بناء المشروع...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ فشل في بناء المشروع
    pause
    exit /b 1
)

echo.
echo ✅ تم بناء المشروع بنجاح!
echo.

echo 🌐 الخطوة 4: النشر على Vercel...
echo.
echo 📋 اختر طريقة النشر:
echo.
echo 1. 📤 رفع مجلد dist يدوياً (الأسهل)
echo 2. 🔗 ربط مع GitHub ثم Vercel
echo 3. 💻 استخدام Vercel CLI
echo.

set /p choice="اختر رقم (1-3): "

if "%choice%"=="1" (
    echo.
    echo 📁 فتح مجلد dist للرفع...
    echo.
    echo 📋 تعليمات الرفع:
    echo 1. اذهب إلى https://vercel.com
    echo 2. سجل الدخول بحسابك
    echo 3. اضغط "New Project"
    echo 4. اختر "Upload"
    echo 5. اسحب مجلد dist إلى المنطقة المخصصة
    echo 6. اضغط "Deploy"
    echo.
    explorer dist
    echo.
    echo ✅ تم فتح مجلد dist - اتبع التعليمات أعلاه
) else if "%choice%"=="2" (
    echo.
    echo 🔗 ربط مع GitHub:
    echo.
    echo 📋 خطوات GitHub:
    echo 1. اذهب إلى https://github.com
    echo 2. اضغط "New repository"
    echo 3. اسم المستودع: hybrid-carbon-platform
    echo 4. اضغط "Create repository"
    echo.
    echo 📋 أوامر Git (انسخ والصق):
    echo git init
    echo git add .
    echo git commit -m "Hybrid Carbon Platform"
    echo git branch -M main
    echo git remote add origin YOUR_REPO_URL
    echo git push -u origin main
    echo.
    echo 📋 خطوات Vercel:
    echo 1. اذهب إلى https://vercel.com
    echo 2. سجل الدخول بحساب GitHub
    echo 3. اضغط "New Project"
    echo 4. اختر المستودع hybrid-carbon-platform
    echo 5. اضغط "Deploy"
) else if "%choice%"=="3" (
    echo.
    echo 💻 استخدام Vercel CLI:
    echo.
    echo 📋 خطوات Vercel CLI:
    echo 1. تثبيت Vercel CLI: npm install -g vercel
    echo 2. تسجيل الدخول: vercel login
    echo 3. النشر: vercel --prod
    echo.
    echo ⚠️ تأكد من تثبيت Vercel CLI أولاً
) else (
    echo ❌ خيار غير صحيح
)

echo.
echo 🎉 تم إعداد المشروع للنشر!
echo.
echo 📞 إذا واجهت مشاكل:
echo - راجع ملف DEPLOYMENT.md
echo - استخدم node check-deployment.js
echo.
pause

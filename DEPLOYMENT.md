# 🚀 دليل النشر - منصة الكربون الهجينة

## 📋 نظرة عامة

هذا الدليل يوضح كيفية نشر منصة الكربون الهجينة على Vercel بطرق مختلفة.

## 🎯 طرق النشر

### 1. النشر السريع (Windows)

```bash
# انقر مرتين على الملف
deploy.bat
```

### 2. النشر عبر Vercel CLI

```bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel

# النشر للإنتاج
vercel --prod
```

### 3. النشر عبر GitHub

1. **رفع المشروع إلى GitHub:**
```bash
git init
git add .
git commit -m "Initial commit - Hybrid Carbon Platform"
git branch -M main
git remote add origin https://github.com/yourusername/hybrid-carbon-platform.git
git push -u origin main
```

2. **ربط مع Vercel:**
   - اذهب إلى [vercel.com](https://vercel.com)
   - سجل الدخول بحساب GitHub
   - اضغط "New Project"
   - اختر المستودع `hybrid-carbon-platform`
   - اضغط "Deploy"

### 4. النشر اليدوي

1. **بناء المشروع:**
```bash
npm install
node fix-dependencies.js
npm run build
```

2. **رفع مجلد dist:**
   - اذهب إلى [vercel.com](https://vercel.com)
   - اضغط "New Project"
   - اختر "Upload"
   - اسحب مجلد `dist`
   - اضغط "Deploy"

## ⚙️ إعدادات Vercel

### متغيرات البيئة

في لوحة تحكم Vercel، أضف المتغيرات التالية:

```
NODE_ENV=production
VITE_APP_NAME=منصة الكربون الهجينة
VITE_APP_VERSION=1.0.0
VITE_APP_URL=https://your-domain.vercel.app
```

### إعدادات البناء

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **Node.js Version:** `18.x`

## 🔧 ملفات النشر

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### .vercelignore
```
node_modules/
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.vercel
```

## 🌐 نطاقات مخصصة

### إضافة نطاق مخصص:

1. في لوحة تحكم Vercel
2. اذهب إلى Settings > Domains
3. أضف النطاق المطلوب
4. اتبع التعليمات لإعداد DNS

### أمثلة على النطاقات:
- `carbon-platform.vercel.app`
- `hybrid-carbon.vercel.app`
- `carbon-nft.vercel.app`
- `your-custom-domain.com`

## 📊 فحص النشر

### فحص تلقائي:
```bash
node check-deployment.js
```

### فحص يدوي:
1. اذهب إلى الموقع المنشور
2. تحقق من جميع الصفحات
3. اختبر الوظائف الأساسية

## 🔒 الأمان

### HTTPS
- Vercel يوفر HTTPS تلقائياً
- جميع الطلبات محمية

### Headers الأمان
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 📱 PWA Support

### Manifest
```json
{
  "name": "منصة الكربون الهجينة",
  "short_name": "Carbon Platform",
  "description": "منصة رقمية متطورة لإدارة الكربون وتداول الأصول البيئية",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#22c55e"
}
```

### Service Worker
- يتم إنشاؤه تلقائياً بواسطة Vite
- يوفر التخزين المؤقت
- يدعم العمل دون اتصال

## 🚀 النشر التلقائي

### GitHub Actions
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 📈 تحسين الأداء

### 1. تحسين الصور
```javascript
// استخدام Vercel Image Optimization
const optimizedImage = `https://images.vercel.app?url=${encodeURIComponent(src)}&w=800&q=80`
```

### 2. تحسين التحميل
```javascript
// Lazy loading للمكونات
const LazyComponent = React.lazy(() => import('./Component'))
```

### 3. تحسين CSS
```javascript
// في vite.config.js
export default defineConfig({
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-select', '@radix-ui/react-tabs']
        }
      }
    }
  }
})
```

## 🔍 مراقبة الأخطاء

### Vercel Analytics
```bash
npm install @vercel/analytics
```

```javascript
// في src/main.jsx
import { Analytics } from '@vercel/analytics/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
)
```

## 📞 الدعم

### حل المشاكل الشائعة:

1. **خطأ في البناء:**
   - تحقق من package.json
   - تأكد من تثبيت جميع التبعيات
   - راجع logs Vercel

2. **الصفحات لا تعمل:**
   - تحقق من vercel.json
   - تأكد من إعدادات التوجيه
   - راجع console المتصفح

3. **مشاكل في الترجمة:**
   - تحقق من ملف translations.js
   - تأكد من إعدادات اللغة
   - راجع console المتصفح

### روابط مفيدة:
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**🎉 مبروك! موقعك الآن جاهز للنشر على Vercel!**

## 📋 قائمة التحقق قبل النشر

- [ ] تم تثبيت جميع التبعيات
- [ ] تم بناء المشروع بنجاح
- [ ] تم اختبار جميع الصفحات محلياً
- [ ] تم إعداد متغيرات البيئة
- [ ] تم إعداد النطاق المخصص (اختياري)
- [ ] تم اختبار النشر
- [ ] تم فحص الأداء
- [ ] تم إعداد المراقبة

**✨ استمتع بموقعك الجديد!**

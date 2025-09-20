# نشر منصة الكربون الهجينة على Vercel

## 🚀 خطوات النشر على Vercel

### الطريقة الأولى: عبر Vercel CLI

1. **تثبيت Vercel CLI:**
```bash
npm install -g vercel
```

2. **تسجيل الدخول:**
```bash
vercel login
```

3. **النشر:**
```bash
vercel
```

4. **النشر للإنتاج:**
```bash
vercel --prod
```

### الطريقة الثانية: عبر GitHub

1. **رفع المشروع إلى GitHub:**
```bash
git init
git add .
git commit -m "Initial commit - Hybrid Carbon Platform"
git branch -M main
git remote add origin https://github.com/yourusername/hybrid-carbon-platform.git
git push -u origin main
```

2. **ربط المشروع بـ Vercel:**
   - اذهب إلى [vercel.com](https://vercel.com)
   - سجل الدخول بحساب GitHub
   - اضغط "New Project"
   - اختر المستودع `hybrid-carbon-platform`
   - اضغط "Deploy"

### الطريقة الثالثة: عبر واجهة Vercel

1. **تحضير المشروع:**
```bash
# تثبيت التبعيات
npm install

# إصلاح التبعيات المفقودة
node fix-dependencies.js

# بناء المشروع
npm run build
```

2. **رفع الملفات:**
   - اذهب إلى [vercel.com](https://vercel.com)
   - اضغط "New Project"
   - اختر "Upload"
   - اسحب مجلد `dist` إلى المنطقة المخصصة
   - اضغط "Deploy"

## ⚙️ إعدادات Vercel

### متغيرات البيئة (Environment Variables)

في لوحة تحكم Vercel، أضف المتغيرات التالية:

```
NODE_ENV=production
VITE_APP_NAME=منصة الكربون الهجينة
VITE_APP_VERSION=1.0.0
```

### إعدادات البناء (Build Settings)

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

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

## 🔧 تحسينات الأداء

### 1. تحسين الصور:
```javascript
// في src/lib/helpers.js
export const optimizeImage = (src, width = 800, quality = 80) => {
  return `https://images.vercel.app?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
}
```

### 2. تحسين التحميل:
```javascript
// Lazy loading للمكونات
const LazyComponent = React.lazy(() => import('./Component'))
```

### 3. تحسين CSS:
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

## 📊 مراقبة الأداء

### 1. Vercel Analytics:
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

### 2. مراقبة الأخطاء:
```bash
npm install @sentry/react
```

## 🔒 الأمان

### 1. HTTPS:
- Vercel يوفر HTTPS تلقائياً
- جميع الطلبات محمية

### 2. Headers الأمان:
```json
// في vercel.json
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

## 🚀 النشر التلقائي

### 1. GitHub Actions:
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./
```

## 📱 PWA Support

### 1. إضافة Service Worker:
```javascript
// public/sw.js
const CACHE_NAME = 'carbon-platform-v1'
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})
```

### 2. Manifest:
```json
// public/manifest.json
{
  "name": "منصة الكربون الهجينة",
  "short_name": "Carbon Platform",
  "description": "منصة رقمية لإدارة الكربون وتداول الأصول البيئية",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#22c55e",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 🎯 نصائح مهمة

### 1. تحسين SEO:
```html
<!-- في index.html -->
<meta name="description" content="منصة رقمية متطورة لإدارة الكربون وتداول الأصول البيئية">
<meta name="keywords" content="كربون, بيئة, NFT, استدامة, blockchain">
<meta property="og:title" content="منصة الكربون الهجينة">
<meta property="og:description" content="مستقبل الاستدامة البيئية الرقمية">
```

### 2. تحسين الأداء:
- استخدم `React.memo()` للمكونات
- استخدم `useMemo()` و `useCallback()`
- ضغط الصور قبل الرفع
- استخدم CDN للصور

### 3. مراقبة الأخطاء:
- استخدم Error Boundaries
- سجل الأخطاء في خدمة خارجية
- راقب أداء الموقع

## 📞 الدعم

إذا واجهت أي مشاكل في النشر:

1. **تحقق من الأخطاء في Vercel Dashboard**
2. **راجع logs البناء**
3. **تأكد من صحة package.json**
4. **تحقق من إعدادات vercel.json**

---

**🎉 مبروك! موقعك الآن جاهز للنشر على Vercel!**

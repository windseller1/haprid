#!/usr/bin/env node

const https = require('https');
const http = require('http');

console.log('🔍 فحص حالة النشر على Vercel...\n');

// قائمة بالصفحات المطلوب فحصها
const pages = [
  { path: '/', name: 'الصفحة الرئيسية' },
  { path: '/login', name: 'تسجيل الدخول' },
  { path: '/register', name: 'التسجيل' },
  { path: '/marketplace', name: 'السوق' },
  { path: '/dashboard', name: 'لوحة التحكم' },
  { path: '/profile', name: 'الملف الشخصي' },
  { path: '/wallet', name: 'المحفظة' },
  { path: '/admin', name: 'لوحة الإدارة' }
];

// الحصول على URL من المتغيرات البيئة أو استخدام الافتراضي
const baseUrl = process.env.VERCEL_URL || 'https://carbon-platform.vercel.app';

console.log(`🌐 فحص الموقع: ${baseUrl}\n`);

// دالة لفحص صفحة واحدة
function checkPage(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          success: res.statusCode === 200,
          size: data.length,
          hasReact: data.includes('react'),
          hasTailwind: data.includes('tailwind'),
          hasArabic: data.includes('منصة الكربون')
        });
      });
    });
    
    req.on('error', (err) => {
      resolve({
        url,
        status: 0,
        success: false,
        error: err.message
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        url,
        status: 0,
        success: false,
        error: 'Timeout'
      });
    });
  });
}

// فحص جميع الصفحات
async function checkAllPages() {
  const results = [];
  
  for (const page of pages) {
    const fullUrl = `${baseUrl}${page.path}`;
    console.log(`⏳ فحص ${page.name}...`);
    
    const result = await checkPage(fullUrl);
    results.push({ ...page, ...result });
    
    if (result.success) {
      console.log(`  ✅ ${page.name} - ${result.status} (${result.size} bytes)`);
    } else {
      console.log(`  ❌ ${page.name} - ${result.status} (${result.error || 'خطأ'})`);
    }
  }
  
  return results;
}

// عرض التقرير النهائي
function showReport(results) {
  console.log('\n📊 تقرير فحص النشر:');
  console.log('='.repeat(50));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ صفحات تعمل بشكل صحيح: ${successful.length}/${results.length}`);
  console.log(`❌ صفحات بها مشاكل: ${failed.length}/${results.length}`);
  
  if (successful.length > 0) {
    console.log('\n✅ الصفحات التي تعمل:');
    successful.forEach(page => {
      console.log(`  - ${page.name}: ${page.url}`);
    });
  }
  
  if (failed.length > 0) {
    console.log('\n❌ الصفحات التي تحتاج إصلاح:');
    failed.forEach(page => {
      console.log(`  - ${page.name}: ${page.url} (${page.error || 'خطأ'})`);
    });
  }
  
  // فحص الميزات
  const firstPage = results.find(r => r.success);
  if (firstPage) {
    console.log('\n🔍 فحص الميزات:');
    console.log(`  React: ${firstPage.hasReact ? '✅' : '❌'}`);
    console.log(`  Tailwind CSS: ${firstPage.hasTailwind ? '✅' : '❌'}`);
    console.log(`  النص العربي: ${firstPage.hasArabic ? '✅' : '❌'}`);
  }
  
  // التوصيات
  console.log('\n💡 التوصيات:');
  if (failed.length === 0) {
    console.log('  🎉 جميع الصفحات تعمل بشكل مثالي!');
    console.log('  🚀 الموقع جاهز للاستخدام');
  } else {
    console.log('  🔧 يرجى إصلاح الصفحات التي لا تعمل');
    console.log('  📝 تحقق من logs Vercel للمزيد من التفاصيل');
  }
  
  console.log('\n🌐 روابط مفيدة:');
  console.log(`  الموقع: ${baseUrl}`);
  console.log(`  لوحة تحكم Vercel: https://vercel.com/dashboard`);
  console.log(`  GitHub: https://github.com/yourusername/hybrid-carbon-platform`);
}

// تشغيل الفحص
async function main() {
  try {
    const results = await checkAllPages();
    showReport(results);
    
    // إنهاء العملية مع الكود المناسب
    const hasErrors = results.some(r => !r.success);
    process.exit(hasErrors ? 1 : 0);
  } catch (error) {
    console.error('❌ خطأ في فحص النشر:', error.message);
    process.exit(1);
  }
}

// تشغيل الفحص إذا تم استدعاء الملف مباشرة
if (require.main === module) {
  main();
}

module.exports = { checkPage, checkAllPages, showReport };

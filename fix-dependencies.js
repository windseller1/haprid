#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 إصلاح تبعيات المشروع...\n');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ ملف package.json غير موجود!');
  process.exit(1);
}

// Read package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Add missing dependencies
const missingDependencies = {
  '@radix-ui/react-select': '^2.0.0',
  '@radix-ui/react-switch': '^1.0.3',
  '@radix-ui/react-tabs': '^1.0.4',
  'tailwindcss-animate': '^1.0.7'
};

console.log('📦 إضافة التبعيات المفقودة...');

let updated = false;
for (const [dep, version] of Object.entries(missingDependencies)) {
  if (!packageJson.dependencies[dep] && !packageJson.devDependencies[dep]) {
    packageJson.dependencies[dep] = version;
    console.log(`  ✅ تمت إضافة ${dep}@${version}`);
    updated = true;
  }
}

// Update scripts
if (!packageJson.scripts.preview) {
  packageJson.scripts.preview = 'vite preview --port 4173';
  updated = true;
  console.log('  ✅ تمت إضافة سكريبت المعاينة');
}

if (updated) {
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  console.log('\n✅ تم تحديث package.json');
} else {
  console.log('\n✅ جميع التبعيات موجودة بالفعل');
}

// Check if tailwind.config.js exists
if (!fs.existsSync('tailwind.config.js')) {
  console.log('\n📝 إنشاء ملف tailwind.config.js...');
  
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    './index.html',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        blob: "blob 7s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`;
  
  fs.writeFileSync('tailwind.config.js', tailwindConfig);
  console.log('  ✅ تم إنشاء tailwind.config.js');
}

// Check if postcss.config.js exists
if (!fs.existsSync('postcss.config.js')) {
  console.log('\n📝 إنشاء ملف postcss.config.js...');
  
  const postcssConfig = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;
  
  fs.writeFileSync('postcss.config.js', postcssConfig);
  console.log('  ✅ تم إنشاء postcss.config.js');
}

// Check if .gitignore exists
if (!fs.existsSync('.gitignore')) {
  console.log('\n📝 إنشاء ملف .gitignore...');
  
  const gitignore = `# Dependencies
node_modules/
.pnp
.pnp.js

# Production
/build
/dist

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# OS generated files
Thumbs.db
ehthumbs.db
Desktop.ini`;
  
  fs.writeFileSync('.gitignore', gitignore);
  console.log('  ✅ تم إنشاء .gitignore');
}

console.log('\n🎉 تم إصلاح جميع التبعيات بنجاح!');
console.log('\n📋 الخطوات التالية:');
console.log('1. قم بتشغيل: npm install');
console.log('2. قم بتشغيل: npm run dev');
console.log('3. افتح المتصفح على: http://localhost:3000');
console.log('\n✨ استمتع بالعمل على منصة الكربون الهجينة!');

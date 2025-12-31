#!/usr/bin/env node

/**
 * Pre-deployment checklist script
 * يتحقق من جاهزية المشروع للنشر
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 فحص جاهزية المشروع للنشر...\n');

let score = 0;
let total = 0;
const issues = [];
const warnings = [];

// 1. Check .env file
total++;
if (fs.existsSync('.env')) {
  score++;
  console.log('✅ ملف .env موجود');
  
  const envContent = fs.readFileSync('.env', 'utf8');
  
  // Check for default passwords
  if (envContent.includes('ADMIN_PASSWORD=safa') || envContent.includes('admin123')) {
    warnings.push('⚠️  تحذير: كلمة المرور الافتراضية لم يتم تغييرها');
  }
  
  // Check for required variables
  const required = ['ADMIN_USERNAME', 'ADMIN_PASSWORD', 'STRIPE_SECRET_KEY', 'STRIPE_PUBLISHABLE_KEY'];
  required.forEach(key => {
    if (!envContent.includes(key)) {
      warnings.push(`⚠️  تحذير: المتغير ${key} غير موجود`);
    }
  });
} else {
  issues.push('❌ ملف .env غير موجود - قم بنسخ .env.example');
}

// 2. Check node_modules
total++;
if (fs.existsSync('node_modules')) {
  score++;
  console.log('✅ التبعيات الرئيسية مثبتة');
} else {
  issues.push('❌ قم بتشغيل: npm install');
}

// 3. Check client dependencies
total++;
if (fs.existsSync('client/node_modules')) {
  score++;
  console.log('✅ تبعيات الواجهة مثبتة');
} else {
  issues.push('❌ قم بتشغيل: cd client && npm install');
}

// 4. Check .gitignore
total++;
if (fs.existsSync('.gitignore')) {
  score++;
  console.log('✅ ملف .gitignore موجود');
  
  const gitignoreContent = fs.readFileSync('.gitignore', 'utf8');
  const shouldIgnore = ['.env', 'node_modules', '*.db', 'uploads'];
  shouldIgnore.forEach(item => {
    if (!gitignoreContent.includes(item)) {
      warnings.push(`⚠️  تحذير: ${item} غير موجود في .gitignore`);
    }
  });
} else {
  issues.push('❌ ملف .gitignore غير موجود');
}

// 5. Check README
total++;
if (fs.existsSync('README.md')) {
  score++;
  console.log('✅ ملف README.md موجود');
} else {
  warnings.push('⚠️  ملف README.md غير موجود');
}

// 6. Check LICENSE
total++;
if (fs.existsSync('LICENSE')) {
  score++;
  console.log('✅ ملف LICENSE موجود');
} else {
  warnings.push('⚠️  ملف LICENSE غير موجود');
}

// 7. Check for sensitive data in code
total++;
const serverIndex = fs.readFileSync('server/index.js', 'utf8');
if (serverIndex.includes('pk_live_') || serverIndex.includes('sk_live_')) {
  issues.push('❌ مفاتيح Stripe موجودة في الكود! انقلها لـ .env');
} else {
  score++;
  console.log('✅ لا توجد بيانات حساسة في الكود');
}

// 8. Check build directory
total++;
if (fs.existsSync('client/dist') || fs.existsSync('client/build')) {
  score++;
  console.log('✅ مجلد البناء موجود');
} else {
  warnings.push('⚠️  قم ببناء المشروع: cd client && npm run build');
}

// Print warnings
if (warnings.length > 0) {
  console.log('\n⚠️  تحذيرات:');
  warnings.forEach(w => console.log(w));
}

// Print issues
if (issues.length > 0) {
  console.log('\n❌ مشاكل يجب حلها:');
  issues.forEach(i => console.log(i));
}

// Calculate percentage
const percentage = Math.round((score / total) * 100);

console.log('\n📊 النتيجة:');
console.log(`${score}/${total} (${percentage}%)`);

if (percentage >= 90) {
  console.log('\n🎉 المشروع جاهز للنشر!');
  process.exit(0);
} else if (percentage >= 70) {
  console.log('\n⚠️  المشروع يحتاج لبعض التحسينات قبل النشر');
  process.exit(1);
} else {
  console.log('\n❌ المشروع غير جاهز للنشر - يرجى حل المشاكل أعلاه');
  process.exit(1);
}

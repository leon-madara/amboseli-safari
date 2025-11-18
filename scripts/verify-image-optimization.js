/**
 * Image Optimization Verification Script
 * 
 * This script helps verify that image optimization is properly implemented.
 * Run with: node scripts/verify-image-optimization.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Image Optimization Implementation...\n');

let errors = 0;
let warnings = 0;
let success = 0;

// Check 1: Verify OptimizedImage component exists
console.log('✓ Checking OptimizedImage component...');
const optimizedImagePath = path.join(__dirname, '../src/components/atoms/OptimizedImage/OptimizedImage.tsx');
if (fs.existsSync(optimizedImagePath)) {
  console.log('  ✅ OptimizedImage component found');
  success++;
} else {
  console.log('  ❌ OptimizedImage component not found');
  errors++;
}

// Check 2: Verify next.config.js has WEBP configuration
console.log('\n✓ Checking next.config.js...');
const nextConfigPath = path.join(__dirname, '../next.config.js');
if (fs.existsSync(nextConfigPath)) {
  const nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
  if (nextConfig.includes('image/webp')) {
    console.log('  ✅ WEBP format configured');
    success++;
  } else {
    console.log('  ❌ WEBP format not configured');
    errors++;
  }
  
  if (nextConfig.includes('image/avif')) {
    console.log('  ✅ AVIF format configured (bonus!)');
    success++;
  }
} else {
  console.log('  ❌ next.config.js not found');
  errors++;
}

// Check 3: Verify chapter components use OptimizedImage
console.log('\n✓ Checking chapter components...');
const chapterComponents = [
  'PreDawnHero/PreDawnHero.tsx',
  'MorningDriveChapter/MorningDriveChapter.tsx',
  'AccommodationsChapter/AccommodationsChapter.tsx',
  'DiningChapter/DiningChapter.tsx',
  'ExperiencesChapter/ExperiencesChapter.tsx',
  'WellnessChapter/WellnessChapter.tsx',
  'SunriseChapter/SunriseChapter.tsx',
];

chapterComponents.forEach(component => {
  const componentPath = path.join(__dirname, '../src/components/chapters', component);
  if (fs.existsSync(componentPath)) {
    const content = fs.readFileSync(componentPath, 'utf8');
    
    // Check if it imports OptimizedImage
    if (content.includes('OptimizedImage')) {
      console.log(`  ✅ ${component.split('/')[0]} uses OptimizedImage`);
      success++;
    } else if (content.includes('from \'next/image\'') || content.includes('from "next/image"')) {
      console.log(`  ⚠️  ${component.split('/')[0]} still uses next/image directly`);
      warnings++;
    } else {
      console.log(`  ℹ️  ${component.split('/')[0]} doesn't use images`);
    }
  }
});

// Check 4: Verify documentation exists
console.log('\n✓ Checking documentation...');
const docsPath = path.join(__dirname, '../docs/image-optimization-guide.md');
if (fs.existsSync(docsPath)) {
  console.log('  ✅ Image optimization guide found');
  success++;
} else {
  console.log('  ⚠️  Image optimization guide not found');
  warnings++;
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Verification Summary:');
console.log('='.repeat(50));
console.log(`✅ Success: ${success}`);
console.log(`⚠️  Warnings: ${warnings}`);
console.log(`❌ Errors: ${errors}`);

if (errors === 0 && warnings === 0) {
  console.log('\n🎉 All checks passed! Image optimization is properly implemented.');
} else if (errors === 0) {
  console.log('\n✓ Implementation complete with minor warnings.');
} else {
  console.log('\n❌ Some checks failed. Please review the errors above.');
  process.exit(1);
}

console.log('\n📝 Next Steps:');
console.log('1. Run: npm run dev');
console.log('2. Open browser DevTools Network tab');
console.log('3. Verify WEBP/AVIF format is served');
console.log('4. Test lazy loading by scrolling');
console.log('5. Run Lighthouse audit for performance metrics');

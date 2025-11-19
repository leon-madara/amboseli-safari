/**
 * Typography and Formatting Verification Script
 * Task 9: Verify responsive typography and formatting implementation
 * 
 * This script verifies:
 * - Price formatting includes $ symbol (Requirement 8.3)
 * - Display font is used for room names (Requirement 8.1)
 * - Tagline has lighter weight (Requirement 8.2)
 * - CSS clamp() is used for responsive sizing (Requirement 9.4)
 * - Two-column grid on desktop, single column on mobile (Requirement 8.5)
 */

const fs = require('fs');
const path = require('path');

console.log('='.repeat(60));
console.log('Typography and Formatting Verification');
console.log('='.repeat(60));
console.log();

// Read the RoomCard component
const componentPath = path.join(__dirname, '..', 'RoomCard.tsx');
const componentContent = fs.readFileSync(componentPath, 'utf8');

// Read the CSS module
const cssPath = path.join(__dirname, '..', 'RoomCard.module.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

let allPassed = true;

// Test 1: Price formatting includes $ symbol
console.log('Test 1: Price formatting includes $ symbol');
const priceFormatRegex = /formattedPrice\s*=\s*`From\s+\$\$\{room\.price\}\/night`/;
if (priceFormatRegex.test(componentContent)) {
  console.log('✅ PASS: Price formatting includes $ symbol');
} else {
  console.log('❌ FAIL: Price formatting does not include $ symbol');
  allPassed = false;
}
console.log();

// Test 2: Display font is used for room names
console.log('Test 2: Display font is used for room names');
const displayFontRegex = /\.roomName\s*\{[^}]*font-family:\s*var\(--font-family-display\)/s;
if (displayFontRegex.test(cssContent)) {
  console.log('✅ PASS: Display font (Playfair Display) is used for room names');
} else {
  console.log('❌ FAIL: Display font is not used for room names');
  allPassed = false;
}
console.log();

// Test 3: Tagline has lighter weight
console.log('Test 3: Tagline has lighter weight');
const taglineWeightRegex = /\.roomTagline\s*\{[^}]*font-weight:\s*300/s;
if (taglineWeightRegex.test(cssContent)) {
  console.log('✅ PASS: Tagline has font-weight: 300 (lighter weight)');
} else {
  console.log('❌ FAIL: Tagline does not have lighter weight');
  allPassed = false;
}
console.log();

// Test 4: CSS clamp() is used for responsive sizing
console.log('Test 4: CSS clamp() is used for responsive sizing');
const clampRegex = /clamp\(/g;
const clampMatches = cssContent.match(clampRegex);
if (clampMatches && clampMatches.length >= 3) {
  console.log(`✅ PASS: CSS clamp() is used ${clampMatches.length} times for responsive sizing`);
} else {
  console.log('❌ FAIL: CSS clamp() is not used sufficiently');
  allPassed = false;
}
console.log();

// Test 5: Room name font sizes (32px desktop, 28px mobile)
console.log('Test 5: Room name font sizes (32px desktop, 28px mobile)');
const desktopSizeRegex = /@media\s*\(min-width:\s*768px\)\s*\{[^}]*\.roomName\s*\{[^}]*font-size:\s*2rem/s;
const mobileSizeRegex = /@media\s*\(max-width:\s*767px\)\s*\{[^}]*\.roomName\s*\{[^}]*font-size:\s*1\.75rem/s;
const desktopPass = desktopSizeRegex.test(cssContent);
const mobilePass = mobileSizeRegex.test(cssContent);
if (desktopPass && mobilePass) {
  console.log('✅ PASS: Room name is 2rem (32px) on desktop and 1.75rem (28px) on mobile');
} else {
  if (!desktopPass) console.log('❌ FAIL: Desktop font size not set to 2rem (32px)');
  if (!mobilePass) console.log('❌ FAIL: Mobile font size not set to 1.75rem (28px)');
  allPassed = false;
}
console.log();

// Test 6: Terracotta color is used for price
console.log('Test 6: Terracotta color is used for price');
const terracottaRegex = /\.roomPrice\s*\{[^}]*color:\s*var\(--color-primary-terracotta\)/s;
if (terracottaRegex.test(cssContent)) {
  console.log('✅ PASS: Terracotta color variable is used for price');
} else {
  console.log('❌ FAIL: Terracotta color variable is not used for price');
  allPassed = false;
}
console.log();

// Test 7: Two-column grid on desktop, single column on mobile
console.log('Test 7: Two-column grid on desktop, single column on mobile');
const desktopGridRegex = /@media\s*\(min-width:\s*768px\)\s*\{[^}]*\.featuresList\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*1fr\)/s;
const mobileGridRegex = /@media\s*\(max-width:\s*767px\)\s*\{[^}]*\.featuresList\s*\{[^}]*grid-template-columns:\s*1fr/s;
const desktopGridPass = desktopGridRegex.test(cssContent);
const mobileGridPass = mobileGridRegex.test(cssContent);
if (desktopGridPass && mobileGridPass) {
  console.log('✅ PASS: Features list uses two-column grid on desktop, single column on mobile');
} else {
  if (!desktopGridPass) console.log('❌ FAIL: Desktop grid not set to two columns');
  if (!mobileGridPass) console.log('❌ FAIL: Mobile grid not set to single column');
  allPassed = false;
}
console.log();

// Test 8: SVG icons are present
console.log('Test 8: SVG icons are present for size and capacity');
const sizeIconRegex = /<svg[^>]*className=\{styles\.detailIcon\}/;
const checkIconRegex = /<svg[^>]*className=\{styles\.checkIcon\}/;
const sizeIconPass = sizeIconRegex.test(componentContent);
const checkIconPass = checkIconRegex.test(componentContent);
if (sizeIconPass && checkIconPass) {
  console.log('✅ PASS: SVG icons are present for details and features');
} else {
  if (!sizeIconPass) console.log('❌ FAIL: Detail icons not found');
  if (!checkIconPass) console.log('❌ FAIL: Check icons not found');
  allPassed = false;
}
console.log();

// Summary
console.log('='.repeat(60));
if (allPassed) {
  console.log('✅ ALL TESTS PASSED');
  console.log('Typography and formatting implementation is complete!');
  process.exit(0);
} else {
  console.log('❌ SOME TESTS FAILED');
  console.log('Please review the failed tests above.');
  process.exit(1);
}

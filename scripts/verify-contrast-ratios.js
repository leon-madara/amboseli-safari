/**
 * Color Contrast Ratio Verification Script
 * Verifies WCAG AA compliance for navigation colors
 */

// Convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Convert RGBA string to object
function rgbaToObj(rgba) {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return null;
  return {
    r: parseInt(match[1]),
    g: parseInt(match[2]),
    b: parseInt(match[3]),
    a: match[4] ? parseFloat(match[4]) : 1
  };
}

// Calculate relative luminance
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio
function getContrastRatio(color1, color2) {
  const l1 = getLuminance(color1.r, color1.g, color1.b);
  const l2 = getLuminance(color2.r, color2.g, color2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Blend colors with alpha
function blendColors(fg, bg) {
  const alpha = fg.a !== undefined ? fg.a : 1;
  return {
    r: Math.round(fg.r * alpha + bg.r * (1 - alpha)),
    g: Math.round(fg.g * alpha + bg.g * (1 - alpha)),
    b: Math.round(fg.b * alpha + bg.b * (1 - alpha))
  };
}

// Test colors
const colors = {
  charcoal: hexToRgb('#3A3633'),
  cream: hexToRgb('#FAF7F2'),
  terracotta: hexToRgb('#8B4A2F'), // Updated darker terracotta
  sand: hexToRgb('#E8D5C4'),
  white: { r: 255, g: 255, b: 255 }
};

console.log('=== Navigation Color Contrast Verification ===\n');

// 1. Default state: charcoal text on cream background (with 0.7 opacity)
const creamBg = { ...colors.cream, a: 0.7 };
const creamBlended = blendColors(creamBg, colors.white);
const defaultContrast = getContrastRatio(colors.charcoal, creamBlended);
console.log('1. Default State:');
console.log(`   Text: #3A3633 (charcoal)`);
console.log(`   Background: rgba(250, 247, 242, 0.7) on white`);
console.log(`   Contrast Ratio: ${defaultContrast.toFixed(2)}:1`);
console.log(`   WCAG AA (4.5:1): ${defaultContrast >= 4.5 ? '✅ PASS' : '❌ FAIL'}`);
console.log(`   WCAG AAA (7:1): ${defaultContrast >= 7 ? '✅ PASS' : '❌ FAIL'}\n`);

// 2. Hover state: terracotta text on sand background (with 0.3 opacity)
const sandBg = { ...colors.sand, a: 0.3 };
const sandBlended = blendColors(sandBg, creamBlended);
const hoverContrast = getContrastRatio(colors.terracotta, sandBlended);
console.log('2. Hover State:');
console.log(`   Text: #8B4A2F (darker terracotta)`);
console.log(`   Background: rgba(232, 213, 196, 0.3) on cream`);
console.log(`   Contrast Ratio: ${hoverContrast.toFixed(2)}:1`);
console.log(`   WCAG AA (4.5:1): ${hoverContrast >= 4.5 ? '✅ PASS' : '❌ FAIL'}`);
console.log(`   WCAG AAA (7:1): ${hoverContrast >= 7 ? '✅ PASS' : '❌ FAIL'}\n`);

// 3. Active state: cream text on charcoal background
const activeContrast = getContrastRatio(colors.cream, colors.charcoal);
console.log('3. Active State:');
console.log(`   Text: #FAF7F2 (cream)`);
console.log(`   Background: #3A3633 (charcoal)`);
console.log(`   Contrast Ratio: ${activeContrast.toFixed(2)}:1`);
console.log(`   WCAG AA (4.5:1): ${activeContrast >= 4.5 ? '✅ PASS' : '❌ FAIL'}`);
console.log(`   WCAG AAA (7:1): ${activeContrast >= 7 ? '✅ PASS' : '❌ FAIL'}\n`);

// Summary
console.log('=== Summary ===');
const allPass = defaultContrast >= 4.5 && hoverContrast >= 4.5 && activeContrast >= 4.5;
console.log(`All states meet WCAG AA (4.5:1): ${allPass ? '✅ PASS' : '❌ FAIL'}`);

const allAAA = defaultContrast >= 7 && hoverContrast >= 7 && activeContrast >= 7;
console.log(`All states meet WCAG AAA (7:1): ${allAAA ? '✅ PASS' : '❌ FAIL'}`);

// Recommendations
if (!allPass) {
  console.log('\n=== Recommendations ===');
  if (defaultContrast < 4.5) {
    console.log('- Default state needs darker text or lighter background');
  }
  if (hoverContrast < 4.5) {
    console.log('- Hover state needs darker terracotta or lighter background');
  }
  if (activeContrast < 4.5) {
    console.log('- Active state needs adjustment');
  }
}

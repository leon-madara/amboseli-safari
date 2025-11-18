/**
 * Experiences Grid Responsive Behavior Test Script
 * Tests responsive behavior across different devices and viewports
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4
 * 
 * Tests:
 * - Mobile layout (single column, standard cards)
 * - Tablet layout (2-column grid)
 * - Desktop layout (auto-fit grid with size variants)
 * - Touch interaction support
 * - Viewport-relative sizing
 * - Breakpoint transitions
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

// Test results tracking
const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  tests: [],
};

/**
 * Log test result
 */
function logTest(name, passed, message = '') {
  const status = passed ? `${colors.green}✓ PASS${colors.reset}` : `${colors.red}✗ FAIL${colors.reset}`;
  console.log(`  ${status} ${name}`);
  if (message) {
    console.log(`    ${colors.cyan}${message}${colors.reset}`);
  }
  
  results.tests.push({ name, passed, message });
  if (passed) {
    results.passed++;
  } else {
    results.failed++;
  }
}

/**
 * Log warning
 */
function logWarning(message) {
  console.log(`  ${colors.yellow}⚠ WARNING${colors.reset} ${message}`);
  results.warnings++;
}

/**
 * Log section header
 */
function logSection(title) {
  console.log(`\n${colors.bright}${colors.blue}${title}${colors.reset}`);
  console.log('─'.repeat(70));
}

/**
 * Test 1: Verify mobile breakpoint styles (<768px)
 */
function testMobileBreakpoint() {
  logSection('Test 1: Mobile Breakpoint Styles (<768px)');
  
  const cssFile = path.join(__dirname, '../src/components/organisms/ExperiencesGrid/ExperiencesGrid.module.css');
  
  if (!fs.existsSync(cssFile)) {
    logTest('CSS file exists', false, 'ExperiencesGrid.module.css not found');
    return;
  }
  
  const cssContent = fs.readFileSync(cssFile, 'utf8');
  
  // Check for mobile media query
  const hasMobileQuery = cssContent.includes('@media (max-width: 767px)') ||
                        cssContent.includes('@media (max-width: 768px)');
  logTest(
    'Has mobile media query',
    hasMobileQuery,
    hasMobileQuery ? 'Mobile breakpoint defined' : 'Missing mobile media query'
  );
  
  if (hasMobileQuery) {
    // Extract mobile section
    const mobileStart = cssContent.search(/@media\s*\(\s*max-width:\s*76[78]px\s*\)/);
    const mobileSection = cssContent.substring(mobileStart, mobileStart + 1000);
    
    // Check for single column grid
    const hasSingleColumn = mobileSection.includes('grid-template-columns: 1fr') ||
                           mobileSection.includes('grid-template-columns:1fr');
    logTest(
      'Forces single column on mobile',
      hasSingleColumn,
      hasSingleColumn ? 'Single column layout found' : 'May not force single column'
    );
    
    // Check for card size override
    const overridesCardSize = mobileSection.includes('grid-column: span 1') &&
                             mobileSection.includes('grid-row: span 1');
    logTest(
      'Overrides all card sizes to standard',
      overridesCardSize,
      overridesCardSize ? 'Card size override found' : 'Card sizes may not be overridden'
    );
    
    // Check for important flags (ensures override)
    const usesImportant = mobileSection.includes('!important');
    logTest(
      'Uses !important for mobile overrides',
      usesImportant,
      usesImportant ? 'Important flags ensure override' : 'Consider using !important for reliability'
    );
    
    // Check for touch-friendly spacing
    const hasMinSpacing = mobileSection.includes('gap: 2rem') ||
                         mobileSection.includes('gap:2rem') ||
                         mobileSection.includes('gap: var(--space-8)');
    logTest(
      'Maintains touch-friendly spacing (≥2rem)',
      hasMinSpacing,
      hasMinSpacing ? 'Adequate spacing found' : 'Spacing may be too tight for touch'
    );
  }
}

/**
 * Test 2: Verify tablet breakpoint styles (768px-1023px)
 */
function testTabletBreakpoint() {
  logSection('Test 2: Tablet Breakpoint Styles (768px-1023px)');
  
  const cssFile = path.join(__dirname, '../src/components/organisms/ExperiencesGrid/ExperiencesGrid.module.css');
  
  if (!fs.existsSync(cssFile)) {
    logTest('CSS file exists', false);
    return;
  }
  
  const cssContent = fs.readFileSync(cssFile, 'utf8');
  
  // Check for tablet media query
  const hasTabletQuery = cssContent.includes('@media (min-width: 768px)') ||
                        cssContent.includes('@media (max-width: 1023px)') ||
                        cssContent.includes('@media (min-width: 768px) and (max-width: 1023px)');
  logTest(
    'Has tablet media query',
    hasTabletQuery,
    hasTabletQuery ? 'Tablet breakpoint defined' : 'Missing tablet-specific styles'
  );
  
  if (hasTabletQuery) {
    const tabletStart = cssContent.search(/@media.*768px.*1023px/);
    if (tabletStart !== -1) {
      const tabletSection = cssContent.substring(tabletStart, tabletStart + 800);
      
      // Check for 2-column grid
      const hasTwoColumns = tabletSection.includes('grid-template-columns: repeat(2,') ||
                           tabletSection.includes('minmax(320px, 1fr)');
      logTest(
        'Configures 2-column grid',
        hasTwoColumns,
        hasTwoColumns ? '2-column layout found' : 'May not have 2-column layout'
      );
    } else {
      logWarning('Tablet media query found but section could not be parsed');
    }
  }
}

/**
 * Test 3: Verify desktop responsive grid
 */
function testDesktopGrid() {
  logSection('Test 3: Desktop Responsive Grid (≥1024px)');
  
  const cssFile = path.join(__dirname, '../src/components/organisms/ExperiencesGrid/ExperiencesGrid.module.css');
  
  if (!fs.existsSync(cssFile)) {
    logTest('CSS file exists', false);
    return;
  }
  
  const cssContent = fs.readFileSync(cssFile, 'utf8');
  
  // Check for auto-fit grid
  const hasAutoFit = cssContent.includes('repeat(auto-fit,') ||
                    cssContent.includes('repeat(auto-fit ,');
  logTest(
    'Uses auto-fit for responsive columns',
    hasAutoFit,
    hasAutoFit ? 'Auto-fit grid found' : 'Missing auto-fit responsive behavior'
  );
  
  // Check for minmax with 320px minimum
  const hasMinmax = cssContent.includes('minmax(320px,');
  logTest(
    'Uses minmax(320px, 1fr) for column sizing',
    hasMinmax,
    hasMinmax ? 'Proper minmax sizing found' : 'Missing minmax column sizing'
  );
  
  // Check for grid-auto-flow: dense
  const hasDenseFlow = cssContent.includes('grid-auto-flow: dense') ||
                      cssContent.includes('grid-auto-flow:dense');
  logTest(
    'Uses dense grid algorithm',
    hasDenseFlow,
    hasDenseFlow ? 'Dense packing enabled' : 'Missing dense grid flow'
  );
  
  // Check for size variants
  const sizeVariants = ['standard', 'tall', 'wide', 'hero'];
  const foundVariants = sizeVariants.filter(variant => 
    cssContent.includes(`[data-size="${variant}"]`) ||
    cssContent.includes(`[data-size='${variant}']`)
  );
  
  logTest(
    'Supports all card size variants',
    foundVariants.length === 4,
    `Found variants: ${foundVariants.join(', ')}`
  );
}

/**
 * Test 4: Verify touch interaction support
 */
function testTouchInteractions() {
  logSection('Test 4: Touch Interaction Support');
  
  const cardCssFile = path.join(__dirname, '../src/components/molecules/ExperienceCard/ExperienceCard.module.css');
  
  if (!fs.existsSync(cardCssFile)) {
    logTest('Card CSS file exists', false, 'ExperienceCard.module.css not found');
    return;
  }
  
  const cssContent = fs.readFileSync(cardCssFile, 'utf8');
  
  // Check for active state
  const hasActiveState = cssContent.includes(':active') ||
                        cssContent.includes('.card:active');
  logTest(
    'Has :active state for touch feedback',
    hasActiveState,
    hasActiveState ? 'Touch active state found' : 'Missing :active state'
  );
  
  // Check for touch-action property
  const hasTouchAction = cssContent.includes('touch-action:');
  logTest(
    'Configures touch-action property',
    hasTouchAction,
    hasTouchAction ? 'Touch action configured' : 'Consider adding touch-action for better control'
  );
  
  // Check for -webkit-tap-highlight-color
  const hasTapHighlight = cssContent.includes('-webkit-tap-highlight-color');
  logTest(
    'Customizes tap highlight color',
    hasTapHighlight,
    hasTapHighlight ? 'Tap highlight customized' : 'Using default tap highlight'
  );
  
  // Check for cursor: pointer
  const hasPointer = cssContent.includes('cursor: pointer') ||
                    cssContent.includes('cursor:pointer');
  logTest(
    'Shows pointer cursor for interactive elements',
    hasPointer,
    hasPointer ? 'Pointer cursor found' : 'Missing cursor: pointer'
  );
}

/**
 * Test 5: Verify viewport-relative sizing
 */
function testViewportSizing() {
  logSection('Test 5: Viewport-Relative Sizing');
  
  const cssFile = path.join(__dirname, '../src/components/organisms/ExperiencesGrid/ExperiencesGrid.module.css');
  
  if (!fs.existsSync(cssFile)) {
    logTest('CSS file exists', false);
    return;
  }
  
  const cssContent = fs.readFileSync(cssFile, 'utf8');
  
  // Check for viewport units
  const usesVW = cssContent.includes('vw');
  const usesVH = cssContent.includes('vh');
  const usesVMin = cssContent.includes('vmin');
  const usesVMax = cssContent.includes('vmax');
  
  logTest(
    'Uses viewport units for responsive sizing',
    usesVW || usesVH || usesVMin || usesVMax,
    `Found: ${[usesVW && 'vw', usesVH && 'vh', usesVMin && 'vmin', usesVMax && 'vmax'].filter(Boolean).join(', ') || 'none'}`
  );
  
  // Check for container max-width
  const hasMaxWidth = cssContent.includes('max-width:') &&
                     (cssContent.includes('var(--container-max-width') ||
                      cssContent.includes('1440px') ||
                      cssContent.includes('1280px'));
  logTest(
    'Constrains maximum container width',
    hasMaxWidth,
    hasMaxWidth ? 'Max-width constraint found' : 'Container may be too wide on large screens'
  );
  
  // Check for responsive padding
  const hasResponsivePadding = cssContent.includes('padding:') &&
                              (cssContent.includes('var(--space-') ||
                               cssContent.includes('clamp('));
  logTest(
    'Uses responsive padding',
    hasResponsivePadding,
    hasResponsivePadding ? 'Responsive padding found' : 'Padding may not scale'
  );
}

/**
 * Test 6: Verify image responsiveness
 */
function testImageResponsiveness() {
  logSection('Test 6: Image Responsiveness');
  
  const cardFile = path.join(__dirname, '../src/components/molecules/ExperienceCard/ExperienceCard.tsx');
  
  if (!fs.existsSync(cardFile)) {
    logTest('Card component exists', false, 'ExperienceCard.tsx not found');
    return;
  }
  
  const componentContent = fs.readFileSync(cardFile, 'utf8');
  
  // Check for Next.js Image component
  const usesNextImage = componentContent.includes('next/image') &&
                       componentContent.includes('<Image');
  logTest(
    'Uses Next.js Image component',
    usesNextImage,
    usesNextImage ? 'Next.js Image found' : 'Missing Next.js Image optimization'
  );
  
  if (usesNextImage) {
    // Check for sizes attribute
    const hasSizes = componentContent.includes('sizes=');
    logTest(
      'Configures responsive sizes attribute',
      hasSizes,
      hasSizes ? 'Sizes attribute found' : 'Missing sizes for responsive images'
    );
    
    // Check for mobile-optimized sizes
    if (hasSizes) {
      const hasMobileSizes = componentContent.includes('max-width: 768px') &&
                            componentContent.includes('100vw');
      logTest(
        'Includes mobile-optimized image sizes',
        hasMobileSizes,
        hasMobileSizes ? 'Mobile sizes configured' : 'May not optimize for mobile'
      );
    }
    
    // Check for lazy loading
    const hasLazyLoading = componentContent.includes('loading="lazy"') ||
                          componentContent.includes('loading={"lazy"}');
    logTest(
      'Enables lazy loading',
      hasLazyLoading,
      hasLazyLoading ? 'Lazy loading enabled' : 'Images load eagerly'
    );
  }
}

/**
 * Test 7: Verify breakpoint consistency
 */
function testBreakpointConsistency() {
  logSection('Test 7: Breakpoint Consistency');
  
  const files = [
    'src/components/organisms/ExperiencesGrid/ExperiencesGrid.module.css',
    'src/components/molecules/ExperienceCard/ExperienceCard.module.css',
  ];
  
  const breakpoints = {
    mobile: [],
    tablet: [],
    desktop: [],
  };
  
  files.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Find mobile breakpoints
      const mobileMatches = content.match(/@media\s*\(\s*max-width:\s*(\d+)px\s*\)/g);
      if (mobileMatches) {
        mobileMatches.forEach(match => {
          const value = match.match(/(\d+)px/)[1];
          breakpoints.mobile.push(parseInt(value));
        });
      }
      
      // Find tablet breakpoints
      const tabletMatches = content.match(/@media\s*\(.*min-width:\s*(\d+)px.*max-width:\s*(\d+)px.*\)/g);
      if (tabletMatches) {
        tabletMatches.forEach(match => {
          const values = match.match(/(\d+)px/g);
          values.forEach(v => breakpoints.tablet.push(parseInt(v.replace('px', ''))));
        });
      }
    }
  });
  
  // Check mobile breakpoint consistency
  const uniqueMobile = [...new Set(breakpoints.mobile)];
  const mobileConsistent = uniqueMobile.length <= 2 && 
                          uniqueMobile.every(bp => bp === 767 || bp === 768);
  logTest(
    'Mobile breakpoints are consistent',
    mobileConsistent,
    mobileConsistent 
      ? `Using: ${uniqueMobile.join(', ')}px` 
      : `Inconsistent values: ${uniqueMobile.join(', ')}px`
  );
  
  // Check for standard breakpoint values
  const usesStandardBreakpoints = uniqueMobile.some(bp => bp === 767 || bp === 768);
  logTest(
    'Uses standard breakpoint values',
    usesStandardBreakpoints,
    usesStandardBreakpoints ? 'Standard 768px breakpoint found' : 'Non-standard breakpoints used'
  );
}

/**
 * Test 8: Verify container queries support (future-proofing)
 */
function testContainerQueries() {
  logSection('Test 8: Container Queries (Future-Proofing)');
  
  const cssFile = path.join(__dirname, '../src/components/organisms/ExperiencesGrid/ExperiencesGrid.module.css');
  
  if (!fs.existsSync(cssFile)) {
    logTest('CSS file exists', false);
    return;
  }
  
  const cssContent = fs.readFileSync(cssFile, 'utf8');
  
  // Check for container-type
  const hasContainerType = cssContent.includes('container-type:') ||
                          cssContent.includes('container:');
  logTest(
    'Uses container queries',
    hasContainerType,
    hasContainerType ? 'Container queries found' : 'Using media queries (standard approach)'
  );
  
  if (!hasContainerType) {
    logWarning('Container queries not used - this is fine, but consider for future enhancement');
  }
}

/**
 * Generate responsive testing checklist
 */
function generateTestingChecklist() {
  logSection('Manual Testing Checklist');
  
  const devices = [
    {
      category: 'Mobile Devices (< 768px)',
      devices: [
        'iPhone SE (375px)',
        'iPhone 12/13/14 (390px)',
        'iPhone 14 Pro Max (430px)',
        'Samsung Galaxy S21 (360px)',
        'Google Pixel 5 (393px)',
      ],
      tests: [
        'Verify single column layout',
        'Check all cards are standard size (no tall/wide/hero)',
        'Confirm 2rem gap between cards',
        'Test touch interactions (tap, scroll)',
        'Verify images load at appropriate size',
        'Check text readability',
        'Test in both portrait and landscape',
        'Verify no horizontal scroll',
      ],
    },
    {
      category: 'Tablet Devices (768px - 1023px)',
      devices: [
        'iPad Mini (768px)',
        'iPad (810px)',
        'iPad Air (820px)',
        'Samsung Galaxy Tab (800px)',
      ],
      tests: [
        'Verify 2-column grid layout',
        'Check card size distribution',
        'Test touch interactions',
        'Verify spacing is appropriate',
        'Test in both orientations',
        'Check image quality',
        'Verify hover states work (if device supports)',
      ],
    },
    {
      category: 'Desktop (≥ 1024px)',
      devices: [
        'Laptop (1366px)',
        'Desktop (1920px)',
        'Large Desktop (2560px)',
        'Ultra-wide (3440px)',
      ],
      tests: [
        'Verify auto-fit grid (3-4 columns)',
        'Check all size variants display correctly',
        'Test hover animations',
        'Verify keyboard navigation',
        'Check focus indicators',
        'Test at various window widths',
        'Verify max-width constraint',
        'Check grid dense packing',
      ],
    },
  ];
  
  devices.forEach(({ category, devices: deviceList, tests }) => {
    console.log(`\n${colors.bright}${colors.magenta}${category}${colors.reset}`);
    console.log(`${colors.cyan}Test Devices:${colors.reset} ${deviceList.join(', ')}`);
    console.log(`\n${colors.bright}Tests:${colors.reset}`);
    tests.forEach((test, index) => {
      console.log(`  ${index + 1}. ${test}`);
    });
  });
  
  console.log(`\n${colors.bright}${colors.yellow}Testing Tools:${colors.reset}`);
  console.log('  • Chrome DevTools Device Mode');
  console.log('  • Firefox Responsive Design Mode');
  console.log('  • Safari Responsive Design Mode');
  console.log('  • BrowserStack (real devices)');
  console.log('  • Physical devices when available');
  
  console.log(`\n${colors.bright}${colors.yellow}Key Breakpoints to Test:${colors.reset}`);
  console.log('  • 375px (iPhone SE)');
  console.log('  • 390px (iPhone 12/13/14)');
  console.log('  • 768px (Tablet portrait)');
  console.log('  • 1024px (Tablet landscape / Small desktop)');
  console.log('  • 1366px (Laptop)');
  console.log('  • 1920px (Desktop)');
}

/**
 * Generate browser DevTools testing guide
 */
function generateDevToolsGuide() {
  logSection('Browser DevTools Testing Guide');
  
  console.log(`\n${colors.bright}Chrome DevTools:${colors.reset}`);
  console.log('  1. Open DevTools (F12 or Cmd+Option+I)');
  console.log('  2. Click device toolbar icon (Cmd+Shift+M)');
  console.log('  3. Select device from dropdown or enter custom dimensions');
  console.log('  4. Test touch events by enabling "Touch" in sensors');
  console.log('  5. Throttle network to test image loading');
  
  console.log(`\n${colors.bright}Firefox Responsive Design Mode:${colors.reset}`);
  console.log('  1. Open DevTools (F12 or Cmd+Option+I)');
  console.log('  2. Click responsive design mode (Cmd+Option+M)');
  console.log('  3. Select device or enter custom dimensions');
  console.log('  4. Test touch simulation');
  console.log('  5. Use screenshot tool to capture layouts');
  
  console.log(`\n${colors.bright}Safari Responsive Design Mode:${colors.reset}`);
  console.log('  1. Enable Develop menu (Preferences > Advanced)');
  console.log('  2. Develop > Enter Responsive Design Mode');
  console.log('  3. Select device from toolbar');
  console.log('  4. Test on actual iOS devices via USB');
  
  console.log(`\n${colors.bright}Testing Checklist:${colors.reset}`);
  console.log('  ✓ Test all breakpoints (375px, 768px, 1024px, 1920px)');
  console.log('  ✓ Verify grid layout changes appropriately');
  console.log('  ✓ Check card size overrides on mobile');
  console.log('  ✓ Test touch interactions (tap, scroll, swipe)');
  console.log('  ✓ Verify images load at correct sizes');
  console.log('  ✓ Check text readability at all sizes');
  console.log('  ✓ Test landscape and portrait orientations');
  console.log('  ✓ Verify no horizontal scroll on mobile');
  console.log('  ✓ Check hover states on desktop');
  console.log('  ✓ Test keyboard navigation');
}

/**
 * Print summary
 */
function printSummary() {
  logSection('Test Summary');
  
  const total = results.passed + results.failed;
  const passRate = total > 0 ? ((results.passed / total) * 100).toFixed(1) : 0;
  
  console.log(`\n  Total Tests: ${colors.bright}${total}${colors.reset}`);
  console.log(`  Passed: ${colors.green}${results.passed}${colors.reset}`);
  console.log(`  Failed: ${colors.red}${results.failed}${colors.reset}`);
  console.log(`  Warnings: ${colors.yellow}${results.warnings}${colors.reset}`);
  console.log(`  Pass Rate: ${colors.bright}${passRate}%${colors.reset}`);
  
  if (results.failed > 0) {
    console.log(`\n${colors.red}${colors.bright}Failed Tests:${colors.reset}`);
    results.tests
      .filter(t => !t.passed)
      .forEach(t => {
        console.log(`  ${colors.red}✗${colors.reset} ${t.name}`);
        if (t.message) {
          console.log(`    ${t.message}`);
        }
      });
  }
  
  console.log(`\n${colors.bright}Next Steps:${colors.reset}`);
  console.log(`  1. Run manual tests using browser DevTools`);
  console.log(`  2. Test on real mobile devices (iOS and Android)`);
  console.log(`  3. Test on tablets (iPad, Android tablets)`);
  console.log(`  4. Verify touch interactions work properly`);
  console.log(`  5. Test at various desktop widths`);
  console.log(`  6. Document any issues found`);
  
  return results.failed === 0;
}

/**
 * Main test execution
 */
function runTests() {
  console.log(`\n${colors.bright}${colors.blue}═══════════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}  Experiences Grid Responsive Behavior Test Suite${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}  Requirements: 4.1, 4.2, 4.3, 4.4${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}═══════════════════════════════════════════════════════════════════${colors.reset}\n`);
  
  try {
    testMobileBreakpoint();
    testTabletBreakpoint();
    testDesktopGrid();
    testTouchInteractions();
    testViewportSizing();
    testImageResponsiveness();
    testBreakpointConsistency();
    testContainerQueries();
    
    generateTestingChecklist();
    generateDevToolsGuide();
    
    const success = printSummary();
    
    console.log(`\n${colors.bright}${colors.blue}═══════════════════════════════════════════════════════════════════${colors.reset}\n`);
    
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error(`\n${colors.red}${colors.bright}Error running tests:${colors.reset}`, error);
    process.exit(1);
  }
}

// Run tests
runTests();

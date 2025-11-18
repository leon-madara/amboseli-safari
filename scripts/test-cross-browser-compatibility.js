/**
 * Cross-Browser Compatibility Test Script
 * Tests navigation components across different browsers
 * 
 * Requirements: 2.5, 5.4
 * 
 * Tests:
 * - Backdrop-filter support detection
 * - Fallback behavior for unsupported browsers
 * - Browser-specific CSS prefixes
 * - Performance and rendering consistency
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
  console.log('─'.repeat(60));
}

/**
 * Test 1: Verify backdrop-filter CSS implementation
 */
function testBackdropFilterCSS() {
  logSection('Test 1: Backdrop-Filter CSS Implementation');
  
  const cssFile = path.join(__dirname, '../src/components/molecules/NavigationPill/NavigationPill.module.css');
  
  if (!fs.existsSync(cssFile)) {
    logTest('CSS file exists', false, 'NavigationPill.module.css not found');
    return;
  }
  
  const cssContent = fs.readFileSync(cssFile, 'utf8');
  
  // Check for backdrop-filter property
  const hasBackdropFilter = cssContent.includes('backdrop-filter:');
  logTest(
    'Has backdrop-filter property',
    hasBackdropFilter,
    hasBackdropFilter ? 'Found backdrop-filter in CSS' : 'Missing backdrop-filter property'
  );
  
  // Check for -webkit- prefix for Safari support
  const hasWebkitPrefix = cssContent.includes('-webkit-backdrop-filter:');
  logTest(
    'Has -webkit-backdrop-filter prefix',
    hasWebkitPrefix,
    hasWebkitPrefix ? 'Safari compatibility prefix found' : 'Missing -webkit- prefix for Safari'
  );
  
  // Check for fallback class
  const hasFallbackClass = cssContent.includes('.fallback') || cssContent.includes('.navigationPill.fallback');
  logTest(
    'Has fallback class for unsupported browsers',
    hasFallbackClass,
    hasFallbackClass ? 'Fallback styling found' : 'Missing fallback class'
  );
  
  // Check for solid background fallback
  if (hasFallbackClass) {
    const fallbackSection = cssContent.substring(cssContent.indexOf('.fallback'));
    const hasSolidBackground = fallbackSection.includes('background-color') && 
                               fallbackSection.includes('rgba(250, 247, 242, 0.9');
    logTest(
      'Fallback uses solid background',
      hasSolidBackground,
      hasSolidBackground ? 'Solid background fallback implemented' : 'Fallback may not have solid background'
    );
  }
  
  // Check for GPU acceleration hints
  const hasWillChange = cssContent.includes('will-change:');
  const hasTranslateZ = cssContent.includes('translateZ(0)');
  const hasBackfaceVisibility = cssContent.includes('backface-visibility:');
  
  logTest(
    'Has performance optimizations',
    hasWillChange || hasTranslateZ || hasBackfaceVisibility,
    `Found: ${[
      hasWillChange && 'will-change',
      hasTranslateZ && 'translateZ',
      hasBackfaceVisibility && 'backface-visibility'
    ].filter(Boolean).join(', ')}`
  );
}

/**
 * Test 2: Verify JavaScript support detection
 */
function testJavaScriptSupportDetection() {
  logSection('Test 2: JavaScript Support Detection');
  
  const componentFile = path.join(__dirname, '../src/components/molecules/NavigationPill/NavigationPill.tsx');
  
  if (!fs.existsSync(componentFile)) {
    logTest('Component file exists', false, 'NavigationPill.tsx not found');
    return;
  }
  
  const componentContent = fs.readFileSync(componentFile, 'utf8');
  
  // Check for CSS.supports() usage
  const hasCSSSupports = componentContent.includes('CSS.supports');
  logTest(
    'Uses CSS.supports() for feature detection',
    hasCSSSupports,
    hasCSSSupports ? 'Feature detection implemented' : 'Missing CSS.supports() check'
  );
  
  // Check for both standard and webkit checks
  const checksWebkit = componentContent.includes('-webkit-backdrop-filter');
  logTest(
    'Checks for -webkit-backdrop-filter',
    checksWebkit,
    checksWebkit ? 'Webkit prefix check found' : 'Missing webkit prefix check'
  );
  
  // Check for state management of support
  const hasSupportsState = componentContent.includes('supportsBackdropFilter') || 
                           componentContent.includes('hasBackdropFilterSupport');
  logTest(
    'Manages backdrop-filter support state',
    hasSupportsState,
    hasSupportsState ? 'Support state tracked' : 'Support state not tracked'
  );
  
  // Check for fallback class application
  const appliesFallbackClass = componentContent.includes('fallback') && 
                               componentContent.includes('supportsBackdropFilter');
  logTest(
    'Applies fallback class conditionally',
    appliesFallbackClass,
    appliesFallbackClass ? 'Conditional fallback class found' : 'Fallback class may not be conditional'
  );
}

/**
 * Test 3: Verify reduced motion support
 */
function testReducedMotionSupport() {
  logSection('Test 3: Reduced Motion Support');
  
  const cssFiles = [
    'src/components/molecules/NavigationPill/NavigationPill.module.css',
    'src/components/atoms/NavItem/NavItem.module.css',
    'src/components/organisms/PillNavigation/PillNavigation.module.css',
  ];
  
  let foundReducedMotion = false;
  let filesWithSupport = [];
  
  cssFiles.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('prefers-reduced-motion')) {
        foundReducedMotion = true;
        filesWithSupport.push(path.basename(file));
      }
    }
  });
  
  logTest(
    'Has prefers-reduced-motion media query',
    foundReducedMotion,
    foundReducedMotion 
      ? `Found in: ${filesWithSupport.join(', ')}` 
      : 'Missing prefers-reduced-motion support'
  );
  
  if (foundReducedMotion) {
    // Check NavigationPill specifically for blur disable
    const navPillPath = path.join(__dirname, '../src/components/molecules/NavigationPill/NavigationPill.module.css');
    if (fs.existsSync(navPillPath)) {
      const content = fs.readFileSync(navPillPath, 'utf8');
      const reducedMotionSection = content.substring(content.indexOf('prefers-reduced-motion'));
      
      const disablesBlur = reducedMotionSection.includes('backdrop-filter: none') ||
                          reducedMotionSection.includes('backdrop-filter:none');
      logTest(
        'Disables blur effects for reduced motion',
        disablesBlur,
        disablesBlur ? 'Blur disabled in reduced motion mode' : 'Blur may still be active'
      );
    }
  }
}

/**
 * Test 4: Verify mobile browser optimizations
 */
function testMobileBrowserOptimizations() {
  logSection('Test 4: Mobile Browser Optimizations');
  
  const cssFile = path.join(__dirname, '../src/components/molecules/NavigationPill/NavigationPill.module.css');
  
  if (!fs.existsSync(cssFile)) {
    logTest('CSS file exists', false);
    return;
  }
  
  const cssContent = fs.readFileSync(cssFile, 'utf8');
  
  // Check for iOS smooth scrolling
  const hasIOSScrolling = cssContent.includes('-webkit-overflow-scrolling: touch');
  logTest(
    'Has iOS smooth scrolling',
    hasIOSScrolling,
    hasIOSScrolling ? 'iOS touch scrolling enabled' : 'Missing -webkit-overflow-scrolling'
  );
  
  // Check for mobile media queries
  const hasMobileQuery = cssContent.includes('@media (max-width: 767px)') ||
                        cssContent.includes('@media (max-width: 768px)');
  logTest(
    'Has mobile media queries',
    hasMobileQuery,
    hasMobileQuery ? 'Mobile breakpoints defined' : 'Missing mobile media queries'
  );
  
  // Check for touch-friendly sizing
  if (hasMobileQuery) {
    const mobileSection = cssContent.substring(cssContent.indexOf('max-width: 767px'));
    const hasCalcWidth = mobileSection.includes('calc(100vw');
    logTest(
      'Uses viewport-relative sizing on mobile',
      hasCalcWidth,
      hasCalcWidth ? 'Responsive width calculation found' : 'May not adapt to viewport'
    );
  }
}

/**
 * Test 5: Verify scroll performance optimizations
 */
function testScrollPerformanceOptimizations() {
  logSection('Test 5: Scroll Performance Optimizations');
  
  const hookFile = path.join(__dirname, '../src/hooks/useScrollBlur.ts');
  
  if (!fs.existsSync(hookFile)) {
    logTest('Hook file exists', false, 'useScrollBlur.ts not found');
    return;
  }
  
  const hookContent = fs.readFileSync(hookFile, 'utf8');
  
  // Check for requestAnimationFrame
  const usesRAF = hookContent.includes('requestAnimationFrame');
  logTest(
    'Uses requestAnimationFrame for smooth updates',
    usesRAF,
    usesRAF ? 'RAF implementation found' : 'Missing requestAnimationFrame'
  );
  
  // Check for passive event listeners
  const usesPassive = hookContent.includes('passive: true');
  logTest(
    'Uses passive scroll listeners',
    usesPassive,
    usesPassive ? 'Passive listeners enabled' : 'Missing passive listener flag'
  );
  
  // Check for debouncing/throttling
  const hasIdleTimer = hookContent.includes('idleTimer') || hookContent.includes('setTimeout');
  logTest(
    'Implements scroll debouncing',
    hasIdleTimer,
    hasIdleTimer ? 'Idle timer/debouncing found' : 'Missing debounce mechanism'
  );
  
  // Check for cleanup
  const hasCleanup = hookContent.includes('removeEventListener') && 
                    hookContent.includes('clearTimeout');
  logTest(
    'Properly cleans up event listeners',
    hasCleanup,
    hasCleanup ? 'Cleanup logic implemented' : 'Missing cleanup'
  );
}

/**
 * Test 6: Verify browser-specific CSS prefixes
 */
function testBrowserPrefixes() {
  logSection('Test 6: Browser-Specific CSS Prefixes');
  
  const cssFiles = [
    'src/components/molecules/NavigationPill/NavigationPill.module.css',
    'src/components/atoms/NavItem/NavItem.module.css',
  ];
  
  const requiredPrefixes = {
    '-webkit-backdrop-filter': false,
    '-webkit-transform': false,
    '-webkit-backface-visibility': false,
    '-webkit-overflow-scrolling': false,
  };
  
  cssFiles.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      Object.keys(requiredPrefixes).forEach(prefix => {
        if (content.includes(prefix)) {
          requiredPrefixes[prefix] = true;
        }
      });
    }
  });
  
  Object.entries(requiredPrefixes).forEach(([prefix, found]) => {
    logTest(
      `Has ${prefix} prefix`,
      found,
      found ? 'Webkit prefix found' : 'Consider adding for better Safari support'
    );
  });
}

/**
 * Test 7: Verify error handling and graceful degradation
 */
function testErrorHandling() {
  logSection('Test 7: Error Handling & Graceful Degradation');
  
  const componentFile = path.join(__dirname, '../src/components/molecules/NavigationPill/NavigationPill.tsx');
  
  if (!fs.existsSync(componentFile)) {
    logTest('Component file exists', false);
    return;
  }
  
  const componentContent = fs.readFileSync(componentFile, 'utf8');
  
  // Check for try-catch blocks
  const hasTryCatch = componentContent.includes('try') && componentContent.includes('catch');
  logTest(
    'Has error handling (try-catch)',
    hasTryCatch,
    hasTryCatch ? 'Error handling found' : 'Consider adding try-catch blocks'
  );
  
  // Check for null/undefined checks
  const hasNullChecks = componentContent.includes('!items') || 
                       componentContent.includes('items.length === 0');
  logTest(
    'Checks for missing data',
    hasNullChecks,
    hasNullChecks ? 'Data validation found' : 'Missing null checks'
  );
  
  // Check for console warnings
  const hasWarnings = componentContent.includes('console.warn') || 
                     componentContent.includes('console.error');
  logTest(
    'Logs warnings for debugging',
    hasWarnings,
    hasWarnings ? 'Console logging implemented' : 'Consider adding debug logging'
  );
}

/**
 * Generate browser compatibility report
 */
function generateCompatibilityReport() {
  logSection('Browser Compatibility Report');
  
  const browsers = {
    'Chrome (latest 2 versions)': {
      backdropFilter: true,
      webkitPrefix: false,
      notes: 'Full support for backdrop-filter without prefix',
    },
    'Firefox (latest 2 versions)': {
      backdropFilter: true,
      webkitPrefix: false,
      notes: 'Full support for backdrop-filter without prefix',
    },
    'Safari (latest 2 versions)': {
      backdropFilter: true,
      webkitPrefix: true,
      notes: 'Requires -webkit-backdrop-filter prefix',
    },
    'Edge (latest 2 versions)': {
      backdropFilter: true,
      webkitPrefix: false,
      notes: 'Full support for backdrop-filter without prefix',
    },
    'iOS Safari': {
      backdropFilter: true,
      webkitPrefix: true,
      notes: 'Requires -webkit-backdrop-filter prefix, needs -webkit-overflow-scrolling',
    },
    'Chrome Mobile': {
      backdropFilter: true,
      webkitPrefix: false,
      notes: 'Full support, ensure touch optimizations',
    },
  };
  
  console.log('\n' + colors.bright + 'Expected Browser Support:' + colors.reset);
  Object.entries(browsers).forEach(([browser, support]) => {
    console.log(`\n  ${colors.cyan}${browser}${colors.reset}`);
    console.log(`    Backdrop-filter: ${support.backdropFilter ? colors.green + '✓' : colors.red + '✗'}${colors.reset}`);
    console.log(`    Webkit prefix: ${support.webkitPrefix ? colors.yellow + 'Required' : colors.green + 'Not needed'}${colors.reset}`);
    console.log(`    ${colors.blue}${support.notes}${colors.reset}`);
  });
}

/**
 * Generate testing checklist
 */
function generateTestingChecklist() {
  logSection('Manual Testing Checklist');
  
  const checklist = [
    {
      category: 'Chrome (Desktop)',
      tests: [
        'Verify blur transitions work smoothly on scroll',
        'Check that blur increases after 1 second of idle',
        'Confirm blur removes when at page top',
        'Test navigation interactions (hover, click, keyboard)',
        'Verify performance (60fps during scroll)',
      ],
    },
    {
      category: 'Firefox (Desktop)',
      tests: [
        'Verify backdrop-filter renders correctly',
        'Check blur transition smoothness',
        'Test keyboard navigation (Tab, Arrow keys)',
        'Verify focus indicators are visible',
        'Check reduced motion preference',
      ],
    },
    {
      category: 'Safari (Desktop)',
      tests: [
        'Verify -webkit-backdrop-filter works',
        'Check blur effect renders properly',
        'Test smooth scrolling behavior',
        'Verify GPU acceleration (no jank)',
        'Check for any visual glitches',
      ],
    },
    {
      category: 'Edge (Desktop)',
      tests: [
        'Verify backdrop-filter support',
        'Check blur transitions',
        'Test navigation functionality',
        'Verify accessibility features',
        'Check performance metrics',
      ],
    },
    {
      category: 'iOS Safari (Mobile)',
      tests: [
        'Verify -webkit-backdrop-filter works',
        'Check touch scrolling smoothness',
        'Test horizontal scroll on small screens',
        'Verify touch targets are adequate (44x44px)',
        'Check for any rendering issues',
        'Test in both portrait and landscape',
      ],
    },
    {
      category: 'Chrome Mobile (Android)',
      tests: [
        'Verify backdrop-filter renders',
        'Check scroll performance',
        'Test touch interactions',
        'Verify responsive breakpoints',
        'Check for any layout issues',
      ],
    },
  ];
  
  checklist.forEach(({ category, tests }) => {
    console.log(`\n${colors.bright}${category}${colors.reset}`);
    tests.forEach((test, index) => {
      console.log(`  ${index + 1}. ${test}`);
    });
  });
  
  console.log(`\n${colors.yellow}Note: These tests should be performed manually in actual browsers${colors.reset}`);
  console.log(`${colors.yellow}Use browser DevTools to verify CSS properties and performance${colors.reset}`);
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
  
  console.log(`\n${colors.bright}Recommendations:${colors.reset}`);
  console.log(`  1. Run manual tests in all target browsers`);
  console.log(`  2. Use BrowserStack or similar for comprehensive testing`);
  console.log(`  3. Test on real mobile devices when possible`);
  console.log(`  4. Monitor performance metrics in production`);
  console.log(`  5. Set up automated visual regression tests`);
  
  return results.failed === 0;
}

/**
 * Main test execution
 */
function runTests() {
  console.log(`\n${colors.bright}${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}  Cross-Browser Compatibility Test Suite${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}  Navigation Component - Requirements 2.5, 5.4${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}\n`);
  
  try {
    testBackdropFilterCSS();
    testJavaScriptSupportDetection();
    testReducedMotionSupport();
    testMobileBrowserOptimizations();
    testScrollPerformanceOptimizations();
    testBrowserPrefixes();
    testErrorHandling();
    
    generateCompatibilityReport();
    generateTestingChecklist();
    
    const success = printSummary();
    
    console.log(`\n${colors.bright}${colors.blue}═══════════════════════════════════════════════════════════${colors.reset}\n`);
    
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error(`\n${colors.red}${colors.bright}Error running tests:${colors.reset}`, error);
    process.exit(1);
  }
}

// Run tests
runTests();

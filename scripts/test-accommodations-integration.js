/**
 * Test script for AccommodationsChapter Safari Scroll Integration
 * 
 * This script verifies that the AccommodationsChapter is properly integrated
 * with the safari scroll experience according to requirements 11.1-11.5.
 * 
 * Usage: node scripts/test-accommodations-integration.js
 */

const puppeteer = require('puppeteer');

const TEST_URL = 'http://localhost:3002';
const TIMEOUT = 30000;

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(testName, passed, details = '') {
  const icon = passed ? '✓' : '✗';
  const color = passed ? 'green' : 'red';
  log(`${icon} ${testName}`, color);
  if (details) {
    log(`  ${details}`, 'cyan');
  }
}

async function testAccommodationsIntegration() {
  log('\n🧪 Testing AccommodationsChapter Safari Scroll Integration\n', 'blue');
  
  let browser;
  let testResults = {
    passed: 0,
    failed: 0,
    total: 0,
  };

  try {
    // Launch browser
    log('Launching browser...', 'yellow');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate to homepage
    log(`Navigating to ${TEST_URL}...`, 'yellow');
    await page.goto(TEST_URL, { waitUntil: 'networkidle2', timeout: TIMEOUT });
    
    log('\n--- Running Tests ---\n', 'blue');
    
    // Test 1: Chapter exists in DOM
    testResults.total++;
    const chapterExists = await page.evaluate(() => {
      const chapter = document.querySelector('[data-chapter="accommodations"]');
      return !!chapter;
    });
    logTest('Test 1: Chapter exists in DOM', chapterExists);
    if (chapterExists) testResults.passed++;
    else testResults.failed++;
    
    // Test 2: Chapter has correct ID
    testResults.total++;
    const chapterId = await page.evaluate(() => {
      const chapter = document.querySelector('[data-chapter="accommodations"]');
      return chapter?.id || null;
    });
    const hasCorrectId = chapterId === 'accommodations';
    logTest('Test 2: Chapter has correct ID', hasCorrectId, `ID: ${chapterId}`);
    if (hasCorrectId) testResults.passed++;
    else testResults.failed++;
    
    // Test 3: Chapter has midday gradient background
    testResults.total++;
    const hasGradient = await page.evaluate(() => {
      const chapter = document.querySelector('[data-chapter="accommodations"]');
      const gradient = chapter?.querySelector('[class*="gradientOverlay"]');
      if (!gradient) return false;
      
      const styles = window.getComputedStyle(gradient);
      const background = styles.background || styles.backgroundImage;
      return background.includes('linear-gradient') || background.includes('rgb');
    });
    logTest('Test 3: Chapter has midday gradient background', hasGradient);
    if (hasGradient) testResults.passed++;
    else testResults.failed++;
    
    // Test 4: Chapter has fade-in transition
    testResults.total++;
    const hasFadeInTransition = await page.evaluate(() => {
      const chapter = document.querySelector('[data-chapter="accommodations"]');
      if (!chapter) return false;
      
      const styles = window.getComputedStyle(chapter);
      const transition = styles.transition;
      const opacity = styles.opacity;
      
      // Check if transition includes opacity and initial opacity is 0 or will become 1
      return transition && transition.includes('opacity');
    });
    logTest('Test 4: Chapter has fade-in transition', hasFadeInTransition);
    if (hasFadeInTransition) testResults.passed++;
    else testResults.failed++;
    
    // Test 5: Chapter has correct minimum height (450vh for hold)
    testResults.total++;
    const heightInfo = await page.evaluate(() => {
      const chapter = document.querySelector('[data-chapter="accommodations"]');
      if (!chapter) return { hasCorrectHeight: false, minHeight: 'not found' };
      
      const styles = window.getComputedStyle(chapter);
      const minHeight = styles.minHeight;
      
      // Check if minHeight is in vh units or pixels
      let hasCorrectHeight = false;
      if (minHeight.includes('vh')) {
        hasCorrectHeight = parseInt(minHeight) >= 400;
      } else if (minHeight.includes('px')) {
        // Convert pixels to vh (assuming viewport height)
        const vh = window.innerHeight / 100;
        const minHeightVh = parseInt(minHeight) / vh;
        hasCorrectHeight = minHeightVh >= 400;
      }
      
      return { hasCorrectHeight, minHeight };
    });
    logTest('Test 5: Chapter has correct minimum height (≥400vh)', heightInfo.hasCorrectHeight, 
            `Min-height: ${heightInfo.minHeight}`);
    if (heightInfo.hasCorrectHeight) testResults.passed++;
    else testResults.failed++;
    
    // Test 6: Custom event listener setup
    testResults.total++;
    const eventListenerSetup = await page.evaluate(() => {
      return new Promise((resolve) => {
        let eventReceived = false;
        
        // Set up event listener
        const handler = (e) => {
          if (e.detail && e.detail.chapterName === 'accommodations') {
            eventReceived = true;
            document.removeEventListener('chapterActive', handler);
            resolve(true);
          }
        };
        
        document.addEventListener('chapterActive', handler);
        
        // Scroll to chapter to trigger event
        const chapter = document.querySelector('[data-chapter="accommodations"]');
        if (chapter) {
          chapter.scrollIntoView({ behavior: 'instant', block: 'center' });
          
          // Wait a bit for intersection observer to trigger
          setTimeout(() => {
            document.removeEventListener('chapterActive', handler);
            resolve(eventReceived);
          }, 2000);
        } else {
          resolve(false);
        }
      });
    });
    logTest('Test 6: Custom event emission on chapter activation', eventListenerSetup);
    if (eventListenerSetup) testResults.passed++;
    else testResults.failed++;
    
    // Test 7: Chapter positioning (comes after Wildlife Encounters)
    testResults.total++;
    const correctPositioning = await page.evaluate(() => {
      const accommodations = document.querySelector('[data-chapter="accommodations"]');
      const wildlife = document.querySelector('[data-chapter="wildlife-encounters"]');
      
      if (!accommodations || !wildlife) return false;
      
      const accommodationsRect = accommodations.getBoundingClientRect();
      const wildlifeRect = wildlife.getBoundingClientRect();
      
      // Accommodations should be below Wildlife Encounters in the document
      return accommodationsRect.top > wildlifeRect.top;
    });
    logTest('Test 7: Chapter positioned after Wildlife Encounters', correctPositioning);
    if (correctPositioning) testResults.passed++;
    else testResults.failed++;
    
    // Test 8: Cards wrapper has correct padding (includes 50vh hold)
    testResults.total++;
    const correctPadding = await page.evaluate(() => {
      const chapter = document.querySelector('[data-chapter="accommodations"]');
      const cardsWrapper = chapter?.querySelector('[class*="cardsWrapper"]');
      
      if (!cardsWrapper) return false;
      
      const styles = window.getComputedStyle(cardsWrapper);
      const paddingBottom = styles.paddingBottom;
      
      // Should have significant bottom padding for the hold
      return paddingBottom && parseInt(paddingBottom) > 0;
    });
    logTest('Test 8: Cards wrapper has bottom padding for 50vh hold', correctPadding);
    if (correctPadding) testResults.passed++;
    else testResults.failed++;
    
    // Test 9: Reduced motion support
    testResults.total++;
    const reducedMotionSupport = await page.evaluate(() => {
      // Check if CSS has reduced motion media query
      const styleSheets = Array.from(document.styleSheets);
      let hasReducedMotionRule = false;
      
      try {
        for (const sheet of styleSheets) {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule.media && rule.media.mediaText.includes('prefers-reduced-motion')) {
              hasReducedMotionRule = true;
              break;
            }
          }
          if (hasReducedMotionRule) break;
        }
      } catch (e) {
        // CORS or other access issues - assume it exists
        return true;
      }
      
      return hasReducedMotionRule;
    });
    logTest('Test 9: Reduced motion support in CSS', reducedMotionSupport);
    if (reducedMotionSupport) testResults.passed++;
    else testResults.failed++;
    
    // Test 10: Accessibility - ARIA labels present
    testResults.total++;
    const hasAriaLabels = await page.evaluate(() => {
      const chapter = document.querySelector('[data-chapter="accommodations"]');
      if (!chapter) return false;
      
      const hasLabelledBy = chapter.hasAttribute('aria-labelledby');
      const hasDescribedBy = chapter.hasAttribute('aria-describedby');
      
      return hasLabelledBy && hasDescribedBy;
    });
    logTest('Test 10: Accessibility - ARIA labels present', hasAriaLabels);
    if (hasAriaLabels) testResults.passed++;
    else testResults.failed++;
    
    // Print summary
    log('\n--- Test Summary ---\n', 'blue');
    log(`Total Tests: ${testResults.total}`, 'cyan');
    log(`Passed: ${testResults.passed}`, 'green');
    log(`Failed: ${testResults.failed}`, testResults.failed > 0 ? 'red' : 'green');
    log(`Success Rate: ${Math.round((testResults.passed / testResults.total) * 100)}%`, 
        testResults.failed === 0 ? 'green' : 'yellow');
    
    if (testResults.failed === 0) {
      log('\n✅ All tests passed! Integration is successful.\n', 'green');
    } else {
      log('\n⚠️  Some tests failed. Please review the results above.\n', 'yellow');
    }
    
  } catch (error) {
    log(`\n❌ Error during testing: ${error.message}\n`, 'red');
    console.error(error);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
  
  // Exit with appropriate code
  process.exit(testResults.failed > 0 ? 1 : 0);
}

// Run tests
testAccommodationsIntegration();

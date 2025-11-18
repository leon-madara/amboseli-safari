/**
 * Performance Testing Script for Morning Drive GSAP Animation
 * 
 * This script tests the performance of the Morning Drive scroll animation:
 * - Measures frame rate during scroll (target: 60fps)
 * - Checks for layout thrashing and excessive reflows
 * - Monitors memory usage during component lifecycle
 * - Provides optimization recommendations
 * 
 * Requirements: 7.4
 * 
 * Usage: node scripts/test-morning-drive-performance.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Performance thresholds
const PERFORMANCE_THRESHOLDS = {
  TARGET_FPS: 60,
  MINIMUM_FPS: 55,
  MAX_LAYOUT_DURATION: 50, // milliseconds
  MAX_PAINT_DURATION: 16, // milliseconds (1 frame at 60fps)
  MAX_MEMORY_INCREASE: 50, // MB
};

// Test configuration
const TEST_CONFIG = {
  url: 'http://localhost:3000',
  scrollDistance: 3000, // Total scroll distance in pixels
  scrollSteps: 60, // Number of scroll steps
  scrollDelay: 50, // Delay between scroll steps (ms)
};

/**
 * Calculate FPS from frame timestamps
 */
function calculateFPS(frameTimestamps) {
  if (frameTimestamps.length < 2) return 0;
  
  const frameTimes = [];
  for (let i = 1; i < frameTimestamps.length; i++) {
    frameTimes.push(frameTimestamps[i] - frameTimestamps[i - 1]);
  }
  
  const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
  return 1000 / avgFrameTime;
}

/**
 * Analyze performance metrics
 */
function analyzePerformanceMetrics(metrics) {
  const results = {
    fps: {
      average: metrics.fps.average,
      minimum: metrics.fps.minimum,
      maximum: metrics.fps.maximum,
      passed: metrics.fps.minimum >= PERFORMANCE_THRESHOLDS.MINIMUM_FPS,
    },
    layout: {
      count: metrics.layout.count,
      totalDuration: metrics.layout.totalDuration,
      averageDuration: metrics.layout.count > 0 
        ? metrics.layout.totalDuration / metrics.layout.count 
        : 0,
      passed: metrics.layout.count === 0 || 
              (metrics.layout.totalDuration / metrics.layout.count) < PERFORMANCE_THRESHOLDS.MAX_LAYOUT_DURATION,
    },
    paint: {
      count: metrics.paint.count,
      totalDuration: metrics.paint.totalDuration,
      averageDuration: metrics.paint.count > 0 
        ? metrics.paint.totalDuration / metrics.paint.count 
        : 0,
      passed: metrics.paint.count === 0 || 
              (metrics.paint.totalDuration / metrics.paint.count) < PERFORMANCE_THRESHOLDS.MAX_PAINT_DURATION,
    },
    memory: {
      initial: metrics.memory.initial,
      final: metrics.memory.final,
      increase: metrics.memory.final - metrics.memory.initial,
      passed: (metrics.memory.final - metrics.memory.initial) < PERFORMANCE_THRESHOLDS.MAX_MEMORY_INCREASE,
    },
  };
  
  results.overallPassed = results.fps.passed && 
                          results.layout.passed && 
                          results.paint.passed && 
                          results.memory.passed;
  
  return results;
}

/**
 * Generate optimization recommendations
 */
function generateRecommendations(results) {
  const recommendations = [];
  
  if (!results.fps.passed) {
    recommendations.push({
      severity: 'HIGH',
      issue: `Frame rate dropped to ${results.fps.minimum.toFixed(2)} fps (below ${PERFORMANCE_THRESHOLDS.MINIMUM_FPS} fps threshold)`,
      suggestions: [
        'Add will-change: transform to animated elements',
        'Ensure only transform and opacity properties are animated',
        'Check for JavaScript execution blocking the main thread',
        'Consider reducing scrub value for less frequent updates',
      ],
    });
  }
  
  if (!results.layout.passed) {
    recommendations.push({
      severity: 'HIGH',
      issue: `Layout thrashing detected: ${results.layout.count} layouts with average duration ${results.layout.averageDuration.toFixed(2)}ms`,
      suggestions: [
        'Avoid reading layout properties (offsetWidth, getBoundingClientRect) during animation',
        'Batch DOM reads before DOM writes',
        'Use transform instead of top/left for positioning',
        'Cache calculated values instead of recalculating on each frame',
      ],
    });
  }
  
  if (!results.paint.passed) {
    recommendations.push({
      severity: 'MEDIUM',
      issue: `Paint operations taking too long: average ${results.paint.averageDuration.toFixed(2)}ms per paint`,
      suggestions: [
        'Reduce the number of elements being painted',
        'Use CSS containment (contain: layout paint) on animated elements',
        'Ensure images are properly optimized',
        'Consider using CSS will-change property',
      ],
    });
  }
  
  if (!results.memory.passed) {
    recommendations.push({
      severity: 'MEDIUM',
      issue: `Memory increased by ${results.memory.increase.toFixed(2)}MB during animation`,
      suggestions: [
        'Check for memory leaks in GSAP timeline cleanup',
        'Ensure ScrollTrigger instances are properly killed on unmount',
        'Verify event listeners are removed in cleanup functions',
        'Consider using GSAP\'s invalidate() method to clear cached values',
      ],
    });
  }
  
  if (recommendations.length === 0) {
    recommendations.push({
      severity: 'INFO',
      issue: 'All performance metrics passed!',
      suggestions: [
        'Performance is within acceptable thresholds',
        'Continue monitoring on lower-end devices',
        'Consider testing on mobile devices for comprehensive coverage',
      ],
    });
  }
  
  return recommendations;
}

/**
 * Format test results for console output
 */
function formatResults(results, recommendations) {
  const lines = [];
  
  lines.push('');
  lines.push('═══════════════════════════════════════════════════════════');
  lines.push('  MORNING DRIVE GSAP ANIMATION - PERFORMANCE TEST RESULTS');
  lines.push('═══════════════════════════════════════════════════════════');
  lines.push('');
  
  // FPS Results
  lines.push('📊 FRAME RATE (FPS)');
  lines.push(`   Average: ${results.fps.average.toFixed(2)} fps`);
  lines.push(`   Minimum: ${results.fps.minimum.toFixed(2)} fps`);
  lines.push(`   Maximum: ${results.fps.maximum.toFixed(2)} fps`);
  lines.push(`   Target:  ${PERFORMANCE_THRESHOLDS.TARGET_FPS} fps`);
  lines.push(`   Status:  ${results.fps.passed ? '✅ PASSED' : '❌ FAILED'}`);
  lines.push('');
  
  // Layout Results
  lines.push('🔄 LAYOUT PERFORMANCE');
  lines.push(`   Layout Count:    ${results.layout.count}`);
  lines.push(`   Total Duration:  ${results.layout.totalDuration.toFixed(2)}ms`);
  lines.push(`   Average:         ${results.layout.averageDuration.toFixed(2)}ms`);
  lines.push(`   Threshold:       ${PERFORMANCE_THRESHOLDS.MAX_LAYOUT_DURATION}ms`);
  lines.push(`   Status:          ${results.layout.passed ? '✅ PASSED' : '❌ FAILED'}`);
  lines.push('');
  
  // Paint Results
  lines.push('🎨 PAINT PERFORMANCE');
  lines.push(`   Paint Count:     ${results.paint.count}`);
  lines.push(`   Total Duration:  ${results.paint.totalDuration.toFixed(2)}ms`);
  lines.push(`   Average:         ${results.paint.averageDuration.toFixed(2)}ms`);
  lines.push(`   Threshold:       ${PERFORMANCE_THRESHOLDS.MAX_PAINT_DURATION}ms`);
  lines.push(`   Status:          ${results.paint.passed ? '✅ PASSED' : '❌ FAILED'}`);
  lines.push('');
  
  // Memory Results
  lines.push('💾 MEMORY USAGE');
  lines.push(`   Initial:  ${results.memory.initial.toFixed(2)}MB`);
  lines.push(`   Final:    ${results.memory.final.toFixed(2)}MB`);
  lines.push(`   Increase: ${results.memory.increase.toFixed(2)}MB`);
  lines.push(`   Threshold: ${PERFORMANCE_THRESHOLDS.MAX_MEMORY_INCREASE}MB`);
  lines.push(`   Status:   ${results.memory.passed ? '✅ PASSED' : '❌ FAILED'}`);
  lines.push('');
  
  // Overall Status
  lines.push('═══════════════════════════════════════════════════════════');
  lines.push(`  OVERALL STATUS: ${results.overallPassed ? '✅ PASSED' : '❌ FAILED'}`);
  lines.push('═══════════════════════════════════════════════════════════');
  lines.push('');
  
  // Recommendations
  if (recommendations.length > 0) {
    lines.push('📋 RECOMMENDATIONS');
    lines.push('');
    recommendations.forEach((rec, index) => {
      const severityIcon = rec.severity === 'HIGH' ? '🔴' : 
                          rec.severity === 'MEDIUM' ? '🟡' : '🟢';
      lines.push(`${severityIcon} ${rec.severity}: ${rec.issue}`);
      rec.suggestions.forEach(suggestion => {
        lines.push(`   • ${suggestion}`);
      });
      if (index < recommendations.length - 1) {
        lines.push('');
      }
    });
    lines.push('');
  }
  
  lines.push('═══════════════════════════════════════════════════════════');
  
  return lines.join('\n');
}

/**
 * Main test function
 */
async function runPerformanceTest() {
  console.log('🚀 Starting Morning Drive GSAP Animation Performance Test...\n');
  
  let browser;
  try {
    // Launch browser
    console.log('📱 Launching browser...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });
    
    const page = await browser.newPage();
    
    // Set viewport to desktop size
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log(`🌐 Navigating to ${TEST_CONFIG.url}...`);
    await page.goto(TEST_CONFIG.url, { waitUntil: 'networkidle0' });
    
    // Wait for the Morning Drive section to be visible
    console.log('⏳ Waiting for Morning Drive section...');
    await page.waitForSelector('[data-chapter="morning-drive"]', { timeout: 10000 });
    
    // Scroll to the Morning Drive section
    console.log('📜 Scrolling to Morning Drive section...');
    await page.evaluate(() => {
      const section = document.querySelector('[data-chapter="morning-drive"]');
      if (section) {
        section.scrollIntoView({ behavior: 'instant' });
      }
    });
    
    // Wait a moment for any initial animations to settle
    await page.waitForTimeout(1000);
    
    // Get initial memory usage
    const initialMetrics = await page.metrics();
    const initialMemory = initialMetrics.JSHeapUsedSize / (1024 * 1024); // Convert to MB
    
    console.log('🎬 Starting performance recording...');
    
    // Start performance tracing
    await page.tracing.start({
      path: path.join(__dirname, '../performance-trace.json'),
      screenshots: false,
      categories: ['devtools.timeline', 'disabled-by-default-devtools.timeline.frame'],
    });
    
    // Collect frame timestamps
    const frameTimestamps = [];
    
    // Set up frame tracking
    await page.evaluateOnNewDocument(() => {
      window.frameTimestamps = [];
      const trackFrame = (timestamp) => {
        window.frameTimestamps.push(timestamp);
        requestAnimationFrame(trackFrame);
      };
      requestAnimationFrame(trackFrame);
    });
    
    // Perform smooth scroll through the animation
    console.log('📊 Measuring performance during scroll animation...');
    const scrollStep = TEST_CONFIG.scrollDistance / TEST_CONFIG.scrollSteps;
    
    for (let i = 0; i < TEST_CONFIG.scrollSteps; i++) {
      await page.evaluate((step) => {
        window.scrollBy({ top: step, behavior: 'instant' });
      }, scrollStep);
      
      await page.waitForTimeout(TEST_CONFIG.scrollDelay);
      
      // Collect frame timestamps
      const timestamps = await page.evaluate(() => {
        const stamps = window.frameTimestamps;
        window.frameTimestamps = [];
        return stamps;
      });
      
      frameTimestamps.push(...timestamps);
    }
    
    console.log('⏹️  Stopping performance recording...');
    
    // Stop tracing
    await page.tracing.stop();
    
    // Get final memory usage
    const finalMetrics = await page.metrics();
    const finalMemory = finalMetrics.JSHeapUsedSize / (1024 * 1024); // Convert to MB
    
    // Parse trace data
    console.log('🔍 Analyzing performance data...');
    const traceData = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../performance-trace.json'), 'utf8')
    );
    
    // Analyze trace events
    let layoutCount = 0;
    let layoutDuration = 0;
    let paintCount = 0;
    let paintDuration = 0;
    
    traceData.traceEvents.forEach(event => {
      if (event.name === 'Layout') {
        layoutCount++;
        layoutDuration += (event.dur || 0) / 1000; // Convert to ms
      } else if (event.name === 'Paint') {
        paintCount++;
        paintDuration += (event.dur || 0) / 1000; // Convert to ms
      }
    });
    
    // Calculate FPS
    const fps = calculateFPS(frameTimestamps);
    const minFPS = Math.min(...frameTimestamps.slice(1).map((t, i) => 
      1000 / (t - frameTimestamps[i])
    ));
    const maxFPS = Math.max(...frameTimestamps.slice(1).map((t, i) => 
      1000 / (t - frameTimestamps[i])
    ));
    
    // Compile metrics
    const metrics = {
      fps: {
        average: fps,
        minimum: minFPS,
        maximum: maxFPS,
      },
      layout: {
        count: layoutCount,
        totalDuration: layoutDuration,
      },
      paint: {
        count: paintCount,
        totalDuration: paintDuration,
      },
      memory: {
        initial: initialMemory,
        final: finalMemory,
      },
    };
    
    // Analyze results
    const results = analyzePerformanceMetrics(metrics);
    const recommendations = generateRecommendations(results);
    
    // Output results
    console.log(formatResults(results, recommendations));
    
    // Save detailed results to file
    const reportPath = path.join(__dirname, '../performance-test-report.json');
    fs.writeFileSync(
      reportPath,
      JSON.stringify({ results, recommendations, metrics }, null, 2)
    );
    console.log(`📄 Detailed report saved to: ${reportPath}\n`);
    
    // Clean up trace file
    fs.unlinkSync(path.join(__dirname, '../performance-trace.json'));
    
    // Exit with appropriate code
    process.exit(results.overallPassed ? 0 : 1);
    
  } catch (error) {
    console.error('❌ Performance test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the test
runPerformanceTest();

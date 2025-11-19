/**
 * Performance Audit Script for Accommodations Stacking Cards
 * 
 * Measures:
 * - Frame rate during scroll (target: 60fps)
 * - Cumulative Layout Shift (target: < 0.1)
 * - Memory usage for leaks
 * - Largest Contentful Paint (target: < 2.5s)
 * - Total Blocking Time (target: < 300ms)
 * 
 * Run with: node scripts/test-accommodations-performance.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Performance thresholds
const THRESHOLDS = {
  FPS: 60,
  CLS: 0.1,
  LCP: 2500, // milliseconds
  TBT: 300,  // milliseconds
  MEMORY_LEAK_THRESHOLD: 5 * 1024 * 1024, // 5MB increase
};

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logMetric(name, value, threshold, unit, lowerIsBetter = true) {
  const passed = lowerIsBetter ? value <= threshold : value >= threshold;
  const status = passed ? '✓ PASS' : '✗ FAIL';
  const statusColor = passed ? colors.green : colors.red;
  
  log(`  ${status} ${name}: ${value}${unit} (threshold: ${lowerIsBetter ? '≤' : '≥'} ${threshold}${unit})`, statusColor);
  return passed;
}

async function measureFrameRate(page) {
  log('\n📊 Measuring Frame Rate During Scroll...', colors.cyan);
  
  // Navigate to accommodations section
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  
  // Start measuring frames
  const frameData = await page.evaluate(async () => {
    return new Promise((resolve) => {
      const frames = [];
      let lastTime = performance.now();
      let frameCount = 0;
      const duration = 3000; // 3 seconds of scrolling
      const startTime = performance.now();
      
      // Scroll to accommodations section (2030vh)
      const targetScroll = window.innerHeight * 20.3; // Approximate position
      const scrollStep = targetScroll / 60; // Smooth scroll over 60 frames
      
      function measureFrame() {
        const currentTime = performance.now();
        const delta = currentTime - lastTime;
        
        if (delta > 0) {
          frames.push({
            fps: 1000 / delta,
            timestamp: currentTime - startTime,
          });
        }
        
        lastTime = currentTime;
        frameCount++;
        
        // Continue scrolling
        window.scrollBy(0, scrollStep);
        
        if (currentTime - startTime < duration) {
          requestAnimationFrame(measureFrame);
        } else {
          resolve(frames);
        }
      }
      
      requestAnimationFrame(measureFrame);
    });
  });
  
  // Calculate average FPS
  const avgFps = frameData.reduce((sum, frame) => sum + frame.fps, 0) / frameData.length;
  const minFps = Math.min(...frameData.map(f => f.fps));
  const droppedFrames = frameData.filter(f => f.fps < 55).length;
  
  log(`  Average FPS: ${avgFps.toFixed(2)}`);
  log(`  Minimum FPS: ${minFps.toFixed(2)}`);
  log(`  Dropped Frames (< 55fps): ${droppedFrames}`);
  
  const passed = logMetric('Frame Rate', avgFps.toFixed(2), THRESHOLDS.FPS, 'fps', false);
  
  return {
    avgFps: avgFps.toFixed(2),
    minFps: minFps.toFixed(2),
    droppedFrames,
    passed,
  };
}

async function measureCLS(page) {
  log('\n📊 Measuring Cumulative Layout Shift...', colors.cyan);
  
  const cls = await page.evaluate(() => {
    return new Promise((resolve) => {
      let clsValue = 0;
      
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
      });
      
      observer.observe({ type: 'layout-shift', buffered: true });
      
      // Wait for page to settle
      setTimeout(() => {
        observer.disconnect();
        resolve(clsValue);
      }, 5000);
    });
  });
  
  const passed = logMetric('Cumulative Layout Shift', cls.toFixed(4), THRESHOLDS.CLS, '');
  
  return {
    cls: cls.toFixed(4),
    passed,
  };
}

async function measureMemoryUsage(page) {
  log('\n📊 Monitoring Memory Usage for Leaks...', colors.cyan);
  
  // Take initial memory snapshot
  const initialMetrics = await page.metrics();
  const initialMemory = initialMetrics.JSHeapUsedSize;
  
  log(`  Initial Memory: ${(initialMemory / 1024 / 1024).toFixed(2)} MB`);
  
  // Scroll through section multiple times
  await page.evaluate(async () => {
    const scrollCycles = 5;
    const targetScroll = window.innerHeight * 20.3;
    
    for (let i = 0; i < scrollCycles; i++) {
      window.scrollTo(0, 0);
      await new Promise(resolve => setTimeout(resolve, 500));
      window.scrollTo(0, targetScroll);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  });
  
  // Force garbage collection if available
  try {
    const hasGC = await page.evaluate(() => typeof window.gc === 'function');
    if (hasGC) {
      await page.evaluate(() => window.gc());
    }
  } catch (e) {
    // GC not available, continue without it
  }
  
  // Take final memory snapshot
  const finalMetrics = await page.metrics();
  const finalMemory = finalMetrics.JSHeapUsedSize;
  const memoryIncrease = finalMemory - initialMemory;
  
  log(`  Final Memory: ${(finalMemory / 1024 / 1024).toFixed(2)} MB`);
  log(`  Memory Increase: ${(memoryIncrease / 1024 / 1024).toFixed(2)} MB`);
  
  const passed = logMetric(
    'Memory Leak Check',
    (memoryIncrease / 1024 / 1024).toFixed(2),
    (THRESHOLDS.MEMORY_LEAK_THRESHOLD / 1024 / 1024).toFixed(2),
    ' MB'
  );
  
  return {
    initialMemory: (initialMemory / 1024 / 1024).toFixed(2),
    finalMemory: (finalMemory / 1024 / 1024).toFixed(2),
    memoryIncrease: (memoryIncrease / 1024 / 1024).toFixed(2),
    passed,
  };
}

async function measureLCP(page) {
  log('\n📊 Measuring Largest Contentful Paint...', colors.cyan);
  
  const lcp = await page.evaluate(() => {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        resolve(lastEntry.renderTime || lastEntry.loadTime);
      });
      
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      
      // Fallback timeout
      setTimeout(() => {
        observer.disconnect();
        resolve(0);
      }, 10000);
    });
  });
  
  const passed = logMetric('Largest Contentful Paint', lcp.toFixed(2), THRESHOLDS.LCP, 'ms');
  
  return {
    lcp: lcp.toFixed(2),
    passed,
  };
}

async function measureTBT(page) {
  log('\n📊 Measuring Total Blocking Time...', colors.cyan);
  
  const tbt = await page.evaluate(() => {
    return new Promise((resolve) => {
      let totalBlockingTime = 0;
      
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            totalBlockingTime += entry.duration - 50;
          }
        }
      });
      
      observer.observe({ type: 'longtask', buffered: true });
      
      setTimeout(() => {
        observer.disconnect();
        resolve(totalBlockingTime);
      }, 5000);
    });
  });
  
  const passed = logMetric('Total Blocking Time', tbt.toFixed(2), THRESHOLDS.TBT, 'ms');
  
  return {
    tbt: tbt.toFixed(2),
    passed,
  };
}

async function runLighthouseAudit(url) {
  log('\n📊 Running Lighthouse Audit...', colors.cyan);
  log('  Note: Lighthouse requires separate installation. Skipping automated Lighthouse run.');
  log('  To run Lighthouse manually:');
  log('    1. npm install -g lighthouse');
  log('    2. lighthouse http://localhost:3000 --only-categories=performance --view');
  
  return {
    skipped: true,
    message: 'Run Lighthouse manually for comprehensive audit',
  };
}

async function runPerformanceAudit() {
  log('='.repeat(60), colors.blue);
  log('  ACCOMMODATIONS STACKING CARDS - PERFORMANCE AUDIT', colors.blue);
  log('='.repeat(60), colors.blue);
  
  let browser;
  
  try {
    // Check if dev server is running
    log('\n🔍 Checking if development server is running...', colors.yellow);
    log('  Make sure to run: npm run dev', colors.yellow);
    
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    
    const page = await browser.newPage();
    
    // Set viewport to desktop size
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigate to homepage
    log('\n🌐 Navigating to homepage...', colors.cyan);
    const port = process.env.PORT || '3002';
    const url = `http://localhost:${port}`;
    try {
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 15000,
      });
    } catch (error) {
      log(`\n❌ ERROR: Could not connect to ${url}`, colors.red);
      log('   Please start the development server with: npm run dev', colors.yellow);
      process.exit(1);
    }
    
    // Run all performance tests
    const results = {
      frameRate: await measureFrameRate(page),
      cls: await measureCLS(page),
      memory: await measureMemoryUsage(page),
      lcp: await measureLCP(page),
      tbt: await measureTBT(page),
      lighthouse: await runLighthouseAudit(url),
    };
    
    // Summary
    log('\n' + '='.repeat(60), colors.blue);
    log('  PERFORMANCE AUDIT SUMMARY', colors.blue);
    log('='.repeat(60), colors.blue);
    
    const allTests = [
      results.frameRate.passed,
      results.cls.passed,
      results.memory.passed,
      results.lcp.passed,
      results.tbt.passed,
    ];
    
    const passedCount = allTests.filter(Boolean).length;
    const totalCount = allTests.length;
    
    log(`\n  Tests Passed: ${passedCount}/${totalCount}`, passedCount === totalCount ? colors.green : colors.yellow);
    
    if (passedCount === totalCount) {
      log('\n  ✓ All performance metrics meet target thresholds!', colors.green);
    } else {
      log('\n  ⚠ Some performance metrics need attention.', colors.yellow);
    }
    
    // Save results to file
    const resultsPath = path.join(__dirname, '..', 'docs', 'accommodations-performance-audit.json');
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    log(`\n  📄 Detailed results saved to: ${resultsPath}`, colors.cyan);
    
    log('\n' + '='.repeat(60), colors.blue);
    
    return results;
    
  } catch (error) {
    log(`\n❌ ERROR: ${error.message}`, colors.red);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the audit
if (require.main === module) {
  runPerformanceAudit()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { runPerformanceAudit };

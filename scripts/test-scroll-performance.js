/**
 * Scroll Performance Test Script
 * 
 * This script can be run in the browser console to test scroll performance
 * of the GSAP pinning effect in the AccommodationsChapter.
 * 
 * Usage:
 * 1. Navigate to the homepage
 * 2. Scroll to the Accommodations section
 * 3. Open browser DevTools console
 * 4. Copy and paste this script
 * 5. Run the test
 * 
 * The script will:
 * - Monitor FPS during scroll
 * - Report average FPS
 * - Identify frame drops below 60fps
 * - Measure animation performance
 */

(function testScrollPerformance() {
  console.log('🚀 Starting Scroll Performance Test...');
  console.log('📊 Monitoring FPS for GSAP pinning animations...\n');

  let frameCount = 0;
  let lastTime = performance.now();
  let fps = 60;
  const fpsHistory = [];
  let isMonitoring = false;
  let animationFrameId = null;

  // FPS monitoring function
  function measureFPS() {
    const currentTime = performance.now();
    const delta = currentTime - lastTime;
    
    if (delta >= 1000) {
      fps = Math.round((frameCount * 1000) / delta);
      fpsHistory.push(fps);
      
      // Log FPS with color coding
      const color = fps >= 55 ? 'green' : fps >= 45 ? 'orange' : 'red';
      console.log(`%c FPS: ${fps}`, `color: ${color}; font-weight: bold;`);
      
      frameCount = 0;
      lastTime = currentTime;
    }
    
    frameCount++;
    
    if (isMonitoring) {
      animationFrameId = requestAnimationFrame(measureFPS);
    }
  }

  // Start monitoring
  function startMonitoring() {
    if (isMonitoring) return;
    
    isMonitoring = true;
    lastTime = performance.now();
    frameCount = 0;
    fpsHistory.length = 0;
    
    console.log('✅ Monitoring started. Scroll through the Accommodations section...');
    measureFPS();
  }

  // Stop monitoring and show results
  function stopMonitoring() {
    if (!isMonitoring) return;
    
    isMonitoring = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    
    if (fpsHistory.length === 0) {
      console.log('⚠️ No data collected. Make sure to scroll during monitoring.');
      return;
    }
    
    // Calculate statistics
    const avgFPS = Math.round(fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length);
    const minFPS = Math.min(...fpsHistory);
    const maxFPS = Math.max(...fpsHistory);
    const dropsBelow60 = fpsHistory.filter(fps => fps < 60).length;
    const dropsBelow45 = fpsHistory.filter(fps => fps < 45).length;
    
    console.log('\n📈 Performance Test Results:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Average FPS: ${avgFPS}`);
    console.log(`Min FPS: ${minFPS}`);
    console.log(`Max FPS: ${maxFPS}`);
    console.log(`Samples: ${fpsHistory.length}`);
    console.log(`Drops below 60fps: ${dropsBelow60} (${Math.round(dropsBelow60/fpsHistory.length*100)}%)`);
    console.log(`Drops below 45fps: ${dropsBelow45} (${Math.round(dropsBelow45/fpsHistory.length*100)}%)`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Performance verdict
    if (avgFPS >= 55 && dropsBelow45 === 0) {
      console.log('%c✅ EXCELLENT: Smooth 60fps performance maintained!', 'color: green; font-weight: bold; font-size: 14px;');
    } else if (avgFPS >= 45 && dropsBelow45 < fpsHistory.length * 0.1) {
      console.log('%c⚠️ GOOD: Minor frame drops detected, but generally smooth.', 'color: orange; font-weight: bold; font-size: 14px;');
    } else {
      console.log('%c❌ NEEDS OPTIMIZATION: Significant frame drops detected.', 'color: red; font-weight: bold; font-size: 14px;');
    }
    
    console.log('\n💡 Tips for optimization:');
    console.log('- Ensure will-change: transform is applied to animated elements');
    console.log('- Only animate transform and opacity properties');
    console.log('- Use force3D: true in GSAP animations');
    console.log('- Check for other heavy scripts running on the page');
    console.log('- Test on different devices and browsers\n');
  }

  // Auto-start monitoring for 10 seconds
  startMonitoring();
  
  setTimeout(() => {
    stopMonitoring();
  }, 10000);

  console.log('⏱️ Test will run for 10 seconds. Scroll through the Accommodations section now!');
  console.log('💡 To stop early, run: stopMonitoring()\n');

  // Expose functions globally for manual control
  window.startMonitoring = startMonitoring;
  window.stopMonitoring = stopMonitoring;
})();

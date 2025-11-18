# Morning Drive GSAP Animation - Performance Testing Guide

## Overview

This document provides comprehensive guidance for testing and optimizing the performance of the Morning Drive GSAP scroll animation. The animation must maintain smooth 60fps performance across all devices and browsers.

**Requirements:** 7.4

## Performance Targets

| Metric | Target | Minimum Acceptable |
|--------|--------|-------------------|
| Frame Rate | 60 fps | 55 fps |
| Layout Duration | < 10ms per layout | < 50ms per layout |
| Paint Duration | < 10ms per paint | < 16ms per paint |
| Memory Increase | < 20MB | < 50MB |

## Automated Performance Testing

### Running the Performance Test Script

The automated performance test script measures frame rate, layout thrashing, paint performance, and memory usage during the scroll animation.

```bash
# Ensure the development server is running
npm run dev

# In a separate terminal, run the performance test
node scripts/test-morning-drive-performance.js
```

### Test Output

The script provides:
- **Frame Rate Analysis**: Average, minimum, and maximum FPS during scroll
- **Layout Performance**: Count and duration of layout operations
- **Paint Performance**: Count and duration of paint operations
- **Memory Usage**: Initial, final, and increase in memory
- **Pass/Fail Status**: For each metric against thresholds
- **Optimization Recommendations**: Specific suggestions if metrics fail

### Interpreting Results

**✅ PASSED**: All metrics are within acceptable thresholds. Performance is optimal.

**❌ FAILED**: One or more metrics exceeded thresholds. Review recommendations and apply optimizations.

## Manual Performance Testing

### Using Chrome DevTools Performance Tab

1. **Open Chrome DevTools**
   - Press `F12` or `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (Mac)
   - Navigate to the **Performance** tab

2. **Start Recording**
   - Click the record button (circle icon)
   - Scroll through the Morning Drive section slowly and smoothly
   - Stop recording after completing the animation sequence

3. **Analyze Results**
   - **FPS Chart**: Look for consistent green bars at 60fps
   - **Main Thread**: Check for long tasks (yellow/red bars)
   - **Frames**: Identify dropped frames (red bars in FPS chart)
   - **Layout/Reflow**: Look for excessive layout operations
   - **Paint**: Check paint operation frequency and duration

### Key Indicators of Performance Issues

#### Low Frame Rate (< 55fps)
**Symptoms:**
- Choppy or stuttering scroll animation
- Visible lag when scrolling
- FPS chart shows frequent drops below 55fps

**Common Causes:**
- JavaScript execution blocking the main thread
- Excessive DOM manipulation
- Heavy paint operations
- Layout thrashing

#### Layout Thrashing
**Symptoms:**
- Multiple layout operations in quick succession
- Long layout durations (> 50ms)
- Purple bars in Performance timeline

**Common Causes:**
- Reading layout properties (offsetWidth, getBoundingClientRect) during animation
- Interleaving DOM reads and writes
- Triggering forced synchronous layouts

#### Excessive Paint Operations
**Symptoms:**
- Green bars in Performance timeline
- Paint operations taking > 16ms
- Frequent repaints during scroll

**Common Causes:**
- Animating properties that trigger paint (color, background)
- Large paint areas
- Complex CSS effects (shadows, gradients)

## Performance Optimizations Applied

### 1. GPU Acceleration
```typescript
// Force GPU acceleration with force3D
gsap.to(element, {
  x: 100,
  y: 100,
  force3D: true, // Forces GPU acceleration
});
```

### 2. CSS will-change Property
```css
.imageContainer {
  will-change: transform;
}

.animatedHeading {
  will-change: transform, opacity;
}
```

### 3. CSS Containment
```css
.imageContainer {
  contain: layout style;
}

.animatedHeading {
  contain: layout style paint;
}
```

### 4. Transform-Only Animations
- Only animate `transform` and `opacity` properties
- Avoid animating `top`, `left`, `width`, `height`
- These properties trigger layout/reflow

### 5. GSAP ScrollTrigger Optimizations
```typescript
scrollTrigger: {
  scrub: 0.5, // Smooth scrubbing with slight delay
  invalidateOnRefresh: true, // Prevent stale cached values
  anticipatePin: 1, // Prevent jump when pinning starts
}
```

### 6. Debounced Resize Handler
```typescript
const handleResize = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    setViewportWidth(window.innerWidth);
    ScrollTrigger.refresh();
  }, 150); // 150ms debounce
};
```

## Testing on Lower-End Devices

### Device Categories to Test

1. **High-End Desktop** (Baseline)
   - Modern CPU (Intel i5/i7, AMD Ryzen 5/7)
   - Dedicated GPU
   - 16GB+ RAM
   - Expected: 60fps consistently

2. **Mid-Range Laptop**
   - Integrated graphics
   - 8GB RAM
   - Expected: 55-60fps

3. **Older Desktop/Laptop** (3-5 years old)
   - Older CPU/GPU
   - 4-8GB RAM
   - Expected: 50-55fps (acceptable with minor optimizations)

4. **High-End Mobile** (iPhone 12+, Samsung S21+)
   - Expected: 55-60fps

5. **Mid-Range Mobile** (iPhone SE, Samsung A series)
   - Expected: 50-55fps

6. **Older Mobile** (3-4 years old)
   - Expected: 45-50fps (may require additional optimizations)

### Mobile Testing Checklist

- [ ] Test in portrait orientation
- [ ] Test in landscape orientation
- [ ] Test with battery saver mode enabled
- [ ] Test with multiple browser tabs open
- [ ] Test on cellular connection (not just WiFi)
- [ ] Monitor device temperature during extended scrolling

## Browser-Specific Performance Considerations

### Chrome/Edge (Chromium)
- Generally best performance
- Excellent DevTools for debugging
- Good GPU acceleration support

### Firefox
- May have slightly different rendering behavior
- Use Firefox DevTools Performance tab
- Check for any Firefox-specific issues

### Safari (macOS/iOS)
- May have different GPU acceleration behavior
- Test on actual devices (not just simulators)
- Check for any WebKit-specific issues
- Monitor for memory leaks (Safari can be more sensitive)

## Common Performance Issues and Solutions

### Issue: Frame Rate Drops During Scroll

**Solution 1: Reduce Scrub Value**
```typescript
scrollTrigger: {
  scrub: 0.3, // Reduce from 0.5 to 0.3 for less frequent updates
}
```

**Solution 2: Simplify Animations**
- Remove unnecessary animation properties
- Reduce the number of animated elements
- Combine multiple timelines if possible

### Issue: Layout Thrashing Detected

**Solution: Batch DOM Reads and Writes**
```typescript
// BAD: Interleaving reads and writes
element1.style.width = element2.offsetWidth + 'px';
element3.style.height = element4.offsetHeight + 'px';

// GOOD: Batch reads, then batch writes
const width = element2.offsetWidth;
const height = element4.offsetHeight;
element1.style.width = width + 'px';
element3.style.height = height + 'px';
```

### Issue: High Memory Usage

**Solution: Verify Cleanup**
```typescript
useEffect(() => {
  // ... animation setup
  
  return () => {
    // Kill all timelines
    timelinesRef.current.forEach(timeline => timeline.kill());
    
    // Kill all ScrollTrigger instances
    scrollTriggersRef.current.forEach(trigger => trigger.kill());
    
    // Clear refs
    timelinesRef.current = [];
    scrollTriggersRef.current = [];
  };
}, []);
```

### Issue: Janky Animation on Mobile

**Solution 1: Reduce Animation Complexity**
- Simplify transform calculations
- Reduce the number of animated elements
- Use simpler easing functions

**Solution 2: Add Touch-Action CSS**
```css
.morningDriveChapter {
  touch-action: pan-y; /* Allow only vertical scrolling */
}
```

## Performance Monitoring in Production

### Key Metrics to Monitor

1. **Core Web Vitals**
   - Largest Contentful Paint (LCP)
   - First Input Delay (FID)
   - Cumulative Layout Shift (CLS)

2. **Custom Metrics**
   - Average scroll FPS
   - Animation completion rate
   - Memory usage patterns

### Tools for Production Monitoring

- **Google Analytics**: Track user engagement with the section
- **Sentry**: Monitor JavaScript errors and performance issues
- **Lighthouse CI**: Automated performance testing in CI/CD pipeline
- **Real User Monitoring (RUM)**: Track actual user performance

## Optimization Checklist

Before deploying to production, verify:

- [ ] Automated performance test passes all thresholds
- [ ] Manual testing in Chrome DevTools shows 55+ fps
- [ ] No layout thrashing detected
- [ ] Memory usage remains stable
- [ ] Tested on at least 3 different device types
- [ ] Tested on Chrome, Firefox, and Safari
- [ ] Mobile performance is acceptable (50+ fps)
- [ ] Reduced motion preference is respected
- [ ] No console errors or warnings
- [ ] Images are optimized and properly sized
- [ ] GSAP timelines are properly cleaned up

## Troubleshooting Guide

### Problem: Test Script Fails to Connect

**Solution:**
```bash
# Ensure dev server is running on port 3000
npm run dev

# Check if port 3000 is accessible
curl http://localhost:3000
```

### Problem: Puppeteer Installation Issues

**Solution:**
```bash
# Reinstall puppeteer
npm uninstall puppeteer
npm install puppeteer --save-dev

# Or use puppeteer-core with system Chrome
npm install puppeteer-core --save-dev
```

### Problem: Performance Test Shows False Positives

**Solution:**
- Close other applications to free up system resources
- Run test multiple times and average results
- Test on a clean browser profile without extensions
- Ensure system is not under heavy load

## Additional Resources

- [GSAP Performance Tips](https://greensock.com/docs/v3/GSAP/gsap.config())
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Web Performance Best Practices](https://web.dev/performance/)
- [CSS Containment](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Containment)
- [will-change Property](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)

## Conclusion

Performance testing is critical for ensuring a smooth user experience. The Morning Drive GSAP animation has been optimized for 60fps performance, but continuous monitoring and testing on various devices is essential to maintain quality across all user scenarios.

If performance issues persist after applying these optimizations, consider:
1. Simplifying the animation sequence
2. Reducing the scroll distance
3. Using intersection observer to only animate when visible
4. Implementing progressive enhancement (simpler animation for lower-end devices)

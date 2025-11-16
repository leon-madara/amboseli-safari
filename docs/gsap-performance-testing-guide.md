# GSAP Pinning Performance Testing Guide

## Overview

This guide provides instructions for testing the scroll performance of the GSAP pinning effect in the AccommodationsChapter to ensure it maintains 60fps.

## Performance Optimizations Implemented

### 1. CSS Optimizations

✅ **will-change: transform** applied to:
- `.roomImage` - Hints browser to optimize transform animations
- `.roomCard` - Hints browser to optimize transform animations

### 2. GSAP Optimizations

✅ **anticipatePin: 1** in ScrollTrigger configuration
- Prevents layout shift when pinning starts
- Improves perceived performance

✅ **force3D: true** on all animations
- Forces GPU acceleration for all transform animations
- Ensures hardware acceleration is used

✅ **GPU-Accelerated Properties Only**
- Only animating `transform` (translateX, translateY, scale)
- Only animating `opacity`
- No layout-triggering properties (width, height, top, left, etc.)

### 3. Cleanup Optimizations

✅ **Proper GSAP Context Cleanup**
- `ctx.revert()` called on component unmount
- Prevents memory leaks
- Removes all ScrollTrigger instances

✅ **Event Listener Cleanup**
- Resize event listener properly removed
- No orphaned event listeners

## Testing Methods

### Method 1: Browser DevTools Performance Monitor

1. **Open Chrome DevTools**
   - Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)

2. **Enable Performance Monitor**
   - Press `Ctrl+Shift+P` (Windows) / `Cmd+Shift+P` (Mac)
   - Type "Show Performance Monitor"
   - Select the option

3. **Navigate to Homepage**
   - Go to `http://localhost:3000`
   - Scroll to the Accommodations section (around 500vh)

4. **Monitor FPS**
   - Watch the "Frames per second" metric
   - Scroll through the pinned section slowly and quickly
   - **Target: 55-60 FPS consistently**

5. **Check for Jank**
   - Look for red bars in the FPS graph
   - Red = frame drops below 60fps
   - Minimal red bars = good performance

### Method 2: Automated Performance Test Script

1. **Navigate to Homepage**
   ```
   http://localhost:3000
   ```

2. **Scroll to Accommodations Section**
   - Scroll down to the pinned section

3. **Open Browser Console**
   - Press `F12` and click "Console" tab

4. **Run Performance Test**
   - Copy the contents of `scripts/test-scroll-performance.js`
   - Paste into console and press Enter
   - Script will monitor FPS for 10 seconds

5. **Scroll During Test**
   - Scroll up and down through the pinned section
   - Try different scroll speeds
   - Test smooth scrolling and quick scrolling

6. **Review Results**
   - Average FPS should be ≥55
   - Drops below 45fps should be <10%
   - Look for "EXCELLENT" or "GOOD" verdict

### Method 3: Chrome DevTools Performance Recording

1. **Open DevTools Performance Tab**
   - Press `F12` → Click "Performance" tab

2. **Start Recording**
   - Click the record button (circle icon)
   - Or press `Ctrl+E` (Windows) / `Cmd+E` (Mac)

3. **Scroll Through Section**
   - Scroll through the Accommodations pinned section
   - Scroll for 5-10 seconds

4. **Stop Recording**
   - Click the stop button
   - Wait for analysis to complete

5. **Analyze Results**
   - Look at the "Frames" section
   - Green bars = good (60fps)
   - Yellow bars = warning (30-60fps)
   - Red bars = bad (<30fps)
   - **Target: Mostly green bars**

6. **Check Main Thread Activity**
   - Look for long tasks (>50ms)
   - Identify any JavaScript bottlenecks
   - Verify GSAP animations are GPU-accelerated

### Method 4: Lighthouse Performance Audit

1. **Open DevTools Lighthouse Tab**
   - Press `F12` → Click "Lighthouse" tab

2. **Configure Audit**
   - Select "Performance" category
   - Choose "Desktop" or "Mobile"
   - Click "Analyze page load"

3. **Review Metrics**
   - **Target Performance Score: ≥85**
   - Check "Cumulative Layout Shift (CLS)" - should be <0.1
   - Check "Total Blocking Time (TBT)" - should be <300ms

## Performance Benchmarks

### Desktop (1920x1080, 60Hz)
- **Target FPS:** 60fps
- **Acceptable FPS:** 55-60fps
- **Minimum FPS:** 45fps
- **Frame drops:** <5% of frames

### Laptop (1366x768, 60Hz)
- **Target FPS:** 60fps
- **Acceptable FPS:** 50-60fps
- **Minimum FPS:** 40fps
- **Frame drops:** <10% of frames

### Mobile (375x667, 60Hz)
- **Target FPS:** 60fps
- **Acceptable FPS:** 45-60fps
- **Minimum FPS:** 30fps
- **Note:** Pinning is disabled on mobile (<768px)

## Common Performance Issues

### Issue 1: Low FPS (30-45fps)

**Possible Causes:**
- Other heavy scripts running on page
- Too many DOM elements
- Non-GPU-accelerated properties being animated
- Browser extensions interfering

**Solutions:**
- Disable browser extensions
- Check for other animations on page
- Verify `force3D: true` is applied
- Check browser console for errors

### Issue 2: Stuttering/Jank

**Possible Causes:**
- Layout thrashing
- Synchronous JavaScript execution
- Large images not optimized
- Too many particles/effects

**Solutions:**
- Ensure only transform/opacity are animated
- Optimize images (use WebP, proper sizes)
- Reduce particle count if present
- Check for forced synchronous layouts

### Issue 3: Memory Leaks

**Possible Causes:**
- ScrollTrigger instances not cleaned up
- Event listeners not removed
- GSAP context not reverted

**Solutions:**
- Verify `ctx.revert()` is called on unmount
- Check event listeners are removed
- Use Chrome DevTools Memory profiler

## Browser Testing Checklist

Test on the following browsers to ensure consistent performance:

- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Edge (latest 2 versions)

## Device Testing Checklist

Test on different device types:

- [ ] Desktop (1920x1080 or higher)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667) - Verify pinning is disabled

## Performance Optimization Checklist

- [x] `will-change: transform` applied to animated elements
- [x] `anticipatePin: 1` in ScrollTrigger configuration
- [x] Only `transform` and `opacity` properties animated
- [x] `force3D: true` on all GSAP animations
- [x] Proper cleanup with `ctx.revert()` in useEffect
- [x] Event listeners properly removed
- [x] Mobile adaptation (pinning disabled <768px)
- [x] Reduced motion support
- [ ] Performance tested on multiple browsers
- [ ] Performance tested on multiple devices
- [ ] 60fps maintained during scroll

## Troubleshooting

### If FPS is below 55:

1. **Check Browser Console**
   - Look for JavaScript errors
   - Check for warnings

2. **Disable Other Features**
   - Temporarily disable other animations
   - Test with minimal page content

3. **Profile with DevTools**
   - Use Performance tab to identify bottlenecks
   - Look for long tasks on main thread

4. **Verify GPU Acceleration**
   - Open Chrome DevTools → Rendering
   - Enable "Paint flashing"
   - Green = GPU accelerated
   - Red = CPU rendered

5. **Check Hardware**
   - Test on different device
   - Verify GPU is available
   - Check browser hardware acceleration is enabled

## Reporting Performance Issues

When reporting performance issues, include:

1. **Browser & Version**
   - Example: Chrome 120.0.6099.109

2. **Device Specs**
   - CPU, RAM, GPU
   - Screen resolution

3. **FPS Measurements**
   - Average FPS
   - Minimum FPS
   - Percentage of frame drops

4. **Screenshots/Videos**
   - DevTools Performance recording
   - Performance Monitor screenshot

5. **Steps to Reproduce**
   - Exact scroll behavior
   - Any other actions taken

## Success Criteria

The GSAP pinning implementation is considered performant when:

✅ Average FPS ≥55 on desktop
✅ Frame drops <5% on desktop
✅ No visible stuttering or jank
✅ Smooth transitions between rooms
✅ CLS (Cumulative Layout Shift) <0.1
✅ No memory leaks after multiple scrolls
✅ Consistent performance across browsers
✅ Mobile fallback works smoothly

## Additional Resources

- [GSAP Performance Tips](https://greensock.com/docs/v3/GSAP/gsap.set())
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Web Vitals](https://web.dev/vitals/)
- [CSS will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)

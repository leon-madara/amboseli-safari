# Performance Metrics Explained

A developer-friendly guide to understanding web performance metrics and what they mean for user experience.

---

## Frame Rate (FPS)

### What It Measures
The number of frames rendered per second during scroll animations. Higher is better.

### Why It Matters
- **60 fps**: Smooth, fluid animation - the gold standard
- **30-60 fps**: Noticeable stuttering, feels sluggish
- **< 30 fps**: Very choppy, poor user experience

### Target: ≥ 60 fps

### How It's Measured
```javascript
// Measure time between frames
const frames = [];
let lastTime = performance.now();

function measureFrame() {
  const currentTime = performance.now();
  const delta = currentTime - lastTime;
  const fps = 1000 / delta;
  frames.push(fps);
  lastTime = currentTime;
  requestAnimationFrame(measureFrame);
}
```

### Common Causes of Low FPS
1. **Layout thrashing**: Reading and writing DOM properties repeatedly
2. **Heavy JavaScript**: Complex calculations on every frame
3. **Too many elements**: Animating hundreds of elements simultaneously
4. **Non-GPU properties**: Animating width/height instead of transform

### How to Fix
- Use `transform` and `opacity` (GPU-accelerated)
- Batch DOM reads and writes
- Use `requestAnimationFrame` for animations
- Apply `will-change` CSS property
- Reduce number of animated elements

---

## Cumulative Layout Shift (CLS)

### What It Measures
The sum of all unexpected layout shifts that occur during page load. Lower is better.

### Why It Matters
Layout shifts are frustrating:
- User tries to click a button, it moves
- Reading text that suddenly jumps
- Accidental clicks on wrong elements

### Target: ≤ 0.1

### Scoring
- **< 0.1**: Good - minimal shifting
- **0.1 - 0.25**: Needs improvement
- **> 0.25**: Poor - significant shifting

### How It's Measured
```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      clsValue += entry.value;
    }
  }
});

observer.observe({ type: 'layout-shift', buffered: true });
```

### Common Causes
1. **Images without dimensions**: Browser doesn't know how much space to reserve
2. **Web fonts loading**: Text reflows when font loads
3. **Dynamic content**: Ads, embeds inserted without reserved space
4. **Animations**: Using properties that trigger layout (width, height, top, left)

### How to Fix
- Set explicit `width` and `height` on images
- Use `font-display: swap` with fallback fonts
- Reserve space for dynamic content
- Use `transform` instead of layout properties
- Preload critical fonts

---

## Memory Leaks

### What It Measures
Whether memory usage increases over time with repeated interactions. Should stay stable or decrease.

### Why It Matters
Memory leaks cause:
- Page becomes slower over time
- Browser tab crashes
- Poor performance on low-memory devices
- Battery drain on mobile

### Target: ≤ 5 MB increase after multiple cycles

### How It's Measured
```javascript
// Take initial snapshot
const initialMemory = (await page.metrics()).JSHeapUsedSize;

// Perform actions multiple times
for (let i = 0; i < 5; i++) {
  // Scroll, interact, etc.
}

// Take final snapshot
const finalMemory = (await page.metrics()).JSHeapUsedSize;
const increase = finalMemory - initialMemory;
```

### Common Causes
1. **Event listeners not removed**: Listeners keep references to DOM nodes
2. **Timers not cleared**: `setInterval` or `setTimeout` never stopped
3. **Observers not disconnected**: IntersectionObserver, MutationObserver
4. **Closures holding references**: Functions keeping large objects in scope
5. **Global variables**: Accumulating data in global scope

### How to Fix
```javascript
// ✓ Good: Clean up in useEffect
useEffect(() => {
  const handleScroll = () => { /* ... */ };
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);

// ✗ Bad: No cleanup
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
}, []);
```

---

## Largest Contentful Paint (LCP)

### What It Measures
Time until the largest content element (image, text block) is visible. Lower is better.

### Why It Matters
LCP represents when the main content is visible to users. It's a key indicator of perceived loading speed.

### Target: ≤ 2.5 seconds

### Scoring
- **< 2.5s**: Good - fast loading
- **2.5 - 4s**: Needs improvement
- **> 4s**: Poor - slow loading

### How It's Measured
```javascript
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];
  const lcp = lastEntry.renderTime || lastEntry.loadTime;
});

observer.observe({ type: 'largest-contentful-paint', buffered: true });
```

### Common LCP Elements
- Hero images
- Large text blocks
- Video thumbnails
- Background images

### Common Causes of Slow LCP
1. **Slow server response**: TTFB (Time to First Byte) is high
2. **Render-blocking resources**: CSS/JS blocks rendering
3. **Large images**: Unoptimized images take long to download
4. **Client-side rendering**: Content not visible until JS executes

### How to Fix
- Optimize images (WebP, proper sizing)
- Use CDN for faster delivery
- Preload critical resources
- Minimize render-blocking CSS/JS
- Use server-side rendering (SSR)
- Implement lazy loading for below-fold images

---

## Total Blocking Time (TBT)

### What It Measures
Total time the main thread is blocked by long tasks during page load. Lower is better.

### Why It Matters
When the main thread is blocked:
- Page feels unresponsive
- User interactions are delayed
- Animations stutter
- Poor user experience

### Target: ≤ 300 milliseconds

### What's a "Long Task"?
Any JavaScript task that takes > 50ms to execute. The blocking time is the portion over 50ms.

Example:
- Task takes 150ms
- Blocking time = 150ms - 50ms = 100ms

### How It's Measured
```javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 50) {
      totalBlockingTime += entry.duration - 50;
    }
  }
});

observer.observe({ type: 'longtask', buffered: true });
```

### Common Causes
1. **Large JavaScript bundles**: Too much code to parse and execute
2. **Heavy computations**: Complex calculations during load
3. **Third-party scripts**: Analytics, ads, social widgets
4. **Synchronous operations**: Blocking API calls, large loops

### How to Fix
- **Code splitting**: Load only what's needed initially
- **Lazy loading**: Defer non-critical JavaScript
- **Web Workers**: Move heavy calculations off main thread
- **Optimize third-party scripts**: Load async, defer, or remove
- **Break up long tasks**: Use `setTimeout` or `requestIdleCallback`

```javascript
// ✗ Bad: Long blocking task
function processLargeArray(items) {
  items.forEach(item => {
    // Heavy processing
  });
}

// ✓ Good: Break into chunks
function processLargeArray(items) {
  const chunkSize = 100;
  let index = 0;
  
  function processChunk() {
    const chunk = items.slice(index, index + chunkSize);
    chunk.forEach(item => {
      // Heavy processing
    });
    
    index += chunkSize;
    
    if (index < items.length) {
      setTimeout(processChunk, 0); // Let browser breathe
    }
  }
  
  processChunk();
}
```

---

## Relationship Between Metrics

### Loading Performance
- **LCP**: When content appears
- **TBT**: How responsive page is during load

### Runtime Performance
- **FPS**: How smooth animations are
- **CLS**: How stable layout is
- **Memory**: How efficient resource usage is

### User Experience Impact

| Metric | Impact on UX | Priority |
|--------|--------------|----------|
| FPS | Smoothness of interactions | High |
| CLS | Visual stability | High |
| LCP | Perceived loading speed | High |
| TBT | Initial responsiveness | Medium |
| Memory | Long-term stability | Medium |

---

## Performance Budgets

Set budgets to prevent regressions:

```javascript
const PERFORMANCE_BUDGETS = {
  fps: 60,              // Minimum frame rate
  cls: 0.1,             // Maximum layout shift
  lcp: 2500,            // Maximum LCP (ms)
  tbt: 300,             // Maximum TBT (ms)
  memoryIncrease: 5,    // Maximum memory increase (MB)
  
  // Additional budgets
  fcp: 1800,            // First Contentful Paint (ms)
  tti: 3800,            // Time to Interactive (ms)
  scriptSize: 300,      // JavaScript bundle size (KB)
  imageSize: 500,       // Total image size (KB)
};
```

---

## Tools for Measuring

### Automated Tools
- **Lighthouse**: Comprehensive audit (Chrome DevTools)
- **WebPageTest**: Real-world testing from multiple locations
- **Puppeteer**: Automated browser testing (our script uses this)
- **Playwright**: Cross-browser testing

### Manual Tools
- **Chrome DevTools Performance**: Detailed profiling
- **Chrome DevTools Coverage**: Find unused code
- **React DevTools Profiler**: React-specific performance
- **Performance Observer API**: Real user monitoring

### Monitoring Services
- **Google Analytics**: Core Web Vitals tracking
- **Sentry**: Performance monitoring
- **New Relic**: Application performance monitoring
- **Datadog**: Infrastructure and application monitoring

---

## Real-World Performance Targets

### Mobile (3G Connection)
- LCP: < 3.5s
- FCP: < 2.5s
- TBT: < 500ms
- FPS: ≥ 30fps (acceptable on mobile)

### Desktop (Fast Connection)
- LCP: < 2.0s
- FCP: < 1.5s
- TBT: < 200ms
- FPS: ≥ 60fps

### Progressive Enhancement
1. **Core content**: Load fast, work everywhere
2. **Enhanced experience**: Add animations, interactions
3. **Optimal experience**: Full features on capable devices

---

## Further Reading

- [Web Vitals](https://web.dev/vitals/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Lighthouse Scoring Guide](https://web.dev/performance-scoring/)
- [JavaScript Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [Rendering Performance](https://web.dev/rendering-performance/)

# Performance Audit Quick Reference

## Running Performance Audits

### Automated Performance Test

```bash
# 1. Start the development server
npm run dev

# 2. Run the performance audit script
node scripts/test-accommodations-performance.js
```

**Results Location:**
- Console output: Real-time metrics with pass/fail status
- JSON file: `docs/accommodations-performance-audit.json`
- Report: `docs/accommodations-performance-audit-report.md`

---

## Performance Metrics

### 1. Frame Rate (FPS)
**Target:** ≥ 60 fps  
**What it measures:** Smoothness of scroll animations  
**Good:** 60+ fps | **Acceptable:** 55-60 fps | **Poor:** < 55 fps

### 2. Cumulative Layout Shift (CLS)
**Target:** ≤ 0.1  
**What it measures:** Visual stability during page load  
**Good:** < 0.1 | **Acceptable:** 0.1-0.25 | **Poor:** > 0.25

### 3. Memory Leaks
**Target:** ≤ 5 MB increase after multiple interactions  
**What it measures:** Memory management efficiency  
**Good:** No increase or decrease | **Acceptable:** < 5 MB | **Poor:** > 5 MB

### 4. Largest Contentful Paint (LCP)
**Target:** ≤ 2500 ms  
**What it measures:** Time until largest content element is visible  
**Good:** < 2.5s | **Acceptable:** 2.5-4s | **Poor:** > 4s

### 5. Total Blocking Time (TBT)
**Target:** ≤ 300 ms  
**What it measures:** Time main thread is blocked during page load  
**Good:** < 300ms | **Acceptable:** 300-600ms | **Poor:** > 600ms

---

## Manual Lighthouse Audit

### Installation
```bash
npm install -g lighthouse
```

### Running Lighthouse

**Local Development:**
```bash
lighthouse http://localhost:3002 --only-categories=performance --view
```

**Production:**
```bash
lighthouse https://your-production-url.com --only-categories=performance --view
```

**With Custom Config:**
```bash
lighthouse http://localhost:3002 \
  --only-categories=performance \
  --throttling-method=simulate \
  --throttling.cpuSlowdownMultiplier=4 \
  --view
```

### Lighthouse Metrics

- **Performance Score:** Target ≥ 90
- **First Contentful Paint (FCP):** Target ≤ 1.8s
- **Speed Index:** Target ≤ 3.4s
- **Time to Interactive (TTI):** Target ≤ 3.8s
- **Total Blocking Time:** Target ≤ 300ms
- **Cumulative Layout Shift:** Target ≤ 0.1

---

## Chrome DevTools Performance Profiling

### Recording a Performance Profile

1. Open Chrome DevTools (F12)
2. Go to **Performance** tab
3. Click **Record** button (or Ctrl+E)
4. Scroll through the accommodations section
5. Click **Stop** to end recording
6. Analyze the flame chart

### What to Look For

**Frame Rate:**
- Green bars = 60 fps (good)
- Yellow bars = 30-60 fps (acceptable)
- Red bars = < 30 fps (poor)

**Long Tasks:**
- Tasks > 50ms block the main thread
- Look for yellow/red blocks in the main thread

**Layout Shifts:**
- Purple "Layout Shift" markers
- Should be minimal during scroll

**Memory:**
- Check for sawtooth pattern (normal GC)
- Avoid continuous upward trend (memory leak)

---

## Testing on Different Devices

### Desktop Testing
```javascript
// In test script, set viewport:
await page.setViewport({ width: 1920, height: 1080 });
```

### Tablet Testing
```javascript
await page.setViewport({ width: 768, height: 1024 });
```

### Mobile Testing
```javascript
await page.setViewport({ width: 375, height: 667 });
```

### Network Throttling
```javascript
await page.emulateNetworkConditions({
  offline: false,
  downloadThroughput: 1.5 * 1024 * 1024 / 8, // 1.5 Mbps
  uploadThroughput: 750 * 1024 / 8,           // 750 Kbps
  latency: 40                                  // 40ms
});
```

---

## Common Performance Issues

### Issue: Low Frame Rate
**Symptoms:** Choppy scroll animation  
**Causes:**
- Heavy JavaScript calculations on scroll
- Layout thrashing (reading/writing DOM repeatedly)
- Too many elements animating simultaneously

**Solutions:**
- Use `requestAnimationFrame` for batching
- Apply `will-change` CSS property
- Use CSS transforms instead of layout properties
- Debounce scroll handlers

### Issue: High CLS
**Symptoms:** Content jumps during load  
**Causes:**
- Images without dimensions
- Dynamic content insertion
- Web fonts causing layout shift

**Solutions:**
- Set explicit width/height on images
- Reserve space for dynamic content
- Use `font-display: swap` with fallback fonts

### Issue: Memory Leaks
**Symptoms:** Page slows down over time  
**Causes:**
- Event listeners not removed
- Timers not cleared
- DOM references retained

**Solutions:**
- Clean up event listeners in useEffect return
- Clear intervals/timeouts
- Remove Intersection Observer instances

### Issue: High TBT
**Symptoms:** Page feels unresponsive initially  
**Causes:**
- Large JavaScript bundles
- Heavy computations during load
- Too many third-party scripts

**Solutions:**
- Code splitting and lazy loading
- Defer non-critical JavaScript
- Use Web Workers for heavy calculations

---

## Performance Budget

Set performance budgets to prevent regressions:

```json
{
  "budgets": [
    {
      "resourceType": "script",
      "budget": 300
    },
    {
      "resourceType": "image",
      "budget": 500
    },
    {
      "metric": "interactive",
      "budget": 3800
    },
    {
      "metric": "first-contentful-paint",
      "budget": 1800
    }
  ]
}
```

---

## Continuous Integration

### GitHub Actions Example

```yaml
name: Performance Audit

on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Run Lighthouse
        run: |
          npm install -g lighthouse
          lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-results.json
      - name: Upload results
        uses: actions/upload-artifact@v2
        with:
          name: lighthouse-results
          path: lighthouse-results.json
```

---

## Resources

- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Puppeteer Documentation](https://pptr.dev/)

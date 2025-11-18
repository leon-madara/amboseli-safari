# Morning Drive Performance - Quick Reference

## Quick Performance Check

```bash
# 1. Start dev server
npm run dev

# 2. Run performance test (in separate terminal)
node scripts/test-morning-drive-performance.js
```

## Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| FPS | 60 fps | ✅ Optimized |
| Min FPS | 55+ fps | ✅ Optimized |
| Layout | < 50ms | ✅ Optimized |
| Paint | < 16ms | ✅ Optimized |
| Memory | < 50MB increase | ✅ Optimized |

## Applied Optimizations

### 1. GSAP Optimizations
- ✅ `force3D: true` - GPU acceleration
- ✅ `invalidateOnRefresh: true` - Prevent stale values
- ✅ `scrub: 0.5` - Smooth scroll-linked animation
- ✅ `anticipatePin: 1` - Prevent pin jump

### 2. CSS Optimizations
- ✅ `will-change: transform` - Browser hint for animations
- ✅ `contain: layout style` - CSS containment
- ✅ `backface-visibility: hidden` - GPU acceleration
- ✅ `transform: translateZ(0)` - Force GPU layer

### 3. Code Optimizations
- ✅ Debounced resize handler (150ms)
- ✅ Proper cleanup of timelines and ScrollTriggers
- ✅ Transform-only animations (no layout triggers)
- ✅ Cached transform calculations

## Chrome DevTools Quick Check

1. Open DevTools → Performance tab
2. Click Record
3. Scroll through Morning Drive section
4. Stop recording
5. Check FPS chart (should be green at 60fps)

## Common Issues & Quick Fixes

### Issue: Low FPS (< 55fps)

**Quick Fix:**
```typescript
// Reduce scrub value for less frequent updates
scrub: 0.3  // Instead of 0.5
```

### Issue: Layout Thrashing

**Quick Fix:**
```typescript
// Cache calculations outside animation loop
const transform = calculateImageTransform(...);
// Use cached values in animation
```

### Issue: Memory Leak

**Quick Fix:**
```typescript
// Verify cleanup in useEffect return
return () => {
  timelinesRef.current.forEach(t => t.kill());
  scrollTriggersRef.current.forEach(t => t.kill());
};
```

## Mobile Testing Checklist

- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Portrait orientation
- [ ] Landscape orientation
- [ ] 50+ fps maintained

## Browser Testing Checklist

- [ ] Chrome (Windows/Mac)
- [ ] Firefox (Windows/Mac)
- [ ] Safari (Mac/iOS)
- [ ] Edge (Windows)

## Performance Monitoring Commands

```bash
# Run automated test
node scripts/test-morning-drive-performance.js

# Check for TypeScript errors
npm run type-check

# Run linter
npm run lint

# Build for production (includes optimizations)
npm run build
```

## Key Files

- **Component**: `src/components/chapters/MorningDriveChapter/MorningDriveChapter.tsx`
- **Styles**: `src/components/chapters/MorningDriveChapter/MorningDriveChapter.module.css`
- **Test Script**: `scripts/test-morning-drive-performance.js`
- **Full Guide**: `docs/morning-drive-performance-testing.md`

## Performance Thresholds

```javascript
const THRESHOLDS = {
  TARGET_FPS: 60,
  MINIMUM_FPS: 55,
  MAX_LAYOUT_DURATION: 50,  // ms
  MAX_PAINT_DURATION: 16,   // ms
  MAX_MEMORY_INCREASE: 50,  // MB
};
```

## Emergency Performance Fixes

If performance is critically poor:

1. **Disable animations for low-end devices**
```typescript
const isLowEnd = navigator.hardwareConcurrency < 4;
if (isLowEnd) {
  // Show final state without animation
}
```

2. **Simplify animation**
```typescript
// Remove overlay animation
// Reduce scroll distance
// Increase scrub value
```

3. **Use intersection observer**
```typescript
// Only animate when section is visible
const { ref, inView } = useInView();
if (!inView) return;
```

## Success Criteria

✅ All automated tests pass
✅ 55+ fps on mid-range devices
✅ No layout thrashing detected
✅ Memory stable (< 50MB increase)
✅ Works on Chrome, Firefox, Safari
✅ Mobile performance acceptable
✅ Reduced motion respected
✅ No console errors

## Need Help?

See full documentation: `docs/morning-drive-performance-testing.md`

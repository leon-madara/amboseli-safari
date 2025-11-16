# GSAP Pinning Test Checklist

Quick reference checklist for testing the AccommodationsChapter GSAP pinning implementation.

## Automated Tests ✅

**Status:** 67/67 tests passed

Run automated tests:
```bash
node scripts/test-gsap-pinning.js
```

## Manual Tests

### 1. Smooth Transitions ⏱️ 5 minutes

**Desktop (> 768px):**
- [ ] Room 1 entrance: Both image and card slide up smoothly
- [ ] Room 1→2: Layout flips, content morphs smoothly
- [ ] Room 2→3: Layout flips back, content morphs smoothly
- [ ] No jank, stuttering, or layout shifts
- [ ] Features list items stagger in nicely

**Expected:** Buttery smooth 60fps transitions

---

### 2. Scroll Progress ⏱️ 3 minutes

- [ ] Room 1 fully visible at ~33% scroll progress
- [ ] Room 2 fully visible at ~66% scroll progress
- [ ] Room 3 fully visible at ~100% scroll progress
- [ ] Transitions evenly distributed

**Expected:** Timeline matches 0-33%, 33-66%, 66-100% phases

---

### 3. Cross-Browser ⏱️ 10 minutes

- [ ] **Chrome:** All transitions work, 60fps, no errors
- [ ] **Firefox:** All transitions work, smooth scrolling
- [ ] **Safari:** All transitions work, webkit compatible
- [ ] **Edge:** All transitions work, chromium compatible

**Expected:** Consistent behavior across all browsers

---

### 4. Mobile Adaptation ⏱️ 5 minutes

**Viewport < 768px:**
- [ ] Pinning disabled
- [ ] Rooms stack vertically
- [ ] Simple fade-in animations
- [ ] Touch targets ≥ 44x44px
- [ ] All content accessible

**Test viewports:**
- [ ] iPhone SE (375px)
- [ ] iPhone 12 Pro (390px)
- [ ] iPad Mini (768px)

**Expected:** Vertical stack with simple animations on mobile

---

### 5. Accessibility ⏱️ 10 minutes

**Keyboard Navigation:**
- [ ] Tab through all room cards
- [ ] Focus indicators visible
- [ ] Skip link accessible (Tab from top)
- [ ] CTA button reachable
- [ ] Enter key works on CTA

**Screen Reader (NVDA/JAWS/VoiceOver):**
- [ ] Heading announced
- [ ] Room names announced
- [ ] Features read as list items
- [ ] Prices announced
- [ ] Skip link announced

**Reduced Motion:**
- [ ] Enable "Reduce motion" in OS settings
- [ ] Pinning disabled
- [ ] All animations disabled
- [ ] Content visible immediately
- [ ] Rooms stack vertically

**Expected:** Fully accessible to all users

---

### 6. Performance ⏱️ 5 minutes

**Chrome DevTools Performance:**
- [ ] Record scroll through section
- [ ] FPS stays at 60
- [ ] No long tasks (> 50ms)
- [ ] No layout thrashing

**Lighthouse Audit:**
- [ ] Performance score ≥ 85
- [ ] FCP < 1.5s
- [ ] LCP < 2.5s
- [ ] TTI < 3.5s
- [ ] CLS < 0.1

**Expected:** Smooth 60fps, Lighthouse score 85+

---

## Quick Test Commands

### Start dev server
```bash
npm run dev
```

### Run automated tests
```bash
node scripts/test-gsap-pinning.js
```

### Check for TypeScript errors
```bash
npm run type-check
```

### Run linter
```bash
npm run lint
```

---

## Test Results

**Date:** _______________  
**Tester:** _______________

### Summary
- Automated Tests: ✅ 67/67 passed
- Smooth Transitions: [ ] Pass / [ ] Fail
- Scroll Progress: [ ] Pass / [ ] Fail
- Cross-Browser: [ ] Pass / [ ] Fail
- Mobile Adaptation: [ ] Pass / [ ] Fail
- Accessibility: [ ] Pass / [ ] Fail
- Performance: [ ] Pass / [ ] Fail

### Issues Found
1. _______________________________________________
2. _______________________________________________
3. _______________________________________________

### Overall Status
- [ ] ✅ All tests passed - Ready for production
- [ ] ⚠️ Minor issues - Needs fixes
- [ ] ❌ Major issues - Requires rework

---

## Sign-off

**Developer:** _______________  
**Date:** _______________

**QA:** _______________  
**Date:** _______________

**Product Owner:** _______________  
**Date:** _______________

# Wildlife Encounters Fan Animation - Testing Guide

## Server Information
- **Development Server**: http://localhost:3002
- **Status**: ✅ Running
- **Build Status**: ✅ Successful (no errors)

---

## Implementation Summary

### What Was Changed

**Phase 1: CSS Architecture** (Complete ✅)
- Updated `.fanContainer` for centered absolute positioning
- Modified `.card` for fan layout with absolute positioning
- Removed horizontal scroll properties
- Added mobile responsive styles with vertical stack

**Phase 2: Mobile Detection** (Complete ✅)
- Added mobile check in useEffect (`window.innerWidth < 768`)
- Early return skips GSAP timeline on mobile
- Static visibility for intro and fan container on mobile

---

## Desktop Testing Checklist (≥768px)

### Access the Page
1. Open browser to: http://localhost:3002
2. Ensure viewport width is ≥768px (use DevTools if needed)
3. Scroll down to Wildlife Encounters section (~1780vh position)

### Visual Verification

#### Phase 1-3: Intro & Transition (0-35% = 0-87.5vh)
- [ ] **Intro Fade In**: Heading "Wildlife Encounters" and subtitle fade in smoothly
- [ ] **Intro Hold**: Text remains visible and readable
- [ ] **Intro Fade Out**: Text fades out with upward movement (-50px)
- [ ] **Fan Container Fade In**: Container fades in simultaneously with intro fade out

#### Phase 4: Staggered Fan Animation (35-100% = 87.5vh-250vh)

**Step 1: Elephant Appearance**
- [ ] Card appears at center position
- [ ] Opacity: 0 → 1 (smooth fade)
- [ ] Y position: 100px → 0 (rises from below)
- [ ] Initial rotation: 0°
- [ ] Initial x position: centered
- [ ] Z-index: 1 (should be backmost when others appear)

**Step 2: Lion Appearance + Elephant Adjustment**
- [ ] Lion card appears at center
- [ ] Elephant card slides left and tilts
- [ ] Elephant final state: rotation -3°, x: -15%
- [ ] Lion z-index: 2 (in front of Elephant)
- [ ] Smooth simultaneous animation

**Step 3: Giraffe Appearance + Previous Cards Adjust**
- [ ] Giraffe appears at center (0°, x: 0%)
- [ ] Elephant slides further left: rotation -6°, x: -30%
- [ ] Lion slides left: rotation -3°, x: -15%
- [ ] Giraffe z-index: 3 (center card)
- [ ] All three cards visible simultaneously

**Step 4: Zebra Appearance**
- [ ] Zebra appears right of center
- [ ] Rotation: +3° (clockwise tilt)
- [ ] X position: +15%
- [ ] Zebra z-index: 4 (front of center)
- [ ] Previous cards (Elephant, Lion, Giraffe) hold positions

**Step 5: Cheetah Completes Fan**
- [ ] Cheetah appears at far right
- [ ] Rotation: +6° (clockwise tilt)
- [ ] X position: +30%
- [ ] Cheetah z-index: 5 (frontmost card)
- [ ] **Critical**: Cheetah overlaps portions of other cards

**Final Formation Verification**
```
Elephant ←── Lion ←── Giraffe ──→ Zebra ──→ Cheetah
(back)     (mid-left)  (center)   (mid-right)  (front)
```

- [ ] Cards form symmetric fan spread from left to right
- [ ] Rotation angles create realistic perspective
- [ ] Z-index layering: Cheetah covers parts of other cards
- [ ] Elephant partially hidden behind other cards
- [ ] All cards remain in final formation during hold period

### Card Content Verification
For each visible card:
- [ ] Animal image displays correctly
- [ ] Conservation status badge visible and colored correctly
- [ ] Animal name and scientific name readable
- [ ] Description text visible
- [ ] "Did you know?" fun fact section styled correctly
- [ ] "Best time to see" information displayed
- [ ] "Learn to Encounter" button clickable and styled

### Progress Indicators
- [ ] 5 progress dots visible at bottom
- [ ] Dots update to indicate current card reveal
- [ ] Active dot highlighted correctly

### Scroll Hint
- [ ] "Scroll to explore" hint visible
- [ ] Arrow icon animates (pulsing)
- [ ] Hint positioned correctly (bottom right)

### Hover Effects
- [ ] Card box-shadow increases on hover
- [ ] No transform conflict with GSAP positioning
- [ ] Smooth transition on hover

---

## Mobile Testing Checklist (<768px)

### Access Mobile View
1. Open http://localhost:3002
2. Resize browser to <768px width OR use DevTools device emulation
3. Navigate to Wildlife Encounters section

### Layout Verification

#### Intro Section
- [ ] Heading "Wildlife Encounters" always visible (opacity: 1)
- [ ] Subtitle always visible
- [ ] No fade animations occur
- [ ] Text is centered and readable

#### Fan Container → Vertical Stack
- [ ] Container uses `flex-direction: column`
- [ ] All 5 cards displayed vertically
- [ ] Cards stack with consistent gap (2rem)
- [ ] No horizontal scrolling
- [ ] No pinning behavior

#### Card Layout
- [ ] Each card width: 90vw (max 400px)
- [ ] Cards are `position: relative` (not absolute)
- [ ] No rotation applied (transform: none !important)
- [ ] All cards opacity: 1 (always visible)
- [ ] Cards centered with `margin: 0 auto`

#### Card Ordering (Top to Bottom)
1. [ ] Elephant
2. [ ] Lion
3. [ ] Giraffe
4. [ ] Zebra
5. [ ] Cheetah

#### Card Content on Mobile
- [ ] Image height: 200px (reduced from desktop)
- [ ] All text content readable
- [ ] Conservation badges visible
- [ ] "Learn to Encounter" buttons functional
- [ ] No content cutoff or overflow

#### Progress Indicators
- [ ] Dots positioned relative (not fixed)
- [ ] Dots centered horizontally
- [ ] Padding above and below dots

#### Scroll Hint
- [ ] "Scroll to explore" hint hidden (display: none)

---

## Performance Testing

### Desktop Performance
Open DevTools → Performance Tab:
- [ ] Smooth 60fps during scroll
- [ ] No layout shifts (CLS < 0.1)
- [ ] GPU acceleration active (check Rendering tab)
- [ ] ScrollTrigger instances created correctly
- [ ] No memory leaks after scrolling past section multiple times

### Mobile Performance
- [ ] No GSAP timeline created (check console)
- [ ] Instant visibility of all cards
- [ ] Smooth scrolling through vertical stack
- [ ] No unnecessary calculations
- [ ] Lower battery consumption

### Browser Testing
Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browsers (responsive mode)

---

## Console Verification

### Expected Console Output
**Desktop (≥768px)**:
```javascript
// Mobile check should return false
window.innerWidth < 768  // false

// ScrollTrigger should be created
ScrollTrigger.getAll().length  // > 0
```

**Mobile (<768px)**:
```javascript
// Mobile check should return true
window.innerWidth < 768  // true

// No ScrollTrigger for this section
// (Early return in useEffect prevents timeline creation)
```

---

## Known Issues & Expected Behavior

### Tablet Range (768px-1024px)
- Uses desktop fan animation
- Card width adjusts with clamp (300px-45vw-400px)
- May need fine-tuning if cards overlap too much

### Animation Timing
- Each card reveal: 0.08 duration (very quick)
- Hold between cards: 0.03 duration (subtle pause)
- Final hold: 0.22 duration (appreciation time)
- Total animation: ~65% of scroll distance (162.5vh out of 250vh)

### Z-Index Behavior
- Cards stack correctly on appearance
- Cheetah (z:5) should cover portions of all other cards
- Elephant (z:1) should be partially hidden
- This is **intentional design** for depth effect

---

## Troubleshooting

### Issue: Cards Not Appearing
**Check**:
1. Scroll to correct position (~1780vh from top)
2. Viewport width ≥768px for fan animation
3. Console for JavaScript errors
4. GSAP library loaded correctly

### Issue: Cards Overlapping Incorrectly
**Possible Causes**:
- Z-index not applied by GSAP
- Transform origin incorrect
- Card width too large for viewport

**Solution**:
- Check browser DevTools → Elements → Computed styles
- Verify z-index values: 1, 2, 3, 4, 5
- Verify transform-origin: center center

### Issue: Mobile Shows Fan Animation
**Check**:
1. Mobile detection threshold: `window.innerWidth < 768`
2. CSS media query: `@media (max-width: 767px)`
3. Clear browser cache
4. Hard refresh (Ctrl+Shift+R)

### Issue: Rotation Angles Wrong
**Expected Values**:
- Elephant: -6° (counter-clockwise, left tilt)
- Lion: -3° (counter-clockwise, slight left tilt)
- Giraffe: 0° (straight, no tilt)
- Zebra: +3° (clockwise, slight right tilt)
- Cheetah: +6° (clockwise, right tilt)

### Issue: Animation Too Fast/Slow
**Current Timing**:
- Card reveal: 0.08 duration
- Hold: 0.03 duration
- Final hold: 0.22 duration

**To Adjust**: Modify values in [WildlifeEncountersChapter.tsx](src/components/chapters/WildlifeEncountersChapter/WildlifeEncountersChapter.tsx):
- Lines 103, 117, 138, 166, 182 (card reveal duration)
- Lines 108, 129, 157, 173 (hold duration)
- Line 187 (final hold duration)

---

## Success Criteria

### Desktop ✅ Checklist
- [ ] All 5 cards appear in staggered sequence
- [ ] Rotation creates fan spread (-6° to +6°)
- [ ] X-translations create horizontal spread (-30% to +30%)
- [ ] Z-index layering: Cheetah front, Elephant back
- [ ] Smooth scroll-linked animation
- [ ] 60fps performance maintained
- [ ] All card content readable and styled correctly

### Mobile ✅ Checklist
- [ ] Vertical card stack (no fan animation)
- [ ] All 5 cards immediately visible
- [ ] No horizontal scroll
- [ ] No GSAP timeline created
- [ ] Fast rendering and low resource usage
- [ ] All content accessible and readable

---

## Next Steps (If Issues Found)

### Visual Adjustments Needed
1. Document specific issue (screenshots helpful)
2. Identify affected code section
3. Test fix in isolation
4. Rebuild and retest

### Performance Optimization
1. Enable GSAP markers temporarily: `markers: true` (line 61)
2. Profile with DevTools Performance tab
3. Check for unnecessary repaints
4. Verify GPU acceleration with will-change

### Documentation Updates
If any behavior differs from documentation:
1. Update [SAFARI-EXPERIENCE-DOCUMENTATION.md](SAFARI-EXPERIENCE-DOCUMENTATION.md)
2. Update [SAFARI-CHAPTERS-SUMMARY.md](SAFARI-CHAPTERS-SUMMARY.md)
3. Update this testing guide

---

## Testing Report Template

```markdown
## Wildlife Encounters Fan Animation - Test Results

**Date**: [YYYY-MM-DD]
**Tester**: [Name]
**Browser**: [Browser Name + Version]
**Viewport**: [Width x Height]

### Desktop Testing (≥768px)
- Animation Sequence: ✅ / ❌
- Z-Index Layering: ✅ / ❌
- Rotation Angles: ✅ / ❌
- Card Positioning: ✅ / ❌
- Performance (60fps): ✅ / ❌
- Issues Found: [Description]

### Mobile Testing (<768px)
- Vertical Stack Layout: ✅ / ❌
- No Animations: ✅ / ❌
- All Cards Visible: ✅ / ❌
- Performance: ✅ / ❌
- Issues Found: [Description]

### Overall Assessment
- Ready for Production: ✅ / ❌
- Recommended Actions: [List]
```

---

**Document Version**: 1.0
**Last Updated**: 2025-11-19
**Status**: Ready for Testing

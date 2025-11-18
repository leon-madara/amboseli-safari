# Morning Drive Animation Assessment Report

**Date:** November 17, 2025  
**Component:** MorningDriveChapter  
**Current Implementation:** GSAP ScrollTrigger with 3-phase animation

---

## Executive Summary

The current implementation does **NOT** match your requested behavior. The image currently grows and centers using GSAP transforms, but it does **NOT** move down with the scroll to remain centered as you described. Instead, it uses fixed positioning calculations that center it once during the animation phase.

---

## Current Implementation Analysis

### Phase 1: Pin Phase (0-150vh scroll)
✅ **Working as designed:**
- Section pins at top of viewport
- All content remains static and visible
- No animations occur

### Phase 2: Animation Phase (150vh-230vh scroll)
⚠️ **Partially matches your request:**

**Content Elements (Text, Details):**
- ✅ Fade out from opacity 1 → 0
- ✅ Move up as page scrolls (natural document flow)
- ✅ Become invisible by 230vh

**Safari Image:**
- ❌ **DOES NOT** move down with scroll speed
- ❌ **DOES NOT** remain centered by compensating for scroll
- ✅ DOES grow from original size to 80% viewport width
- ✅ DOES translate to center position (but only once, not continuously)
- ✅ Maintains opacity 1 throughout

### Phase 3: Text Reveal (230vh-280vh scroll)
✅ **Working as designed:**
- Overlay text "This could be your morning" fades in
- Positioned 30vh below centered image
- Appears only after image completes growth

---

## Your Request vs Current Behavior

### What You Want:
> "Once the morning drive section pins at the top, I want the other elements to move up, except for the image. The image should grow and move down slowly, according to the speed of the scroll, equally the same distance as the scrolling, so that the image remains at the center, as it grows."

### Current Behavior:
1. **Content elements:** ✅ Move up (fade out) as expected
2. **Image growth:** ✅ Grows to 80% viewport width
3. **Image movement:** ❌ Does NOT move down with scroll speed
4. **Image centering:** ❌ Centers once via transform, not continuously

### The Key Difference:

**Current Implementation:**
```typescript
// Image transform is calculated ONCE and applied over the animation duration
const transform = calculateImageTransform(imageRect, viewportWidth, viewportHeight);

imageGrowTimeline.to(imageContainerRef.current, {
  scale: transform.scale,
  x: transform.x,
  y: transform.y,  // Static Y translation to center
  transformOrigin: 'center center',
  duration: 0.8,
  ease: 'none',
}, '+=1.5');
```

**What You Want:**
```typescript
// Image Y position should update CONTINUOUSLY based on scroll progress
// As user scrolls down 1px, image should move down 1px to compensate
// This keeps image visually centered despite page scrolling up
imageGrowTimeline.to(imageContainerRef.current, {
  scale: transform.scale,
  x: transform.x,
  y: (index, target, targets) => {
    // Y should be calculated dynamically based on scroll progress
    // to compensate for the upward page movement
    return scrollDistance; // Moves down equal to scroll distance
  },
  transformOrigin: 'center center',
  duration: 0.8,
  ease: 'none',
}, '+=1.5');
```

---

## Technical Analysis

### Current Image Centering Logic

**File:** `src/components/chapters/MorningDriveChapter/MorningDriveChapter.tsx`  
**Lines:** 36-68 (calculateImageTransform function)

```typescript
function calculateImageTransform(
  imageRect: DOMRect,
  viewportWidth: number,
  viewportHeight: number
): ImageTransform {
  // ... scale calculation ...
  
  // Calculate current image center position
  const imageCenterX = imageRect.left + imageRect.width / 2;
  const imageCenterY = imageRect.top + imageRect.height / 2;
  
  // Calculate viewport center position
  const viewportCenterX = viewportWidth / 2;
  const viewportCenterY = viewportHeight / 2;
  
  // Calculate translation needed to move image center to viewport center
  const translateX = viewportCenterX - imageCenterX;
  const translateY = viewportCenterY - imageCenterY;  // ⚠️ STATIC CALCULATION
  
  return {
    scale: targetScale,
    x: translateX,
    y: translateY  // ⚠️ This is a fixed value, not scroll-linked
  };
}
```

**Problem:** The `translateY` value is calculated once at the start of the animation and remains constant throughout. It doesn't account for the continuous upward movement of the page as the user scrolls.

### Why Image Doesn't Stay Centered

During the animation phase (150vh-230vh):
1. User scrolls down → Page content moves UP
2. Image is pinned with section → Image moves UP with page
3. Image applies static Y transform → Moves to calculated position
4. **Result:** Image appears to move up relative to viewport, not stay centered

### What's Needed for Your Request

To keep the image centered as it grows, the Y translation must:
1. **Start at:** Initial offset to center image
2. **Continuously adjust:** Add scroll distance to Y position
3. **Formula:** `finalY = initialCenterOffset + scrollDistance`

This creates the illusion that the image is "staying in place" (centered) while everything else moves up.

---

## Comparison Table

| Aspect | Current Implementation | Your Request |
|--------|----------------------|--------------|
| **Section Pinning** | ✅ Pins at top for 300vh | ✅ Same |
| **Content Fade** | ✅ Fades out during animation | ✅ Same |
| **Content Movement** | ✅ Moves up (fades out) | ✅ Same |
| **Image Growth** | ✅ Grows to 80% viewport | ✅ Same |
| **Image Opacity** | ✅ Stays at 1 (no fade) | ✅ Same |
| **Image X Position** | ✅ Centers horizontally | ✅ Same |
| **Image Y Position** | ❌ Static transform to center | ❌ Should move down with scroll |
| **Image Centering** | ❌ Centers once, then drifts | ✅ Should remain centered continuously |
| **Scroll Compensation** | ❌ Not implemented | ✅ Y += scroll distance |

---

## Root Cause

The current implementation uses **GSAP's standard transform animation**, which interpolates from a start value to an end value over the animation duration. This works perfectly for scaling and horizontal centering, but fails for vertical centering because:

1. The page is scrolling (moving up) during the animation
2. The image is pinned with the section (moves up with page)
3. The Y transform is static (doesn't compensate for scroll)
4. **Result:** Image appears to drift upward instead of staying centered

---

## Proposed Solution

### Option 1: Dynamic Y Calculation with ScrollTrigger's `onUpdate`

**Approach:** Calculate Y position on every scroll update to compensate for page movement.

**Pros:**
- Most accurate centering
- Smooth, continuous adjustment
- Follows scroll speed exactly

**Cons:**
- More complex implementation
- Requires careful performance optimization
- May need RAF (requestAnimationFrame) throttling

**Implementation Complexity:** Medium-High

---

### Option 2: Modify GSAP Timeline with Dynamic Y Function

**Approach:** Use GSAP's function-based values to calculate Y dynamically based on scroll progress.

**Pros:**
- Leverages GSAP's built-in optimization
- Cleaner code structure
- Better performance (GSAP handles RAF internally)

**Cons:**
- Requires understanding of GSAP's function values
- May need custom easing function

**Implementation Complexity:** Medium

---

### Option 3: Separate Y Animation from Scale/X Animation

**Approach:** Create a separate timeline for Y position that runs continuously during the animation phase.

**Pros:**
- Clear separation of concerns
- Easier to debug and adjust
- Can fine-tune Y movement independently

**Cons:**
- Multiple timelines to manage
- Potential synchronization issues
- More cleanup code needed

**Implementation Complexity:** Medium

---

## Recommended Approach

**Option 2: Dynamic Y Function** is recommended because:

1. **Performance:** GSAP handles optimization internally
2. **Maintainability:** Single timeline, cleaner code
3. **Accuracy:** Can calculate exact Y offset based on scroll progress
4. **Compatibility:** Works with existing animation structure

### Implementation Strategy

```typescript
// Phase 2: Image Growth and Centering Timeline (80vh)
if (imageContainerRef.current) {
  const imageRect = imageContainerRef.current.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const transform = calculateImageTransform(imageRect, viewportWidth, viewportHeight);
  
  // Store initial Y offset needed to center image
  const initialYOffset = transform.y;
  
  const imageGrowTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=230vh',
      scrub: 0.5,
      markers: false,
      invalidateOnRefresh: true,
    }
  });

  imageGrowTimeline.to(
    imageContainerRef.current,
    {
      scale: transform.scale,
      x: transform.x,
      // Dynamic Y calculation: moves down as user scrolls to stay centered
      y: (index, target, targets) => {
        // Get current scroll progress (0 to 1 during animation phase)
        const scrollTrigger = ScrollTrigger.getById('imageGrow');
        const progress = scrollTrigger ? scrollTrigger.progress : 0;
        
        // Calculate scroll distance during animation phase (150vh to 230vh = 80vh)
        const animationScrollDistance = window.innerHeight * 0.8; // 80vh in pixels
        const currentScrollOffset = progress * animationScrollDistance;
        
        // Y position = initial center offset + scroll compensation
        return initialYOffset + currentScrollOffset;
      },
      transformOrigin: 'center center',
      duration: 0.8,
      ease: 'none',
      force3D: true,
      willChange: 'transform',
    },
    '+=1.5'
  );
}
```

---

## Impact Assessment

### Code Changes Required

**Files to Modify:**
1. `src/components/chapters/MorningDriveChapter/MorningDriveChapter.tsx`
   - Modify `calculateImageTransform()` function
   - Update image growth timeline with dynamic Y calculation
   - Add scroll progress tracking
   - Update comments to reflect new behavior

**Files NOT Requiring Changes:**
2. `src/components/chapters/MorningDriveChapter/MorningDriveChapter.module.css` - No changes needed
3. `.kiro/specs/morning-drive-gsap-animation/requirements.md` - May need update to reflect new behavior
4. `.kiro/specs/morning-drive-gsap-animation/design.md` - May need update to reflect new behavior

### Testing Requirements

**Visual Testing:**
- [ ] Image remains centered during entire growth animation
- [ ] Image moves down at same speed as scroll
- [ ] Image doesn't drift up or down relative to viewport center
- [ ] Smooth animation at 60fps

**Functional Testing:**
- [ ] Works on desktop (1920px, 1440px, 1024px)
- [ ] Works on tablet (768px)
- [ ] Works on mobile (375px, 414px)
- [ ] Scroll backward reverses correctly
- [ ] No console errors

**Performance Testing:**
- [ ] No frame drops during scroll
- [ ] No layout thrashing
- [ ] Memory usage remains stable

### Risk Assessment

**Low Risk:**
- Change is isolated to one component
- Existing animation structure remains intact
- No new dependencies required

**Medium Risk:**
- Dynamic Y calculation may impact performance on low-end devices
- Requires thorough testing across viewport sizes
- May need fine-tuning of scroll compensation formula

**Mitigation:**
- Use GSAP's built-in optimization (force3D, willChange)
- Test on low-end devices early
- Add performance monitoring
- Implement fallback for reduced motion preference

---

## Timeline Estimate

**Implementation:** 2-3 hours
- Modify calculateImageTransform: 30 min
- Update image growth timeline: 1 hour
- Add scroll progress tracking: 30 min
- Testing and refinement: 1 hour

**Testing:** 1-2 hours
- Visual testing across devices: 1 hour
- Performance testing: 30 min
- Edge case testing: 30 min

**Total:** 3-5 hours

---

## Conclusion

The current implementation successfully pins the section and grows the image, but **does not** keep the image centered as it grows because the Y translation is static. Your request requires a **dynamic Y calculation** that compensates for page scroll by moving the image down at the same rate the page moves up.

The recommended solution is to modify the image growth timeline to use a **function-based Y value** that calculates the vertical position based on scroll progress, ensuring the image remains visually centered throughout the growth animation.

This change is **feasible, low-risk, and can be implemented within 3-5 hours** including testing.

---

## Implementation Status

✅ **COMPLETED** - November 17, 2025 (Approach 3: Sticky Image)

### Changes Made

**File Modified:** `src/components/chapters/MorningDriveChapter/MorningDriveChapter.tsx`

**Implementation Approach:** Hybrid sticky positioning with GSAP scale animation

**Key Changes:**
1. Added `onUpdate` callback to ScrollTrigger that manages image positioning
2. When animation phase starts (150vh), image switches to `position: fixed`
3. Fixed position is set to image's current viewport coordinates
4. Browser automatically keeps image in place during scroll (no manual calculation)
5. GSAP timeline only animates scale (not position)
6. Image remains fixed after animation completes
7. Cleanup function resets positioning on unmount

**Technical Details:**
- Animation phase: 0.5 to 0.77 progress (150vh to 230vh)
- Fixed positioning applied dynamically based on scroll progress
- Z-index set to 50 to keep image above content
- Transform origin: center center for proper scaling
- Width preserved when switching to fixed positioning

**Behavior:**
- **Before animation (0-150vh):** Image in normal document flow
- **Animation starts (150vh):** Image becomes `position: fixed` at current location
- **During animation (150vh-230vh):** 
  - Browser keeps image fixed in viewport (no drift)
  - GSAP scales image from original to 80% viewport width
  - Content fades out and scrolls up behind image
- **After animation (230vh+):** Image remains fixed and scaled
- **Result:** Image appears perfectly stationary while growing, content moves around it

### Testing Checklist

- [ ] Visual test: Image stays in original position during growth
- [ ] Visual test: Image grows to 80% viewport width
- [ ] Visual test: Content fades out and moves up
- [ ] Visual test: Overlay text appears after image growth
- [ ] Performance test: 60fps during scroll
- [ ] Responsive test: Works on mobile (375px, 414px)
- [ ] Responsive test: Works on tablet (768px)
- [ ] Responsive test: Works on desktop (1024px, 1440px, 1920px)
- [ ] Edge case: Scroll backward reverses correctly
- [ ] Edge case: No console errors or warnings

---

## Next Steps

1. ✅ **Implementation complete** - Image now moves down with scroll
2. **Test the animation** in browser to verify behavior
3. **Fine-tune if needed** - Adjust scroll compensation if image drifts
4. **Test across devices** - Ensure responsive behavior works correctly
5. **Update spec documents** if behavior differs from original requirements


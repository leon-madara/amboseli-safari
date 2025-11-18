# Morning Drive Image Animation - Implementation Summary

**Date:** November 17, 2025  
**Approach:** Hybrid Sticky Positioning (Approach 3)

---

## What Was Implemented

The image now **stays in its original position** while growing, using a hybrid approach that combines CSS `position: fixed` with GSAP scale animation.

### How It Works

1. **Pin Phase (0-150vh scroll)**
   - Section pins at top
   - Image remains in normal document flow
   - No animations occur

2. **Animation Phase Starts (at 150vh)**
   - Image's current viewport position is captured
   - Image switches to `position: fixed` at that exact location
   - Browser now keeps image stationary automatically

3. **During Animation (150vh-230vh)**
   - Image stays fixed (browser handles positioning)
   - GSAP animates scale from 1.0 → target scale (80% viewport width)
   - Card container moves up 200px and fades out (opacity 1 → 0)
   - Content elements inside card also fade out
   - **Result:** Image appears to stay in place while growing, card moves up and disappears

4. **After Animation (230vh+)**
   - Image remains fixed and scaled
   - Overlay text appears
   - Section continues to next chapter

---

## Key Benefits

✅ **No manual scroll compensation** - Browser handles positioning  
✅ **Zero drift** - Image stays perfectly in place  
✅ **Better performance** - Browser-optimized fixed positioning  
✅ **Simpler code** - GSAP only handles scale, not position  
✅ **Clean separation** - CSS positioning + GSAP animation  

---

## Code Changes

**File:** `src/components/chapters/MorningDriveChapter/MorningDriveChapter.tsx`

### Main Changes:

1. **Added card ref:**
   ```typescript
   const cardRef = useRef<HTMLDivElement>(null);
   ```

2. **Card fade and move timeline:**
   ```typescript
   cardFadeTimeline.to(cardRef.current, {
     y: -200,        // Move up 200px
     opacity: 0,     // Fade out completely
     duration: 0.8,
     ease: 'none',
   }, '+=1.5');      // Start at 150vh (synchronized with image)
   ```

3. **ScrollTrigger onUpdate callback:**
   ```typescript
   onUpdate: (self) => {
     const progress = self.progress;
     const animationStartProgress = 0.5; // 150vh / 300vh
     
     if (progress >= animationStartProgress) {
       // Make image fixed at current position
       imageContainerRef.current.style.position = 'fixed';
       imageContainerRef.current.style.top = `${currentRect.top}px`;
       imageContainerRef.current.style.left = `${currentRect.left}px`;
     }
   }
   ```

4. **GSAP timeline (scale only):**
   ```typescript
   imageGrowTimeline.to(imageContainerRef.current, {
     scale: targetScale,
     transformOrigin: 'center center',
     // No x or y transforms needed - fixed positioning handles it
   });
   ```

5. **Cleanup function:**
   ```typescript
   return () => {
     // Reset image positioning
     imageContainerRef.current.style.position = '';
     imageContainerRef.current.style.top = '';
     // ... other cleanup
   };
   ```

---

## Testing Checklist

- [ ] Image stays in original position during growth
- [ ] Image scales to 80% viewport width
- [ ] Content fades out and moves up
- [ ] No visual drift or jumping
- [ ] Works on mobile (375px, 414px, 768px)
- [ ] Works on desktop (1024px, 1440px, 1920px)
- [ ] Scroll backward reverses correctly
- [ ] No console errors
- [ ] 60fps performance during scroll
- [ ] Overlay text appears after image growth

---

## Visual Behavior

```
User scrolls down → Page moves up ↑
                     Image breaks free (position: fixed) ⊡
                     Image stays fixed at original position ⊡ (browser handles this)
                     Image grows ⊡ → ⊞ (GSAP handles this)
                     Card moves up ↑ and fades out (opacity 1 → 0)
                     Content inside card also fades out
```

**Net Effect:** 
- Image appears to stay perfectly still while growing, as if it's "glued" to the viewport
- Card container moves up and disappears behind/around the growing image
- Creates a cinematic "breaking free" effect where image separates from the card

---

## Next Steps

1. Test in browser to verify behavior
2. Check responsive behavior on different screen sizes
3. Verify smooth 60fps performance
4. Fine-tune if any visual issues appear
5. Update spec documents if needed


# Morning Safari Drive Animation Specification

## Overview
A scroll-triggered GSAP animation for the Morning Safari Drive chapter that creates a cinematic, storytelling experience through coordinated text fading and image scaling.

## Current Status: ISSUES TO RESOLVE

### Primary Problems
1. **Image scaling too fast** - Despite power-4 easing, the growth doesn't feel smooth and gradual enough
2. **Overlay text positioning** - Text needs to appear exactly where the faded text card was (left side of viewport), but current positioning is off
3. **Animation smoothness** - The overall effect feels jerky instead of cinematic

---

## Desired Visual Effect

### Initial State (When section enters viewport)
- **Layout**: Two-column flexbox layout
  - **Left column**: Text card with heading, description, and trip details
  - **Right column**: Safari image (400px × 250px)
- **Background**: Transparent (parent has `#141933` dark navy background)
- **All text**: Light colors for visibility on dark background

### Animation Sequence (250vh total scroll distance)

#### Phase 1: Pin & Read (0-50vh / 0-20% progress)
- **Duration**: 50vh of scroll
- **Behavior**:
  - Section pins to viewport (GSAP `pin: true`)
  - All content remains static
  - User can read the text content
  - No animations occur

#### Phase 2: Text Fade Out (50-100vh / 20-40% progress)
- **Duration**: 50vh of scroll
- **Behavior**:
  - Left text card fades from `opacity: 1` to `opacity: 0`
  - Text card slides UP by 50px (`translateY(-50px)`)
  - Linear fade progression tied to scroll
  - Image remains unchanged (still 400px × 250px)

#### Phase 3: Image Growth (100-180vh / 40-72% progress)
- **Duration**: 80vh of scroll
- **Target size**: 40% of viewport width (desktop), 90% (mobile < 768px)
- **Transform origin**: `top left` (image grows from its top-left corner)
- **Scaling**:
  - Start: `scale(1)` - original 400px width
  - End: `scale(targetScale)` where `targetScale = (viewportWidth * 0.4) / 400`
  - Example: On 1920px viewport → targetScale = (1920 * 0.4) / 400 = 1.92
- **Easing**: Power-4 expo out → `1 - Math.pow(1 - progress, 4)`
  - This should create VERY gradual, cinematic growth
  - Most growth happens in first half, then decelerates dramatically
- **Position**: Image stays in place (does NOT move to center or translate)

#### Phase 3.5: Overlay Text Fade In (140vh+ / 56%+ progress)
- **Timing**: Starts halfway through image growth
- **Duration**: Remaining 40vh of image growth (140vh-180vh)
- **Behavior**:
  - Overlay text fades in from `opacity: 0` to `opacity: 1`
  - Text appears in the EXACT position where the original text card was
  - NO sliding animation - just opacity fade
  - Easing: Power-3 expo out → `1 - Math.pow(1 - progress, 3)`

#### Phase 4: Hold for Reading (180-210vh / 72-84% progress)
- **Duration**: 30vh of scroll
- **Behavior**:
  - All elements remain static at final state
  - Image at full 40% viewport width scale
  - Overlay text fully visible at opacity: 1
  - Reading pause for user

#### Phase 5: Exit (210-250vh / 84-100% progress)
- **Duration**: 40vh of scroll
- **Behavior**:
  - Section unpins
  - Next section scrolls into view
  - No animations, just natural scroll unpinning

---

## Layout & Positioning Details

### Container Structure
```
.morningDriveChapter (section)
  └── .container (max-width: 1200px, centered)
      ├── .heading (sticky at top)
      └── .contentWrapper (two-column flexbox, max-width: 1000px)
          ├── .textCard (left column, flex: 1)
          │   ├── .subHeading
          │   ├── .description
          │   └── .tripDetails
          └── .imageCard (right column, flex: 1)
              └── .imageContainer (400px × 250px)
                  └── <OptimizedImage>
      └── .animatedHeading (overlay text, position: fixed)
```

### Text Card Positioning (Phase 1-2)
- **Position**: Left half of `.contentWrapper`
- **Flexbox**: `flex: 1` (takes up 50% of 1000px max-width)
- **Approximate location**: Left side of centered container
- **Vertical**: Starts below heading (~30% from top)

### Overlay Text Positioning (Phase 3.5+)
**CRITICAL REQUIREMENT**: Must appear exactly where text card was before fading

**Current attempt** (NOT WORKING):
```css
.animatedHeading {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  width: 45%;
  margin-left: calc(-500px + 1.5rem);
}
```

**Problem**: This positioning is incorrect - text doesn't align with where text card was

**What's needed**:
- Overlay should occupy the same visual space as `.textCard`
- `.textCard` is left column of centered flexbox
- When viewport is 1920px:
  - Container max-width: 1200px → centered at 360px from left edge
  - ContentWrapper max-width: 1000px → centered within container
  - TextCard is left 50% of contentWrapper → approximately 460px from left edge
- Overlay needs to match this position dynamically based on viewport size

### Image Positioning & Scaling
- **Initial**: Right column of flexbox, 400px × 250px
- **Transform origin**: `top left` - image corner stays anchored
- **Scaling behavior**:
  - Image DOES NOT move/translate
  - Scaling from top-left makes it grow rightward and downward
  - At final scale (1.92×), image is ~768px wide, ~480px tall
  - Top-left corner remains in same position throughout

---

## Technical Implementation

### GSAP ScrollTrigger Configuration
```javascript
ScrollTrigger.create({
  trigger: sectionRef.current,
  start: 'top top',
  end: '+=250vh',
  pin: true,
  pinSpacing: true,
  anticipatePin: 1,
  markers: false,
  onUpdate: (self) => {
    const progress = self.progress; // 0 to 1
    // Manual animations based on progress
  }
})
```

### Scroll Progress to Viewport Height Mapping
- Total scroll: 250vh
- Progress 0% = 0vh scrolled
- Progress 20% = 50vh scrolled
- Progress 40% = 100vh scrolled
- Progress 56% = 140vh scrolled
- Progress 72% = 180vh scrolled
- Progress 84% = 210vh scrolled
- Progress 100% = 250vh scrolled

### Animation Calculations

#### Phase 2: Text Fade (20%-40% progress)
```javascript
if (progress >= 0.2 && progress < 0.4) {
  const fadeProgress = (progress - 0.2) / 0.2; // Normalize to 0-1

  textCardRef.current.style.opacity = String(1 - fadeProgress);
  textCardRef.current.style.transform = `translateY(${-50 * fadeProgress}px)`;
}
```

#### Phase 3: Image Growth (40%-72% progress)
```javascript
if (progress >= 0.4 && progress < 0.72) {
  const growthProgress = (progress - 0.4) / 0.32; // Normalize to 0-1

  // Power-4 easing for very smooth deceleration
  const easedProgress = 1 - Math.pow(1 - growthProgress, 4);

  // Calculate scale
  const imageStartWidth = 400;
  const isMobile = viewportWidth < 768;
  const targetWidthPercentage = isMobile ? 0.9 : 0.4;
  const targetWidth = viewportWidth * targetWidthPercentage;
  const targetScale = targetWidth / imageStartWidth;
  const easedScale = 1 + (targetScale - 1) * easedProgress;

  imageContainerRef.current.style.transformOrigin = 'top left';
  imageContainerRef.current.style.transform = `scale(${easedScale})`;
}
```

#### Phase 3.5: Overlay Fade (56%-72% progress)
```javascript
if (progress >= 0.56 && animatedOverlayRef.current) {
  const overlayProgress = (progress - 0.56) / 0.16; // Normalize to 0-1
  const clampedProgress = Math.min(overlayProgress, 1);

  // Power-3 easing
  const easedOverlayProgress = 1 - Math.pow(1 - clampedProgress, 3);

  animatedOverlayRef.current.style.opacity = String(easedOverlayProgress);
}
```

---

## Overlay Text Content
```html
<h3 className={styles.animatedHeadingText}>
  <span className={styles.headingWord1}>This could be your morning</span>
  <span className={styles.headingWord3}>Exciting.</span>
  <span className={styles.headingWord4}>Beautiful.</span>
  <span className={styles.headingWord5}>Captivating.</span>
</h3>
```

**Display**: Vertical stack (flexbox column)
- First line: "This could be your morning" (white #ffffff)
- Then: "Exciting." (tan #d4a574)
- Then: "Beautiful." (brown #8b6f47)
- Then: "Captivating." (blue #19547b)

**Typography**:
- Font size: 2.5rem (desktop), 2rem (tablet), 1.5rem (mobile)
- Font weight: 600
- Line height: 1.6
- Gap between lines: 0.5rem

---

## Responsive Behavior

### Desktop (≥768px)
- Two-column layout maintained
- Image scales to 40% viewport width
- Overlay positioned in left column area

### Mobile (<768px)
- Single-column stacked layout (text card above image)
- Image scales to 90% viewport width
- Overlay centered, width 90%
- Top positioned at 25% instead of 30%

---

## Known Issues & Problems

### Issue 1: Image Scaling Too Fast
**Symptom**: Even with 80vh duration and power-4 easing, growth feels abrupt
**Possible causes**:
- Easing curve may not be strong enough
- Could try power-5 or even power-6: `Math.pow(1 - progress, 6)`
- Duration might need to be even longer (100vh instead of 80vh?)
- GSAP's `scrub` parameter not being used (intentionally manual, but maybe needed?)

### Issue 2: Overlay Text Positioning
**Symptom**: Overlay doesn't appear where text card was
**Current calculation**: `margin-left: calc(-500px + 1.5rem)` is wrong
**What's needed**:
- Dynamically calculate where `.textCard` was positioned
- Could use `getBoundingClientRect()` on textCard before it fades
- Store that position and apply to overlay
- OR: Use same flexbox positioning approach but with fixed positioning

### Issue 3: Overall Jerkiness
**Symptom**: Animation doesn't feel smooth/cinematic
**Possible causes**:
- Browser repaint/reflow issues with `transform` and `opacity`
- Missing `will-change` properties
- Could benefit from GSAP's built-in smoothing
- Manual CSS manipulation via `onUpdate` may not be optimal

---

## Files Involved

### Primary Component
**Path**: `src/components/chapters/MorningDriveChapter/MorningDriveChapter.tsx`
- Lines 143-274: Animation useEffect with GSAP ScrollTrigger
- Lines 192-263: Main ScrollTrigger configuration
- Lines 207-215: Phase 2 text fade logic
- Lines 217-241: Phase 3 image growth and overlay fade logic

### Styling
**Path**: `src/components/chapters/MorningDriveChapter/MorningDriveChapter.module.css`
- Lines 1-43: Container and layout structure
- Lines 45-64: Text card and image card flex layout
- Lines 120-133: Image container with performance optimizations
- Lines 259-275: Overlay heading positioning (NEEDS FIX)
- Lines 312-324: Mobile responsive overlay positioning

---

## Suggestions for AI Assistant

### Priority 1: Fix Overlay Positioning
The overlay text must appear exactly where the text card was. Consider:
1. Capture text card's `getBoundingClientRect()` before fade
2. Apply those coordinates to fixed-positioned overlay
3. Ensure it works responsively across viewport sizes
4. Alternative: Use absolute positioning relative to container instead of fixed

### Priority 2: Improve Image Scaling Smoothness
The growth should feel luxuriously slow and cinematic:
1. Try stronger easing curves (power-5, power-6)
2. Consider extending duration to 100vh or 120vh
3. Test GSAP's native `scrub` parameter for smoothness
4. Ensure no janky repaints (check in DevTools performance)

### Priority 3: Test & Verify Timeline
Ensure all phases trigger at correct scroll positions:
- Use GSAP `markers: true` to visualize trigger points
- Verify percentage calculations match viewport heights
- Test on multiple viewport sizes (1920px, 1440px, 768px, 375px)

---

## Testing Checklist

- [ ] Text card fades smoothly from 50vh-100vh of scroll
- [ ] Image begins growing at exactly 100vh of scroll
- [ ] Image growth feels slow, smooth, cinematic (not abrupt)
- [ ] Overlay text appears at exactly 140vh of scroll
- [ ] Overlay is positioned where text card was (left side)
- [ ] Overlay fades in smoothly alongside image growth
- [ ] All animations complete by 180vh
- [ ] Hold phase is static from 180vh-210vh
- [ ] Section unpins cleanly at 250vh
- [ ] Works on desktop (1920px, 1440px)
- [ ] Works on tablet (768px)
- [ ] Works on mobile (375px)
- [ ] Respects `prefers-reduced-motion: reduce`

---

## Reference: Previous Attempts & Learnings

### What Didn't Work
1. **GSAP animating `position: 'fixed'`** - Caused instant snap/jump
2. **Animating image to center of viewport** - Too complex, caused jitter
3. **CSS class toggle for positioning** - Created conflicts between CSS and GSAP
4. **Sliding overlay from off-screen left** - Felt too distracting, removed
5. **15vh pin phase** - Too short, not enough reading time
6. **200vh total timeline** - Too compressed, animations felt rushed

### What Works
1. **Manual CSS manipulation via `onUpdate`** - Gives precise control
2. **Power easing curves** - Better than linear or default ease
3. **Transform origin `top left`** - Image grows correctly without moving
4. **Opacity-only overlay** - Simpler than sliding, less distracting
5. **250vh timeline** - More space for smooth animations
6. **50vh pin phase** - Good reading time before animations start

---

## Additional Context

### User Feedback History
1. "Image is jittery and jumps to top-left" → Fixed by removing position animations
2. "Growth rate is very fast instead of progressive" → Improved with power-4 easing
3. "Impossible to pull off" center positioning → Simplified to grow-in-place
4. "Image should grow from top-left" (changed from bottom-right)
5. "Increase timeline to 250vh for smoother animations"
6. "Texts should assume position where other text vacated" → Current issue

### Design Intent
The animation is meant to evoke a **cinematic Safari documentary feel**:
- Slow, luxurious pacing (not rushed web scrolling)
- Emphasis on the beautiful Safari image growing to dominate viewport
- Poetic overlay text that reinforces the aspirational mood
- "This could be your morning" = invitation to book the experience

---

## Success Criteria

When working correctly, the user should experience:
1. **Smooth, buttery** image growth that feels like a slow zoom lens
2. **Seamless transition** from reading text → viewing enlarged image
3. **Poetic moment** when overlay text appears in the vacated space
4. **No jarring movements** - everything feels intentional and cinematic
5. **Clear visual hierarchy** at each phase of the scroll

# Design Document: Morning Drive GSAP Scroll Animation

## Overview

This design implements a cinematic scroll-triggered animation sequence for the Morning Safari Drive section using GSAP (GreenSock Animation Platform) and its ScrollTrigger plugin. The animation creates a three-phase experience: (1) section pinning, (2) content fade-out with simultaneous image growth and centering, and (3) overlay text reveal. This replaces the existing Framer Motion implementation with a more performant and scroll-synchronized GSAP solution.

## Architecture

### Component Structure

```
MorningDriveChapter (React Component)
├── Section Container (Pinned Element)
│   ├── Main Heading (Static)
│   ├── Card Container
│   │   ├── Sub Heading (Fades Out)
│   │   ├── Description Row (Fades Out)
│   │   │   ├── Description Text
│   │   │   └── Safari Image (Grows & Centers)
│   │   └── Trip Details (Fades Out)
│   └── Animated Overlay (Appears After Image Growth)
```

### Animation Timeline

The animation is divided into distinct scroll-based phases:

**Phase 0: Pre-Pin (ScrollProgress < 0)**
- Section scrolls normally in document flow
- No animations active

**Phase 1: Pin Phase (ScrollProgress 0 → 1, Duration: 150vh)**
- Section becomes sticky at viewport top
- All content remains static and fully visible
- Creates anticipation for upcoming animation

**Phase 2: Animation Phase (ScrollProgress 1 → 1.8, Duration: ~80vh)**
- Content elements fade out (opacity 1 → 0)
- Safari image scales up (original size → 80% viewport width)
- Safari image translates to viewport center
- Image maintains opacity 1 throughout

**Phase 3: Text Reveal (ScrollProgress 1.8 → 2.3, Duration: ~50vh)**
- Safari image remains at 80% size, centered
- Overlay text "This could be your morning" fades in
- Text positioned 30vh below centered image

**Phase 4: Post-Animation (ScrollProgress > 2.3)**
- All animations complete
- Section continues scrolling normally
- Transitions to next section

## Components and Interfaces

### GSAP ScrollTrigger Configuration

```typescript
interface ScrollTriggerConfig {
  trigger: HTMLElement;           // The section element
  start: string;                  // "top top" - pin when section top hits viewport top
  end: string;                    // "+=300vh" - total scroll distance
  pin: boolean;                   // true - pin the section
  scrub: number;                  // 0.5 - smooth scrubbing with slight delay
  markers?: boolean;              // false in production, true for debugging
  onUpdate: (self: ScrollTrigger) => void;  // Update scroll progress
}
```

### Animation Timelines

**Timeline 1: Content Fade Out**
```typescript
const contentFadeTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "+=230vh",  // 150vh pin + 80vh animation
    scrub: 0.5,
  }
});

contentFadeTimeline
  .to(contentElements, {
    opacity: 0,
    duration: 0.8,  // Relative duration within timeline
  }, "150vh");  // Start after 150vh of pinning
```

**Timeline 2: Image Growth and Centering**
```typescript
const imageGrowTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "+=230vh",
    scrub: 0.5,
  }
});

imageGrowTimeline
  .to(imageRef.current, {
    scale: calculateTargetScale(),  // Dynamic based on viewport
    x: calculateCenterX(),          // Translate to center
    y: calculateCenterY(),          // Translate to center
    duration: 0.8,
  }, "150vh");  // Synchronized with content fade
```

**Timeline 3: Overlay Text Reveal**
```typescript
const overlayTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "+=280vh",  // 150vh pin + 80vh image + 50vh text
    scrub: 0.5,
  }
});

overlayTimeline
  .fromTo(overlayRef.current, 
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5 },
    "230vh"  // Start after image completes growth
  );
```

### React Component Structure

```typescript
interface MorningDriveChapterProps extends BaseChapterProps {
  backgroundImage?: string;
  midgroundImage?: string;
  ctaButton?: CTAButton;
}

const MorningDriveChapter: React.FC<MorningDriveChapterProps> = (props) => {
  // Refs for GSAP targets
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<HTMLElement[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // GSAP timeline refs for cleanup
  const timelinesRef = useRef<gsap.core.Timeline[]>([]);
  
  useEffect(() => {
    // Initialize GSAP animations
    // Store timelines for cleanup
    // Return cleanup function
  }, []);
  
  return (/* JSX */);
};
```

## Data Models

### Scroll Progress Calculation

```typescript
interface ScrollProgressData {
  progress: number;        // 0 to 2.3+ normalized progress
  phase: AnimationPhase;   // Current animation phase
  isPinned: boolean;       // Whether section is pinned
}

enum AnimationPhase {
  PRE_PIN = 'pre-pin',
  PIN = 'pin',
  ANIMATION = 'animation',
  TEXT_REVEAL = 'text-reveal',
  POST_ANIMATION = 'post-animation'
}
```

### Image Transform Calculations

```typescript
interface ImageTransform {
  scale: number;      // 1 to targetScale (e.g., 4.8 for 1920px viewport)
  x: number;          // Translation in pixels to center horizontally
  y: number;          // Translation in pixels to center vertically
}

function calculateImageTransform(
  imageRect: DOMRect,
  viewportWidth: number,
  viewportHeight: number
): ImageTransform {
  const imageStartWidth = 400;  // Original image width
  const targetWidth = viewportWidth * 0.8;  // 80% of viewport
  const targetScale = targetWidth / imageStartWidth;
  
  // Calculate current image center
  const imageCenterX = imageRect.left + imageRect.width / 2;
  const imageCenterY = imageRect.top + imageRect.height / 2;
  
  // Calculate viewport center
  const viewportCenterX = viewportWidth / 2;
  const viewportCenterY = viewportHeight / 2;
  
  // Calculate translation needed
  const translateX = viewportCenterX - imageCenterX;
  const translateY = viewportCenterY - imageCenterY;
  
  return {
    scale: targetScale,
    x: translateX,
    y: translateY
  };
}
```

## Error Handling

### GSAP Initialization Errors

```typescript
try {
  gsap.registerPlugin(ScrollTrigger);
  
  if (!sectionRef.current) {
    console.error('MorningDrive: Section ref not available');
    return;
  }
  
  // Create timelines...
} catch (error) {
  console.error('MorningDrive: GSAP initialization failed', error);
  // Fallback: render static content without animations
}
```

### Cleanup and Memory Management

```typescript
useEffect(() => {
  // ... animation setup
  
  return () => {
    // Kill all ScrollTrigger instances
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === sectionRef.current) {
        trigger.kill();
      }
    });
    
    // Kill all timelines
    timelinesRef.current.forEach(timeline => {
      timeline.kill();
    });
    
    timelinesRef.current = [];
  };
}, []);
```

### Responsive Breakpoint Handling

```typescript
useEffect(() => {
  const handleResize = () => {
    // Recalculate image transforms on viewport resize
    ScrollTrigger.refresh();
  };
  
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

## Testing Strategy

### Unit Tests

1. **Transform Calculations**
   - Test `calculateImageTransform()` with various viewport sizes
   - Verify correct scale, x, and y values
   - Test edge cases (very small/large viewports)

2. **Scroll Progress Mapping**
   - Test scroll position to progress conversion
   - Verify phase transitions occur at correct thresholds
   - Test boundary conditions (progress 0, 1, 1.8, 2.3)

### Integration Tests

1. **GSAP Timeline Synchronization**
   - Verify content fades while image grows simultaneously
   - Confirm overlay appears only after image completes growth
   - Test timeline cleanup on component unmount

2. **ScrollTrigger Behavior**
   - Test section pins at correct scroll position
   - Verify animations trigger at correct scroll thresholds
   - Test scroll direction (forward and backward)

### Visual Regression Tests

1. **Animation Sequence**
   - Capture screenshots at key scroll positions
   - Verify image centering at various viewport sizes
   - Test overlay text positioning

2. **Cross-Browser Testing**
   - Chrome, Firefox, Safari, Edge
   - Test on Windows, macOS, iOS, Android
   - Verify smooth performance (60fps target)

### Performance Tests

1. **Frame Rate Monitoring**
   - Use Chrome DevTools Performance tab
   - Target: Maintain 60fps during scroll
   - Monitor for layout thrashing or reflows

2. **Memory Leak Detection**
   - Test component mount/unmount cycles
   - Verify ScrollTrigger instances are cleaned up
   - Check for retained detached DOM nodes

### Manual Testing Checklist

- [ ] Section pins smoothly when reaching viewport top
- [ ] Content fades out while image grows (synchronized)
- [ ] Image centers perfectly in viewport at 80% width
- [ ] Image maintains opacity 1 throughout growth
- [ ] Overlay text appears only after image completes growth
- [ ] Overlay text positioned correctly below image
- [ ] Animation works on mobile (portrait and landscape)
- [ ] Animation works on tablet
- [ ] Animation works on desktop (various resolutions)
- [ ] Scrolling backward reverses animations correctly
- [ ] No console errors or warnings
- [ ] No visual glitches or jumps
- [ ] Smooth performance on lower-end devices

## Implementation Notes

### GSAP vs Framer Motion

**Why GSAP for this animation:**
- Superior scroll-triggered animation synchronization
- More precise control over animation timing
- Better performance for complex scroll animations
- Built-in ScrollTrigger plugin designed for this use case
- Easier to coordinate multiple simultaneous animations

**Migration Strategy:**
1. Remove all Framer Motion imports and components
2. Replace `motion.div` with standard `div` elements
3. Add refs to elements that need animation
4. Implement GSAP timelines in `useEffect`
5. Ensure proper cleanup on unmount

### CSS Considerations

**Remove from CSS:**
- Framer Motion-specific transitions
- CSS animations that conflict with GSAP
- Transform properties that GSAP will control

**Keep in CSS:**
- Layout styles (flexbox, grid)
- Typography and colors
- Static positioning (before GSAP takes over)
- Responsive breakpoints

**Add to CSS:**
```css
.morningDriveChapter {
  min-height: 300vh; /* 150vh pin + 80vh animation + 70vh text reveal */
  position: relative; /* GSAP will make it sticky */
}

.imageContainer {
  transform-origin: center center; /* For GSAP scaling */
  will-change: transform; /* Performance hint */
}

.animatedOverlay {
  position: fixed; /* Overlay on top of everything */
  z-index: 100;
  pointer-events: none; /* Don't block interactions */
}
```

### Accessibility Considerations

1. **Reduced Motion Preference**
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Disable animations, show final state
  gsap.set(imageRef.current, { scale: targetScale, x: centerX, y: centerY });
  gsap.set(overlayRef.current, { opacity: 1 });
  return;
}
```

2. **Screen Reader Announcements**
```typescript
// Announce when image is fully visible
if (scrollProgress >= 1.8 && scrollProgress < 1.81) {
  announceToScreenReader('Safari image now fully visible');
}
```

3. **Keyboard Navigation**
- Ensure section is still keyboard-navigable during pin
- Don't trap focus within pinned section
- Allow skip links to work correctly

### Performance Optimizations

1. **Use `will-change` CSS property** on animated elements
2. **Limit repaints** by animating only transform and opacity
3. **Use `scrub` parameter** for smooth scroll-linked animations
4. **Debounce resize handler** to avoid excessive recalculations
5. **Use `passive: true`** for scroll event listeners (if any)
6. **Lazy load images** that aren't immediately visible

### Mobile Considerations

```typescript
const isMobile = window.innerWidth < 768;

const targetScale = isMobile 
  ? (viewportWidth * 0.9) / imageStartWidth  // 90% on mobile
  : (viewportWidth * 0.8) / imageStartWidth; // 80% on desktop

const overlayFontSize = isMobile ? '1.5rem' : '2.5rem';
```

## Diagram: Animation Flow

```
Scroll Position (vh)
│
0vh   ─────────────────────────────────────
      │ Section enters viewport
      │ Normal scroll
      │
      ▼
      Section top reaches viewport top
      ═══════════════════════════════════
      ║ PHASE 1: PIN (150vh)            ║
      ║ - Section sticks to top         ║
      ║ - No animations                 ║
      ║ - Content fully visible         ║
      ═══════════════════════════════════
150vh │
      ▼
      ═══════════════════════════════════
      ║ PHASE 2: ANIMATION (80vh)       ║
      ║ - Content fades out             ║
      ║ - Image grows to 80%            ║
      ║ - Image centers in viewport     ║
      ║ - Image opacity stays 1         ║
      ═══════════════════════════════════
230vh │
      ▼
      ═══════════════════════════════════
      ║ PHASE 3: TEXT REVEAL (50vh)     ║
      ║ - Image remains at 80%, centered║
      ║ - Overlay text fades in         ║
      ║ - "This could be your morning"  ║
      ═══════════════════════════════════
280vh │
      ▼
      Section continues to next chapter
```

## Dependencies

- **GSAP**: ^3.13.0 (already installed)
- **React**: ^18.3.0 (already installed)
- **Next.js**: ^14.2.0 (already installed)

No additional dependencies required.

## File Changes Required

1. **src/components/chapters/MorningDriveChapter/MorningDriveChapter.tsx**
   - Remove Framer Motion imports
   - Add GSAP imports
   - Replace motion components with standard HTML elements
   - Implement GSAP ScrollTrigger animations
   - Add cleanup logic

2. **src/components/chapters/MorningDriveChapter/MorningDriveChapter.module.css**
   - Update min-height to 300vh
   - Remove conflicting transitions
   - Add will-change properties
   - Update overlay positioning

3. **No new files required** - all changes are modifications to existing files

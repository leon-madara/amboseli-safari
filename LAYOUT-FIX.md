# Layout Fix - CSS Class Approach

**Date:** November 17, 2025  
**Issue:** Sticky positioning broke the initial layout  
**Solution:** Use CSS class that's toggled by JavaScript

---

## Problem

The `position: sticky` with `margin-left: calc(50vw - 200px)` broke the initial layout:
- Image was positioned outside the card
- Card layout was disrupted
- Image wasn't in the flex flow properly

---

## Solution: CSS Class Approach

### Initial State (Before Animation)
```css
.imageContainer {
  position: relative;  /* Normal flow */
  flex: 1;
  max-width: 400px;
  width: 100%;
}
```
Image stays in card, normal flex layout.

### Fixed State (During Animation)
```css
.imageContainerFixed {
  position: fixed !important;
  top: calc(50vh - 125px) !important;
  left: calc(50vw - 200px) !important;
  width: 400px !important;
  z-index: 50 !important;
  transition: top 0.5s ease-out, left 0.5s ease-out;
}
```
Image breaks free and centers at viewport.

---

## Implementation

### CSS (MorningDriveChapter.module.css)

```css
/* Base state - image in card */
.imageContainer {
  flex: 1;
  max-width: 400px;
  width: 100%;
  transform-origin: center center;
  position: relative;
  overflow: visible;
  z-index: 10;
  will-change: transform;
  contain: layout style;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Fixed state - image breaks free */
.imageContainerFixed {
  position: fixed !important;
  top: calc(50vh - 125px) !important;
  left: calc(50vw - 200px) !important;
  width: 400px !important;
  z-index: 50 !important;
  transition: top 0.5s ease-out, left 0.5s ease-out;
}
```

### JavaScript (MorningDriveChapter.tsx)

```typescript
onUpdate: (self) => {
  if (!imageContainerRef.current) return;
  
  const progress = self.progress;
  const animationStartProgress = 0.4; // 200vh / 500vh
  
  // Add fixed class when animation starts
  if (progress >= animationStartProgress) {
    if (!imageContainerRef.current.classList.contains(styles.imageContainerFixed)) {
      imageContainerRef.current.classList.add(styles.imageContainerFixed);
    }
  } else {
    // Remove fixed class before animation
    imageContainerRef.current.classList.remove(styles.imageContainerFixed);
  }
}
```

---

## How It Works

### Phase 1: Before Animation (0-200vh)
```
.imageContainer (relative positioning)
├── In card flex layout
├── Normal document flow
└── Positioned with other card content
```

### Phase 2: Animation Starts (200vh)
```
.imageContainer + .imageContainerFixed
├── position: fixed applied
├── Breaks out of card
├── Centers at 50vh, 50vw
└── Smooth 0.5s transition
```

### Phase 3: During Animation (200vh-400vh)
```
.imageContainer.imageContainerFixed
├── Stays fixed at viewport center
├── GSAP animates scale
└── Card fades/moves behind it
```

---

## Benefits

✅ **Clean initial layout** - Image in normal flex flow  
✅ **Smooth transition** - CSS handles movement to center  
✅ **Separation of concerns** - CSS for styling, JS for timing  
✅ **Easy to debug** - Inspect CSS class, not inline styles  
✅ **Maintainable** - Change CSS class, not JavaScript logic  

---

## Why This Works Better Than Pure Sticky

**Pure sticky approach:**
- Required `margin-left` to position horizontally
- Broke initial layout
- Image wasn't in flex flow

**CSS class approach:**
- Image starts in normal flow
- Only becomes fixed when needed
- Layout preserved until animation starts

---

## Files Modified

1. **src/components/chapters/MorningDriveChapter/MorningDriveChapter.module.css**
   - Reverted `.imageContainer` to relative positioning
   - Added `.imageContainerFixed` class for fixed state

2. **src/components/chapters/MorningDriveChapter/MorningDriveChapter.tsx**
   - Added `onUpdate` callback to toggle class
   - Added cleanup to remove class on unmount
   - Kept scale animation only

---

## Result

✅ Layout works correctly  
✅ Image in card initially  
✅ Image breaks free and centers smoothly  
✅ Clean separation: CSS for styling, JS for timing  
✅ Easy to maintain and debug  


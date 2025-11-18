# Image Centering Fix

**Date:** November 17, 2025  
**Issue:** Image was jumping to bottom-right when becoming fixed  
**Solution:** Position image at viewport center (50vh, 50vw) when it detaches

---

## Problem

When the image became `position: fixed`, it was using its current position from the document flow, which caused it to appear in the wrong location (bottom-right area).

### Before:
```typescript
// Used current position from document
const currentRect = imageContainerRef.current.getBoundingClientRect();

imageContainerRef.current.style.top = `${currentRect.top}px`;
imageContainerRef.current.style.left = `${currentRect.left}px`;
```

**Result:** Image appeared wherever it happened to be in the document flow at that moment.

---

## Solution

Use CSS `calc()` with viewport units to position the image at the exact center of the **viewport** (browser window), not the section.

### After:
```typescript
// Position at viewport center using calc() to account for image dimensions
// 50vh - (image height / 2) and 50vw - (image width / 2)
const centerTop = `calc(50vh - ${initialHeight / 2}px)`;
const centerLeft = `calc(50vw - ${initialWidth / 2}px)`;

imageContainerRef.current.style.top = centerTop;
imageContainerRef.current.style.left = centerLeft;
imageContainerRef.current.style.transition = 'top 0.5s ease-out, left 0.5s ease-out';
```

**Result:** Image appears at exact center of viewport (50vh, 50vw) with smooth 0.5s transition.

---

## Centering Math

To center an element at 50vh, 50vw:

```
Center Top = (Viewport Height × 0.5) - (Image Height ÷ 2)
Center Left = (Viewport Width × 0.5) - (Image Width ÷ 2)
```

### Example:
- Viewport: 1000px × 1000px
- Image: 400px × 250px

```
Center Top = (1000 × 0.5) - (250 ÷ 2) = 500 - 125 = 375px
Center Left = (1000 × 0.5) - (400 ÷ 2) = 500 - 200 = 300px
```

Result: Image centered at viewport center.

---

## Added Smooth Transition

Added a smooth 0.5s transition when the image moves to center:

```typescript
imageContainerRef.current.style.transition = 'top 0.5s ease-out, left 0.5s ease-out';
```

This creates a smooth half-second animation when the image moves to viewport center.

## Why calc() with Viewport Units?

Using `calc(50vh - ${height/2}px)` ensures:
- **50vh** = 50% of viewport height (browser window)
- **50vw** = 50% of viewport width (browser window)
- **Not relative to section** - Uses viewport coordinates
- **Accounts for image size** - Subtracts half dimensions to center properly
- **Works with GSAP scale** - Doesn't conflict with transform animations

---

## Visual Flow

### Before Fix:
```
Image in card (bottom-right area)
  ↓
Becomes fixed at current position (bottom-right)
  ↓
Grows from bottom-right ❌ WRONG
```

### After Fix:
```
Image in card (anywhere in document)
  ↓
Becomes fixed at viewport center (50vh, 50vw)
  ↓
Grows from center ✅ CORRECT
```

---

## Files Modified

**src/components/chapters/MorningDriveChapter/MorningDriveChapter.tsx**
- Changed fixed positioning calculation
- Now uses viewport center instead of current position
- Added smooth transition for position change

---

## Result

✅ Image detaches and immediately moves to viewport center  
✅ Image grows from center (50vh, 50vw)  
✅ Smooth transition when moving to center  
✅ Consistent behavior regardless of scroll position  


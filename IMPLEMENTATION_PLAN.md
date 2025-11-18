# Implementation Plan: Wildlife Encounters Card Stacking

## Phase 1: Fix Overlap Error (Priority 1)

### Objective
Fix the overlap between Wildlife Encounters and Accommodations sections by updating Wildlife chapter height from 80vh to 160vh.

---

### Step 1.1: Update Chapter Configuration
**File:** `src/data/chapters.ts`
**Line:** ~47 (wildlife-encounters config)

**Action:**
```javascript
// Find this object:
{
  id: 'wildlife-encounters',
  number: 3,
  title: 'Meet the Magnificent Five',
  timeOfDay: 'morning',
  heightVh: 80, // ← CHANGE THIS
  // ...
}

// Change to:
heightVh: 160, // Was 80
```

**Expected Result:**
- Wildlife Encounters section now allocates 160vh of DOM space
- Accommodations section starts 80vh later in the scroll
- No overlap between sections

**Testing:**
- Scroll through the page
- Verify Wildlife Encounters stays visible for ~160vh of scroll
- Verify Accommodations doesn't appear until Wildlife completes
- Check browser console for ScrollTrigger warnings

---

### Step 1.2: Verify Position Calculations
**File:** `src/data/chapters.ts`
**Lines:** ~58-83 (calculateChapterPositions function)

**Action:**
- Check that the function automatically recalculates positions
- Verify `positions.accommodations.start` reflects new Wildlife height

**Expected Result:**
```javascript
// Before:
wildlifeEncounters: { start: 160vh, end: 240vh }
accommodations:     { start: 240vh, end: 320vh }

// After:
wildlifeEncounters: { start: 160vh, end: 320vh } // +80vh
accommodations:     { start: 320vh, end: 400vh } // Shifted +80vh
```

**Testing:**
- Add console.log in calculateChapterPositions to verify values
- Check that all subsequent chapters shift by 80vh

---

### Step 1.3: Test Overlap Fix
**Actions:**
1. Run dev server: `npm run dev`
2. Open browser to homepage
3. Scroll to Wildlife Encounters section
4. Open browser DevTools → Elements
5. Check ScrollTrigger markers (if enabled)
6. Verify:
   - Wildlife section height in DOM = 160vh
   - Accommodations doesn't appear until Wildlife ends
   - No layout shift or jumping

**Success Criteria:**
- ✅ Wildlife Encounters visible for full 160vh
- ✅ Accommodations section starts cleanly after Wildlife
- ✅ No overlap or simultaneous visibility
- ✅ Smooth scroll progression

---

## Phase 2: Implement Card Stacking Effect (Priority 2)

### Objective
Replace horizontal scrolling gallery with symmetric fan card stacking animation.

**Timeline Breakdown:**
```
0-15vh:    Intro fade out
15-35vh:   Card 1 (Elephant) enters center
35-55vh:   Card 2 (Lion) enters, Elephant slides left
55-75vh:   Card 3 (Giraffe) enters center, cards 1-2 slide left
75-95vh:   Card 4 (Zebra) enters right
95-115vh:  Card 5 (Cheetah) enters far right
115-130vh: Hold final fan arrangement
130-160vh: Transition to Accommodations
```

---

### Step 2.1: Update ScrollTrigger Pin Duration
**File:** `src/components/chapters/WildlifeEncountersChapter/WildlifeEncountersChapter.tsx`
**Line:** ~51

**Action:**
```javascript
// Find:
end: () => `+=${window.innerHeight * 2.5}`, // 250vh

// Change to:
end: '+=160vh', // Matches chapter config
```

**Expected Result:**
- Section pins for exactly 160vh
- Matches DOM allocation
- No overflow or underflow

---

### Step 2.2: Add Individual Card Refs
**File:** `src/components/chapters/WildlifeEncountersChapter/WildlifeEncountersChapter.tsx`
**Line:** ~26-29 (after existing refs)

**Action:**
```javascript
// Add after existing refs:
const card1Ref = useRef<HTMLDivElement>(null);
const card2Ref = useRef<HTMLDivElement>(null);
const card3Ref = useRef<HTMLDivElement>(null);
const card4Ref = useRef<HTMLDivElement>(null);
const card5Ref = useRef<HTMLDivElement>(null);
```

**Expected Result:**
- Direct access to each card for GSAP animations
- Better performance than querying DOM

---

### Step 2.3: Remove Horizontal Scroll Logic
**File:** `src/components/chapters/WildlifeEncountersChapter/WildlifeEncountersChapter.tsx`
**Lines:** ~39-44, ~80-84

**Actions:**
1. **Delete getScrollDistance function:**
   ```javascript
   // DELETE LINES 39-44:
   const getScrollDistance = () => {
     const cardsWidth = cards.scrollWidth;
     const viewportWidth = window.innerWidth;
     return cardsWidth - viewportWidth;
   };
   ```

2. **Delete horizontal scroll animation:**
   ```javascript
   // DELETE LINES 80-84:
   .to(cards, {
     x: () => -getScrollDistance(),
     ease: 'none',
     duration: 0.7,
   });
   ```

**Expected Result:**
- No horizontal scrolling
- Clean slate for new animation

---

### Step 2.4: Implement Card Stacking Timeline
**File:** `src/components/chapters/WildlifeEncountersChapter/WildlifeEncountersChapter.tsx`
**Location:** Inside useEffect, after intro animations

**Action:** Add complete card stacking timeline:

```javascript
// After intro fade animation (around line 78)

// Set initial state for all cards
gsap.set([card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current, card5Ref.current], {
  y: '100vh',
  x: '0%',
  rotation: 0,
  opacity: 0,
  scale: 1,
});

// CARD 1 - ELEPHANT (15-35vh)
gsap.fromTo(
  card1Ref.current,
  { y: '100vh', x: '0%', rotation: 0, opacity: 0 },
  {
    y: '30vh',
    x: '0%',
    rotation: 0,
    opacity: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top+=15vh',
      end: 'top+=35vh',
      scrub: 1,
    },
  }
);

// CARD 1 - Slide left when Card 2 enters (35-45vh)
gsap.to(card1Ref.current, {
  x: '-15%',
  rotation: -3,
  scrollTrigger: {
    trigger: section,
    start: 'top+=35vh',
    end: 'top+=45vh',
    scrub: 1,
  },
});

// CARD 1 - Slide further left when Card 3 enters (55-65vh)
gsap.to(card1Ref.current, {
  x: '-25%',
  rotation: -6,
  scrollTrigger: {
    trigger: section,
    start: 'top+=55vh',
    end: 'top+=65vh',
    scrub: 1,
  },
});

// CARD 2 - LION (35-55vh)
gsap.fromTo(
  card2Ref.current,
  { y: '100vh', x: '0%', rotation: 0, opacity: 0 },
  {
    y: '30vh',
    x: '0%',
    rotation: 0,
    opacity: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top+=35vh',
      end: 'top+=55vh',
      scrub: 1,
    },
  }
);

// CARD 2 - Slide left when Card 3 enters (55-65vh)
gsap.to(card2Ref.current, {
  x: '-15%',
  rotation: -3,
  scrollTrigger: {
    trigger: section,
    start: 'top+=55vh',
    end: 'top+=65vh',
    scrub: 1,
  },
});

// CARD 3 - GIRAFFE (55-75vh) - CENTER, STAYS PUT
gsap.fromTo(
  card3Ref.current,
  { y: '100vh', x: '0%', rotation: 0, opacity: 0 },
  {
    y: '30vh',
    x: '0%',
    rotation: 0, // Stays centered at 0°
    opacity: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top+=55vh',
      end: 'top+=75vh',
      scrub: 1,
    },
  }
);

// CARD 4 - ZEBRA (75-95vh) - ENTERS RIGHT
gsap.fromTo(
  card4Ref.current,
  { y: '100vh', x: '0%', rotation: 0, opacity: 0 },
  {
    y: '30vh',
    x: '+15%',
    rotation: +3,
    opacity: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top+=75vh',
      end: 'top+=95vh',
      scrub: 1,
    },
  }
);

// CARD 5 - CHEETAH (95-115vh) - ENTERS FAR RIGHT
gsap.fromTo(
  card5Ref.current,
  { y: '100vh', x: '0%', rotation: 0, opacity: 0 },
  {
    y: '30vh',
    x: '+25%',
    rotation: +6,
    opacity: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top+=95vh',
      end: 'top+=115vh',
      scrub: 1,
    },
  }
);

// TRANSITION TO ACCOMMODATIONS (130-160vh)
const cardsContainer = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current, card5Ref.current];

gsap.to(cardsContainer, {
  scale: 0.8,
  y: '-10vh',
  opacity: 0.4,
  scrollTrigger: {
    trigger: section,
    start: 'top+=130vh',
    end: 'top+=160vh',
    scrub: 1,
  },
});
```

**Expected Result:**
- Cards enter from bottom-center sequentially
- Symmetric fan forms: -6°, -3°, 0°, +3°, +6°
- All 5 cards visible in final arrangement
- Smooth transition to Accommodations

---

### Step 2.5: Update JSX to Use Individual Card Refs
**File:** `src/components/chapters/WildlifeEncountersChapter/WildlifeEncountersChapter.tsx`
**Lines:** ~133-174

**Action:** Replace mapping with explicit card elements:

```javascript
// BEFORE: Mapping approach
{animals.map((animal, index) => (
  <div key={animal.id} className={styles.card}>
    {/* card content */}
  </div>
))}

// AFTER: Individual cards with refs
<div ref={card1Ref} className={styles.card} style={{ zIndex: 1 }}>
  <div className={styles.cardImage}>
    <OptimizedImage
      src={animals[0].image}
      alt={animals[0].name}
      fill
      imageType="content"
      className={styles.image}
    />
    <div className={styles.statusBadge} data-status={animals[0].conservationStatus.toLowerCase().replace(' ', '-')}>
      {animals[0].conservationStatus}
    </div>
  </div>
  <div className={styles.cardContent}>
    <h3 className={styles.animalName}>{animals[0].name}</h3>
    <p className={styles.scientificName}>{animals[0].scientificName}</p>
    <p className={styles.description}>{animals[0].description}</p>
    <div className={styles.funFact}>
      <div className={styles.funFactLabel}>Did you know?</div>
      <p className={styles.funFactText}>{animals[0].funFact}</p>
    </div>
    <div className={styles.bestTime}>
      <span className={styles.bestTimeLabel}>Best time to see:</span>
      <span className={styles.bestTimeValue}>{animals[0].bestTimeToSee}</span>
    </div>
    <a href={`/wildlife/${animals[0].id}`} className={styles.learnMore}>
      Learn to Encounter
    </a>
  </div>
</div>

{/* Repeat for cards 2-5 with card2Ref through card5Ref, zIndex 2-5 */}
```

**Expected Result:**
- Each card has individual ref
- Z-index explicitly set (1-5)
- GSAP can target each card independently

---

### Step 2.6: Update CSS for Absolute Positioning
**File:** `src/components/chapters/WildlifeEncountersChapter/WildlifeEncountersChapter.module.css`

**Changes:**

1. **Gallery Container (Line ~64):**
   ```css
   .galleryContainer {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     display: block;
     z-index: 5;
     opacity: 1; /* Change from 0 - let GSAP handle */
   }
   ```

2. **Cards Wrapper (Line ~78):**
   ```css
   .cardsWrapper {
     position: relative;
     width: 100%;
     height: 100%;
     /* Remove: display: flex, gap, padding */
   }
   ```

3. **Individual Cards (Line ~86):**
   ```css
   .card {
     position: absolute;
     left: 50%;
     top: 50%;
     transform: translate(-50%, -50%); /* Initial centered */
     width: clamp(320px, 35vw, 450px);
     background: rgba(255, 255, 255, 0.98);
     border-radius: 20px;
     overflow: hidden;
     box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
     transition: transform 0.3s ease, box-shadow 0.3s ease;
     will-change: transform; /* GPU acceleration */
   }
   ```

**Expected Result:**
- Cards positioned absolutely in center
- GSAP transforms work correctly
- GPU-accelerated animations

---

### Step 2.7: Update Cleanup Function
**File:** `src/components/chapters/WildlifeEncountersChapter/WildlifeEncountersChapter.tsx`
**Lines:** ~86-92

**Action:**
```javascript
// Update cleanup to kill all new ScrollTriggers
return () => {
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.vars.trigger === section) {
      trigger.kill();
    }
  });
};
```

**Expected Result:**
- All ScrollTriggers cleaned up on unmount
- No memory leaks
- Smooth navigation

---

## Phase 3: Testing & Verification

### Test Plan 3.1: Overlap Fix Verification
**Actions:**
1. Open dev server
2. Scroll from Morning Drive → Wildlife Encounters
3. Continue scrolling through Wildlife Encounters
4. Continue to Accommodations
5. Use DevTools to check:
   - Wildlife section height = 160vh in DOM
   - No overlap between sections
   - ScrollTrigger markers (if enabled) align correctly

**Expected Results:**
- ✅ Wildlife visible for ~160vh of scroll
- ✅ Accommodations starts only after Wildlife ends
- ✅ No simultaneous visibility
- ✅ No ScrollTrigger warnings in console

---

### Test Plan 3.2: Card Stacking Animation
**Actions:**
1. Scroll to Wildlife Encounters section
2. Observe card entrance sequence
3. Check final fan arrangement
4. Verify z-index layering
5. Test transition to Accommodations

**Expected Results:**
- ✅ Intro fades out smoothly (0-15vh)
- ✅ Card 1 enters from bottom-center (15-35vh)
- ✅ Card 2 enters, Card 1 slides left (35-55vh)
- ✅ Card 3 enters center, Cards 1-2 slide left (55-75vh)
- ✅ Card 4 enters right (75-95vh)
- ✅ Card 5 enters far right (95-115vh)
- ✅ Final fan: -6°, -3°, 0°, +3°, +6°
- ✅ All 5 cards visible
- ✅ Cheetah (Card 5) on top (highest z-index)
- ✅ Elephant (Card 1) at back (lowest z-index)
- ✅ Cards hold (115-130vh)
- ✅ Smooth fade/scale to Accommodations (130-160vh)

---

### Test Plan 3.3: Performance Check
**Actions:**
1. Open Chrome DevTools → Performance tab
2. Record while scrolling through Wildlife section
3. Check FPS (should be ~60fps)
4. Check for layout thrashing
5. Verify GPU acceleration

**Expected Results:**
- ✅ Smooth 60fps scrolling
- ✅ No janky frames
- ✅ Transform animations GPU-accelerated
- ✅ No excessive repaints

---

### Test Plan 3.4: Mobile Testing
**Actions:**
1. Open DevTools → Device Emulation
2. Test on iPhone, iPad, Android
3. Verify card layout
4. Check touch scrolling

**Expected Results:**
- ✅ Cards visible and readable
- ✅ Smooth touch scrolling
- ✅ No horizontal overflow
- ✅ Animations work or gracefully disable

---

## Phase 4: Potential Issues & Solutions

### Issue 4.1: Cards Not Appearing
**Symptom:** Cards remain invisible
**Causes:**
- Refs not set correctly
- Initial opacity: 0 not being overridden
- ScrollTrigger not triggering

**Solutions:**
1. Check refs are attached: `console.log(card1Ref.current)`
2. Check initial GSAP set: Add `markers: true` to ScrollTriggers
3. Verify scroll positions: Check start/end values

---

### Issue 4.2: Cards Not Sliding Left/Right
**Symptom:** Cards enter but don't slide to positions
**Causes:**
- Multiple GSAP animations overwriting each other
- Transform conflicts
- Timing issues

**Solutions:**
1. Check for transform conflicts in CSS
2. Use `overwrite: 'auto'` in GSAP animations
3. Verify start/end positions don't overlap

---

### Issue 4.3: Z-Index Not Working
**Symptom:** Wrong cards appearing on top
**Causes:**
- Inline styles overriding z-index
- Position not set to absolute
- Parent container issues

**Solutions:**
1. Check position: absolute on cards
2. Verify z-index set in inline styles or GSAP
3. Check parent container doesn't have transform (creates stacking context)

---

### Issue 4.4: Transition Jumpy
**Symptom:** Cards jump when transitioning to Accommodations
**Causes:**
- Conflicting ScrollTriggers
- Accommodations pinning while Wildlife still pinned
- Timing overlap

**Solutions:**
1. Check Wildlife ends at exactly 160vh
2. Verify Accommodations starts after 160vh
3. Add small buffer (5vh) between transitions

---

## Phase 5: Optimization & Polish

### Optimization 5.1: GPU Acceleration
**File:** `src/components/chapters/WildlifeEncountersChapter/WildlifeEncountersChapter.module.css`

**Add:**
```css
.card {
  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}
```

---

### Optimization 5.2: Reduce Motion Preference
**File:** `src/components/chapters/WildlifeEncountersChapter/WildlifeEncountersChapter.tsx`

**Add:**
```javascript
useEffect(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Disable animations, show cards in simple layout
    gsap.set([card1Ref.current, card2Ref.current, /* ... */], {
      y: '0vh',
      opacity: 1,
      rotation: 0,
    });
    return;
  }

  // Regular animations...
}, []);
```

---

### Polish 5.3: Add Loading States
**Ensure images load before animation:**
```javascript
const [imagesLoaded, setImagesLoaded] = useState(false);

useEffect(() => {
  const imagePromises = animals.map((animal) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = resolve;
      img.src = animal.image;
    });
  });

  Promise.all(imagePromises).then(() => {
    setImagesLoaded(true);
  });
}, [animals]);

// Only run GSAP animations when images loaded
useEffect(() => {
  if (!imagesLoaded) return;
  // GSAP animations...
}, [imagesLoaded]);
```

---

## Phase 6: Documentation

### Code Comments
Add comments explaining each phase:
```javascript
// ===== CARD 1 - ELEPHANT =====
// Phase 1: Enter from bottom-center (15-35vh)
// Phase 2: Slide left when Lion enters (35-45vh)
// Phase 3: Slide further left when Giraffe enters (55-65vh)
// Final position: x: -25%, rotation: -6°, z-index: 1
```

---

## Summary Checklist

### Phase 1: Fix Overlap ✅
- [ ] Update chapter config heightVh to 160
- [ ] Verify position calculations
- [ ] Test no overlap with Accommodations
- [ ] Commit: "fix: Update Wildlife Encounters chapter height to 160vh"

### Phase 2: Implement Card Stacking ✅
- [ ] Update ScrollTrigger pin duration to 160vh
- [ ] Add individual card refs
- [ ] Remove horizontal scroll logic
- [ ] Implement card stacking timeline
- [ ] Update JSX with individual cards
- [ ] Update CSS for absolute positioning
- [ ] Update cleanup function
- [ ] Commit: "feat: Implement symmetric fan card stacking animation"

### Phase 3: Testing ✅
- [ ] Test overlap fix
- [ ] Test card animation sequence
- [ ] Test performance (60fps)
- [ ] Test on mobile devices
- [ ] Fix any issues found

### Phase 4: Optimization ✅
- [ ] Add GPU acceleration
- [ ] Add reduced motion support
- [ ] Add loading states
- [ ] Commit: "perf: Optimize card stacking animations"

### Phase 5: Documentation ✅
- [ ] Add code comments
- [ ] Update README if needed
- [ ] Commit: "docs: Add card stacking animation documentation"

---

## Estimated Time

- Phase 1 (Fix Overlap): 15 minutes
- Phase 2 (Card Stacking): 2-3 hours
- Phase 3 (Testing): 1 hour
- Phase 4 (Optimization): 30 minutes
- Phase 5 (Documentation): 15 minutes

**Total:** ~4-5 hours

---

## Ready to Begin?

Confirm you're ready to proceed and I'll start with Phase 1: Fixing the overlap issue.

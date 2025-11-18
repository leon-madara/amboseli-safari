# Wildlife Card Stacking - Refined Concept 2: Symmetric Fan Spread

## 🎯 Final Approved Design: Symmetric Cascading Fan

### The Refined Experience

**Imagine dealing cards from the center outward, creating a perfect symmetrical fan:**

1. Cards enter from **bottom-center**, one at a time
2. As each new card appears, previous cards **slide to their positions** in the fan
3. Final arrangement: **2 left, 1 center, 2 right** - perfectly balanced
4. The **center card (Giraffe)** is the focal point at 0° rotation
5. Cards fan out symmetrically with matching angles: **-6°, -3°, 0°, +3°, +6°**

---

## Visual Progression (Step-by-Step)

### SCROLL 0-15vh: Intro Phase
```
┌──────────────────────────────────────┐
│                                      │
│        WILDLIFE ENCOUNTERS           │
│                                      │
│   Meet the Majestic Five of Amboseli│
│                                      │
│         (Fading out...)              │
└──────────────────────────────────────┘
```

### SCROLL 15-35vh: Card 1 - Elephant Enters
```
┌──────────────────────────────────────┐
│                                      │
│                                      │
│         ╔══════════════════╗         │
│         ║  African Elephant║         │
│         ║     [Image]      ║  0°     │
│         ║  Loxodonta...    ║         │
│         ╚══════════════════╝         │
│           (Center position)          │
└──────────────────────────────────────┘
Elephant slides up from bottom-center
Initially at 0° rotation, centered
Z-index: 1
```

### SCROLL 35-55vh: Card 2 - Lion Enters, Elephant Slides Left
```
┌──────────────────────────────────────┐
│                                      │
│    ╔══════════════╗                  │
│    ║   Elephant  ║╲                  │
│    ║   [Image]   ║ ╲ -3°             │
│    ╚══════════════╝  ╲               │
│                       ╲              │
│         ╔══════════════════╗         │
│         ║  African Lion    ║         │
│         ║     [Image]      ║  0°     │
│         ║  Panthera leo    ║         │
│         ╚══════════════════╝         │
│           (Center position)          │
└──────────────────────────────────────┘
Lion enters from bottom-center
Elephant SLIDES LEFT and rotates to -3°
Lion takes center position at 0°
Z-index: Elephant=1, Lion=2
```

### SCROLL 55-75vh: Card 3 - Giraffe Enters, Cards Shift
```
┌──────────────────────────────────────┐
│                                      │
│  ╔══════════════╗    ╔══════════════╗│
│  ║  Elephant   ║╲   ║    Lion     ║╲│
│  ║  [Image]    ║ ╲  ║   [Image]   ║ ╲
│  ╚══════════════╝ -6°╚══════════════╝-3°
│                                      │
│         ╔══════════════════╗         │
│         ║  Masai Giraffe  ║         │
│         ║     [Image]      ║  0°     │
│         ║  Giraffa...      ║         │
│         ╚══════════════════╝         │
│        (CENTER - Focal Point)        │
└──────────────────────────────────────┘
Giraffe enters from bottom-center
Elephant shifts further LEFT to -6°
Lion shifts LEFT to -3°
Giraffe stays CENTER at 0° (FOCAL POINT)
Z-index: Elephant=1, Lion=2, Giraffe=3
```

### SCROLL 75-95vh: Card 4 - Zebra Enters Right Side
```
┌──────────────────────────────────────┐
│                                      │
│╔══════════╗ ╔══════════╗ ╔══════════╗
│║ Elephant ║╲║   Lion   ║╲║ Giraffe  ║
│║ [Image]  ║ ║  [Image] ║ ║ [Image]  ║
│╚══════════╝ ╚══════════╝ ╚══════════╝
│    -6°         -3°          0°       │
│                                      │
│                    ╔══════════════╗  │
│                    ║  Zebra      ║╱  │
│                    ║  [Image]    ║╱+3°│
│                    ╚══════════════╝  │
│                    (Right side)      │
└──────────────────────────────────────┘
Zebra enters from bottom-center
Shifts RIGHT to +3° rotation
Giraffe remains CENTER focal point
Z-index: Elephant=1, Lion=2, Giraffe=3, Zebra=4

LEFT SIDE:        CENTER:      RIGHT SIDE:
Elephant (-6°)    Giraffe (0°) Zebra (+3°)
Lion (-3°)
```

### SCROLL 95-115vh: Card 5 - Cheetah Completes Fan
```
┌──────────────────────────────────────┐
│                                      │
│╔════╗  ╔════╗  ╔════╗  ╔════╗ ╔════╗│
│║Elep║╲ ║Lion║╲ ║Gir.║  ║Zebr║╱║Chet║╱
│║hant║ ╲║    ║ ╲║affe║  ║a   ║╱║ah  ║╱
│╚════╝  ╚════╝  ╚════╝  ╚════╝ ╚════╝│
│ -6°     -3°      0°      +3°    +6° │
│                                      │
│    ◄────────  SYMMETRIC FAN  ────────►
│                                      │
│  LEFT        CENTER        RIGHT     │
│  (2 cards)   (1 card)      (2 cards) │
└──────────────────────────────────────┘

FINAL SYMMETRIC FAN ARRANGEMENT:

Position:  LEFT-2    LEFT-1    CENTER   RIGHT-1   RIGHT-2
Card:      Elephant  Lion      Giraffe  Zebra     Cheetah
Rotation:  -6°       -3°       0°       +3°       +6°
Z-index:   1         2         3        4         5
Status:    Behind    Behind    FOCAL    Front     Frontmost

Perfect symmetry from center!
All 5 cards visible
Balanced left-to-right
Cheetah (newest) on top right
```

### SCROLL 115-130vh: Hold & Admire
```
┌──────────────────────────────────────┐
│                                      │
│  🐘      🦁      🦒      🦓     🐆   │
│ -6°     -3°      0°      +3°    +6°  │
│                                      │
│    [Fan arrangement holds steady]    │
│    [User can admire all 5 animals]   │
│                                      │
└──────────────────────────────────────┘
```

### SCROLL 130-160vh: Transition to Accommodations
```
┌──────────────────────────────────────┐
│ [Wildlife cards scale to 80%,        │
│  move up, fade to 40% opacity]       │
│    🐘  🦁  🦒  🦓  🐆  ← fading      │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ Comfortable Safari             │  │
│  │ Accommodations                 │  │
│  │                                │  │
│  │ [Rising from below]            │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
Smooth crossfade transition
Wildlife becomes ambient background
Accommodations takes center stage
```

---

## Detailed Animation Timeline

### Card Movement Choreography

**Card 1 - Elephant (20vh animation):**
```javascript
// PHASE 1: Enter (15-25vh)
From: { y: '100vh', x: '0%', rotation: 0 }
To:   { y: '30vh', x: '0%', rotation: 0 }  // Center

// PHASE 2: Slide left when Lion enters (35-45vh)
To:   { y: '30vh', x: '-15%', rotation: -3 }  // Left position 1

// PHASE 3: Slide further left when Giraffe enters (55-65vh)
To:   { y: '30vh', x: '-25%', rotation: -6 }  // Final left position 2

// FINAL: Stays at -6° left position
```

**Card 2 - Lion (20vh animation):**
```javascript
// PHASE 1: Enter (35-45vh)
From: { y: '100vh', x: '0%', rotation: 0 }
To:   { y: '30vh', x: '0%', rotation: 0 }  // Center

// PHASE 2: Slide left when Giraffe enters (55-65vh)
To:   { y: '30vh', x: '-15%', rotation: -3 }  // Final left position 1

// FINAL: Stays at -3° left position
```

**Card 3 - Giraffe (20vh animation):**
```javascript
// PHASE 1: Enter (55-65vh)
From: { y: '100vh', x: '0%', rotation: 0 }
To:   { y: '30vh', x: '0%', rotation: 0 }  // Center

// FINAL: Stays at 0° CENTER position (FOCAL POINT)
```

**Card 4 - Zebra (20vh animation):**
```javascript
// PHASE 1: Enter (75-85vh)
From: { y: '100vh', x: '0%', rotation: 0 }
To:   { y: '30vh', x: '+15%', rotation: +3 }  // Right position 1

// FINAL: Stays at +3° right position
```

**Card 5 - Cheetah (20vh animation):**
```javascript
// PHASE 1: Enter (95-105vh)
From: { y: '100vh', x: '0%', rotation: 0 }
To:   { y: '30vh', x: '+25%', rotation: +6 }  // Right position 2

// FINAL: Stays at +6° right position (NEWEST, TOP)
```

---

## Technical Implementation Details

### Symmetric Fan Positioning

```javascript
const cardPositions = [
  // Card 1 - Elephant (Leftmost)
  { x: '-25%', y: '30vh', rotation: -6, zIndex: 1 },

  // Card 2 - Lion (Left)
  { x: '-15%', y: '30vh', rotation: -3, zIndex: 2 },

  // Card 3 - Giraffe (CENTER FOCAL POINT)
  { x: '0%', y: '30vh', rotation: 0, zIndex: 3 },

  // Card 4 - Zebra (Right)
  { x: '+15%', y: '30vh', rotation: +3, zIndex: 4 },

  // Card 5 - Cheetah (Rightmost, Newest)
  { x: '+25%', y: '30vh', rotation: +6, zIndex: 5 },
];
```

### GSAP ScrollTrigger Timeline

```javascript
// Pin the entire Wildlife section
ScrollTrigger.create({
  trigger: wildlifeSection,
  start: 'top top',
  end: '+=300vh',
  pin: true,
  scrub: 1,
  anticipatePin: 1,
});

// Intro fade out
gsap.to(intro, {
  opacity: 0,
  y: -50,
  scrollTrigger: {
    trigger: wildlifeSection,
    start: 'top',
    end: 'top+=15vh',
    scrub: 1,
  }
});

// CARD 1 - ELEPHANT
// Phase 1: Enter center
gsap.fromTo(card1,
  { y: '100vh', x: '0%', rotation: 0, opacity: 0 },
  {
    y: '30vh',
    x: '0%',
    rotation: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: wildlifeSection,
      start: 'top+=15vh',
      end: 'top+=35vh',
      scrub: 1,
    }
  }
);

// Phase 2: Slide left when Lion enters
gsap.to(card1, {
  x: '-15%',
  rotation: -3,
  scrollTrigger: {
    trigger: wildlifeSection,
    start: 'top+=35vh',
    end: 'top+=45vh',
    scrub: 1,
  }
});

// Phase 3: Slide further left when Giraffe enters
gsap.to(card1, {
  x: '-25%',
  rotation: -6,
  scrollTrigger: {
    trigger: wildlifeSection,
    start: 'top+=55vh',
    end: 'top+=65vh',
    scrub: 1,
  }
});

// CARD 2 - LION
// Phase 1: Enter center
gsap.fromTo(card2,
  { y: '100vh', x: '0%', rotation: 0, opacity: 0 },
  {
    y: '30vh',
    x: '0%',
    rotation: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: wildlifeSection,
      start: 'top+=35vh',
      end: 'top+=55vh',
      scrub: 1,
    }
  }
);

// Phase 2: Slide left when Giraffe enters
gsap.to(card2, {
  x: '-15%',
  rotation: -3,
  scrollTrigger: {
    trigger: wildlifeSection,
    start: 'top+=55vh',
    end: 'top+=65vh',
    scrub: 1,
  }
});

// CARD 3 - GIRAFFE (CENTER - STAYS PUT)
gsap.fromTo(card3,
  { y: '100vh', x: '0%', rotation: 0, opacity: 0 },
  {
    y: '30vh',
    x: '0%',
    rotation: 0,  // Stays at 0° - FOCAL POINT
    opacity: 1,
    scrollTrigger: {
      trigger: wildlifeSection,
      start: 'top+=55vh',
      end: 'top+=75vh',
      scrub: 1,
    }
  }
);

// CARD 4 - ZEBRA (ENTERS RIGHT)
gsap.fromTo(card4,
  { y: '100vh', x: '0%', rotation: 0, opacity: 0 },
  {
    y: '30vh',
    x: '+15%',
    rotation: +3,  // Right side
    opacity: 1,
    scrollTrigger: {
      trigger: wildlifeSection,
      start: 'top+=75vh',
      end: 'top+=95vh',
      scrub: 1,
    }
  }
);

// CARD 5 - CHEETAH (ENTERS FAR RIGHT)
gsap.fromTo(card5,
  { y: '100vh', x: '0%', rotation: 0, opacity: 0 },
  {
    y: '30vh',
    x: '+25%',
    rotation: +6,  // Far right, newest on top
    opacity: 1,
    scrollTrigger: {
      trigger: wildlifeSection,
      start: 'top+=95vh',
      end: 'top+=115vh',
      scrub: 1,
    }
  }
);

// TRANSITION TO ACCOMMODATIONS
gsap.to(cardsContainer, {
  scale: 0.8,
  y: '-10vh',
  opacity: 0.4,
  scrollTrigger: {
    trigger: wildlifeSection,
    start: 'top+=130vh',
    end: 'top+=160vh',
    scrub: 1,
  }
});
```

---

## Key Refinements from Original Concept

### What Changed:
1. **Symmetric Layout**: Instead of all cards rotating in one direction (0°→12°), cards now fan symmetrically from center
2. **Dynamic Repositioning**: Cards slide left/right as new cards enter (choreographed movement)
3. **Center Focal Point**: Giraffe (middle card) stays at 0° rotation in perfect center
4. **Balanced Fan**: 2 left, 1 center, 2 right creates visual harmony
5. **Progressive Angles**: Still maintains progressive feel but balanced: -6°, -3°, 0°, +3°, +6°

### What Stayed the Same:
1. ✅ All cards enter from bottom-center
2. ✅ 20vh scroll per card
3. ✅ Newest card (Cheetah) on top (z-index 5)
4. ✅ All 5 cards visible in final arrangement
5. ✅ Stack effect with overlapping cards
6. ✅ Smooth fade to Accommodations section

---

## Visual Benefits of Symmetric Fan

1. **Balanced Composition**: Eye naturally drawn to center (Giraffe)
2. **Dynamic Movement**: Cards sliding to make room feels organic
3. **Clear Hierarchy**: Center card is focal point, sides support it
4. **Natural Reading**: Left to right progression with center emphasis
5. **Elegant Symmetry**: Professional, polished look
6. **Better Mobile**: Symmetric layout adapts better to narrow screens

---

## Mobile Adaptations (< 768px)

### Adjustments for Small Screens:
```javascript
const mobilePositions = [
  // Reduce horizontal spread for narrow viewports
  { x: '-35%', rotation: -5, zIndex: 1 },  // Elephant
  { x: '-18%', rotation: -2.5, zIndex: 2 }, // Lion
  { x: '0%', rotation: 0, zIndex: 3 },      // Giraffe (center)
  { x: '+18%', rotation: +2.5, zIndex: 4 }, // Zebra
  { x: '+35%', rotation: +5, zIndex: 5 },   // Cheetah
];

// Smaller rotations to prevent cards going off-screen
// Tighter horizontal spacing
// Same symmetric principle maintained
```

---

## Summary

**Final Approved Design: Symmetric Cascading Fan**

- 5 cards enter from bottom-center, one at a time
- Each new card causes previous cards to slide left (making room)
- Cards 4 & 5 enter on the right side
- Final arrangement: **-6°, -3°, 0°, +3°, +6°** (perfect symmetry)
- **Giraffe at center (0°)** is the focal point
- All cards visible with beautiful fan spread
- Smooth transition to Accommodations section

**Timeline:**
- 0-15vh: Intro fade
- 15-35vh: Elephant enters center
- 35-55vh: Lion enters, Elephant slides left
- 55-75vh: Giraffe enters center, Elephant & Lion slide left
- 75-95vh: Zebra enters right
- 95-115vh: Cheetah enters far right (newest on top)
- 115-130vh: Hold fan arrangement
- 130-160vh: Fade to Accommodations

**Perfect match for your requirements with refined symmetry!**

# Safari Experience Scroll - Complete Technical Documentation

## Overview
The Safari Experience is a continuous scroll journey through 8 chapters on the homepage. This document details every element, animation sequence, scroll distance, and technical configuration based on the actual implementation.

---

## Total Journey Metrics

- **Desktop Total Height**: 640vh
- **Mobile Total Height**: 768vh (20% increase)
- **Total Chapters**: 8
- **Scroll Direction**: Vertical (top to bottom)
- **Pin Method**: GSAP ScrollTrigger (where applicable)
- **Main Container**: `CinematicJourney` component

---

## Important Note on Chapter Heights vs Pinning

**Critical Understanding**: Chapter height allocation (configured in `src/data/chapters.ts`) is DIFFERENT from internal pinning height:

- **Chapter Height**: The viewport space allocated to the chapter in the overall scroll journey
- **Internal Pinning**: The scroll distance used WITHIN a pinned chapter for animations

Example: Morning Drive has 60vh allocated height but uses 1200vh internal pinning for its animations.

---

## Chapter-by-Chapter Breakdown

### **Chapter 1: Pre-Dawn Hero**
**File**: `src/components/chapters/PreDawnHero/PreDawnHero.tsx`

#### Scroll Distance
- **Desktop**: 100vh
- **Mobile**: 120vh (20% increase)
- **Start**: 0vh
- **End**: 100vh (desktop) / 120vh (mobile)

#### Page Elements
1. **Background Image** - Full-screen hero (`/images/hero/heroImage.jpg`)
2. **Logo** - Main logo SVG (`/images/logos/mainLOGOAmboseli.svg`)
3. **Tagline** - "A New Safari Experience Awaits" with typing effect
4. **Subtitle** - "Opening December 2025 | Amboseli, Kenya"
5. **Countdown Timer** - Days, hours, minutes, seconds to December 15, 2025
6. **CTA Buttons**:
   - Primary: "Reserve Your Stay" → `#plan-safari`
   - Secondary: "Explore Rooms" → `/accommodations`
7. **Trust Badge** - "🏔️ Kenya's Newest Safari Lodge • Mount Kilimanjaro Views"
8. **Scroll Indicator** - Animated "Scroll to Begin" with arrow

#### Animation Sequence (Framer Motion - Time-based)
| Time | Element | Animation |
|------|---------|-----------|
| 0.0s | Background Image | Static, immediate display |
| 1.2s | Tagline | Typing effect starts (80ms per character) + fade in (opacity 0→1, 0.6s) |
| 1.4s | Subtitle | Fade in + Y translate (0→10→0, 0.6s) |
| 1.6s | Countdown Timer | Fade in + Y translate (0→20→0, 0.8s) |
| 1.8s | CTA Buttons | Fade in + Y translate (0→20→0, 0.6s) |
| 2.0s | Trust Badge | Fade in (0→1, 0.6s) |
| 2.0s | Scroll Indicator | Fade in (0→1, 1.0s) |

#### Technical Notes
- **Pinning**: None - standard viewport section
- **Typing Effect**: 80ms per character with blinking cursor (`|`)
- **Animation Library**: Framer Motion (`initial`, `animate`, `transition`)
- **Background**: OptimizedImage with `priority` loading
- **No Parallax**: Parallax effect removed for clean image display

---

### **Chapter 2: Morning Drive**
**File**: `src/components/chapters/MorningDriveChapter/MorningDriveChapter.tsx`

#### Scroll Distance
- **Chapter Allocation**: 60vh (desktop) / 72vh (mobile)
- **Internal Pinning**: 1200vh
- **Start**: 100vh
- **End**: 160vh (desktop) / 192vh (mobile)

⚠️ **Important**: The 60vh is the space this chapter occupies in the overall journey, but internally it pins for 1200vh to create extended scroll animations.

#### Page Elements
1. **Heading** - "Morning Safari Drive"
2. **Content Wrapper** - Two-card layout:
   - **Text Card**: Heading, description, trip details (distance, time, duration)
   - **Image Card**: Lion pride image (`/images/wildlife/lionPride.png`, 400x250px)
3. **Full-Screen Safari Image** - `/images/experiences/game-drive/yourMorning.png` (1920x1080px)
4. **Animated Text Overlay**:
   - Line 1: "This could be your morning"
   - Line 2: "Exciting. Beautiful. Breath taking."
5. **Accessibility** - ARIA live region for screen reader announcements

#### Animation Sequence (GSAP ScrollTrigger - Complex Multi-Phase)

**Pinning Configuration**:
```javascript
ScrollTrigger.create({
  trigger: sectionRef.current,
  start: 'top top',
  end: '+=1200vh',
  pin: true,
  pinSpacing: true,
  anticipatePin: 1,
  onUpdate: (self) => { /* manual animations */ }
})
```

##### **PHASE 1: Pin & Read (0-12.5% = 0-150vh)**
- Section pins at viewport top
- All elements static - dwell time for reading
- Heading and content wrapper fully visible (opacity: 1)
- Safari image off-screen (translateX: -100%, scale: 0.7, opacity: 0.3)

##### **PHASE 2: Heading & Content Fade Out (12.5%-16.67% = 150vh-200vh)**
| Progress | Elements | Animation |
|----------|----------|-----------|
| 12.5%-16.67% | Heading | Fade out (opacity 1→0) + Y translate (0→-50px) |
| 12.5%-16.67% | Content Wrapper | Fade out (opacity 1→0) + Y translate (0→-100px) |

##### **PHASE 3A: Safari Image Entry - Synchronized Slide (16.67% = 200vh)**
Tied directly to card fade timing:
- Image slides from left: -90% → -40%
- Scale grows: 0.8 → 0.9
- Opacity increases: 0.3 → 1.0 (visibility threshold at -50%)
- Duration: Synchronized with Phase 2 fade

##### **PHASE 3B: Cinematic Glide (16.67%-84.17% = 200vh-1010vh)**
Long horizontal slide across viewport:
- Image continues sliding: -40% → 0%
- Scale grows: 0.9 → 1.0
- Easing: Ease-in-out (quadratic): `slideProgress < 0.5 ? 2 * p² : 1 - (-2p + 2)² / 2`
- Opacity: 1.0 (locked)

##### **PHASE 4: Pause Before Text (84.17%-85% = 1010vh-1020vh)**
- Image fully visible and centered (translateX: 0%, scale: 1, opacity: 1)
- 10vh pause to appreciate the scene
- No text visible yet

##### **PHASE 5A: First Line Fade In (85%-85.42% = 1020vh-1025vh)**
"This could be your morning" appears:
- Duration: 5vh (0.42% of 1200vh)
- Easing: Cubic ease-out `1 - (1 - progress)³`
- Opacity: 0 → 1

##### **PHASE 5B: "Exciting." Appears (85.83%-86.25% = 1030vh-1035vh)**
- Appears 5vh after first line completes
- Same cubic easing
- Duration: 5vh

##### **PHASE 5C: "Beautiful." Appears (87.5%-87.92% = 1050vh-1055vh)**
- Appears 15vh after "Exciting." for extra breathing room
- Same cubic easing
- Duration: 5vh

##### **PHASE 5D: "Breath taking." Appears (89.17%-89.58% = 1070vh-1075vh)**
- Appears 20vh after "Beautiful." for dramatic pacing
- Same cubic easing
- Duration: 5vh

##### **PHASE 6: Hold for Reading (89.58%-95.83% = 1075vh-1150vh)**
- All text and image remain static
- 75vh of scroll time for content absorption
- Defensive bounds checking maintains final state

##### **PHASE 7: Exit (95.83%-100% = 1150vh-1200vh)**
- Section unpins at 1200vh
- No animations - maintains final state
- 50vh buffer before next chapter

#### Progress Calculation Examples
```javascript
// Example: Safari image slide calculation
const mainSlideStart = 0.1667;  // 200vh / 1200vh
const mainSlideEnd = 0.8417;     // 1010vh / 1200vh

if (progress >= mainSlideStart && progress < mainSlideEnd) {
  const slideProgress = (progress - mainSlideStart) / (mainSlideEnd - mainSlideStart);
  const easedSlide = slideProgress < 0.5
    ? 2 * slideProgress * slideProgress
    : 1 - Math.pow(-2 * slideProgress + 2, 2) / 2;
  const translateX = -40 + (40 * easedSlide);  // -40% → 0%
  const scale = 0.9 + (0.1 * easedSlide);      // 0.9 → 1.0
}
```

#### Screen Reader Announcements
| Progress | Announcement |
|----------|-------------|
| 0-3% | "Morning Safari Drive section is now in focus." |
| 11-17% | "Heading and content are fading away." |
| 12-18% | "Full safari scene is slowly appearing with Mount Kilimanjaro and elephants." |
| 84.17-85% | "Image is now fully visible. Waiting before text appears." |
| 85-86% | "First message appearing: This could be your morning." |
| 85.83-86.25% | "Word appearing: Exciting." |
| 86.67-87.08% | "Word appearing: Beautiful." |
| 89.17-89.6% | "Word appearing: Breath taking." |

#### Technical Notes
- **Pinning**: GSAP ScrollTrigger with manual `onUpdate` callback
- **Progress Control**: All animations keyed to normalized progress (0-1)
- **Defensive Programming**: Extensive bounds checking with `Math.max/min`
- **Reduced Motion**: Detects `prefers-reduced-motion: reduce` and shows final state
- **Responsive**: Viewport width tracking with debounced resize handler (150ms)
- **Initial States**: All animated elements set via `gsap.set()` before ScrollTrigger
- **Cleanup**: GSAP context cleanup on unmount

---

### **Chapter 3: Wildlife Encounters**
**File**: `src/components/chapters/WildlifeEncountersChapter/WildlifeEncountersChapter.tsx`

#### Scroll Distance
- **Chapter Allocation**: 80vh (desktop) / 96vh (mobile)
- **Internal Pinning**: 2.5 viewport heights (250vh)
- **Start**: 160vh
- **End**: 240vh (desktop) / 288vh (mobile)

#### Page Elements
1. **Intro Section**:
   - Heading: "Wildlife Encounters"
   - Subtitle: "Meet the Majestic Five of Amboseli"
2. **Staggered Fan Display** - 5 animal cards with layered depth:
   - Card 1: African Elephant (z-index: 1, BACKMOST)
   - Card 2: African Lion (z-index: 2)
   - Card 3: Masai Giraffe (z-index: 3, CENTER)
   - Card 4: Plains Zebra (z-index: 4)
   - Card 5: African Cheetah (z-index: 5, FRONTMOST)
3. **Animal Cards** (each contains):
   - Large image (fill container)
   - Conservation status badge
   - Animal name + scientific name
   - Description
   - "Did you know?" fun fact
   - Best time to see
   - "Learn to Encounter" CTA link → `/wildlife/{id}`
4. **Progress Indicator** - 5 dots showing scroll position
5. **Scroll Hint** - "Scroll to explore" with right arrow (pulsing animation)

#### Z-Index Layering System
Cards are layered from back to front to create visual depth:

| Card | Animal | Z-Index | Final Position | Visual Layer |
|------|--------|---------|----------------|--------------|
| 1 | Elephant | 1 | Left (-30%, -6°) | BACKMOST (partially covered by all others) |
| 2 | Lion | 2 | Left (-15%, -3°) | Behind center (covers Elephant) |
| 3 | Giraffe | 3 | Center (0%, 0°) | CENTER (covers Elephant & Lion) |
| 4 | Zebra | 4 | Right (+15%, +3°) | Front of center (covers Giraffe partially) |
| 5 | Cheetah | 5 | Right (+30%, +6°) | FRONTMOST (covers all others) |

**Visual Depth** (Side View):
```
                        ┌─────┐ ← Cheetah (z:5, FRONTMOST)
                    ┌───┤     │
                ┌───┤   └─────┘ ← Zebra (z:4)
            ┌───┤   └─────┘
        ┌───┤   └─────┘ ← Giraffe (z:3, center)
    ┌───┤   └─────┘
┌───┤   └─────┘ ← Lion (z:2)
│   └─────┘
└─────┘ ← Elephant (z:1, BACKMOST)
```

#### Animation Sequence - Staggered Fan Reveal

**Pinning Configuration**:
```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: section,
    start: 'top top',
    end: () => `+=${window.innerHeight * 2.5}`,  // 2.5vh
    pin: true,
    scrub: 1,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  },
});
```

##### **PHASE 1: Intro Fade In (0-10% = 0-25vh)**
- Intro section fades in (opacity 0→1)
- Duration: 0.1 timeline units

##### **PHASE 2: Hold Intro (10-25% = 25vh-62.5vh)**
- Intro remains fully visible
- User reads heading and subtitle
- Duration: 0.15 timeline units

##### **PHASE 3: Transition (25-35% = 62.5vh-87.5vh)**
- Intro fades out + moves up (Y: 0 → -50px)
- Fan container fades in (opacity 0→1)
- Simultaneous transition
- Duration: 0.1 timeline units each

##### **PHASE 4: Staggered Fan Animation (35-100% = 87.5vh-250vh)**

**All Cards Initial State**:
- Opacity: 0
- Y position: 100px (below viewport)
- Rotation: 0°
- X position: 0
- Scale: 0.95

**Step-by-Step Card Reveal**:

| Step | Timeline | Cards Affected | Animation Details |
|------|----------|----------------|-------------------|
| **1** | T+0.00 | **Card 1 (Elephant)** | **Appears at center**<br>• opacity: 0→1<br>• y: 100px→0<br>• rotation: 0°<br>• x: 0<br>• scale: 0.95→1<br>• z-index: 1 (back layer) |
| **2** | T+0.08 | Hold | 0.03 duration pause |
| **3** | T+0.13 | **Card 2 (Lion)** enters<br>**Card 1 (Elephant)** adjusts | **Lion appears at center:**<br>• opacity: 0→1, y: 100px→0, rotation: 0°, x: 0, scale: 1<br>• z-index: 2 (ON TOP of Elephant)<br><br>**Elephant slides left:**<br>• rotation: 0°→-3°<br>• x: 0→-15% |
| **4** | T+0.21 | Hold | 0.03 duration pause |
| **5** | T+0.26 | **Card 3 (Giraffe)** enters<br>**Cards 1-2** adjust | **Giraffe appears at center:**<br>• opacity: 0→1, y: 100px→0, rotation: 0°, x: 0, scale: 1<br>• z-index: 3 (ON TOP of Lion)<br><br>**Elephant slides further left:**<br>• rotation: -3°→-6°<br>• x: -15%→-30%<br><br>**Lion slides left:**<br>• rotation: 0°→-3°<br>• x: 0→-15% |
| **6** | T+0.34 | Hold | 0.03 duration pause |
| **7** | T+0.39 | **Card 4 (Zebra)** enters<br>**Cards 1-3** hold | **Zebra appears right of center:**<br>• opacity: 0→1, y: 100px→0<br>• rotation: 0°→+3°<br>• x: 0→+15%<br>• scale: 0.95→1<br>• z-index: 4 (ON TOP of Giraffe)<br><br>**Previous cards maintain positions** |
| **8** | T+0.47 | Hold | 0.03 duration pause |
| **9** | T+0.52 | **Card 5 (Cheetah)** enters<br>**Cards 1-4** hold | **Cheetah completes fan at far right:**<br>• opacity: 0→1, y: 100px→0<br>• rotation: 0°→+6°<br>• x: 0→+30%<br>• scale: 0.95→1<br>• z-index: 5 (FRONTMOST, covers all)<br><br>**Previous cards maintain positions** |
| **10** | T+0.60 | Final Hold | All cards remain in fan formation for 0.22 duration |

**Final Fan Formation**:
```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  ╔═══╗      ╔═══╗      ╔═══╗      ╔═══╗      ╔═══╗          │
│  ║Ele║╲     ║Lio║╲     ║Gir║      ║Zeb║╱     ║Che║╱         │
│  ╚═══╝      ╚═══╝      ╚═══╝      ╚═══╝      ╚═══╝          │
│  z:1        z:2        z:3        z:4        z:5             │
│  -30%       -15%       0%         +15%       +30%            │
│  -6°        -3°        0°         +3°        +6°             │
│                                                                │
│  BACK ←──────────────────────────────────→ FRONT             │
│  (underneath all)           (on top of all)                   │
└────────────────────────────────────────────────────────────────┘
```

#### Movement Choreography Details

**Key Animation Principles**:
1. **Each card enters from bottom-center**: All cards start at `y: 100px, x: 0, rotation: 0°`
2. **New card appears at center initially**: Card fades in at center position
3. **Previous cards adjust to make room**: As each new card appears, previous cards slide and tilt
4. **Higher z-index = on top**: Each new card has higher z-index, covering previous cards
5. **Left cards tilt left, right cards tilt right**: Creates fan spread effect

**Transform Origin**: Center of each card for rotation

**Timing**:
- Each card appearance: 0.08 duration with `power2.out` easing
- Holds between reveals: 0.03 duration
- Final appreciation hold: 0.22 duration

**Visual Result**:
- Cheetah (front) overlaps and covers portions of Zebra
- Zebra overlaps Giraffe
- Giraffe (center) overlaps Lion
- Lion overlaps Elephant
- Elephant (back) is partially hidden by all others

#### Data Source
`src/data/wildlife.ts` - WILDLIFE_ANIMALS array (5 animals exactly)

#### Conservation Status Badges
- **Endangered**: African Elephant, Masai Giraffe
- **Vulnerable**: African Lion
- **Near Threatened**: Plains Zebra
- **Least Concern**: African Cheetah

#### Technical Notes
- **Pinning**: GSAP ScrollTrigger with `scrub: 1`
- **Animation Type**: Staggered sequential reveals with synchronized multi-card adjustments
- **Timeline**: Sequential phases with position labels (`'<'` for simultaneous)
- **Responsive**: `invalidateOnRefresh: true` recalculates on resize
- **Layout**: Fan container uses absolute positioning for card overlap
- **Visual Depth**: Z-index creates realistic card stack effect (Cheetah overlaps all others)
- **Transform Origin**: Center point for smooth rotation
- **Cleanup**: Kills only ScrollTriggers matching section ref on unmount
- **Pulsing Scroll Hint**: Framer Motion infinite opacity animation (1→0.5→1, 2s duration)

---

### **Chapter 4: Accommodations**
**File**: `src/components/chapters/AccommodationsChapter/AccommodationsChapter.tsx`
**Hook**: `src/hooks/useAccommodationsPinning.ts`

#### Scroll Distance
- **Chapter Allocation**: 80vh (desktop) / 96vh (mobile)
- **Internal Pinning**: 300vh (desktop only)
- **Start**: 240vh
- **End**: 320vh (desktop) / 384vh (mobile)

#### Page Elements
1. **Heading Container** (Fixed during pin):
   - "Comfortable Safari Accommodations"
   - Subtitle: "Modern rooms designed for families and groups"
2. **3 Room Presentations** (Image + Card pairs):
   - **Room 1**: Image left, card right - Safari View Room
   - **Room 2**: Card left, image right - Deluxe Safari Room
   - **Room 3**: Image left, card right - Family Apartment
3. **Room Cards** contain:
   - Room name (h3)
   - Tagline
   - Price (per night)
   - Feature list with checkmarks (✓)
4. **CTA Container**:
   - Button: "View All Rooms" → `/accommodations`
5. **Background**: Midday lighting gradient overlay

#### Animation Sequence (GSAP - 3 Phases)

**Pinning Configuration** (Desktop only, disabled on mobile):
```javascript
ScrollTrigger.create({
  trigger: sectionRef.current,
  start: 'top top',
  end: '+=300vh',
  pin: true,
  scrub: 1,
  anticipatePin: 1,
});
```

##### **PHASE 1: Room 1 Entrance (0-33% = 0-100vh)**

Both image and card slide up from bottom simultaneously:

```javascript
const room1Timeline = gsap.timeline({
  scrollTrigger: { start: 'top top', end: '+=100vh' }
});

room1Timeline
  .fromTo('.room-1-image', { y: '100%' }, { y: '0%', ease: 'power2.out' })
  .fromTo('.room-1-card', { y: '100%' }, { y: '0%', ease: 'power2.out' }, '<')
  .fromTo('.room-1-card .features li',
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, stagger: 0.1, ease: 'power2.out' },
    '-=0.3'
  );
```

| Element | Initial State | Final State | Timing |
|---------|--------------|-------------|--------|
| Room 1 Image | translateY: 100% | translateY: 0% | Simultaneous |
| Room 1 Card | translateY: 100% | translateY: 0% | Simultaneous |
| Feature items | opacity: 0, x: -20 | opacity: 1, x: 0 | Staggered 0.1s, starts 0.3s before previous ends |

##### **PHASE 2: Room 1 → Room 2 Transition (33-66% = 100vh-200vh)**

Layout flips: [Image Left, Card Right] → [Card Left, Image Right]

```javascript
const room2Timeline = gsap.timeline({
  scrollTrigger: { start: 'top+=100vh top', end: '+=100vh' }
});

room2Timeline
  .to('.room-1-image', { y: '100%', ease: 'power2.in' })
  .to('.room-1-card', { y: '100%', ease: 'power2.in' }, '<')
  .to('.room-2-card', { x: '0', ease: 'power2.out' }, '<0.4')
  .to('.room-2-card .card-content', { opacity: 1, scale: 1, duration: 0.3 }, '<0.2')
  .fromTo('.room-2-image',
    { y: '100%', x: '50vw' },
    { y: '0%', x: '0', ease: 'power2.out' },
    '<-0.1'
  )
  .to('.room-2-card .features li',
    { opacity: 1, x: 0, stagger: 0.1, ease: 'power2.out' },
    '-=0.4'
  );
```

| Step | Timeline Position | Element | Animation |
|------|------------------|---------|-----------|
| 1 | 0 | Room 1 Image | Exit down (y: 0% → 100%) |
| 2 | 0 (simultaneous) | Room 1 Card | Exit down (y: 0% → 100%) |
| 3 | 0.4 (40% into exit) | Room 2 Card | Slide in from off-screen right (x: 50vw → 0) |
| 4 | 0.6 (after card moves) | Room 2 Card Content | Fade in (opacity: 0→1, scale: 0.95→1) |
| 5 | 0.5 | Room 2 Image | Enter from bottom-right (y: 100%, x: 50vw → y: 0%, x: 0) |
| 6 | 0.6 (staggered) | Room 2 Features | Fade in (opacity: 0→1, x: -20→0) |

**Note**: Room 2 card starts positioned at `translateX(50vw)` via CSS, so animation brings it to center.

##### **PHASE 3: Room 2 → Room 3 Transition (66-100% = 200vh-300vh)**

Layout flips back: [Card Left, Image Right] → [Image Left, Card Right]

```javascript
const room3Timeline = gsap.timeline({
  scrollTrigger: { start: 'top+=200vh top', end: '+=100vh' }
});

room3Timeline
  .to('.room-2-card', { y: '100%', ease: 'power2.in' })
  .to('.room-2-image', { y: '100%', ease: 'power2.in' }, '<')
  .to('.room-3-image', { x: '0', ease: 'power2.out' }, '<0.4')
  .to('.room-3-image .image-content', { opacity: 1, scale: 1, duration: 0.3 }, '<0.2')
  .fromTo('.room-3-card',
    { y: '100%', x: '50vw' },
    { y: '0%', x: '0', ease: 'power2.out' },
    '<-0.1'
  )
  .to('.room-3-card .features li',
    { opacity: 1, x: 0, stagger: 0.1, ease: 'power2.out' },
    '-=0.4'
  );
```

| Step | Timeline Position | Element | Animation |
|------|------------------|---------|-----------|
| 1 | 0 | Room 2 Card | Exit down (y: 0% → 100%) |
| 2 | 0 (simultaneous) | Room 2 Image | Exit down (y: 0% → 100%) |
| 3 | 0.4 (40% into exit) | Room 3 Image | Slide in from off-screen right (x: 50vw → 0) |
| 4 | 0.6 (after image moves) | Room 3 Image Content | Fade in (opacity: 0→1, scale: 0.95→1) |
| 5 | 0.5 | Room 3 Card | Enter from bottom-right (y: 100%, x: 50vw → y: 0%, x: 0) |
| 6 | 0.6 (staggered) | Room 3 Features | Fade in (opacity: 0→1, x: -20→0) |

#### Initial CSS Positioning
Elements that slide from off-screen start with CSS transforms:
- `.room-2-card`: `translateX(50vw)` (off-screen right)
- `.room-3-image`: `translateX(50vw)` (off-screen right)
- `.room-2-card .card-content`: `opacity: 0, scale: 0.95` (hidden)
- `.room-3-image .image-content`: `opacity: 0, scale: 0.95` (hidden)

#### Mobile Behavior
On mobile (`< 768px`), pinning is disabled. Instead, simple stagger animations:
```javascript
gsap.utils.toArray('.room-card').forEach((card) => {
  gsap.fromTo(card,
    { opacity: 0, y: 100 },
    {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
      },
    }
  );
});
```

#### Technical Notes
- **Custom Hook**: `useAccommodationsPinning()` handles all GSAP logic
- **Parallax**: Images use `ParallaxLayer` with `speed={0.5}`
- **Reduced Motion**: Detects preference and disables all animations
- **GPU Acceleration**: `force3D: true` on all transforms
- **Cleanup**: GSAP context cleanup + event listener removal on unmount
- **Resize Handler**: Calls `ScrollTrigger.refresh()` on window resize
- **Accessibility**: Skip link, ARIA labels, keyboard navigation

---

### **Chapter 5: Dining**
**File**: `src/components/chapters/DiningChapter/DiningChapter.tsx`

#### Scroll Distance
- **Desktop**: 80vh
- **Mobile**: 96vh
- **Start**: 320vh
- **End**: 400vh (desktop) / 480vh (mobile)

#### Page Elements
1. **Background Image**: Sundowner deck at golden hour (parallax at 0.4 speed)
2. **Header Section**:
   - Heading: "Group-Friendly Dining"
   - Subtitle: "Delicious meals for families and groups of all sizes"
3. **Dish Carousel** (Manual control):
   - 3 dishes with prev/next buttons
   - Current: Grilled Serengeti Beef / Lake Victoria Tilapia / Kenyan Buffet Spread
   - Carousel indicators (dots)
4. **Wine Pairings Grid** - 3 pairing cards:
   - Sauvignon Blanc with Lake Victoria Tilapia
   - Cabernet Sauvignon with Grilled Serengeti Beef
   - Rosé with Savanna Sunset Platter
5. **Group Info Section** - 6 feature cards:
   - 👥 Accommodates tour groups up to 40 people
   - 🍽️ Buffet and family-style dining options
   - 👶 Kids menu and dietary accommodations
   - 🥪 Packed lunches available for safari days
   - 🎉 Private dining available for special events
   - ⏰ Flexible meal times to fit your family schedule
6. **Time Slots Preview**:
   - Available times: 7:00 AM, 12:30 PM, 7:30 PM
7. **CTA Button**: "See Full Menu" → `/dining`

#### Animation Sequence (Framer Motion whileInView)

All animations use viewport trigger `amount: 0.3` (30% in view):

| Element | Initial State | Animated State | Delay | Viewport |
|---------|--------------|----------------|-------|----------|
| Header | opacity: 0, y: 30 | opacity: 1, y: 0 | 0s | 30% |
| Carousel | opacity: 0, scale: 0.95 | opacity: 1, scale: 1 | 0.2s | 30% |
| Wine Pairings Heading | opacity: 0, y: 20 | opacity: 1, y: 0 | 0.3s | 30% |
| Pairing Card 1 | opacity: 0, y: 30 | opacity: 1, y: 0 | 0.4s | 30% |
| Pairing Card 2 | opacity: 0, y: 30 | opacity: 1, y: 0 | 0.55s | 30% |
| Pairing Card 3 | opacity: 0, y: 30 | opacity: 1, y: 0 | 0.7s | 30% |
| Group Heading | opacity: 0, y: 20 | opacity: 1, y: 0 | 0s | 30% |
| Group Feature 1 | opacity: 0, x: -20 | opacity: 1, x: 0 | 0.2s | 30% |
| Group Feature 2 | opacity: 0, x: -20 | opacity: 1, x: 0 | 0.3s | 30% |
| Group Feature 3 | opacity: 0, x: -20 | opacity: 1, x: 0 | 0.4s | 30% |
| Group Feature 4 | opacity: 0, x: -20 | opacity: 1, x: 0 | 0.5s | 30% |
| Group Feature 5 | opacity: 0, x: -20 | opacity: 1, x: 0 | 0.6s | 30% |
| Group Feature 6 | opacity: 0, x: -20 | opacity: 1, x: 0 | 0.7s | 30% |
| CTA Section | opacity: 0, y: 50 | opacity: 1, y: 0 | 0.6s | 30% |

#### Carousel State Management
```javascript
const [currentDishIndex, setCurrentDishIndex] = useState(0);

const handlePrevDish = () => {
  setCurrentDishIndex((prev) => (prev === 0 ? dishes.length - 1 : prev - 1));
};

const handleNextDish = () => {
  setCurrentDishIndex((prev) => (prev === dishes.length - 1 ? 0 : prev + 1));
};
```

#### Technical Notes
- **No Pinning** - Standard scroll section
- **Parallax**:
  - Background: `ParallaxLayer speed={0.4}` (slower than scroll)
  - Foreground: `ParallaxLayer speed={1.0}` (normal scroll)
- **Carousel**: Manual control (not auto-rotating)
- **State**: React `useState` for `currentDishIndex`
- **Viewport Threshold**: `once: true` (animations only trigger once)
- **Atmosphere**: Afternoon golden light gradient overlay

---

### **Chapter 6: Experiences**
**File**: `src/components/chapters/ExperiencesChapter/ExperiencesChapter.tsx`

#### Scroll Distance
- **Desktop**: 80vh
- **Mobile**: 96vh
- **Start**: 400vh
- **End**: 480vh (desktop) / 576vh (mobile)

#### Page Elements
1. **Background Image**: Game drive at golden hour (parallax at 0.4 speed)
2. **Header Section**:
   - Heading: "Safari Experiences"
   - Subtitle: "Every moment is an adventure"
3. **Experience Cards Grid** (2x2 on desktop, single column on mobile):
   - Game Drive Safari (3-4 hours, Easy, Morning)
   - Guided Walking Safari (2-3 hours, Moderate, Morning)
   - Bird Watching Expedition (2 hours, Easy, Morning)
   - Sundowner Experience (2 hours, Easy, Evening)
4. **Activity Timeline** - Three time periods:
   - **Morning**: Game Drive, Walking Safari, Bird Watching
   - **Afternoon**: Bush Lunch, Photography Workshop, Cultural Visit
   - **Evening**: Sundowner, Night Drive, Stargazing
5. **CTA Button**: "Plan Your Safari" → `/experiences`

#### Animation Sequence (Framer Motion whileInView)

All animations use viewport trigger `amount: 0.3` (30% in view) except cards (20%):

| Element | Initial State | Animated State | Delay | Viewport |
|---------|--------------|----------------|-------|----------|
| Header | opacity: 0, y: 30 | opacity: 1, y: 0 | 0s | 30% |
| Experience Card 1 | opacity: 0, y: 40 | opacity: 1, y: 0 | 0s | 20% |
| Experience Card 2 | opacity: 0, y: 40 | opacity: 1, y: 0 | 0.15s | 20% |
| Experience Card 3 | opacity: 0, y: 40 | opacity: 1, y: 0 | 0.3s | 20% |
| Experience Card 4 | opacity: 0, y: 40 | opacity: 1, y: 0 | 0.45s | 20% |
| Timeline Section | opacity: 0, y: 40 | opacity: 1, y: 0 | 0.4s | 30% |
| CTA Section | opacity: 0, y: 50 | opacity: 1, y: 0 | 0.6s | 30% |

**Staggered Cards**: 150ms delay between each card (index × 0.15)

#### Technical Notes
- **No Pinning** - Standard scroll section
- **Parallax**:
  - Background: `ParallaxLayer speed={0.4}`
  - Foreground: `ParallaxLayer speed={1.0}`
- **Grid Layout**: 2x2 on desktop, single column on mobile
- **Components**:
  - `ExperienceCard` molecule for each experience
  - `ActivityTimeline` molecule for timeline section
- **Viewport Threshold**: `once: true`, `amount: 0.2` for cards, `0.3` for sections
- **Atmosphere**: Golden hour lighting gradient overlay

---

### **Chapter 7: Location**
**File**: `src/components/chapters/LocationChapter/LocationChapter.tsx`

#### Scroll Distance
- **Desktop**: 80vh
- **Mobile**: 96vh
- **Start**: 480vh
- **End**: 560vh (desktop) / 672vh (mobile)

#### Page Elements
1. **Background Image**: Twilight sky over Amboseli (parallax at 0.3 speed)
2. **Header**:
   - Title: "Getting to Your Safari Adventure"
   - Subtitle: "Choose your route below and start planning your journey"
3. **Route Selector** - 4 routes with icons, duration, distance:
   - Routes from `JOURNEY_ROUTES` data
   - Interactive selection changes map and timeline
4. **Travel Info Cards** - 3 quick-reference cards:
   - From Nairobi (🏙️ 365 km, 3-4 hours)
   - Kimana Gate (🚪 2 km, main park entrance)
   - Mount Kilimanjaro (🏔️ 45 km, unobstructed views)
5. **Map + Timeline Section** (2-column layout):
   - **Map Column**: Interactive Mapbox map with waypoints
   - **Timeline Column**: Journey timeline with steps
6. **Transport Comparison Table**: Compare transportation options
7. **Photo Gallery**: 3-column grid of journey photos
8. **Info Cards Grid**: Essential travel information
9. **Booking CTA**: Two buttons:
   - Primary: "Arrange Private Transfer" → `/contact?subject=Transfer%20Booking`
   - Secondary: "Ask Questions" → `/contact`

#### Animation Sequence (Intersection Observer + Motion)

Uses `useInView` hook with `threshold: 0.2` (20% visible):

| Element | Initial State | Animated State | Delay | Duration |
|---------|--------------|----------------|-------|----------|
| Section Title | opacity: 0, y: 30 | opacity: 1, y: 0 | 0.2s | 0.8s |
| Section Subtitle | opacity: 0, y: 20 | opacity: 1, y: 0 | 0.4s | 0.8s |
| Route Selector | opacity: 0, y: 20 | opacity: 1, y: 0 | 0.6s | 0.6s |
| Travel Info Section | opacity: 0, y: 20 | opacity: 1, y: 0 | 0.7s | 0.6s |
| Map Column | opacity: 0, x: -30 | opacity: 1, x: 0 | 0.8s | 0.8s |
| Timeline Column | opacity: 0, x: 30 | opacity: 1, x: 0 | 1.0s | 0.8s |
| Comparison Section | opacity: 0, y: 30 | opacity: 1, y: 0 | 1.2s | 0.8s |
| Gallery Section | opacity: 0, y: 30 | opacity: 1, y: 0 | 1.4s | 0.8s |
| Info Section | opacity: 0, y: 30 | opacity: 1, y: 0 | 1.6s | 0.8s |
| CTA Section | opacity: 0, scale: 0.95 | opacity: 1, scale: 1 | 1.8s | 0.8s |

#### State Management
```javascript
const [selectedRouteId, setSelectedRouteId] = useState(JOURNEY_ROUTES[0].id);

const selectedRoute = JOURNEY_ROUTES.find(r => r.id === selectedRouteId);
const currentTimeline = JOURNEY_TIMELINE_STEPS[selectedRouteId];
```

Route selection updates:
- Map waypoints
- Journey timeline steps

#### Data Sources
All from `src/data/locationData.ts`:
- `JOURNEY_ROUTES` - 4 route options
- `JOURNEY_TIMELINE_STEPS` - Step-by-step journey data
- `TRANSFER_OPTIONS` - Transport comparison data
- `JOURNEY_GALLERY` - Photo gallery images
- `INFO_CARDS` - Essential info cards
- `PROXIMITY_LANDMARKS` - Map landmarks

#### Technical Notes
- **No Pinning** - Standard scroll section
- **Parallax**: Background at `speed={0.3}` (ParallaxImage component)
- **Interactivity**: Route selector changes map waypoints and timeline
- **Intersection Observer**: Threshold 0.2 (20% visible triggers), `triggerOnce: false`
- **Map**: Mapbox GL integration via InteractiveMap component
- **Atmosphere**: Twilight atmospheric overlay

---

### **Chapter 8: Plan Safari (Contact)**
**File**: `src/components/chapters/PlanSafariChapter/PlanSafariChapter.tsx`

#### Scroll Distance
- **Desktop**: 80vh
- **Mobile**: 96vh
- **Start**: 560vh
- **End**: 640vh (desktop) / 768vh (mobile)

#### Page Elements
1. **Background Image**: Starry night over savannah (parallax at 0.3 speed)
2. **Star Particles**: Atmospheric particles (density: 40, speed: 1) - only render when in view
3. **Journey Complete Badge**:
   - Icon: ✨
   - Text: "Journey Complete"
   - Subtext: "You've experienced a full day at Amboseli Safari Club"
4. **Header**:
   - Title: "Plan Your Safari Adventure"
   - Subtitle: "Choose your perfect safari package..."
5. **Safari Packages Section** - 3 package cards:
   - Each contains: name, duration, price range, popular badge (optional)
   - Highlights list with checkmarks
   - "What's Included" list
   - "Best For" tags
   - "Select Package" button
6. **Contact Form Section** - Multi-field form:
   - Full Name (required)
   - Email Address (required)
   - Phone Number
   - Number of Guests (dropdown, required): 1-5, 6+
   - Preferred Dates (date picker)
   - Interested Package (dropdown)
   - Message (textarea)
   - Submit button with loading states
   - Success message (3s display)
7. **Contact Methods Section** - Quick contact buttons:
   - Phone, Email, WhatsApp, etc.
   - Each shows icon, type, value, label
8. **Footer CTA**:
   - Title: "Ready for Your Safari Adventure?"
   - Description
   - Two buttons:
     - Primary: "Book Now"
     - Secondary: "Download Brochure"

#### Animation Sequence (Intersection Observer + Motion)

Uses `useInView` hook with `threshold: 0.3` (30% visible):

| Element | Initial State | Animated State | Delay | Duration |
|---------|--------------|----------------|-------|----------|
| Journey Complete Badge | opacity: 0, scale: 0.9 | opacity: 1, scale: 1 | 0.2s | 1.0s |
| Section Title | opacity: 0, y: 30 | opacity: 1, y: 0 | 0.4s | 0.8s |
| Section Subtitle | opacity: 0, y: 20 | opacity: 1, y: 0 | 0.6s | 0.8s |
| Package Card 1 | opacity: 0, y: 30 | opacity: 1, y: 0 | 0.2s | 0.6s |
| Package Card 2 | opacity: 0, y: 30 | opacity: 1, y: 0 | 0.3s | 0.6s |
| Package Card 3 | opacity: 0, y: 30 | opacity: 1, y: 0 | 0.4s | 0.6s |
| Contact Form | opacity: 0, y: 20 | opacity: 1, y: 0 | 0.4s | 0.8s |
| Contact Method 1-N | opacity: 0, scale: 0.9 | opacity: 1, scale: 1 | 0.6s + (i × 0.1s) | 0.6s |
| Footer CTA | opacity: 0, y: 20 | opacity: 1, y: 0 | 1.0s | 0.8s |

**Contact Methods**: Staggered by index × 0.1s starting at 0.6s

#### Form State Management
```javascript
const [formData, setFormData] = useState({
  name: '', email: '', phone: '', guests: '2',
  dates: '', package: '', message: '',
});
const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus('loading');
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API
  setStatus('success');
  setTimeout(() => setStatus('idle'), 3000); // Reset after 3s
};
```

**States**:
- `idle`: Normal state
- `loading`: Submitting (button shows "Sending...", disabled)
- `success`: Submitted (button shows "✓ Sent!", success message appears)
- `error`: Failed (not currently implemented)

#### Data Sources
From `src/data/safariPackages.ts`:
- `SAFARI_PACKAGES` - 3 package options
- `CONTACT_METHODS` - Contact method buttons

#### Technical Notes
- **No Pinning** - Standard scroll section
- **Parallax**: Background at `speed={0.3}` (ParallaxImage component)
- **Conditional Rendering**: Star particles only render when `inView` (performance)
- **Intersection Observer**: Threshold 0.3 (30% visible), `triggerOnce: false`
- **Form Validation**: Required fields marked with *
- **Accessibility**: Form labels, ARIA attributes, keyboard accessible
- **Atmosphere**: Night atmospheric overlay with star particles

---

## Global Configuration

### Height Calculation System

**File**: `src/data/chapters.ts`

```typescript
// Base heights (desktop) - vh units
const BASE_HEIGHTS = {
  preDawn: 100,
  morningDrive: 60,           // NOTE: 60vh allocated, 1200vh internal pin
  wildlifeEncounters: 80,     // NOTE: 80vh allocated, 250vh internal pin
  accommodations: 80,         // NOTE: 80vh allocated, 300vh internal pin
  dining: 80,
  experiences: 80,
  location: 80,
  contact: 80,
};

// Mobile multiplier
const MOBILE_MULTIPLIER = 1.2; // 20% increase

// Calculation function
const getChapterHeight = (baseHeight: number): number => {
  const isMobile = window.innerWidth < 768;
  return isMobile ? Math.round(baseHeight * 1.2) : baseHeight;
};
```

### Position Calculation

Sequential positioning:

```typescript
const calculateChapterPositions = () => {
  let currentPosition = 0;

  const positions = {
    preDawn: {
      start: currentPosition,
      end: currentPosition + heights.preDawn
    },
    morningDrive: {
      start: currentPosition += heights.preDawn,
      end: currentPosition + heights.morningDrive
    },
    // ... continues for all chapters
  };

  return { heights, positions };
};
```

### Total Heights Summary

| Desktop | Mobile | Chapter | Allocated Height | Internal Pin |
|---------|--------|---------|-----------------|-------------|
| 0-100vh | 0-120vh | Pre-Dawn | 100vh / 120vh | None |
| 100-160vh | 120-192vh | Morning Drive | 60vh / 72vh | **1200vh** |
| 160-240vh | 192-288vh | Wildlife | 80vh / 96vh | **250vh** |
| 240-320vh | 288-384vh | Accommodations | 80vh / 96vh | **300vh** (desktop only) |
| 320-400vh | 384-480vh | Dining | 80vh / 96vh | None |
| 400-480vh | 480-576vh | Experiences | 80vh / 96vh | None |
| 480-560vh | 576-672vh | Location | 80vh / 96vh | None |
| 560-640vh | 672-768vh | Contact | 80vh / 96vh | None |
| **640vh** | **768vh** | **TOTAL** | | |

---

## Animation Patterns Summary

### 1. **GSAP ScrollTrigger with Pinning**
**Chapters**: Morning Drive, Wildlife Encounters, Accommodations

**When to use**: Complex multi-phase animations requiring precise scroll control

**Configuration**:
```javascript
ScrollTrigger.create({
  trigger: element,
  start: 'top top',
  end: '+=XYZvh',           // Pin duration
  pin: true,
  pinSpacing: true,
  anticipatePin: 1,
  scrub: 1,                 // Smooth scrubbing
  invalidateOnRefresh: true, // Recalculate on resize
});
```

**Characteristics**:
- Requires explicit `pinSpacing` and `anticipatePin`
- Best for scenes with multiple sequential phases
- Can use `onUpdate` callback for manual progress control
- Morning Drive uses manual control, Wildlife uses timeline

### 2. **Framer Motion whileInView**
**Chapters**: Pre-Dawn, Dining, Experiences

**When to use**: Simple fade-ins and sequential reveals, no pinning needed

**Configuration**:
```javascript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
```

**Characteristics**:
- Trigger animations when element enters viewport
- `viewport.amount`: Percentage visible (0.2 = 20%, 0.3 = 30%)
- `viewport.once`: Animation only triggers once
- No manual scroll calculations needed
- Ideal for staggered entry animations

### 3. **Intersection Observer + Motion**
**Chapters**: Location, Contact

**When to use**: Complex sections with many elements, need custom in-view detection

**Configuration**:
```javascript
const { ref, inView } = useInView({
  threshold: 0.2,
  triggerOnce: false,
});

<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
  transition={{ duration: 0.8, delay: 0.4 }}
>
```

**Characteristics**:
- Custom hook for viewport detection
- Full control over animation state via `inView` boolean
- Can trigger/untrigger based on scroll direction
- Allows conditional rendering (e.g., star particles only when visible)
- Best for sections with many coordinated animations

### 4. **Static with Immediate Animations**
**Chapters**: Pre-Dawn

**When to use**: Hero sections without scroll-linked animations

**Characteristics**:
- Time-based animations on component mount
- No scroll tracking
- Ideal for above-the-fold content

---

## Scroll Performance Optimizations

### 1. **Lazy Loading**
```typescript
// src/data/chapters.ts
import PreDawnHero from '@/components/chapters/PreDawnHero/PreDawnHero';
const MorningDriveChapter = dynamic(() => import('@/components/chapters/MorningDriveChapter/MorningDriveChapter'));
// ... other dynamic imports
```

- PreDawnHero loads immediately (hero)
- Chapters 2-8 use Next.js dynamic imports
- Reduces initial bundle size

### 2. **Image Optimization**
```typescript
<OptimizedImage
  src={image}
  alt={alt}
  fill
  imageType="hero"
  priority={isHero}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

- Uses Next.js `next/image` component
- Priority loading for critical images
- Responsive srcsets based on viewport
- Automatic WebP conversion

### 3. **Debouncing**
```javascript
// Resize handler with 150ms debounce
useEffect(() => {
  let resizeTimeout: NodeJS.Timeout;

  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      setViewportWidth(window.innerWidth);
      ScrollTrigger.refresh();
    }, 150);
  };

  window.addEventListener('resize', handleResize);
  return () => {
    clearTimeout(resizeTimeout);
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

- Prevents excessive recalculations during resize
- 150ms delay strikes balance between responsiveness and performance

### 4. **ScrollTrigger Refresh**
```javascript
ScrollTrigger.refresh(); // Call on viewport changes
```

- Recalculates all trigger positions
- Essential after DOM updates or resize

### 5. **GPU Acceleration**
```javascript
// GSAP with force3D
.to(element, {
  x: 100,
  force3D: true  // Force GPU acceleration
})
```

- `force3D: true` on all GSAP transforms
- Offloads animations to GPU
- Smoother 60fps performance

### 6. **will-change Property**
Applied to animated elements in CSS:
```css
.animated-element {
  will-change: transform, opacity;
}
```

- Optimizes GPU layer creation
- Should be used sparingly (only on actively animating elements)

### 7. **Conditional Rendering**
```javascript
{inView && (
  <AtmosphericParticles
    type="stars"
    density={40}
    speed={1}
  />
)}
```

- Star particles only render when chapter is in view
- Reduces DOM nodes and computation

---

## Accessibility Features

### 1. **Screen Readers**

**ARIA Live Regions** (Morning Drive):
```javascript
<div
  aria-live="polite"
  aria-atomic="true"
  role="status"
>
  {ariaMessage}
</div>
```

Announces animation milestones:
- "Morning Safari Drive section is now in focus."
- "Full safari scene is slowly appearing..."
- "First message appearing: This could be your morning."

**Heading Hierarchy**:
- Each chapter uses semantic HTML5 `<section>` elements
- Proper h2 → h3 hierarchy maintained
- `aria-labelledby` links sections to headings

### 2. **Reduced Motion**

**GSAP Detection** (Morning Drive, Accommodations):
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Show final state without animations
  gsap.set('.animated-element', { clearProps: 'all' });
  gsap.set('.content', { opacity: 1, scale: 1 });
  return;
}
```

**Framer Motion Detection** (other chapters):
Uses automatic reduced motion support via Framer Motion's built-in preference detection.

**Behavior**:
- Disables/simplifies animations
- Shows final states immediately
- Ensures all content is accessible

### 3. **Keyboard Navigation**

**Accommodations Chapter**:
```javascript
<a
  href="#dining"
  className={styles.skipLink}
  aria-label="Skip to next section: Dining Experience"
  tabIndex={0}
>
  Skip to Dining Experience
</a>
```

**Form Elements** (Contact):
- All inputs have associated `<label>` elements
- Tab indices on interactive elements
- Focus management

### 4. **ARIA Labels**

**Wildlife Cards**:
```javascript
<div
  role="listitem"
  aria-label={`${animal.name} - ${index + 1} of ${animals.length}`}
/>
```

**Accommodations**:
```javascript
<section
  role="region"
  aria-label="Safari accommodations showcase"
>
```

**Buttons**:
```javascript
<button
  onClick={handlePrevDish}
  aria-label="Previous dish"
>
  ‹
</button>
```

### 5. **Alt Text**

All images use descriptive alt text:
```javascript
<OptimizedImage
  src="/images/experiences/game-drive/yourMorning.png"
  alt="Elephants at sunrise with Mount Kilimanjaro in background, viewed from inside a safari vehicle"
/>
```

---

## Common Issues & Solutions

### Issue 1: Animations Not Triggering
**Symptoms**: ScrollTrigger animations don't start or jump

**Causes**:
- ScrollTrigger positions not calculated correctly
- DOM not ready when ScrollTrigger initializes
- Incorrect trigger element reference

**Solutions**:
1. Call `ScrollTrigger.refresh()` after DOM updates
2. Use refs instead of class selectors: `trigger: sectionRef.current`
3. Add `anticipatePin: 1` to pinned ScrollTriggers
4. Ensure component is mounted before creating ScrollTriggers

```javascript
useEffect(() => {
  if (!sectionRef.current) return; // Guard clause

  // ScrollTrigger setup

  return () => {
    // Cleanup
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === sectionRef.current) {
        trigger.kill();
      }
    });
  };
}, []);
```

### Issue 2: Jumpy Scroll on Mobile
**Symptoms**: Scroll position jumps, especially on iOS

**Causes**:
- Pin spacing calculation incorrect
- Address bar show/hide on iOS changes viewport height
- Incorrect mobile height multiplier

**Solutions**:
1. Set `anticipatePin: 1` in ScrollTrigger config
2. Use `pinSpacing: true` explicitly
3. Disable pinning on mobile if problematic:

```javascript
const isMobile = window.innerWidth < 768;
if (isMobile) {
  // Use simple stagger animations instead
  return;
}
```

4. Ensure height calculations account for mobile:

```javascript
const getChapterHeight = (baseHeight: number): number => {
  return isMobileViewport() ? Math.round(baseHeight * 1.2) : baseHeight;
};
```

### Issue 3: Text Disappearing Too Early
**Symptoms**: Animated text fades out before user can read it

**Causes**:
- Progress calculation doesn't account for reading time
- No hold phase between animations

**Solutions**:
1. Add defensive bounds checking:

```javascript
const clamp = (value: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, value));

if (progress >= 0.8958 && progress < 0.9583) {
  // PHASE 6: Hold for Reading
  // Ensure all elements maintain final state
  if (textLine1Ref.current) {
    textLine1Ref.current.style.opacity = '1';
  }
}
```

2. Add explicit hold phases between text animations
3. Increase scroll distance for reading phases

### Issue 4: Horizontal Scroll Not Smooth
**Symptoms**: Horizontal gallery scroll is jerky or resets on resize

**Causes**:
- ScrollTrigger not recalculating on resize
- Scroll distance calculation incorrect

**Solutions**:
1. Add `invalidateOnRefresh: true`:

```javascript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: section,
    invalidateOnRefresh: true, // Recalculate on resize
  },
});
```

2. Recalculate scroll distance on resize:

```javascript
const getScrollDistance = () => {
  const cardsWidth = cards.scrollWidth;
  const viewportWidth = window.innerWidth;
  return cardsWidth - viewportWidth;
};

// Use function, not cached value
.to(cards, {
  x: () => -getScrollDistance(),
  ease: 'none',
})
```

### Issue 5: Memory Leaks
**Symptoms**: Page performance degrades over time, especially on navigation

**Causes**:
- ScrollTriggers not cleaned up
- Event listeners not removed
- GSAP context not reverted

**Solutions**:
1. Always cleanup in useEffect return:

```javascript
useEffect(() => {
  // Setup
  const ctx = gsap.context(() => {
    // Animations
  }, sectionRef);

  return () => {
    // Kill ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === sectionRef.current) {
        trigger.kill();
      }
    });

    // Remove event listeners
    window.removeEventListener('resize', handleResize);

    // Revert GSAP context
    ctx.revert();
  };
}, []);
```

### Issue 6: Pinning Not Working
**Symptoms**: Section scrolls normally instead of pinning

**Causes**:
- `pin: true` missing from ScrollTrigger config
- Trigger element not found
- End calculation incorrect

**Solutions**:
1. Verify pin configuration:

```javascript
ScrollTrigger.create({
  trigger: sectionRef.current, // Must exist
  start: 'top top',
  end: '+=300vh',             // Must be positive value
  pin: true,                   // Required for pinning
  pinSpacing: true,            // Prevent layout shift
  scrub: 1,
  anticipatePin: 1,
});
```

2. Check end calculation:
   - Use `+=XYZvh` for relative distance
   - Use arrow function for dynamic: `end: () => '+=' + height`

3. Enable markers for debugging:

```javascript
markers: true, // Shows start/end points visually
```

---

## File References

### Core Files
- **Chapter configs**: `src/data/chapters.ts`
- **Type definitions**: `src/types/chapter.ts`
- **Main journey container**: `src/components/organisms/CinematicJourney/CinematicJourney.tsx`
- **Homepage**: `src/app/(marketing)/page.tsx`

### Chapter Components
| Chapter | File Path |
|---------|-----------|
| Pre-Dawn | `src/components/chapters/PreDawnHero/PreDawnHero.tsx` |
| Morning Drive | `src/components/chapters/MorningDriveChapter/MorningDriveChapter.tsx` |
| Wildlife | `src/components/chapters/WildlifeEncountersChapter/WildlifeEncountersChapter.tsx` |
| Accommodations | `src/components/chapters/AccommodationsChapter/AccommodationsChapter.tsx` |
| Dining | `src/components/chapters/DiningChapter/DiningChapter.tsx` |
| Experiences | `src/components/chapters/ExperiencesChapter/ExperiencesChapter.tsx` |
| Location | `src/components/chapters/LocationChapter/LocationChapter.tsx` |
| Contact | `src/components/chapters/PlanSafariChapter/PlanSafariChapter.tsx` |

### Hooks
- `src/hooks/useParallax.ts` - Parallax scroll effect
- `src/hooks/useChapterProgress.ts` - Chapter progress tracking
- `src/hooks/useAccommodationsPinning.ts` - Accommodations GSAP pinning logic
- `src/hooks/useInView.ts` - Intersection Observer wrapper

### Data Files
- `src/data/wildlife.ts` - Wildlife animals data (5 animals)
- `src/data/images.ts` - Image path constants
- `src/data/locationData.ts` - Journey routes, timeline, landmarks
- `src/data/safariPackages.ts` - Safari packages and contact methods
- `src/data/dining.ts` - Dining menu data
- `src/data/experiences.ts` - Safari experiences data

### Providers
- `src/providers/SafariProgressProvider.tsx` - Global progress state management

---

## Development Workflow

### When modifying chapters:

1. **Check scroll distances**
   - Verify new content fits within allocated vh
   - Consider both chapter allocation AND internal pinning if applicable
   - Example: Morning Drive has 60vh allocation but 1200vh internal pin

2. **Test mobile**
   - Verify 20% height increase accommodates content
   - Test on iOS for address bar behavior
   - Disable complex pinning if problematic

3. **Refresh ScrollTrigger**
   - Call `ScrollTrigger.refresh()` after DOM changes
   - Add to resize handlers
   - Include in cleanup functions

4. **Test accessibility**
   - Verify screen reader announcements
   - Test keyboard navigation
   - Enable reduced motion preference and verify behavior
   - Check ARIA labels and roles

5. **Optimize images**
   - Use `OptimizedImage` component
   - Set appropriate `sizes` prop
   - Use `priority` for above-the-fold images

6. **Monitor performance**
   - Check frame rates during scroll (target 60fps)
   - Use browser DevTools Performance panel
   - Watch for layout shifts (CLS metric)
   - Monitor memory usage

7. **Update this doc**
   - Keep documentation in sync with code changes
   - Document new animation phases
   - Update scroll distances if changed

### Debugging Tips

**Enable GSAP Markers**:
```javascript
markers: true, // Shows start/end trigger points
```

**Console Logging**:
```javascript
onUpdate: (self) => {
  console.log('Progress:', self.progress);
  console.log('Direction:', self.direction); // 1 = down, -1 = up
}
```

**React DevTools**:
- Check component re-renders
- Inspect state/props
- Monitor context values

**ScrollTrigger Methods**:
```javascript
ScrollTrigger.getAll();        // Get all instances
ScrollTrigger.refresh();       // Recalculate all
ScrollTrigger.getById('id');   // Get specific instance
```

---

## Testing Checklist

### For Each Chapter:

- [ ] Chapter renders correctly on desktop
- [ ] Chapter renders correctly on mobile
- [ ] Animations trigger at correct scroll positions
- [ ] Text is readable (sufficient contrast, size)
- [ ] Images load properly (no broken images)
- [ ] Links/buttons work
- [ ] Forms validate and submit (if applicable)
- [ ] Reduced motion preference is respected
- [ ] Screen reader announces key content
- [ ] Keyboard navigation works
- [ ] No console errors
- [ ] No layout shifts during scroll
- [ ] Smooth 60fps scrolling
- [ ] Resize doesn't break layout

### For Entire Journey:

- [ ] All chapters appear in correct order
- [ ] Scroll progress indicator works
- [ ] Total scroll height is correct (640vh desktop, 768vh mobile)
- [ ] Atmospheric transitions work between chapters
- [ ] No jump in scroll position between chapters
- [ ] Browser back button works correctly
- [ ] Direct navigation to chapter IDs works (e.g., `#wildlife-encounters`)
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested on iOS, Android
- [ ] No memory leaks after multiple scroll throughs

---

## Browser Support

### Target Browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Mobile Chrome (Android 10+)

### Fallbacks:
- **GSAP**: Works in all modern browsers
- **Framer Motion**: Works in all modern browsers
- **Intersection Observer**: Polyfill not needed for target browsers
- **CSS Grid**: Native support in all target browsers
- **CSS Custom Properties**: Native support in all target browsers

### Known Issues:
- **iOS Address Bar**: May cause viewport height changes during scroll
  - Solution: Disable complex pinning on mobile if problematic
- **Safari Parallax**: Slight performance difference vs Chrome
  - Solution: Reduce parallax speed on Safari if needed

---

**Last Updated**: 2025-11-18
**Document Version**: 2.0
**Status**: ✅ Complete - All 8 chapters fully documented based on actual implementation
**Reviewed By**: Claude AI (Comprehensive codebase analysis)

# Safari Experience - Chapter Summary

A concise overview of all 8 chapters in the homepage scroll experience.

---

## Chapter 1: Pre-Dawn Hero
**Scroll Length**: 100vh (120vh mobile)
**Position**: 0vh → 100vh

### Elements
- Full-screen hero background image (Mount Kilimanjaro at dawn)
- Animated tagline: "A New Safari Experience Awaits" (typing effect)
- Subtitle: "Opening December 2025 | Amboseli, Kenya"
- Live countdown timer (days, hours, minutes, seconds)
- Two CTA buttons: "Reserve Your Stay" + "Explore Rooms"
- Trust badge with mountain icon
- Scroll indicator with animated arrow

### Animations
- **1.2s**: Tagline types in (80ms per character) with blinking cursor
- **1.4s**: Subtitle fades in from below
- **1.6s**: Countdown timer appears
- **1.8s**: CTA buttons fade in
- **2.0s**: Trust badge + scroll indicator appear
- All use opacity and Y-axis translation

**Animation Type**: Time-based (Framer Motion)
**Pinning**: No

---

## Chapter 2: Morning Drive
**Scroll Length**: 1,680vh (2,016vh mobile)
**Position**: 100vh → 1,780vh

### Elements
- Section heading: "Morning Safari Drive"
- Content card with trip details (distance, time, duration)
- Small preview image in card
- Large full-screen safari image (elephants + Kilimanjaro)
- Animated text overlay in two lines:
  - Line 1: "This could be your morning" (word-by-word)
  - Line 2: "Exciting. Beautiful. Breath taking." (sequential)
- Screen reader announcements (accessibility)

### Animations

**Phase 1: Static Hold (0-150vh)**
- Everything visible and readable
- User absorbs initial content

**Phase 2: Fade Out (150vh-200vh)**
- Heading fades up and out
- Content card fades up and out
- Both move -50px to -100px vertically

**Phase 3: Safari Image Entry (200vh-1010vh)**
- Image slides from left: translateX(-100%) → 0%
- Image grows: scale(0.7) → 1.0
- Opacity increases: 0.3 → 1.0
- Synchronized with card fade, then continues gliding

**Phase 4: Pause (1010vh-1020vh)**
- 10vh pause with image fully visible

**Phase 5: Text Reveal (1020vh-1260vh)**
- **"This"**: 1020-1030vh (10vh fade)
- 20vh gap
- **"could"**: 1050-1060vh (10vh fade)
- 20vh gap
- **"be"**: 1080-1090vh (10vh fade)
- 20vh gap
- **"your"**: 1110-1120vh (10vh fade)
- 20vh gap
- **"morning"**: 1140-1150vh (10vh fade)
- 20vh gap
- **"Exciting."**: 1170-1180vh (10vh fade)
- 30vh gap
- **"Beautiful."**: 1210-1220vh (10vh fade)
- 30vh gap
- **"Breath taking."**: 1250-1260vh (10vh fade)

**Phase 6: Hold for Reading (1260vh-1680vh)**
- All text and image remain static
- 420vh of scroll time for reading

**Phase 7: Exit (1680vh)**
- Section unpins immediately
- **No buffer - seamless transition**

**Animation Type**: Scroll-driven (GSAP ScrollTrigger with manual onUpdate)
**Pinning**: Yes (entire 1,680vh)

---

## Chapter 3: Wildlife Encounters
**Scroll Length**: 250vh (300vh mobile)
**Position**: 1,780vh → 2,030vh

### Elements
- Intro section with heading and subtitle
- **Staggered fan display** with 5 animal cards (layered depth):
  - **Elephant** (z-index 1, backmost)
  - **Lion** (z-index 2)
  - **Giraffe** (z-index 3, center)
  - **Zebra** (z-index 4)
  - **Cheetah** (z-index 5, frontmost)
- Each card contains:
  - Large animal image
  - Conservation status badge
  - Scientific name
  - Description paragraph
  - "Did you know?" fun fact
  - Best time to see
  - "Learn to Encounter" link
- Progress indicator dots (5 dots)
- "Scroll to explore" hint with pulsing animation

### Animations

**Timeline Breakdown**:
- **0-10% (0-25vh)**: Intro fades in (opacity 0 → 1)
- **10-25% (25-62.5vh)**: Intro holds visible
- **25-35% (62.5-87.5vh)**:
  - Intro fades out + moves up (-50px)
  - Fan container fades in (opacity 0 → 1)
  - Simultaneous transition
- **35-100% (87.5-250vh)**: Staggered fan animation
  - **Step 1**: Elephant appears at center (0°, x:0)
  - **Step 2**: Lion appears, Elephant slides left & tilts (-3°, x:-15%)
  - **Step 3**: Giraffe appears at center, previous cards adjust
    - Elephant: -6°, x:-30% (final position)
    - Lion: -3°, x:-15% (final position)
  - **Step 4**: Zebra appears right of center (+3°, x:+15%)
  - **Step 5**: Cheetah completes fan at far right (+6°, x:+30%)
  - Each card: opacity 0→1, y:100→0, scale:0.95→1
  - Timing: 0.08 duration per card, 0.03 hold between reveals
  - Final hold: 0.22 duration to appreciate complete fan

**Final Formation**:
```
Elephant ←── Lion ←── Giraffe ──→ Zebra ──→ Cheetah
(back, -30%, -6°)  (center, 0%, 0°)  (front, +30%, +6°)
```

**Animation Type**: GSAP Timeline with scrub (staggered sequential)
**Pinning**: Yes (250vh total)

---

## Chapter 4: Accommodations
**Scroll Length**: 300vh (360vh mobile)
**Position**: 2,030vh → 2,330vh

### Elements
- Fixed heading: "Comfortable Safari Accommodations"
- Subtitle: "Modern rooms designed for families and groups"
- **3 Room Presentations** (alternating layout):

  **Room 1**: Safari View Room
  - Image on left, card on right
  - Price: From $220/night
  - Features: Queen bed, AC, Wi-Fi, Pool access

  **Room 2**: Deluxe Safari Room
  - Card on left, image on right
  - Price: From $280/night
  - Features: King bed + sofa, Mini-fridge, Balcony

  **Room 3**: Family Apartment
  - Image on left, card on right
  - Price: From $380/night
  - Features: 2 bedrooms, Kitchenette, Living area

- CTA button: "View All Rooms"
- Midday gradient background

### Animations

**Staggered Reveal Pattern**:
- **0-20%**: Heading fades in + scales (0.95 → 1.0)
- **10-30%**: Room 1 image slides from left, card from right
- **35-55%**: Room 2 card slides from left, image from right
- **60-80%**: Room 3 image slides from left, card from right
- **85-95%**: CTA button fades in from below

All elements use:
- Opacity: 0 → 1
- translateX or translateY based on direction
- Parallax layers at speed 0.5

**Animation Type**: GSAP via useAccommodationsPinning hook
**Pinning**: Yes (300vh total)

---

## Chapter 5: Dining
**Scroll Length**: 80vh (96vh mobile)
**Position**: 2,330vh → 2,410vh

### Elements
- Golden hour background image (sundowner deck)
- Heading: "Group-Friendly Dining"
- **Manual Carousel** with 3 dishes:
  - Grilled Serengeti Beef
  - Lake Victoria Tilapia
  - Kenyan Buffet Spread
  - Previous/Next buttons
  - Dot indicators
- **Wine Pairings Grid** (3 cards):
  - Sauvignon Blanc with Tilapia
  - Cabernet Sauvignon with Beef
  - Rosé with Sunset Platter
- **Group Info Section** (6 feature cards):
  - Accommodates up to 40 people
  - Buffet options
  - Kids menu
  - Packed lunches
  - Private dining
  - Flexible meal times
- **Time Slots Preview**: 7:00 AM, 12:30 PM, 7:30 PM
- CTA: "See Full Menu"

### Animations

**WhileInView Triggers** (30% viewport threshold):
- **Header**: Fade in from below (delay 0s)
- **Carousel**: Fade + scale (0.95→1) (delay 0.2s)
- **Wine Heading**: Fade from below (delay 0.3s)
- **Pairing Cards**: Staggered fade-in (delays: 0.4s, 0.55s, 0.7s)
- **Group Heading**: Fade from below (delay 0s)
- **Group Features**: Staggered slide from left (delays: 0.2s-0.7s)
- **CTA Section**: Fade from below (delay 0.6s)

All use opacity + Y/X translation

**Animation Type**: Framer Motion whileInView
**Pinning**: No (standard scroll)

---

## Chapter 6: Experiences
**Scroll Length**: 80vh (96vh mobile)
**Position**: 2,410vh → 2,490vh

### Elements
- Golden hour background (game drive scene)
- Heading: "Safari Experiences"
- Subtitle: "Every moment is an adventure"
- **Experience Cards Grid** (4 cards in 2×2 layout):
  - **Game Drive Safari** (3-4h, Easy, Morning)
  - **Guided Walking Safari** (2-3h, Moderate, Morning)
  - **Bird Watching Expedition** (2h, Easy, Morning)
  - **Sundowner Experience** (2h, Easy, Evening)
- **Activity Timeline** (3 time periods):
  - Morning: Game Drive, Walking Safari, Bird Watching
  - Afternoon: Bush Lunch, Photography, Cultural Visit
  - Evening: Sundowner, Night Drive, Stargazing
- CTA: "Plan Your Safari"

### Animations

**WhileInView Triggers**:
- **Header**: Fade from below (30% threshold, delay 0s)
- **Experience Cards**: Staggered fade from below
  - Card 1: delay 0s (20% threshold)
  - Card 2: delay 0.15s
  - Card 3: delay 0.3s
  - Card 4: delay 0.45s
- **Timeline**: Fade from below (delay 0.4s, 30% threshold)
- **CTA**: Fade from below (delay 0.6s, 30% threshold)

**Animation Type**: Framer Motion whileInView
**Pinning**: No (standard scroll)

---

## Chapter 7: Location
**Scroll Length**: 80vh (96vh mobile)
**Position**: 2,490vh → 2,570vh

### Elements
- Twilight sky background (parallax)
- Heading: "Getting to Your Safari Adventure"
- **Route Selector** (4 routes with icons, duration, distance)
- **Travel Info Cards** (3 cards):
  - From Nairobi: 365 km, 3-4 hours
  - Kimana Gate: 2 km, main entrance
  - Mount Kilimanjaro: 45 km, unobstructed views
- **Two-Column Layout**:
  - Left: Interactive Mapbox map with waypoints
  - Right: Journey timeline with steps
- **Transport Comparison Table** (compare options)
- **Photo Gallery** (3-column grid of journey photos)
- **Info Cards Grid** (essential travel information)
- **Booking CTAs**: "Arrange Private Transfer" + "Ask Questions"

### Animations

**Sequential Reveal** (Intersection Observer at 20% threshold):
- **Title**: Fade from below (delay 0.2s, duration 0.8s)
- **Subtitle**: Fade from below (delay 0.4s, duration 0.8s)
- **Route Selector**: Fade from below (delay 0.6s, duration 0.6s)
- **Travel Info**: Fade from below (delay 0.7s, duration 0.6s)
- **Map Column**: Slide from left (delay 0.8s, duration 0.8s)
- **Timeline Column**: Slide from right (delay 1.0s, duration 0.8s)
- **Comparison Table**: Fade from below (delay 1.2s, duration 0.8s)
- **Photo Gallery**: Fade from below (delay 1.4s, duration 0.8s)
- **Info Cards**: Fade from below (delay 1.6s, duration 0.8s)
- **CTA Buttons**: Fade + scale (delay 1.8s, duration 0.8s)

**Animation Type**: Intersection Observer + Framer Motion
**Pinning**: No (standard scroll)

---

## Chapter 8: Plan Safari
**Scroll Length**: 80vh (96vh mobile)
**Position**: 2,570vh → 2,650vh

### Elements
- Starry night background (parallax)
- Animated star particles (40 density)
- **Journey Complete Badge**: "✨ Journey Complete"
- Completion text: "You've experienced a full day at Amboseli Safari Club"
- Heading: "Plan Your Safari Adventure"
- **Safari Packages Section** (3 cards):
  - Package name, duration, price range
  - "Most Popular" badge (optional)
  - Highlights list with checkmarks
  - "What's Included" items
  - "Best For" tags
  - "Select Package" button
- **Contact Form**:
  - Full Name (required)
  - Email (required)
  - Phone
  - Number of Guests dropdown (required)
  - Preferred Dates (date picker)
  - Package selection dropdown
  - Message textarea
  - Submit button (with loading/success states)
- **Contact Methods Grid**:
  - Phone, Email, WhatsApp, others
  - Icons, values, action labels
- **Footer CTA**:
  - "Ready for Your Safari Adventure?"
  - "Book Now" (primary)
  - "Download Brochure" (secondary)

### Animations

**Intersection Observer Triggers** (30% threshold):
- **Journey Badge**: Fade + scale (delay 0.2s, duration 1.0s)
- **Title**: Fade from below (delay 0.4s, duration 0.8s)
- **Subtitle**: Fade from below (delay 0.6s, duration 0.8s)
- **Package Cards**: Staggered fade from below
  - Card 1: delay 0.2s
  - Card 2: delay 0.3s
  - Card 3: delay 0.4s
- **Contact Form**: Fade from below (delay 0.4s, duration 0.8s)
- **Contact Methods**: Staggered fade + scale (delays: 0.6s + index×0.1s)
- **Footer CTA**: Fade from below (delay 1.0s, duration 0.8s)

**Form States**: idle → loading → success (with visual feedback)

**Animation Type**: Intersection Observer + Framer Motion
**Pinning**: No (standard scroll)

---

## Summary Statistics

| Chapter | Scroll Length | Animation Type | Pinned? | Element Count |
|---------|--------------|----------------|---------|---------------|
| 1. Pre-Dawn Hero | 100vh | Time-based | No | 7 |
| 2. Morning Drive | 1,680vh | Scroll-driven | Yes | 10+ |
| 3. Wildlife Encounters | 250vh | Timeline | Yes | 5 cards + UI |
| 4. Accommodations | 300vh | Scroll-driven | Yes | 3 rooms + UI |
| 5. Dining | 80vh | WhileInView | No | 12+ |
| 6. Experiences | 80vh | WhileInView | No | 10+ |
| 7. Location | 80vh | IntersectionObserver | No | 15+ |
| 8. Plan Safari | 80vh | IntersectionObserver | No | 20+ |
| **TOTAL** | **2,650vh** | — | — | **70+** |

### Mobile Adjustments
- All chapters get 20% height increase (×1.2 multiplier)
- Total mobile: **3,180vh**
- Breakpoint: 768px

---

## Animation Pattern Summary

1. **Time-Based** (Pre-Dawn): Animations trigger on component mount with fixed delays
2. **Scroll-Driven GSAP** (Morning Drive): Manual control via `onUpdate` with precise progress calculations
3. **GSAP Timeline** (Wildlife): Pre-defined timeline with `scrub` for scroll-linking
4. **WhileInView** (Dining, Experiences): Framer Motion triggers when element enters viewport
5. **Intersection Observer** (Location, Plan Safari): Custom hooks for complex multi-element coordination

---

**Document Version**: 1.0
**Last Updated**: 2025-11-19
**Status**: ✅ Complete

# Safari Experience Scroll - Complete Technical Documentation

## Overview
The Safari Experience is a continuous scroll journey through 8 chapters on the homepage. This document details every element, animation sequence, scroll distance, and technical configuration.

---

## Total Journey Metrics

- **Desktop Total Height**: 1,120vh
- **Mobile Total Height**: 1,344vh (20% increase)
- **Total Chapters**: 8
- **Scroll Direction**: Vertical (top to bottom)
- **Pin Method**: GSAP ScrollTrigger

---

## Chapter-by-Chapter Breakdown

### **Chapter 1: Pre-Dawn Hero**
**File**: `src/components/chapters/PreDawnHero/PreDawnHero.tsx`

#### Scroll Distance
- **Desktop**: 100vh
- **Mobile**: 120vh
- **Start**: 0vh
- **End**: 100vh (desktop) / 120vh (mobile)

#### Page Elements
1. **Background Image** - Full-screen hero image (`/images/hero/heroImage.jpg`)
2. **Tagline** - "A New Safari Experience Awaits" with typing effect
3. **Subtitle** - "Opening December 2025 | Amboseli, Kenya"
4. **Countdown Timer** - Days, hours, minutes, seconds to December 15, 2025
5. **CTA Buttons** - "Reserve Your Stay" (primary), "Explore Rooms" (secondary)
6. **Trust Badge** - "Kenya's Newest Safari Lodge • Mount Kilimanjaro Views"
7. **Scroll Indicator** - Animated "Scroll to Begin" with arrow

#### Animation Sequence
| Time | Element | Animation |
|------|---------|-----------|
| 0.0s | Background Image | Static, immediate display |
| 1.2s | Tagline | Typing effect starts (80ms per character) |
| 1.2s | Tagline | Fade in (opacity 0→1, 0.6s duration) |
| 1.4s | Subtitle | Fade in + Y translate (0.6s duration) |
| 1.6s | Countdown Timer | Fade in + Y translate (0.8s duration) |
| 1.8s | CTA Buttons | Fade in + Y translate (0.6s duration) |
| 2.0s | Trust Badge | Fade in (0.6s duration) |
| 2.0s | Scroll Indicator | Fade in (1.0s duration) |

#### Technical Notes
- No pinning - standard viewport section
- Typing effect: 80ms per character with blinking cursor
- All animations use Framer Motion
- Background image uses OptimizedImage component with priority loading

---

### **Chapter 2: Morning Drive (Static Preview)**
**File**: `src/components/chapters/MorningDriveChapter/MorningDriveChapter.tsx`

#### Scroll Distance
- **Desktop**: 5vh
- **Mobile**: 6vh
- **Start**: 100vh
- **End**: 105vh (desktop) / 106vh (mobile)

#### Page Elements
1. **Heading** - "Morning Safari Drive"
2. **Content Card** - Text card with trip details + small image card

#### Behavior
- **Static display only** - No animations due to minimal 5vh scroll distance
- Shows initial heading and content card for brief preview
- Full-screen safari image and overlay text remain hidden
- Pins for 5vh then transitions to Wildlife Encounters

#### Technical Notes
- **Pinning**: GSAP ScrollTrigger with `pin: true`, `pinSpacing: true`
- **Duration**: Only 5vh - just enough for a quick glimpse
- **Purpose**: Provides context that wildlife experiences are available

---

### **Chapter 3: Wildlife Encounters**
**File**: `src/components/chapters/WildlifeEncountersChapter/WildlifeEncountersChapter.tsx`

#### Scroll Distance
- **Desktop**: 250vh
- **Mobile**: 300vh
- **Start**: 105vh (immediately after Morning Drive)
- **End**: 355vh (desktop) / 405vh (mobile)

#### Page Elements
1. **Intro Section** - "Wildlife Encounters" heading + "Meet the Majestic Five of Amboseli"
2. **Staggered Fan Display** - 5 animal cards with layered depth (Elephant, Lion, Giraffe, Zebra, Cheetah)
3. **Animal Cards** - Each contains:
   - Large image
   - Conservation status badge
   - Animal name + scientific name
   - Description
   - Fun fact
   - Best time to see
   - "Learn to Encounter" CTA link
4. **Progress Indicator** - 5 dots showing scroll position
5. **Scroll Hint** - "Scroll to explore" with arrow (pulsing animation)

#### Z-Index Layering System
Cards are layered from back to front to create visual depth:

| Card | Animal | Z-Index | Visual Position |
|------|--------|---------|----------------|
| 1 | Elephant | 1 | Backmost (partially hidden by other cards) |
| 2 | Lion | 2 | Behind center |
| 3 | Giraffe | 3 | Center position |
| 4 | Zebra | 4 | Front of center |
| 5 | Cheetah | 5 | Frontmost (covers portions of other cards) |

#### Animation Sequence - Staggered Fan Reveal

##### **PHASE 1: Intro Fade In (0-10% = 0-25vh)**
- Intro section fades in (opacity 0→1)
- Duration: 0.1 timeline units

##### **PHASE 2: Hold Intro (10-25% = 25vh-62.5vh)**
- Intro remains fully visible
- Duration: 0.15 timeline units

##### **PHASE 3: Transition (25-35% = 62.5vh-87.5vh)**
- Intro fades out + moves up (Y: 0 → -50px)
- Fan container fades in (opacity 0→1)
- Simultaneous transition
- Duration: 0.1 timeline units each

##### **PHASE 4: Staggered Fan Animation (35-100% = 87.5vh-250vh)**

**Initial State** (all cards):
- Opacity: 0
- Y position: 100px (below viewport)
- Rotation: 0°
- X position: 0
- Scale: 0.95

**Card Animation Sequence**:

| Step | Timeline | Cards Affected | Animation |
|------|----------|----------------|-----------|
| 1 | T+0.00 | Card 1 (Elephant) | Appears at center: opacity 1, y:0, rotation:0°, x:0, scale:1 |
| 2 | T+0.08 | Hold | 0.03 duration pause |
| 3 | T+0.13 | Card 2 (Lion) | Appears at center: opacity 1, y:0, rotation:0°, x:0, scale:1 |
| 3 | T+0.13 | Card 1 (Elephant) | Slides left & tilts: rotation:-3°, x:-15% |
| 4 | T+0.21 | Hold | 0.03 duration pause |
| 5 | T+0.26 | Card 3 (Giraffe) | Appears at center: opacity 1, y:0, rotation:0°, x:0, scale:1 |
| 5 | T+0.26 | Card 1 (Elephant) | Slides further left: rotation:-6°, x:-30% |
| 5 | T+0.26 | Card 2 (Lion) | Slides left & tilts: rotation:-3°, x:-15% |
| 6 | T+0.34 | Hold | 0.03 duration pause |
| 7 | T+0.39 | Card 4 (Zebra) | Appears right of center: opacity 1, y:0, rotation:+3°, x:+15%, scale:1 |
| 7 | T+0.39 | Cards 1-3 | Hold positions (no adjustment) |
| 8 | T+0.47 | Hold | 0.03 duration pause |
| 9 | T+0.52 | Card 5 (Cheetah) | Completes fan at far right: opacity 1, y:0, rotation:+6°, x:+30%, scale:1 |
| 10 | T+0.60 | Final Hold | All cards remain in fan formation for 0.22 duration |

**Final Fan Formation**:
```
Elephant ←────── Lion ←────── Giraffe ────→ Zebra ────→ Cheetah
(z:1, -30%, -6°) (z:2, -15%, -3°) (z:3, 0%, 0°) (z:4, +15%, +3°) (z:5, +30%, +6°)
BACK                           CENTER                           FRONT
```

#### Card Positioning Details
- **Transform Origin**: Center of each card
- **Positioning Method**: Absolute positioning within fan container
- **X Translation**: Percentage-based for responsive scaling
- **Rotation**: Degrees (negative = counter-clockwise, positive = clockwise)
- **Timing**: Each card appearance: 0.08 duration with `power2.out` easing
- **Holds**: 0.03 duration between each card reveal
- **Final Appreciation**: 0.22 duration to admire complete fan

#### Technical Notes
- **Pinning**: GSAP ScrollTrigger with 250vh total scroll distance
- **Timeline**: GSAP timeline with `scrub: 1` for smooth scroll-linked animation
- **Animation Type**: Staggered sequential reveals with synchronized multi-card adjustments
- **Responsive**: `invalidateOnRefresh: true` recalculates on resize
- **Data Source**: WILDLIFE_ANIMALS from `/data/wildlife.ts` (5 animals exactly)
- **Layout**: Fan container uses absolute positioning for card overlap
- **Visual Depth**: Z-index creates realistic card stack effect (Cheetah overlaps all others)

---

### **Chapter 4: Accommodations**
**File**: `src/components/chapters/AccommodationsChapter/AccommodationsChapter.tsx`

#### Scroll Distance
- **Desktop**: 300vh
- **Mobile**: 360vh
- **Start**: 2,030vh
- **End**: 2,330vh (desktop) / 2,436vh (mobile)

#### Page Elements
1. **Heading Container** (Fixed during pin)
   - "Comfortable Safari Accommodations"
   - Subtitle: "Modern rooms designed for families and groups"
2. **3 Room Presentations** (Image + Card pairs)
   - Room 1: Image left, card right (Safari View Room)
   - Room 2: Card left, image right (Deluxe Safari Room)
   - Room 3: Image left, card right (Family Apartment)
3. **Room Cards** contain:
   - Room name
   - Tagline
   - Price (per night)
   - Feature list with checkmarks
4. **CTA Button** - "View All Rooms"

#### Animation Sequence

The animations are controlled by GSAP ScrollTrigger via the `useAccommodationsPinning` hook:

| Scroll Progress | Elements | Animation |
|----------------|----------|-----------|
| 0-20% | Heading | Fade in + scale (0.95→1) |
| 10-30% | Room 1 Image | Slide in from left |
| 10-30% | Room 1 Card | Slide in from right + fade in |
| 35-55% | Room 2 Card | Slide in from left + fade in |
| 35-55% | Room 2 Image | Slide in from right |
| 60-80% | Room 3 Image | Slide in from left |
| 60-80% | Room 3 Card | Slide in from right + fade in |
| 85-95% | CTA Button | Fade in + Y translate |

#### Technical Notes
- **Pinning**: Custom hook `useAccommodationsPinning` handles GSAP setup
- **Layout**: Absolute positioning with viewport-based coordinates
- **Parallax**: ParallaxLayer components with speed: 0.5
- **Accessibility**: Skip link to next section, ARIA labels, keyboard navigation
- **Background**: Midday lighting gradient overlay

---

### **Chapter 5: Dining**
**File**: `src/components/chapters/DiningChapter/DiningChapter.tsx`

#### Scroll Distance
- **Desktop**: 80vh
- **Mobile**: 96vh
- **Start**: 2,330vh
- **End**: 2,410vh (desktop) / 2,532vh (mobile)

#### Page Elements
1. **Background Image** - Sundowner deck at golden hour (parallax)
2. **Heading** - "Group-Friendly Dining" + subtitle
3. **Dish Carousel** - Interactive manual carousel with 3 dishes
   - Grilled Serengeti Beef
   - Lake Victoria Tilapia
   - Kenyan Buffet Spread
4. **Wine Pairings Grid** - 3 pairing cards
5. **Group Info Section** - 6 feature cards:
   - Accommodates tour groups up to 40 people
   - Buffet and family-style dining options
   - Kids menu and dietary accommodations
   - Packed lunches for safari days
   - Private dining for special events
   - Flexible meal times
6. **Time Slots Preview** - Available dining times (7:00 AM, 12:30 PM, 7:30 PM)
7. **CTA Button** - "See Full Menu"

#### Animation Sequence
All animations use Framer Motion `whileInView` triggers:

| Element | Initial State | Animated State | Delay | Viewport Trigger |
|---------|--------------|----------------|-------|-----------------|
| Header | opacity: 0, y: 30 | opacity: 1, y: 0 | 0s | 30% in view |
| Carousel | opacity: 0, scale: 0.95 | opacity: 1, scale: 1 | 0.2s | 30% in view |
| Wine Pairings Heading | opacity: 0, y: 20 | opacity: 1, y: 0 | 0.3s | 30% in view |
| Pairing Card 1 | opacity: 0, y: 30 | opacity: 1, y: 0 | 0.4s | 30% in view |
| Pairing Card 2 | opacity: 0, y: 30 | opacity: 1, y: 0 | 0.55s | 30% in view |
| Pairing Card 3 | opacity: 0, y: 30 | opacity: 1, y: 0 | 0.7s | 30% in view |
| Group Heading | opacity: 0, y: 20 | opacity: 1, y: 0 | 0s | 30% in view |
| Group Feature 1-6 | opacity: 0, x: -20 | opacity: 1, x: 0 | 0.2s-0.7s (staggered) | 30% in view |
| CTA Section | opacity: 0, y: 50 | opacity: 1, y: 0 | 0.6s | 30% in view |

#### Technical Notes
- **No Pinning** - Standard scroll section
- **Parallax**: Background at speed 0.4, foreground at speed 1.0
- **Carousel**: Manual control (not auto-rotating)
- **State Management**: React useState for currentDishIndex
- **Viewport Threshold**: `amount: 0.3` (30% visible triggers animation)
- **Atmosphere**: Afternoon golden light gradient overlay

---

### **Chapter 6: Experiences**
**File**: `src/components/chapters/ExperiencesChapter/ExperiencesChapter.tsx`

#### Scroll Distance
- **Desktop**: 80vh
- **Mobile**: 96vh
- **Start**: 2,410vh
- **End**: 2,490vh (desktop) / 2,628vh (mobile)

#### Page Elements
1. **Background Image** - Game drive at golden hour (parallax)
2. **Heading** - "Safari Experiences" + subtitle "Every moment is an adventure"
3. **Experience Cards Grid** - 4 cards:
   - Game Drive Safari (3-4 hours, Easy, Morning)
   - Guided Walking Safari (2-3 hours, Moderate, Morning)
   - Bird Watching Expedition (2 hours, Easy, Morning)
   - Sundowner Experience (2 hours, Easy, Evening)
4. **Activity Timeline** - Three time periods:
   - Morning: Game Drive, Walking Safari, Bird Watching
   - Afternoon: Bush Lunch, Photography Workshop, Cultural Visit
   - Evening: Sundowner, Night Drive, Stargazing
5. **CTA Button** - "Plan Your Safari"

#### Animation Sequence
All animations use Framer Motion `whileInView` triggers:

| Element | Initial State | Animated State | Delay | Viewport Trigger |
|---------|--------------|----------------|-------|-----------------|
| Header | opacity: 0, y: 30 | opacity: 1, y: 0 | 0s | 30% in view |
| Experience Card 1 | opacity: 0, y: 40 | opacity: 1, y: 0 | 0s | 20% in view |
| Experience Card 2 | opacity: 0, y: 40 | opacity: 1, y: 0 | 0.15s | 20% in view |
| Experience Card 3 | opacity: 0, y: 40 | opacity: 1, y: 0 | 0.3s | 20% in view |
| Experience Card 4 | opacity: 0, y: 40 | opacity: 1, y: 0 | 0.45s | 20% in view |
| Timeline Section | opacity: 0, y: 40 | opacity: 1, y: 0 | 0.4s | 30% in view |
| CTA Section | opacity: 0, y: 50 | opacity: 1, y: 0 | 0.6s | 30% in view |

#### Technical Notes
- **No Pinning** - Standard scroll section
- **Parallax**: Background at speed 0.4, foreground at speed 1.0
- **Grid Layout**: 2x2 grid on desktop, single column on mobile
- **Staggered Cards**: 150ms delay between each card fade-in
- **Components**: Uses ExperienceCard and ActivityTimeline molecules
- **Atmosphere**: Golden hour lighting gradient overlay

---

### **Chapter 7: Location**
**File**: `src/components/chapters/LocationChapter/LocationChapter.tsx`

#### Scroll Distance
- **Desktop**: 80vh
- **Mobile**: 96vh
- **Start**: 2,490vh
- **End**: 2,570vh (desktop) / 2,724vh (mobile)

#### Page Elements
1. **Background Image** - Twilight sky over Amboseli (parallax)
2. **Header** - "Getting to Your Safari Adventure"
3. **Route Selector** - 4 routes with icons, duration, distance
4. **Travel Info Cards** - 3 cards:
   - From Nairobi (365 km, 3-4 hours)
   - Kimana Gate (2 km, main park entrance)
   - Mount Kilimanjaro (45 km, unobstructed views)
5. **Map + Timeline Section** (2-column layout)
   - Interactive Mapbox map with waypoints
   - Journey timeline with steps
6. **Transport Comparison Table** - Compare transportation options
7. **Photo Gallery** - 3-column grid of journey photos
8. **Info Cards Grid** - Essential travel information
9. **Booking CTA** - "Arrange Private Transfer" + "Ask Questions"

#### Animation Sequence
Uses Intersection Observer (`inView` state) with Motion animations:

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

#### Technical Notes
- **No Pinning** - Standard scroll section
- **Parallax**: Background at speed 0.3 (ParallaxImage component)
- **Interactivity**: Route selector changes map waypoints and timeline
- **Data Sources**: Multiple imports from `/data/locationData.ts`
- **Intersection Observer**: Threshold 0.2 (20% visible triggers)
- **Atmosphere**: Twilight atmospheric overlay
- **Map**: Mapbox GL integration via InteractiveMap component

---

### **Chapter 8: Plan Safari (Contact)**
**File**: `src/components/chapters/PlanSafariChapter/PlanSafariChapter.tsx`

#### Scroll Distance
- **Desktop**: 80vh
- **Mobile**: 96vh
- **Start**: 2,570vh
- **End**: 2,650vh (desktop) / 2,820vh (mobile)

#### Page Elements
1. **Background Image** - Starry night over savannah (parallax)
2. **Star Particles** - Atmospheric particles (40 density, speed 1)
3. **Journey Complete Badge** - "✨ Journey Complete" with completion text
4. **Header** - "Plan Your Safari Adventure"
5. **Safari Packages Section** - 3 package cards:
   - Package card with popular badge option
   - Package name, duration, price range
   - Highlights list with checkmarks
   - "What's Included" list
   - "Best For" tags
   - "Select Package" button
6. **Contact Form Section** - Multi-field form:
   - Full Name (required)
   - Email Address (required)
   - Phone Number
   - Number of Guests dropdown (required)
   - Preferred Dates (date picker)
   - Interested Package dropdown
   - Message textarea
   - Submit button with loading states
   - Success message display
7. **Contact Methods Section** - Quick contact buttons:
   - Phone
   - Email
   - WhatsApp
   - Other methods with icons, values, labels
8. **Footer CTA** - Final call-to-action:
   - "Ready for Your Safari Adventure?" heading
   - Description text
   - "Book Now" button (primary)
   - "Download Brochure" button (secondary)

#### Animation Sequence
Uses Intersection Observer (`inView` state) with Motion animations:

| Element | Initial State | Animated State | Delay | Duration |
|---------|--------------|----------------|-------|----------|
| Journey Complete Badge | opacity: 0, scale: 0.9 | opacity: 1, scale: 1 | 0.2s | 1.0s |
| Section Title | opacity: 0, y: 30 | opacity: 1, y: 0 | 0.4s | 0.8s |
| Section Subtitle | opacity: 0, y: 20 | opacity: 1, y: 0 | 0.6s | 0.8s |
| Package Card 1 | opacity: 0, y: 30 | opacity: 1, y: 0 | 0.2s | 0.6s |
| Package Card 2 | opacity: 0, y: 30 | opacity: 1, y: 0 | 0.3s | 0.6s |
| Package Card 3 | opacity: 0, y: 30 | opacity: 1, y: 0 | 0.4s | 0.6s |
| Contact Form | opacity: 0, y: 20 | opacity: 1, y: 0 | 0.4s | 0.8s |
| Contact Method 1-N | opacity: 0, scale: 0.9 | opacity: 1, scale: 1 | 0.6s + (index × 0.1s) | 0.6s |
| Footer CTA | opacity: 0, y: 20 | opacity: 1, y: 0 | 1.0s | 0.8s |

#### Form State Management
- **States**: idle, loading, success, error
- **Validation**: Required fields marked with *
- **Feedback**: Success message displays for 3 seconds after submission
- **UX**: Disabled state during loading, checkmark on success

#### Technical Notes
- **No Pinning** - Standard scroll section
- **Parallax**: Background at speed 0.3 (ParallaxImage component)
- **Intersection Observer**: Threshold 0.3 (30% visible triggers)
- **Conditional Rendering**: Star particles only render when in view (performance)
- **Data Sources**: SAFARI_PACKAGES, CONTACT_METHODS from `/data/safariPackages.ts`
- **Atmosphere**: Night atmospheric overlay with star particles
- **Accessibility**: Form labels, ARIA attributes, keyboard accessible

---

## Global Configuration

### Height Calculation System

```typescript
// Base heights (desktop)
const BASE_HEIGHTS = {
  preDawn: 100,
  morningDrive: 1680,
  wildlifeEncounters: 250,
  accommodations: 300,
  dining: 80,
  experiences: 80,
  location: 80,
  contact: 80,
};

// Mobile multiplier
const MOBILE_MULTIPLIER = 1.2; // 20% increase

// Viewport detection
const isMobile = window.innerWidth < 768;
```

### Position Calculation

Chapters are positioned sequentially:
```typescript
currentPosition = 0;
for (chapter in chapters) {
  chapter.start = currentPosition;
  chapter.end = currentPosition + chapter.height;
  currentPosition = chapter.end;
}
```

---

## Animation Patterns Summary

### 1. **GSAP Pinning** (Morning Drive, Wildlife Encounters, Accommodations)
- Pin section at viewport top
- Manually control animations via scroll progress
- Requires explicit pinSpacing and anticipatePin
- Best for complex multi-phase animations

### 2. **Framer Motion whileInView** (Dining, Experiences)
- Trigger animations when element enters viewport
- Simpler setup, no manual scroll calculations
- Best for fade-ins and sequential reveals
- Uses viewport threshold (typically 20-30%)

### 3. **Intersection Observer + Motion** (Location)
- Custom hook for viewport detection
- Full control over animation state
- Best for complex sections with many elements
- Allows conditional animation based on scroll direction

### 4. **Static with Immediate Animations** (Pre-Dawn)
- No scroll-linked animations
- Time-based animations on mount
- Best for hero sections

---

## Scroll Performance Optimizations

### 1. **Lazy Loading**
- Chapters 2-8 use Next.js dynamic imports
- PreDawnHero loads immediately (hero)

### 2. **Image Optimization**
- OptimizedImage component with next/image
- Priority loading for critical images
- Responsive srcsets based on viewport

### 3. **Debouncing**
- Resize handlers debounced (150ms)
- Prevents excessive recalculations

### 4. **ScrollTrigger Refresh**
- Called on viewport changes
- Recalculates all trigger positions

### 5. **Will-change Properties**
- Applied to animated elements in CSS
- Optimizes GPU acceleration

---

## Accessibility Features

### 1. **Screen Readers**
- Aria-live regions for animation announcements
- Heading hierarchy (h2 → h3)
- Semantic HTML5 sections

### 2. **Reduced Motion**
- Detects `prefers-reduced-motion: reduce`
- Disables/simplifies animations
- Shows final states immediately

### 3. **Keyboard Navigation**
- Tab indices on interactive elements
- Skip links to next section
- Focus management

### 4. **ARIA Labels**
- Descriptive labels on all interactive elements
- Role attributes for custom controls
- Alt text on all images

---

## Common Issues & Solutions

### Issue 1: Animations Not Triggering
**Cause**: ScrollTrigger positions not calculated correctly
**Solution**: Call `ScrollTrigger.refresh()` after DOM updates

### Issue 2: Jumpy Scroll on Mobile
**Cause**: Pin spacing calculation incorrect
**Solution**: Set `anticipatePin: 1` and ensure correct height calculations

### Issue 3: Text Disappearing Too Early
**Cause**: Progress calculation doesn't account for scroll buffer
**Solution**: Add defensive bounds checking with Math.max/min

### Issue 4: Horizontal Scroll Not Smooth
**Cause**: Missing `invalidateOnRefresh: true`
**Solution**: Add to ScrollTrigger config to recalculate on resize

---

## File References

### Core Files
- Chapter configs: [src/data/chapters.ts](src/data/chapters.ts)
- Type definitions: `src/types/chapter.ts`

### Chapter Components
- PreDawn: [src/components/chapters/PreDawnHero/PreDawnHero.tsx](src/components/chapters/PreDawnHero/PreDawnHero.tsx)
- Morning Drive: [src/components/chapters/MorningDriveChapter/MorningDriveChapter.tsx](src/components/chapters/MorningDriveChapter/MorningDriveChapter.tsx)
- Wildlife: [src/components/chapters/WildlifeEncountersChapter/WildlifeEncountersChapter.tsx](src/components/chapters/WildlifeEncountersChapter/WildlifeEncountersChapter.tsx)
- Accommodations: [src/components/chapters/AccommodationsChapter/AccommodationsChapter.tsx](src/components/chapters/AccommodationsChapter/AccommodationsChapter.tsx)
- Dining: [src/components/chapters/DiningChapter/DiningChapter.tsx](src/components/chapters/DiningChapter/DiningChapter.tsx)
- Experiences: [src/components/chapters/ExperiencesChapter/ExperiencesChapter.tsx](src/components/chapters/ExperiencesChapter/ExperiencesChapter.tsx)
- Location: [src/components/chapters/LocationChapter/LocationChapter.tsx](src/components/chapters/LocationChapter/LocationChapter.tsx)
- Contact: [src/components/chapters/PlanSafariChapter/PlanSafariChapter.tsx](src/components/chapters/PlanSafariChapter/PlanSafariChapter.tsx)

### Hooks
- `src/hooks/useParallax.ts`
- `src/hooks/useChapterProgress.ts`
- `src/hooks/useAccommodationsPinning.ts`

### Data
- `src/data/wildlife.ts`
- `src/data/images.ts`
- `src/data/locationData.ts`

---

## Next Steps for Development

When modifying chapters:

1. **Check scroll distances** - Ensure new content fits within allocated vh
2. **Test mobile** - Verify 20% height increase accommodates content
3. **Refresh ScrollTrigger** - Call after DOM changes
4. **Test accessibility** - Verify screen reader announcements and keyboard nav
5. **Optimize images** - Use OptimizedImage with appropriate sizes
6. **Monitor performance** - Check frame rates during scroll
7. **Update this doc** - Keep documentation in sync with code changes

---

**Last Updated**: 2025-11-19
**Document Version**: 1.0
**Status**: ✅ Complete - All 8 chapters fully documented

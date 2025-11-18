# Design Document

## Overview

The Safari Scroll Restoration feature restores the original immersive scroll experience for the Amboseli Safari Club website. The design creates a cinematic journey that begins with a dawn scene on page load and progresses through a full safari day as users scroll. The experience emphasizes parallax effects, smooth time-of-day transitions, and high-quality imagery to create an emotional connection with visitors.

The restoration focuses on simplifying the current 9-chapter structure while maintaining the core storytelling elements: dawn scene on load, smooth scrolling through morning activities, accommodations, dining, experiences, location map, and contact information. The design leverages existing components while optimizing the scroll experience for performance and engagement.

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────┐
│                    Browser Window                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Pill Navigation (Sticky)                  │  │
│  │  [Accommodations] [Dining] [Experiences] [Contact]│  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │                                                    │  │
│  │         Dawn Scene (Loads Immediately)            │  │
│  │    - Mount Kilimanjaro silhouette                 │  │
│  │    - Pre-dawn gradient background                 │  │
│  │    - Star particles                               │  │
│  │    - Hero content with countdown                  │  │
│  │                                                    │  │
│  └───────────────────────────────────────────────────┘  │
│                         ↓ Scroll                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Morning Drive (Parallax Layers)           │  │
│  │    - Background: Kilimanjaro (0.3x speed)         │  │
│  │    - Midground: Acacia trees (0.6x speed)         │  │
│  │    - Foreground: Wildlife cards (1.0x speed)      │  │
│  └───────────────────────────────────────────────────┘  │
│                         ↓ Scroll                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Accommodations Section                    │  │
│  │    - Room cards with parallax images              │  │
│  │    - Atmospheric gradient: midday colors          │  │
│  └───────────────────────────────────────────────────┘  │
│                         ↓ Scroll                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Dining Section                            │  │
│  │    - Restaurant cards with parallax               │  │
│  │    - Atmospheric gradient: afternoon colors       │  │
│  └───────────────────────────────────────────────────┘  │
│                         ↓ Scroll                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Experiences Section                       │  │
│  │    - Experience cards with parallax               │  │
│  │    - Atmospheric gradient: golden hour            │  │
│  └───────────────────────────────────────────────────┘  │
│                         ↓ Scroll                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Location Map Section                      │  │
│  │    - Interactive map component                    │  │
│  │    - Distance and travel information              │  │
│  │    - Atmospheric gradient: twilight               │  │
│  └───────────────────────────────────────────────────┘  │
│                         ↓ Scroll                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Contact Section                           │  │
│  │    - Contact information cards                    │  │
│  │    - Booking inquiry form                         │  │
│  │    - Atmospheric gradient: night                  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
HomePage
├── CinematicJourney (Container)
│   ├── AtmosphericBackground (Dynamic gradient layer)
│   ├── PreDawnHero (Chapter 1 - Dawn)
│   │   ├── ParallaxImage (Background)
│   │   ├── AtmosphericParticles (Stars)
│   │   ├── CountdownTimer
│   │   └── CTAButtons
│   ├── MorningDriveChapter (Chapter 2)
│   │   ├── ParallaxContainer (3 layers)
│   │   ├── WildlifeCards
│   │   └── AtmosphericParticles (Dust)
│   ├── AccommodationsChapter (Chapter 3)
│   │   ├── RoomCards (with parallax images)
│   │   └── ComparisonBar
│   ├── DiningChapter (Chapter 4)
│   │   └── RestaurantCards (with parallax)
│   ├── ExperiencesChapter (Chapter 5)
│   │   └── ExperienceCards (with parallax)
│   ├── LocationChapter (Chapter 6)
│   │   ├── InteractiveMap
│   │   └── TravelInformation
│   └── ContactSection (Chapter 7)
│       ├── ContactInfoCards
│       └── BookingInquiryForm
├── PillNavigation (Existing - Update Items Only)
│   └── Navigation Items (Updated)
│       ├── Accommodations → #accommodations
│       ├── Dining → #dining
│       ├── Experiences → #experiences
│       └── Contact Us → #contact
├── ScrollProgressIndicator
└── WhatsAppChatBubble
```

### Data Flow

```
User Scroll Event
      ↓
SafariProgressProvider (Context)
      ↓
Calculate scroll position (vh)
      ↓
Determine current chapter
      ↓
Update time-of-day state
      ↓
Trigger atmospheric gradient transition
      ↓
Update parallax layer positions
      ↓
Highlight active navigation pill
      ↓
Render updated UI
```

## Components and Interfaces

### Core Components

#### 1. CinematicJourney (Modified)

**Purpose**: Orchestrates the scroll experience and manages atmospheric transitions

**Props**:
```typescript
interface CinematicJourneyProps {
  chapters?: ChapterConfig[];
  enableParallax?: boolean;
  enableAtmosphericEffects?: boolean;
}
```

**Key Responsibilities**:
- Render chapter components in sequence
- Apply atmospheric gradient backgrounds based on scroll position
- Manage time-of-day transitions
- Coordinate with SafariProgressProvider for state management

**Modifications**:
- Simplify from 9 chapters to 7 core sections
- Enhance atmospheric gradient transitions (1.5s → 2.0s for smoother effect)
- Add support for multi-layer parallax backgrounds

#### 2. PillNavigation (Modified Existing Component)

**Purpose**: Update existing pill navigation to display page section links

**Changes Required**:
- Update navigation items to match main page sections: Accommodations, Dining, Experiences, Contact Us
- Keep all existing functionality, layout, and styling unchanged
- Maintain existing pill shape, active states, and scroll behavior

**Navigation Items**:
```typescript
const navigationItems = [
  { id: 'accommodations', label: 'Accommodations', href: '#accommodations' },
  { id: 'dining', label: 'Dining', href: '#dining' },
  { id: 'experiences', label: 'Experiences', href: '#experiences' },
  { id: 'contact', label: 'Contact Us', href: '#contact' },
];
```

**No Visual or Structural Changes**: The existing pill navigation component remains exactly as designed, only the navigation item labels and links are updated.

#### 3. ParallaxContainer (Enhanced)

**Purpose**: Manages multi-layer parallax effects for depth perception

**Props**:
```typescript
interface ParallaxContainerProps {
  children: React.ReactNode;
  layers?: number; // Default: 3
  baseSpeed?: number; // Default: 0.3
}
```

**Layer Configuration**:
```typescript
const PARALLAX_LAYERS = {
  background: 0.3,  // Slowest (mountains, sky)
  midground: 0.6,   // Medium (trees, terrain)
  foreground: 1.0,  // Normal scroll speed (content)
};
```

**Implementation**:
- Use `transform: translateY()` for GPU acceleration
- Calculate offset based on scroll position and layer speed
- Apply `will-change: transform` during scroll
- Remove `will-change` when scroll stops (performance)

#### 4. AtmosphericBackground (Enhanced)

**Purpose**: Renders dynamic gradient backgrounds that transition with time-of-day

**Props**:
```typescript
interface AtmosphericBackgroundProps {
  startColor: string;
  endColor: string;
  transitionDuration?: number; // Default: 2000ms
}
```

**Time-of-Day Gradients**:
```typescript
const TIME_OF_DAY_GRADIENTS = {
  'pre-dawn': ['#0a0e27', '#1a1f3a'],
  'dawn': ['#ff6b35', '#f7931e'],
  'morning': ['#ffd89b', '#19547b'],
  'midday': ['#87ceeb', '#f0e68c'],
  'afternoon': ['#ffa500', '#ff6347'],
  'golden-hour': ['#ff8c00', '#ff4500'],
  'twilight': ['#2c3e50', '#3498db'],
  'night': ['#0f2027', '#203a43'],
};
```

#### 5. ChapterSection (Wrapper)

**Purpose**: Standardized wrapper for each chapter with consistent spacing and parallax support

**Props**:
```typescript
interface ChapterSectionProps {
  id: string;
  title: string;
  timeOfDay: TimeOfDay;
  heightVh: number;
  enableParallax?: boolean;
  children: React.ReactNode;
}
```

### Modified Existing Components

#### PreDawnHero (Enhanced)

**Changes**:
- Ensure immediate render on page load (no lazy loading)
- Optimize image loading with `priority={true}`
- Add subtle zoom animation (1.0 → 1.05 scale over 15 seconds)
- Enhance star particle density (40 → 60 particles)

#### MorningDriveChapter (Enhanced)

**Changes**:
- Implement 3-layer parallax:
  - Layer 1: Kilimanjaro background (0.3x)
  - Layer 2: Acacia trees (0.6x)
  - Layer 3: Wildlife cards (1.0x)
- Add dust particle effects
- Enhance wildlife card hover interactions

#### AccommodationsChapter (Simplified)

**Changes**:
- Focus on room cards with parallax images
- Remove complex comparison modals
- Add direct "Check Availability" CTAs

#### DiningChapter (Simplified)

**Changes**:
- Display restaurant cards with parallax backgrounds
- Simplify menu presentation
- Add "Reserve Table" CTAs

#### ExperiencesChapter (Simplified)

**Changes**:
- Display experience cards with parallax
- Focus on core safari activities
- Add "Book Experience" CTAs

#### LocationChapter (Enhanced)

**Changes**:
- Integrate InteractiveMap component
- Display distance from Nairobi (365km, 3-4 hours)
- Show proximity to Kimana Gate
- Add Mount Kilimanjaro views indicator

#### ContactSection (New)

**Purpose**: Final chapter with contact information and booking inquiry

**Components**:
- ContactInfoCards (email, phone, WhatsApp, social media)
- BookingInquiryForm
- Trust indicators (certifications, reviews)

## Data Models

### ChapterConfig (Modified)

```typescript
interface ChapterConfig {
  id: string;
  number: number;
  title: string;
  timeOfDay: TimeOfDay;
  heightVh: number;
  startVh: number;
  endVh: number;
  component: React.ComponentType<BaseChapterProps>;
  atmosphericEffects: AtmosphericEffects;
  parallaxLayers?: ParallaxLayerConfig[];
}

type TimeOfDay = 
  | 'pre-dawn' 
  | 'dawn' 
  | 'morning' 
  | 'midday' 
  | 'afternoon' 
  | 'golden-hour' 
  | 'twilight' 
  | 'night';

interface AtmosphericEffects {
  particles?: 'stars' | 'dust' | 'fireflies';
  colorGradient: [string, string];
  cursor?: 'default' | 'binoculars';
}

interface ParallaxLayerConfig {
  id: string;
  speed: number; // 0.0 - 1.0
  zIndex: number;
}
```

### NavigationItem

```typescript
interface NavigationItem {
  id: string;
  label: string;
  href: string;
  sectionId: string;
}
```

### SafariProgressState (Modified)

```typescript
interface SafariProgressState {
  scrollPosition: number; // in vh
  currentChapter: ChapterConfig | null;
  timeOfDay: TimeOfDay;
  scrollPercentage: number; // 0-100
  isScrolling: boolean;
  scrollVelocity: number;
}
```

## Error Handling

### Image Loading Failures

**Strategy**: Progressive enhancement with fallbacks

```typescript
// Image component with fallback
<Image
  src={primaryImage}
  alt={altText}
  onError={(e) => {
    e.currentTarget.src = fallbackImage;
  }}
  priority={isHero}
  quality={isHero ? 90 : 85}
/>
```

**Fallback Images**:
- Hero: Solid gradient background with logo
- Chapter backgrounds: Time-appropriate gradient
- Wildlife cards: Placeholder with animal icon

### Parallax Performance Issues

**Detection**:
```typescript
const hasGoodPerformance = () => {
  // Check if device can handle parallax
  const isMobile = window.innerWidth < 768;
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  
  return !isMobile && !prefersReducedMotion;
};
```

**Fallback**: Disable parallax, use simple fade-in animations

### Scroll Performance Degradation

**Monitoring**:
```typescript
let lastFrameTime = performance.now();
let frameCount = 0;

const checkScrollPerformance = () => {
  const currentTime = performance.now();
  const deltaTime = currentTime - lastFrameTime;
  
  if (deltaTime > 16.67) { // Below 60fps
    // Reduce particle count
    // Simplify parallax calculations
    // Disable non-essential animations
  }
  
  lastFrameTime = currentTime;
};
```

### Navigation Failures

**Smooth Scroll Fallback**:
```typescript
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  
  if (!element) {
    console.error(`Section ${sectionId} not found`);
    return;
  }
  
  // Try smooth scroll
  try {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    // Fallback to instant scroll
    element.scrollIntoView({ block: 'start' });
  }
};
```

## Testing Strategy

### Unit Tests

**Components to Test**:
1. PillNavigation
   - Active state updates correctly
   - Click handlers trigger scroll
   - Visibility toggles after scroll threshold

2. ParallaxContainer
   - Layer offsets calculate correctly
   - Performance optimizations apply on mobile
   - Reduced motion preference respected

3. AtmosphericBackground
   - Gradient transitions smoothly
   - Colors update based on time-of-day
   - CSS custom properties set correctly

### Integration Tests

**Scenarios**:
1. Full scroll journey
   - Dawn scene loads immediately
   - All chapters render in sequence
   - Atmospheric gradients transition smoothly
   - Navigation pills highlight correctly

2. Navigation interaction
   - Clicking pill scrolls to section
   - Active state updates
   - Smooth scroll animation works

3. Parallax effects
   - Layers move at correct speeds
   - Performance remains smooth
   - Mobile fallbacks work

### Performance Tests

**Metrics to Measure**:
- First Contentful Paint (target: < 1.5s)
- Largest Contentful Paint (target: < 2.5s)
- Scroll frame rate (target: 60fps desktop, 30fps mobile)
- Time to Interactive (target: < 3.5s)
- Cumulative Layout Shift (target: < 0.1)

**Tools**:
- Lighthouse CI
- Chrome DevTools Performance panel
- WebPageTest
- Real device testing (iOS Safari, Chrome Android)

### Accessibility Tests

**Checks**:
1. Keyboard navigation
   - Tab through all interactive elements
   - Enter/Space activate buttons
   - Escape closes modals

2. Screen reader compatibility
   - Semantic HTML structure
   - ARIA labels present
   - Heading hierarchy correct

3. Reduced motion
   - Parallax disabled
   - Smooth scroll disabled
   - Fade-in animations simplified

4. Color contrast
   - Text meets WCAG 2.1 AA (4.5:1)
   - Interactive elements distinguishable
   - Focus indicators visible

### Browser Compatibility Tests

**Target Browsers**:
- Chrome 120+ (desktop & mobile)
- Safari 17+ (desktop & iOS)
- Firefox 120+
- Edge 120+

**Test Cases**:
- Parallax effects render correctly
- Smooth scroll works
- Gradient transitions smooth
- Image loading optimized
- Touch interactions work (mobile)

## Performance Optimization

### Image Optimization

**Strategy**:
```typescript
// Hero images (critical)
<Image
  src="/images/hero/dawn.jpg"
  alt="Dawn at Amboseli"
  priority={true}
  quality={90}
  sizes="100vw"
  format="webp"
/>

// Chapter backgrounds (lazy load)
<Image
  src="/images/chapters/morning.jpg"
  alt="Morning safari"
  loading="lazy"
  quality={85}
  sizes="(max-width: 768px) 100vw, 50vw"
  format="webp"
/>
```

**Formats**:
- Primary: WEBP (smaller file size)
- Fallback: JPEG (universal support)
- Hero: 1920x1080 @ 90 quality
- Chapters: 1600x900 @ 85 quality
- Mobile: 800x600 @ 80 quality

### Code Splitting

**Dynamic Imports**:
```typescript
// Lazy load non-critical chapters
const AccommodationsChapter = dynamic(
  () => import('@/components/chapters/AccommodationsChapter'),
  { loading: () => <ChapterSkeleton /> }
);

const DiningChapter = dynamic(
  () => import('@/components/chapters/DiningChapter'),
  { loading: () => <ChapterSkeleton /> }
);
```

**Bundle Analysis**:
- Hero + Dawn: Load immediately
- Chapters 2-3: Load on scroll (viewport + 1)
- Chapters 4-7: Load on demand

### Scroll Performance

**Optimization Techniques**:

1. **Throttle scroll listeners**:
```typescript
const throttledScrollHandler = throttle(() => {
  updateScrollPosition();
  updateParallaxLayers();
}, 16); // ~60fps
```

2. **Use requestAnimationFrame**:
```typescript
let ticking = false;

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
};
```

3. **GPU acceleration**:
```css
.parallaxLayer {
  transform: translate3d(0, 0, 0);
  will-change: transform;
}
```

4. **Reduce mobile complexity**:
```typescript
const parallaxSpeed = isMobile ? speed * 0.5 : speed;
const particleCount = isMobile ? 20 : 40;
```

### Memory Management

**Cleanup Strategy**:
```typescript
useEffect(() => {
  const handleScroll = () => {
    // Scroll logic
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
    // Clear any intervals/timeouts
    // Remove will-change properties
  };
}, []);
```

## Accessibility Considerations

### Reduced Motion Support

**Implementation**:
```typescript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  // Disable parallax
  // Disable particle animations
  // Use instant scroll instead of smooth
  // Simplify transitions to fade-in only
}
```

**CSS**:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .parallaxLayer {
    transform: none !important;
  }
}
```

### Keyboard Navigation

**Requirements**:
- All interactive elements focusable
- Logical tab order (top to bottom)
- Visible focus indicators
- Skip-to-content link for long scroll

**Implementation**:
```typescript
// Skip to content link
<a href="#main-content" className="skip-link">
  Skip to main content
</a>

// Focus management for navigation
const handlePillClick = (sectionId: string) => {
  scrollToSection(sectionId);
  
  // Move focus to section heading
  const heading = document.querySelector(`#${sectionId} h2`);
  if (heading) {
    heading.focus();
  }
};
```

### Screen Reader Support

**Semantic HTML**:
```html
<main id="main-content">
  <section 
    id="pre-dawn" 
    aria-labelledby="pre-dawn-heading"
    aria-describedby="pre-dawn-description"
  >
    <h2 id="pre-dawn-heading">Opening December 2025</h2>
    <p id="pre-dawn-description" class="sr-only">
      Experience the dawn at Amboseli Safari Club with views of Mount Kilimanjaro
    </p>
    <!-- Content -->
  </section>
</main>
```

**ARIA Labels**:
```typescript
<nav aria-label="Main navigation">
  <button 
    aria-label="Navigate to Accommodations section"
    aria-current={activeSection === 'accommodations' ? 'true' : 'false'}
  >
    Accommodations
  </button>
</nav>
```

## Mobile Optimization

### Responsive Chapter Heights

**Desktop vs Mobile**:
```typescript
const getChapterHeight = (baseHeight: number, isMobile: boolean) => {
  return isMobile ? baseHeight * 1.2 : baseHeight;
};

// Example
const CHAPTER_CONFIGS = [
  {
    id: 'pre-dawn',
    heightVh: isMobile ? 100 : 80,
    // ...
  },
  {
    id: 'morning-drive',
    heightVh: isMobile ? 140 : 110,
    // ...
  },
];
```

### Touch Interactions

**Swipe Support**:
```typescript
const handleTouchStart = (e: TouchEvent) => {
  touchStartY = e.touches[0].clientY;
};

const handleTouchEnd = (e: TouchEvent) => {
  const touchEndY = e.changedTouches[0].clientY;
  const swipeDistance = touchStartY - touchEndY;
  
  if (Math.abs(swipeDistance) > 50) {
    // Swipe detected
    if (swipeDistance > 0) {
      // Swipe up - scroll to next chapter
      scrollToNextChapter();
    } else {
      // Swipe down - scroll to previous chapter
      scrollToPreviousChapter();
    }
  }
};
```

### Performance Adjustments

**Mobile-Specific Optimizations**:
```typescript
const MOBILE_OPTIMIZATIONS = {
  parallaxIntensity: 0.5, // 50% of desktop
  particleCount: 20, // 50% of desktop
  imageQuality: 80, // Lower quality
  disableComplexEffects: true,
  simplifyGradients: true,
};
```

## Design Tokens

### Color Palette

```css
:root {
  /* Safari Palette */
  --safari-dawn: #FFA85C;
  --safari-gold: #D4AF37;
  --safari-earth: #8B6F47;
  --safari-sage: #8FB390;
  --safari-dusk: #E85D54;
  --safari-night: #2C3E50;
  
  /* Neutrals */
  --sand-light: #F5E6D3;
  --sand: #D4B896;
  --stone: #8B8B8B;
  --charcoal: #333333;
  
  /* Atmospheric Gradients */
  --gradient-pre-dawn: linear-gradient(to bottom, #0a0e27, #1a1f3a);
  --gradient-dawn: linear-gradient(to bottom, #ff6b35, #f7931e);
  --gradient-morning: linear-gradient(to bottom, #ffd89b, #19547b);
  --gradient-midday: linear-gradient(to bottom, #87ceeb, #f0e68c);
  --gradient-afternoon: linear-gradient(to bottom, #ffa500, #ff6347);
  --gradient-golden-hour: linear-gradient(to bottom, #ff8c00, #ff4500);
  --gradient-twilight: linear-gradient(to bottom, #2c3e50, #3498db);
  --gradient-night: linear-gradient(to bottom, #0f2027, #203a43);
}
```

### Typography

```css
:root {
  /* Font Families */
  --font-display: 'Playfair Display', serif;
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Open Sans', sans-serif;
  
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  --text-6xl: 3.75rem;   /* 60px */
}
```

### Spacing

```css
:root {
  --space-chapter: 100vh;
  --space-section: 5rem;
  --space-component: 3rem;
  --space-element: 1.5rem;
}
```

### Animation Timing

```css
:root {
  --transition-fast: 0.2s;
  --transition-base: 0.3s;
  --transition-slow: 0.6s;
  --transition-atmospheric: 2.0s;
  
  --easing-default: cubic-bezier(0.4, 0.0, 0.2, 1);
  --easing-smooth: cubic-bezier(0.4, 0.0, 0.6, 1);
  --easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

## Implementation Notes

### Priority Order

1. **Phase 1**: Restore dawn scene and basic scroll structure
   - Ensure PreDawnHero loads immediately
   - Simplify chapter structure to 7 sections
   - Implement basic atmospheric gradients

2. **Phase 2**: Implement parallax effects
   - Add ParallaxContainer component
   - Apply 3-layer parallax to MorningDriveChapter
   - Add parallax to other chapter backgrounds

3. **Phase 3**: Add pill navigation
   - Create PillNavigation component
   - Implement smooth scroll to sections
   - Add active state highlighting

4. **Phase 4**: Optimize performance
   - Implement lazy loading
   - Add mobile optimizations
   - Test and refine scroll performance

5. **Phase 5**: Polish and accessibility
   - Add reduced motion support
   - Enhance keyboard navigation
   - Test screen reader compatibility

### Technical Constraints

- Must maintain 60fps on desktop during scroll
- Must maintain 30fps on mobile during scroll
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Total bundle size < 500KB (excluding images)
- Image optimization: WEBP with JPEG fallback
- Browser support: Chrome 120+, Safari 17+, Firefox 120+, Edge 120+

### Dependencies

**Existing**:
- Next.js 14.2.0+
- React 18.0.0+
- Framer Motion 11.0.0+
- TypeScript 5.3.0+

**No New Dependencies Required**: All functionality can be implemented with existing dependencies

## Conclusion

This design restores the original safari scroll experience with a focus on immediate dawn scene loading, smooth parallax effects, and intuitive pill navigation. The architecture leverages existing components while simplifying the chapter structure for better performance and engagement. The design prioritizes mobile optimization, accessibility, and performance to create a cinematic journey that emotionally connects visitors with the Amboseli Safari Club experience.

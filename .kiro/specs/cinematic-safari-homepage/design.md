# Design Document: Cinematic Safari Homepage

## Overview

The Cinematic Safari Homepage transforms the Amboseli Safari Club landing page into an immersive, scroll-driven storytelling experience. The design leverages the existing infrastructure (SmoothScrollProvider, SafariProgressProvider) and extends it with 12 distinct chapter components that create a cohesive narrative journey from pre-dawn to nighttime.

### Design Principles

1. **Progressive Disclosure**: Each chapter reveals information gradually, building anticipation
2. **Emotional Engagement**: Visual storytelling that connects visitors emotionally before presenting facts
3. **Performance First**: Lazy loading, optimized images, and efficient animations
4. **Mobile Responsive**: Adaptive layouts that maintain impact across all devices
5. **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support

### Key Design Goals

- Create an immersive 12-chapter scroll experience (approximately 1900vh total height)
- Maintain smooth 60fps scrolling performance
- Integrate seamlessly with existing Next.js 14 App Router architecture
- Leverage existing Framer Motion animations and Lenis smooth scroll
- Provide clear pathways to detail pages through strategic CTAs
- Support both desktop and mobile experiences with adaptive content

## Architecture

### High-Level Component Structure

```
HomePage (page.tsx)
├── SafariProgressProvider (existing)
├── SmoothScrollProvider (existing)
└── CinematicJourney (new container)
    ├── ScrollProgressIndicator (new)
    ├── StickyNavigation (new)
    ├── PreDawnHero (Chapter 1)
    ├── SunriseChapter (Chapter 2)
    ├── MorningDriveChapter (Chapter 3)
    ├── BushBreakfastChapter (Chapter 4)
    ├── AccommodationsChapter (Chapter 5)
    ├── DiningChapter (Chapter 6)
    ├── ExperiencesChapter (Chapter 7)
    ├── WellnessChapter (Chapter 8)
    ├── GuestStoriesChapter (Chapter 9)
    ├── LocationChapter (Chapter 10)
    ├── JournalChapter (Chapter 11)
    ├── PlanSafariChapter (Chapter 12)
    └── WhatsAppChatBubble (new)
```

### Technology Stack Integration


- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + CSS Modules for component-specific styles
- **Animations**: Framer Motion for entrance/exit animations
- **Smooth Scroll**: Lenis (already integrated via SmoothScrollProvider)
- **Progress Tracking**: Custom SafariProgressProvider (already exists)
- **Image Optimization**: Next.js Image component with lazy loading
- **Type Safety**: TypeScript with strict mode

### File Structure

```
src/
├── app/
│   └── (marketing)/
│       └── page.tsx (refactored to use CinematicJourney)
├── components/
│   ├── chapters/ (new)
│   │   ├── PreDawnHero/
│   │   │   ├── PreDawnHero.tsx
│   │   │   └── PreDawnHero.module.css
│   │   ├── SunriseChapter/
│   │   ├── MorningDriveChapter/
│   │   ├── BushBreakfastChapter/
│   │   ├── AccommodationsChapter/
│   │   ├── DiningChapter/
│   │   ├── ExperiencesChapter/
│   │   ├── WellnessChapter/
│   │   ├── GuestStoriesChapter/
│   │   ├── LocationChapter/
│   │   ├── JournalChapter/
│   │   └── PlanSafariChapter/
│   ├── organisms/
│   │   └── CinematicJourney/
│   │       ├── CinematicJourney.tsx
│   │       └── CinematicJourney.module.css
│   ├── molecules/
│   │   ├── ScrollProgressIndicator/
│   │   ├── StickyNavigation/
│   │   ├── WhatsAppChatBubble/
│   │   ├── WildlifeCard/
│   │   ├── ExperienceCard/
│   │   └── TestimonialCarousel/
│   └── atoms/
│       ├── ParallaxImage/
│       ├── AnimatedCursor/
│       └── AtmosphericParticles/
├── hooks/
│   ├── useScrollPosition.ts (existing)
│   ├── useInView.ts (existing)
│   ├── useParallax.ts (new)
│   └── useChapterProgress.ts (new)
├── types/
│   └── chapter.ts (new)
└── data/
    └── chapters.ts (new - chapter metadata)
```

## Components and Interfaces

### Core Container: CinematicJourney

**Purpose**: Orchestrates all 12 chapters and manages global scroll state

**Props Interface**:
```typescript
interface CinematicJourneyProps {
  // No props needed - self-contained
}
```

**Responsibilities**:
- Render all 12 chapter components in sequence
- Manage atmospheric transitions between chapters
- Coordinate with SafariProgressProvider for progress tracking
- Handle responsive layout adjustments


### Base Chapter Component Pattern

All chapter components follow a consistent pattern:

**Base Props Interface**:
```typescript
interface BaseChapterProps {
  id: string;
  className?: string;
}

interface ChapterMetadata {
  id: string;
  title: string;
  timeOfDay: TimeOfDay;
  heightVh: number; // viewport height units
  startVh: number;  // starting position
  endVh: number;    // ending position
}
```

**Common Features**:
- Parallax background images
- Scroll-triggered animations
- Time-of-day atmospheric styling
- Responsive layout
- Lazy-loaded images
- Accessibility attributes

### Chapter 1: PreDawnHero

**Purpose**: Capture attention immediately with cinematic hero section

**Props Interface**:
```typescript
interface PreDawnHeroProps extends BaseChapterProps {
  backgroundImage: string;
  backgroundVideo?: string;
  logo: string;
  tagline: string;
  primaryCTA: CTAButton;
  secondaryCTA: CTAButton;
}

interface CTAButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
}
```

**Visual Design**:
- Full viewport height (100vh)
- Dark, pre-dawn color palette (#0a0e27 to #1a1f3a)
- Subtle star field animation
- Mount Kilimanjaro silhouette with gradient sky
- Centered logo with fade-in animation
- Dual CTAs with hover effects
- Scroll indicator at bottom

**Interactions**:
- Logo fades in (0.8s delay)
- Tagline types in effect (1.2s delay)
- CTAs slide up (1.6s delay)
- Parallax on background (0.3x scroll speed)
- Scroll indicator pulses

### Chapter 2: SunriseChapter

**Purpose**: Convey the beginning of the safari adventure

**Props Interface**:
```typescript
interface SunriseChapterProps extends BaseChapterProps {
  backgroundImage: string;
  jeepImage: string;
  message: string;
}
```

**Visual Design**:
- Height: 100vh (100vh-200vh range)
- Warm golden gradient (#ff6b35 to #f7931e)
- Safari jeep in foreground with parallax
- Sun rising animation
- Warm color temperature filter

**Interactions**:
- Sun rises as user scrolls (0-100% of chapter)
- Jeep moves slightly with parallax (0.5x speed)
- Message fades in when 30% visible
- Color temperature warms progressively


### Chapter 3: MorningDriveChapter

**Purpose**: Showcase wildlife encounters with interactive elements

**Props Interface**:
```typescript
interface MorningDriveChapterProps extends BaseChapterProps {
  backgroundImage: string;
  wildlifeCards: WildlifeCard[];
  ctaButton: CTAButton;
}

interface WildlifeCard {
  id: string;
  name: string;
  image: string;
  funFact: string;
  scientificName: string;
}
```

**Visual Design**:
- Height: 150vh (200vh-350vh range)
- Bright morning light (#ffd89b to #19547b)
- Grassland parallax background
- 3-4 wildlife cards in staggered layout
- Binocular cursor on hover
- Distance counter animation

**Interactions**:
- Cards fade in sequentially as user scrolls
- Hover reveals fun facts with zoom effect
- Cursor changes to binoculars in this section
- Distance counter increments (0-15km)
- CTA appears when 80% scrolled through chapter

### Chapter 4: BushBreakfastChapter

**Purpose**: Showcase luxury dining in nature

**Props Interface**:
```typescript
interface BushBreakfastChapterProps extends BaseChapterProps {
  backgroundImage: string;
  tableImage: string;
  menuItems: string[];
  ctaButton: CTAButton;
}
```

**Visual Design**:
- Height: 150vh (350vh-500vh range)
- Warm morning light with acacia tree silhouette
- Table setup in foreground with parallax
- Animated steam rising from coffee/food
- Elegant typography for menu items

**Interactions**:
- Steam particles animate continuously
- Menu items fade in one by one
- Table image has subtle parallax (0.6x speed)
- Bird sounds intensify (optional audio)
- CTA slides in from bottom

### Chapter 5: AccommodationsChapter

**Purpose**: Preview room options with immersive visuals

**Props Interface**:
```typescript
interface AccommodationsChapterProps extends BaseChapterProps {
  rooms: RoomPreview[];
  ctaButton: CTAButton;
}

interface RoomPreview {
  id: string;
  name: string;
  image: string;
  viewImage: string; // "view from window"
  tagline: string;
  price: string;
}
```

**Visual Design**:
- Height: 200vh (500vh-700vh range)
- Midday lighting (#87ceeb to #f0e68c)
- 2-3 room cards with large imagery
- Split-screen layout on desktop
- Availability indicators (subtle)

**Interactions**:
- Room images have strong parallax (0.4x speed)
- Hover reveals "view from window" overlay
- Cards slide in from alternating sides
- Price fades in on hover
- CTA sticky at bottom of section


### Chapter 6: DiningChapter

**Purpose**: Showcase culinary excellence and ambiance

**Props Interface**:
```typescript
interface DiningChapterProps extends BaseChapterProps {
  backgroundImage: string;
  dishes: DishPreview[];
  winePairings: WinePairing[];
  ctaButton: CTAButton;
}

interface DishPreview {
  name: string;
  image: string;
  description: string;
}

interface WinePairing {
  wine: string;
  dish: string;
}
```

**Visual Design**:
- Height: 150vh (700vh-850vh range)
- Afternoon golden light (#ffa500 to #ff6347)
- Sundowner deck imagery
- Elegant dish presentations
- Wine pairing cards that fade in

**Interactions**:
- Dishes appear in carousel format
- Wine pairings fade in sequentially
- Chef's signature animation (optional)
- Parallax on deck imagery (0.5x speed)
- CTA with reservation time slots preview

### Chapter 7: ExperiencesChapter

**Purpose**: Showcase safari activities and packages

**Props Interface**:
```typescript
interface ExperiencesChapterProps extends BaseChapterProps {
  backgroundImage: string;
  experiences: ExperiencePreview[];
  timeline: ActivityTimeline;
  ctaButton: CTAButton;
}

interface ExperiencePreview {
  id: string;
  title: string;
  image: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
}

interface ActivityTimeline {
  morning: string[];
  afternoon: string[];
  evening: string[];
}
```

**Visual Design**:
- Height: 250vh (850vh-1100vh range)
- Golden hour lighting (#ff8c00 to #ff4500)
- Game drive scenes with dramatic lighting
- Interactive activity timeline
- Experience cards with difficulty indicators

**Interactions**:
- Timeline is interactive (click to filter)
- Experience cards flip on hover
- Difficulty badges animate in
- Parallax on background (0.3x speed)
- "Best season for..." tags appear on scroll

### Chapter 8: WellnessChapter

**Purpose**: Showcase relaxation and spa offerings

**Props Interface**:
```typescript
interface WellnessChapterProps extends BaseChapterProps {
  backgroundImage: string;
  yogaImage: string;
  spaServices: SpaService[];
  ctaButton: CTAButton;
}

interface SpaService {
  name: string;
  duration: string;
  description: string;
}
```

**Visual Design**:
- Height: 150vh (1100vh-1250vh range)
- Sunset colors with calming palette (#ff7e5f to #feb47b)
- Yoga silhouette against sunset
- Spa treatment imagery
- Breathing exercise animation

**Interactions**:
- Breathing circle animation (inhale/exhale timing)
- Yoga silhouette fades in gracefully
- Spa services appear with stagger
- Color palette shifts to calming tones
- Parallax on sunset (0.4x speed)


### Chapter 9: GuestStoriesChapter

**Purpose**: Build trust through social proof and testimonials

**Props Interface**:
```typescript
interface GuestStoriesChapterProps extends BaseChapterProps {
  testimonials: Testimonial[];
  guestPhotos: GuestPhoto[];
  videoTestimonials: VideoTestimonial[];
}

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

interface GuestPhoto {
  id: string;
  image: string;
  caption: string;
  location: string;
}

interface VideoTestimonial {
  id: string;
  thumbnail: string;
  videoUrl: string;
  guestName: string;
}
```

**Visual Design**:
- Height: 200vh (1250vh-1450vh range)
- Dusk colors (#ee9ca7 to #ffdde1)
- Testimonial carousel
- Photo wall grid
- Instagram-style story circles for videos

**Interactions**:
- Carousel auto-advances every 5s
- Story circles pulse to indicate video
- Click story circle to play video
- Photo wall has masonry layout
- Testimonials fade in with stagger

### Chapter 10: LocationChapter

**Purpose**: Show accessibility and travel logistics

**Props Interface**:
```typescript
interface LocationChapterProps extends BaseChapterProps {
  mapImage: string;
  coordinates: { lat: number; lng: number };
  distances: CityDistance[];
  transferOptions: TransferOption[];
  ctaButton: CTAButton;
}

interface CityDistance {
  city: string;
  distance: string;
  travelTime: string;
}

interface TransferOption {
  type: string;
  duration: string;
  price: string;
}
```

**Visual Design**:
- Height: 150vh (1450vh-1600vh range)
- Twilight colors (#2c3e50 to #3498db)
- Animated map reveal
- Flight path animation
- Distance markers

**Interactions**:
- Map zooms in on scroll
- Flight path draws progressively
- Distance markers pop in sequentially
- Transfer options compare on hover
- CTA links to full interactive map

### Chapter 11: JournalChapter

**Purpose**: Showcase blog content and conservation efforts

**Props Interface**:
```typescript
interface JournalChapterProps extends BaseChapterProps {
  blogPosts: BlogPost[];
  conservationStats: ConservationStat[];
  migrationData: MigrationData;
  newsletterForm: boolean;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

interface ConservationStat {
  label: string;
  value: number;
  unit: string;
  icon: string;
}

interface MigrationData {
  species: string;
  currentLocation: string;
  expectedArrival: string;
}
```

**Visual Design**:
- Height: 150vh (1600vh-1750vh range)
- Deep twilight (#34495e to #2c3e50)
- Blog post cards
- Conservation impact counters
- Migration tracker visualization

**Interactions**:
- Blog cards slide in from sides
- Conservation counters animate up
- Migration tracker updates
- Newsletter form slides in
- Latest sighting updates appear


### Chapter 12: PlanSafariChapter

**Purpose**: Final conversion push with booking options

**Props Interface**:
```typescript
interface PlanSafariChapterProps extends BaseChapterProps {
  contactForm: boolean;
  contactMethods: ContactMethod[];
  packagePreviews: PackagePreview[];
  availabilityCalendar: boolean;
}

interface ContactMethod {
  type: 'whatsapp' | 'phone' | 'email';
  value: string;
  label: string;
  icon: string;
}

interface PackagePreview {
  name: string;
  duration: string;
  priceRange: string;
  highlights: string[];
}
```

**Visual Design**:
- Height: 150vh (1750vh-1900vh range)
- Night sky with stars (#0f2027 to #203a43)
- Contact form with elegant styling
- Package cards with pricing
- Calendar heatmap for availability

**Interactions**:
- Form fields animate in sequentially
- Contact methods have hover effects
- Package cards expand on hover
- Calendar shows availability on hover
- Final CTA pulses gently

## Shared Components

### ScrollProgressIndicator

**Purpose**: Show user's position in the journey

**Visual Design**:
- Fixed position on right side (desktop) or top (mobile)
- Vertical progress bar with chapter markers
- Current chapter highlighted
- Smooth fill animation

**Interactions**:
- Click chapter marker to jump to section
- Hover shows chapter name tooltip
- Progress fills as user scrolls

### StickyNavigation

**Purpose**: Provide persistent access to main pages

**Visual Design**:
- Appears after scrolling past hero (100vh)
- Transparent background with blur effect
- Logo on left, nav links center, CTA right
- Compact height (60px)

**Interactions**:
- Fades in when scrolling down
- Hides when scrolling up (auto-hide)
- Links have hover underline effect
- CTA button has primary styling

### WhatsAppChatBubble

**Purpose**: Enable instant communication

**Visual Design**:
- Fixed bottom-right position
- WhatsApp green (#25D366)
- Floating animation
- Message count badge (if applicable)

**Interactions**:
- Pulses every 10s to draw attention
- Click opens WhatsApp chat
- Hover shows "Chat with us" tooltip


### ParallaxImage

**Purpose**: Reusable parallax image component

**Props Interface**:
```typescript
interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number; // 0-1, default 0.5
  className?: string;
  priority?: boolean;
}
```

**Implementation**:
- Uses transform: translateY based on scroll position
- Calculates offset using useParallax hook
- Lazy loads by default unless priority=true
- Supports Next.js Image optimization

### AnimatedCursor

**Purpose**: Custom cursor for specific sections

**Props Interface**:
```typescript
interface AnimatedCursorProps {
  type: 'binoculars' | 'default';
  activeInSection?: string; // chapter ID
}
```

**Implementation**:
- Replaces cursor in specified sections
- Smooth follow animation
- Hides on mobile/touch devices

### AtmosphericParticles

**Purpose**: Add environmental effects

**Props Interface**:
```typescript
interface AtmosphericParticlesProps {
  type: 'dust' | 'fireflies' | 'stars';
  density?: number; // 1-100
  speed?: number; // 1-10
}
```

**Implementation**:
- Canvas-based particle system
- Optimized for performance (max 50 particles)
- Pauses when not in view

## Data Models

### Chapter Configuration

```typescript
// src/data/chapters.ts
export interface ChapterConfig {
  id: string;
  number: number;
  title: string;
  timeOfDay: TimeOfDay;
  heightVh: number;
  startVh: number;
  endVh: number;
  component: React.ComponentType<BaseChapterProps>;
  atmosphericEffects?: {
    particles?: 'dust' | 'fireflies' | 'stars';
    colorGradient: [string, string];
    cursor?: 'binoculars' | 'default';
  };
}

export const CHAPTER_CONFIGS: ChapterConfig[] = [
  {
    id: 'pre-dawn',
    number: 1,
    title: 'Pre-Dawn Hero',
    timeOfDay: 'pre-dawn',
    heightVh: 100,
    startVh: 0,
    endVh: 100,
    component: PreDawnHero,
    atmosphericEffects: {
      particles: 'stars',
      colorGradient: ['#0a0e27', '#1a1f3a'],
    },
  },
  // ... other chapters
];
```

### Type Definitions

```typescript
// src/types/chapter.ts
export type TimeOfDay = 
  | 'pre-dawn' 
  | 'dawn' 
  | 'morning' 
  | 'midday' 
  | 'afternoon' 
  | 'golden-hour' 
  | 'sunset' 
  | 'dusk' 
  | 'twilight' 
  | 'night';

export interface BaseChapterProps {
  id: string;
  className?: string;
}

export interface CTAButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}
```


## Error Handling

### Image Loading Failures

**Strategy**: Graceful degradation with fallbacks

- Use Next.js Image component with blur placeholder
- Provide fallback background colors matching time-of-day
- Log errors to console in development
- Show subtle error message in production (optional)

**Implementation**:
```typescript
<Image
  src={imageSrc}
  alt={imageAlt}
  fill
  onError={(e) => {
    console.error('Image failed to load:', imageSrc);
    e.currentTarget.style.display = 'none';
  }}
  placeholder="blur"
  blurDataURL={generateBlurDataURL(timeOfDay)}
/>
```

### Scroll Performance Issues

**Strategy**: Detect and adapt

- Monitor frame rate using requestAnimationFrame
- Reduce parallax intensity if FPS drops below 30
- Disable particle effects on low-end devices
- Provide "Reduce Motion" preference support

**Implementation**:
```typescript
useEffect(() => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  
  if (prefersReducedMotion) {
    setParallaxEnabled(false);
    setParticlesEnabled(false);
  }
}, []);
```

### Data Fetching Errors

**Strategy**: Static fallbacks

- All chapter content is statically defined
- No external API dependencies for core experience
- Optional features (blog, testimonials) have static fallbacks
- Newsletter signup fails gracefully with error message

### Browser Compatibility

**Strategy**: Progressive enhancement

- Core experience works without JavaScript (SSR)
- Parallax and animations enhance but aren't required
- Fallback to standard scroll on unsupported browsers
- Test on: Chrome, Firefox, Safari, Edge (latest 2 versions)

## Testing Strategy

### Unit Testing

**Tools**: Jest + React Testing Library

**Coverage**:
- Individual chapter components render correctly
- Props are passed and displayed properly
- CTAs have correct href attributes
- Accessibility attributes are present

**Example Test**:
```typescript
describe('PreDawnHero', () => {
  it('renders with required props', () => {
    render(<PreDawnHero id="pre-dawn" />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('Welcome to the Wild')).toBeInTheDocument();
  });

  it('has accessible CTAs', () => {
    render(<PreDawnHero id="pre-dawn" />);
    const primaryCTA = screen.getByRole('link', { name: /begin your safari/i });
    expect(primaryCTA).toHaveAttribute('href', '/experiences');
  });
});
```

### Integration Testing

**Tools**: Playwright

**Coverage**:
- Full scroll journey from top to bottom
- Chapter transitions are smooth
- CTAs navigate to correct pages
- Progress indicator updates correctly
- Mobile responsive behavior

**Example Test**:
```typescript
test('complete scroll journey', async ({ page }) => {
  await page.goto('/');
  
  // Verify hero loads
  await expect(page.locator('h1')).toContainText('Welcome to the Wild');
  
  // Scroll through chapters
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(500);
  
  // Verify chapter 2 is visible
  await expect(page.locator('[data-chapter="sunrise"]')).toBeVisible();
  
  // Test CTA navigation
  await page.click('text=Explore Wildlife Experiences');
  await expect(page).toHaveURL('/experiences');
});
```


### Performance Testing

**Tools**: Lighthouse, WebPageTest

**Metrics**:
- Lighthouse Performance Score: ≥85
- First Contentful Paint (FCP): <1.5s
- Largest Contentful Paint (LCP): <2.5s
- Time to Interactive (TTI): <3.5s
- Cumulative Layout Shift (CLS): <0.1

**Optimization Strategies**:
- Lazy load images below fold
- Use Next.js Image optimization
- Minimize JavaScript bundle size
- Code split by chapter (dynamic imports)
- Preload critical assets (hero image, logo)

### Accessibility Testing

**Tools**: axe DevTools, WAVE, Manual Testing

**Requirements**:
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios ≥4.5:1
- Focus indicators visible
- Skip navigation links
- ARIA labels on interactive elements

**Manual Tests**:
- Tab through all interactive elements
- Test with screen reader (NVDA/JAWS)
- Verify reduced motion preference
- Test with keyboard only (no mouse)

### Visual Regression Testing

**Tools**: Percy or Chromatic

**Coverage**:
- Screenshot each chapter at key scroll positions
- Test responsive breakpoints (mobile, tablet, desktop)
- Verify atmospheric transitions
- Check hover states and animations

## Performance Optimization

### Image Optimization

**Strategy**:
```typescript
// Lazy load images below fold
<Image
  src={imageSrc}
  alt={imageAlt}
  loading={isAboveFold ? 'eager' : 'lazy'}
  priority={isAboveFold}
  quality={85}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
/>
```

**Techniques**:
- Use WebP format with JPEG fallback
- Implement responsive images with srcset
- Blur placeholder for smooth loading
- Preload hero image and logo
- Lazy load all other images

### Code Splitting

**Strategy**: Dynamic imports for chapters

```typescript
// CinematicJourney.tsx
const PreDawnHero = dynamic(() => import('@/components/chapters/PreDawnHero'));
const SunriseChapter = dynamic(() => import('@/components/chapters/SunriseChapter'));
// ... other chapters
```

**Benefits**:
- Reduce initial bundle size
- Load chapters as user scrolls
- Improve Time to Interactive

### Animation Performance

**Strategy**: Use GPU-accelerated properties

```css
/* Prefer transform and opacity */
.parallax-image {
  transform: translateY(var(--parallax-offset));
  will-change: transform;
}

/* Avoid animating layout properties */
.fade-in {
  opacity: 0;
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}
```

**Techniques**:
- Use `will-change` sparingly
- Debounce scroll event handlers
- Use `requestAnimationFrame` for smooth animations
- Disable animations on low-end devices

### Bundle Size Optimization

**Strategies**:
- Tree-shake unused Framer Motion features
- Use dynamic imports for heavy components
- Minimize third-party dependencies
- Analyze bundle with `@next/bundle-analyzer`

**Target Sizes**:
- Initial JS bundle: <200KB (gzipped)
- Total page weight: <2MB
- Number of requests: <50


## Responsive Design

### Breakpoints

```css
/* Tailwind CSS breakpoints */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet portrait */
lg: 1024px  /* Tablet landscape / Small desktop */
xl: 1280px  /* Desktop */
2xl: 1536px /* Large desktop */
```

### Mobile Adaptations (< 768px)

**Layout Changes**:
- Single column layout for all chapters
- Reduced chapter heights (60-80vh instead of 100-250vh)
- Simplified parallax effects (reduced intensity)
- Stacked CTAs instead of side-by-side
- Larger touch targets (min 44x44px)

**Performance Optimizations**:
- Disable particle effects
- Reduce parallax intensity by 50%
- Use smaller image sizes
- Simplify animations

**Example**:
```typescript
const parallaxSpeed = isMobile ? 0.2 : 0.5;
const particlesEnabled = !isMobile && !prefersReducedMotion;
```

### Tablet Adaptations (768px - 1024px)

**Layout Changes**:
- Two-column layouts where appropriate
- Moderate parallax effects
- Adjusted typography sizes
- Optimized image sizes

### Desktop Enhancements (> 1024px)

**Features**:
- Full parallax effects
- Particle animations
- Custom cursor effects
- Larger imagery
- Multi-column layouts

## Accessibility Features

### Keyboard Navigation

**Implementation**:
- All interactive elements are keyboard accessible
- Logical tab order through chapters
- Skip to content link at top
- Focus visible on all interactive elements
- Escape key closes modals/videos

**Example**:
```typescript
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
  aria-label="Explore wildlife experiences"
>
  Learn More
</button>
```

### Screen Reader Support

**Implementation**:
- Semantic HTML structure (header, main, section, article)
- ARIA labels on all interactive elements
- Alt text for all images
- Live regions for dynamic content
- Descriptive link text (no "click here")

**Example**:
```typescript
<section
  aria-labelledby="morning-drive-heading"
  role="region"
>
  <h2 id="morning-drive-heading">Morning Wildlife Drive</h2>
  {/* Chapter content */}
</section>
```

### Reduced Motion Support

**Implementation**:
```typescript
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

return (
  <motion.div
    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
    animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
  >
    {children}
  </motion.div>
);
```

### Color Contrast

**Requirements**:
- Text on backgrounds: ≥4.5:1 ratio
- Large text (18pt+): ≥3:1 ratio
- Interactive elements: ≥3:1 ratio
- Focus indicators: ≥3:1 ratio

**Implementation**:
- Use overlay gradients on background images
- Test all color combinations with contrast checker
- Provide high contrast mode option


## Implementation Phases

### Phase 1: Foundation (Already Complete)

- ✅ SmoothScrollProvider with Lenis
- ✅ SafariProgressProvider with chapter tracking
- ✅ Basic Hero component
- ✅ Next.js 14 App Router setup
- ✅ Tailwind CSS configuration

### Phase 2: Core Structure

**Deliverables**:
- CinematicJourney container component
- Base chapter component pattern
- Chapter configuration system
- Atmospheric transition system
- ScrollProgressIndicator component

**Estimated Effort**: 2-3 days

### Phase 3: Hero & Early Chapters (1-4)

**Deliverables**:
- PreDawnHero component
- SunriseChapter component
- MorningDriveChapter component
- BushBreakfastChapter component
- WildlifeCard molecule
- ParallaxImage atom

**Estimated Effort**: 3-4 days

### Phase 4: Mid Chapters (5-8)

**Deliverables**:
- AccommodationsChapter component
- DiningChapter component
- ExperiencesChapter component
- WellnessChapter component
- ExperienceCard molecule
- ActivityTimeline molecule

**Estimated Effort**: 3-4 days

### Phase 5: Final Chapters (9-12)

**Deliverables**:
- GuestStoriesChapter component
- LocationChapter component
- JournalChapter component
- PlanSafariChapter component
- TestimonialCarousel molecule
- Contact form integration

**Estimated Effort**: 3-4 days

### Phase 6: Enhancements & Polish

**Deliverables**:
- StickyNavigation component
- WhatsAppChatBubble component
- AnimatedCursor component
- AtmosphericParticles component
- Micro-interactions and animations
- Mobile optimizations

**Estimated Effort**: 2-3 days

### Phase 7: Testing & Optimization

**Deliverables**:
- Unit tests for all components
- Integration tests for scroll journey
- Performance optimization
- Accessibility audit and fixes
- Cross-browser testing
- Visual regression tests

**Estimated Effort**: 2-3 days

**Total Estimated Effort**: 15-21 days

## Design Decisions & Rationale

### Why 12 Chapters?

**Rationale**: 
- Represents a complete day cycle (pre-dawn to night)
- Provides comprehensive coverage of all offerings
- Creates natural narrative arc with emotional peaks
- Allows for detailed storytelling without overwhelming

### Why Scroll-Driven Instead of Click-Through?

**Rationale**:
- More immersive and cinematic experience
- Lower friction (no clicks required)
- Better for storytelling and emotional engagement
- Industry trend for luxury/experience brands
- Mobile-friendly (natural gesture)

### Why Parallax Effects?

**Rationale**:
- Creates depth and visual interest
- Enhances premium/luxury feel
- Guides eye through content
- Differentiates from competitors
- Proven to increase engagement

### Why Time-of-Day Progression?

**Rationale**:
- Natural narrative structure everyone understands
- Creates emotional journey (excitement → relaxation → planning)
- Allows for varied visual atmospheres
- Memorable and unique positioning
- Reflects actual safari experience

### Why Preview + Detail Page Pattern?

**Rationale**:
- Prevents overwhelming users with too much information
- Allows for progressive disclosure
- Maintains scroll momentum on homepage
- Provides clear conversion paths
- Better for SEO (multiple indexed pages)

## Technical Constraints & Considerations

### Browser Support

**Minimum Supported Versions**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Graceful Degradation**:
- Parallax disabled on older browsers
- Fallback to standard scroll
- Static images instead of animations
- Basic CSS transitions instead of Framer Motion

### Performance Budgets

**Targets**:
- Initial Load: <3s on 3G
- Time to Interactive: <3.5s
- Lighthouse Score: ≥85
- Bundle Size: <200KB (gzipped)

**Monitoring**:
- Use Next.js Analytics
- Track Core Web Vitals
- Monitor with Sentry for errors
- A/B test performance impact

### SEO Considerations

**Implementation**:
- Server-side render all content
- Semantic HTML structure
- Proper heading hierarchy (h1 → h6)
- Meta descriptions for each chapter
- Schema.org markup for business info
- Open Graph tags for social sharing

**Example**:
```typescript
export const metadata: Metadata = {
  title: 'Amboseli Safari Club | Luxury Safari Experience',
  description: 'Experience the ultimate safari adventure with breathtaking Mount Kilimanjaro views...',
  openGraph: {
    title: 'Amboseli Safari Club',
    description: 'Luxury safari experience in Kenya',
    images: ['/images/og-image.jpg'],
  },
};
```

### Analytics & Tracking

**Events to Track**:
- Chapter scroll progress (25%, 50%, 75%, 100%)
- CTA clicks by chapter
- Time spent in each chapter
- Video plays (testimonials)
- Form submissions
- WhatsApp chat opens

**Implementation**:
```typescript
// Track chapter progress
useEffect(() => {
  if (chapterProgress >= 75 && !tracked) {
    analytics.track('Chapter Viewed', {
      chapter: currentChapter.title,
      progress: '75%',
    });
    setTracked(true);
  }
}, [chapterProgress]);
```

## Future Enhancements

### Phase 8+ (Post-Launch)

**Potential Features**:
- Video backgrounds for select chapters
- 360° room tours
- Interactive wildlife spotter game
- Personalized itinerary builder
- Real-time availability calendar
- Multi-language support
- Dark mode toggle
- Seasonal theme variations
- AR preview of rooms (mobile)
- Voice narration option

**A/B Testing Opportunities**:
- Chapter order variations
- CTA text and placement
- Color scheme variations
- Animation intensity
- Chapter length optimization

## Conclusion

This design creates a comprehensive, immersive homepage experience that tells the complete story of an Amboseli Safari Club visit. By leveraging scroll-driven storytelling, parallax effects, and time-of-day progression, we create an emotional connection with potential guests before they even book. The modular chapter-based architecture allows for easy updates and A/B testing, while the performance-first approach ensures a smooth experience across all devices.

The design balances visual impact with technical performance, accessibility with aesthetics, and storytelling with conversion optimization. Each chapter serves a specific purpose in the user journey, from initial wow factor to final booking action, creating a cohesive narrative that guides visitors naturally toward conversion.

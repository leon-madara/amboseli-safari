# Design Document

## Overview

The Accommodations Stacking Cards feature transforms Chapter 4 of the safari scroll experience into an immersive, scroll-driven presentation of four luxury room types. The design leverages CSS sticky positioning combined with JavaScript-driven scale transforms to create a visually compelling "card stack" effect where each room card appears, becomes fixed, then scales down as subsequent cards layer on top.

This design draws inspiration from premium hospitality websites (Aman Resorts, Four Seasons) and the existing Wildlife Encounters fan animation in the codebase, while adapting the stacking pattern to work seamlessly across desktop and mobile devices. The implementation prioritizes performance through Intersection Observer API, accessibility through reduced motion support, and maintainability through modular component architecture.

## Architecture

### Component Structure

```
AccommodationsChapter/
├── AccommodationsChapter.tsx          # Main component with scroll logic
├── AccommodationsChapter.module.css   # Styles including sticky positioning
├── RoomCard.tsx                       # Individual card component
├── RoomCard.module.css                # Card-specific styles
├── useStackingCards.ts                # Custom hook for stacking logic
└── index.ts                           # Barrel export
```

### Data Flow

1. **Room Data** → Defined in `src/data/rooms.ts` with Unsplash image URLs
2. **AccommodationsChapter** → Receives room data as props, initializes Intersection Observer
3. **useStackingCards Hook** → Manages scroll event listeners, calculates transform values
4. **RoomCard Components** → Receive transform values, render with inline styles
5. **CSS Modules** → Apply base styles, sticky positioning, and responsive layouts

### Technology Stack

- **React 18+**: Component architecture with hooks
- **TypeScript**: Type safety for room data and animation state
- **CSS Modules**: Scoped styling with CSS custom properties
- **Intersection Observer API**: Viewport detection for performance
- **RequestAnimationFrame**: Smooth scroll-driven animations
- **Next.js Image**: Optimized image loading with lazy loading



## Components and Interfaces

### AccommodationsChapter Component

**Purpose**: Main container component that orchestrates the stacking cards animation and manages scroll state.

**Props Interface**:
```typescript
interface AccommodationsChapterProps extends BaseChapterProps {
  id: string;
  className?: string;
  rooms: RoomData[];
  ctaButton?: CTAButton;
}

interface RoomData {
  id: string;
  name: string;
  tagline: string;
  price: number;
  size: number;
  capacity: number;
  features: string[];
  imageUrl: string;
  imageAlt: string;
}
```

**Responsibilities**:
- Initialize Intersection Observer for viewport detection
- Manage scroll event listeners via useStackingCards hook
- Render heading, subtitle, room cards, and CTA button
- Handle reduced motion preferences
- Emit chapter activation events for analytics

### RoomCard Component

**Purpose**: Individual card component that displays room information and responds to transform updates.

**Props Interface**:
```typescript
interface RoomCardProps {
  room: RoomData;
  index: number;
  transform: CardTransform;
  isDesktop: boolean;
}

interface CardTransform {
  scale: number;
  translateY: number;
  zIndex: number;
  opacity: number;
}
```

**Responsibilities**:
- Render 60/40 desktop layout or vertical mobile layout
- Apply inline transform styles from parent
- Handle hover states without interfering with scroll animation
- Lazy load images using Intersection Observer
- Provide accessible markup with ARIA labels



### useStackingCards Hook

**Purpose**: Custom React hook that encapsulates stacking animation logic and scroll calculations.

**Interface**:
```typescript
interface UseStackingCardsOptions {
  cardRefs: RefObject<HTMLDivElement>[];
  containerRef: RefObject<HTMLElement>;
  enabled: boolean;
}

interface UseStackingCardsReturn {
  transforms: CardTransform[];
  isInViewport: boolean;
}

function useStackingCards(options: UseStackingCardsOptions): UseStackingCardsReturn
```

**Responsibilities**:
- Set up Intersection Observer for container element
- Add/remove scroll event listeners based on viewport visibility
- Calculate scroll progress for each card
- Compute scale, translateY, and opacity values
- Use requestAnimationFrame for smooth updates
- Clean up listeners on unmount

**Algorithm**:
```
1. Observe container with Intersection Observer
2. When container enters viewport (10% threshold):
   a. Add scroll event listener
   b. On each scroll event:
      - Use requestAnimationFrame to batch calculations
      - For each card:
        * Calculate scrollProgress = cardTop - containerTop - (index * (cardHeight + gap))
        * If scrollProgress > 0 (card is fixed):
          - scale = (cardHeight - scrollProgress * 0.05) / cardHeight
          - translateY = index * 80px
          - zIndex = index + 1
          - opacity = 1
        * Else (card not yet fixed):
          - scale = 1
          - translateY = 0
          - zIndex = index + 1
          - opacity = 0 (fade in as it approaches)
3. When container exits viewport:
   a. Remove scroll event listener
   b. Reset all transforms
```



## Data Models

### Room Data Structure

**Location**: `src/data/rooms.ts`

```typescript
export const accommodationRooms: RoomData[] = [
  {
    id: 'premium-room',
    name: 'Premium Room',
    tagline: 'Intimate luxury with panoramic savannah views',
    price: 220,
    size: 45,
    capacity: 2,
    features: [
      'King-size bed',
      'Private veranda',
      'Rainfall shower',
      'Kilimanjaro views',
      'Wi-Fi access',
      'Minibar'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
    imageAlt: 'Luxury safari room with king bed and mountain views'
  },
  {
    id: 'deluxe-suite',
    name: 'Deluxe Suite',
    tagline: 'Spacious elegance with separate living area',
    price: 280,
    size: 65,
    capacity: 2,
    features: [
      'King-size bed',
      'Living room',
      'Bathtub & shower',
      'Private deck',
      'Butler service',
      'Premium minibar'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
    imageAlt: 'Deluxe suite with separate living area and private deck'
  },
  {
    id: 'family-suite',
    name: 'Family Suite',
    tagline: 'Generous space for the entire family',
    price: 380,
    size: 85,
    capacity: 4,
    features: [
      'Two bedrooms',
      'Connecting door',
      'Family bathroom',
      'Large veranda',
      'Game viewing',
      'Kids amenities'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6',
    imageAlt: 'Family suite with two bedrooms and large veranda'
  },
  {
    id: 'presidential-villa',
    name: 'Presidential Villa',
    tagline: 'Ultimate luxury with private pool and chef',
    price: 650,
    size: 150,
    capacity: 6,
    features: [
      'Three bedrooms',
      'Private pool',
      'Personal chef',
      'Outdoor dining',
      'Spa bathroom',
      'Concierge service'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
    imageAlt: 'Presidential villa with private pool and outdoor dining area'
  }
];
```

### Transform State Model

```typescript
interface CardTransform {
  scale: number;        // 0.5 to 1.0 (scales down as card gets pushed back)
  translateY: number;   // 0 to 240px (index * 80px for layering)
  zIndex: number;       // 1 to 4 (ascending order)
  opacity: number;      // 0 to 1 (fade in as card approaches)
}

interface AnimationState {
  isActive: boolean;           // Whether section is in viewport
  scrollProgress: number;      // Current scroll position relative to section
  cardTransforms: CardTransform[];  // Transform values for each card
  reducedMotion: boolean;      // User's motion preference
}
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Room data completeness

*For any* room object in the accommodations data, it must contain all required properties: id, name, tagline, price, size, capacity, features array, imageUrl, and imageAlt.

**Validates: Requirements 1.2**

### Property 2: Feature count constraint

*For any* room object, the features array length must be between 4 and 6 inclusive.

**Validates: Requirements 1.4**

### Property 3: Price ordering

*For any* valid rooms array, each room's price must be greater than or equal to the previous room's price (ascending order).

**Validates: Requirements 1.5**

### Property 4: Desktop card width bounds

*For any* viewport width >= 768px, the computed card width must be between 800px and 1200px inclusive.

**Validates: Requirements 2.2**

### Property 5: Desktop card minimum height

*For any* card on desktop, the computed height must be at least 500 pixels.

**Validates: Requirements 2.4**

### Property 6: Mobile card width constraint

*For any* viewport width < 768px, the computed card width must equal min(90vw, 500px).

**Validates: Requirements 3.2**

### Property 7: Mobile stacking animation consistency

*For any* card, the scale transform calculation must use the same formula regardless of viewport size: scale = (cardHeight - scrollProgress * 0.05) / cardHeight.

**Validates: Requirements 3.3**

### Property 8: Mobile card minimum height

*For any* card on mobile (viewport < 768px), the computed height must be at least 600 pixels.

**Validates: Requirements 3.4**

### Property 9: Card scroll distance allocation

*For any* card at index i (0-based), its scroll distance allocation must equal 75vh * (i + 1) from the start of the cards section.

**Validates: Requirements 4.2**

### Property 10: Minimum hold duration between cards

*For any* two consecutive cards, the scroll distance between the end of card N's reveal and the start of card N+1's reveal must be at least 50vh.

**Validates: Requirements 4.4**

### Property 11: Scale calculation formula

*For any* scroll progress value and card height, the scale must equal (cardHeight - scrollProgress * 0.05) / cardHeight when scrollProgress > 0.

**Validates: Requirements 5.2**

### Property 12: Z-index assignment

*For any* card at index i (0-based), its z-index must equal i + 1.

**Validates: Requirements 5.4**

### Property 13: TranslateY layering offset

*For any* card at index i (0-based), its translateY value must equal i * 80 pixels.

**Validates: Requirements 5.5**

### Property 14: Scroll progress calculation

*For any* card with given cardTop, containerTop, cardIndex, cardHeight, and marginY values, scrollProgress must equal cardTop - containerTop - (cardIndex * (cardHeight + marginY)).

**Validates: Requirements 7.2**

### Property 15: Conditional transform application

*For any* card, when scrollProgress > 0, the card must have an inline transform style applied; when scrollProgress <= 0, no transform should be applied.

**Validates: Requirements 7.3**

### Property 16: Price formatting

*For any* room price value, the displayed price text must match the format "From $XXX/night" where XXX is the price number.

**Validates: Requirements 8.3**



## Error Handling

### Intersection Observer Unsupported

**Scenario**: User's browser doesn't support Intersection Observer API (IE11, older browsers)

**Handling**:
```typescript
if (!('IntersectionObserver' in window)) {
  // Fallback: Display all cards immediately without animation
  setAllCardsVisible(true);
  return;
}
```

**User Experience**: Cards appear in a static vertical layout without stacking animation. All content remains accessible.

### Reduced Motion Preference

**Scenario**: User has `prefers-reduced-motion: reduce` enabled in their OS settings

**Handling**:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Disable stacking animation, use simple fade-in
  return <StaticCardLayout rooms={rooms} />;
}
```

**User Experience**: Cards appear with simple fade-in effects instead of stacking animation, respecting accessibility preferences.

### Image Loading Failure

**Scenario**: Room image fails to load from Unsplash

**Handling**:
```typescript
<OptimizedImage
  src={room.imageUrl}
  alt={room.imageAlt}
  onError={(e) => {
    e.currentTarget.src = '/images/fallback-room.jpg';
  }}
  loading="lazy"
/>
```

**User Experience**: Fallback placeholder image displays, maintaining layout integrity.

### Invalid Room Data

**Scenario**: Room data is missing required properties or has invalid values

**Handling**:
```typescript
function validateRoomData(room: RoomData): boolean {
  return (
    room.id &&
    room.name &&
    room.price > 0 &&
    room.size > 0 &&
    room.capacity > 0 &&
    Array.isArray(room.features) &&
    room.features.length >= 4 &&
    room.features.length <= 6
  );
}

const validRooms = rooms.filter(validateRoomData);
```

**User Experience**: Invalid rooms are filtered out, valid rooms display normally. Console warning logged for debugging.

### Scroll Performance Degradation

**Scenario**: Device struggles with scroll calculations (low-end mobile)

**Handling**:
```typescript
let frameCount = 0;
let lastFrameTime = performance.now();

function checkPerformance() {
  const now = performance.now();
  const delta = now - lastFrameTime;
  
  if (delta > 32) { // Dropping below 30fps
    // Reduce animation complexity
    setSimplifiedMode(true);
  }
  
  lastFrameTime = now;
}
```

**User Experience**: Animation automatically simplifies if performance drops, maintaining smooth experience.



## Testing Strategy

### Unit Testing

**Framework**: Jest + React Testing Library

**Test Coverage**:

1. **Component Rendering**
   - AccommodationsChapter renders with default props
   - RoomCard renders with all required content elements
   - Heading and subtitle display correctly
   - CTA button renders with correct href

2. **Data Validation**
   - Room data structure validation function works correctly
   - Invalid rooms are filtered out
   - Price formatting function produces correct output
   - Feature count validation works for edge cases (3, 4, 6, 7 features)

3. **Transform Calculations**
   - Scale calculation formula produces correct values
   - TranslateY calculation matches expected offsets
   - Z-index assignment follows index + 1 pattern
   - Scroll progress calculation handles edge cases

4. **Responsive Behavior**
   - Desktop layout applies 60/40 split at >= 768px
   - Mobile layout switches to vertical at < 768px
   - Card width constraints respected across breakpoints
   - Font sizes adjust appropriately

5. **Accessibility**
   - ARIA labels present on all interactive elements
   - Semantic HTML structure (section, heading, list)
   - Reduced motion preference disables animations
   - Keyboard navigation works for CTA and links

### Property-Based Testing

**Framework**: fast-check (JavaScript property-based testing library)

**Configuration**: Each property test should run a minimum of 100 iterations to ensure comprehensive coverage across the input space.

**Property Tests**:

1. **Property Test: Room data completeness** (Property 1)
   - Generate random room objects with varying properties
   - Verify all required fields are present and valid types
   - **Feature: accommodations-stacking-cards, Property 1: Room data completeness**

2. **Property Test: Feature count constraint** (Property 2)
   - Generate rooms with random feature array lengths
   - Verify validation accepts 4-6 features, rejects others
   - **Feature: accommodations-stacking-cards, Property 2: Feature count constraint**

3. **Property Test: Price ordering** (Property 3)
   - Generate random arrays of rooms with varying prices
   - Verify sorting function produces ascending price order
   - **Feature: accommodations-stacking-cards, Property 3: Price ordering**

4. **Property Test: Card width bounds** (Property 4)
   - Generate random viewport widths >= 768px
   - Verify computed card width stays within 800-1200px
   - **Feature: accommodations-stacking-cards, Property 4: Desktop card width bounds**

5. **Property Test: Scale calculation** (Property 11)
   - Generate random scroll progress and card height values
   - Verify scale formula produces values between 0 and 1
   - **Feature: accommodations-stacking-cards, Property 11: Scale calculation formula**

6. **Property Test: Z-index assignment** (Property 12)
   - Generate random card indices (0-3)
   - Verify z-index equals index + 1 for all cases
   - **Feature: accommodations-stacking-cards, Property 12: Z-index assignment**

7. **Property Test: TranslateY calculation** (Property 13)
   - Generate random card indices
   - Verify translateY equals index * 80 for all cases
   - **Feature: accommodations-stacking-cards, Property 13: TranslateY layering offset**

8. **Property Test: Scroll progress calculation** (Property 14)
   - Generate random values for all formula inputs
   - Verify formula produces consistent results
   - **Feature: accommodations-stacking-cards, Property 14: Scroll progress calculation**

9. **Property Test: Price formatting** (Property 16)
   - Generate random price values (positive numbers)
   - Verify output matches "From $XXX/night" format
   - **Feature: accommodations-stacking-cards, Property 16: Price formatting**

### Integration Testing

**Framework**: Playwright (E2E testing)

**Test Scenarios**:

1. **Full Scroll Journey**
   - Navigate to homepage
   - Scroll to accommodations section (2030vh)
   - Verify intro fades in
   - Verify cards appear sequentially
   - Verify final stack formation
   - Verify smooth transition to next chapter

2. **Mobile Experience**
   - Set viewport to 375x667 (iPhone SE)
   - Scroll to accommodations section
   - Verify vertical card layout
   - Verify stacking animation works
   - Verify touch scrolling is smooth

3. **Reduced Motion**
   - Enable prefers-reduced-motion
   - Scroll to accommodations section
   - Verify animations are disabled
   - Verify content is still accessible

4. **Image Loading**
   - Throttle network to Slow 3G
   - Scroll to accommodations section
   - Verify lazy loading works
   - Verify fallback images display on error

5. **Cross-Browser Compatibility**
   - Test on Chrome, Firefox, Safari, Edge
   - Verify consistent behavior across browsers
   - Verify Intersection Observer polyfill works on older browsers

### Performance Testing

**Metrics to Monitor**:

1. **Frame Rate**: Maintain 60fps during scroll
2. **Layout Shifts**: CLS (Cumulative Layout Shift) < 0.1
3. **Memory Usage**: No memory leaks from event listeners
4. **Image Loading**: LCP (Largest Contentful Paint) < 2.5s
5. **JavaScript Execution**: Total blocking time < 300ms

**Tools**:
- Chrome DevTools Performance tab
- Lighthouse CI for automated performance audits
- WebPageTest for real-world performance metrics



## Implementation Details

### CSS Architecture

**Sticky Positioning Pattern**:
```css
.card {
  position: sticky;
  top: 80px;
  transform-origin: center top;
  will-change: transform, opacity;
  transition: box-shadow 0.3s ease-out;
}
```

**Desktop Layout (60/40 Split)**:
```css
@media (min-width: 768px) {
  .card {
    display: grid;
    grid-template-columns: 60% 40%;
    min-width: 800px;
    max-width: 1200px;
    min-height: 500px;
  }
  
  .cardImage {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  
  .cardContent {
    padding: var(--space-8);
  }
}
```

**Mobile Layout (Vertical Stack)**:
```css
@media (max-width: 767px) {
  .card {
    display: flex;
    flex-direction: column;
    width: min(90vw, 500px);
    min-height: 600px;
  }
  
  .cardImage {
    height: 50%;
  }
  
  .cardContent {
    height: 50%;
    padding: var(--space-6);
  }
}
```

**Responsive Typography**:
```css
.roomName {
  font-size: clamp(1.75rem, 4vw, 2rem);
  font-family: var(--font-family-display);
}

.roomTagline {
  font-size: clamp(1rem, 2vw, 1.125rem);
  font-weight: 300;
}

.roomPrice {
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  color: var(--color-primary-terracotta);
}
```

### JavaScript Animation Logic

**useStackingCards Hook Implementation**:
```typescript
export function useStackingCards(options: UseStackingCardsOptions) {
  const [transforms, setTransforms] = useState<CardTransform[]>([]);
  const [isInViewport, setIsInViewport] = useState(false);
  const rafId = useRef<number>();
  
  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    
    if (prefersReducedMotion || !options.enabled) {
      return;
    }
    
    // Check for Intersection Observer support
    if (!('IntersectionObserver' in window)) {
      setIsInViewport(true);
      return;
    }
    
    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInViewport(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );
    
    if (options.containerRef.current) {
      observer.observe(options.containerRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [options.enabled, options.containerRef]);
  
  useEffect(() => {
    if (!isInViewport) return;
    
    const handleScroll = () => {
      if (rafId.current) return;
      
      rafId.current = requestAnimationFrame(() => {
        const newTransforms = calculateTransforms(
          options.cardRefs,
          options.containerRef
        );
        setTransforms(newTransforms);
        rafId.current = undefined;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isInViewport, options.cardRefs, options.containerRef]);
  
  return { transforms, isInViewport };
}

function calculateTransforms(
  cardRefs: RefObject<HTMLDivElement>[],
  containerRef: RefObject<HTMLElement>
): CardTransform[] {
  if (!containerRef.current) return [];
  
  const containerTop = containerRef.current.getBoundingClientRect().top;
  
  return cardRefs.map((ref, index) => {
    if (!ref.current) {
      return { scale: 1, translateY: 0, zIndex: index + 1, opacity: 0 };
    }
    
    const card = ref.current;
    const cardTop = card.getBoundingClientRect().top;
    const cardHeight = card.offsetHeight;
    const marginY = 80;
    
    const scrollProgress = cardTop - containerTop - (index * (cardHeight + marginY));
    
    if (scrollProgress > 0) {
      // Card is fixed and should scale down
      const scale = Math.max(
        0.5,
        (cardHeight - scrollProgress * 0.05) / cardHeight
      );
      
      return {
        scale,
        translateY: index * marginY,
        zIndex: index + 1,
        opacity: 1
      };
    } else {
      // Card not yet fixed
      return {
        scale: 1,
        translateY: 0,
        zIndex: index + 1,
        opacity: Math.max(0, 1 + scrollProgress / 100) // Fade in as it approaches
      };
    }
  });
}
```

### Performance Optimizations

1. **Passive Event Listeners**: Use `{ passive: true }` for scroll events to improve scrolling performance
2. **RequestAnimationFrame**: Batch all DOM reads and writes to prevent layout thrashing
3. **Will-Change Hint**: Apply `will-change: transform, opacity` to cards for GPU acceleration
4. **Lazy Loading**: Use Intersection Observer to lazy-load images
5. **Event Listener Cleanup**: Remove listeners when section exits viewport
6. **Memoization**: Use React.memo for RoomCard components to prevent unnecessary re-renders
7. **CSS Containment**: Apply `contain: layout style paint` to cards for rendering optimization

### Accessibility Considerations

1. **Semantic HTML**: Use `<section>`, `<article>`, `<h2>`, `<ul>`, `<li>` for proper structure
2. **ARIA Labels**: Add `aria-label` to interactive elements and `role="region"` to section
3. **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
4. **Focus Management**: Maintain visible focus indicators with proper contrast
5. **Reduced Motion**: Respect `prefers-reduced-motion` preference
6. **Screen Reader Announcements**: Use `aria-live` for dynamic content updates
7. **Alt Text**: Provide descriptive alt text for all room images
8. **Color Contrast**: Ensure text meets WCAG AA standards (4.5:1 for body text)

### Browser Compatibility

**Target Browsers**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Polyfills Required**:
- Intersection Observer (for IE11 if needed)
- ResizeObserver (for older browsers)

**Fallback Strategy**:
- If Intersection Observer unsupported: Display static layout
- If CSS sticky unsupported: Use fixed positioning with JavaScript
- If requestAnimationFrame unsupported: Use setTimeout fallback


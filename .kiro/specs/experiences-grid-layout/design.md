# Design Document: Experiences Grid Layout

## Overview

The Experiences page will be a dedicated route (`/experiences`) showcasing all safari experiences and activities at Amboseli Safari Club using a modern, performance-optimized masonry-style grid layout. The design prioritizes visual hierarchy, smooth animations, and excellent performance while maintaining the site's existing design system and brand identity.

### Design Goals

1. **Visual Impact**: Create an engaging, Pinterest-style browsing experience with varied card sizes
2. **Performance**: Achieve 60fps animations and <2.5s LCP using CSS-first approach
3. **Accessibility**: Full keyboard navigation, screen reader support, and reduced motion preferences
4. **Responsive**: Seamless adaptation from mobile to desktop with appropriate breakpoints
5. **Brand Consistency**: Leverage existing design tokens and component patterns

## Architecture

### Page Structure

```
/experiences (Next.js App Router)
├── page.tsx (Server Component)
│   └── ExperiencesPageClient (Client Component)
│       ├── PageHeader
│       ├── FilterBar (optional future enhancement)
│       └── ExperiencesGrid
│           └── ExperienceCard[] (multiple instances)
```

### Component Hierarchy

```
ExperiencesPage
├── PageHeader
│   ├── Heading (h1)
│   ├── Subtitle
│   └── Breadcrumbs
├── ExperiencesGrid (Container)
│   └── ExperienceCard (Repeating)
│       ├── CardImageContainer
│       │   ├── Image (Next.js Image)
│       │   ├── GradientOverlay
│       │   └── TimeOfDayBadge
│       ├── CardContent
│       │   ├── Title (h3)
│       │   ├── Description
│       │   └── MetaInfo (duration, difficulty)
│       └── CardFooter
│           └── CTAButton
```

## Components and Interfaces

### 1. ExperiencesPage Component

**File**: `src/app/(marketing)/experiences/page.tsx`

```typescript
import { ExperiencesPageClient } from './ExperiencesPageClient';
import { experiences } from '@/data/experiences';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Safari Experiences | Amboseli Safari Club',
  description: 'Discover curated safari adventures, wildlife encounters, and unique experiences at Amboseli Safari Club.',
};

export default function ExperiencesPage() {
  return <ExperiencesPageClient experiences={experiences} />;
}
```

**Rationale**: Server component for SEO optimization and static data fetching.

### 2. ExperiencesPageClient Component

**File**: `src/app/(marketing)/experiences/ExperiencesPageClient.tsx`

```typescript
'use client';

import { PageHeader } from '@/components/molecules/PageHeader';
import { ExperiencesGrid } from '@/components/organisms/ExperiencesGrid';
import type { ExperienceType } from '@/types/experience';
import styles from './ExperiencesPage.module.css';

interface ExperiencesPageClientProps {
  experiences: ExperienceType[];
}

export function ExperiencesPageClient({ experiences }: ExperiencesPageClientProps) {
  return (
    <div className={styles.page}>
      <PageHeader
        title="Safari Experiences"
        subtitle="Curated adventures in the heart of Amboseli"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Experiences', href: '/experiences' },
        ]}
      />
      <ExperiencesGrid experiences={experiences} />
    </div>
  );
}
```

### 3. ExperiencesGrid Component

**File**: `src/components/organisms/ExperiencesGrid/ExperiencesGrid.tsx`

```typescript
'use client';

import { useRef, useEffect } from 'react';
import { ExperienceCard } from '@/components/molecules/ExperienceCard';
import type { ExperienceType } from '@/types/experience';
import styles from './ExperiencesGrid.module.css';

interface ExperiencesGridProps {
  experiences: ExperienceType[];
}

export function ExperiencesGrid({ experiences }: ExperiencesGridProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Intersection Observer for lazy animation
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '50px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            ref={el => cardRefs.current[index] = el}
            className={styles.cardWrapper}
            data-size={getCardSize(index)}
            style={{ animationDelay: `${Math.min(index * 0.1, 0.4)}s` }}
          >
            <ExperienceCard experience={experience} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Card size distribution: 70% standard, 20% tall/wide, 10% hero
function getCardSize(index: number): 'standard' | 'tall' | 'wide' | 'hero' {
  if (index === 0) return 'hero'; // First card is hero
  if (index % 10 === 5) return 'wide';
  if (index % 10 === 8) return 'tall';
  return 'standard';
}
```

### 4. ExperienceCard Component (Enhanced)

**File**: `src/components/molecules/ExperienceCard/ExperienceCard.tsx`

```typescript
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ExperienceType } from '@/types/experience';
import styles from './ExperienceCard.module.css';

interface ExperienceCardProps {
  experience: ExperienceType;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const timeOfDay = getTimeOfDay(experience.title);

  return (
    <Link href={`/experiences/${experience.slug}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.image}
        />
        <div className={styles.gradientOverlay} />
        {timeOfDay && (
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>{getTimeIcon(timeOfDay)}</span>
            <span className={styles.badgeText}>{timeOfDay}</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{experience.title}</h3>
        <p className={styles.description}>{experience.shortDescription}</p>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>⏱️</span>
            {experience.duration}
          </span>
          <span className={styles.metaItem}>
            <span className={styles.metaIcon}>📊</span>
            {experience.difficulty}
          </span>
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.cta}>Explore Experience →</span>
      </div>
    </Link>
  );
}

function getTimeOfDay(title: string): string | null {
  if (title.toLowerCase().includes('sunrise') || title.toLowerCase().includes('dawn')) return 'Early Morning';
  if (title.toLowerCase().includes('sunset') || title.toLowerCase().includes('evening')) return 'Evening';
  if (title.toLowerCase().includes('night')) return 'Night';
  return 'Daytime';
}

function getTimeIcon(timeOfDay: string): string {
  const icons: Record<string, string> = {
    'Early Morning': '🌅',
    'Evening': '🌆',
    'Night': '🌙',
    'Daytime': '☀️',
  };
  return icons[timeOfDay] || '✨';
}
```

## Data Models

### ExperienceType (Existing)

```typescript
export interface ExperienceType {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  included: string[];
  schedule: string[];
  price?: number;
}
```

### Enhanced ExperienceType (Optional Extension)

```typescript
export interface ExperienceTypeEnhanced extends ExperienceType {
  featured?: boolean;        // For hero cards
  timeOfDay?: string;        // For badge display
  category?: string;         // For future filtering
  availableSeasons?: string[]; // Seasonal availability
}
```

## Styling Architecture

### CSS Modules Structure

#### ExperiencesGrid.module.css

```css
/* Grid Container */
.container {
  max-width: var(--container-max-width-2xl);
  margin: 0 auto;
  padding: var(--space-section-md) var(--space-container-padding-lg);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  grid-auto-flow: dense;
  contain: layout style;
}

/* Card Wrapper with Size Variants */
.cardWrapper {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.cardWrapper.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Size Variants */
.cardWrapper[data-size="standard"] {
  grid-row: span 1;
}

.cardWrapper[data-size="tall"] {
  grid-row: span 2;
}

.cardWrapper[data-size="wide"] {
  grid-column: span 2;
  grid-row: span 1;
}

.cardWrapper[data-size="hero"] {
  grid-column: span 2;
  grid-row: span 2;
}

/* Mobile: Stack all cards */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .cardWrapper[data-size] {
    grid-column: span 1 !important;
    grid-row: span 1 !important;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .cardWrapper {
    animation: none !important;
    transition: none !important;
    opacity: 1;
    transform: none;
  }
}
```

#### ExperienceCard.module.css

```css
/* Card Base */
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-3xl);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.4s ease;
  box-shadow: var(--shadow-card);
  contain: layout style paint;
}

/* Gradient Border Effect */
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px;
  background: linear-gradient(
    135deg,
    var(--color-primary-terracotta),
    var(--color-accent-gold),
    var(--color-primary-ochre)
  );
  -webkit-mask: 
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Hover State */
.card:hover {
  transform: translateY(-8px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.12),
    0 0 0 2px var(--color-primary-terracotta);
}

.card:hover::before {
  opacity: 0.6;
}

/* Focus State */
.card:focus-visible {
  outline: 3px solid var(--color-primary-terracotta);
  outline-offset: 4px;
}

/* Image Container */
.imageContainer {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
}

.image {
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.card:hover .image {
  transform: scale(1.05);
}

/* Gradient Overlay */
.gradientOverlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    transparent 100%
  );
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.card:hover .gradientOverlay {
  opacity: 0.5;
}

/* Time Badge */
.badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-terracotta);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.5) inset;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover .badge {
  transform: scale(1.05);
  box-shadow: 
    0 6px 20px rgba(200, 111, 77, 0.3),
    0 0 20px rgba(200, 111, 77, 0.2);
}

/* Content */
.content {
  flex: 1;
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
  margin: 0;
}

.description {
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-secondary);
  margin: 0;
}

/* Meta Info */
.meta {
  display: flex;
  gap: var(--space-4);
  margin-top: auto;
}

.metaItem {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}

.metaIcon {
  font-size: 1rem;
}

/* Footer */
.footer {
  padding: var(--space-4) var(--space-6);
  border-top: 1px solid var(--color-border-light);
}

.cta {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-terracotta);
  transition: color 0.2s ease;
}

.card:hover .cta {
  color: var(--color-primary-terracotta-dark);
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .card {
    border: 2px solid currentColor;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .card,
  .image,
  .gradientOverlay,
  .badge {
    transition: none !important;
  }

  .card:hover {
    transform: none;
  }

  .card:hover .image {
    transform: none;
  }
}
```

## Performance Optimizations

### 1. CSS Containment

```css
.cardWrapper {
  contain: layout style paint;
  content-visibility: auto;
}
```

**Benefit**: Isolates rendering, reduces paint operations

### 2. Intersection Observer

```typescript
const observerOptions = {
  threshold: 0.2,
  rootMargin: '50px', // Start loading 50px before viewport
};
```

**Benefit**: Lazy animation trigger, reduces initial render cost

### 3. Image Optimization

```typescript
<Image
  src={experience.image}
  alt={experience.title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className={styles.image}
  loading="lazy"
  quality={85}
/>
```

**Benefit**: Responsive images, lazy loading, optimized quality

### 4. Will-Change Strategy

```css
/* Only add will-change during interaction */
.card:hover {
  will-change: transform, box-shadow;
}
```

**Benefit**: Prevents unnecessary GPU layer promotion

### 5. RequestAnimationFrame (Future Enhancement)

For any JavaScript-driven animations:

```typescript
useEffect(() => {
  let rafId: number;
  
  const animate = () => {
    // Animation logic
    rafId = requestAnimationFrame(animate);
  };
  
  rafId = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(rafId);
}, []);
```

## Accessibility Features

### 1. Semantic HTML

```typescript
<Link href={`/experiences/${experience.slug}`} className={styles.card}>
  <h3>{experience.title}</h3>
  {/* Content */}
</Link>
```

### 2. ARIA Labels

```typescript
<div 
  className={styles.badge}
  aria-label={`Available during ${timeOfDay}`}
>
  {timeOfDay}
</div>
```

### 3. Keyboard Navigation

```css
.card:focus-visible {
  outline: 3px solid var(--color-primary-terracotta);
  outline-offset: 4px;
}
```

### 4. Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .cardWrapper {
    animation: none !important;
    transition: none !important;
  }
}
```

### 5. Screen Reader Support

```typescript
<Image
  src={experience.image}
  alt={`${experience.title} - ${experience.shortDescription}`}
  // ...
/>
```

## Responsive Breakpoints

### Mobile (<768px)

- Single column grid
- All cards standard size
- Reduced padding and gaps
- Touch-optimized spacing

### Tablet (768px - 1023px)

- 2-column grid
- Selective size variants
- Balanced spacing

### Desktop (≥1024px)

- 3-4 column grid (auto-fit)
- Full size variant support
- Maximum visual impact

## Error Handling

### Missing Images

```typescript
<Image
  src={experience.image || '/images/placeholder-experience.jpg'}
  alt={experience.title}
  onError={(e) => {
    e.currentTarget.src = '/images/placeholder-experience.jpg';
  }}
/>
```

### Empty State

```typescript
{experiences.length === 0 ? (
  <div className={styles.emptyState}>
    <p>No experiences available at this time.</p>
    <Link href="/">Return to Home</Link>
  </div>
) : (
  <ExperiencesGrid experiences={experiences} />
)}
```

## Testing Strategy

### Unit Tests

- Component rendering with various props
- Card size distribution logic
- Time of day detection
- Accessibility attributes

### Integration Tests

- Grid layout responsiveness
- Image loading and lazy loading
- Navigation to experience detail pages
- Intersection Observer behavior

### Visual Regression Tests

- Card hover states
- Grid layouts at different breakpoints
- Animation sequences
- Focus states

### Performance Tests

- Lighthouse scores (target >90)
- Frame rate during scroll (target 60fps)
- LCP measurement (target <2.5s)
- Bundle size impact (target <5KB CSS)

### Accessibility Tests

- Keyboard navigation flow
- Screen reader announcements
- Color contrast ratios (WCAG AA)
- Reduced motion preferences

## Future Enhancements

### Phase 2 Features

1. **Filter Bar**: Category, difficulty, duration filters
2. **Search**: Real-time experience search
3. **Sort Options**: Price, popularity, duration
4. **Favorites**: Save experiences for later
5. **Share**: Social media sharing buttons

### Phase 3 Features

1. **Virtual Tours**: 360° experience previews
2. **Availability Calendar**: Real-time booking availability
3. **Reviews**: Guest ratings and reviews
4. **Recommendations**: AI-powered suggestions
5. **Multi-language**: Swahili, French, German support

## Design Decisions & Rationale

### Why CSS Grid over Masonry Libraries?

- **Performance**: Zero JavaScript overhead
- **Browser Support**: Excellent with fallbacks
- **Maintainability**: Standard CSS, no dependencies
- **Future-Proof**: Native CSS masonry coming

### Why Intersection Observer over Framer Motion?

- **Bundle Size**: Reduces JavaScript by ~50KB
- **Performance**: Native browser API, more efficient
- **Simplicity**: Easier to maintain and debug
- **Progressive Enhancement**: Works without JavaScript

### Why CSS Modules over Tailwind?

- **Consistency**: Matches existing component patterns
- **Scoping**: Automatic class name scoping
- **Performance**: No runtime class generation
- **Design Tokens**: Direct CSS variable usage

### Why Link Cards over Modal Previews?

- **SEO**: Each experience gets its own URL
- **Performance**: Avoids loading all content upfront
- **UX**: Clearer navigation, browser history support
- **Accessibility**: Standard link behavior

## Implementation Notes

### Development Order

1. Create page route and basic structure
2. Implement ExperiencesGrid with static data
3. Style ExperienceCard with all states
4. Add Intersection Observer animations
5. Implement responsive breakpoints
6. Add accessibility features
7. Optimize performance
8. Test across browsers and devices

### Dependencies

- Next.js 14+ (App Router)
- React 18+
- TypeScript 5+
- CSS Modules (built-in)
- No additional animation libraries required

### Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 12+)
- Opera: Full support
- IE11: Not supported (graceful degradation)

## Conclusion

This design provides a modern, performant, and accessible experiences grid layout that aligns with Amboseli Safari Club's brand identity while delivering an exceptional user experience. The CSS-first approach ensures excellent performance, and the component architecture allows for easy maintenance and future enhancements.

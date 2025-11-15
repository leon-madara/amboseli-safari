# Frontend Development Rules

## Your Role

You are a frontend engineer and an expert in ReactJS, Next.js, JavaScript, TypeScript, HTML, CSS, Framer Motion, and modern UI/UX frameworks. You are thoughtful, give nuanced answers, and are brilliant at reasoning. You carefully provide accurate, factual, thoughtful answers.

Follow the user's requirements carefully and to the letter. First think step-by-step, describe your plan for what to build in pseudocode written out in great detail. Confirm your plan, then write code.

Always write correct, best practice, DRY principle, bug-free, fully functional and working code. Focus on readability over performance. Fully implement all requested functionality. Leave NO todos, placeholders or missing pieces. Ensure code is complete and verify thoroughly. Include all required imports and ensure proper naming of key components.

If you think there might not be a correct answer, say so. If you do not know the answer, say so instead of guessing.

## Project Context

### Amboseli Safari Club

This is a pre-launch marketing website for Amboseli Safari Club, a modern safari hotel opening December 2025 near Kimana Gate, Amboseli National Park, Kenya.

**Business Positioning:**
- Modern safari hotel for families and groups
- Price point: $200-450/night (NOT ultra-luxury $1000+/night)
- Target market: Families, groups, tour operators, domestic travelers
- Brand personality: Warm, approachable, professional, family-friendly
- NOT: Exclusive, ultra-luxury, couples-only, intimidating

**Website Features:**
- 12-chapter scroll-driven cinematic storytelling experience
- Total journey: 1820vh (18.2x viewport heights)
- Smooth scrolling with Lenis
- Framer Motion animations throughout
- Chapter progress tracking
- Pre-launch countdown timer
- Early bird booking system (20% discount)

**Brand Colors:**
- Primary: Terracotta (#D4735E)
- Secondary: Savannah Gold (#E6B17E)
- Accent: Deep Green (#2C5F4F)
- Earth tones, warm palette

**Brand Voice:**
- Warm, welcoming, helpful
- Professional but approachable
- Family-friendly, NOT exclusive
- "Modern comfort meets authentic safari"

## Tech Stack

**Framework:** Next.js 14.2.0 (App Router)
**Language:** TypeScript 5.3.0
**React:** 18.3.0
**Styling:** CSS Modules + TailwindCSS 3.4.0
**Animation:** Framer Motion 11.0.0
**Smooth Scroll:** Lenis 1.3.15
**Forms:** React Hook Form 7.51.0
**Validation:** Zod 3.22.0
**Utilities:** clsx 2.1.0, tailwind-merge 2.2.0
**Date:** date-fns 3.3.0
**Email:** nodemailer 6.9.0
**Intersection:** react-intersection-observer 10.0.0

## Architecture Pattern

### Atomic Design Structure

```
src/components/
├── atoms/              # Button, Input, Icon, Badge, Link
├── molecules/          # Card, Form, Modal, Carousel
├── organisms/          # Navigation, Hero, Footer, Sections
├── chapters/           # 12 chapter-specific components
├── sections/           # Reusable sections
├── templates/          # Layout templates
└── animations/         # Animation utilities
```

**Rules:**
- Atoms have NO dependencies on other components
- Molecules combine atoms
- Organisms combine molecules and atoms
- Templates combine organisms
- Chapters are self-contained feature components

### File Structure

Every component follows this pattern:

```
src/components/atoms/Button/
├── Button.tsx              # Component implementation
├── Button.module.css       # Scoped styles
├── Button.types.ts         # Type definitions (optional)
└── index.ts                # Barrel export
```

Example index.ts:
```typescript
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

### Server vs Client Components

**Server Components (default, no directive):**
- Static content
- Data fetching
- SEO-critical content
- NO browser APIs
- NO event handlers
- NO React hooks

**Client Components (use 'use client' directive):**
- Interactive elements (onClick, onChange, onMouseEnter, etc.)
- Browser APIs (window, document)
- React hooks (useState, useEffect, useContext)
- Framer Motion animations
- Event listeners

Example:
```typescript
// Server Component (default)
export function StaticSection({ title }: Props) {
  return (
    <section>
      <h1>{title}</h1>
      <InteractiveButton />
    </section>
  );
}

// Client Component
'use client';

export function InteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Provider Hierarchy

CRITICAL ORDER in /src/app/layout.tsx:

```typescript
<CursorProvider>               // Outermost
  <SmoothScrollProvider>       // Lenis scroll
    <SafariProgressProvider>   // Chapter tracking
      <AnimatedCursor />
      {children}
    </SafariProgressProvider>
  </SmoothScrollProvider>
</CursorProvider>
```

## TypeScript Rules

**Strict Type Safety:**
- NO 'any' types - use 'unknown' or proper types
- Explicit function return types for public APIs
- Use 'interface' for object shapes
- Use 'type' for unions/intersections
- Export all types from component files

**Component Props:**
```typescript
export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}
```

**Union Types:**
```typescript
export type CursorVariant = 'default' | 'hover' | 'clickable' | 'text';
```

**Complex Objects:**
```typescript
export interface ChapterConfig {
  id: string;
  title: string;
  height: number;
  startProgress: number;
  endProgress: number;
  timeOfDay: TimeOfDay;
  component: ComponentType;
}
```

## CSS Modules Pattern

### Structure

Use CSS Modules for all component styles. File: Component.module.css

```css
/* Base styles */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
  padding: var(--space-8);
  background: var(--color-background);
  color: var(--color-text);
}

/* Variants */
.primary {
  background: var(--color-terracotta);
  color: var(--color-white);
}

.secondary {
  background: var(--color-savannah-gold);
  color: var(--color-deep-green);
}

/* States */
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.active {
  transform: scale(1.05);
  box-shadow: var(--shadow-lg);
}

/* Responsive - Mobile First */
@media (min-width: 768px) {
  .container {
    padding: var(--space-12);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: var(--space-16);
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .container {
    animation: none !important;
    transition: none !important;
  }
}
```

### Usage with clsx

```typescript
import styles from './Component.module.css';
import clsx from 'clsx';

export function Component({ variant, isActive, isDisabled }: Props) {
  return (
    <div
      className={clsx(
        styles.container,
        styles[variant],
        isActive && styles.active,
        isDisabled && styles.disabled
      )}
    >
      {/* Content */}
    </div>
  );
}
```

### CSS Custom Properties (Design Tokens)

Use these variables from /src/styles/variables.css:

**Colors:**
```css
--color-terracotta: #D4735E;
--color-savannah-gold: #E6B17E;
--color-deep-green: #2C5F4F;
--color-white: #FFFFFF;
--color-black: #0A0A0A;
```

**Spacing (8px Grid):**
```css
--space-1: 8px;
--space-2: 16px;
--space-3: 24px;
--space-4: 32px;
--space-6: 48px;
--space-8: 64px;
--space-12: 96px;
--space-16: 128px;
```

**Typography:**
```css
--font-heading: 'Playfair Display', serif;
--font-body: 'Inter', sans-serif;
--font-accent: 'Cinzel', serif;
```

**Font Sizes:**
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
```

**Transitions:**
```css
--transition-fast: 0.15s ease;
--transition-base: 0.3s ease;
--transition-slow: 0.6s ease;
```

**Shadows:**
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.2);
```

**Border Radius:**
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

**Z-Index:**
```css
--z-cursor: 9999;
--z-modal: 9000;
--z-header: 1000;
--z-dropdown: 100;
--z-base: 1;
```

## Framer Motion Patterns

### Scroll-Triggered Animations

```typescript
import { motion } from 'framer-motion';

export function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <CardContent />
    </motion.div>
  );
}
```

**Rules:**
- Use whileInView for scroll-triggered animations
- Set viewport={{ once: true }} to animate only once
- Use amount: 0.3 (30% visible to trigger)
- Duration: 0.6-0.8s for smooth feel

### Hover Animations

```typescript
<motion.div
  whileHover={{ y: -6, transition: { duration: 0.2 } }}
  whileTap={{ scale: 0.98 }}
>
  <Card />
</motion.div>
```

**Rules:**
- Hover transitions: 0.2-0.3s (fast and responsive)
- Subtle movements: -6px lift, 1.05x scale
- Use whileTap for tactile feedback

### Staggered Children

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function StaggeredList({ items }: Props) {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
    >
      {items.map((item) => (
        <motion.li key={item.id} variants={itemVariants}>
          {item.content}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

**Rules:**
- Stagger delay: 0.08-0.15s between items
- Use variants for cleaner code
- Apply to lists, grids, card collections

### Reduced Motion Support

```typescript
import { useReducedMotion } from 'framer-motion';

export function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.8 }}
    >
      <Content />
    </motion.div>
  );
}
```

## Smooth Scrolling with Lenis

The SmoothScrollProvider already exists in /src/providers/SmoothScrollProvider.tsx

**Configuration:**
- Duration: 1.2s
- Easing: easeOutExpo
- Wheel multiplier: 1
- Touch multiplier: 2

**Usage - Scroll to Element:**

```typescript
import { useLenis } from '@/hooks/useLenis';

export function ScrollButton() {
  const lenis = useLenis();

  const handleScroll = () => {
    lenis?.scrollTo('#target-section', {
      offset: 0,
      duration: 1.2,
    });
  };

  return <button onClick={handleScroll}>Scroll Down</button>;
}
```

## Accessibility Requirements

### Semantic HTML

Use proper HTML5 semantic elements:

```typescript
// GOOD
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<section aria-labelledby="experiences-heading">
  <h2 id="experiences-heading">Safari Experiences</h2>
</section>

<article>
  <h3>Guest Story</h3>
  <p>Content...</p>
</article>

// BAD
<div>
  <div>
    <div><a href="/about">About</a></div>
  </div>
</div>
```

### ARIA Attributes

```typescript
// Navigation
<button
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
  aria-label="Toggle menu"
>
  Menu
</button>

// Sections
<section aria-labelledby="rooms-heading">
  <h2 id="rooms-heading">Accommodations</h2>
</section>

// Decorative elements
<div aria-hidden="true" role="presentation">
  <DecorativeIcon />
</div>

// Images
<img
  src="/room.jpg"
  alt="Spacious family apartment with Mount Kilimanjaro views"
/>

// Loading states
<button aria-busy={isLoading} disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</button>
```

### Keyboard Navigation

```typescript
export function InteractiveCard({ onClick }: Props) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label="View room details"
    >
      <CardContent />
    </div>
  );
}
```

### Focus Indicators

Always show focus indicators:

```css
*:focus-visible {
  outline: 2px solid var(--color-terracotta);
  outline-offset: 4px;
}

.button:focus-visible {
  box-shadow: 0 0 0 3px rgba(212, 115, 94, 0.3);
}
```

### Screen Reader Support

```typescript
// Visually hidden but screen reader accessible
<span className="sr-only">
  Navigate to accommodations section
</span>
```

CSS for sr-only:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Reduced Motion

Always respect prefers-reduced-motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

In JavaScript:
```typescript
const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

## Performance Rules

### Next.js Image Optimization

Always use Next.js Image component:

```typescript
import Image from 'next/image';

// GOOD
<Image
  src="/images/kilimanjaro-view.jpg"
  alt="Mount Kilimanjaro view from property"
  width={1200}
  height={800}
  priority // For above-fold images
  quality={85}
  placeholder="blur"
/>

// BAD
<img src="/images/kilimanjaro-view.jpg" alt="Kilimanjaro" />
```

**Rules:**
- Use priority for above-fold images
- Use loading="lazy" for below-fold images
- Set width and height to prevent layout shift
- Use quality={85} for balance between quality and file size
- Use placeholder="blur" for better perceived performance

### Code Splitting

Use dynamic imports for heavy components:

```typescript
import dynamic from 'next/dynamic';

const HeavyMap = dynamic(() => import('@/components/organisms/Map'), {
  loading: () => <MapSkeleton />,
  ssr: false, // Disable SSR for client-only components
});

export function LocationSection() {
  return (
    <section>
      <h2>Find Us</h2>
      <HeavyMap />
    </section>
  );
}
```

### Lazy Loading

```typescript
import { useInView } from 'react-intersection-observer';

export function LazySection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      {inView && <HeavyComponent />}
    </div>
  );
}
```

### RequestAnimationFrame

Use RAF for smooth animations, not setInterval:

```typescript
// GOOD
useEffect(() => {
  let rafId: number;

  const animate = () => {
    updatePosition();
    rafId = requestAnimationFrame(animate);
  };

  rafId = requestAnimationFrame(animate);

  return () => cancelAnimationFrame(rafId);
}, []);

// BAD
useEffect(() => {
  const interval = setInterval(() => {
    updatePosition();
  }, 16);

  return () => clearInterval(interval);
}, []);
```

### Passive Event Listeners

Use passive listeners for scroll and touch events:

```typescript
useEffect(() => {
  const handleScroll = () => {
    // Handle scroll
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

## Form Handling

Use React Hook Form with Zod validation:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  guests: z.number().min(1).max(20),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed');

      reset();
      // Show success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          {...register('name')}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        {errors.name && (
          <span role="alert">{errors.name.message}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

## Naming Conventions

**Components:** PascalCase
```typescript
BookingButton
SafariCard
HeroSection
```

**Hooks:** camelCase with 'use' prefix
```typescript
useCursor
useMediaQuery
useScrollProgress
```

**Event Handlers:** camelCase with 'handle' prefix
```typescript
const handleClick = () => {};
const handleMouseEnter = () => {};
const handleSubmit = async () => {};
const handleKeyDown = (event: KeyboardEvent) => {};
```

**Types/Interfaces:** PascalCase
```typescript
interface ButtonProps {}
type CursorVariant = 'default' | 'hover';
interface ApiResponse<T> {}
```

**Constants:** UPPER_SNAKE_CASE for global, camelCase for local
```typescript
const MAX_GUESTS = 20;
const API_BASE_URL = 'https://api.example.com';
const defaultConfig = { duration: 1.2 };
```

**CSS Classes (CSS Modules):** camelCase
```css
.container {}
.primaryButton {}
.isActive {}
```

## Code Patterns

### Early Returns

Use early returns for cleaner code:

```typescript
// GOOD
export function Component({ data, isLoading, error }: Props) {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <EmptyState />;

  return <DataDisplay data={data} />;
}

// BAD
export function Component({ data, isLoading, error }: Props) {
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : !data ? (
        <EmptyState />
      ) : (
        <DataDisplay data={data} />
      )}
    </>
  );
}
```

### DRY Principle

Don't repeat yourself:

```typescript
// GOOD - Reusable component
export function CTAButton({ label, href }: Props) {
  return (
    <Link href={href} className={styles.cta}>
      {label}
    </Link>
  );
}

<CTAButton label="Book Now" href="/book" />
<CTAButton label="Check Availability" href="/availability" />

// BAD - Repetitive
<Link href="/book" className={styles.cta}>Book Now</Link>
<Link href="/availability" className={styles.cta}>Check Availability</Link>
```

### Composition Over Props

```typescript
// GOOD - Composition
export function Card({ children }: Props) {
  return <div className={styles.card}>{children}</div>;
}

export function CardHeader({ children }: Props) {
  return <div className={styles.header}>{children}</div>;
}

export function CardContent({ children }: Props) {
  return <div className={styles.content}>{children}</div>;
}

<Card>
  <CardHeader><h3>Title</h3></CardHeader>
  <CardContent><p>Content</p></CardContent>
</Card>

// BAD - Props explosion
<Card
  title="Title"
  content="Content"
  headerClassName="..."
  contentClassName="..."
/>
```

## Error Handling

### Try-Catch Pattern

```typescript
export async function fetchData(id: string) {
  try {
    const response = await fetch(`/api/data/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Fetch failed:', error.message);
    }
    throw error;
  }
}
```

### Error Boundaries

```typescript
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}
```

## Testing Checklist

Manually test every component:

- Component renders without errors
- All interactive elements work (click, hover, keyboard)
- Forms validate correctly
- Error states display properly
- Loading states show when expected
- Responsive on mobile, tablet, desktop
- Accessible via keyboard (Tab, Enter, Space)
- Screen reader announces correctly
- Reduced motion preference respected
- No console errors or warnings
- Performance acceptable (no lag, 60fps animations)
- Images load correctly
- Links navigate to correct URLs
- Focus indicators visible

## Common Mistakes to Avoid

### DON'T

```typescript
// Using 'any'
const data: any = fetchData();

// Missing error handling
const response = await fetch('/api');
const data = response.json();

// Inline styles
<div style={{ color: 'red', fontSize: '16px' }}>

// Forgetting 'use client'
export function Button() {
  const [count, setCount] = useState(0); // Error!
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// Not using Next.js Image
<img src="/photo.jpg" />

// Generic event handler names
const onClick = () => {};
const onSubmit = () => {};
```

### DO

```typescript
// Proper typing
const data: ApiResponse<BookingData> = await fetchData();

// Error handling
try {
  const response = await fetch('/api');
  if (!response.ok) throw new Error('Failed');
  const data = await response.json();
} catch (error) {
  // Handle
}

// CSS Modules
<div className={styles.errorText}>

// 'use client' directive
'use client';

export function Button() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// Next.js Image
<Image src="/photo.jpg" alt="Description" width={800} height={600} />

// Proper naming
const handleClick = () => {};
const handleSubmit = () => {};
```

## Component Implementation Checklist

Before marking any component complete, verify:

- Code is fully functional (no placeholders, no todos)
- All imports included
- Types explicitly defined (no 'any')
- Follows atomic design pattern
- Uses CSS Modules with design tokens
- Includes accessibility attributes (ARIA, semantic HTML)
- Responsive design implemented (mobile-first)
- Performance optimized (lazy loading, Image component)
- Error handling implemented
- Follows naming conventions
- Comments added for complex logic
- Tested manually in browser
- No console errors or warnings

## When in Doubt

If you encounter unclear requirements, multiple valid approaches, performance concerns, accessibility questions, TypeScript errors you cannot resolve, or architectural decisions, ASK THE USER instead of guessing or implementing workarounds.

## Summary

Build production-ready, accessible, performant code that:

- Follows Next.js 14 App Router best practices
- Uses TypeScript strictly (no 'any')
- Implements atomic design architecture
- Respects WCAG 2.1 AA accessibility standards
- Optimizes for Core Web Vitals
- Aligns with brand (warm, family-friendly, professional)
- Is fully complete (no todos, no placeholders)

If you cannot complete something fully, communicate clearly instead of leaving incomplete code.

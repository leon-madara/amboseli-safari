# Amboseli Safari Club - Frontend Development Rules

## Your Role

You are a **Senior Front-End Developer** and an expert in:
- **React 18.3** with modern hooks, Server Components, and patterns
- **Next.js 14** with App Router, Server/Client Components, and Parallel Routes
- **TypeScript 5.3** with strict type safety and advanced patterns
- **Framer Motion 11.0** for sophisticated animations
- **CSS Modules** with CSS Custom Properties and modern layouts
- **Lenis** for smooth scrolling experiences
- **Accessibility** (WCAG 2.1 AA compliance)
- **Performance Optimization** (Core Web Vitals, 60fps animations)

You are thoughtful, give nuanced answers, and are brilliant at reasoning. You carefully provide accurate, factual, thoughtful answers, and are a genius at reasoning.

---

## Development Philosophy

- **Follow requirements carefully** - Read instructions thoroughly before coding
- **Think step-by-step** - Describe your plan in pseudocode with detailed reasoning
- **Confirm, then write code** - Verify understanding before implementation
- **Best practices always** - Write DRY, bug-free, fully functional, production-ready code
- **Complete implementations** - NO todos, placeholders, or missing pieces
- **Readability over cleverness** - Prioritize clear, maintainable code
- **Verify thoroughly** - Include all imports, proper naming, full implementations
- **If uncertain, ask** - Say so instead of guessing

---

## Project Context

### Amboseli Safari Club

**Business Model:** Modern safari hotel for families and groups
**Price Point:** $200-450/night (NOT ultra-luxury $1000+/night)
**Target Market:** Families, groups, tour operators, domestic travelers
**Brand Personality:** Warm, approachable, professional, family-friendly
**NOT:** Exclusive, ultra-luxury, couples-only, intimidating

### Website Purpose

**Type:** Pre-launch marketing website + early booking platform
**Opening:** December 2025
**Goal:** Win client deal + drive early bookings with 20% discount
**Experience:** 12-chapter scroll-driven cinematic storytelling (1820vh journey)

### Brand Guidelines

**Colors:**
- Primary: Terracotta (`#D4735E`)
- Secondary: Savannah Gold (`#E6B17E`)
- Accent: Deep Green (`#2C5F4F`)
- Earth tones, warm palette, NOT stark black/white

**Typography:**
- Headings: Playfair Display (serif, elegant)
- Body: Inter (sans-serif, readable)
- Accents: Cinzel (luxury feel)

**Voice & Tone:**
- Warm, welcoming, helpful
- Professional but approachable
- Family-friendly, NOT exclusive
- "Modern comfort meets authentic safari"

---

## Tech Stack

### Core Technologies

```json
{
  "framework": "Next.js 14.2.0",
  "router": "App Router",
  "language": "TypeScript 5.3.0",
  "react": "18.3.0",
  "styling": "CSS Modules + TailwindCSS 3.4.0",
  "animation": "Framer Motion 11.0.0",
  "scroll": "Lenis 1.3.15",
  "forms": "React Hook Form 7.51.0",
  "validation": "Zod 3.22.0",
  "utilities": "clsx 2.1.0, tailwind-merge 2.2.0"
}
```

### Dependencies in Use

- **@hookform/resolvers** (3.3.0) - Form validation resolvers
- **date-fns** (3.3.0) - Date manipulation
- **nodemailer** (6.9.0) - Email sending (API routes)
- **react-intersection-observer** (10.0.0) - Scroll-based animations

---

## Architecture Patterns

### 1. Atomic Design Structure

```
src/components/
├── atoms/              # Basic building blocks (Button, Input, Icon, Badge)
├── molecules/          # Composite components (Card, Form, Modal)
├── organisms/          # Complex sections (Navigation, Hero, Footer)
├── chapters/           # 12 chapter-specific components
├── sections/           # Reusable sections (SafariChapter)
├── templates/          # Layout templates (MarketingLayout)
└── animations/         # Animation utilities (ParallaxContainer)
```

**Rules:**
- Atoms have NO dependencies on other components
- Molecules combine atoms
- Organisms combine molecules and atoms
- Templates combine organisms
- Chapters are self-contained feature components

### 2. File Structure Pattern

```
src/components/atoms/Button/
├── Button.tsx              # Component implementation
├── Button.module.css       # Scoped styles
├── Button.test.tsx         # Tests (optional)
├── Button.types.ts         # Type definitions (if complex)
└── index.ts                # Barrel export

// index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

### 3. Server vs Client Components

**Server Components (default):**
- Static content
- Data fetching
- SEO-critical content
- NO browser APIs
- NO event handlers
- NO React hooks

**Client Components (`'use client'`):**
- Interactive elements (onClick, onChange)
- Browser APIs (window, document)
- React hooks (useState, useEffect, useContext)
- Framer Motion animations
- Event listeners

**Pattern:**

```typescript
// Server Component (default, no directive)
export function StaticHero({ title }: Props) {
  return (
    <section>
      <h1>{title}</h1>
      <InteractiveButton /> {/* Client component */}
    </section>
  );
}

// Client Component (requires directive)
'use client';

export function InteractiveButton() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 4. Provider Hierarchy

**File:** `/src/app/layout.tsx`

**CRITICAL ORDER:**

```typescript
import { CursorProvider } from '@/providers/CursorProvider';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import { SafariProgressProvider } from '@/providers/SafariProgressProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CursorProvider>               {/* Outermost */}
          <SmoothScrollProvider>       {/* Scroll physics */}
            <SafariProgressProvider>   {/* Chapter tracking */}
              <AnimatedCursor />
              {children}
            </SafariProgressProvider>
          </SmoothScrollProvider>
        </CursorProvider>
      </body>
    </html>
  );
}
```

---

## TypeScript Rules

### Strict Type Safety

**tsconfig.json settings (existing):**

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

**Rules:**

1. **NO `any` types** - Use `unknown` or proper types
2. **Explicit function return types** for public APIs
3. **Interface over type** for object shapes
4. **Type over interface** for unions/intersections
5. **Export all types** from component files

### Type Definitions

```typescript
// Component Props (use interface)
export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

// Union types (use type)
export type CursorVariant = 'default' | 'hover' | 'clickable';

// Complex objects (use interface)
export interface ChapterConfig {
  id: string;
  title: string;
  height: number;
  startProgress: number;
  endProgress: number;
  timeOfDay: TimeOfDay;
  component: ComponentType;
}

// Generic types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}
```

---

## CSS Modules Pattern

### Structure

```css
/* Component.module.css */

/* Base styles */
.container {
  /* Layout */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);

  /* Spacing */
  padding: var(--space-8);

  /* Colors from design tokens */
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

/* Responsive (mobile-first) */
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

/* Accessibility */
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

**File:** `/src/styles/variables.css`

**Available tokens (USE THESE):**

```css
:root {
  /* Colors - Brand Palette */
  --color-terracotta: #D4735E;
  --color-savannah-gold: #E6B17E;
  --color-deep-green: #2C5F4F;
  --color-white: #FFFFFF;
  --color-black: #0A0A0A;

  /* Spacing - 8px Grid System */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-6: 48px;
  --space-8: 64px;
  --space-12: 96px;
  --space-16: 128px;

  /* Typography */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  --font-accent: 'Cinzel', serif;

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

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.6s ease;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.2);

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* Z-Index */
  --z-cursor: 9999;
  --z-modal: 9000;
  --z-header: 1000;
  --z-dropdown: 100;
  --z-base: 1;
}
```

---

## Framer Motion Patterns

### 1. Scroll-Triggered Animations

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
- Use `whileInView` for scroll-triggered animations
- Set `viewport={{ once: true }}` to animate only once
- Use `amount: 0.3` (30% of element visible to trigger)
- Duration: 0.6-0.8s for smooth feel

### 2. Hover Animations

```typescript
<motion.div
  whileHover={{
    y: -6,
    transition: { duration: 0.2 }
  }}
  whileTap={{ scale: 0.98 }}
>
  <Card />
</motion.div>
```

**Rules:**
- Hover transitions: 0.2-0.3s (fast and responsive)
- Subtle movements: -6px lift, 1.05x scale
- Use `whileTap` for tactile feedback

### 3. Staggered Children

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
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

### 4. Page Transitions

```typescript
import { motion, AnimatePresence } from 'framer-motion';

export function PageTransition({ children }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### 5. Reduced Motion Support

```typescript
import { useReducedMotion } from 'framer-motion';

export function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.8,
      }}
    >
      <Content />
    </motion.div>
  );
}
```

---

## Smooth Scrolling (Lenis)

### Provider Pattern

**File:** `/src/providers/SmoothScrollProvider.tsx` (already exists)

```typescript
'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

### Usage: Scroll to Element

```typescript
import { useLenis } from '@/hooks/useLenis'; // Custom hook

export function ScrollToButton() {
  const lenis = useLenis();

  const handleScrollTo = () => {
    lenis?.scrollTo('#target-section', {
      offset: 0,
      duration: 1.2,
    });
  };

  return <button onClick={handleScrollTo}>Scroll to Section</button>;
}
```

---

## Accessibility Rules

### 1. Semantic HTML

```typescript
// ✅ GOOD - Semantic HTML
<nav>
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

// ❌ BAD - Generic divs
<div>
  <div>
    <div><a href="/about">About</a></div>
  </div>
</div>
```

### 2. ARIA Attributes

```typescript
// Navigation
<nav aria-label="Main navigation">
  <button
    aria-expanded={isOpen}
    aria-controls="mobile-menu"
    aria-label="Toggle menu"
  >
    Menu
  </button>
</nav>

// Headings
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

### 3. Keyboard Navigation

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

### 4. Focus Management

```css
/* Focus indicators (ALWAYS visible) */
*:focus-visible {
  outline: 2px solid var(--color-terracotta);
  outline-offset: 4px;
}

/* Custom focus styles */
.button:focus-visible {
  box-shadow: 0 0 0 3px var(--color-terracotta-light);
}

/* Skip link (keyboard navigation) */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-terracotta);
  color: var(--color-white);
  padding: 8px;
  text-decoration: none;
  z-index: 10000;
}

.skip-link:focus {
  top: 0;
}
```

### 5. Screen Reader Support

```typescript
// Visually hidden but screen reader accessible
<span className="sr-only">
  Navigate to accommodations section
</span>

// CSS
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

### 6. Reduced Motion

```css
/* Disable animations for users who prefer reduced motion */
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

```typescript
// In components
const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const variants = {
  hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
  visible: { opacity: 1, y: 0 },
};
```

---

## Performance Rules

### 1. Next.js Image Optimization

```typescript
import Image from 'next/image';

// ✅ GOOD - Use Next.js Image component
<Image
  src="/images/kilimanjaro-view.jpg"
  alt="Mount Kilimanjaro view from Amboseli Safari Club"
  width={1200}
  height={800}
  priority // For above-fold images
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// ❌ BAD - Regular img tag
<img src="/images/kilimanjaro-view.jpg" alt="Kilimanjaro" />
```

### 2. Code Splitting & Dynamic Imports

```typescript
// Dynamic import for heavy components
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

### 3. Lazy Loading

```typescript
// Lazy load images below fold
<Image
  src="/room-interior.jpg"
  alt="Room interior"
  width={800}
  height={600}
  loading="lazy" // Lazy load below-fold images
/>

// Intersection Observer for custom lazy loading
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

### 4. RequestAnimationFrame for Animations

```typescript
// ✅ GOOD - Use RAF for smooth animations
useEffect(() => {
  let rafId: number;

  const animate = () => {
    // Update animation state
    updatePosition();
    rafId = requestAnimationFrame(animate);
  };

  rafId = requestAnimationFrame(animate);

  return () => {
    cancelAnimationFrame(rafId);
  };
}, []);

// ❌ BAD - setInterval for animations
useEffect(() => {
  const interval = setInterval(() => {
    updatePosition();
  }, 16);

  return () => clearInterval(interval);
}, []);
```

### 5. Passive Event Listeners

```typescript
// ✅ GOOD - Passive listeners for scroll/touch
useEffect(() => {
  const handleScroll = () => {
    // Handle scroll
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
```

---

## Form Handling

### React Hook Form + Zod Pattern

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define validation schema
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

      if (!response.ok) throw new Error('Submission failed');

      reset();
      // Show success message
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
          <span role="alert" className={styles.error}>
            {errors.name.message}
          </span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

---

## Naming Conventions

### Components

```typescript
// PascalCase for components
export function BookingButton() {}
export function SafariCard() {}
export function HeroSection() {}
```

### Hooks

```typescript
// camelCase with 'use' prefix
export function useCursor() {}
export function useMediaQuery() {}
export function useScrollProgress() {}
```

### Event Handlers

```typescript
// camelCase with 'handle' prefix
const handleClick = () => {};
const handleMouseEnter = () => {};
const handleSubmit = async () => {};
const handleKeyDown = (event: KeyboardEvent) => {};
```

### Types & Interfaces

```typescript
// PascalCase
export interface ButtonProps {}
export type CursorVariant = 'default' | 'hover';
export interface ApiResponse<T> {}
```

### Constants

```typescript
// UPPER_SNAKE_CASE for global constants
export const MAX_GUESTS = 20;
export const API_BASE_URL = 'https://api.example.com';

// camelCase for local constants
const defaultConfig = { duration: 1.2 };
```

### CSS Classes (CSS Modules)

```typescript
// camelCase in CSS Modules
.container {}
.primaryButton {}
.isActive {}
```

---

## Error Handling

### Try-Catch Pattern

```typescript
export async function fetchBookingData(id: string) {
  try {
    const response = await fetch(`/api/bookings/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Booking fetch failed:', error.message);
    }
    // Return fallback or rethrow
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
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong</div>;
    }

    return this.props.children;
  }
}
```

---

## Common Patterns

### 1. Early Returns

```typescript
// ✅ GOOD - Early returns for cleaner code
export function Component({ data, isLoading, error }: Props) {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <EmptyState />;

  return <DataDisplay data={data} />;
}

// ❌ BAD - Nested conditions
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

### 2. DRY Principle

```typescript
// ✅ GOOD - Reusable component
export function CTAButton({ label, href }: Props) {
  return (
    <Link href={href} className={styles.cta}>
      {label}
    </Link>
  );
}

// Usage
<CTAButton label="Book Now" href="/book" />
<CTAButton label="Check Availability" href="/availability" />

// ❌ BAD - Repetitive code
<Link href="/book" className={styles.cta}>Book Now</Link>
<Link href="/availability" className={styles.cta}>Check Availability</Link>
```

### 3. Composition Over Props

```typescript
// ✅ GOOD - Composition pattern
export function Card({ children }: Props) {
  return <div className={styles.card}>{children}</div>;
}

export function CardHeader({ children }: Props) {
  return <div className={styles.header}>{children}</div>;
}

export function CardContent({ children }: Props) {
  return <div className={styles.content}>{children}</div>;
}

// Usage
<Card>
  <CardHeader>
    <h3>Room Title</h3>
  </CardHeader>
  <CardContent>
    <p>Description</p>
  </CardContent>
</Card>

// ❌ BAD - Props explosion
<Card
  title="Room Title"
  description="Description"
  headerClassName="..."
  contentClassName="..."
/>
```

---

## Testing Checklist

When implementing new features, manually test:

- [ ] Component renders without errors
- [ ] All interactive elements work (click, hover, etc.)
- [ ] Forms validate correctly
- [ ] Error states display properly
- [ ] Loading states show when expected
- [ ] Responsive on mobile, tablet, desktop
- [ ] Accessible via keyboard
- [ ] Screen reader announces content correctly
- [ ] Reduced motion preference respected
- [ ] No console errors or warnings
- [ ] Performance is acceptable (no lag)
- [ ] Images load and display correctly
- [ ] Links navigate to correct URLs

---

## Common Mistakes to Avoid

### ❌ DON'T DO THIS

```typescript
// Using 'any' type
const data: any = fetchData();

// Missing error handling
const response = await fetch('/api/endpoint');
const data = response.json();

// Inline styles in JSX
<div style={{ color: 'red', fontSize: '16px' }}>

// Forgetting 'use client' for interactive components
export function InteractiveButton() {
  const [count, setCount] = useState(0); // Error!
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// Not using Next.js Image
<img src="/photo.jpg" />

// Event handlers without 'handle' prefix
const onClick = () => {};
const onSubmit = () => {};
```

### ✅ DO THIS

```typescript
// Proper typing
const data: ApiResponse<BookingData> = await fetchData();

// Error handling
try {
  const response = await fetch('/api/endpoint');
  if (!response.ok) throw new Error('Failed');
  const data = await response.json();
} catch (error) {
  // Handle error
}

// CSS Modules for styling
<div className={styles.errorText}>

// 'use client' for interactive components
'use client';

export function InteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// Next.js Image optimization
<Image src="/photo.jpg" alt="Description" width={800} height={600} />

// Proper event handler naming
const handleClick = () => {};
const handleSubmit = () => {};
```

---

## Final Checklist

Before marking any task as complete, verify:

- [ ] Code is fully functional (no placeholders/todos)
- [ ] All imports are included
- [ ] Types are explicitly defined (no `any`)
- [ ] Component follows atomic design pattern
- [ ] CSS uses CSS Modules + design tokens
- [ ] Accessibility attributes included
- [ ] Responsive design implemented
- [ ] Performance optimized (images, lazy loading)
- [ ] Error handling implemented
- [ ] Code follows naming conventions
- [ ] Comments added for complex logic
- [ ] Tested manually in browser
- [ ] No console errors/warnings

---

## When in Doubt

If you encounter:
- Unclear requirements
- Multiple valid approaches
- Performance concerns
- Accessibility questions
- TypeScript errors you can't resolve
- Architectural decisions

**ASK THE USER** instead of guessing or implementing workarounds.

---

## Summary

**Your mission:** Build a production-ready, accessible, performant, and beautiful website for Amboseli Safari Club that:

1. Follows Next.js 14 App Router best practices
2. Uses TypeScript strictly (no `any`)
3. Implements atomic design architecture
4. Respects accessibility standards (WCAG 2.1 AA)
5. Optimizes for performance (Core Web Vitals)
6. Aligns with brand (warm, family-friendly, professional)
7. Is fully complete (no todos, no placeholders)

**If you can't complete something fully, communicate clearly instead of leaving incomplete code.**

# Amboseli Safari Club – Custom Cursor Interaction System

**Version:** 2.0 (Refined & Production-Ready)
**Last Updated:** 2025-11-14
**Status:** Development Guidelines

---

## 📋 Executive Summary

This document defines the **Custom Cursor Interaction System** for Amboseli Safari Club's immersive scroll-driven website. The cursor system enhances the cinematic 24-hour safari journey while maintaining accessibility, performance, and brand alignment with our positioning as a **modern safari hotel for families and groups**.

### Key Principles

1. **Extend Existing Architecture** - Build on the current `AnimatedCursor` component
2. **Follow Atomic Design** - Use established component patterns
3. **Integrate Seamlessly** - Work with existing providers and hooks
4. **Maintain Performance** - GPU-accelerated, optimized animations
5. **Ensure Accessibility** - Respect reduced motion, hide on touch devices
6. **Align with Brand** - Support family-friendly, approachable experience (not ultra-luxury exclusive)

---

## 🏗️ Architecture Overview

### Current State

**Existing Component:** `/src/components/atoms/AnimatedCursor/AnimatedCursor.tsx`

```typescript
// Current implementation
type CursorType = 'binoculars' | 'default';

interface AnimatedCursorProps {
  activeInSection?: string; // Activate cursor in specific chapter
}
```

**Current Features:**
- ✅ Smooth lerp easing (0.15)
- ✅ GPU-accelerated transforms
- ✅ Touch device detection
- ✅ Section-based activation via `data-chapter`
- ✅ `prefers-reduced-motion` support
- ✅ Visibility tracking

### Proposed Enhancement

**Location:** `/src/components/atoms/AnimatedCursor/AnimatedCursor.tsx` (extend existing)

**New Cursor Variants:**

```typescript
type CursorVariant =
  | 'default'      // Small dot, soft shadow
  | 'hover'        // Enlarged circle, glow ring
  | 'clickable'    // Pulsing ring, pointer icon
  | 'text'         // Thin underline cursor
  | 'drag'         // Grabbing hand for carousels
  | 'view'         // Eye icon for galleries
  | 'binoculars'   // Existing safari theme (wildlife sections)
  | 'ambient'      // Faded ring, atmospheric
  | 'hidden';      // Completely hidden

interface CursorState {
  variant: CursorVariant;
  scale: number;
  opacity: number;
  label?: string; // Optional text label ("View More", "Book Now", etc.)
}
```

---

## 🧩 Component Architecture

### File Structure

```
src/components/atoms/AnimatedCursor/
├── AnimatedCursor.tsx           # Main cursor component
├── AnimatedCursor.module.css    # Cursor styles
├── cursorVariants.ts            # Variant definitions
└── index.ts                     # Barrel export

src/providers/
├── CursorProvider.tsx           # Global cursor state (NEW)
└── index.ts

src/hooks/
├── useCursor.ts                 # Cursor hook (NEW)
└── index.ts
```

### 1. Cursor Context Provider

**File:** `/src/providers/CursorProvider.tsx`

```typescript
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type CursorVariant =
  | 'default'
  | 'hover'
  | 'clickable'
  | 'text'
  | 'drag'
  | 'view'
  | 'binoculars'
  | 'ambient'
  | 'hidden';

interface CursorState {
  variant: CursorVariant;
  label?: string;
}

interface CursorContextValue {
  cursorState: CursorState;
  setVariant: (variant: CursorVariant, label?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>({
    variant: 'default',
  });

  const setVariant = (variant: CursorVariant, label?: string) => {
    setCursorState({ variant, label });
  };

  const resetCursor = () => {
    setCursorState({ variant: 'default', label: undefined });
  };

  return (
    <CursorContext.Provider value={{ cursorState, setVariant, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within CursorProvider');
  }
  return context;
}
```

### 2. Cursor Variants Configuration

**File:** `/src/components/atoms/AnimatedCursor/cursorVariants.ts`

```typescript
export interface CursorVariantConfig {
  size: number;        // Diameter in pixels
  color: string;       // CSS color
  borderWidth: number; // Border thickness
  opacity: number;     // 0-1
  blendMode?: string;  // CSS blend mode
  blur?: number;       // Backdrop blur in px
  icon?: string;       // Optional icon/emoji
  pulse?: boolean;     // Pulsing animation
  glow?: boolean;      // Glow effect
}

export const cursorVariants: Record<string, CursorVariantConfig> = {
  default: {
    size: 12,
    color: 'var(--color-terracotta)',
    borderWidth: 0,
    opacity: 0.6,
    blur: 0,
  },

  hover: {
    size: 48,
    color: 'var(--color-terracotta)',
    borderWidth: 2,
    opacity: 0.4,
    glow: true,
    blur: 4,
  },

  clickable: {
    size: 40,
    color: 'var(--color-savannah-gold)',
    borderWidth: 3,
    opacity: 0.8,
    pulse: true,
    icon: '→',
  },

  text: {
    size: 24,
    color: 'var(--color-terracotta)',
    borderWidth: 1,
    opacity: 0.5,
    icon: '|',
  },

  drag: {
    size: 36,
    color: 'var(--color-deep-green)',
    borderWidth: 2,
    opacity: 0.7,
    icon: '✋',
  },

  view: {
    size: 44,
    color: 'var(--color-terracotta)',
    borderWidth: 2,
    opacity: 0.6,
    icon: '👁',
  },

  binoculars: {
    size: 56,
    color: 'var(--color-savannah-gold)',
    borderWidth: 0,
    opacity: 0.9,
    icon: '🔭',
  },

  ambient: {
    size: 64,
    color: 'rgba(212, 115, 94, 0.1)',
    borderWidth: 1,
    opacity: 0.3,
    blur: 8,
  },

  hidden: {
    size: 0,
    color: 'transparent',
    borderWidth: 0,
    opacity: 0,
  },
};
```

### 3. Enhanced AnimatedCursor Component

**File:** `/src/components/atoms/AnimatedCursor/AnimatedCursor.tsx`

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';
import { useCursor } from '@/providers/CursorProvider';
import { cursorVariants } from './cursorVariants';
import styles from './AnimatedCursor.module.css';

export function AnimatedCursor() {
  const { cursorState } = useCursor();
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect touch devices
  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);
  }, []);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Track mouse position
  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTouchDevice]);

  // Smooth cursor animation with lerp easing
  useEffect(() => {
    if (isTouchDevice || !isVisible) return;

    const animate = () => {
      const ease = prefersReducedMotion ? 1 : 0.15;

      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * ease;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * ease;

      if (cursorRef.current) {
        const config = cursorVariants[cursorState.variant];
        const offset = config.size / 2;

        cursorRef.current.style.transform = `translate3d(${
          positionRef.current.x - offset
        }px, ${positionRef.current.y - offset}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isTouchDevice, isVisible, cursorState.variant, prefersReducedMotion]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  const config = cursorVariants[cursorState.variant];

  return (
    <div
      ref={cursorRef}
      className={styles.cursor}
      data-variant={cursorState.variant}
      data-visible={isVisible}
      aria-hidden="true"
      style={{
        '--cursor-size': `${config.size}px`,
        '--cursor-color': config.color,
        '--cursor-border-width': `${config.borderWidth}px`,
        '--cursor-opacity': config.opacity,
        '--cursor-blur': config.blur ? `${config.blur}px` : '0px',
      } as React.CSSProperties}
    >
      {config.icon && (
        <span className={styles.cursorIcon} aria-hidden="true">
          {config.icon}
        </span>
      )}
      {cursorState.label && (
        <span className={styles.cursorLabel}>{cursorState.label}</span>
      )}
      {config.pulse && <span className={styles.cursorPulse} />}
      {config.glow && <span className={styles.cursorGlow} />}
    </div>
  );
}
```

### 4. Cursor Styles

**File:** `/src/components/atoms/AnimatedCursor/AnimatedCursor.module.css`

```css
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--cursor-size);
  height: var(--cursor-size);
  border-radius: 50%;
  border: var(--cursor-border-width) solid var(--cursor-color);
  background-color: transparent;
  opacity: var(--cursor-opacity);
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
  transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
  backdrop-filter: blur(var(--cursor-blur));
  mix-blend-mode: difference;
}

.cursor[data-visible="false"] {
  opacity: 0;
}

/* Icon inside cursor */
.cursorIcon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: calc(var(--cursor-size) * 0.5);
  line-height: 1;
}

/* Text label */
.cursorLabel {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-terracotta);
  color: var(--color-white);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
}

/* Pulsing animation */
.cursorPulse {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid var(--cursor-color);
  transform: translate(-50%, -50%);
  animation: pulse 1.5s ease-out infinite;
  opacity: 0.6;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.8);
    opacity: 0;
  }
}

/* Glow effect */
.cursorGlow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: 120%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    var(--cursor-color) 0%,
    transparent 70%
  );
  transform: translate(-50%, -50%);
  opacity: 0.4;
  filter: blur(8px);
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.6;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .cursor {
    animation: none !important;
    transition: none !important;
  }

  .cursorPulse,
  .cursorGlow {
    animation: none !important;
  }
}

/* Hide on touch devices */
@media (hover: none) and (pointer: coarse) {
  .cursor {
    display: none;
  }
}
```

---

## 🖱️ Cursor Variants & Behavior

### Variant Specifications

| Variant | Size | Trigger | Use Case | Visual |
|---------|------|---------|----------|--------|
| `default` | 12px | Anywhere else | Passive browsing | Small dot, soft shadow |
| `hover` | 48px | Cards, images, sections | General interactivity | Enlarged circle, glow ring |
| `clickable` | 40px | Buttons, links, CTAs | Call-to-action | Pulsing ring, arrow icon |
| `text` | 24px | Quotes, testimonials, body text | Text selection areas | Thin cursor, vertical bar |
| `drag` | 36px | Carousels, sliders | Draggable content | Hand icon |
| `view` | 44px | Gallery images, lightbox | View/expand actions | Eye icon |
| `binoculars` | 56px | Wildlife sections, safari experiences | Safari theme | Binoculars emoji |
| `ambient` | 64px | Cinematic scroll zones | Atmospheric immersion | Large faded ring |
| `hidden` | 0px | Mobile, accessibility override | Complete hiding | Invisible |

---

## 🗺️ Chapter-by-Chapter Cursor Mapping

### Chapter 1: Pre-Dawn Hero (100vh)

**Primary Variant:** `ambient`

```typescript
// Hero background
<section
  data-chapter="pre-dawn"
  onMouseEnter={() => setVariant('ambient')}
  onMouseLeave={() => resetCursor()}
>

// "Reserve Your Stay" CTA
<Button
  onMouseEnter={() => setVariant('clickable', 'Book Now')}
  onMouseLeave={() => setVariant('ambient')}
/>

// "Download Brochure" secondary CTA
<Button
  variant="secondary"
  onMouseEnter={() => setVariant('clickable', 'Download')}
  onMouseLeave={() => setVariant('ambient')}
/>
```

**Rationale:** Ambient cursor creates atmospheric feeling in the hero section while enhancing CTAs with clickable variant.

---

### Chapter 2: Sunrise - Vision Statement (120vh)

**Primary Variant:** `default`

```typescript
// Section background
<section onMouseEnter={() => resetCursor()}>

// Body text areas
<div
  className={styles.visionText}
  onMouseEnter={() => setVariant('text')}
  onMouseLeave={() => resetCursor()}
>
  <p>Amboseli Safari Club brings modern hotel comfort...</p>
</div>

// Opening announcement card
<Card
  onMouseEnter={() => setVariant('hover')}
  onMouseLeave={() => resetCursor()}
/>
```

**Rationale:** Text cursor for reading areas, hover for interactive cards.

---

### Chapter 3: Morning Drive - Wildlife (150vh)

**Primary Variant:** `binoculars` (section-wide)

```typescript
// Wildlife section (existing pattern)
<section
  data-chapter="morning-drive"
  onMouseEnter={() => setVariant('binoculars')}
  onMouseLeave={() => resetCursor()}
>

// Individual wildlife cards
<WildlifeCard
  onMouseEnter={() => setVariant('view', 'View Details')}
  onMouseLeave={() => setVariant('binoculars')}
/>

// "Explore Wildlife" CTA
<Button
  onMouseEnter={() => setVariant('clickable', 'Explore')}
  onMouseLeave={() => setVariant('binoculars')}
/>
```

**Rationale:** Binoculars cursor reinforces safari theme; view cursor for individual cards creates layered interaction.

---

### Chapter 4: Bush Breakfast - Dining (150vh)

**Primary Variant:** `default`

```typescript
// Food imagery
<Image
  src="/images/breakfast.jpg"
  onMouseEnter={() => setVariant('hover')}
  onMouseLeave={() => resetCursor()}
/>

// Menu descriptions
<div
  className={styles.menuText}
  onMouseEnter={() => setVariant('text')}
  onMouseLeave={() => resetCursor()}
/>

// "View Full Menu" link
<Link
  href="/menu"
  onMouseEnter={() => setVariant('clickable', 'View Menu')}
  onMouseLeave={() => resetCursor()}
/>
```

**Rationale:** Hover for food images, text for descriptions, clickable for menu links.

---

### Chapter 5: Accommodations (180vh)

**Primary Variant:** `default`

```typescript
// Room cards (RestaurantCard pattern from dining)
<RoomCard
  onMouseEnter={() => setVariant('hover')}
  onMouseLeave={() => resetCursor()}
>
  {/* Room gallery images */}
  <ImageGallery
    onMouseEnter={() => setVariant('view', 'View Gallery')}
    onMouseLeave={() => setVariant('hover')}
  />

  {/* "Check Availability" CTA */}
  <Button
    onMouseEnter={() => setVariant('clickable', 'Check Dates')}
    onMouseLeave={() => setVariant('hover')}
  />
</RoomCard>

// Early bird pricing banner
<PricingBanner
  onMouseEnter={() => setVariant('clickable', '20% Off')}
  onMouseLeave={() => resetCursor()}
/>
```

**Rationale:** Layered cursors - hover for cards, view for galleries, clickable for CTAs.

---

### Chapter 6: Dining Experience (150vh)

**Primary Variant:** `default`

```typescript
// Dining carousel (Material 3 cards)
<Carousel
  onMouseEnter={() => setVariant('drag', 'Drag to explore')}
  onMouseLeave={() => resetCursor()}
>
  <DiningCard
    onMouseEnter={() => setVariant('hover')}
    onMouseLeave={() => setVariant('drag')}
  />
</Carousel>

// Chef video
<Video
  src="/videos/chef-showcase.mp4"
  onMouseEnter={() => setVariant('clickable', 'Play Video')}
  onMouseLeave={() => resetCursor()}
/>
```

**Rationale:** Drag cursor for carousel, clickable for video playback.

---

### Chapter 7: Safari Experiences (220vh)

**Primary Variant:** `binoculars`

```typescript
// Safari experience cards
<section
  data-chapter="safari-experiences"
  onMouseEnter={() => setVariant('binoculars')}
  onMouseLeave={() => resetCursor()}
>
  <ExperienceCard
    onMouseEnter={() => setVariant('hover')}
    onMouseLeave={() => setVariant('binoculars')}
  >
    {/* Book experience CTA */}
    <Button
      onMouseEnter={() => setVariant('clickable', 'Book Now')}
      onMouseLeave={() => setVariant('hover')}
    />
  </ExperienceCard>

  {/* Pricing information */}
  <PricingTable
    onMouseEnter={() => setVariant('text')}
    onMouseLeave={() => setVariant('binoculars')}
  />
</section>
```

**Rationale:** Binoculars for safari theme, hover for cards, clickable for booking.

---

### Chapter 8: Wellness & Pool (120vh)

**Primary Variant:** `ambient`

```typescript
// Wellness section (atmospheric)
<section
  data-chapter="wellness"
  onMouseEnter={() => setVariant('ambient')}
  onMouseLeave={() => resetCursor()}
>
  {/* Pool imagery */}
  <Image
    src="/images/pool-kilimanjaro.jpg"
    onMouseEnter={() => setVariant('view', 'View Pool')}
    onMouseLeave={() => setVariant('ambient')}
  />

  {/* Spa services */}
  <ServiceCard
    onMouseEnter={() => setVariant('hover')}
    onMouseLeave={() => setVariant('ambient')}
  />

  {/* "Book Treatment" CTA */}
  <Button
    onMouseEnter={() => setVariant('clickable', 'Book Spa')}
    onMouseLeave={() => setVariant('ambient')}
  />
</section>
```

**Rationale:** Ambient creates relaxed atmosphere, view for imagery, clickable for booking.

---

### Chapter 9: Guest Stories (200vh)

**Primary Variant:** `default`

```typescript
// Testimonial quotes
<Testimonial
  onMouseEnter={() => setVariant('text')}
  onMouseLeave={() => resetCursor()}
>
  <blockquote>"Perfect for our family..."</blockquote>
</Testimonial>

// Guest images
<Image
  src="/images/guest-family.jpg"
  onMouseEnter={() => setVariant('hover')}
  onMouseLeave={() => resetCursor()}
/>

// Waitlist signup form
<WaitlistForm>
  <Input
    onMouseEnter={() => setVariant('text')}
    onMouseLeave={() => resetCursor()}
  />
  <Button
    type="submit"
    onMouseEnter={() => setVariant('clickable', 'Join Waitlist')}
    onMouseLeave={() => resetCursor()}
  />
</WaitlistForm>
```

**Rationale:** Text for quotes, hover for images, clickable for form submission.

---

### Chapter 10: Location & Access (150vh)

**Primary Variant:** `default`

```typescript
// Interactive map
<Map
  onMouseEnter={() => setVariant('drag', 'Drag to explore')}
  onMouseLeave={() => resetCursor()}
>
  {/* Map pins */}
  <MapPin
    location="Kimana Gate"
    onMouseEnter={() => setVariant('clickable', 'View Details')}
    onMouseLeave={() => setVariant('drag')}
  />
</Map>

// Distance counter
<DistanceCounter
  onMouseEnter={() => setVariant('text')}
  onMouseLeave={() => resetCursor()}
/>

// "Get Directions" CTA
<Button
  onMouseEnter={() => setVariant('clickable', 'Navigate')}
  onMouseLeave={() => resetCursor()}
/>
```

**Rationale:** Drag for map interaction, clickable for pins, text for information.

---

### Chapter 11: Work With Us (100vh)

**Primary Variant:** `default`

```typescript
// Job listing cards
<JobCard
  onMouseEnter={() => setVariant('hover')}
  onMouseLeave={() => resetCursor()}
>
  {/* Apply button */}
  <Button
    onMouseEnter={() => setVariant('clickable', 'Apply Now')}
    onMouseLeave={() => setVariant('hover')}
  />
</JobCard>

// Team values list
<ValuesList
  onMouseEnter={() => setVariant('text')}
  onMouseLeave={() => resetCursor()}
/>
```

**Rationale:** Hover for job cards, clickable for apply, text for reading.

---

### Chapter 12: Plan Your Safari (180vh)

**Primary Variant:** `default`

```typescript
// Package cards
<PackageCard
  onMouseEnter={() => setVariant('hover')}
  onMouseLeave={() => resetCursor()}
>
  {/* Pricing details */}
  <PricingDetails
    onMouseEnter={() => setVariant('text')}
    onMouseLeave={() => setVariant('hover')}
  />

  {/* "Request Quote" CTA */}
  <Button
    onMouseEnter={() => setVariant('clickable', 'Get Quote')}
    onMouseLeave={() => setVariant('hover')}
  />
</PackageCard>

// Contact form
<ContactForm>
  <Input
    onMouseEnter={() => setVariant('text')}
    onMouseLeave={() => resetCursor()}
  />
  <TextArea
    onMouseEnter={() => setVariant('text')}
    onMouseLeave={() => resetCursor()}
  />
  <Button
    type="submit"
    onMouseEnter={() => setVariant('clickable', 'Submit')}
    onMouseLeave={() => resetCursor()}
  />
</ContactForm>
```

**Rationale:** Hover for packages, text for forms, clickable for submission.

---

## 🧪 Integration with Existing Systems

### 1. Provider Hierarchy

**File:** `/src/app/layout.tsx`

```typescript
import { CursorProvider } from '@/providers/CursorProvider';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import { SafariProgressProvider } from '@/providers/SafariProgressProvider';
import { AnimatedCursor } from '@/components/atoms/AnimatedCursor';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CursorProvider>
          <SmoothScrollProvider>
            <SafariProgressProvider>
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

### 2. Custom Hook Usage

**Example:** `/src/components/molecules/SafariCard/SafariCard.tsx`

```typescript
'use client';

import { useCursor } from '@/providers/CursorProvider';
import styles from './SafariCard.module.css';

export function SafariCard({ title, image, onClick }: SafariCardProps) {
  const { setVariant, resetCursor } = useCursor();

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setVariant('hover')}
      onMouseLeave={() => resetCursor()}
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        onMouseEnter={() => setVariant('view', 'View Details')}
        onMouseLeave={() => setVariant('hover')}
      />
      <h3>{title}</h3>
      <button
        onMouseEnter={() => setVariant('clickable', 'Book Now')}
        onMouseLeave={() => setVariant('hover')}
      >
        Book Experience
      </button>
    </div>
  );
}
```

### 3. Integration with Framer Motion

**Example:** Animated card with cursor

```typescript
import { motion } from 'framer-motion';
import { useCursor } from '@/providers/CursorProvider';

export function AnimatedCard() {
  const { setVariant, resetCursor } = useCursor();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setVariant('hover')}
      onMouseLeave={() => resetCursor()}
    >
      <CardContent />
    </motion.div>
  );
}
```

---

## ♿ Accessibility Implementation

### 1. Reduced Motion Support

```typescript
// In AnimatedCursor.tsx
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  // Instant positioning (ease = 1)
  positionRef.current = targetRef.current;
} else {
  // Smooth lerp easing
  const ease = 0.15;
  positionRef.current.x += (targetRef.current.x - positionRef.current.x) * ease;
}
```

### 2. Touch Device Detection

```typescript
// Hide cursor on touch devices
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
  return null; // Don't render cursor
}
```

### 3. Keyboard Navigation

```typescript
// Cursor should NOT interfere with keyboard navigation
.cursor {
  pointer-events: none; /* Critical! */
}

// Focus indicators remain visible
*:focus-visible {
  outline: 2px solid var(--color-terracotta);
  outline-offset: 4px;
}
```

### 4. Screen Reader Support

```typescript
// Cursor is purely decorative
<div
  className={styles.cursor}
  aria-hidden="true"  // Hidden from screen readers
  role="presentation" // Presentation role
>
```

### 5. High Contrast Mode

```css
/* Respect Windows High Contrast Mode */
@media (prefers-contrast: high) {
  .cursor {
    border-width: 3px;
    border-color: ButtonText;
  }
}
```

---

## ⚡ Performance Optimization

### 1. GPU Acceleration

```typescript
// Use transform3d for GPU acceleration
cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;

// Add will-change hint
.cursor {
  will-change: transform;
}
```

### 2. RequestAnimationFrame

```typescript
// Efficient animation loop
const animate = () => {
  // Update position with lerp easing
  positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.15;
  positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.15;

  // Apply transform
  if (cursorRef.current) {
    cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
  }

  rafRef.current = requestAnimationFrame(animate);
};

rafRef.current = requestAnimationFrame(animate);
```

### 3. Passive Event Listeners

```typescript
// Passive listeners for better scroll performance
window.addEventListener('mousemove', handleMouseMove, { passive: true });
```

### 4. CSS Containment

```css
.cursor {
  contain: layout style paint; /* Optimize rendering */
}
```

### 5. Minimize Repaints

```typescript
// Only update when necessary
if (Math.abs(targetRef.current.x - positionRef.current.x) > 0.1) {
  // Update position
}
```

---

## 🎨 Design System Integration

### CSS Variables

**File:** `/src/styles/variables.css`

```css
:root {
  /* Cursor colors from brand palette */
  --cursor-primary: var(--color-terracotta);      /* #D4735E */
  --cursor-secondary: var(--color-savannah-gold); /* #E6B17E */
  --cursor-accent: var(--color-deep-green);       /* #2C5F4F */

  /* Cursor timing */
  --cursor-ease: 0.15;
  --cursor-transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Cursor sizes */
  --cursor-size-sm: 12px;
  --cursor-size-md: 24px;
  --cursor-size-lg: 48px;
  --cursor-size-xl: 64px;

  /* Z-index */
  --z-cursor: 9999;
}
```

### Brand Alignment

**Family-Friendly Approach:**
- ✅ Approachable cursor interactions (not intimidating)
- ✅ Clear labels and icons (helpful, not cryptic)
- ✅ Warm color palette (terracotta, gold, not stark black/white)
- ✅ Smooth, gentle animations (not aggressive or jarring)
- ❌ Avoid ultra-luxury exclusivity cues (no "Members Only" vibes)
- ❌ No overly complex interactions (keep it simple for all ages)

---

## 📱 Responsive Behavior

### Mobile (< 768px)

```typescript
// Hide cursor completely on mobile
const isMobile = window.innerWidth < 768;

if (isMobile) {
  return null;
}
```

### Tablet (768px - 1024px)

```typescript
// Simplified cursor on tablets
const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

const cursorSize = isTablet
  ? cursorVariants[variant].size * 0.8  // 80% size
  : cursorVariants[variant].size;        // Full size
```

### Desktop (1024px+)

```typescript
// Full cursor system on desktop
const isDesktop = window.innerWidth >= 1024;

if (isDesktop) {
  // Enable all cursor variants
  // Enable labels and complex interactions
}
```

---

## 🧪 Testing Requirements

### 1. Browser Testing

- ✅ Chrome/Edge (Chromium) - Latest 2 versions
- ✅ Firefox - Latest 2 versions
- ✅ Safari - Latest 2 versions
- ✅ Mobile Safari (iOS) - Cursor hidden
- ✅ Chrome Mobile (Android) - Cursor hidden

### 2. Accessibility Testing

- ✅ Screen reader (NVDA/JAWS) - Cursor ignored
- ✅ Keyboard navigation - No interference
- ✅ Reduced motion - Instant positioning
- ✅ High contrast mode - Visible cursor
- ✅ Touch devices - Cursor hidden

### 3. Performance Testing

- ✅ 60fps maintained during cursor movement
- ✅ No frame drops during complex animations
- ✅ Smooth lerp easing on all devices
- ✅ No layout shift caused by cursor
- ✅ Minimal CPU/GPU usage

### 4. Edge Cases

- ✅ Multiple rapid hover state changes
- ✅ Cursor during scroll (with Lenis)
- ✅ Cursor during page transitions
- ✅ Cursor with Safari Progress Provider active
- ✅ Cursor when user leaves/returns to page

---

## 📊 Implementation Checklist

### Phase 1: Foundation (Week 1)

- [ ] Create `CursorProvider.tsx`
- [ ] Create `useCursor` hook
- [ ] Define `cursorVariants.ts` config
- [ ] Extend existing `AnimatedCursor.tsx`
- [ ] Update `AnimatedCursor.module.css`
- [ ] Integrate with app layout
- [ ] Test basic cursor rendering

### Phase 2: Chapter Integration (Week 2)

- [ ] Chapter 1: Pre-Dawn Hero cursors
- [ ] Chapter 2: Sunrise cursors
- [ ] Chapter 3: Morning Drive (binoculars)
- [ ] Chapter 4: Bush Breakfast cursors
- [ ] Chapter 5: Accommodations cursors
- [ ] Chapter 6: Dining Experience (carousel drag)
- [ ] Chapter 7: Safari Experiences
- [ ] Chapter 8: Wellness (ambient)
- [ ] Chapter 9: Guest Stories (text)
- [ ] Chapter 10: Location (map drag)
- [ ] Chapter 11: Careers cursors
- [ ] Chapter 12: Plan Safari (forms)

### Phase 3: Component Library (Week 3)

- [ ] Update all `Button` components
- [ ] Update all `Card` components (RestaurantCard, MenuCard, etc.)
- [ ] Update all `Link` components
- [ ] Update `Carousel` components
- [ ] Update `Image` components
- [ ] Update `Form` components (Input, TextArea)
- [ ] Update `Map` component
- [ ] Update `Video` components

### Phase 4: Polish & Testing (Week 4)

- [ ] Cross-browser testing
- [ ] Mobile/tablet testing
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Reduced motion testing
- [ ] Touch device verification
- [ ] Documentation updates
- [ ] Code review and refactoring

---

## 🚨 Common Pitfalls & Solutions

### Pitfall 1: Cursor Lag on Low-End Devices

**Problem:** Cursor movement feels sluggish on older laptops

**Solution:**
```typescript
// Adaptive easing based on performance
const fps = performance.now();
const ease = fps < 30 ? 0.5 : 0.15; // Faster easing on slow devices
```

### Pitfall 2: Cursor Blocks Click Events

**Problem:** Users can't click elements

**Solution:**
```css
.cursor {
  pointer-events: none !important; /* Critical! */
}
```

### Pitfall 3: Cursor Visible on Touch Devices

**Problem:** Cursor shows on iPads/tablets

**Solution:**
```typescript
// More robust touch detection
const isTouchDevice = (
  'ontouchstart' in window ||
  navigator.maxTouchPoints > 0 ||
  window.matchMedia('(hover: none)').matches
);
```

### Pitfall 4: Z-Index Conflicts

**Problem:** Cursor appears behind modals

**Solution:**
```css
.cursor {
  z-index: 9999; /* Highest z-index */
}

/* Modal should be lower */
.modal {
  z-index: 9998;
}
```

### Pitfall 5: Cursor Jumps on Page Load

**Problem:** Cursor position jumps before mouse moves

**Solution:**
```typescript
// Initialize at center of screen
positionRef.current = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};
```

---

## 📚 Code Examples

### Example 1: Simple Component with Cursor

```typescript
import { useCursor } from '@/providers/CursorProvider';

export function SimpleButton({ children, onClick }: ButtonProps) {
  const { setVariant, resetCursor } = useCursor();

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setVariant('clickable')}
      onMouseLeave={() => resetCursor()}
    >
      {children}
    </button>
  );
}
```

### Example 2: Complex Card with Nested Cursors

```typescript
export function AccommodationCard({ room }: CardProps) {
  const { setVariant, resetCursor } = useCursor();

  return (
    <div
      onMouseEnter={() => setVariant('hover')}
      onMouseLeave={() => resetCursor()}
    >
      {/* Gallery triggers view cursor */}
      <ImageGallery
        onMouseEnter={() => setVariant('view', 'View Gallery')}
        onMouseLeave={() => setVariant('hover')}
      />

      {/* Text area triggers text cursor */}
      <div
        onMouseEnter={() => setVariant('text')}
        onMouseLeave={() => setVariant('hover')}
      >
        <h3>{room.title}</h3>
        <p>{room.description}</p>
      </div>

      {/* CTA triggers clickable cursor */}
      <button
        onMouseEnter={() => setVariant('clickable', 'Book Now')}
        onMouseLeave={() => setVariant('hover')}
      >
        Check Availability
      </button>
    </div>
  );
}
```

### Example 3: Section-Wide Cursor with Chapter Integration

```typescript
export function WildlifeSection() {
  const { setVariant, resetCursor } = useCursor();

  return (
    <section
      data-chapter="morning-drive"
      onMouseEnter={() => setVariant('binoculars')}
      onMouseLeave={() => resetCursor()}
    >
      <h2>Amboseli Wildlife</h2>

      {wildlifeData.map((animal) => (
        <WildlifeCard
          key={animal.id}
          onMouseEnter={() => setVariant('view', 'View Details')}
          onMouseLeave={() => setVariant('binoculars')}
        >
          <Image src={animal.image} alt={animal.name} />
          <h3>{animal.name}</h3>
        </WildlifeCard>
      ))}

      <button
        onMouseEnter={() => setVariant('clickable', 'Explore')}
        onMouseLeave={() => setVariant('binoculars')}
      >
        Book Safari Experience
      </button>
    </section>
  );
}
```

---

## 🎯 Success Criteria

### User Experience

- ✅ Cursor enhances understanding of interactive elements
- ✅ Cursor feels responsive and smooth (60fps)
- ✅ Cursor aligns with brand (warm, approachable, family-friendly)
- ✅ Cursor doesn't interfere with core functionality
- ✅ Cursor adds delight without being distracting

### Technical Performance

- ✅ No frame drops during cursor movement
- ✅ CPU usage < 5% for cursor alone
- ✅ GPU acceleration active
- ✅ No layout shift caused by cursor
- ✅ Works across all target browsers

### Accessibility

- ✅ Hidden from screen readers
- ✅ Respects reduced motion preference
- ✅ Hidden on touch devices
- ✅ Doesn't block keyboard navigation
- ✅ Visible in high contrast mode

### Business Impact

- ✅ Contributes to modern, premium feel
- ✅ Reinforces safari theme (binoculars)
- ✅ Guides users to conversion points (clickable CTAs)
- ✅ Enhances storytelling experience
- ✅ Differentiates from competitor websites

---

## 📖 Additional Resources

### Internal Documentation

- [PROJECT.md](./PROJECT.md) - Overall project strategy
- [STRATEGIC-POSITIONING.md](./STRATEGIC-POSITIONING.md) - Market positioning
- [CONTENT-REVISION-GUIDE.md](./CONTENT-REVISION-GUIDE.md) - Content strategy
- [homepage-storytelling-guide.md](./homepage-storytelling-guide.md) - Storytelling best practices

### External References

- [Framer Motion Docs](https://www.framer.com/motion/) - Animation library
- [Lenis Smooth Scroll](https://github.com/studio-freight/lenis) - Scroll provider
- [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) - Performance API
- [CSS Containment](https://developer.mozilla.org/en-US/docs/Web/CSS/contain) - Optimization
- [Web Accessibility](https://www.w3.org/WAI/WCAG21/quickref/) - WCAG guidelines

---

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Initial | User-provided cursor rules |
| 2.0 | 2025-11-14 | Comprehensive refinement, project-specific integration |

---

## 👤 Ownership

**Document Owner:** Development Team
**Reviewed By:** [Name]
**Approved By:** [Client Name]
**Next Review:** [Date]

---

## 🎬 Conclusion

This cursor interaction system transforms the Amboseli Safari Club website into an immersive, interactive experience that:

1. **Enhances Brand Storytelling** - Safari theme (binoculars), warm approachable feel
2. **Guides User Journey** - Clear visual cues for interactive elements
3. **Maintains Accessibility** - Respects user preferences and assistive technologies
4. **Optimizes Performance** - GPU-accelerated, smooth 60fps animations
5. **Aligns with Strategy** - Family-friendly, modern safari hotel positioning

**Key Takeaway:** The cursor system is not just a visual flourish - it's a strategic UX enhancement that reinforces the brand, guides conversions, and creates a memorable experience that differentiates Amboseli Safari Club from competitors.

**Ready to implement?** Follow the phased checklist above and reference the chapter-by-chapter mapping for specific implementation details.

---

**Document Status:** ✅ Ready for Implementation
**Last Updated:** 2025-11-14

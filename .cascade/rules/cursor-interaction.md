# Cursor Interaction System Rules

## Your Role

You are a frontend engineer specializing in custom cursor interactions for immersive web experiences. You are an expert in React, TypeScript, Framer Motion, CSS animations, GPU acceleration, and accessibility.

Follow requirements carefully. Think step-by-step, describe your plan in pseudocode, confirm, then implement. Write production-ready, bug-free code with NO todos or placeholders. If uncertain, ask instead of guessing.

## System Overview

Extend the existing AnimatedCursor component at /src/components/atoms/AnimatedCursor/AnimatedCursor.tsx to support 9 cursor variants with smooth animations, accessibility features, and performance optimization.

**Current Implementation:**
- Smooth lerp easing (0.15 interpolation factor)
- GPU-accelerated transforms (translate3d)
- Touch device detection and hiding
- Section-based activation via data-chapter attributes
- Reduced motion support
- Two cursor types: 'binoculars' and 'default'

**Your Task:**
Add 7 new variants and implement global state management via React Context.

## Cursor Variants

Implement exactly 9 cursor variants:

**default** - General browsing
- Size: 12px
- Color: var(--color-terracotta)
- Style: Small dot with soft shadow
- No border

**hover** - Cards, images, sections
- Size: 48px
- Color: var(--color-terracotta)
- Border: 2px
- Glow effect: true
- Backdrop blur: 4px

**clickable** - Buttons, links, CTAs
- Size: 40px
- Color: var(--color-savannah-gold)
- Border: 3px
- Pulse animation: true
- Icon: Arrow (→)

**text** - Reading areas, quotes, body text
- Size: 24px
- Color: var(--color-terracotta)
- Border: 1px
- Icon: Vertical bar (|)

**drag** - Carousels, sliders, maps
- Size: 36px
- Color: var(--color-deep-green)
- Border: 2px
- Icon: Hand (✋)

**view** - Galleries, lightboxes, images
- Size: 44px
- Color: var(--color-terracotta)
- Border: 2px
- Icon: Eye (👁)

**binoculars** - Wildlife sections, safari experiences (EXISTING)
- Size: 56px
- Color: var(--color-savannah-gold)
- Icon: Binoculars (🔭)
- Safari theme

**ambient** - Cinematic zones, atmospheric sections
- Size: 64px
- Color: rgba(212, 115, 94, 0.1)
- Border: 1px
- Backdrop blur: 8px
- Very subtle, faded appearance

**hidden** - Mobile, accessibility override
- Size: 0px
- Opacity: 0
- Completely invisible

## Architecture

### File Structure

Create these files:

```
src/components/atoms/AnimatedCursor/
├── AnimatedCursor.tsx           # Extend existing
├── AnimatedCursor.module.css    # Enhance styles
├── cursorVariants.ts            # NEW - Variant configs
└── index.ts                     # Update exports

src/providers/
├── CursorProvider.tsx           # NEW - Context
└── index.ts                     # Update exports

src/hooks/
├── useCursor.ts                 # NEW - Hook
└── index.ts                     # Update exports
```

### Provider Integration

Add to /src/app/layout.tsx in this exact order:

```typescript
<CursorProvider>
  <SmoothScrollProvider>
    <SafariProgressProvider>
      <AnimatedCursor />
      {children}
    </SafariProgressProvider>
  </SmoothScrollProvider>
</CursorProvider>
```

CursorProvider must be outermost. AnimatedCursor renders inside SafariProgressProvider.

## Implementation

### Step 1: Cursor Variants Config

File: /src/components/atoms/AnimatedCursor/cursorVariants.ts

```typescript
export interface CursorVariantConfig {
  size: number;
  color: string;
  borderWidth: number;
  opacity: number;
  blur?: number;
  icon?: string;
  pulse?: boolean;
  glow?: boolean;
}

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

export const cursorVariants: Record<CursorVariant, CursorVariantConfig> = {
  default: {
    size: 12,
    color: 'var(--color-terracotta)',
    borderWidth: 0,
    opacity: 0.6,
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

### Step 2: Cursor Context Provider

File: /src/providers/CursorProvider.tsx

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

### Step 3: Enhanced AnimatedCursor Component

File: /src/components/atoms/AnimatedCursor/AnimatedCursor.tsx

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
    const hasTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(hover: none)').matches;
    setIsTouchDevice(hasTouch);
  }, []);

  // Detect reduced motion
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

  // Smooth animation loop
  useEffect(() => {
    if (isTouchDevice || !isVisible) return;

    const animate = () => {
      const ease = prefersReducedMotion ? 1 : 0.15;

      positionRef.current.x +=
        (targetRef.current.x - positionRef.current.x) * ease;
      positionRef.current.y +=
        (targetRef.current.y - positionRef.current.y) * ease;

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

  // Hide on touch devices
  if (isTouchDevice) return null;

  const config = cursorVariants[cursorState.variant];

  return (
    <div
      ref={cursorRef}
      className={styles.cursor}
      data-variant={cursorState.variant}
      data-visible={isVisible}
      aria-hidden="true"
      role="presentation"
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

### Step 4: Cursor Styles

File: /src/components/atoms/AnimatedCursor/AnimatedCursor.module.css

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

.cursor[data-visible='false'] {
  opacity: 0;
}

.cursorIcon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: calc(var(--cursor-size) * 0.5);
  line-height: 1;
}

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

@media (prefers-reduced-motion: reduce) {
  .cursor,
  .cursorPulse,
  .cursorGlow {
    animation: none !important;
    transition: none !important;
  }
}

@media (hover: none) and (pointer: coarse) {
  .cursor {
    display: none;
  }
}
```

## Component Usage

### Simple Button

```typescript
import { useCursor } from '@/providers/CursorProvider';

export function BookingButton({ onClick }: Props) {
  const { setVariant, resetCursor } = useCursor();

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setVariant('clickable', 'Book Now')}
      onMouseLeave={() => resetCursor()}
    >
      Reserve Your Stay
    </button>
  );
}
```

### Complex Card with Nested Cursors

```typescript
export function RoomCard({ room }: Props) {
  const { setVariant, resetCursor } = useCursor();

  return (
    <div
      onMouseEnter={() => setVariant('hover')}
      onMouseLeave={() => resetCursor()}
    >
      {/* Gallery */}
      <ImageGallery
        onMouseEnter={() => setVariant('view', 'View Gallery')}
        onMouseLeave={() => setVariant('hover')}
      />

      {/* Text area */}
      <div
        onMouseEnter={() => setVariant('text')}
        onMouseLeave={() => setVariant('hover')}
      >
        <h3>{room.title}</h3>
        <p>{room.description}</p>
      </div>

      {/* CTA */}
      <button
        onMouseEnter={() => setVariant('clickable', 'Check Dates')}
        onMouseLeave={() => setVariant('hover')}
      >
        Check Availability
      </button>
    </div>
  );
}
```

### Section-Wide Cursor

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

      {animals.map((animal) => (
        <AnimalCard
          key={animal.id}
          onMouseEnter={() => setVariant('view', 'View Details')}
          onMouseLeave={() => setVariant('binoculars')}
        />
      ))}

      <button
        onMouseEnter={() => setVariant('clickable', 'Explore')}
        onMouseLeave={() => setVariant('binoculars')}
      >
        Book Safari
      </button>
    </section>
  );
}
```

## Chapter-Specific Cursors

Apply these cursors to each chapter:

**Chapter 1: Pre-Dawn Hero**
- Section: ambient
- CTAs: clickable with labels

**Chapter 2: Sunrise**
- Section: default
- Text areas: text
- Cards: hover

**Chapter 3: Morning Drive (Wildlife)**
- Section: binoculars
- Wildlife cards: view
- CTAs: clickable

**Chapter 4: Bush Breakfast**
- Section: default
- Food images: hover
- Text descriptions: text
- Menu links: clickable

**Chapter 5: Accommodations**
- Section: default
- Room cards: hover
- Image galleries: view
- Booking CTAs: clickable

**Chapter 6: Dining Experience**
- Section: default
- Carousel: drag
- Food cards: hover
- Video: clickable

**Chapter 7: Safari Experiences**
- Section: binoculars
- Experience cards: hover
- Booking buttons: clickable

**Chapter 8: Wellness**
- Section: ambient
- Pool images: view
- Spa cards: hover
- Booking CTAs: clickable

**Chapter 9: Guest Stories**
- Section: default
- Testimonial quotes: text
- Guest images: hover
- Form inputs: text
- Submit button: clickable

**Chapter 10: Location**
- Section: default
- Interactive map: drag
- Map pins: clickable
- Distance counter: text

**Chapter 11: Careers**
- Section: default
- Job cards: hover
- Apply buttons: clickable
- Job descriptions: text

**Chapter 12: Plan Safari**
- Section: default
- Package cards: hover
- Pricing details: text
- Form inputs: text
- Submit button: clickable

## Accessibility Requirements

MUST implement all:

**Hide from Screen Readers:**
```typescript
<div aria-hidden="true" role="presentation">
```

**Respect Reduced Motion:**
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ease = prefersReducedMotion ? 1 : 0.15;
```

**Hide on Touch Devices:**
```typescript
const isTouchDevice = (
  'ontouchstart' in window ||
  navigator.maxTouchPoints > 0 ||
  window.matchMedia('(hover: none)').matches
);
if (isTouchDevice) return null;
```

**No Pointer Blocking:**
```css
.cursor {
  pointer-events: none !important;
}
```

**High Contrast Mode:**
```css
@media (prefers-contrast: high) {
  .cursor {
    border-width: 3px;
    border-color: ButtonText;
  }
}
```

**Focus Indicators Maintained:**
```css
*:focus-visible {
  outline: 2px solid var(--color-terracotta);
  outline-offset: 4px;
}
```

## Performance Requirements

MUST achieve:

**60fps Animation:**
Use requestAnimationFrame, not setInterval:
```typescript
rafRef.current = requestAnimationFrame(animate);
```

**GPU Acceleration:**
Use translate3d:
```typescript
transform: `translate3d(${x}px, ${y}px, 0)`;
```
```css
.cursor {
  will-change: transform;
}
```

**Passive Event Listeners:**
```typescript
window.addEventListener('mousemove', handleMove, { passive: true });
```

**CSS Containment:**
```css
.cursor {
  contain: layout style paint;
}
```

**Minimal Repaints:**
```typescript
const threshold = 0.1;
if (Math.abs(target.x - current.x) > threshold) {
  // Update
}
```

## Testing Checklist

Verify:

- Cursor renders on desktop (Chrome, Firefox, Safari)
- Cursor hidden on mobile/touch devices
- Cursor hidden when prefers-reduced-motion
- All 9 variants render correctly
- Smooth 60fps movement
- Labels appear with correct text
- Icons centered in cursor
- Pulsing animation works (clickable)
- Glow animation works (hover)
- Cursor doesn't block clicks
- Nested cursors work (section → card → button)
- Cursor position initializes at center
- Z-index correct (cursor on top)
- High contrast mode visible

Performance:

- CPU usage < 5%
- GPU acceleration active
- No layout shift
- No frame drops
- Smooth with Lenis scrolling

## Common Mistakes

### DON'T

```typescript
// Using left/top
cursor.style.left = `${x}px`;

// Forgetting pointer-events
.cursor { /* missing pointer-events: none */ }

// setInterval
setInterval(() => updatePosition(), 16);

// Always rendering
export function AnimatedCursor() {
  return <div>Cursor</div>;
}

// Using 'any'
const config: any = { ... };
```

### DO

```typescript
// Use translate3d
cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;

// Disable pointer events
.cursor { pointer-events: none !important; }

// requestAnimationFrame
const animate = () => {
  updatePosition();
  rafRef.current = requestAnimationFrame(animate);
};

// Hide on touch
export function AnimatedCursor() {
  if (isTouchDevice) return null;
  return <div>Cursor</div>;
}

// Strict types
const config: CursorVariantConfig = { ... };
```

## Implementation Checklist

Before marking complete:

- Created CursorProvider.tsx with context
- Created useCursor hook
- Defined all 9 variants in cursorVariants.ts
- Extended AnimatedCursor.tsx
- Updated AnimatedCursor.module.css with animations
- Integrated provider in layout (correct order)
- Applied cursors to all 12 chapters
- Updated interactive components
- Implemented accessibility (reduced motion, touch)
- Optimized performance (GPU, RAF, passive)
- Tested all browsers
- Verified 60fps
- Confirmed mobile hiding
- Validated TypeScript (no 'any')
- Documented with JSDoc

## Final Rule

NO placeholders, NO todos, NO incomplete code. Every component must be fully functional, properly typed, accessible, performant, and production-ready. If you cannot complete it fully, say so upfront.

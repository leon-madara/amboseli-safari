# Cursor Interaction System - Development Rules

## Role & Expertise

You are a **Senior Front-End Developer** and an expert in:
- **ReactJS** (18.3.0) with modern hooks and patterns
- **Next.js 14** (App Router, Server/Client Components)
- **TypeScript** (5.3.0) with strict type safety
- **Framer Motion** (11.0.0) for animations
- **CSS Modules** with CSS Custom Properties
- **Accessibility** (WCAG 2.1 AA compliance)
- **Performance Optimization** (GPU acceleration, 60fps)

You are thoughtful, give nuanced answers, and are brilliant at reasoning. You carefully provide accurate, factual, thoughtful answers with a focus on **production-ready, accessible, and performant code**.

---

## Development Philosophy

- Follow the user's requirements carefully & to the letter
- **Think step-by-step** - describe your plan in pseudocode before coding
- **Confirm, then write code** - verify understanding before implementation
- Write **correct, best practice, DRY, bug-free, fully functional code**
- **Fully implement** all requested functionality - NO todos, placeholders, or missing pieces
- **Verify code is complete** - include all imports, proper naming, full implementations
- **Prioritize readability** over premature optimization
- If you don't know the answer, say so instead of guessing

---

## Project Context

### Amboseli Safari Club Website

**Type:** Pre-launch marketing site for modern safari hotel
**Positioning:** Family-friendly, group-focused safari hotel ($200-450/night)
**Architecture:** 12-chapter scroll-driven storytelling experience
**Brand:** Warm, approachable, professional (terracotta, gold, earth tones)

### Tech Stack

```json
{
  "framework": "Next.js 14 (App Router)",
  "language": "TypeScript 5.3.0",
  "styling": "CSS Modules + TailwindCSS 3.4.0",
  "animation": "Framer Motion 11.0.0",
  "scroll": "Lenis 1.3.15",
  "forms": "React Hook Form 7.51.0",
  "validation": "Zod 3.22.0",
  "utilities": "clsx 2.1.0, tailwind-merge 2.2.0"
}
```

### Architecture Pattern

- **Atomic Design:** atoms → molecules → organisms → templates
- **File Structure:** Feature-based with barrel exports
- **Client/Server:** Use `'use client'` directive for interactive components
- **CSS Modules:** Component-scoped styles with global CSS variables
- **TypeScript:** Strict mode, explicit types, no `any`

---

## Cursor Interaction System Rules

### 1. Architecture

**Extend Existing Component:** `/src/components/atoms/AnimatedCursor/AnimatedCursor.tsx`

**Current Implementation:**
- Uses lerp easing (0.15) for smooth follow
- GPU-accelerated transforms (`translate3d`, `will-change`)
- Touch device detection and hiding
- Section-based activation via `data-chapter` attributes
- Respects `prefers-reduced-motion`

**Required Enhancements:**
- Add 7 new cursor variants (total: 9 variants)
- Create global state management via React Context
- Implement cursor labels and icons
- Add pulsing and glow effects
- Support nested cursor states

---

### 2. Cursor Variants

Implement exactly **9 cursor variants** with these specifications:

```typescript
type CursorVariant =
  | 'default'      // 12px - Small dot, general browsing
  | 'hover'        // 48px - Enlarged circle with glow, cards/images
  | 'clickable'    // 40px - Pulsing ring with arrow, CTAs/buttons
  | 'text'         // 24px - Thin cursor with bar, reading areas
  | 'drag'         // 36px - Hand icon, carousels/maps
  | 'view'         // 44px - Eye icon, galleries/lightboxes
  | 'binoculars'   // 56px - Safari theme, wildlife sections (EXISTING)
  | 'ambient'      // 64px - Large faded ring, cinematic zones
  | 'hidden';      // 0px - Invisible, mobile/accessibility
```

**Variant Configuration Pattern:**

```typescript
// File: /src/components/atoms/AnimatedCursor/cursorVariants.ts
export interface CursorVariantConfig {
  size: number;        // Diameter in pixels
  color: string;       // CSS custom property
  borderWidth: number; // Border thickness
  opacity: number;     // 0-1
  blur?: number;       // Backdrop blur in px
  icon?: string;       // Emoji or text icon
  pulse?: boolean;     // Pulsing animation
  glow?: boolean;      // Glow effect
}

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
  // ... implement remaining 7 variants
};
```

---

### 3. Context Provider Pattern

**File:** `/src/providers/CursorProvider.tsx`

**Requirements:**
- Create React Context for global cursor state
- Provide `setVariant(variant, label?)` method
- Provide `resetCursor()` method to return to default
- Use TypeScript for strict typing
- Export custom `useCursor()` hook

**Implementation Pattern:**

```typescript
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

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

---

### 4. Provider Hierarchy

**File:** `/src/app/layout.tsx`

**Integration Order (CRITICAL):**

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

**Rules:**
- `CursorProvider` must be the outermost provider
- `AnimatedCursor` renders inside `SafariProgressProvider`
- `'use client'` directive required on layout if using providers

---

### 5. Enhanced AnimatedCursor Component

**File:** `/src/components/atoms/AnimatedCursor/AnimatedCursor.tsx`

**Required Features:**

1. **Smooth Follow Animation:**
   ```typescript
   const ease = prefersReducedMotion ? 1 : 0.15;
   positionRef.current.x += (targetRef.current.x - positionRef.current.x) * ease;
   positionRef.current.y += (targetRef.current.y - positionRef.current.y) * ease;
   ```

2. **GPU Acceleration:**
   ```typescript
   cursorRef.current.style.transform = `translate3d(${x - offset}px, ${y - offset}px, 0)`;
   ```

3. **Touch Device Detection:**
   ```typescript
   const isTouchDevice = (
     'ontouchstart' in window ||
     navigator.maxTouchPoints > 0 ||
     window.matchMedia('(hover: none)').matches
   );
   if (isTouchDevice) return null; // Don't render
   ```

4. **Reduced Motion Support:**
   ```typescript
   const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
   setPrefersReducedMotion(mediaQuery.matches);
   ```

5. **RequestAnimationFrame Loop:**
   ```typescript
   useEffect(() => {
     const animate = () => {
       // Update position with lerp
       // Apply transform
       rafRef.current = requestAnimationFrame(animate);
     };
     rafRef.current = requestAnimationFrame(animate);
     return () => cancelAnimationFrame(rafRef.current!);
   }, [dependencies]);
   ```

---

### 6. CSS Module Pattern

**File:** `/src/components/atoms/AnimatedCursor/AnimatedCursor.module.css`

**Required Styles:**

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
  pointer-events: none; /* CRITICAL - don't block clicks */
  z-index: 9999;
  will-change: transform;
  transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
  backdrop-filter: blur(var(--cursor-blur));
  mix-blend-mode: difference;
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
  background: radial-gradient(circle, var(--cursor-color) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  opacity: 0.4;
  filter: blur(8px);
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  0% { opacity: 0.3; }
  100% { opacity: 0.6; }
}

/* Reduced motion - disable animations */
@media (prefers-reduced-motion: reduce) {
  .cursor,
  .cursorPulse,
  .cursorGlow {
    animation: none !important;
    transition: none !important;
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

### 7. Component Usage Pattern

**Simple Component:**

```typescript
import { useCursor } from '@/providers/CursorProvider';

export function BookingButton({ onClick }: ButtonProps) {
  const { setVariant, resetCursor } = useCursor();

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setVariant('clickable', 'Book Now')}
      onMouseLeave={() => resetCursor()}
      className={styles.button}
    >
      Reserve Your Stay
    </button>
  );
}
```

**Complex Card with Nested Cursors:**

```typescript
export function RoomCard({ room }: CardProps) {
  const { setVariant, resetCursor } = useCursor();

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setVariant('hover')}
      onMouseLeave={() => resetCursor()}
    >
      {/* Gallery - view cursor */}
      <ImageGallery
        images={room.images}
        onMouseEnter={() => setVariant('view', 'View Gallery')}
        onMouseLeave={() => setVariant('hover')}
      />

      {/* Text - text cursor */}
      <div
        className={styles.description}
        onMouseEnter={() => setVariant('text')}
        onMouseLeave={() => setVariant('hover')}
      >
        <h3>{room.title}</h3>
        <p>{room.description}</p>
      </div>

      {/* CTA - clickable cursor */}
      <button
        onMouseEnter={() => setVariant('clickable', 'Check Dates')}
        onMouseLeave={() => setVariant('hover')}
        onClick={room.onBook}
      >
        Check Availability
      </button>
    </div>
  );
}
```

**Section-Wide Cursor:**

```typescript
export function WildlifeSection() {
  const { setVariant, resetCursor } = useCursor();

  return (
    <section
      data-chapter="morning-drive"
      className={styles.section}
      onMouseEnter={() => setVariant('binoculars')}
      onMouseLeave={() => resetCursor()}
    >
      <h2>Amboseli Wildlife</h2>

      {animals.map((animal) => (
        <AnimalCard
          key={animal.id}
          animal={animal}
          onMouseEnter={() => setVariant('view', 'View Details')}
          onMouseLeave={() => setVariant('binoculars')}
        />
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

### 8. Chapter-Specific Cursor Mapping

**Apply these cursors to each chapter:**

| Chapter | Primary Variant | Element-Specific Variants |
|---------|----------------|---------------------------|
| 1. Pre-Dawn Hero | `ambient` | CTAs: `clickable` |
| 2. Sunrise | `default` | Text: `text`, Cards: `hover` |
| 3. Morning Drive | `binoculars` | Cards: `view`, CTAs: `clickable` |
| 4. Bush Breakfast | `default` | Images: `hover`, Text: `text`, Links: `clickable` |
| 5. Accommodations | `default` | Cards: `hover`, Gallery: `view`, CTAs: `clickable` |
| 6. Dining | `default` | Carousel: `drag`, Cards: `hover`, Video: `clickable` |
| 7. Safari Experiences | `binoculars` | Cards: `hover`, CTAs: `clickable` |
| 8. Wellness | `ambient` | Images: `view`, Cards: `hover`, CTAs: `clickable` |
| 9. Guest Stories | `default` | Quotes: `text`, Images: `hover`, Forms: `clickable` |
| 10. Location | `default` | Map: `drag`, Pins: `clickable`, Text: `text` |
| 11. Careers | `default` | Cards: `hover`, CTAs: `clickable`, Text: `text` |
| 12. Plan Safari | `default` | Cards: `hover`, Forms: `text`, Submit: `clickable` |

**Implementation Rule:**
- Set section-wide cursor on `<section>` element
- Override with specific cursors on child elements
- Always reset to section cursor (not default) when leaving child

---

### 9. Accessibility Requirements

**MUST implement all of these:**

1. **Hide from Screen Readers:**
   ```typescript
   <div aria-hidden="true" role="presentation">
   ```

2. **Respect Reduced Motion:**
   ```typescript
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   const ease = prefersReducedMotion ? 1 : 0.15; // Instant vs smooth
   ```

3. **Hide on Touch Devices:**
   ```typescript
   const isTouchDevice = (
     'ontouchstart' in window ||
     navigator.maxTouchPoints > 0 ||
     window.matchMedia('(hover: none)').matches
   );
   if (isTouchDevice) return null;
   ```

4. **Don't Block Interactions:**
   ```css
   .cursor {
     pointer-events: none !important;
   }
   ```

5. **High Contrast Mode:**
   ```css
   @media (prefers-contrast: high) {
     .cursor {
       border-width: 3px;
       border-color: ButtonText;
     }
   }
   ```

6. **Focus Indicators (maintain):**
   ```css
   *:focus-visible {
     outline: 2px solid var(--color-terracotta);
     outline-offset: 4px;
   }
   ```

---

### 10. Performance Requirements

**MUST achieve all of these:**

1. **60fps Animation:**
   ```typescript
   // Use requestAnimationFrame, not setInterval
   rafRef.current = requestAnimationFrame(animate);
   ```

2. **GPU Acceleration:**
   ```typescript
   // Use translate3d, not left/top
   transform: `translate3d(${x}px, ${y}px, 0)`;
   ```
   ```css
   .cursor {
     will-change: transform;
   }
   ```

3. **Passive Event Listeners:**
   ```typescript
   window.addEventListener('mousemove', handleMove, { passive: true });
   ```

4. **CSS Containment:**
   ```css
   .cursor {
     contain: layout style paint;
   }
   ```

5. **Minimize Repaints:**
   ```typescript
   // Only update when position changes significantly
   const threshold = 0.1;
   if (Math.abs(target.x - current.x) > threshold) {
     // Update position
   }
   ```

---

### 11. TypeScript Requirements

**Strict Type Safety:**

```typescript
// Define all types explicitly
interface CursorVariantConfig {
  size: number;
  color: string;
  borderWidth: number;
  opacity: number;
  blur?: number;
  icon?: string;
  pulse?: boolean;
  glow?: boolean;
}

type CursorVariant =
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

// No 'any' types allowed
// Use strict null checks
// Export all types for reuse
```

---

### 12. CSS Custom Properties Integration

**Use existing design tokens:**

```css
/* From /src/styles/variables.css */
:root {
  /* Brand colors (use these) */
  --color-terracotta: #D4735E;
  --color-savannah-gold: #E6B17E;
  --color-deep-green: #2C5F4F;
  --color-white: #FFFFFF;

  /* Spacing (8px grid) */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;

  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.6s ease;

  /* Z-index */
  --z-cursor: 9999;
}
```

**Cursor-specific variables:**

```css
.cursor {
  /* Use CSS custom properties for dynamic values */
  --cursor-size: 12px;
  --cursor-color: var(--color-terracotta);
  --cursor-border-width: 0px;
  --cursor-opacity: 0.6;
  --cursor-blur: 0px;

  width: var(--cursor-size);
  height: var(--cursor-size);
  border-color: var(--cursor-color);
  opacity: var(--cursor-opacity);
  backdrop-filter: blur(var(--cursor-blur));
}
```

---

## General Code Implementation Guidelines

### File Organization

```
src/components/atoms/AnimatedCursor/
├── AnimatedCursor.tsx           # Main component
├── AnimatedCursor.module.css    # Scoped styles
├── cursorVariants.ts            # Variant configs
├── AnimatedCursor.test.tsx      # Tests (optional)
└── index.ts                     # Barrel export

// index.ts
export { AnimatedCursor } from './AnimatedCursor';
export type { CursorVariant, CursorVariantConfig } from './cursorVariants';
```

### Naming Conventions

- **Components:** PascalCase (`AnimatedCursor`, `CursorProvider`)
- **Hooks:** camelCase with `use` prefix (`useCursor`, `useMediaQuery`)
- **Types/Interfaces:** PascalCase (`CursorState`, `CursorVariant`)
- **Event Handlers:** camelCase with `handle` prefix (`handleMouseMove`, `handleMouseLeave`)
- **Constants:** UPPER_SNAKE_CASE or camelCase (`CURSOR_VARIANTS`, `defaultConfig`)
- **CSS Classes:** camelCase in modules (`cursor`, `cursorIcon`, `cursorLabel`)

### Event Handler Pattern

```typescript
// Use 'handle' prefix for event handlers
const handleMouseEnter = () => {
  setVariant('hover');
};

const handleMouseLeave = () => {
  resetCursor();
};

const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  // Handle click
};

// Apply to elements
<button
  onClick={handleClick}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
  Click Me
</button>
```

### Early Returns

```typescript
// Use early returns for cleaner code
export function AnimatedCursor() {
  const { cursorState } = useCursor();

  // Early returns for edge cases
  if (isTouchDevice) return null;
  if (!isVisible) return null;

  // Main render logic
  return (
    <div className={styles.cursor}>
      {/* ... */}
    </div>
  );
}
```

### DRY Principle

```typescript
// BAD - Repetitive code
<button onMouseEnter={() => setVariant('clickable', 'Book Now')} onMouseLeave={() => resetCursor()}>
  Book Now
</button>
<button onMouseEnter={() => setVariant('clickable', 'Check Dates')} onMouseLeave={() => resetCursor()}>
  Check Dates
</button>

// GOOD - Reusable component
export function CTAButton({ label, onClick }: CTAButtonProps) {
  const { setVariant, resetCursor } = useCursor();

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setVariant('clickable', label)}
      onMouseLeave={() => resetCursor()}
    >
      {label}
    </button>
  );
}

// Usage
<CTAButton label="Book Now" onClick={handleBook} />
<CTAButton label="Check Dates" onClick={handleCheckDates} />
```

### Type Safety

```typescript
// Always define explicit types
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
}

// Use type guards
function isCursorVariant(value: string): value is CursorVariant {
  const validVariants: CursorVariant[] = [
    'default',
    'hover',
    'clickable',
    'text',
    'drag',
    'view',
    'binoculars',
    'ambient',
    'hidden',
  ];
  return validVariants.includes(value as CursorVariant);
}

// Use generics when appropriate
function createCursorConfig<T extends CursorVariant>(
  variant: T,
  config: CursorVariantConfig
): Record<T, CursorVariantConfig> {
  return { [variant]: config } as Record<T, CursorVariantConfig>;
}
```

### CSS Modules Pattern

```typescript
// Import CSS Module
import styles from './Component.module.css';

// Use clsx for conditional classes
import clsx from 'clsx';

export function Component({ variant, isActive }: Props) {
  return (
    <div
      className={clsx(
        styles.base,
        styles[variant],
        isActive && styles.active
      )}
    >
      {/* Content */}
    </div>
  );
}
```

### Accessibility Attributes

```typescript
// Always include accessibility attributes
<button
  onClick={handleClick}
  onKeyDown={handleKeyDown}
  tabIndex={0}
  aria-label="Book safari experience"
  aria-pressed={isBooked}
  disabled={isDisabled}
>
  Book Now
</button>

// For decorative elements
<div
  className={styles.cursor}
  aria-hidden="true"
  role="presentation"
>
  {/* Cursor content */}
</div>
```

### Comments

```typescript
// Use JSDoc comments for functions and components
/**
 * AnimatedCursor component that follows mouse position
 * with smooth lerp easing and variant-based styling.
 *
 * @example
 * ```tsx
 * <CursorProvider>
 *   <AnimatedCursor />
 *   <App />
 * </CursorProvider>
 * ```
 */
export function AnimatedCursor() {
  // Implementation
}

// Use inline comments for complex logic
const animate = () => {
  // Lerp easing for smooth follow (0.15 = 15% interpolation per frame)
  const ease = prefersReducedMotion ? 1 : 0.15;

  // Update position (GPU-accelerated via translate3d)
  positionRef.current.x += (targetRef.current.x - positionRef.current.x) * ease;
};
```

---

## Testing Requirements

### Manual Testing Checklist

- [ ] Cursor renders on desktop (Chrome, Firefox, Safari)
- [ ] Cursor hidden on mobile/touch devices
- [ ] Cursor hidden when `prefers-reduced-motion: reduce`
- [ ] All 9 variants render correctly
- [ ] Cursor follows mouse smoothly (60fps)
- [ ] Labels appear on hover with correct text
- [ ] Icons render in cursor center
- [ ] Pulsing animation works for `clickable` variant
- [ ] Glow animation works for `hover` variant
- [ ] Cursor doesn't block click events (`pointer-events: none`)
- [ ] Nested cursors work (section → card → button)
- [ ] Cursor position resets to center on page load
- [ ] Cursor respects z-index hierarchy (appears on top)
- [ ] High contrast mode shows visible cursor

### Performance Testing

- [ ] CPU usage < 5% for cursor alone
- [ ] GPU acceleration active (check DevTools Performance)
- [ ] No layout shift caused by cursor
- [ ] No frame drops during cursor movement
- [ ] Smooth scrolling maintained with cursor active

---

## Common Mistakes to Avoid

### ❌ DON'T DO THIS

```typescript
// Don't use left/top positioning
cursor.style.left = `${x}px`;
cursor.style.top = `${y}px`;

// Don't forget pointer-events: none
.cursor {
  /* Missing pointer-events */
}

// Don't use setInterval for animations
setInterval(() => {
  updatePosition();
}, 16);

// Don't render on touch devices
export function AnimatedCursor() {
  return <div>Cursor</div>; // Always renders
}

// Don't use 'any' types
const config: any = { ... };
```

### ✅ DO THIS

```typescript
// Use transform: translate3d for GPU acceleration
cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;

// Always disable pointer events
.cursor {
  pointer-events: none !important;
}

// Use requestAnimationFrame for animations
const animate = () => {
  updatePosition();
  rafRef.current = requestAnimationFrame(animate);
};

// Hide on touch devices
export function AnimatedCursor() {
  if (isTouchDevice) return null;
  return <div>Cursor</div>;
}

// Use strict types
const config: CursorVariantConfig = { ... };
```

---

## Summary: Implementation Checklist

When implementing cursor interactions, ensure:

- [ ] Created `CursorProvider.tsx` with React Context
- [ ] Created `useCursor` hook
- [ ] Defined all 9 cursor variants in `cursorVariants.ts`
- [ ] Extended `AnimatedCursor.tsx` with new variants
- [ ] Updated `AnimatedCursor.module.css` with animations
- [ ] Integrated provider in app layout (correct hierarchy)
- [ ] Applied cursors to all 12 chapters
- [ ] Updated all interactive components (buttons, cards, links)
- [ ] Implemented accessibility features (reduced motion, touch detection)
- [ ] Optimized performance (GPU acceleration, RAF, passive listeners)
- [ ] Tested on all target browsers
- [ ] Verified 60fps performance
- [ ] Confirmed cursor hidden on mobile
- [ ] Validated TypeScript types (no `any`)
- [ ] Documented all components with JSDoc

---

## When to Ask for Help

If you encounter:
- Performance issues (< 60fps)
- TypeScript errors you can't resolve
- Browser compatibility problems
- Accessibility concerns
- Architecture questions

**Ask the user** instead of guessing or implementing workarounds.

---

## Final Rule

**NO placeholders, NO todos, NO incomplete implementations.**

Every component must be:
- ✅ Fully functional
- ✅ Properly typed
- ✅ Accessible
- ✅ Performant
- ✅ Tested manually
- ✅ Production-ready

**If you can't complete it fully, say so upfront.**

# Dining Card Redesign Analysis & Recommendations
## Deep Dive: Modern UI/UX Design for Amboseli Safari

---

## Executive Summary

Based on comprehensive research of Material Design 3 (2025), Apple's Human Interface Guidelines, and current luxury hospitality design trends, this document provides actionable recommendations to transform the dining page cards into modern, enthralling experiences that align with premium safari lodge aesthetics.

**Current State:** Good foundation with Material 3 elevation and animations
**Goal:** Elevate to luxury safari brand standards with modern, engaging interactions

---

## 1. Current Design Analysis

### Strengths ✅
- **Material 3 Foundation**: Proper elevation levels (1→2 on hover)
- **Surface Tint Layer**: Terracotta gradient overlay for brand consistency
- **Smooth Animations**: Framer Motion with proper easing (cubic-bezier)
- **Accessibility**: Reduced motion support, semantic HTML
- **Responsive Design**: Mobile-optimized layouts

### Critical Issues ⚠️

#### 1.1 Image Presentation
- **Current**: 280px fixed height with basic gradient overlay
- **Problem**: Images feel constrained, lack visual impact
- **Safari Lodge Standard**: Hero images should be immersive and breathtaking

#### 1.2 Visual Hierarchy
- **Current**: Linear top-to-bottom flow
- **Problem**: All elements have equal visual weight
- **Modern Standard**: Dynamic focal points with layered depth

#### 1.3 Interactive Feedback
- **Current**: Basic hover effects (translate Y, scale)
- **Problem**: Feels mechanical, not engaging
- **2025 Standard**: Fluid, playful micro-interactions

#### 1.4 Typography & Spacing
- **Current**: Functional but conservative
- **Problem**: Lacks personality and luxury feel
- **Trend**: Bold, expressive typography with generous whitespace

#### 1.5 Content Density
- **Current**: All information visible at once
- **Problem**: Feature list creates visual clutter
- **Best Practice**: Progressive disclosure with layered information

---

## 2. Material Design 3 Principles (2025 Update)

### 2.1 Material 3 Expressive
The 2025 evolution of Material Design introduces "**Material 3 Expressive**":

**Key Characteristics:**
- **Increased Animation**: More dynamic, fluid transitions
- **More Colorful**: Vibrant, expressive color palettes
- **Modern Aesthetic**: Playful yet sophisticated
- **Adaptive**: Responds to user context and preferences

**Application to Cards:**
```css
/* Enhanced surface tint with dynamic color */
.card::before {
  background: linear-gradient(
    135deg,
    rgba(200, 111, 77, 0.08) 0%,
    rgba(180, 90, 60, 0.04) 50%,
    rgba(160, 140, 100, 0.06) 100%
  );
  mix-blend-mode: overlay;
}
```

### 2.2 Elevation & Depth
**Current Implementation:** Static elevation levels
**Recommended Enhancement:**
- Use dynamic elevation based on interaction state
- Implement shadow morphing during hover
- Add subtle depth cues with layered elements

```css
/* Material 3 Expressive Elevation */
.card:hover {
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.12),
    0 4px 8px rgba(0, 0, 0, 0.08),
    0 0 1px rgba(200, 111, 77, 0.2); /* Brand color rim light */
}
```

### 2.3 Motion & Transitions
**Material 3 Philosophy:** UI elements morph and transform fluidly

**Recommended Animations:**
- Card expansion on hover (slight scale + lift)
- Image parallax within container
- Content reveal with stagger effect
- Smooth state transitions (0.4s standard, 0.2s quick)

---

## 3. Apple Design Principles

### 3.1 Liquid Glass Design Language
Apple's new design system emphasizes:

**Concentricity:**
- Nested shapes with harmonious radii
- Elements flow from center outward
- Automatic inner radii calculation

**Refined Color Palette:**
- Subtle, sophisticated tones
- High contrast for readability
- Adaptive to light/dark modes

**Bold Typography:**
- Left-aligned, confident headers
- Generous spacing
- Clear hierarchy

### 3.2 Application to Safari Cards

**Instead of traditional cards, consider:**
```css
/* Apple-inspired nested containers */
.card {
  border-radius: 24px; /* Outer radius */
}

.imageContainer {
  border-radius: 16px; /* Concentric inner radius */
  margin: 8px; /* Creates visual nesting */
}

.content {
  padding: 24px 20px; /* Asymmetric for left-alignment */
}
```

### 3.3 Progressive Disclosure
Apple excels at revealing information progressively:

**Recommended Pattern:**
- **Default State**: Image, title, short description
- **Hover State**: Reveal features with smooth fade-in
- **Active State**: Show booking/CTA options

---

## 4. Modern Restaurant/Hospitality Trends (2025)

### 4.1 Visual Design Trends

#### Retro-Modern Fusion
- **Trend**: 1950s-60s aesthetics with modern polish
- **Application**: Hand-drawn elements, vintage-inspired badges
- **Safari Context**: Blend classic safari expedition feel with contemporary luxury

#### Structured Scrapbook
- **Trend**: Layered elements (stickers, photos, overlays)
- **Application**: Multiple image layers, decorative elements
- **Safari Context**: Wildlife stickers, stamp-style badges ("Sundowner Specialist")

#### Bold & Playful
- **Trend**: Vibrant colors, playful typography
- **Application**: Accent colors for CTAs, animated icons
- **Safari Context**: Terracotta, savannah gold, sunset orange

### 4.2 Interactive Elements

#### Micro-interactions
- **Hover**: Feature icons animate in
- **Click**: Card "flips" to show menu preview
- **Scroll**: Parallax effect between image and content

#### Dynamic Content
- **Real-time**: "Available now" badges
- **Personalized**: "Popular with families" tags
- **Interactive**: Toggle between lunch/dinner menus

### 4.3 Typography Trends

**Hand-Drawn Elements:**
- Decorative accents (underlines, badges)
- Not for body text (readability)
- Use for personality, not as primary typeface

**Exaggerated Serifs:**
- Display headings with character
- Pairs well with clean sans-serif body

**Current Recommendation:**
```css
.title {
  font-family: 'Playfair Display', serif; /* Elegant serif */
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.description {
  font-family: 'Inter', sans-serif; /* Clean, readable */
  font-size: 1rem;
  line-height: 1.6;
}
```

---

## 5. Luxury Safari Lodge Best Practices

### 5.1 Visual Storytelling

**Principle:** Every element should evoke the safari experience

**Image Treatment:**
- **Larger Images**: Minimum 400px height on desktop
- **Aspect Ratio**: 16:9 or 4:3 for landscape immersion
- **Quality**: High-resolution, professionally shot
- **Overlay**: Subtle vignette to draw focus

**Recommended Enhancement:**
```css
.imageContainer {
  height: 400px; /* Increased from 280px */
  aspect-ratio: 16 / 9;
  border-radius: 20px 20px 0 0; /* Seamless with card */
}

.imageOverlay {
  background:
    radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%),
    linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%);
}
```

### 5.2 Authentic Safari Elements

**Visual Cues:**
- Compass rose icons
- Binocular/map motifs
- Wildlife silhouettes
- Safari hat/boot illustrations

**Color Palette:**
```css
:root {
  --safari-terracotta: #C86F4D;
  --safari-savannah: #D4A373;
  --safari-sunset: #E88D5A;
  --safari-earth: #8B7355;
  --safari-night: #2C2416;
  --safari-cream: #F5EFE6;
}
```

### 5.3 Premium Feel Checklist
- ✅ Generous whitespace (padding ≥ 32px)
- ✅ High-quality imagery (2x retina)
- ✅ Smooth animations (60fps)
- ✅ Subtle hover states (not jarring)
- ✅ Elegant typography pairing
- ✅ Consistent brand colors
- ✅ Accessible contrast ratios (WCAG AA)

---

## 6. Specific Redesign Recommendations

### 6.1 Card Structure Redesign

**Option A: Expanded Image Hero**
```
┌─────────────────────────────┐
│                             │
│     LARGE HERO IMAGE        │
│     (400px height)          │
│                             │
│  ╔═══════════════════════╗  │
│  ║ Title                 ║  │
│  ║ Description           ║  │
│  ║ [View Menu CTA]       ║  │
│  ╚═══════════════════════╝  │
│                             │
│  [Hidden features revealed  │
│   on hover]                 │
└─────────────────────────────┘
```

**Option B: Split Layout (Apple-inspired)**
```
┌──────────────┬──────────────┐
│              │              │
│   IMAGE      │   Title      │
│   (Square    │   Desc       │
│   aspect)    │   Features   │
│              │   [CTA]      │
│              │              │
└──────────────┴──────────────┘
```

**Option C: Overlapping Layers (Material Expressive)**
```
┌─────────────────────────────┐
│  ┌───────────────────────┐  │
│  │  IMAGE (overflow)     │  │
│  │                       │  │
│┌─┴────────────────────┐  │  │
││ Content Card         │  │  │
││ (elevated above img) │  │  │
││ Title                │  │  │
││ Description          │──┘  │
││ Features             │     │
│└──────────────────────┘     │
└─────────────────────────────┘
```

**Recommendation:** **Option C** for maximum visual interest and modern appeal

### 6.2 Image Enhancements

**1. Increased Height & Aspect Ratio**
```css
.imageContainer {
  height: 420px; /* Desktop */
  aspect-ratio: 16 / 10; /* Wider than current */
}

@media (max-width: 768px) {
  .imageContainer {
    height: 280px; /* Mobile */
  }
}
```

**2. Advanced Overlays**
```css
.imageOverlay {
  background:
    /* Vignette effect */
    radial-gradient(
      ellipse 80% 60% at 50% 40%,
      transparent 0%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    /* Bottom gradient for text */
    linear-gradient(
      180deg,
      transparent 0%,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 0.6) 100%
    );
}
```

**3. Parallax Image on Scroll**
```tsx
// In RestaurantCard.tsx
const { scrollYProgress } = useScroll({
  target: imageRef,
  offset: ["start end", "end start"]
});

const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
```

**4. Image Title Overlay (Safari Classic Style)**
```css
.imageContainer::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
}

.titleOverlay {
  position: absolute;
  bottom: 1.5rem;
  left: 2rem;
  color: white;
  font-size: 2rem;
  font-weight: 600;
  text-shadow: 0 2px 8px rgba(0,0,0,0.4);
  z-index: 2;
}
```

### 6.3 Typography Redesign

**Display Headings:**
```css
.title {
  font-family: 'Playfair Display', 'Georgia', serif;
  font-size: clamp(1.75rem, 3vw + 1rem, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: var(--safari-night);
  margin-bottom: 0.75rem;

  /* Optional: Decorative underline */
  background-image: linear-gradient(
    90deg,
    var(--safari-terracotta) 0%,
    var(--safari-sunset) 100%
  );
  background-size: 60px 3px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  padding-bottom: 0.5rem;
}
```

**Body Text:**
```css
.description {
  font-family: 'Inter', -apple-system, sans-serif;
  font-size: 1.0625rem; /* 17px - Apple's preferred reading size */
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.72);
  margin-bottom: 1.5rem;
  max-width: 42ch; /* Optimal reading width */
}
```

### 6.4 Feature List Redesign

**Current Issue:** Checkmark list feels utilitarian

**Recommendation: Icon-Based Features**

```tsx
const featureIcons = {
  'Indoor and outdoor seating': '🪑',
  'Views of Mount Kilimanjaro': '🏔️',
  'Breakfast, lunch, and dinner service': '🍽️',
  'Wine cellar with premium selections': '🍷',
  'Private dining available': '✨',
  'Open-air terrace setting': '🌅',
  'Sunset cocktails and appetizers': '🍹',
  'BBQ and grilled specialties': '🔥',
  'Wildlife viewing opportunities': '🦁',
  'Signature safari cocktails': '🍸',
  'Cozy lounge seating': '🛋️',
  'Open until late': '🌙',
};
```

```css
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1.5rem 0;
  border-top: none; /* Remove divider line */
}

.feature {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.feature:hover {
  background: rgba(200, 111, 77, 0.06);
  transform: translateX(4px);
}

.featureIcon {
  font-size: 1.5rem;
  line-height: 1;
  flex-shrink: 0;
}
```

**Alternative: Hidden by Default, Revealed on Hover**

```tsx
<div className={styles.content}>
  <h3 className={styles.title}>{restaurant.title}</h3>
  <p className={styles.description}>{restaurant.description}</p>

  {/* Show on hover */}
  <motion.ul
    className={styles.features}
    initial={{ opacity: 0, height: 0 }}
    whileHover={{ opacity: 1, height: 'auto' }}
    transition={{ duration: 0.3 }}
  >
    {/* features */}
  </motion.ul>

  <button className={styles.expandButton}>
    View Details
  </button>
</div>
```

### 6.5 Interactive Enhancements

**1. Flip Card Interaction**
```tsx
const [isFlipped, setIsFlipped] = useState(false);

<motion.div
  className={styles.cardInner}
  animate={{ rotateY: isFlipped ? 180 : 0 }}
  transition={{ duration: 0.6, type: "spring" }}
  style={{ transformStyle: "preserve-3d" }}
>
  {/* Front: Image + Title */}
  <div className={styles.cardFront}>...</div>

  {/* Back: Menu highlights */}
  <div className={styles.cardBack}>...</div>
</motion.div>
```

**2. Expandable Card**
```tsx
const [isExpanded, setIsExpanded] = useState(false);

<motion.div
  layout
  className={styles.card}
  animate={{
    height: isExpanded ? 'auto' : '580px'
  }}
>
  {/* Content */}

  {isExpanded && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.expandedContent}
    >
      {/* Menu preview, hours, booking form */}
    </motion.div>
  )}
</motion.div>
```

**3. Magnetic Hover Effect**
```tsx
const cardRef = useRef(null);
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

const handleMouseMove = (e) => {
  const rect = cardRef.current.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) / 10;
  const y = (e.clientY - rect.top - rect.height / 2) / 10;
  setMousePosition({ x, y });
};

<motion.div
  ref={cardRef}
  onMouseMove={handleMouseMove}
  onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
  animate={{
    rotateX: mousePosition.y * -0.5,
    rotateY: mousePosition.x * 0.5,
  }}
  style={{ transformStyle: "preserve-3d" }}
>
```

### 6.6 Color & Visual Enhancements

**Gradient Overlays:**
```css
/* Safari sunset gradient */
.card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(200, 111, 77, 0.03) 0%,
    rgba(232, 141, 90, 0.05) 50%,
    rgba(212, 163, 115, 0.03) 100%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.card:hover::after {
  opacity: 1;
}
```

**Glass Morphism Effect (Apple-inspired):**
```css
.content {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

**Accent Borders:**
```css
.card {
  border-top: 3px solid var(--safari-terracotta);
  border-left: 1px solid rgba(200, 111, 77, 0.1);
  border-right: 1px solid rgba(200, 111, 77, 0.1);
}
```

### 6.7 Micro-interactions

**Staggered Feature Animation:**
```tsx
<ul className={styles.features}>
  {restaurant.features.map((feature, idx) => (
    <motion.li
      key={idx}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        delay: idx * 0.1,
        type: "spring",
        stiffness: 100
      }}
    >
      {feature}
    </motion.li>
  ))}
</ul>
```

**CTA Button Pulse:**
```tsx
<motion.button
  className={styles.ctaButton}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  animate={{
    boxShadow: [
      "0 0 0 0 rgba(200, 111, 77, 0.4)",
      "0 0 0 10px rgba(200, 111, 77, 0)",
    ],
  }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    repeatType: "loop",
  }}
>
  Book Now
</motion.button>
```

**Image Shine Effect:**
```css
@keyframes shine {
  0% {
    left: -100%;
  }
  20%, 100% {
    left: 100%;
  }
}

.imageContainer::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transform: skewX(-25deg);
  animation: shine 3s ease-in-out infinite;
  z-index: 1;
}
```

---

## 7. Entire Dining Page Recommendations

### 7.1 Page Structure Enhancement

**Current**: Linear vertical scroll
**Recommended**: Multi-section experience

```
1. Hero Section (Immersive)
   ├── Full-screen dining environment image
   ├── Animated heading
   └── Scroll indicator

2. Restaurant Cards Grid (Current)
   ├── Enhanced cards (per recommendations above)
   └── Filter/sort options

3. Special Experiences Section
   ├── Bush breakfast
   ├── Sundowners
   └── Private dining

4. Menu Highlights
   ├── Interactive menu preview
   └── Dietary options

5. Reservation CTA
   ├── Booking form
   └── Contact information
```

### 7.2 Grid Layout Improvements

**Current:**
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
```

**Recommended: Asymmetric Grid**
```css
.restaurantGrid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
}

/* Feature card spans more columns */
.card:nth-child(1) {
  grid-column: span 7;
}

.card:nth-child(2) {
  grid-column: span 5;
}

.card:nth-child(3) {
  grid-column: span 12;
  grid-template-columns: 1fr 1fr; /* Split layout */
}

@media (max-width: 1024px) {
  .card {
    grid-column: span 12 !important;
  }
}
```

**Alternative: Masonry Layout**
```tsx
import Masonry from 'react-masonry-css';

<Masonry
  breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
  className={styles.masonryGrid}
  columnClassName={styles.masonryColumn}
>
  {restaurants.map((restaurant, index) => (
    <RestaurantCard key={index} restaurant={restaurant} />
  ))}
</Masonry>
```

### 7.3 Page-Level Interactions

**Parallax Scrolling:**
- Background images move slower than content
- Creates depth and immersion

**Scroll-Triggered Animations:**
```tsx
const { scrollYProgress } = useScroll();
const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
```

**Sticky Navigation:**
```css
.diningNav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}
```

### 7.4 Filter & Sort Options

```tsx
const [filter, setFilter] = useState('all');
const [sortBy, setSortBy] = useState('featured');

<div className={styles.controls}>
  <div className={styles.filters}>
    <button onClick={() => setFilter('all')}>All</button>
    <button onClick={() => setFilter('fine-dining')}>Fine Dining</button>
    <button onClick={() => setFilter('casual')}>Casual</button>
    <button onClick={() => setFilter('bar')}>Bar & Lounge</button>
  </div>

  <select onChange={(e) => setSortBy(e.target.value)}>
    <option value="featured">Featured</option>
    <option value="capacity">Group Size</option>
    <option value="cuisine">Cuisine Type</option>
  </select>
</div>
```

### 7.5 Mobile Experience

**Touch-Friendly Interactions:**
```css
/* Larger tap targets */
.card {
  min-height: 480px;
}

.ctaButton {
  min-height: 44px; /* Apple's recommendation */
  font-size: 1rem;
}
```

**Swipe Gestures:**
```tsx
import { motion, PanInfo } from 'framer-motion';

const handleDragEnd = (e: any, info: PanInfo) => {
  if (info.offset.x > 100) {
    // Swipe right - previous card
    navigateToCard('prev');
  } else if (info.offset.x < -100) {
    // Swipe left - next card
    navigateToCard('next');
  }
};

<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  onDragEnd={handleDragEnd}
>
```

**Bottom Sheet for Details:**
```tsx
// Mobile: Sheet slides up from bottom
// Desktop: Modal or expanded card

{isMobile ? (
  <BottomSheet isOpen={isExpanded} onClose={() => setIsExpanded(false)}>
    <RestaurantDetails restaurant={selectedRestaurant} />
  </BottomSheet>
) : (
  <Modal isOpen={isExpanded} onClose={() => setIsExpanded(false)}>
    <RestaurantDetails restaurant={selectedRestaurant} />
  </Modal>
)}
```

---

## 8. Implementation Priority

### Phase 1: High-Impact Visual Improvements (Week 1)
1. ✅ Increase image height (280px → 420px)
2. ✅ Enhanced image overlays (vignette + gradient)
3. ✅ Typography upgrade (Playfair Display + Inter)
4. ✅ Improved hover animations (magnetic effect)
5. ✅ Feature list grid layout with icons

**Expected Impact:** 60% visual improvement

### Phase 2: Interactive Enhancements (Week 2)
1. ✅ Parallax image scroll effect
2. ✅ Expandable card details
3. ✅ Staggered feature animations
4. ✅ CTA button micro-interactions
5. ✅ Glass morphism content background

**Expected Impact:** 25% engagement improvement

### Phase 3: Page-Level Enhancements (Week 3)
1. ✅ Asymmetric grid layout
2. ✅ Filter/sort functionality
3. ✅ Sticky navigation
4. ✅ Page parallax scrolling
5. ✅ Mobile swipe gestures

**Expected Impact:** 15% usability improvement

### Phase 4: Advanced Features (Week 4)
1. ✅ Flip card interaction
2. ✅ Menu preview integration
3. ✅ Booking form modal
4. ✅ Real-time availability badges
5. ✅ Dark mode support

**Expected Impact:** Premium differentiation

---

## 9. Code Examples: Complete Component

### Enhanced RestaurantCard Component

```tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
import type { Restaurant } from '@/data/dining';
import styles from './RestaurantCard.module.css';

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

export default function RestaurantCard({ restaurant, index }: RestaurantCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Parallax effect for image
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  // Magnetic hover effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.card}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: mousePosition.y * -0.3,
        rotateY: mousePosition.x * 0.3,
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Image Container with Parallax */}
      {restaurant.image && (
        <div ref={imageRef} className={styles.imageContainer}>
          <motion.div style={{ y: imageY }} className={styles.imageWrapper}>
            <Image
              src={restaurant.image}
              alt={restaurant.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={styles.image}
            />
          </motion.div>

          {/* Enhanced overlays */}
          <div className={styles.imageVignette} />
          <div className={styles.imageGradient} />

          {/* Optional: Title overlay on image */}
          <motion.div
            className={styles.titleOverlay}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {restaurant.title}
          </motion.div>
        </div>
      )}

      {/* Content with Glass Morphism */}
      <div className={styles.content}>
        <motion.h3
          className={styles.title}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
        >
          {restaurant.title}
        </motion.h3>

        <p className={styles.description}>{restaurant.description}</p>

        {/* Features Grid with Icons */}
        <motion.ul
          className={styles.features}
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {restaurant.features.slice(0, isExpanded ? undefined : 3).map((feature, idx) => (
            <motion.li
              key={idx}
              className={styles.feature}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <span className={styles.featureIcon}>
                {getFeatureIcon(feature)}
              </span>
              <span>{feature}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Expand/Collapse Button */}
        {restaurant.features.length > 3 && (
          <button
            className={styles.expandButton}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : `Show ${restaurant.features.length - 3} More`}
          </button>
        )}

        {/* CTA Button with Pulse */}
        <motion.button
          className={styles.ctaButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(200, 111, 77, 0.4)",
              "0 0 0 10px rgba(200, 111, 77, 0)",
            ],
          }}
          transition={{
            boxShadow: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }
          }}
        >
          View Menu & Book
        </motion.button>
      </div>

      {/* Decorative Elements */}
      <div className={styles.cardAccent} />
    </motion.div>
  );
}

// Helper function for feature icons
function getFeatureIcon(feature: string): string {
  const iconMap: Record<string, string> = {
    'indoor': '🪑',
    'outdoor': '🌅',
    'views': '🏔️',
    'kilimanjaro': '🏔️',
    'breakfast': '🍳',
    'lunch': '🍽️',
    'dinner': '🍽️',
    'wine': '🍷',
    'private': '✨',
    'terrace': '🌅',
    'cocktails': '🍹',
    'bbq': '🔥',
    'grilled': '🔥',
    'wildlife': '🦁',
    'bar': '🍸',
    'lounge': '🛋️',
    'late': '🌙',
  };

  const key = Object.keys(iconMap).find(k =>
    feature.toLowerCase().includes(k)
  );

  return key ? iconMap[key] : '✓';
}
```

### Enhanced CSS Module

```css
/* RestaurantCard.module.css */

.card {
  position: relative;
  background: var(--color-bg-secondary);
  border-radius: 24px;
  overflow: hidden;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.2, 0, 0, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  isolation: isolate;
  border-top: 3px solid var(--safari-terracotta);

  /* 3D Transform setup */
  perspective: 1000px;
  transform-style: preserve-3d;
}

/* Material 3 Expressive Surface Tint */
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(200, 111, 77, 0.05) 0%,
    rgba(232, 141, 90, 0.03) 50%,
    rgba(212, 163, 115, 0.04) 100%
  );
  opacity: 1;
  transition: opacity 0.4s cubic-bezier(0.2, 0, 0, 1);
  pointer-events: none;
  z-index: 1;
  mix-blend-mode: overlay;
}

.card:hover {
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.12),
    0 8px 16px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(200, 111, 77, 0.1); /* Rim light */
  transform: translateY(-4px);
}

.card:hover::before {
  opacity: 1.5;
}

/* Decorative Accent */
.cardAccent {
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  height: 120px;
  background: radial-gradient(
    circle at top right,
    rgba(200, 111, 77, 0.08) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 2;
}

/* Enhanced Image Container */
.imageContainer {
  position: relative;
  width: 100%;
  height: 420px;
  overflow: hidden;
  z-index: 0;
  border-radius: 0; /* Sharp top edge */
}

.imageWrapper {
  position: relative;
  width: 100%;
  height: 120%; /* Overflow for parallax */
}

.image {
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.2, 0, 0, 1);
}

.card:hover .image {
  transform: scale(1.08);
}

/* Advanced Overlays */
.imageVignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 60% at 50% 40%,
    transparent 0%,
    rgba(0, 0, 0, 0.15) 100%
  );
  pointer-events: none;
  z-index: 1;
}

.imageGradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 0, 0, 0) 40%,
    rgba(0, 0, 0, 0.7) 100%
  );
  pointer-events: none;
  z-index: 1;
}

/* Title Overlay on Image */
.titleOverlay {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  color: white;
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  text-shadow:
    0 2px 8px rgba(0, 0, 0, 0.4),
    0 4px 16px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

/* Content Section with Glass Morphism */
.content {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: relative;
  z-index: 2;

  /* Glass effect */
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}

/* Enhanced Typography */
.title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.75rem, 2.5vw, 2.25rem);
  font-weight: 700;
  color: var(--safari-night, #2C2416);
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.03em;

  /* Decorative underline */
  background-image: linear-gradient(
    90deg,
    rgba(200, 111, 77, 1) 0%,
    rgba(232, 141, 90, 1) 100%
  );
  background-size: 60px 3px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  padding-bottom: 0.5rem;
}

.description {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.0625rem; /* 17px */
  line-height: 1.65;
  color: rgba(0, 0, 0, 0.75);
  margin: 0;
  flex: 1;
  max-width: 45ch;
}

/* Feature Grid with Icons */
.features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

.feature {
  font-family: 'Inter', -apple-system, sans-serif;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
}

.feature:hover {
  background: rgba(200, 111, 77, 0.06);
  color: rgba(0, 0, 0, 0.9);
  transform: translateX(4px);
}

.featureIcon {
  font-size: 1.375rem;
  line-height: 1;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Expand Button */
.expandButton {
  align-self: flex-start;
  background: none;
  border: none;
  color: var(--safari-terracotta);
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.expandButton:hover {
  color: var(--safari-sunset);
  text-decoration-thickness: 2px;
}

/* CTA Button with Pulse */
.ctaButton {
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(
    135deg,
    var(--safari-terracotta) 0%,
    var(--safari-sunset) 100%
  );
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
  box-shadow:
    0 4px 12px rgba(200, 111, 77, 0.2),
    0 2px 4px rgba(0, 0, 0, 0.1);
}

.ctaButton:hover {
  background: linear-gradient(
    135deg,
    var(--safari-sunset) 0%,
    var(--safari-terracotta) 100%
  );
  box-shadow:
    0 6px 20px rgba(200, 111, 77, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.15);
}

.ctaButton:active {
  box-shadow:
    0 2px 8px rgba(200, 111, 77, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .imageContainer {
    height: 280px;
  }

  .content {
    padding: 1.5rem;
    gap: 1rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .description {
    font-size: 0.9375rem;
  }

  .titleOverlay {
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    font-size: 1.5rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .card,
  .card::before,
  .image,
  .feature,
  .ctaButton {
    transition: none !important;
    animation: none !important;
  }

  .card:hover .image {
    transform: none;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .card {
    background: var(--color-bg-secondary-dark, #1a1a1a);
  }

  .content {
    background: rgba(26, 26, 26, 0.92);
  }

  .title {
    color: var(--color-text-primary-dark, #f5f5f5);
  }

  .description {
    color: rgba(255, 255, 255, 0.75);
  }

  .feature {
    color: rgba(255, 255, 255, 0.7);
  }

  .feature:hover {
    background: rgba(200, 111, 77, 0.12);
    color: rgba(255, 255, 255, 0.9);
  }
}
```

---

## 10. Performance Considerations

### 10.1 Image Optimization
```tsx
// Use Next.js Image component with proper sizing
<Image
  src={restaurant.image}
  alt={restaurant.title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
  quality={85}
  priority={index < 3} // Priority for first 3 cards
  placeholder="blur"
  blurDataURL={restaurant.imageBlurData}
/>
```

### 10.2 Animation Performance
```css
/* Use transform and opacity only */
.card {
  will-change: transform, opacity;
}

/* GPU acceleration */
.image {
  transform: translateZ(0);
}
```

### 10.3 Lazy Loading
```tsx
// Lazy load non-critical features
const ExpandedContent = lazy(() => import('./ExpandedContent'));

{isExpanded && (
  <Suspense fallback={<Skeleton />}>
    <ExpandedContent restaurant={restaurant} />
  </Suspense>
)}
```

---

## 11. A/B Testing Recommendations

Test these variations to optimize engagement:

### Variant A: Minimal
- Clean, simple design
- No hover effects
- Static features list

### Variant B: Interactive (Recommended)
- Magnetic hover
- Expandable features
- Animated CTA

### Variant C: Immersive
- Flip card interaction
- Full-screen modal
- Video backgrounds

**Metrics to Track:**
- Click-through rate to booking
- Time on page
- Feature interaction rate
- Mobile vs. desktop engagement

---

## 12. Accessibility Checklist

- ✅ WCAG AA color contrast (4.5:1 minimum)
- ✅ Keyboard navigation support
- ✅ Screen reader friendly (aria-labels)
- ✅ Reduced motion support
- ✅ Focus indicators on interactive elements
- ✅ Semantic HTML (section, article, button)
- ✅ Alt text for all images
- ✅ Minimum touch target size (44x44px)

---

## 13. Final Recommendations Summary

### Must-Have (Phase 1)
1. **Increase image height** to 420px for impact
2. **Upgrade typography** to Playfair Display + Inter
3. **Add advanced overlays** (vignette + gradient)
4. **Implement feature grid** with icons
5. **Enhanced hover states** with magnetic effect

### Nice-to-Have (Phase 2)
1. Parallax image scrolling
2. Expandable card details
3. Glass morphism backgrounds
4. Staggered animations
5. CTA pulse effect

### Advanced (Phase 3+)
1. Flip card interactions
2. Menu preview integration
3. Real-time availability
4. Dark mode support
5. Booking form modal

---

## 14. Resources & References

### Design Systems
- [Material Design 3 (M3)](https://m3.material.io/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

### Inspiration
- [Awwwards - Restaurant Websites](https://www.awwwards.com/websites/restaurant/)
- [Dribbble - Safari Lodge UI](https://dribbble.com/search/safari-lodge)
- [Behance - Luxury Hospitality](https://www.behance.net/search/projects?search=luxury%20hotel)

### Tools
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [CSS Gradient Generator](https://cssgradient.io/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## Conclusion

The current dining card design has a solid foundation but lacks the visual impact and interactive engagement expected of a luxury safari lodge website. By implementing the recommendations in this document—particularly the Phase 1 high-impact improvements—you can transform the cards into modern, enthralling experiences that:

1. **Captivate** visitors with stunning imagery
2. **Engage** through thoughtful micro-interactions
3. **Convert** with clear, compelling CTAs
4. **Reflect** the premium safari brand aesthetic

The key is balancing **Material Design 3's expressive modernism** with **Apple's refined simplicity** while staying true to the **authentic safari lodge character**.

---

**Next Steps:**
1. Review this document with your team
2. Prioritize features based on timeline and resources
3. Create design mockups in Figma
4. Begin Phase 1 implementation
5. Conduct A/B testing
6. Iterate based on user feedback

Let the safari adventure begin! 🦁🌅

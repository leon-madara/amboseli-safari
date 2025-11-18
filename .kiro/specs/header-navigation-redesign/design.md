# Header and Navigation Redesign - Design Document

## Overview

This design document outlines the complete redesign of the header and navigation system for the Amboseli Safari Club website. The new design features a modern, centered pill-shaped navigation bar with dynamic blur effects that respond to scroll behavior, creating a floating, glass-morphism aesthetic that enhances the visual hierarchy while maintaining excellent usability.

The redesign involves:
1. Removing all existing header/navigation components from all pages
2. Creating a new centered pill navigation component
3. Implementing dynamic blur effects based on scroll state
4. Separating the logo from the navigation group
5. Applying project theme colors throughout

## Architecture

### Component Structure

```
PillNavigation (New Component)
├── Logo (Separate, positioned independently)
└── NavigationPill (Centered container)
    ├── NavigationItems (Horizontal list)
    │   ├── NavItem: "All products"
    │   ├── NavItem: "Laptops" (Active state)
    │   ├── NavItem: "Desktops"
    │   └── NavItem: "Displays"
    └── BlurBackdrop (Dynamic blur layer)
```

### State Management

The navigation will manage the following states:
- **Scroll State**: Tracks whether user is actively scrolling, idle, or at page top
- **Active Item**: Tracks which navigation item corresponds to current page/section
- **Blur Level**: Dynamically adjusts between 5px (scrolling), 15px (idle), and 0px (top)
- **Hover State**: Individual navigation items track hover for visual feedback

### Scroll Detection Logic

```typescript
interface ScrollState {
  isScrolling: boolean;
  isAtTop: boolean;
  idleTimer: NodeJS.Timeout | null;
  currentBlur: number;
}

// Blur values
const BLUR_SCROLLING = 5;  // Active scrolling
const BLUR_IDLE = 15;      // Stopped for >1s
const BLUR_TOP = 0;        // At page top
```

## Components and Interfaces

### 1. PillNavigation Component

**File**: `src/components/organisms/PillNavigation/PillNavigation.tsx`

**Props Interface**:
```typescript
interface PillNavigationProps {
  logoSrc: string;
  logoAlt: string;
  items: NavigationItem[];
  activeItem?: string;
  className?: string;
}

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}
```

**Key Features**:
- Fixed positioning at top of viewport
- Centered horizontally
- Responds to scroll events with blur transitions
- Smooth animations between states
- Accessible keyboard navigation

### 2. NavigationPill Component

**File**: `src/components/molecules/NavigationPill/NavigationPill.tsx`

**Props Interface**:
```typescript
interface NavigationPillProps {
  items: NavigationItem[];
  activeItem?: string;
  blurLevel: number;
  onItemClick?: (itemId: string) => void;
}
```

**Styling**:
- Rounded pill shape (border-radius: 9999px)
- Background: Semi-transparent with backdrop-filter
- Padding: 8px horizontal, 4px vertical
- Shadow: Subtle elevation shadow
- Width: Auto-fit content with max-width constraint

### 3. NavItem Component

**File**: `src/components/atoms/NavItem/NavItem.tsx`

**Props Interface**:
```typescript
interface NavItemProps {
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
}
```

**States**:
- **Default**: Theme text color, no background
- **Hover**: Slight background tint, scale transform
- **Active**: Filled background (dark), contrasting text color, blue border accent
- **Focus**: Visible focus ring for accessibility

## Data Models

### Navigation Configuration

```typescript
// src/data/navigation.ts
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'all-products', label: 'All products', href: '/products' },
  { id: 'laptops', label: 'Laptops', href: '/products/laptops' },
  { id: 'desktops', label: 'Desktops', href: '/products/desktops' },
  { id: 'displays', label: 'Displays', href: '/products/displays' },
];

export const LOGO_CONFIG = {
  src: '/images/logos/mainLOGOAmboseli.svg',
  alt: 'Amboseli Safari Club',
  width: 120,
  height: 40,
};
```

### Theme Integration

Colors from design system:
```typescript
// Navigation colors
const NAV_COLORS = {
  // Pill background
  pillBg: 'rgba(250, 247, 242, 0.7)', // cream with opacity
  pillBgHover: 'rgba(250, 247, 242, 0.85)',
  
  // Text colors
  textDefault: '#3A3633', // charcoal
  textHover: '#C86F4D', // terracotta
  textActive: '#FAF7F2', // cream (inverse)
  
  // Active state
  activeBg: '#3A3633', // charcoal
  activeBorder: '#4A9FFF', // blue accent (from reference image)
  
  // Borders
  border: 'rgba(232, 213, 196, 0.3)', // sand with opacity
};
```

## Visual Design Specifications

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  [LOGO]                                                       │
│                                                               │
│              ╭─────────────────────────────────╮             │
│              │  All products  [Laptops]  ...   │             │
│              ╰─────────────────────────────────╯             │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Spacing

- Logo: Top-left, 24px from top, 32px from left
- Pill: Centered horizontally, 24px from top
- Item spacing: 16px gap between items
- Item padding: 12px horizontal, 8px vertical
- Pill padding: 8px all around

### Typography

- Font family: Inter (body font from design system)
- Font size: 16px (base)
- Font weight: 500 (medium)
- Active state: 600 (semibold)
- Letter spacing: 0.01em

### Animations

```css
/* Blur transition */
.navigation-pill {
  transition: backdrop-filter 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Item hover */
.nav-item {
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-item:hover {
  transform: scale(1.05);
}

/* Active state transition */
.nav-item.active {
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Blur Effect Implementation

```css
.navigation-pill {
  backdrop-filter: blur(var(--blur-amount));
  -webkit-backdrop-filter: blur(var(--blur-amount));
}

/* States */
.navigation-pill[data-scroll-state="scrolling"] {
  --blur-amount: 5px;
}

.navigation-pill[data-scroll-state="idle"] {
  --blur-amount: 15px;
}

.navigation-pill[data-scroll-state="top"] {
  --blur-amount: 0px;
}
```

## Responsive Design

### Desktop (1024px+)
- Full pill navigation visible
- All items displayed horizontally
- Logo at standard size (120x40)
- Pill max-width: 800px

### Tablet (768px - 1023px)
- Slightly smaller pill
- Reduced item spacing (12px)
- Logo size: 100x33
- Pill max-width: 600px

### Mobile (<768px)
- Compact pill with fewer items visible
- Horizontal scroll for overflow items
- Logo size: 80x27
- Pill max-width: calc(100vw - 32px)
- Consider hamburger menu for additional items

## Accessibility

### Keyboard Navigation
- Tab order: Logo → Nav items (left to right)
- Enter/Space: Activate navigation item
- Arrow keys: Move between items
- Escape: Close mobile menu (if applicable)

### Screen Readers
- Semantic HTML: `<nav>`, `<ul>`, `<li>`, `<a>`
- ARIA labels: `aria-label="Main navigation"`
- Active state: `aria-current="page"`
- Focus management: Visible focus indicators

### Color Contrast
- Default text: 4.5:1 minimum (WCAG AA)
- Active state: 7:1 (WCAG AAA)
- Hover state: 4.5:1 minimum

### Motion
- Respect `prefers-reduced-motion`
- Disable blur transitions if requested
- Maintain functionality without animations

## Error Handling

### Scroll Performance
- Debounce scroll events (16ms for 60fps)
- Use `requestAnimationFrame` for blur updates
- Fallback to no blur on unsupported browsers

### Browser Compatibility
- Check for `backdrop-filter` support
- Fallback: Solid background with opacity
- Progressive enhancement approach

```typescript
const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(1px)') ||
                                CSS.supports('-webkit-backdrop-filter', 'blur(1px)');

if (!supportsBackdropFilter) {
  // Use solid background fallback
  element.style.backgroundColor = 'rgba(250, 247, 242, 0.95)';
}
```

### Edge Cases
- Very fast scrolling: Ensure blur updates don't lag
- Page load at scroll position: Initialize correct blur state
- Browser zoom: Maintain proportions and readability
- Touch devices: Optimize scroll detection for touch events

## Testing Strategy

### Unit Tests
- Scroll state management logic
- Blur calculation functions
- Active item detection
- Navigation item rendering

### Integration Tests
- Scroll event handling
- Blur transitions between states
- Logo and pill positioning
- Theme color application

### Visual Regression Tests
- Screenshot comparison at different scroll positions
- Active state rendering
- Hover state appearance
- Responsive breakpoints

### Accessibility Tests
- Keyboard navigation flow
- Screen reader announcements
- Focus indicator visibility
- Color contrast ratios

### Performance Tests
- Scroll performance (60fps target)
- Blur effect rendering cost
- Memory usage during scroll
- Mobile device performance

### Browser Compatibility Tests
- Chrome, Firefox, Safari, Edge (latest 2 versions)
- iOS Safari, Chrome Mobile
- Backdrop-filter support detection
- Fallback rendering

## Implementation Phases

### Phase 1: Cleanup
1. Remove existing Navigation component from all pages
2. Remove Navigation imports from layout files
3. Document removed components
4. Verify no orphaned navigation code

### Phase 2: Core Component
1. Create PillNavigation component structure
2. Implement basic pill styling
3. Add navigation items rendering
4. Position logo separately

### Phase 3: Scroll Behavior
1. Implement scroll detection
2. Add blur state management
3. Create blur transitions
4. Test scroll performance

### Phase 4: Interactions
1. Add hover states
2. Implement active state logic
3. Add keyboard navigation
4. Ensure accessibility

### Phase 5: Responsive
1. Add mobile breakpoint styles
2. Implement responsive pill sizing
3. Test on various devices
4. Optimize touch interactions

### Phase 6: Polish
1. Fine-tune animations
2. Add browser fallbacks
3. Performance optimization
4. Final accessibility audit

## Migration Strategy

### Removing Old Navigation

Files to modify:
- `src/components/templates/MarketingLayout/MarketingLayout.tsx` - Remove Navigation import and usage
- `src/app/layout.tsx` - Verify no navigation in root layout
- All page files - Remove any page-specific navigation overrides

### Adding New Navigation

Integration point:
- Add PillNavigation to root layout or marketing layout
- Ensure it's rendered above all page content
- Configure with appropriate navigation items
- Test on all existing pages

## Performance Considerations

### Optimization Techniques
1. **Scroll throttling**: Limit scroll event processing to 60fps
2. **CSS transforms**: Use GPU-accelerated properties
3. **Will-change**: Hint browser for blur property changes
4. **Passive listeners**: Mark scroll listeners as passive
5. **Memoization**: Cache navigation items and configuration

### Performance Targets
- First paint: <100ms
- Scroll response: <16ms (60fps)
- Blur transition: Smooth 300ms
- Memory: <5MB additional
- Mobile performance: No jank on mid-range devices

## Design Rationale

### Why Pill Shape?
- Modern, friendly aesthetic
- Clear visual grouping
- Reduces visual weight compared to full-width header
- Allows content to breathe around it

### Why Dynamic Blur?
- Creates depth and hierarchy
- Maintains content visibility
- Provides visual feedback for scroll state
- Enhances premium, modern feel

### Why Separate Logo?
- Maintains brand prominence
- Allows independent positioning
- Reduces pill complexity
- Follows common design patterns

### Why Centered Layout?
- Balanced, symmetrical composition
- Draws eye to primary navigation
- Works well with modern, minimal designs
- Adapts better to various screen sizes

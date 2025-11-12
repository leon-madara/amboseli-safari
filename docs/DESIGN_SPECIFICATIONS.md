# Amboseli Safari Club - Design Specifications

## Table of Contents
1. [Color System](#color-system)
2. [Typography System](#typography-system)
3. [Spacing System](#spacing-system)
4. [Layout and Grid](#layout-and-grid)
5. [Responsive Breakpoints](#responsive-breakpoints)
6. [Border Radius](#border-radius)
7. [Shadows](#shadows)
8. [Transitions & Animations](#transitions--animations)
9. [Component-Specific Variables](#component-specific-variables)
10. [Accessibility](#accessibility)
11. [Component Inventory](#component-inventory)
12. [File Structure](#file-structure)

---

## Color System

### Primary - Earth Tones
```css
--color-primary-terracotta: #C86F4D;
--color-primary-terracotta-light: #D89080;
--color-primary-terracotta-dark: #A35A3D;

--color-primary-sand: #E8D5C4;
--color-primary-sand-light: #F2E5D9;
--color-primary-sand-dark: #D4C0AE;

--color-primary-ochre: #CC8B3F;
--color-primary-ochre-light: #DBA564;
--color-primary-ochre-dark: #B37730;
```

### Secondary - Savannah
```css
--color-secondary-deep-green: #2D4A3E;
--color-secondary-deep-green-light: #3D5F4F;
--color-secondary-deep-green-dark: #1F3429;

--color-secondary-sage: #7D9B8F;
--color-secondary-sage-light: #9DB3A8;
--color-secondary-sage-dark: #6A8477;

--color-secondary-grass: #A8B89D;
--color-secondary-grass-light: #BCC9B3;
--color-secondary-grass-dark: #92A286;
```

### Accent - Sunset
```css
--color-accent-gold: #D4AF37;
--color-accent-gold-light: #E0C563;
--color-accent-gold-dark: #B89520;

--color-accent-amber: #E6A04E;
--color-accent-amber-light: #EDB976;
--color-accent-amber-dark: #D18A36;
```

### Neutrals
```css
--color-neutral-cream: #FAF7F2;
--color-neutral-cream-light: #FFFEFB;
--color-neutral-cream-dark: #F0EBE3;

--color-neutral-warm-gray: #8B8680;
--color-neutral-warm-gray-light: #A8A39E;
--color-neutral-warm-gray-dark: #6E6965;

--color-neutral-charcoal: #3A3633;
--color-neutral-charcoal-light: #5A5754;
--color-neutral-charcoal-dark: #252321;
```

### Semantic Colors
```css
--color-success: #4A7C59;
--color-success-light: #6B9F7B;
--color-success-dark: #3A5F45;

--color-warning: #E6A04E;
--color-warning-light: #EDB976;
--color-warning-dark: #D18A36;

--color-error: #C84F4F;
--color-error-light: #D87676;
--color-error-dark: #A73D3D;

--color-info: #5B8FA3;
--color-info-light: #7FAAB9;
--color-info-dark: #487289;
```

### Background & Surface
```css
--color-bg-primary: #FAF7F2;
--color-bg-secondary: #FFFFFF;
--color-bg-tertiary: #F0EBE3;
--color-bg-overlay: rgba(58, 54, 51, 0.8);
--color-bg-overlay-light: rgba(58, 54, 51, 0.4);
```

### Text
```css
--color-text-primary: #3A3633;
--color-text-secondary: #6E6965;
--color-text-tertiary: #8B8680;
--color-text-inverse: #FAF7F2;
--color-text-link: #2D4A3E;
--color-text-link-hover: #1F3429;
```

### Borders
```css
--color-border-light: #E8D5C4;
--color-border-medium: #D4C0AE;
--color-border-dark: #A8A39E;
--color-border-focus: #CC8B3F;
```

---

## Typography System

### Font Families
```css
--font-family-display: 'Playfair Display', Georgia, serif;
--font-family-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-family-accent: 'Dancing Script', cursive; /* For special quotes/callouts */
```

### Font Sizes - Desktop
```css
--font-size-xs: 0.75rem;      /* 12px */
--font-size-sm: 0.875rem;     /* 14px */
--font-size-base: 1rem;       /* 16px */
--font-size-md: 1.125rem;     /* 18px */
--font-size-lg: 1.25rem;      /* 20px */
--font-size-xl: 1.5rem;       /* 24px */
--font-size-2xl: 1.875rem;    /* 30px */
--font-size-3xl: 2.25rem;     /* 36px */
--font-size-4xl: 3rem;        /* 48px */
--font-size-5xl: 3.75rem;     /* 60px */
--font-size-6xl: 4.5rem;      /* 72px */
```

### Font Weights
```css
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

### Line Heights
```css
--line-height-tight: 1.2;
--line-height-snug: 1.375;
--line-height-normal: 1.5;
--line-height-relaxed: 1.625;
--line-height-loose: 2;
```

### Letter Spacing
```css
--letter-spacing-tighter: -0.05em;
--letter-spacing-tight: -0.025em;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.025em;
--letter-spacing-wider: 0.05em;
--letter-spacing-widest: 0.1em;
```

### Heading Styles
```css
/* H1 */
--heading-h1-size: var(--font-size-5xl);
--heading-h1-weight: var(--font-weight-bold);
--heading-h1-line-height: var(--line-height-tight);
--heading-h1-letter-spacing: var(--letter-spacing-tight);

/* H2 */
--heading-h2-size: var(--font-size-3xl);
--heading-h2-weight: var(--font-weight-bold);
--heading-h2-line-height: var(--line-height-snug);
--heading-h2-letter-spacing: var(--letter-spacing-tight);

/* H3 */
--heading-h3-size: var(--font-size-2xl);
--heading-h3-weight: var(--font-weight-semibold);
--heading-h3-line-height: var(--line-height-snug);
--heading-h3-letter-spacing: var(--letter-spacing-normal);

/* H4 */
--heading-h4-size: var(--font-size-xl);
--heading-h4-weight: var(--font-weight-semibold);
--heading-h4-line-height: var(--line-height-normal);
--heading-h4-letter-spacing: var(--letter-spacing-normal);

/* H5 */
--heading-h5-size: var(--font-size-lg);
--heading-h5-weight: var(--font-weight-medium);
--heading-h5-line-height: var(--line-height-normal);
--heading-h5-letter-spacing: var(--letter-spacing-normal);

/* H6 */
--heading-h6-size: var(--font-size-base);
--heading-h6-weight: var(--font-weight-medium);
--heading-h6-line-height: var(--line-height-normal);
--heading-h6-letter-spacing: var(--letter-spacing-wide);
```

### Body Text Styles
```css
--body-large-size: var(--font-size-md);
--body-large-line-height: var(--line-height-relaxed);

--body-base-size: var(--font-size-base);
--body-base-line-height: var(--line-height-normal);

--body-small-size: var(--font-size-sm);
--body-small-line-height: var(--line-height-normal);
```

---

## Spacing System

### Base Spacing (8px base unit)
```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
--space-40: 10rem;    /* 160px */
--space-48: 12rem;    /* 192px */
```

### Semantic Spacing
```css
/* Section Padding */
--space-section-sm: var(--space-16);    /* Small section padding */
--space-section-md: var(--space-24);    /* Medium section padding */
--space-section-lg: var(--space-32);    /* Large section padding */
--space-section-xl: var(--space-40);    /* Extra large section padding */

/* Container Padding */
--space-container-padding: var(--space-6);       /* Mobile */
--space-container-padding-md: var(--space-8);    /* Tablet */
--space-container-padding-lg: var(--space-12);   /* Desktop */
```

### Component Spacing
```css
--space-card-padding: var(--space-6);
--space-button-padding-x: var(--space-6);
--space-button-padding-y: var(--space-3);
--space-input-padding-x: var(--space-4);
--space-input-padding-y: var(--space-3);
```

### Gap Spacing (for flex/grid)
```css
--gap-xs: var(--space-2);
--gap-sm: var(--space-4);
--gap-md: var(--space-6);
--gap-lg: var(--space-8);
--gap-xl: var(--space-12);
```

---

## Layout and Grid

### Container Max Widths
```css
--container-max-width-sm: 640px;
--container-max-width-md: 768px;
--container-max-width-lg: 1024px;
--container-max-width-xl: 1280px;
--container-max-width-2xl: 1536px;
--container-max-width-full: 100%;
```

### Content Max Width
```css
--content-max-width: 65ch; /* Optimal line length for reading */
```

### Grid Columns
```css
--grid-columns-mobile: 4;
--grid-columns-tablet: 8;
--grid-columns-desktop: 12;
```

### Z-Index Scale
```css
--z-index-dropdown: 1000;
--z-index-sticky: 1020;
--z-index-fixed: 1030;
--z-index-modal-backdrop: 1040;
--z-index-modal: 1050;
--z-index-popover: 1060;
--z-index-tooltip: 1070;
```

---

## Responsive Breakpoints

Mobile First Approach:
```css
--breakpoint-xs: 0px;      /* Extra small devices */
--breakpoint-sm: 640px;    /* Small devices (landscape phones) */
--breakpoint-md: 768px;    /* Medium devices (tablets) */
--breakpoint-lg: 1024px;   /* Large devices (laptops) */
--breakpoint-xl: 1280px;   /* Extra large devices (desktops) */
--breakpoint-2xl: 1536px;  /* 2X large devices (large desktops) */
```

---

## Border Radius

```css
--radius-none: 0;
--radius-sm: 0.125rem;     /* 2px */
--radius-base: 0.25rem;    /* 4px */
--radius-md: 0.375rem;     /* 6px */
--radius-lg: 0.5rem;       /* 8px */
--radius-xl: 0.75rem;      /* 12px */
--radius-2xl: 1rem;        /* 16px */
--radius-3xl: 1.5rem;      /* 24px */
--radius-full: 9999px;     /* Fully rounded */
```

### Component Specific
```css
--radius-button: var(--radius-md);
--radius-card: var(--radius-xl);
--radius-input: var(--radius-md);
--radius-modal: var(--radius-2xl);
--radius-image: var(--radius-lg);
```

---

## Shadows

```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
--shadow-2xl: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
```

### Component Specific
```css
--shadow-card: var(--shadow-md);
--shadow-card-hover: var(--shadow-lg);
--shadow-button: var(--shadow-sm);
--shadow-button-hover: var(--shadow-base);
--shadow-modal: var(--shadow-2xl);
--shadow-dropdown: var(--shadow-lg);
```

### Colored Shadows
```css
--shadow-gold: 0 10px 15px -3px rgba(212, 175, 55, 0.2);
--shadow-terracotta: 0 10px 15px -3px rgba(200, 111, 77, 0.2);
```

---

## Transitions & Animations

### Timing Functions
```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-smooth: cubic-bezier(0.45, 0, 0.55, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Duration
```css
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-medium: 300ms;
--duration-slow: 500ms;
--duration-slower: 700ms;
```

### Common Transitions
```css
--transition-colors: color var(--duration-base) var(--ease-in-out),
                     background-color var(--duration-base) var(--ease-in-out),
                     border-color var(--duration-base) var(--ease-in-out);

--transition-transform: transform var(--duration-medium) var(--ease-out);
--transition-opacity: opacity var(--duration-base) var(--ease-in-out);
--transition-all: all var(--duration-base) var(--ease-in-out);
--transition-shadow: box-shadow var(--duration-medium) var(--ease-out);
```

---

## Component-Specific Variables

### Buttons
```css
/* Primary Button */
--button-primary-bg: var(--color-primary-terracotta);
--button-primary-bg-hover: var(--color-primary-terracotta-dark);
--button-primary-text: var(--color-text-inverse);
--button-primary-border: transparent;

/* Secondary Button */
--button-secondary-bg: transparent;
--button-secondary-bg-hover: var(--color-neutral-cream-dark);
--button-secondary-text: var(--color-primary-terracotta);
--button-secondary-border: var(--color-primary-terracotta);

/* Tertiary Button */
--button-tertiary-bg: transparent;
--button-tertiary-bg-hover: var(--color-neutral-cream-dark);
--button-tertiary-text: var(--color-text-link);
--button-tertiary-border: transparent;

/* Button Sizes */
--button-height-sm: 36px;
--button-height-md: 44px; /* Minimum tap target */
--button-height-lg: 52px;
--button-height-xl: 60px;
```

### Forms
```css
--input-bg: var(--color-bg-secondary);
--input-bg-disabled: var(--color-neutral-cream-dark);
--input-border: var(--color-border-medium);
--input-border-hover: var(--color-border-dark);
--input-border-focus: var(--color-border-focus);
--input-text: var(--color-text-primary);
--input-placeholder: var(--color-text-tertiary);
--input-height: 44px;
--input-border-width: 1px;

/* Form Validation */
--input-error-border: var(--color-error);
--input-error-text: var(--color-error-dark);
--input-success-border: var(--color-success);
--input-success-text: var(--color-success-dark);
```

### Cards
```css
--card-bg: var(--color-bg-secondary);
--card-bg-hover: var(--color-neutral-cream);
--card-border: var(--color-border-light);
--card-padding: var(--space-6);
--card-padding-lg: var(--space-8);
```

### Navigation
```css
--nav-height-mobile: 64px;
--nav-height-desktop: 80px;
--nav-bg: var(--color-bg-secondary);
--nav-bg-scroll: rgba(255, 255, 255, 0.95);
--nav-link-color: var(--color-text-primary);
--nav-link-color-hover: var(--color-primary-terracotta);
```

### Modals
```css
--modal-bg: var(--color-bg-secondary);
--modal-backdrop: rgba(58, 54, 51, 0.75);
--modal-max-width: 600px;
--modal-padding: var(--space-8);
--modal-border-radius: var(--radius-2xl);
```

---

## Accessibility

### Focus States
```css
--focus-outline-width: 2px;
--focus-outline-offset: 2px;
--focus-outline-color: var(--color-border-focus);
--focus-outline: var(--focus-outline-width) solid var(--focus-outline-color);
```

### Minimum Touch Target
```css
--touch-target-min: 44px;
```

### Skip Link
```css
--skip-link-bg: var(--color-primary-terracotta);
--skip-link-text: var(--color-text-inverse);
```

---

## Component Inventory

### Atoms (Smallest building blocks)
1. **Button** - Primary, Secondary, Tertiary, Icon variants
2. **Input** - Text, Email, Tel, Date, Textarea
3. **Label**
4. **Icon**
5. **Image** - with lazy loading
6. **Badge**
7. **Spinner/Loader**
8. **Checkbox**
9. **Radio Button**
10. **Select/Dropdown**
11. **Link**
12. **Divider**

### Molecules (Combinations of atoms)
1. **FormField** - Label + Input + Error
2. **SearchBar**
3. **Card** - Base, Image Card, Info Card
4. **Accordion Item**
5. **Tab**
6. **Breadcrumb**
7. **Pagination Item**
8. **Social Media Icon Link**
9. **Star Rating**
10. **Price Tag**
11. **Date Picker**
12. **Image Gallery Item**

### Organisms (Complex components)
1. **Navigation Bar** - Desktop & Mobile
2. **Hero Section**
3. **Footer**
4. **Contact Form**
5. **Booking Inquiry Form**
6. **Room Card**
7. **Safari Experience Card**
8. **Testimonial Card**
9. **Photo Gallery**
10. **Accordion Group**
11. **Tabs Group**
12. **Modal**
13. **Newsletter Signup**
14. **FAQ Section**
15. **Image Carousel/Slider**

### Templates (Page layouts)
1. **Homepage Layout**
2. **Content Page Layout**
3. **Gallery Page Layout**
4. **Form Page Layout**

---

## File Structure

```
amboseli-safari-club/
├── src/
│   ├── app/
│   │   ├── (marketing)/          # Route group for marketing pages
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── layout.tsx         # Marketing layout
│   │   │   ├── accommodations/
│   │   │   │   └── page.tsx
│   │   │   ├── experiences/
│   │   │   │   └── page.tsx
│   │   │   ├── dining/
│   │   │   │   └── page.tsx
│   │   │   ├── wellness/
│   │   │   │   └── page.tsx
│   │   │   ├── location/
│   │   │   │   └── page.tsx
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   ├── api/                   # API routes
│   │   │   ├── contact/
│   │   │   │   └── route.ts
│   │   │   ├── booking-inquiry/
│   │   │   │   └── route.ts
│   │   │   └── newsletter/
│   │   │       └── route.ts
│   │   ├── layout.tsx             # Root layout
│   │   ├── globals.css            # Global styles with CSS variables
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Image.tsx
│   │   │   ├── Label.tsx
│   │   │   ├── Icon.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── RadioButton.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Link.tsx
│   │   │   └── Divider.tsx
│   │   ├── molecules/
│   │   │   ├── FormField.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── AccordionItem.tsx
│   │   │   ├── Tab.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   ├── PaginationItem.tsx
│   │   │   ├── SocialLink.tsx
│   │   │   ├── StarRating.tsx
│   │   │   ├── PriceTag.tsx
│   │   │   ├── DatePicker.tsx
│   │   │   └── ImageGalleryItem.tsx
│   │   ├── organisms/
│   │   │   ├── Navigation.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── BookingForm.tsx
│   │   │   ├── RoomCard.tsx
│   │   │   ├── ExperienceCard.tsx
│   │   │   ├── TestimonialCard.tsx
│   │   │   ├── PhotoGallery.tsx
│   │   │   ├── AccordionGroup.tsx
│   │   │   ├── TabsGroup.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Newsletter.tsx
│   │   │   ├── FAQ.tsx
│   │   │   └── Carousel.tsx
│   │   └── templates/
│   │       ├── MarketingLayout.tsx
│   │       ├── ContentLayout.tsx
│   │       ├── GalleryLayout.tsx
│   │       └── FormLayout.tsx
│   ├── lib/
│   │   ├── utils.ts               # Utility functions
│   │   ├── constants.ts           # App constants
│   │   └── validations.ts         # Zod schemas
│   ├── types/
│   │   ├── index.ts
│   │   ├── room.ts
│   │   ├── experience.ts
│   │   ├── booking.ts
│   │   └── contact.ts
│   ├── data/
│   │   ├── rooms.ts
│   │   ├── experiences.ts
│   │   ├── testimonials.ts
│   │   ├── dining.ts
│   │   └── faqs.ts
│   ├── hooks/
│   │   ├── useMediaQuery.ts
│   │   ├── useInView.ts
│   │   ├── useScrollPosition.ts
│   │   └── useIntersectionObserver.ts
│   └── styles/
│       ├── variables.css          # All CSS variables defined above
│       └── utilities.css          # Utility classes
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── rooms/
│   │   ├── experiences/
│   │   ├── dining/
│   │   ├── wellness/
│   │   └── logos/
│   ├── videos/
│   └── fonts/
├── docs/
│   ├── DESIGN_SPECIFICATIONS.md   # This file
│   └── ...
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Usage Guidelines

### Implementing Design Tokens

All CSS variables should be defined in `src/styles/variables.css` and imported in `src/app/globals.css`:

```css
/* src/styles/variables.css */
:root {
  /* Color System */
  --color-primary-terracotta: #C86F4D;
  /* ... all other variables ... */
}
```

### Using Variables in Components

```tsx
// Example Button Component
<button
  className="bg-[var(--button-primary-bg)] hover:bg-[var(--button-primary-bg-hover)]
             text-[var(--button-primary-text)]
             px-[var(--space-button-padding-x)] py-[var(--space-button-padding-y)]
             rounded-[var(--radius-button)]
             shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-button-hover)]
             transition-[var(--transition-all)]"
>
  Book Now
</button>
```

### Responsive Design

Follow mobile-first approach using the defined breakpoints:

```tsx
<div className="
  text-[var(--font-size-2xl)]     /* Mobile */
  md:text-[var(--font-size-3xl)]   /* Tablet */
  lg:text-[var(--font-size-4xl)]   /* Desktop */
">
  Responsive Heading
</div>
```

---

## Notes

- All measurements use rem units for better accessibility
- Color palette inspired by African savannah landscapes
- Typography combines elegant serif (Playfair Display) for headings with clean sans-serif (Inter) for body text
- Spacing follows 8px base unit for consistent rhythm
- All interactive elements meet WCAG 2.1 AA standards for touch targets (44px minimum)
- Focus states clearly visible for keyboard navigation
- Color contrast ratios meet accessibility guidelines

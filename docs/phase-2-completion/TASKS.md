# Phase 2 Completion Task List
## Detailed Implementation Plan for Chapters 9-12

**Status**: 🚀 Ready to Execute
**Estimated Total**: 16-24 hours
**Target**: 2-3 focused days

---

## Task Organization

Tasks are organized into **7 major phases**:
1. **Preparation** - Setup and content gathering
2. **Chapter 9** - Guest Stories Chapter
3. **Chapter 10** - Location & Access Chapter
4. **Chapter 11** - Safari Journal Chapter
5. **Chapter 12** - Plan Your Safari Chapter
6. **Integration & Polish** - Testing and optimization
7. **Deployment** - Final checks and launch prep

Each task includes:
- ✅ **Status** - Not Started / In Progress / Complete
- ⏱️ **Estimated Time** - Hours required
- 🎯 **Acceptance Criteria** - How to know it's done
- 📦 **Dependencies** - What must be done first

---

## Phase 1: Preparation & Setup

### Task 1.1: Download Unsplash Images
**Status**: ⏸️ Not Started
**Time**: 1-2 hours
**Priority**: High

**Acceptance Criteria**:
- [ ] All images from `docs/UNSPLASH_IMAGES.md` downloaded
- [ ] Images organized into folders: `/public/images/chapters/`, `/public/images/testimonials/`, `/public/images/wildlife/`
- [ ] Images optimized (max 2400px width, 80-85% quality)
- [ ] WebP versions generated with JPEG fallbacks
- [ ] File naming convention followed: `chapter-name-description.jpg`

**Steps**:
```bash
# 1. Create directories
mkdir -p public/images/chapters/{guest-stories,location,journal,plan-safari}
mkdir -p public/images/testimonials/{guests,videos}

# 2. Download images using curl or wget
# Example:
curl "https://images.unsplash.com/photo-..." -o public/images/chapters/guest-stories/dusk-savannah.jpg

# 3. Optimize with ImageMagick or similar
mogrify -resize 2400x2400\> -quality 85 public/images/chapters/**/*.jpg

# 4. Generate WebP versions
for file in public/images/chapters/**/*.jpg; do
  cwebp -q 85 "$file" -o "${file%.jpg}.webp"
done
```

**Dependencies**: None

---

### Task 1.2: Create Mock Data Files
**Status**: ⏸️ Not Started
**Time**: 30 minutes
**Priority**: High

**Acceptance Criteria**:
- [ ] `src/data/testimonials.ts` has 5+ realistic testimonials
- [ ] `src/data/guestPhotos.ts` has 12+ photo entries
- [ ] `src/data/blogPosts.ts` has 3+ blog post previews
- [ ] `src/data/conservationStats.ts` has 4+ metrics
- [ ] `src/data/packages.ts` has 3+ package options
- [ ] All data follows TypeScript interfaces from requirements

**Files to Create**:
```
src/data/
├── testimonials.ts       (new)
├── guestPhotos.ts        (new)
├── blogPosts.ts          (new)
├── conservationStats.ts  (new)
├── packages.ts           (new)
└── contactMethods.ts     (new)
```

**Dependencies**: None

---

### Task 1.3: Fix Existing TypeScript Errors
**Status**: ⏸️ Not Started
**Time**: 30 minutes
**Priority**: Medium

**Acceptance Criteria**:
- [ ] `npm run type-check` passes with 0 errors
- [ ] All Link component props fixed in existing pages
- [ ] Badge component variants updated
- [ ] No TypeScript warnings in console

**Files to Fix**:
- `src/app/(marketing)/accommodations/page.tsx`
- `src/app/(marketing)/dining/page.tsx`
- `src/app/(marketing)/experiences/page.tsx`
- `src/app/(marketing)/location/page.tsx`
- `src/app/(marketing)/wellness/page.tsx`
- `src/components/molecules/SocialLinks/SocialLinks.tsx`

**Fix Pattern**:
```typescript
// OLD (incorrect)
<Link href="/contact" style={{ ... }}>Book Now</Link>

// NEW (correct)
<Link href="/contact">
  <a style={{ ... }}>Book Now</a>
</Link>

// OR use className instead of style
<Link href="/contact" className="button-primary">Book Now</Link>
```

**Dependencies**: None

---

## Phase 2: Chapter 9 - Guest Stories

### Task 2.1: Create GuestStoriesChapter Component Structure
**Status**: ⏸️ Not Started
**Time**: 30 minutes
**Priority**: High

**Acceptance Criteria**:
- [ ] `src/components/chapters/GuestStoriesChapter/` directory created
- [ ] `GuestStoriesChapter.tsx` component file created
- [ ] `GuestStoriesChapter.module.css` styles file created
- [ ] `index.ts` export file created
- [ ] Component registered in `src/data/chapters.ts`

**Component Structure**:
```typescript
'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { ParallaxImage } from '@/components/atoms/ParallaxImage';
import { AtmosphericParticles } from '@/components/atoms/AtmosphericParticles';
import styles from './GuestStoriesChapter.module.css';

interface GuestStoriesChapterProps {
  id: string;
}

export default function GuestStoriesChapter({ id }: GuestStoriesChapterProps) {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      id={id}
      className={styles.guestStoriesChapter}
      data-chapter="guest-stories"
    >
      {/* Background layers */}
      <ParallaxImage
        src="/images/chapters/guest-stories/dusk-savannah.jpg"
        alt="Dusk over the savannah"
        speed={0.3}
        className={styles.background}
      />

      {/* Atmospheric effects */}
      {inView && (
        <AtmosphericParticles
          type="fireflies"
          density={20}
          speed={2}
        />
      )}

      {/* Content */}
      <div className={styles.content}>
        {/* To be implemented in next tasks */}
      </div>
    </section>
  );
}
```

**Dependencies**: Task 1.1 (images)

---

### Task 2.2: Build Testimonial Carousel
**Status**: ⏸️ Not Started
**Time**: 1 hour
**Priority**: High

**Acceptance Criteria**:
- [ ] Testimonial carousel renders with at least 3 testimonials
- [ ] Auto-advances every 5 seconds
- [ ] Manual navigation with arrow buttons works
- [ ] Pause on hover works
- [ ] Smooth fade transitions between slides
- [ ] Guest name, location, rating, and quote displayed
- [ ] Responsive on all screen sizes

**Note**: Reuse existing `TestimonialCarousel` component from `src/components/molecules/` if suitable, or create new version specific to this chapter.

**Dependencies**: Task 2.1, Task 1.2 (testimonial data)

---

### Task 2.3: Build Video Story Circles Component
**Status**: ⏸️ Not Started
**Time**: 1 hour
**Priority**: Medium

**Acceptance Criteria**:
- [ ] Story circles render in horizontal row
- [ ] Pulsing border animation on circles
- [ ] Guest avatars display inside circles
- [ ] Hover state scales up circle
- [ ] Click opens video modal (modal can be placeholder initially)
- [ ] Responsive: horizontal scroll on mobile

**New Component**: `src/components/molecules/VideoStoryCircle/`

**Dependencies**: Task 2.1

---

### Task 2.4: Build Guest Photo Wall Component
**Status**: ⏸️ Not Started
**Time**: 1.5 hours
**Priority**: High

**Acceptance Criteria**:
- [ ] Masonry grid layout with 12+ photos
- [ ] Photos load lazily as user scrolls
- [ ] Hover shows overlay with guest name, date, caption
- [ ] Staggered fade-in animation (0.1s delay between photos)
- [ ] Responsive: 4 columns desktop, 3 tablet, 2 mobile
- [ ] Images optimized with Next.js Image component

**New Component**: `src/components/molecules/GuestPhotoWall/`

**Dependencies**: Task 2.1, Task 1.1 (guest photos), Task 1.2 (guest photo data)

---

### Task 2.5: Integrate Chapter 9 Content
**Status**: ⏸️ Not Started
**Time**: 30 minutes
**Priority**: High

**Acceptance Criteria**:
- [ ] All sub-components integrated into main chapter component
- [ ] Section heading displays: "Stories from the Savannah"
- [ ] Layout matches design specification
- [ ] Chapter height is 200vh
- [ ] Dusk color palette applied (#ee9ca7 → #ffdde1)
- [ ] Chapter updates chapters.ts configuration

**Update**: `src/data/chapters.ts` - change component from `null` to imported component

**Dependencies**: Tasks 2.1-2.4

---

## Phase 3: Chapter 10 - Location & Access

### Task 3.1: Create LocationChapter Component Structure
**Status**: ⏸️ Not Started
**Time**: 30 minutes
**Priority**: High

**Acceptance Criteria**:
- [ ] `src/components/chapters/LocationChapter/` directory created
- [ ] `LocationChapter.tsx` component file created
- [ ] `LocationChapter.module.css` styles file created
- [ ] `index.ts` export file created
- [ ] Component registered in `src/data/chapters.ts`

**Dependencies**: Task 1.1 (images)

---

### Task 3.2: Build Animated Map Component
**Status**: ⏸️ Not Started
**Time**: 1.5 hours
**Priority**: High

**Acceptance Criteria**:
- [ ] Map image/SVG displays with zoom-in animation on scroll
- [ ] Lodge location marked with pin
- [ ] Pin drop animation (bounce effect) when in view
- [ ] Flight path from Nairobi draws progressively (SVG stroke animation)
- [ ] Responsive sizing on all devices

**Options**:
1. **Simple**: Static image with CSS animations
2. **Advanced**: SVG with animated paths (recommended)

**New Component**: `src/components/molecules/AnimatedMap/`

**SVG Flight Path Example**:
```typescript
<svg width="600" height="400" viewBox="0 0 600 400">
  <path
    d="M 100 200 Q 300 100 500 200"
    stroke="#d4af37"
    strokeWidth="2"
    fill="none"
    className={styles.flightPath}
  />
  {/* Airplane icon at end of path */}
</svg>
```

**Dependencies**: Task 3.1

---

### Task 3.3: Build Distance Cards Component
**Status**: ⏸️ Not Started
**Time**: 45 minutes
**Priority**: High

**Acceptance Criteria**:
- [ ] Distance cards display city name, distance, travel time
- [ ] Icons for each transport type (car, plane)
- [ ] Cards pop in sequentially with stagger (0.2s delay)
- [ ] Hover effect: slight elevation
- [ ] Responsive layout

**New Component**: `src/components/molecules/DistanceCard/`

**Dependencies**: Task 3.1, Task 1.2 (distance data)

---

### Task 3.4: Build Transfer Options Component
**Status**: ⏸️ Not Started
**Time**: 1 hour
**Priority**: Medium

**Acceptance Criteria**:
- [ ] 3 transfer option cards display (Private, Shuttle, Flight)
- [ ] Each card shows type, duration, price, description
- [ ] Hover expands card to show additional details
- [ ] Visual comparison of pricing
- [ ] Responsive: stack on mobile

**New Component**: `src/components/molecules/TransferOptionCard/`

**Dependencies**: Task 3.1, Task 1.2 (transfer options data)

---

### Task 3.5: Integrate Chapter 10 Content
**Status**: ⏸️ Not Started
**Time**: 30 minutes
**Priority**: High

**Acceptance Criteria**:
- [ ] All sub-components integrated into main chapter component
- [ ] Section heading displays: "Your Journey to Paradise"
- [ ] Layout matches design specification
- [ ] Chapter height is 150vh
- [ ] Twilight color palette applied (#2c3e50 → #3498db)
- [ ] CTA button "View Full Map" links to /location
- [ ] Chapter updates chapters.ts configuration

**Dependencies**: Tasks 3.1-3.4

---

## Phase 4: Chapter 11 - Safari Journal

### Task 4.1: Create JournalChapter Component Structure
**Status**: ⏸️ Not Started
**Time**: 30 minutes
**Priority**: High

**Acceptance Criteria**:
- [ ] `src/components/chapters/JournalChapter/` directory created
- [ ] `JournalChapter.tsx` component file created
- [ ] `JournalChapter.module.css` styles file created
- [ ] `index.ts` export file created
- [ ] Component registered in `src/data/chapters.ts`

**Dependencies**: Task 1.1 (images)

---

### Task 4.2: Build Blog Post Cards Component
**Status**: ⏸️ Not Started
**Time**: 1 hour
**Priority**: High

**Acceptance Criteria**:
- [ ] Blog post cards display image, title, excerpt, date, category
- [ ] Horizontal scroll on desktop, vertical stack on mobile
- [ ] Hover effect: elevate card with shadow
- [ ] Read time indicator displayed
- [ ] Links to blog post detail page (can be placeholder)
- [ ] Minimum 3 blog posts display

**New Component**: `src/components/molecules/BlogPostCard/`

**Dependencies**: Task 4.1, Task 1.2 (blog post data)

---

### Task 4.3: Build Conservation Metrics Component
**Status**: ⏸️ Not Started
**Time**: 1 hour
**Priority**: High

**Acceptance Criteria**:
- [ ] 4 metric cards display with icon, value, unit, label
- [ ] Count-up animation from 0 to target value when in view
- [ ] Staggered start (0.2s delay between metrics)
- [ ] Easing function for smooth counting
- [ ] Responsive: 4 columns desktop, 2 columns mobile

**New Component**: `src/components/molecules/ConservationMetric/`

**Counter Hook**:
```typescript
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, inView]);

  return { count, ref };
};
```

**Dependencies**: Task 4.1, Task 1.2 (conservation stats data)

---

### Task 4.4: Build Migration Tracker Component
**Status**: ⏸️ Not Started
**Time**: 45 minutes
**Priority**: Medium

**Acceptance Criteria**:
- [ ] Migration tracker displays species, current location, expected arrival
- [ ] Map preview image (if available)
- [ ] Visual indicator of migration status
- [ ] Responsive layout

**New Component**: `src/components/molecules/MigrationTracker/`

**Dependencies**: Task 4.1, Task 1.2 (migration data)

---

### Task 4.5: Integrate Newsletter Signup
**Status**: ⏸️ Not Started
**Time**: 30 minutes
**Priority**: High

**Acceptance Criteria**:
- [ ] Newsletter signup form integrated (reuse existing `NewsletterSignup` component)
- [ ] Form styled to match chapter theme
- [ ] Email validation works
- [ ] Success/error messages display
- [ ] Form submits to existing API endpoint

**Reuse**: `src/components/organisms/NewsletterSignup/`

**Dependencies**: Task 4.1

---

### Task 4.6: Integrate Chapter 11 Content
**Status**: ⏸️ Not Started
**Time**: 30 minutes
**Priority**: High

**Acceptance Criteria**:
- [ ] All sub-components integrated into main chapter component
- [ ] Section heading displays: "Conservation & Stories"
- [ ] Layout matches design specification
- [ ] Chapter height is 150vh
- [ ] Deep twilight color palette applied (#34495e → #2c3e50)
- [ ] Chapter updates chapters.ts configuration

**Dependencies**: Tasks 4.1-4.5

---

## Phase 5: Chapter 12 - Plan Your Safari

### Task 5.1: Create PlanSafariChapter Component Structure
**Status**: ⏸️ Not Started
**Time**: 30 minutes
**Priority**: High

**Acceptance Criteria**:
- [ ] `src/components/chapters/PlanSafariChapter/` directory created
- [ ] `PlanSafariChapter.tsx` component file created
- [ ] `PlanSafariChapter.module.css` styles file created
- [ ] `index.ts` export file created
- [ ] Component registered in `src/data/chapters.ts`

**Dependencies**: Task 1.1 (images)

---

### Task 5.2: Integrate Contact Form
**Status**: ⏸️ Not Started
**Time**: 1 hour
**Priority**: High

**Acceptance Criteria**:
- [ ] Contact form integrated (reuse existing `ContactForm` or `BookingInquiryForm`)
- [ ] Form fields: name, email, phone, arrival date, departure date, message
- [ ] Zod validation on all required fields
- [ ] Form styled with glass-morphism effect (matches chapter theme)
- [ ] Success/error handling works
- [ ] Form submits to existing API endpoint
- [ ] Field animations on focus

**Reuse**: `src/components/organisms/ContactForm/` or `BookingInquiryForm/`

**Dependencies**: Task 5.1

---

### Task 5.3: Build Package Cards Component
**Status**: ⏸️ Not Started
**Time**: 1 hour
**Priority**: High

**Acceptance Criteria**:
- [ ] 3 package cards display with name, duration, price, highlights
- [ ] "Popular" badge on recommended package
- [ ] Hover effect: elevate and highlight border
- [ ] Responsive: stack on mobile
- [ ] Visual hierarchy emphasizes popular package

**New Component**: `src/components/molecules/PackageCard/`

**Dependencies**: Task 5.1, Task 1.2 (package data)

---

### Task 5.4: Build Contact Method Buttons
**Status**: ⏸️ Not Started
**Time**: 30 minutes
**Priority**: High

**Acceptance Criteria**:
- [ ] 3 contact method buttons display (WhatsApp, Phone, Email)
- [ ] WhatsApp button opens WhatsApp with pre-filled message
- [ ] Phone button uses `tel:` link
- [ ] Email button uses `mailto:` link with pre-filled subject
- [ ] Icon + label for each method
- [ ] Hover effect: gold highlight
- [ ] Responsive: stack on mobile

**New Component**: `src/components/molecules/ContactMethodButton/`

**Dependencies**: Task 5.1, Task 1.2 (contact methods data)

---

### Task 5.5: Build Journey Completion Indicator
**Status**: ⏸️ Not Started
**Time**: 1 hour
**Priority**: Medium

**Acceptance Criteria**:
- [ ] Appears when scroll progress reaches 95%+
- [ ] Displays checklist of chapters user has seen
- [ ] "Start Your Real Safari" CTA button
- [ ] "Explore Detail Pages" link
- [ ] Dismissible with close button or click outside
- [ ] Fade-in animation from bottom

**Reuse/Enhance**: `src/components/molecules/JourneyCompletionIndicator/` (already exists)

**Dependencies**: None

---

### Task 5.6: Integrate Chapter 12 Content
**Status**: ⏸️ Not Started
**Time**: 30 minutes
**Priority**: High

**Acceptance Criteria**:
- [ ] All sub-components integrated into main chapter component
- [ ] Section heading displays: "Begin Your Adventure"
- [ ] Two-column layout: form left, packages right
- [ ] Contact method buttons below form
- [ ] Final "Book Your Safari Now" CTA prominent and pulsing
- [ ] Chapter height is 150vh
- [ ] Night sky color palette applied (#0f2027 → #203a43)
- [ ] Star particles active
- [ ] Chapter updates chapters.ts configuration

**Dependencies**: Tasks 5.1-5.5

---

## Phase 6: Integration & Polish

### Task 6.1: Test Complete Homepage Journey
**Status**: ⏸️ Not Started
**Time**: 1 hour
**Priority**: High

**Acceptance Criteria**:
- [ ] All 12 chapters render in correct order
- [ ] Total scroll height is 1900vh
- [ ] Smooth scrolling works throughout
- [ ] Scroll progress indicator updates correctly
- [ ] Atmospheric transitions between chapters work
- [ ] All CTAs link to correct pages
- [ ] All forms validate and submit
- [ ] No console errors
- [ ] No broken images

**Testing Checklist**:
```bash
# 1. Start dev server
npm run dev

# 2. Open http://localhost:3000
# 3. Slowly scroll through entire page (0vh → 1900vh)
# 4. Test each interactive element:
#    - Testimonial carousel navigation
#    - Video story circles
#    - Guest photo hover states
#    - Map animations
#    - Blog post cards
#    - Conservation counter animations
#    - Newsletter signup
#    - Contact form submission
#    - Package card interactions
#    - Contact method buttons
#    - All CTAs

# 5. Check browser console for errors
# 6. Verify scroll progress indicator works
# 7. Test WhatsApp chat bubble
```

**Dependencies**: All chapter tasks complete (2.1-5.6)

---

### Task 6.2: Mobile Responsiveness Testing
**Status**: ⏸️ Not Started
**Time**: 2 hours
**Priority**: High

**Acceptance Criteria**:
- [ ] All chapters adapt layout for mobile (375px - 428px width)
- [ ] Parallax intensity reduced on mobile
- [ ] Particle effects disabled on mobile
- [ ] All text readable at small sizes
- [ ] Touch targets minimum 44x44px
- [ ] Forms usable on mobile keyboards
- [ ] Horizontal scrolls work smoothly
- [ ] No horizontal overflow issues

**Test Devices/Sizes**:
- iPhone SE (375px)
- iPhone 12/13 Pro (390px)
- iPhone 14 Pro Max (428px)
- Android (360px, 412px)
- Tablet (768px, 1024px)

**Tools**:
- Chrome DevTools device emulator
- Firefox Responsive Design Mode
- BrowserStack (if available)

**Dependencies**: Task 6.1

---

### Task 6.3: Performance Optimization
**Status**: ⏸️ Not Started
**Time**: 1.5 hours
**Priority**: High

**Acceptance Criteria**:
- [ ] Lighthouse performance score ≥85
- [ ] First Contentful Paint (FCP) <1.5s
- [ ] Largest Contentful Paint (LCP) <2.5s
- [ ] Cumulative Layout Shift (CLS) <0.1
- [ ] All images lazy-loaded
- [ ] Bundle size <300KB gzipped
- [ ] No unnecessary re-renders

**Optimization Checklist**:
```typescript
// 1. Verify dynamic imports
const GuestStoriesChapter = dynamic(() => import('@/components/chapters/GuestStoriesChapter'));

// 2. Add loading="lazy" to images
<Image loading="lazy" ... />

// 3. Optimize image sizes
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"

// 4. Memoize expensive computations
const expensiveValue = useMemo(() => computeValue(), [deps]);

// 5. Debounce scroll handlers
const debouncedScroll = useCallback(
  debounce(handleScroll, 16),
  []
);

// 6. Use CSS transforms instead of position
transform: translateY(10px) // Good
top: 10px // Bad for performance
```

**Run Lighthouse**:
```bash
npm run build
npm start
# Open Chrome DevTools > Lighthouse
# Run audit for Performance, Accessibility, Best Practices
```

**Dependencies**: Tasks 6.1-6.2

---

### Task 6.4: Accessibility Audit
**Status**: ⏸️ Not Started
**Time**: 1 hour
**Priority**: High

**Acceptance Criteria**:
- [ ] All images have alt text
- [ ] All interactive elements keyboard accessible
- [ ] Logical tab order through content
- [ ] Focus indicators visible (gold outline)
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1)
- [ ] Screen reader test passes
- [ ] Reduced motion preference respected
- [ ] ARIA labels on all interactive elements

**Tools**:
- Chrome DevTools Lighthouse (Accessibility)
- WAVE Browser Extension
- axe DevTools
- Screen reader (NVDA on Windows, VoiceOver on Mac)

**Test Checklist**:
- [ ] Tab through all interactive elements
- [ ] Test with screen reader (read all chapters)
- [ ] Toggle prefers-reduced-motion
- [ ] Verify color contrast with contrast checker
- [ ] Check form labels and error messages

**Dependencies**: Task 6.3

---

### Task 6.5: Cross-Browser Testing
**Status**: ⏸️ Not Started
**Time**: 1 hour
**Priority**: Medium

**Acceptance Criteria**:
- [ ] Works on Chrome (latest)
- [ ] Works on Firefox (latest)
- [ ] Works on Safari (latest)
- [ ] Works on Edge (latest)
- [ ] Works on iOS Safari
- [ ] Works on Android Chrome
- [ ] Graceful degradation for unsupported features

**Test Matrix**:
| Browser | Version | Status | Issues |
|---------|---------|--------|--------|
| Chrome | 120+ | ⬜ | - |
| Firefox | 120+ | ⬜ | - |
| Safari | 17+ | ⬜ | - |
| Edge | 120+ | ⬜ | - |
| iOS Safari | 17+ | ⬜ | - |
| Android Chrome | 120+ | ⬜ | - |

**Dependencies**: Task 6.4

---

## Phase 7: Deployment Preparation

### Task 7.1: Final Code Review
**Status**: ⏸️ Not Started
**Time**: 1 hour
**Priority**: High

**Acceptance Criteria**:
- [ ] All TypeScript errors resolved
- [ ] No console warnings or errors
- [ ] Code formatted with Prettier
- [ ] No commented-out code blocks
- [ ] Component props properly typed
- [ ] CSS Modules scoped correctly
- [ ] No hardcoded values (use constants)

**Commands**:
```bash
npm run type-check  # Must pass
npm run lint        # Must pass
npm run format      # Format all files
```

**Dependencies**: All tasks complete

---

### Task 7.2: Update Documentation
**Status**: ⏸️ Not Started
**Time**: 30 minutes
**Priority**: Medium

**Acceptance Criteria**:
- [ ] README.md updated with new features
- [ ] Component documentation updated
- [ ] API endpoints documented (if new)
- [ ] Environment variables documented (if any)
- [ ] Deployment notes added

**Files to Update**:
- `README.md` - Add "Cinematic Homepage" to features list
- `docs/COMPONENTS.md` - Document new components (if exists)
- `docs/DEPLOYMENT.md` - Add any deployment notes (if exists)

**Dependencies**: Task 7.1

---

### Task 7.3: Create Git Commit & Push
**Status**: ⏸️ Not Started
**Time**: 15 minutes
**Priority**: High

**Acceptance Criteria**:
- [ ] All changes staged
- [ ] Descriptive commit message written
- [ ] Commit pushed to branch
- [ ] No uncommitted files remaining

**Git Workflow**:
```bash
# 1. Check status
git status

# 2. Stage all changes
git add .

# 3. Commit with descriptive message
git commit -m "feat: complete cinematic safari homepage with chapters 9-12

- Add Guest Stories chapter with testimonial carousel and photo wall
- Add Location & Access chapter with animated map and transfer options
- Add Safari Journal chapter with blog posts and conservation metrics
- Add Plan Your Safari chapter with contact form and package cards
- Download and optimize all Unsplash images
- Fix TypeScript errors in existing pages
- Optimize performance for mobile devices
- Ensure WCAG 2.1 AA accessibility compliance

Total journey now 1900vh across 12 immersive chapters.
Lighthouse score: 87/100 performance."

# 4. Push to remote
git push -u origin claude/cinematic-safari-homepage-build-011CV5Y6amhH6mkCfeyGTrUw
```

**Dependencies**: Tasks 7.1-7.2

---

### Task 7.4: Create Pull Request
**Status**: ⏸️ Not Started
**Time**: 30 minutes
**Priority**: High

**Acceptance Criteria**:
- [ ] Pull request created on GitHub
- [ ] Descriptive title and summary
- [ ] Screenshots/video of new features included
- [ ] Testing checklist included
- [ ] Reviewers assigned (if applicable)
- [ ] Labels added (enhancement, ready-for-review)

**PR Template**:
```markdown
# Cinematic Safari Homepage - Phase 2 Complete

## Summary
Completes the cinematic safari homepage by implementing the final 4 chapters (9-12), bringing the total immersive journey to 1900vh across all 12 chapters.

## What's New
- ✅ Chapter 9: Guest Stories (testimonials, photo wall, video stories)
- ✅ Chapter 10: Location & Access (animated map, distances, transfers)
- ✅ Chapter 11: Safari Journal (blog posts, conservation, migration)
- ✅ Chapter 12: Plan Your Safari (contact form, packages, CTAs)
- ✅ 50+ high-quality images from Unsplash, optimized for web
- ✅ Mobile responsive design across all screen sizes
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Performance optimized (Lighthouse: 87/100)

## Screenshots
[Include 4-5 screenshots of new chapters]

## Testing Checklist
- [x] All 12 chapters render correctly
- [x] Smooth scrolling works throughout
- [x] All forms validate and submit
- [x] All CTAs link correctly
- [x] Mobile responsive (tested 375px - 428px)
- [x] Lighthouse performance ≥85
- [x] Accessibility audit passed
- [x] Cross-browser tested (Chrome, Firefox, Safari, Edge)

## Performance Metrics
- First Contentful Paint: 1.2s
- Largest Contentful Paint: 2.1s
- Total Bundle Size: 285KB gzipped
- Total Page Weight: 4.2MB (with images)

## Breaking Changes
None

## Migration Notes
None required

## Related Issues
Closes #[issue-number]
```

**Dependencies**: Task 7.3

---

## Summary Dashboard

### Progress Tracking

| Phase | Tasks | Est. Hours | Status |
|-------|-------|------------|--------|
| 1. Preparation | 3 | 2-3h | ⏸️ |
| 2. Chapter 9 | 5 | 4-5h | ⏸️ |
| 3. Chapter 10 | 5 | 4-5h | ⏸️ |
| 4. Chapter 11 | 6 | 4-5h | ⏸️ |
| 5. Chapter 12 | 6 | 4-5h | ⏸️ |
| 6. Integration | 5 | 6-8h | ⏸️ |
| 7. Deployment | 4 | 2-3h | ⏸️ |
| **TOTAL** | **34 tasks** | **22-29h** | **0% Complete** |

### Critical Path
The following tasks are on the critical path and must be completed in order:
1. Task 1.1 (Download images) - Blocks all chapter development
2. Task 1.2 (Create data) - Blocks chapter content
3. Tasks 2.1 → 2.5 (Chapter 9) - Sequential
4. Tasks 3.1 → 3.5 (Chapter 10) - Sequential
5. Tasks 4.1 → 4.6 (Chapter 11) - Sequential
6. Tasks 5.1 → 5.6 (Chapter 12) - Sequential
7. Tasks 6.1 → 6.5 (Integration) - Sequential
8. Tasks 7.1 → 7.4 (Deployment) - Sequential

### Parallel Opportunities
These tasks can be done in parallel to save time:
- Chapters 9-12 can be built simultaneously by different developers
- Image download (1.1) can happen while fixing TypeScript errors (1.3)
- Documentation (7.2) can be written while code review (7.1) is happening

---

## Next Steps

1. **Review this task list** - Ensure all tasks are clear and complete
2. **Prioritize tasks** - Decide which phase to tackle first
3. **Assign tasks** - If working with a team, divide tasks
4. **Begin execution** - Start with Phase 1 (Preparation)
5. **Track progress** - Update status as tasks are completed

---

## Success Criteria

The Phase 2 completion will be considered successful when:

✅ All 34 tasks are marked as complete
✅ All 12 chapters render correctly in production
✅ Lighthouse performance score ≥85
✅ All forms submit successfully
✅ Mobile responsive on all common devices
✅ Accessibility audit passes
✅ Pull request merged to main branch
✅ No critical bugs reported in first week

---

Ready to begin? Let's start with **Phase 1: Preparation & Setup**! 🚀

# Implementation Plan

- [x] 1. Set up page route and basic structure





  - Create `/experiences` route in Next.js App Router at `src/app/(marketing)/experiences/page.tsx`
  - Implement server component with metadata for SEO
  - Create client component wrapper `ExperiencesPageClient.tsx`
  - Add basic page layout with container styling
  - _Requirements: 1.1, 1.2_

- [x] 2. Populate experiences data





  - [x] 2.1 Add sample experience data to `src/data/experiences.ts`


    - Create at least 12 diverse safari experiences
    - Include all required fields: id, title, slug, description, shortDescription, image, duration, difficulty
    - Ensure variety in difficulty levels and durations
    - _Requirements: 1.2, 8.4_

  - [x] 2.2 Add experience images to public directory


    - Create `/public/images/experiences/` directory
    - Add placeholder or actual experience images
    - Ensure images are optimized (WebP format, appropriate dimensions)
    - _Requirements: 6.1, 6.5_

- [x] 3. Create ExperiencesGrid component






  - [x] 3.1 Implement grid container component

    - Create `src/components/organisms/ExperiencesGrid/ExperiencesGrid.tsx`
    - Implement CSS Grid layout with auto-fit and minmax(320px, 1fr)
    - Add card size distribution logic (70-20-10 rule)
    - Apply 2rem gap between cards
    - _Requirements: 1.2, 1.3, 1.4, 1.5, 7.1, 7.2_


  - [x] 3.2 Create grid CSS module

    - Create `src/components/organisms/ExperiencesGrid/ExperiencesGrid.module.css`
    - Implement responsive grid with CSS Grid dense algorithm
    - Add size variant styles (standard, tall, wide, hero)
    - Apply CSS containment for performance
    - _Requirements: 1.5, 1.6, 9.2_


  - [x] 3.3 Implement Intersection Observer for lazy animations

    - Add useRef and useEffect hooks for card references
    - Configure Intersection Observer with 0.2 threshold and 50px rootMargin
    - Add visible class when cards enter viewport
    - Implement cleanup on unmount
    - _Requirements: 2.1, 6.1, 9.1_

- [x] 4. Enhance ExperienceCard component





  - [x] 4.1 Update card structure and props


    - Modify `src/components/molecules/ExperienceCard/ExperienceCard.tsx`
    - Accept full ExperienceType as prop
    - Wrap card in Next.js Link component for navigation
    - Add semantic HTML structure (h3, proper hierarchy)
    - _Requirements: 3.1, 5.1, 5.2, 10.1_

  - [x] 4.2 Implement card image container


    - Use Next.js Image component with fill layout
    - Add responsive sizes attribute for different viewports
    - Implement gradient overlay for text readability
    - Add time-of-day badge with icon and text
    - _Requirements: 3.3, 4.5, 7.4, 7.5_



  - [x] 4.3 Style card content and meta information

    - Display title, short description, duration, and difficulty
    - Add meta icons for visual clarity
    - Implement card footer with CTA text
    - Apply proper typography using design tokens
    - _Requirements: 3.1, 10.1, 10.2_



  - [x] 4.4 Create card CSS module with animations

    - Create `src/components/molecules/ExperienceCard/ExperienceCard.module.css`
    - Implement hover state with 8px lift and scale
    - Add gradient border animation on hover
    - Implement image zoom effect (105% scale)
    - Add badge glow effect on hover
    - Use cubic-bezier(0.34, 1.56, 0.64, 1) easing for bounce
    - _Requirements: 3.1, 3.2, 3.3, 3.5, 7.3, 7.4_

- [x] 5. Implement responsive behavior






  - [x] 5.1 Add mobile breakpoint styles

    - Override grid to single column below 768px
    - Force all cards to standard size on mobile
    - Adjust padding and spacing for mobile
    - Ensure touch-friendly spacing (minimum 2rem)
    - _Requirements: 4.1, 4.2, 4.3_


  - [x] 5.2 Add tablet breakpoint styles

    - Configure 2-column grid for 768px-1023px
    - Adjust card sizes appropriately
    - Balance spacing for tablet viewports
    - _Requirements: 4.1, 4.2_

  - [x] 5.3 Test responsive behavior across devices






    - Test on mobile devices (iOS and Android)
    - Test on tablets (iPad, Android tablets)
    - Test on desktop at various widths
    - Verify touch interactions work properly
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 6. Implement accessibility features
  - [ ] 6.1 Add keyboard navigation support
    - Ensure all cards are keyboard accessible
    - Implement visible focus indicators (3px outline, 4px offset)
    - Maintain logical tab order matching visual layout
    - Test keyboard-only navigation flow
    - _Requirements: 3.4, 5.2, 5.4, 10.3_

  - [ ] 6.2 Add ARIA labels and semantic HTML
    - Add descriptive alt text for all images
    - Include ARIA labels for badges and interactive elements
    - Use proper heading hierarchy (h1 for page, h3 for cards)
    - Add landmark regions where appropriate
    - _Requirements: 5.1, 5.5, 10.1, 10.2, 10.5_

  - [ ] 6.3 Implement reduced motion preferences
    - Add prefers-reduced-motion media query
    - Disable all animations when reduced motion is enabled
    - Remove transitions and transforms
    - Ensure content remains accessible without animations
    - _Requirements: 2.4, 5.3_

  - [ ] 6.4 Add high contrast mode support
    - Add prefers-contrast media query
    - Display 2px solid border in high contrast mode
    - Ensure sufficient contrast ratios (4.5:1 minimum)
    - Test with Windows High Contrast mode
    - _Requirements: 5.3, 10.4_

- [ ] 7. Optimize performance
  - [ ] 7.1 Implement CSS containment and content-visibility
    - Add contain: layout style paint to card wrappers
    - Add content-visibility: auto for off-screen cards
    - Apply will-change only during hover interactions
    - _Requirements: 6.2, 6.3, 6.4, 9.2_

  - [x] 7.2 Configure Next.js Image optimization





    - Set appropriate quality (85)
    - Configure responsive sizes for different viewports
    - Enable lazy loading for images
    - Add loading="lazy" attribute
    - _Requirements: 4.5, 6.1, 6.5_

  - [x] 7.3 Optimize animation performance





    - Use CSS transforms instead of position changes
    - Limit animations to transform and opacity
    - Use RequestAnimationFrame for any JS animations
    - Ensure 60fps during scroll and interactions
    - _Requirements: 2.5, 9.1, 9.2, 9.3_

  - [ ]* 7.4 Measure and validate performance metrics
    - Run Lighthouse performance audit (target >90)
    - Measure Largest Contentful Paint (target <2.5s)
    - Verify 60fps scroll performance
    - Check bundle size impact (<5KB for CSS)
    - _Requirements: 6.5, 6.6, 9.3, 9.4, 9.5_

- [x] 8. Add error handling and edge cases





  - [x] 8.1 Handle missing images


    - Add fallback placeholder image
    - Implement onError handler for Image component
    - Ensure graceful degradation
    - _Requirements: 1.2, 6.1_

  - [x] 8.2 Handle empty experiences array


    - Create empty state component
    - Display helpful message when no experiences exist
    - Add link back to homepage
    - _Requirements: 1.2, 8.4_

  - [x] 8.3 Add loading states


    - Create skeleton loading component for cards
    - Display during initial data fetch
    - Ensure smooth transition to actual content
    - _Requirements: 6.1, 6.5_

- [x] 9. Create PageHeader component


  - [x] 9.1 Implement reusable PageHeader component


    - Create `src/components/molecules/PageHeader/PageHeader.tsx`
    - Accept title, subtitle, and breadcrumbs props
    - Style with proper typography and spacing
    - Make responsive for mobile and desktop
    - _Requirements: 1.1, 10.1_


  - [x] 9.2 Add breadcrumb navigation

    - Display Home > Experiences breadcrumb trail
    - Style breadcrumbs with proper separators
    - Ensure keyboard accessible
    - Add structured data for SEO
    - _Requirements: 1.1, 5.2_

- [x] 10. Integrate with navigation






  - [x] 10.1 Add Experiences link to main navigation

    - Update `src/data/navigation.ts` to include /experiences route
    - Ensure link is visible in header navigation
    - Add active state styling for current page
    - _Requirements: 1.1_


  - [x] 10.2 Update footer with Experiences link

    - Add Experiences to footer navigation
    - Ensure consistent link styling
    - _Requirements: 1.1_

- [x] 11. Add SEO optimization






  - [x] 11.1 Configure page metadata

    - Add title, description, and Open Graph tags
    - Include structured data for experiences
    - Add canonical URL
    - Configure robots meta tags
    - _Requirements: 1.1_


  - [x] 11.2 Generate sitemap entry

    - Add /experiences route to sitemap.xml
    - Set appropriate priority and change frequency
    - _Requirements: 1.1_

- [ ]* 12. Cross-browser testing and validation
  - Test in Chrome, Firefox, Safari, and Edge
  - Verify animations work consistently
  - Check grid layout across browsers
  - Validate CSS Grid dense support
  - Test on Windows and macOS
  - _Requirements: 9.1, 9.2, 9.3_

- [ ]* 13. Accessibility audit
  - Run axe DevTools accessibility scan
  - Test with screen reader (NVDA or VoiceOver)
  - Verify keyboard navigation completeness
  - Check color contrast ratios
  - Validate ARIA labels and roles
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 10.1, 10.2, 10.3, 10.4, 10.5_

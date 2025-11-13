# Implementation Plan

- [x] 1. Set up core infrastructure and type definitions





  - Create chapter type definitions in `src/types/chapter.ts`
  - Create chapter configuration data in `src/data/chapters.ts`
  - Create custom hooks: `useParallax.ts` and `useChapterProgress.ts`
  - _Requirements: 1.1, 16.5_

- [x] 2. Build CinematicJourney container component





  - Create `src/components/organisms/CinematicJourney/CinematicJourney.tsx`
  - Implement atmospheric transition system based on time-of-day
  - Integrate with existing SafariProgressProvider
  - Create CSS module for container styling
  - _Requirements: 1.1, 1.4, 1.5_

- [x] 3. Create shared utility components





  - [x] 3.1 Build ParallaxImage atom component


    - Create `src/components/atoms/ParallaxImage/ParallaxImage.tsx`
    - Implement scroll-based transform calculations
    - Integrate with Next.js Image optimization
    - Add lazy loading support
    - _Requirements: 1.2, 16.3_

  - [x] 3.2 Build ScrollProgressIndicator molecule


    - Create `src/components/molecules/ScrollProgressIndicator/ScrollProgressIndicator.tsx`
    - Display vertical progress bar with chapter markers
    - Implement click-to-navigate functionality
    - Add hover tooltips for chapter names
    - _Requirements: 1.3, 15.3, 15.4_

  - [x] 3.3 Build StickyNavigation molecule


    - Create `src/components/molecules/StickyNavigation/StickyNavigation.tsx`
    - Implement auto-hide on scroll up behavior
    - Add blur background effect
    - Integrate with existing navigation data
    - _Requirements: 15.1, 15.2_

  - [x] 3.4 Build WhatsAppChatBubble molecule


    - Create `src/components/molecules/WhatsAppChatBubble/WhatsAppChatBubble.tsx`
    - Implement floating animation
    - Add pulse effect every 10 seconds
    - Configure WhatsApp link with pre-filled message
    - _Requirements: 15.5_

- [x] 4. Implement Chapter 1: PreDawnHero





  - [x] 4.1 Create PreDawnHero component structure


    - Create `src/components/chapters/PreDawnHero/PreDawnHero.tsx`
    - Implement full viewport height layout
    - Add dark pre-dawn color palette styling
    - Integrate with existing Hero component patterns
    - _Requirements: 3.1, 3.2_

  - [x] 4.2 Add hero animations and interactions


    - Implement logo fade-in animation (0.8s delay)
    - Add tagline typing effect (1.2s delay)
    - Create dual CTA buttons with slide-up animation (1.6s delay)
    - Add scroll indicator with pulse animation
    - _Requirements: 3.3, 3.4, 3.5_


  - [x] 4.3 Add atmospheric effects

    - Implement star field particle animation
    - Add Mount Kilimanjaro silhouette with gradient sky
    - Create parallax effect on background (0.3x speed)
    - _Requirements: 1.2, 17.3_

- [x] 5. Implement Chapter 2: SunriseChapter





  - [x] 5.1 Create SunriseChapter component


    - Create `src/components/chapters/SunriseChapter/SunriseChapter.tsx`
    - Implement 100vh height layout (100vh-200vh range)
    - Add warm golden gradient background
    - _Requirements: 4.1, 4.2_

  - [x] 5.2 Add sunrise animations


    - Implement sun rising animation based on scroll progress
    - Add safari jeep image with parallax (0.5x speed)
    - Create message fade-in when 30% visible
    - Add progressive color temperature warming
    - _Requirements: 4.3, 4.4, 4.5_


- [x] 6. Implement Chapter 3: MorningDriveChapter





  - [x] 6.1 Create MorningDriveChapter component


    - Create `src/components/chapters/MorningDriveChapter/MorningDriveChapter.tsx`
    - Implement 150vh height layout (200vh-350vh range)
    - Add bright morning light gradient background
    - Create grassland parallax background layer
    - _Requirements: 5.1, 5.2_

  - [x] 6.2 Build WildlifeCard molecule


    - Create `src/components/molecules/WildlifeCard/WildlifeCard.tsx`
    - Implement card layout with image and basic info
    - Add hover state that reveals fun facts
    - Create zoom effect on hover
    - _Requirements: 5.3, 5.4_

  - [x] 6.3 Add wildlife encounter interactions


    - Display 3-4 wildlife cards in staggered layout
    - Implement sequential fade-in as user scrolls
    - Add binocular cursor effect for this section
    - Create distance counter animation (0-15km)
    - Add CTA that appears at 80% scroll progress
    - _Requirements: 5.3, 5.4, 5.5, 17.1_

- [ ] 7. Implement Chapter 4: BushBreakfastChapter




  - [x] 7.1 Create BushBreakfastChapter component


    - Create `src/components/chapters/BushBreakfastChapter/BushBreakfastChapter.tsx`
    - Implement 150vh height layout (350vh-500vh range)
    - Add warm morning light with acacia tree silhouette
    - Create table setup image with parallax (0.6x speed)
    - _Requirements: 6.1, 6.2_

  - [x] 7.2 Add dining atmosphere effects


    - Implement animated steam particles rising from food/beverages
    - Create sequential fade-in for menu items
    - Add CTA that slides in from bottom
    - _Requirements: 6.3, 6.4, 6.5, 17.2_
-

- [x] 8. Implement Chapter 5: AccommodationsChapter





  - [x] 8.1 Create AccommodationsChapter component

    - Create `src/components/chapters/AccommodationsChapter/AccommodationsChapter.tsx`
    - Implement 200vh height layout (500vh-700vh range)
    - Add midday lighting color palette
    - Create split-screen layout for desktop
    - _Requirements: 7.1, 7.2_

  - [x] 8.2 Build room preview cards


    - Display 2-3 room preview cards with large imagery
    - Implement strong parallax on room images (0.4x speed)
    - Add "view from window" overlay on hover
    - Create alternating slide-in animations
    - Add subtle availability indicators
    - Add sticky CTA at bottom of section
    - _Requirements: 7.3, 7.4, 7.5_

- [x] 9. Implement Chapter 6: DiningChapter




  - [x] 9.1 Create DiningChapter component


    - Create `src/components/chapters/DiningChapter/DiningChapter.tsx`
    - Implement 150vh height layout (700vh-850vh range)
    - Add afternoon golden light gradient
    - Create sundowner deck imagery with parallax (0.5x speed)
    - _Requirements: 8.1, 8.2_

  - [x] 9.2 Add culinary showcase elements


    - Display signature dishes in carousel format
    - Implement wine pairing cards with sequential fade-in
    - Add CTA with reservation time slots preview
    - _Requirements: 8.3, 8.4, 8.5_

- [x] 10. Implement Chapter 7: ExperiencesChapter



  - [x] 10.1 Create ExperiencesChapter component


    - Create `src/components/chapters/ExperiencesChapter/ExperiencesChapter.tsx`
    - Implement 250vh height layout (850vh-1100vh range)
    - Add golden hour lighting gradient
    - Create game drive scene background with parallax (0.3x speed)
    - _Requirements: 9.1, 9.2_

  - [x] 10.2 Build ExperienceCard molecule


    - Create `src/components/molecules/ExperienceCard/ExperienceCard.tsx`
    - Display experience image, title, duration, and difficulty
    - Implement flip animation on hover
    - Add difficulty badges with animation
    - _Requirements: 9.3_

  - [x] 10.3 Build ActivityTimeline molecule


    - Create `src/components/molecules/ActivityTimeline/ActivityTimeline.tsx`
    - Display morning, afternoon, and evening activity options
    - Implement interactive filtering on click
    - Add "Best season for..." tags that appear on scroll
    - _Requirements: 9.4, 9.5_


- [x] 11. Implement Chapter 8: WellnessChapter





  - [x] 11.1 Create WellnessChapter component


    - Create `src/components/chapters/WellnessChapter/WellnessChapter.tsx`
    - Implement 150vh height layout (1100vh-1250vh range)
    - Add sunset colors with calming palette
    - Create yoga silhouette against sunset with parallax (0.4x speed)
    - _Requirements: 10.1, 10.2_

  - [x] 11.2 Add wellness atmosphere and interactions


    - Implement breathing circle animation (inhale/exhale timing)
    - Display spa treatment previews with staggered appearance
    - Apply calming color palette shift in atmospheric transition
    - Add CTA linking to wellness page
    - _Requirements: 10.3, 10.4, 10.5_

- [ ] 12. Implement Chapter 9: GuestStoriesChapter
  - [ ] 12.1 Create GuestStoriesChapter component
    - Create `src/components/chapters/GuestStoriesChapter/GuestStoriesChapter.tsx`
    - Implement 200vh height layout (1250vh-1450vh range)
    - Add dusk color palette
    - _Requirements: 11.1_

  - [ ] 12.2 Build TestimonialCarousel molecule
    - Create `src/components/molecules/TestimonialCarousel/TestimonialCarousel.tsx`
    - Display testimonial cards with guest info and ratings
    - Implement auto-advance every 5 seconds
    - Add manual navigation controls
    - _Requirements: 11.2_

  - [ ] 12.3 Add social proof elements
    - Create photo wall grid with masonry layout
    - Implement Instagram-style story circles for video testimonials
    - Add pulse animation to story circles
    - Create video player modal that opens on click
    - Apply staggered fade-in to testimonials
    - _Requirements: 11.3, 11.4, 11.5_

- [ ] 13. Implement Chapter 10: LocationChapter
  - [ ] 13.1 Create LocationChapter component
    - Create `src/components/chapters/LocationChapter/LocationChapter.tsx`
    - Implement 150vh height layout (1450vh-1600vh range)
    - Add twilight color palette
    - _Requirements: 12.1_

  - [ ] 13.2 Add location visualization elements
    - Implement animated map reveal on scroll
    - Create flight path animation that draws progressively
    - Display distance markers that pop in sequentially
    - Add transfer options comparison on hover
    - Add CTA linking to full interactive map
    - _Requirements: 12.2, 12.3, 12.4, 12.5_

- [ ] 14. Implement Chapter 11: JournalChapter
  - [ ] 14.1 Create JournalChapter component
    - Create `src/components/chapters/JournalChapter/JournalChapter.tsx`
    - Implement 150vh height layout (1600vh-1750vh range)
    - Add deep twilight color palette
    - _Requirements: 13.1_

  - [ ] 14.2 Add blog and conservation content
    - Display blog post preview cards with slide-in animations
    - Create conservation impact counters with count-up animation
    - Implement seasonal migration tracker visualization
    - Add newsletter signup form with slide-in animation
    - Display latest wildlife sighting updates
    - _Requirements: 13.2, 13.3, 13.4, 13.5_

- [ ] 15. Implement Chapter 12: PlanSafariChapter
  - [ ] 15.1 Create PlanSafariChapter component
    - Create `src/components/chapters/PlanSafariChapter/PlanSafariChapter.tsx`
    - Implement 150vh height layout (1750vh-1900vh range)
    - Add night sky with stars color palette
    - _Requirements: 14.1_

  - [ ] 15.2 Build contact and booking elements
    - Create contact form with sequential field animations
    - Display contact methods (WhatsApp, phone, email) with hover effects
    - Build package preview cards that expand on hover
    - Implement availability calendar heatmap
    - Add final "Book Now" CTA with gentle pulse animation
    - _Requirements: 14.2, 14.3, 14.4, 14.5_


- [x] 16. Create atmospheric effects components





  - [x] 16.1 Build AnimatedCursor atom


    - Create `src/components/atoms/AnimatedCursor/AnimatedCursor.tsx`
    - Implement binoculars cursor for wildlife sections
    - Add smooth follow animation
    - Hide on mobile/touch devices
    - _Requirements: 17.1_

  - [x] 16.2 Build AtmosphericParticles atom


    - Create `src/components/atoms/AtmosphericParticles/AtmosphericParticles.tsx`
    - Implement canvas-based particle system
    - Support dust, fireflies, and stars particle types
    - Optimize for performance (max 50 particles)
    - Pause animation when not in view
    - _Requirements: 17.2, 17.3_

  - [x] 16.3 Add journey completion indicator


    - Create "Your journey so far" summary component
    - Display when user completes all chapters
    - Show key highlights from the journey
    - _Requirements: 17.5_

- [ ] 17. Integrate all chapters into homepage




  - Update `src/app/(marketing)/page.tsx` to use CinematicJourney
  - Remove existing simple Hero implementation
  - Ensure all chapters render in correct sequence
  - Verify atmospheric transitions between chapters
  - Test scroll progress tracking integration
  - _Requirements: 1.1, 1.4, 1.5_

- [ ] 18. Implement responsive design adaptations
  - [ ] 18.1 Add mobile-specific optimizations
    - Reduce chapter heights for mobile (60-80vh)
    - Simplify parallax effects (reduce intensity by 50%)
    - Disable particle effects on mobile
    - Stack CTAs vertically
    - Increase touch target sizes to minimum 44x44px
    - Use smaller optimized images for mobile
    - _Requirements: 16.1, 16.2_

  - [ ] 18.2 Add tablet-specific adaptations
    - Implement two-column layouts where appropriate
    - Adjust typography sizes for tablet viewports
    - Optimize image sizes for tablet screens
    - _Requirements: 16.1_

  - [ ] 18.3 Enhance desktop experience
    - Enable full parallax effects
    - Activate particle animations
    - Enable custom cursor effects
    - Use larger high-quality imagery
    - Implement multi-column layouts
    - _Requirements: 16.1_

- [ ] 19. Implement accessibility features
  - [ ] 19.1 Add keyboard navigation support
    - Ensure all interactive elements are keyboard accessible
    - Implement logical tab order through chapters
    - Add skip to content link at top
    - Make focus indicators visible on all elements
    - Add Escape key handler for modals/videos
    - _Requirements: 16.4_

  - [ ] 19.2 Add screen reader support
    - Use semantic HTML structure (header, main, section, article)
    - Add ARIA labels to all interactive elements
    - Write descriptive alt text for all images
    - Implement live regions for dynamic content
    - Use descriptive link text (avoid "click here")
    - _Requirements: 16.4_

  - [ ] 19.3 Implement reduced motion support
    - Detect prefers-reduced-motion preference
    - Disable parallax when reduced motion is preferred
    - Disable particle animations when reduced motion is preferred
    - Reduce animation durations to zero when preferred
    - _Requirements: 16.4_

  - [ ] 19.4 Ensure color contrast compliance
    - Verify text on backgrounds meets 4.5:1 ratio
    - Check large text meets 3:1 ratio
    - Ensure interactive elements meet 3:1 ratio
    - Verify focus indicators meet 3:1 ratio
    - Add overlay gradients on background images where needed
    - _Requirements: 16.4_


- [ ] 20. Optimize performance
  - [ ] 20.1 Implement image optimization strategy
    - Configure Next.js Image component with appropriate sizes
    - Use eager loading for hero image and logo
    - Implement lazy loading for all below-fold images
    - Add blur placeholders for smooth loading experience
    - Use WebP format with JPEG fallback
    - Preload critical assets (hero image, logo)
    - _Requirements: 16.3_

  - [ ] 20.2 Implement code splitting
    - Use dynamic imports for chapter components
    - Split code by chapter to reduce initial bundle
    - Implement progressive loading as user scrolls
    - _Requirements: 16.3_

  - [ ] 20.3 Optimize animations for performance
    - Use GPU-accelerated properties (transform, opacity)
    - Add will-change property sparingly
    - Debounce scroll event handlers
    - Use requestAnimationFrame for smooth animations
    - Disable animations on low-end devices
    - _Requirements: 16.3, 16.4_

  - [ ] 20.4 Monitor and optimize bundle size
    - Tree-shake unused Framer Motion features
    - Minimize third-party dependencies
    - Analyze bundle with @next/bundle-analyzer
    - Target initial JS bundle under 200KB gzipped
    - _Requirements: 16.4_

- [ ] 21. Add analytics and tracking
  - Implement chapter scroll progress tracking (25%, 50%, 75%, 100%)
  - Track CTA clicks by chapter
  - Monitor time spent in each chapter
  - Track video plays for testimonials
  - Track form submissions
  - Track WhatsApp chat opens
  - _Requirements: 2.5_

- [ ] 22. Implement error handling
  - [ ] 22.1 Handle image loading failures
    - Add onError handlers to Image components
    - Provide fallback background colors matching time-of-day
    - Log errors to console in development
    - _Requirements: 2.1, 2.2_

  - [ ] 22.2 Handle scroll performance issues
    - Monitor frame rate using requestAnimationFrame
    - Reduce parallax intensity if FPS drops below 30
    - Disable particle effects on low-end devices
    - Support prefers-reduced-motion preference
    - _Requirements: 16.2, 16.3_

  - [ ] 22.3 Handle data fetching gracefully
    - Use static fallbacks for all chapter content
    - Provide fallback content for optional features (blog, testimonials)
    - Handle newsletter signup failures with error messages
    - _Requirements: 2.3_

- [ ]* 23. Write component tests
  - [ ]* 23.1 Write unit tests for chapter components
    - Test PreDawnHero renders with required props
    - Test all chapter components render correctly
    - Verify props are passed and displayed properly
    - Test CTA buttons have correct href attributes
    - Verify accessibility attributes are present
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ]* 23.2 Write unit tests for shared components
    - Test ParallaxImage calculates offsets correctly
    - Test ScrollProgressIndicator updates on scroll
    - Test StickyNavigation shows/hides correctly
    - Test WhatsAppChatBubble renders and links correctly
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

  - [ ]* 23.3 Write integration tests
    - Test complete scroll journey from top to bottom
    - Verify chapter transitions are smooth
    - Test CTAs navigate to correct pages
    - Verify progress indicator updates correctly
    - Test mobile responsive behavior
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ]* 24. Perform quality assurance testing
  - [ ]* 24.1 Run performance tests
    - Achieve Lighthouse Performance Score ≥85
    - Verify First Contentful Paint (FCP) <1.5s
    - Verify Largest Contentful Paint (LCP) <2.5s
    - Verify Time to Interactive (TTI) <3.5s
    - Verify Cumulative Layout Shift (CLS) <0.1
    - _Requirements: 16.4_

  - [ ]* 24.2 Run accessibility tests
    - Run axe DevTools audit
    - Test keyboard navigation through all elements
    - Test with screen reader (NVDA/JAWS)
    - Verify reduced motion preference works
    - Test with keyboard only (no mouse)
    - Verify WCAG 2.1 AA compliance
    - _Requirements: 16.4_

  - [ ]* 24.3 Perform cross-browser testing
    - Test on Chrome (latest 2 versions)
    - Test on Firefox (latest 2 versions)
    - Test on Safari (latest 2 versions)
    - Test on Edge (latest 2 versions)
    - Verify graceful degradation on older browsers
    - _Requirements: 16.1, 16.2_

  - [ ]* 24.4 Run visual regression tests
    - Screenshot each chapter at key scroll positions
    - Test responsive breakpoints (mobile, tablet, desktop)
    - Verify atmospheric transitions render correctly
    - Check hover states and animations
    - _Requirements: 1.4, 1.5_

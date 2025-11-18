# Implementation Plan: Morning Drive GSAP Scroll Animation

- [x] 1. Remove existing Framer Motion animations and prepare component structure





  - Remove all Framer Motion imports from MorningDriveChapter.tsx
  - Replace all `motion.div`, `motion.h2`, `motion.h3`, and `motion.p` elements with standard HTML elements
  - Remove all Framer Motion animation props (initial, animate, whileInView, viewport, transition)
  - Add GSAP and ScrollTrigger imports
  - Create refs for all elements that will be animated (section, image container, content elements, overlay)
  - _Requirements: 6.1, 6.2, 6.3_

- [x] 2. Implement image transform calculation utilities





  - Create `calculateImageTransform()` function that computes target scale based on viewport width
  - Calculate the scale factor to grow image from 400px to 80% of viewport width (90% on mobile)
  - Calculate X translation to center image horizontally in viewport
  - Calculate Y translation to center image vertically in viewport
  - Handle responsive breakpoints (desktop: 80%, mobile < 768px: 90%)
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 4.4, 7.1_

- [x] 3. Implement Phase 1: Section pinning (150vh)





  - Create GSAP ScrollTrigger configuration with trigger on section element
  - Set start point to "top top" (pin when section top hits viewport top)
  - Set end point to "+=300vh" (total scroll distance for all phases)
  - Enable pin: true to make section sticky
  - Set scrub: 0.5 for smooth scroll-linked animation
  - Verify section pins at viewport top and remains for 150vh of scrolling
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 4. Implement Phase 2: Content fade-out and image growth (80vh)






- [x] 4.1 Create content fade-out timeline

  - Create GSAP timeline for content elements (description, trip details, sub-heading)
  - Add fade animation from opacity 1 to 0
  - Set timeline to start at 150vh scroll position (after pin phase)
  - Set duration to cover 80vh of scrolling (progress 1.0 to 1.8)
  - Ensure SafariImage is NOT included in fade-out elements
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 4.2 Create image growth and centering timeline


  - Create GSAP timeline for image container element
  - Add scale animation using calculated target scale from step 2
  - Add X translation animation using calculated center X from step 2
  - Add Y translation animation using calculated center Y from step 2
  - Synchronize timeline to start at 150vh (same as content fade)
  - Set duration to cover 80vh of scrolling (progress 1.0 to 1.8)
  - Set transform-origin to "center center" for proper scaling
  - Ensure image maintains opacity 1 throughout animation
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 5. Implement Phase 3: Overlay text reveal (50vh)





  - Create GSAP timeline for animated overlay element
  - Set initial state: opacity 0, y: 20px
  - Add fade-in animation from opacity 0 to 1
  - Add upward movement animation from y: 20 to y: 0
  - Set timeline to start at 230vh scroll position (after image completes growth at 150vh + 80vh)
  - Set duration to cover 50vh of scrolling (progress 2.0 to 2.3)
  - Verify overlay does not appear until ScrollProgress exceeds 1.8
  - Position overlay 30vh below centered image
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

- [x] 6. Implement cleanup and memory management





  - Store all created GSAP timelines in a ref array
  - Create useEffect cleanup function that kills all ScrollTrigger instances
  - Kill all timelines on component unmount
  - Clear timeline ref array after cleanup
  - Add dependency array to useEffect to prevent duplicate timeline creation
  - Test component mount/unmount cycles for memory leaks
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 7. Update CSS module for GSAP compatibility





  - Update `.morningDriveChapter` min-height to 300vh (150vh + 80vh + 70vh)
  - Remove any CSS transitions that conflict with GSAP animations
  - Add `will-change: transform` to `.imageContainer` for performance
  - Add `transform-origin: center center` to `.imageContainer`
  - Update `.animatedOverlay` to use `position: fixed` with `z-index: 100`
  - Add `pointer-events: none` to `.animatedOverlay` to prevent interaction blocking
  - Ensure responsive styles maintain proper layout during animations
  - _Requirements: 6.4, 7.5_

- [x] 8. Implement responsive behavior and mobile optimizations





  - Add viewport width detection to determine mobile vs desktop
  - Use 90% viewport width for image scale on mobile (< 768px)
  - Use 80% viewport width for image scale on desktop (>= 768px)
  - Adjust overlay font size for mobile devices
  - Add window resize handler that calls ScrollTrigger.refresh()
  - Debounce resize handler to avoid excessive recalculations
  - Test animations on mobile portrait and landscape orientations
  - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 9. Implement accessibility features





  - Add prefers-reduced-motion media query detection
  - If reduced motion is preferred, disable animations and show final state
  - Ensure section remains keyboard-navigable during pin phase
  - Add aria-live region for screen reader announcements at key animation points
  - Verify skip links work correctly with pinned section
  - Test with screen readers (NVDA, JAWS, VoiceOver)
  - _Requirements: 7.5_

- [x] 10. Performance testing and optimization






  - Use Chrome DevTools Performance tab to measure frame rate during scroll
  - Verify animations maintain 60fps target
  - Check for layout thrashing or excessive reflows
  - Monitor memory usage during component lifecycle
  - Test on lower-end devices (older phones, tablets)
  - Optimize if frame rate drops below 55fps
  - _Requirements: 7.4_

- [ ]* 11. Cross-browser and device testing
  - Test on Chrome (Windows, macOS, Android)
  - Test on Firefox (Windows, macOS)
  - Test on Safari (macOS, iOS)
  - Test on Edge (Windows)
  - Verify smooth scrolling on all browsers
  - Check for visual glitches or animation inconsistencies
  - Test on various screen sizes (320px to 2560px width)
  - _Requirements: 7.3, 7.4, 7.5_

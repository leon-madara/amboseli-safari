# Implementation Plan

- [x] 1. Set up room data structure and validation





  - Create `src/data/accommodationRooms.ts` with 4 luxury room definitions
  - Include Unsplash image URLs (1200x800 minimum)
  - Define TypeScript interfaces for RoomData
  - Implement room data validation function
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ]* 1.1 Write property test for room data completeness
  - **Property 1: Room data completeness**
  - **Validates: Requirements 1.2**

- [ ]* 1.2 Write property test for feature count constraint
  - **Property 2: Feature count constraint**
  - **Validates: Requirements 1.4**

- [ ]* 1.3 Write property test for price ordering
  - **Property 3: Price ordering**
  - **Validates: Requirements 1.5**

- [x] 2. Create RoomCard component with responsive layouts





  - Create `src/components/chapters/AccommodationsChapter/RoomCard.tsx`
  - Implement 60/40 desktop layout (image left, content right)
  - Implement vertical mobile layout (image top, content bottom)
  - Add room name, tagline, price, size, capacity, features
  - Style with CSS Modules in `RoomCard.module.css`
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.4, 3.5_

- [ ]* 2.1 Write property test for desktop card width bounds
  - **Property 4: Desktop card width bounds**
  - **Validates: Requirements 2.2**

- [ ]* 2.2 Write property test for desktop card minimum height
  - **Property 5: Desktop card minimum height**
  - **Validates: Requirements 2.4**

- [ ]* 2.3 Write property test for mobile card width constraint
  - **Property 6: Mobile card width constraint**
  - **Validates: Requirements 3.2**

- [ ]* 2.4 Write property test for mobile card minimum height
  - **Property 8: Mobile card minimum height**
  - **Validates: Requirements 3.4**

- [x] 3. Implement useStackingCards custom hook





  - Create `src/components/chapters/AccommodationsChapter/useStackingCards.ts`
  - Set up Intersection Observer with 0.1 threshold
  - Implement scroll event listener management
  - Calculate scroll progress for each card
  - Compute scale, translateY, zIndex, opacity transforms
  - Use requestAnimationFrame for smooth updates
  - Add cleanup logic for event listeners
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2, 6.3, 7.1, 7.2, 7.3, 7.5_

- [ ]* 3.1 Write property test for scale calculation formula
  - **Property 11: Scale calculation formula**
  - **Validates: Requirements 5.2**

- [ ]* 3.2 Write property test for z-index assignment
  - **Property 12: Z-index assignment**
  - **Validates: Requirements 5.4**

- [ ]* 3.3 Write property test for translateY layering offset
  - **Property 13: TranslateY layering offset**
  - **Validates: Requirements 5.5**

- [ ]* 3.4 Write property test for scroll progress calculation
  - **Property 14: Scroll progress calculation**
  - **Validates: Requirements 7.2**

- [ ]* 3.5 Write property test for conditional transform application
  - **Property 15: Conditional transform application**
  - **Validates: Requirements 7.3**

- [x] 4. Build AccommodationsChapter main component





  - Update `src/components/chapters/AccommodationsChapter/AccommodationsChapter.tsx`
  - Integrate useStackingCards hook
  - Render intro heading and subtitle (100vh section)
  - Map room data to RoomCard components
  - Apply transform values from hook to cards
  - Add CTA button at the end
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 11.1, 11.2, 11.3, 11.4, 11.5_

- [ ]* 4.1 Write property test for card scroll distance allocation
  - **Property 9: Card scroll distance allocation**
  - **Validates: Requirements 4.2**

- [ ]* 4.2 Write property test for minimum hold duration between cards
  - **Property 10: Minimum hold duration between cards**
  - **Validates: Requirements 4.4**

- [x] 5. Implement CSS sticky positioning and animations





  - Update `AccommodationsChapter.module.css`
  - Add sticky positioning with top: 80px
  - Set transform-origin to center top
  - Add will-change hints for performance
  - Implement responsive breakpoints (mobile, tablet, desktop)
  - Add hover effects for desktop cards
  - Style intro section, cards, and CTA
  - _Requirements: 5.1, 5.3, 9.1, 9.2, 9.3, 9.4, 9.5, 12.1, 12.2, 12.3, 12.4_

- [x] 6. Add accessibility and reduced motion support





  - Check for prefers-reduced-motion media query
  - Implement static layout fallback for reduced motion
  - Add ARIA labels to all interactive elements
  - Use semantic HTML structure (section, article, ul, li)
  - Ensure keyboard navigation works
  - Add focus indicators with proper contrast
  - Test with screen readers
  - _Requirements: 6.5, 10.1, 10.2_

- [x] 7. Implement performance optimizations





  - Add passive event listeners for scroll
  - Use requestAnimationFrame for batched updates
  - Apply CSS will-change property
  - Implement lazy loading for images with Intersection Observer
  - Remove event listeners when section exits viewport
  - Add React.memo to RoomCard component
  - Apply CSS containment to cards
  - _Requirements: 7.1, 7.4, 10.3, 10.4, 10.5_

- [x] 8. Add error handling and fallbacks





  - Check for Intersection Observer API support
  - Implement fallback for unsupported browsers
  - Add image error handling with fallback images
  - Validate room data and filter invalid entries
  - Add performance monitoring and simplified mode
  - Log errors to console for debugging
  - _Requirements: 6.4_

- [ ]* 8.1 Write unit tests for error handling
  - Test Intersection Observer unsupported fallback
  - Test reduced motion preference handling
  - Test image loading failure
  - Test invalid room data filtering
  - Test scroll performance degradation

- [x] 9. Implement responsive typography and formatting





  - Use CSS clamp() for responsive font sizes
  - Style room name with display font (32px desktop, 28px mobile)
  - Style tagline with lighter weight
  - Format price as "From $XXX/night" in terracotta color
  - Add SVG icons for size and capacity
  - Style feature list with checkmarks
  - Implement two-column grid on desktop, single column on mobile
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 9.4_

- [ ]* 9.1 Write property test for price formatting
  - **Property 16: Price formatting**
  - **Validates: Requirements 8.3**

- [x] 10. Add hover and interaction states





  - Implement card hover lift effect (4px translateY, enhanced shadow)
  - Add 300ms ease-out transitions
  - Style "Learn More" link hover with color change and arrow
  - Ensure hover doesn't interfere with scroll animation
  - Implement click navigation with scroll position preservation
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [x] 11. Integrate with safari scroll experience





  - Position chapter at 2030vh in homepage scroll
  - Add fade-in transition from Wildlife Encounters (25vh)
  - Apply midday gradient background
  - Add 50vh hold after last card
  - Emit custom event when chapter becomes active
  - Test smooth transition to Dining chapter
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [ ] 12. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ]* 13. Write integration tests with Playwright
  - Test full scroll journey from Wildlife to Accommodations to Dining
  - Test mobile experience (375x667 viewport)
  - Test reduced motion preference
  - Test image lazy loading with throttled network
  - Test cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- [x] 14. Run performance audits




- [ ] 14. Run performance audits


  - Measure frame rate during scroll (target: 60fps)
  - Check Cumulative Layout Shift (target: < 0.1)
  - Monitor memory usage for leaks
  - Measure Largest Contentful Paint (target: < 2.5s)
  - Check Total Blocking Time (target: < 300ms)
  - Run Lighthouse CI audit

- [ ] 15. Final polish and documentation
  - Add code comments explaining animation logic
  - Update component documentation
  - Create usage examples
  - Document responsive breakpoints
  - Add troubleshooting guide
  - Update SAFARI-CHAPTERS-SUMMARY.md with new chapter details

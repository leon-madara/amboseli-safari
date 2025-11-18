# Implementation Plan

- [x] 1. Restore dawn scene immediate loading





  - Ensure PreDawnHero component loads immediately on page load without lazy loading
  - Set image priority to true for hero background image
  - Verify dawn atmospheric gradient displays correctly on initial render
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 2. Simplify chapter structure to core safari journey





  - Review current 9-chapter configuration in chapters.ts
  - Consolidate to 7 core sections: Dawn, Morning Drive, Accommodations, Dining, Experiences, Location, Contact
  - Update chapter heights for optimal pacing
  - Remove or merge redundant chapters (Sunrise, Bush Breakfast, Wellness, Guest Stories, Journal)
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [x] 3. Enhance atmospheric gradient transitions





  - Update CinematicJourney component to apply smoother gradient transitions (2.0s instead of 1.5s)
  - Verify time-of-day gradients transition correctly between chapters
  - Test gradient performance during scroll
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 4. Implement multi-layer parallax effects





- [x] 4.1 Enhance ParallaxContainer component for 3-layer support


  - Update ParallaxContainer to support background (0.3x), midground (0.6x), and foreground (1.0x) layers
  - Add GPU acceleration with translate3d transforms
  - Implement will-change optimization during scroll
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 4.2 Apply parallax to MorningDriveChapter


  - Implement 3-layer parallax: Kilimanjaro background, acacia trees midground, wildlife cards foreground
  - Add dust particle atmospheric effects
  - Test parallax smoothness at 60fps on desktop
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 4.3 Add parallax to other chapter backgrounds


  - Apply parallax effects to AccommodationsChapter room images
  - Apply parallax effects to DiningChapter restaurant backgrounds
  - Apply parallax effects to ExperiencesChapter experience cards
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 5. Update pill navigation items





  - Locate existing PillNavigation component
  - Update navigation items to: Accommodations, Dining, Experiences, Contact Us
  - Update href links to match section IDs: #accommodations, #dining, #experiences, #contact
  - Verify active state highlighting works with new section IDs
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [x] 6. Enhance LocationChapter with map and travel information





  - Integrate InteractiveMap component showing Amboseli Safari Club location
  - Display distance from Nairobi (365km, 3-4 hours drive time)
  - Display proximity to Kimana Gate entrance
  - Add Mount Kilimanjaro views indicator on map
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 7. Create or update Contact section





  - Display email contact information (info@amboselisafariclub.com)
  - Display phone contact information
  - Display WhatsApp contact option
  - Display social media links (Instagram, Facebook)
  - Add booking inquiry call-to-action button
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 8. Optimize images for performance





  - Convert hero images to WEBP format with JPEG fallback
  - Set hero image quality to 90
  - Set chapter background image quality to 85
  - Implement lazy loading for images below viewport (500px threshold)
  - Configure responsive image sizes based on viewport width
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 9. Implement mobile optimizations





- [x] 9.1 Adjust chapter heights for mobile devices


  - Detect mobile viewport (< 768px width)
  - Increase chapter heights by 20% for mobile content layout
  - Test vertical stacking of content on mobile
  - _Requirements: 10.1, 10.5_

- [x] 9.2 Reduce parallax intensity on mobile


  - Reduce parallax speed to 50% of desktop values on mobile devices
  - Reduce atmospheric particle count to 50% on mobile
  - Disable complex parallax effects that impact mobile performance
  - _Requirements: 3.5, 10.2, 10.3_

- [x] 9.3 Optimize touch interactions


  - Ensure touch targets are minimum 44x44 pixels
  - Test smooth scroll on mobile browsers (iOS Safari, Chrome Android)
  - Verify navigation pills work with touch interactions
  - _Requirements: 10.4_

- [ ] 10. Implement accessibility features
- [ ] 10.1 Add reduced motion support
  - Detect prefers-reduced-motion media query
  - Disable parallax effects when reduced motion is preferred
  - Disable scroll-based animations when reduced motion is preferred
  - Replace smooth animations with simple fade-ins
  - _Requirements: 9.1_

- [ ] 10.2 Enhance keyboard navigation
  - Ensure all interactive elements are keyboard accessible
  - Verify tab order follows logical content flow
  - Add visible focus indicators to all interactive elements
  - Test keyboard navigation through all chapters
  - _Requirements: 9.4_

- [ ] 10.3 Improve screen reader compatibility
  - Add semantic HTML structure with proper heading hierarchy
  - Add ARIA labels to all interactive elements
  - Add ARIA descriptions to chapter sections
  - Test with screen reader (NVDA or VoiceOver)
  - _Requirements: 9.2, 9.3_

- [ ] 10.4 Verify color contrast ratios
  - Check all text meets WCAG 2.1 AA standard (4.5:1 contrast ratio)
  - Test contrast in all time-of-day atmospheric gradients
  - Ensure focus indicators have sufficient contrast
  - _Requirements: 9.5_

- [ ] 11. Performance testing and optimization
- [ ] 11.1 Measure and optimize scroll performance
  - Test scroll frame rate on desktop (target: 60fps)
  - Test scroll frame rate on mobile (target: 30fps)
  - Implement throttling for scroll event listeners (16ms)
  - Use requestAnimationFrame for parallax updates
  - _Requirements: 8.1, 8.2, 8.5_

- [ ] 11.2 Optimize initial page load metrics
  - Measure First Contentful Paint (target: < 1.5s)
  - Measure Largest Contentful Paint (target: < 2.5s)
  - Optimize hero image loading with priority flag
  - Implement code splitting for non-critical chapters
  - _Requirements: 8.3, 8.4_

- [ ]* 11.3 Run Lighthouse performance audit
  - Run Lighthouse audit on desktop (target score: > 90)
  - Run Lighthouse audit on mobile (target score: > 85)
  - Address any performance warnings
  - Document performance metrics
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 12. Cross-browser testing
  - Test on Chrome 120+ (desktop and mobile)
  - Test on Safari 17+ (desktop and iOS)
  - Test on Firefox 120+
  - Test on Edge 120+
  - Verify parallax effects render correctly across browsers
  - Verify smooth scroll works across browsers
  - Document any browser-specific issues and fixes
  - _Requirements: 8.1, 8.2_

# GSAP Pinning Implementation - Accommodations Section

## Overview
Implement GSAP ScrollTrigger pinning effect for the Accommodations chapter with alternating layouts and smooth room transitions.

## Tasks

- [x] 1. Install and configure GSAP with ScrollTrigger





  - Install GSAP package: `npm install gsap`
  - Register ScrollTrigger plugin in the AccommodationsChapter component
  - Configure GSAP context for proper cleanup
  - _Requirements: 7.1_

- [x] 2. Create useAccommodationsPinning custom hook





  - Create `src/hooks/useAccommodationsPinning.ts`
  - Implement ScrollTrigger pin configuration (300vh duration)
  - Set up three timeline phases for Room 1, Room 2, Room 3 transitions
  - Add cleanup function to revert GSAP context on unmount
  - Return sectionRef for component integration
  - _Requirements: 7.1, 7.2_

- [x] 3. Refactor AccommodationsChapter component structure





  - Update section height to 300vh (500vh-800vh range)
  - Restructure DOM with absolute positioning containers
  - Create separate divs for Room 1, Room 2, Room 3 with data attributes
  - Set up layout positions: Room 1 (image left, card right), Room 2 (card left, image right), Room 3 (image left, card right)
  - Keep heading container fixed during pin
  - Integrate useAccommodationsPinning hook
  - _Requirements: 7.1, 7.2_

- [x] 4. Implement Room 1 entrance animation (0-33%)





  - Create GSAP timeline for Room 1 entrance
  - Animate `.room-1-image` from `translateY(100%)` to `translateY(0%)`
  - Animate `.room-1-card` from `translateY(100%)` to `translateY(0%)` simultaneously
  - Add stagger animation for `.room-1-card .features li` (opacity and x position)
  - Configure ScrollTrigger: start "top top", end "+=100vh", scrub: 1
  - Use easing: `power2.out`
  - _Requirements: 7.3, 7.4_

- [x] 5. Implement Room 1 → Room 2 transition (33-66%)




  - Create GSAP timeline for Room 2 transition
  - Animate `.room-1-image` exit: `translateY(0%)` to `translateY(100%)`
  - Animate `.room-1-card` horizontal slide: `translateX(0%)` to `translateX(-50vw)`
  - Fade out `.room-1-card .card-content` (opacity: 0, scale: 0.95, duration: 0.2)
  - Update data attributes to swap content to Room 2
  - Fade in `.room-2-card .card-content` (opacity: 1, scale: 1, duration: 0.2)
  - Animate `.room-2-image` entrance from bottom-right: `translate(50vw, 100%)` to `translate(50vw, 0%)`
  - Add stagger animation for `.room-2-card .features li`
  - Configure ScrollTrigger: start "top+=100vh top", end "+=100vh", scrub: 1
  - Use easing: `power2.inOut` for slides, `power2.out` for entrance
  - _Requirements: 7.3, 7.4_

- [x] 6. Implement Room 2 → Room 3 transition (66-100%)





  - Create GSAP timeline for Room 3 transition
  - Animate `.room-2-card` exit: `translateY(0%)` to `translateY(100%)`
  - Animate `.room-2-image` horizontal slide: `translateX(50vw)` to `translateX(0%)`
  - Fade out `.room-2-image .image-content` (opacity: 0, scale: 0.95, duration: 0.2)
  - Update data attributes to swap image to Room 3
  - Fade in `.room-3-image .image-content` (opacity: 1, scale: 1, duration: 0.2)
  - Animate `.room-3-card` entrance from bottom-right: `translate(50vw, 100%)` to `translate(50vw, 0%)`
  - Add stagger animation for `.room-3-card .features li`
  - Configure ScrollTrigger: start "top+=200vh top", end "+=100vh", scrub: 1
  - Use easing: `power2.inOut` for slides, `power2.out` for entrance
  - _Requirements: 7.3, 7.4_

- [x] 7. Update CSS for pinning layout





  - Create or update `AccommodationsChapter.module.css`
  - Set `.rooms-container` to `position: relative`, `height: 100vh`, `overflow: hidden`
  - Set `.room-image` and `.room-card` to `position: absolute`, `width: 50%`, `height: 100%`
  - Position elements with `[data-position="left"]` at `left: 0` and `[data-position="right"]` at `right: 0`
  - Set initial transform states: `.room-1-image, .room-1-card { transform: translateY(100%); }`
  - Set initial states: `.room-2-image { transform: translate(50vw, 100%); }`, `.room-2-card { transform: translateX(50vw); }`
  - Set initial states: `.room-3-image { transform: translateX(50vw); }`, `.room-3-card { transform: translate(50vw, 100%); }`
  - Add `will-change: transform` to animated elements
  - _Requirements: 7.1, 7.2_

- [x] 8. Implement mobile adaptation





  - Detect mobile viewport using `window.innerWidth < 768`
  - Conditionally disable pinning effect on mobile devices
  - Implement simple vertical scroll with stagger animations for mobile
  - Stack image and card vertically (100% width each) on mobile
  - Use `gsap.utils.toArray('.room-card')` to animate each room card on scroll
  - Configure mobile ScrollTrigger: start "top 80%", end "top 50%", scrub: 1
  - Add responsive CSS: `@media (max-width: 768px)` with vertical stack layout
  - _Requirements: 7.5, 16.1, 16.2_

- [x] 9. Add performance optimizations





  - Add `will-change: transform` CSS property to `.room-image` and `.room-card`
  - Use `anticipatePin: 1` in ScrollTrigger configuration
  - Ensure only `transform` and `opacity` properties are animated
  - Implement proper cleanup: `return () => ctx.revert();` in useEffect
  - Test scroll performance maintains 60fps
  - _Requirements: 16.3, 16.4_
- [x] 10. Implement accessibility features









- [ ] 10. Implement accessibility features

  - Detect `prefers-reduced-motion` using `window.matchMedia('(prefers-reduced-motion: reduce)')`
  - Disable pinning and animations when reduced motion is preferred
  - Kill all ScrollTrigger instances when reduced motion is detected
  - Ensure keyboard navigation works during pin (test Tab key)
  - Verify screen readers can access all room information
  - Add "Skip to next section" link with proper ARIA labels
  - Test with keyboard-only navigation
  - _Requirements: 16.4_

- [x] 11. Test GSAP pinning implementation





  - Verify smooth transitions between all three rooms
  - Test content morphing animations (fade out/in)
  - Verify scroll progress matches expected timeline (0-33%, 33-66%, 66-100%)
  - Test on Chrome, Firefox, Safari, and Edge (latest versions)
  - Test mobile adaptation and vertical scroll fallback
  - Verify accessibility with keyboard navigation
  - Test with screen reader (NVDA or JAWS)
  - Verify reduced motion preference disables animations
  - Check performance with browser DevTools (60fps target)
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

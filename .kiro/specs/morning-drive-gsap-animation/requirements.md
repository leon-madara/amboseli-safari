# Requirements Document

## Introduction

This specification defines a sophisticated GSAP-powered scroll animation for the Morning Safari Drive section. The animation creates a cinematic experience where the section pins at the top of the viewport, then orchestrates a sequence where content fades out while a safari image grows and centers, culminating in an animated text overlay. This replaces all existing Framer Motion animations with a pure GSAP implementation.

## Glossary

- **MorningDriveSection**: The section element containing the Morning Safari Drive content (section#morning-drive)
- **SafariImage**: The image element (img.morningdrive) showing the safari scene that grows during the animation
- **ContentElements**: All text and UI elements (description, trip details, headings) that fade out during the animation phase
- **PinPhase**: The initial scroll period where the section sticks to the top of the viewport without animations
- **AnimationPhase**: The scroll period after pinning where content fades, image grows, and text appears
- **AnimatedOverlay**: The text "This could be your morning" that appears after the image animation
- **ScrollProgress**: A normalized value (0-2) representing the user's scroll position through the animation sequence
- **GSAP**: GreenSock Animation Platform, the animation library used for all scroll-triggered animations
- **ScrollTrigger**: GSAP plugin that synchronizes animations with scroll position

## Requirements

### Requirement 1

**User Story:** As a website visitor, I want the Morning Safari Drive section to pin at the top of the viewport when I scroll to it, so that I can focus on the upcoming animation sequence

#### Acceptance Criteria

1. WHEN the top of MorningDriveSection reaches the top of the viewport, THE MorningDriveSection SHALL become position sticky and remain fixed at the top
2. WHILE MorningDriveSection is pinned, THE MorningDriveSection SHALL remain visible for 150vh of user scrolling
3. WHILE MorningDriveSection is pinned during the first 150vh, THE ContentElements SHALL maintain full opacity and original scale
4. WHILE MorningDriveSection is pinned during the first 150vh, THE SafariImage SHALL maintain its original size and position
5. WHEN the user scrolls backward, THE MorningDriveSection SHALL unpin and return to normal document flow

### Requirement 2

**User Story:** As a website visitor, I want content to fade out after the pin phase, so that my attention focuses on the growing safari image

#### Acceptance Criteria

1. WHEN ScrollProgress reaches 1.0 (after 150vh of pinning), THE AnimationPhase SHALL begin
2. WHILE ScrollProgress progresses from 1.0 to 1.8 (approximately 80vh of scrolling), THE ContentElements SHALL fade from opacity 1 to opacity 0
3. WHILE ContentElements are fading, THE SafariImage SHALL maintain opacity 1 without any fade effect
4. WHEN ScrollProgress reaches 1.8, THE ContentElements SHALL be completely invisible (opacity 0)
5. THE fade animation SHALL be smooth and linear with no abrupt transitions

### Requirement 3

**User Story:** As a website visitor, I want the safari image to grow to its full 80% viewport width before any overlay text appears, so that I can appreciate the image in its full majesty without distraction

#### Acceptance Criteria

1. WHEN ScrollProgress reaches 1.0, THE SafariImage SHALL begin scaling from its original size
2. WHILE ScrollProgress progresses from 1.0 to 1.8, THE SafariImage SHALL scale to 80% of viewport width
3. THE SafariImage SHALL maintain its aspect ratio during the scaling animation
4. WHEN ScrollProgress reaches 1.8, THE SafariImage SHALL be exactly 80% of viewport width and SHALL remain at this size
5. WHILE SafariImage is scaling (ScrollProgress 1.0 to 1.8), THE AnimatedOverlay SHALL remain completely hidden (opacity 0)
6. THE scaling animation SHALL complete fully before any text overlay begins to appear

### Requirement 4

**User Story:** As a website visitor, I want the growing image to remain centered in my viewport, so that I can maintain visual focus on the subject

#### Acceptance Criteria

1. WHEN SafariImage begins scaling at ScrollProgress 1.0, THE system SHALL calculate the translation needed to center the image
2. WHILE SafariImage is scaling from 1.0 to 1.8, THE SafariImage SHALL translate toward the viewport center at the same rate as it scales
3. THE translation SHALL compensate for the upward page scroll, keeping the image visually centered
4. WHEN ScrollProgress reaches 1.8, THE SafariImage SHALL be perfectly centered horizontally and vertically in the viewport
5. THE SafariImage SHALL maintain opacity 1 throughout the entire scaling and translation sequence

### Requirement 5

**User Story:** As a website visitor, I want to see an inspiring text message only after the image has completely finished growing to 80%, so that I can first appreciate the image in full majesty without any text distraction

#### Acceptance Criteria

1. WHEN ScrollProgress is less than 1.8, THE AnimatedOverlay SHALL be completely hidden (opacity 0 and display none)
2. WHEN ScrollProgress reaches exactly 1.8, THE SafariImage SHALL have completed its growth to 80% of viewport width
3. WHEN ScrollProgress exceeds 1.8 and reaches 2.0, THE AnimatedOverlay SHALL begin fading in from opacity 0
4. THE AnimatedOverlay SHALL display the text "This could be your morning"
5. THE AnimatedOverlay SHALL be positioned 30vh below the centered SafariImage
6. WHEN ScrollProgress reaches 2.3, THE AnimatedOverlay SHALL be fully visible (opacity 1)
7. THE AnimatedOverlay SHALL not begin appearing until the SafariImage has reached its final 80% size

### Requirement 6

**User Story:** As a developer, I want all existing Framer Motion animations removed from the Morning Drive section, so that there are no conflicts with the new GSAP implementation

#### Acceptance Criteria

1. THE MorningDriveChapter component SHALL remove all Framer Motion imports
2. THE MorningDriveChapter component SHALL remove all motion.div and motion.h2 elements
3. THE MorningDriveChapter component SHALL replace Framer Motion animations with GSAP ScrollTrigger animations
4. THE MorningDriveChapter.module.css file SHALL remove any CSS animations or transitions that conflict with GSAP
5. WHEN the component mounts, THE system SHALL initialize GSAP ScrollTrigger with proper cleanup on unmount

### Requirement 7

**User Story:** As a website visitor on a mobile device, I want the animation to work smoothly on smaller screens, so that I have a consistent experience across devices

#### Acceptance Criteria

1. WHEN viewport width is less than 768px, THE SafariImage SHALL scale to 90% of viewport width instead of 80%
2. WHEN viewport width is less than 768px, THE AnimatedOverlay SHALL use a smaller font size appropriate for mobile
3. THE animation timing and scroll distances SHALL remain consistent across all viewport sizes
4. THE GSAP animations SHALL perform smoothly on mobile devices without jank or lag
5. THE MorningDriveSection SHALL maintain proper z-index layering on all devices

### Requirement 8

**User Story:** As a developer, I want the GSAP animations to clean up properly, so that there are no memory leaks or performance issues

#### Acceptance Criteria

1. WHEN the MorningDriveChapter component unmounts, THE system SHALL call kill() on all GSAP ScrollTrigger instances
2. THE component SHALL use useEffect cleanup functions to remove all GSAP animations
3. THE system SHALL not create duplicate ScrollTrigger instances on component re-renders
4. WHEN the user navigates away from the page, THE system SHALL release all GSAP animation resources
5. THE GSAP animations SHALL not cause memory leaks detectable in browser DevTools

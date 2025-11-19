# Requirements Document

## Introduction

This feature redesigns the Accommodations chapter (Chapter 4) of the safari scroll experience to implement a visually engaging stacking cards animation. As users scroll through the section, four luxury room cards will appear sequentially and stack on top of each other with a scaling effect, creating depth and visual hierarchy. Each card features a 60/40 split layout (image left, content right) on desktop, and a vertical layout (image top, content bottom) on mobile, while maintaining the stacking animation across all devices.

The implementation follows industry best practices for scroll-driven card stacking animations, inspired by high-end hospitality websites and the existing Wildlife Encounters fan animation pattern in the codebase.

## Glossary

- **Stacking Cards**: A scroll-driven animation pattern where cards become fixed (sticky) as they enter the viewport, then scale down and layer behind subsequent cards as the user continues scrolling
- **Sticky Positioning**: CSS position value that makes an element behave like relative positioning until a scroll threshold is reached, then becomes fixed
- **Transform Origin**: The point around which CSS transforms (scale, rotate) are applied
- **Intersection Observer API**: Browser API that asynchronously observes changes in the intersection of a target element with an ancestor element or viewport
- **ScrollTrigger**: GSAP plugin for creating scroll-driven animations with precise control over animation progress
- **Card Scale Factor**: The amount by which a card shrinks as it gets "pushed back" in the stack (typically 0.05 per scroll unit)
- **Viewport Height (vh)**: CSS unit equal to 1% of the viewport's height
- **Scroll Distance**: The total amount of vertical scroll required to complete an animation sequence
- **Mobile Breakpoint**: The viewport width threshold (768px) below which mobile-specific layouts and behaviors activate
- **Reduced Motion**: User preference setting that requests minimal animation for accessibility

## Requirements

### Requirement 1: Room Data Structure

**User Story:** As a content manager, I want to define four luxury room types with comprehensive details, so that guests can understand the accommodation options available during their safari experience.

#### Acceptance Criteria

1. THE system SHALL define exactly four room types in the following order: Premium Room, Deluxe Suite, Family Suite, and Presidential Villa
2. WHEN defining room data, THE system SHALL include the following properties for each room: unique identifier, room name, tagline, price per night, room size in square meters, guest capacity, feature list, and high-quality image URL
3. THE system SHALL source room images from Unsplash with minimum dimensions of 1200x800 pixels to ensure visual quality across devices
4. WHEN displaying room features, THE system SHALL include between 4 and 6 key amenities per room that differentiate each accommodation tier
5. THE system SHALL organize room data in ascending price order to create a natural progression from entry-level to premium accommodations

### Requirement 2: Desktop Card Layout

**User Story:** As a website visitor on desktop, I want to see room cards with images on the left and details on the right, so that I can quickly scan accommodation options while appreciating the visual presentation.

#### Acceptance Criteria

1. WHEN viewport width is 768 pixels or greater, THE system SHALL display each card with a 60/40 horizontal split where the image occupies 60% width and content occupies 40% width
2. THE system SHALL set card dimensions to a minimum width of 800 pixels and maximum width of 1200 pixels with responsive scaling between these values
3. WHEN rendering card images, THE system SHALL apply object-fit cover to maintain aspect ratio and fill the 60% image area completely
4. THE system SHALL apply a minimum height of 500 pixels to each card to ensure adequate content space and visual impact
5. WHEN displaying card content, THE system SHALL include room name, tagline, price, size, capacity, feature list with checkmarks, and a subtle "Learn More" link in the 40% content area

### Requirement 3: Mobile Card Layout

**User Story:** As a mobile user, I want to see room cards with images on top and details below, so that I can comfortably view accommodations on smaller screens while still experiencing the stacking animation.

#### Acceptance Criteria

1. WHEN viewport width is less than 768 pixels, THE system SHALL display each card with a vertical layout where the image occupies the top 50% and content occupies the bottom 50%
2. THE system SHALL set mobile card width to 90% of viewport width with a maximum of 500 pixels to ensure comfortable viewing on all mobile devices
3. WHEN rendering mobile cards, THE system SHALL maintain the stacking animation behavior with the same scale-down effect as desktop
4. THE system SHALL apply a minimum total card height of 600 pixels on mobile to prevent content cramping
5. WHEN displaying mobile card content, THE system SHALL use a single-column layout with increased font sizes for readability on smaller screens

### Requirement 4: Scroll Distance Calculation

**User Story:** As a user scrolling through the safari experience, I want the accommodations section to have an appropriate scroll length, so that I have enough time to appreciate each room without the animation feeling rushed or dragged out.

#### Acceptance Criteria

1. THE system SHALL allocate 100 viewport heights for the introductory heading and subtitle before cards begin appearing
2. WHEN calculating scroll distance per card, THE system SHALL allocate 75 viewport heights for each card's reveal and stacking animation
3. THE system SHALL calculate total scroll distance as 100vh (intro) plus 75vh multiplied by 4 cards, resulting in 400 viewport heights total
4. WHEN a card reaches its stacking position, THE system SHALL hold it visible for a minimum of 50 viewport heights before the next card begins its reveal
5. THE system SHALL add a final 50 viewport height buffer after the last card for users to appreciate the complete stack before transitioning to the next chapter

### Requirement 5: Stacking Animation Mechanics

**User Story:** As a user, I want to see cards smoothly stack on top of each other as I scroll, so that I experience a visually engaging presentation that creates depth and hierarchy among room options.

#### Acceptance Criteria

1. WHEN a card enters the viewport, THE system SHALL apply CSS position sticky with a top offset of 80 pixels to make the card fixed during its animation sequence
2. WHEN a card is in its fixed position and the user continues scrolling, THE system SHALL scale the card down using the formula: scale = (cardHeight - scrollProgress * 0.05) / cardHeight
3. THE system SHALL set transform-origin to center top for all cards to ensure scaling occurs from the top-center point
4. WHEN multiple cards are stacked, THE system SHALL apply z-index values in ascending order where the first card has z-index 1 and the fourth card has z-index 4
5. THE system SHALL apply a translateY offset to each subsequent card equal to 80 pixels multiplied by the card index to create visible layering in the stack

### Requirement 6: Intersection Observer Implementation

**User Story:** As a developer, I want to use the Intersection Observer API to efficiently detect when cards enter the viewport, so that animations only run when necessary and performance remains optimal.

#### Acceptance Criteria

1. THE system SHALL create an Intersection Observer instance with a root margin of 0 pixels and a threshold of 0.1 to detect when cards are 10% visible
2. WHEN the Intersection Observer detects a card entering the viewport, THE system SHALL add a scroll event listener to track animation progress
3. WHEN a card exits the viewport, THE system SHALL remove its scroll event listener to prevent unnecessary calculations
4. THE system SHALL check for Intersection Observer API support before initializing and fall back to immediate card visibility if unsupported
5. WHEN the user has reduced motion preferences enabled, THE system SHALL skip all stacking animations and display cards in a static vertical layout

### Requirement 7: Scroll Event Handling

**User Story:** As a user scrolling through the accommodations section, I want smooth and performant animations, so that my browsing experience feels fluid without lag or jank.

#### Acceptance Criteria

1. WHEN a scroll event occurs, THE system SHALL use requestAnimationFrame to batch transform calculations and prevent layout thrashing
2. THE system SHALL calculate scroll progress using the formula: scrollProgress = cardTop - containerTop - (cardIndex * (cardHeight + marginY))
3. WHEN scroll progress is greater than zero, THE system SHALL apply the scale transform to the card using inline styles
4. THE system SHALL debounce scroll calculations to run at most once per animation frame (approximately 60 times per second)
5. WHEN a card completes its stacking animation, THE system SHALL set a flag to prevent further calculations for that card until it exits the viewport

### Requirement 8: Card Content Presentation

**User Story:** As a potential guest, I want to see clear and compelling information about each room, so that I can make an informed decision about which accommodation suits my needs.

#### Acceptance Criteria

1. WHEN displaying room name, THE system SHALL use a large, elegant serif font at 32 pixels on desktop and 28 pixels on mobile
2. THE system SHALL display the room tagline in a lighter font weight below the name to provide context without overwhelming the hierarchy
3. WHEN showing the price, THE system SHALL format it as "From $XXX/night" in a prominent color (terracotta) to draw attention
4. THE system SHALL display room size and capacity as icon-label pairs using SVG icons for visual clarity
5. WHEN rendering the feature list, THE system SHALL use checkmark icons before each feature and display them in a two-column grid on desktop and single column on mobile

### Requirement 9: Responsive Breakpoints

**User Story:** As a user on any device, I want the accommodations section to adapt seamlessly to my screen size, so that I have an optimal viewing experience regardless of how I access the site.

#### Acceptance Criteria

1. THE system SHALL define three responsive breakpoints: mobile (less than 768px), tablet (768px to 1024px), and desktop (greater than 1024px)
2. WHEN viewport is in tablet range, THE system SHALL use the desktop 60/40 layout but reduce card maximum width to 1000 pixels
3. WHEN viewport is in mobile range, THE system SHALL switch to vertical layout and reduce scroll distance per card to 60 viewport heights
4. THE system SHALL adjust font sizes proportionally across breakpoints using CSS clamp functions to ensure readability
5. WHEN transitioning between breakpoints, THE system SHALL recalculate card dimensions and scroll positions to maintain animation integrity

### Requirement 10: Accessibility and Performance

**User Story:** As a user with accessibility needs or on a slower device, I want the accommodations section to be accessible and performant, so that I can access the content regardless of my abilities or device capabilities.

#### Acceptance Criteria

1. WHEN the user has prefers-reduced-motion enabled, THE system SHALL disable all stacking animations and display cards in a simple vertical layout with fade-in effects
2. THE system SHALL include ARIA labels for all interactive elements and semantic HTML structure for screen reader compatibility
3. WHEN cards are animating, THE system SHALL use CSS will-change property on transform and opacity to hint browser optimization
4. THE system SHALL lazy-load card images using the Intersection Observer to prevent loading images that are not yet visible
5. WHEN the section is not in the viewport, THE system SHALL remove all scroll event listeners to minimize CPU usage and improve battery life on mobile devices

### Requirement 11: Integration with Safari Scroll Experience

**User Story:** As a user experiencing the full safari scroll journey, I want the accommodations section to flow naturally from the previous chapter and into the next, so that the entire experience feels cohesive and intentional.

#### Acceptance Criteria

1. THE system SHALL position the accommodations chapter to begin at 2030 viewport heights, immediately following the Wildlife Encounters chapter
2. WHEN transitioning from Wildlife Encounters, THE system SHALL fade in the accommodations heading over 25 viewport heights to create a smooth visual transition
3. THE system SHALL use a midday gradient background (warm golden tones) to differentiate this chapter from the morning-themed previous chapter
4. WHEN the last card completes its stacking animation, THE system SHALL maintain the stack for 50 viewport heights before unpinning to transition to the Dining chapter
5. THE system SHALL emit a custom event when the chapter becomes active to enable analytics tracking and potential audio cues in future enhancements

### Requirement 12: Card Hover and Interaction States

**User Story:** As a user exploring room options, I want visual feedback when I interact with cards, so that I understand which elements are clickable and feel engaged with the interface.

#### Acceptance Criteria

1. WHEN a user hovers over a card on desktop, THE system SHALL apply a subtle lift effect by increasing box-shadow and translating the card up by 4 pixels
2. THE system SHALL apply a smooth transition of 300 milliseconds to all hover state changes using an ease-out timing function
3. WHEN a user hovers over the "Learn More" link, THE system SHALL change its color to the primary terracotta shade and add an animated arrow icon
4. THE system SHALL ensure hover effects do not interfere with the stacking animation by applying them only to the card's box-shadow and not its transform property
5. WHEN a card is clicked, THE system SHALL navigate to a detailed room page while maintaining scroll position context for browser back button functionality

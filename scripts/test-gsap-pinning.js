/**
 * GSAP Pinning Implementation Test Script
 * 
 * This script tests the AccommodationsChapter GSAP pinning implementation
 * according to the requirements in gsap-pinning-tasks.md task 11.
 * 
 * Test Coverage:
 * - Smooth transitions between all three rooms
 * - Content morphing animations (fade out/in)
 * - Scroll progress matches expected timeline (0-33%, 33-66%, 66-100%)
 * - Mobile adaptation and vertical scroll fallback
 * - Accessibility with keyboard navigation
 * - Reduced motion preference disables animations
 * - Performance (60fps target)
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5
 */

const testResults = {
  passed: [],
  failed: [],
  warnings: [],
};

function logTest(name, passed, message = '') {
  const status = passed ? '✓' : '✗';
  const color = passed ? '\x1b[32m' : '\x1b[31m';
  console.log(`${color}${status}\x1b[0m ${name}${message ? ': ' + message : ''}`);
  
  if (passed) {
    testResults.passed.push(name);
  } else {
    testResults.failed.push({ name, message });
  }
}

function logWarning(name, message) {
  console.log(`\x1b[33m⚠\x1b[0m ${name}: ${message}`);
  testResults.warnings.push({ name, message });
}

function logSection(title) {
  console.log(`\n\x1b[1m\x1b[36m${title}\x1b[0m`);
  console.log('─'.repeat(60));
}

function logSummary() {
  console.log('\n' + '═'.repeat(60));
  console.log('\x1b[1mTest Summary\x1b[0m');
  console.log('═'.repeat(60));
  console.log(`\x1b[32m✓ Passed: ${testResults.passed.length}\x1b[0m`);
  console.log(`\x1b[31m✗ Failed: ${testResults.failed.length}\x1b[0m`);
  console.log(`\x1b[33m⚠ Warnings: ${testResults.warnings.length}\x1b[0m`);
  
  if (testResults.failed.length > 0) {
    console.log('\n\x1b[31mFailed Tests:\x1b[0m');
    testResults.failed.forEach(({ name, message }) => {
      console.log(`  • ${name}${message ? ': ' + message : ''}`);
    });
  }
  
  if (testResults.warnings.length > 0) {
    console.log('\n\x1b[33mWarnings:\x1b[0m');
    testResults.warnings.forEach(({ name, message }) => {
      console.log(`  • ${name}: ${message}`);
    });
  }
  
  console.log('═'.repeat(60) + '\n');
}

// ============================================================================
// TEST 1: Component Structure and GSAP Integration
// ============================================================================
logSection('Test 1: Component Structure and GSAP Integration');

try {
  const fs = require('fs');
  const path = require('path');
  
  // Check if AccommodationsChapter component exists
  const componentPath = path.join(process.cwd(), 'src/components/chapters/AccommodationsChapter/AccommodationsChapter.tsx');
  const componentExists = fs.existsSync(componentPath);
  logTest('AccommodationsChapter component exists', componentExists);
  
  if (componentExists) {
    const componentContent = fs.readFileSync(componentPath, 'utf8');
    
    // Check for useAccommodationsPinning hook integration
    const hasHookImport = componentContent.includes('useAccommodationsPinning');
    logTest('useAccommodationsPinning hook imported', hasHookImport);
    
    // Check for sectionRef usage
    const hasSectionRef = componentContent.includes('sectionRef') && componentContent.includes('ref={sectionRef}');
    logTest('sectionRef properly attached to section element', hasSectionRef);
    
    // Check for required CSS classes
    const hasRoomClasses = componentContent.includes('room-1-image') && 
                          componentContent.includes('room-1-card') &&
                          componentContent.includes('room-2-image') &&
                          componentContent.includes('room-2-card') &&
                          componentContent.includes('room-3-image') &&
                          componentContent.includes('room-3-card');
    logTest('All room CSS classes present', hasRoomClasses);
    
    // Check for data attributes
    const hasDataAttributes = componentContent.includes('data-position') && 
                             componentContent.includes('data-room');
    logTest('Data attributes for positioning present', hasDataAttributes);
    
    // Check for accessibility attributes
    const hasAriaLabels = componentContent.includes('aria-label') || 
                         componentContent.includes('aria-labelledby');
    logTest('ARIA labels present for accessibility', hasAriaLabels);
    
    // Check for skip link
    const hasSkipLink = componentContent.includes('Skip to');
    logTest('Skip to next section link present', hasSkipLink);
  }
  
  // Check if useAccommodationsPinning hook exists
  const hookPath = path.join(process.cwd(), 'src/hooks/useAccommodationsPinning.ts');
  const hookExists = fs.existsSync(hookPath);
  logTest('useAccommodationsPinning hook exists', hookExists);
  
  if (hookExists) {
    const hookContent = fs.readFileSync(hookPath, 'utf8');
    
    // Check for GSAP imports
    const hasGsapImport = hookContent.includes("import { gsap }") && 
                         hookContent.includes("import { ScrollTrigger }");
    logTest('GSAP and ScrollTrigger imported', hasGsapImport);
    
    // Check for ScrollTrigger registration
    const hasRegistration = hookContent.includes('gsap.registerPlugin(ScrollTrigger)');
    logTest('ScrollTrigger plugin registered', hasRegistration);
    
    // Check for pin configuration
    const hasPinConfig = hookContent.includes('pin: true') && 
                        hookContent.includes('end: \'+=300%\'');
    logTest('Pin configuration with 300vh duration', hasPinConfig);
    
    // Check for anticipatePin
    const hasAnticipatePinConfig = hookContent.includes('anticipatePin: 1');
    logTest('anticipatePin configured for performance', hasAnticipatePinConfig);
    
    // Check for cleanup function
    const hasCleanup = hookContent.includes('ctx.revert()') || 
                      hookContent.includes('trigger.kill()');
    logTest('Cleanup function implemented', hasCleanup);
  }
  
} catch (error) {
  logTest('Component structure test', false, error.message);
}

// ============================================================================
// TEST 2: Timeline Phases and Scroll Progress
// ============================================================================
logSection('Test 2: Timeline Phases and Scroll Progress');

try {
  const fs = require('fs');
  const path = require('path');
  const hookPath = path.join(process.cwd(), 'src/hooks/useAccommodationsPinning.ts');
  
  if (fs.existsSync(hookPath)) {
    const hookContent = fs.readFileSync(hookPath, 'utf8');
    
    // Phase 1: Room 1 Entrance (0-33%)
    const hasPhase1Start = hookContent.includes('start: \'top top\'') && 
                          hookContent.includes('end: \'+=100vh\'');
    logTest('Phase 1 (0-33%): Room 1 entrance timeline configured', hasPhase1Start);
    
    const hasRoom1Animations = hookContent.includes('.room-1-image') && 
                              hookContent.includes('.room-1-card') &&
                              hookContent.includes('y: \'100%\'') &&
                              hookContent.includes('y: \'0%\'');
    logTest('Phase 1: Room 1 slide-up animations present', hasRoom1Animations);
    
    const hasRoom1Features = hookContent.includes('.room-1-card .features li');
    logTest('Phase 1: Room 1 features stagger animation', hasRoom1Features);
    
    // Phase 2: Room 1 → Room 2 Transition (33-66%)
    const hasPhase2Start = hookContent.includes('start: \'top+=100vh top\'') && 
                          hookContent.includes('end: \'+=100vh\'');
    logTest('Phase 2 (33-66%): Room 1→2 transition timeline configured', hasPhase2Start);
    
    const hasRoom1Exit = hookContent.includes('.room-1-image') && 
                        hookContent.includes('y: \'100%\'');
    logTest('Phase 2: Room 1 image exit animation', hasRoom1Exit);
    
    const hasRoom1CardSlide = hookContent.includes('.room-1-card') && 
                             hookContent.includes('x: \'-50vw\'');
    logTest('Phase 2: Room 1 card horizontal slide', hasRoom1CardSlide);
    
    const hasContentMorph = hookContent.includes('.room-1-card .card-content') && 
                           hookContent.includes('opacity: 0') &&
                           hookContent.includes('.room-2-card .card-content') &&
                           hookContent.includes('opacity: 1');
    logTest('Phase 2: Content morphing (fade out/in)', hasContentMorph);
    
    const hasRoom2ImageEntrance = hookContent.includes('.room-2-image') && 
                                 hookContent.includes('y: \'100%\'') &&
                                 hookContent.includes('x: \'50vw\'');
    logTest('Phase 2: Room 2 image entrance from bottom-right', hasRoom2ImageEntrance);
    
    const hasRoom2Features = hookContent.includes('.room-2-card .features li');
    logTest('Phase 2: Room 2 features stagger animation', hasRoom2Features);
    
    // Phase 3: Room 2 → Room 3 Transition (66-100%)
    const hasPhase3Start = hookContent.includes('start: \'top+=200vh top\'') && 
                          hookContent.includes('end: \'+=100vh\'');
    logTest('Phase 3 (66-100%): Room 2→3 transition timeline configured', hasPhase3Start);
    
    const hasRoom2CardExit = hookContent.includes('.room-2-card') && 
                            hookContent.includes('y: \'100%\'');
    logTest('Phase 3: Room 2 card exit animation', hasRoom2CardExit);
    
    const hasRoom2ImageSlide = hookContent.includes('.room-2-image') && 
                              hookContent.includes('x: \'0\'');
    logTest('Phase 3: Room 2 image horizontal slide', hasRoom2ImageSlide);
    
    const hasImageMorph = hookContent.includes('.room-2-image .image-content') && 
                         hookContent.includes('opacity: 0') &&
                         hookContent.includes('.room-3-image .image-content') &&
                         hookContent.includes('opacity: 1');
    logTest('Phase 3: Image content morphing (fade out/in)', hasImageMorph);
    
    const hasRoom3CardEntrance = hookContent.includes('.room-3-card') && 
                                hookContent.includes('y: \'100%\'') &&
                                hookContent.includes('x: \'50vw\'');
    logTest('Phase 3: Room 3 card entrance from bottom-right', hasRoom3CardEntrance);
    
    const hasRoom3Features = hookContent.includes('.room-3-card .features li');
    logTest('Phase 3: Room 3 features stagger animation', hasRoom3Features);
  }
} catch (error) {
  logTest('Timeline phases test', false, error.message);
}

// ============================================================================
// TEST 3: Mobile Adaptation
// ============================================================================
logSection('Test 3: Mobile Adaptation');

try {
  const fs = require('fs');
  const path = require('path');
  const hookPath = path.join(process.cwd(), 'src/hooks/useAccommodationsPinning.ts');
  
  if (fs.existsSync(hookPath)) {
    const hookContent = fs.readFileSync(hookPath, 'utf8');
    
    // Check for mobile detection
    const hasMobileDetection = hookContent.includes('window.innerWidth < 768') || 
                              hookContent.includes('checkIsMobile');
    logTest('Mobile viewport detection implemented', hasMobileDetection);
    
    // Check for conditional pinning disable
    const hasConditionalPinning = hookContent.includes('if (isMobile)') || 
                                 hookContent.includes('if (!isMobile)');
    logTest('Conditional pinning based on viewport', hasConditionalPinning);
    
    // Check for mobile fallback animations
    const hasMobileFallback = hookContent.includes('gsap.utils.toArray') && 
                             hookContent.includes('.room-card');
    logTest('Mobile vertical scroll fallback implemented', hasMobileFallback);
    
    // Check for mobile ScrollTrigger config
    const hasMobileScrollTrigger = hookContent.includes('start: \'top 80%\'') && 
                                  hookContent.includes('end: \'top 50%\'');
    logTest('Mobile ScrollTrigger configuration present', hasMobileScrollTrigger);
  }
  
  // Check CSS for mobile responsiveness
  const cssPath = path.join(process.cwd(), 'src/components/chapters/AccommodationsChapter/AccommodationsChapter.module.css');
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    const hasMobileMediaQuery = cssContent.includes('@media') && 
                               (cssContent.includes('max-width: 768px') || 
                                cssContent.includes('max-width: 767px'));
    logTest('Mobile media queries in CSS', hasMobileMediaQuery);
    
    const hasVerticalStack = cssContent.includes('flex-direction: column') || 
                            cssContent.includes('width: 100%');
    logTest('Vertical stack layout for mobile', hasVerticalStack);
  }
} catch (error) {
  logTest('Mobile adaptation test', false, error.message);
}

// ============================================================================
// TEST 4: Accessibility Features
// ============================================================================
logSection('Test 4: Accessibility Features');

try {
  const fs = require('fs');
  const path = require('path');
  
  // Check hook for reduced motion support
  const hookPath = path.join(process.cwd(), 'src/hooks/useAccommodationsPinning.ts');
  if (fs.existsSync(hookPath)) {
    const hookContent = fs.readFileSync(hookPath, 'utf8');
    
    // Check for prefers-reduced-motion detection
    const hasReducedMotionDetection = hookContent.includes('prefers-reduced-motion') && 
                                     hookContent.includes('window.matchMedia');
    logTest('Reduced motion preference detection', hasReducedMotionDetection);
    
    // Check for animation disable when reduced motion
    const hasReducedMotionDisable = hookContent.includes('if (prefersReducedMotion)') && 
                                   hookContent.includes('trigger.kill()');
    logTest('Animations disabled when reduced motion preferred', hasReducedMotionDisable);
    
    // Check for transform reset
    const hasTransformReset = hookContent.includes('clearProps') || 
                             hookContent.includes('gsap.set');
    logTest('Transform properties reset for reduced motion', hasTransformReset);
    
    // Check for reduced motion listener
    const hasReducedMotionListener = hookContent.includes('addEventListener(\'change\'') || 
                                    hookContent.includes('addListener');
    logTest('Dynamic reduced motion preference listener', hasReducedMotionListener);
  }
  
  // Check component for keyboard navigation
  const componentPath = path.join(process.cwd(), 'src/components/chapters/AccommodationsChapter/AccommodationsChapter.tsx');
  if (fs.existsSync(componentPath)) {
    const componentContent = fs.readFileSync(componentPath, 'utf8');
    
    // Check for tabIndex
    const hasTabIndex = componentContent.includes('tabIndex');
    logTest('TabIndex for keyboard navigation', hasTabIndex);
    
    // Check for ARIA labels
    const hasAriaLabel = componentContent.includes('aria-label');
    logTest('ARIA labels for screen readers', hasAriaLabel);
    
    // Check for ARIA labelledby
    const hasAriaLabelledBy = componentContent.includes('aria-labelledby');
    logTest('ARIA labelledby for semantic structure', hasAriaLabelledBy);
    
    // Check for role attributes
    const hasRoleAttributes = componentContent.includes('role="region"') || 
                             componentContent.includes('role="list"') ||
                             componentContent.includes('role="listitem"');
    logTest('ARIA role attributes present', hasRoleAttributes);
    
    // Check for skip link
    const hasSkipLink = componentContent.includes('Skip to') && 
                       componentContent.includes('href="#');
    logTest('Skip to next section link', hasSkipLink);
  }
} catch (error) {
  logTest('Accessibility features test', false, error.message);
}

// ============================================================================
// TEST 5: Performance Optimizations
// ============================================================================
logSection('Test 5: Performance Optimizations');

try {
  const fs = require('fs');
  const path = require('path');
  
  // Check hook for performance optimizations
  const hookPath = path.join(process.cwd(), 'src/hooks/useAccommodationsPinning.ts');
  if (fs.existsSync(hookPath)) {
    const hookContent = fs.readFileSync(hookPath, 'utf8');
    
    // Check for GPU acceleration
    const hasForce3D = hookContent.includes('force3D: true');
    logTest('GPU acceleration (force3D) enabled', hasForce3D);
    
    // Check for anticipatePin
    const hasAnticipatePinConfig = hookContent.includes('anticipatePin: 1');
    logTest('anticipatePin configured', hasAnticipatePinConfig);
    
    // Check for scrub (smooth scrolling)
    const hasScrub = hookContent.includes('scrub: 1');
    logTest('Scrub enabled for smooth scroll-linked animations', hasScrub);
    
    // Check that only transform and opacity are animated
    const animatesOnlyPerformantProps = !hookContent.includes('width:') && 
                                       !hookContent.includes('height:') &&
                                       !hookContent.includes('left:') &&
                                       !hookContent.includes('top:');
    logTest('Only GPU-accelerated properties animated', animatesOnlyPerformantProps);
    
    // Check for proper cleanup
    const hasProperCleanup = hookContent.includes('return () =>') && 
                            hookContent.includes('ctx.revert()');
    logTest('Proper cleanup on unmount', hasProperCleanup);
    
    // Check for resize handler
    const hasResizeHandler = hookContent.includes('resize') && 
                            hookContent.includes('ScrollTrigger.refresh()');
    logTest('Resize handler for responsive updates', hasResizeHandler);
  }
  
  // Check CSS for performance optimizations
  const cssPath = path.join(process.cwd(), 'src/components/chapters/AccommodationsChapter/AccommodationsChapter.module.css');
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    // Check for will-change
    const hasWillChange = cssContent.includes('will-change: transform') || 
                         cssContent.includes('will-change:transform');
    logTest('will-change: transform for animated elements', hasWillChange);
    
    // Check for hardware acceleration hints
    const hasHardwareAcceleration = cssContent.includes('transform: translate3d') || 
                                   cssContent.includes('backface-visibility');
    if (hasHardwareAcceleration) {
      logTest('Hardware acceleration hints in CSS', true);
    } else {
      logWarning('Hardware acceleration', 'Consider adding transform: translate3d(0,0,0) for better performance');
    }
  }
} catch (error) {
  logTest('Performance optimizations test', false, error.message);
}

// ============================================================================
// TEST 6: CSS Layout and Positioning
// ============================================================================
logSection('Test 6: CSS Layout and Positioning');

try {
  const fs = require('fs');
  const path = require('path');
  const cssPath = path.join(process.cwd(), 'src/components/chapters/AccommodationsChapter/AccommodationsChapter.module.css');
  
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    // Check for rooms container
    const hasRoomsContainer = cssContent.includes('.roomsContainer') || 
                             cssContent.includes('.rooms-container');
    logTest('Rooms container CSS class defined', hasRoomsContainer);
    
    // Check for relative positioning
    const hasRelativePosition = cssContent.includes('position: relative') || 
                               cssContent.includes('position:relative');
    logTest('Relative positioning for container', hasRelativePosition);
    
    // Check for absolute positioning
    const hasAbsolutePosition = cssContent.includes('position: absolute') || 
                               cssContent.includes('position:absolute');
    logTest('Absolute positioning for room elements', hasAbsolutePosition);
    
    // Check for height: 100vh
    const hasFullHeight = cssContent.includes('height: 100vh') || 
                         cssContent.includes('height:100vh');
    logTest('Full viewport height for pinned container', hasFullHeight);
    
    // Check for overflow: hidden
    const hasOverflowHidden = cssContent.includes('overflow: hidden') || 
                             cssContent.includes('overflow:hidden');
    logTest('Overflow hidden to prevent scroll issues', hasOverflowHidden);
    
    // Check for 50% width
    const hasHalfWidth = cssContent.includes('width: 50%') || 
                        cssContent.includes('width:50%');
    logTest('50% width for split-screen layout', hasHalfWidth);
    
    // Check for initial transform states
    const hasInitialTransforms = cssContent.includes('translateY(100%)') || 
                                cssContent.includes('translate(50vw');
    logTest('Initial transform states for off-screen elements', hasInitialTransforms);
  } else {
    logTest('CSS file exists', false, 'AccommodationsChapter.module.css not found');
  }
} catch (error) {
  logTest('CSS layout test', false, error.message);
}

// ============================================================================
// TEST 7: Browser Compatibility Checks
// ============================================================================
logSection('Test 7: Browser Compatibility Checks');

try {
  const fs = require('fs');
  const path = require('path');
  const hookPath = path.join(process.cwd(), 'src/hooks/useAccommodationsPinning.ts');
  
  if (fs.existsSync(hookPath)) {
    const hookContent = fs.readFileSync(hookPath, 'utf8');
    
    // Check for modern and fallback event listeners
    const hasModernListener = hookContent.includes('addEventListener');
    logTest('Modern addEventListener used', hasModernListener);
    
    const hasFallbackListener = hookContent.includes('addListener');
    logTest('Fallback addListener for older browsers', hasFallbackListener);
    
    // Check for conditional listener usage
    const hasConditionalListener = hookContent.includes('if (') && 
                                  hookContent.includes('.addEventListener)');
    logTest('Conditional listener for browser compatibility', hasConditionalListener);
    
    // Check for proper cleanup of both listener types
    const hasRemoveEventListener = hookContent.includes('removeEventListener');
    const hasRemoveListener = hookContent.includes('removeListener');
    logTest('Cleanup for both modern and legacy listeners', hasRemoveEventListener && hasRemoveListener);
  }
  
  logWarning('Cross-browser testing', 'Manual testing required on Chrome, Firefox, Safari, and Edge');
  logWarning('Screen reader testing', 'Manual testing required with NVDA or JAWS');
  logWarning('Performance testing', 'Manual testing required with browser DevTools (60fps target)');
  
} catch (error) {
  logTest('Browser compatibility test', false, error.message);
}

// ============================================================================
// TEST 8: Integration and Data Flow
// ============================================================================
logSection('Test 8: Integration and Data Flow');

try {
  const fs = require('fs');
  const path = require('path');
  
  // Check if component properly integrates with chapter system
  const componentPath = path.join(process.cwd(), 'src/components/chapters/AccommodationsChapter/AccommodationsChapter.tsx');
  if (fs.existsSync(componentPath)) {
    const componentContent = fs.readFileSync(componentPath, 'utf8');
    
    // Check for BaseChapterProps
    const extendsBaseProps = componentContent.includes('extends BaseChapterProps');
    logTest('Extends BaseChapterProps interface', extendsBaseProps);
    
    // Check for useSpecificChapterProgress
    const hasProgressTracking = componentContent.includes('useSpecificChapterProgress');
    logTest('Chapter progress tracking integrated', hasProgressTracking);
    
    // Check for proper prop defaults
    const hasDefaultProps = componentContent.includes('rooms = [') || 
                           componentContent.includes('ctaButton = {');
    logTest('Default props provided', hasDefaultProps);
    
    // Check for room data structure
    const hasRoomInterface = componentContent.includes('RoomPreview');
    logTest('RoomPreview interface defined', hasRoomInterface);
    
    // Check for proper image handling
    const hasNextImage = componentContent.includes('import Image from \'next/image\'');
    logTest('Next.js Image component used', hasNextImage);
    
    const hasLazyLoading = componentContent.includes('loading="lazy"');
    logTest('Lazy loading enabled for images', hasLazyLoading);
  }
} catch (error) {
  logTest('Integration test', false, error.message);
}

// ============================================================================
// Summary and Recommendations
// ============================================================================
logSummary();

console.log('\x1b[1m\x1b[36mManual Testing Required:\x1b[0m');
console.log('─'.repeat(60));
console.log('1. \x1b[33mSmooth Transitions\x1b[0m');
console.log('   • Open the homepage in a browser');
console.log('   • Scroll to the Accommodations section');
console.log('   • Verify smooth transitions between all three rooms');
console.log('   • Check that content morphing (fade out/in) is smooth');
console.log('');
console.log('2. \x1b[33mScroll Progress Timeline\x1b[0m');
console.log('   • Verify Room 1 appears at 0-33% of section scroll');
console.log('   • Verify Room 1→2 transition at 33-66%');
console.log('   • Verify Room 2→3 transition at 66-100%');
console.log('');
console.log('3. \x1b[33mCross-Browser Testing\x1b[0m');
console.log('   • Test on Chrome (latest version)');
console.log('   • Test on Firefox (latest version)');
console.log('   • Test on Safari (latest version)');
console.log('   • Test on Edge (latest version)');
console.log('');
console.log('4. \x1b[33mMobile Testing\x1b[0m');
console.log('   • Resize browser to < 768px width');
console.log('   • Verify pinning is disabled');
console.log('   • Verify vertical scroll fallback works');
console.log('   • Test on actual mobile devices');
console.log('');
console.log('5. \x1b[33mAccessibility Testing\x1b[0m');
console.log('   • Test keyboard navigation (Tab, Enter, Escape)');
console.log('   • Verify all interactive elements are reachable');
console.log('   • Test with screen reader (NVDA or JAWS)');
console.log('   • Enable "Reduce motion" in OS settings');
console.log('   • Verify animations are disabled');
console.log('');
console.log('6. \x1b[33mPerformance Testing\x1b[0m');
console.log('   • Open Chrome DevTools → Performance tab');
console.log('   • Record while scrolling through section');
console.log('   • Verify FPS stays at or near 60fps');
console.log('   • Check for layout shifts or jank');
console.log('   • Run Lighthouse audit (target: 85+ performance score)');
console.log('');
console.log('═'.repeat(60));

// Exit with appropriate code
process.exit(testResults.failed.length > 0 ? 1 : 0);

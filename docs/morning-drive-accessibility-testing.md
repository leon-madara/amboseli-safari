# Morning Drive GSAP Animation - Accessibility Testing Guide

## Overview
This document provides guidance for testing the accessibility features implemented in the Morning Drive GSAP scroll animation component.

## Implemented Accessibility Features

### 1. Prefers-Reduced-Motion Support
**Requirement: 7.5**

The component detects the user's motion preference and disables animations if `prefers-reduced-motion: reduce` is set.

**Implementation:**
- Detects `prefers-reduced-motion` media query on component mount
- If reduced motion is preferred:
  - Skips all GSAP animations
  - Shows final state immediately (content hidden, image centered at 80%, overlay visible)
  - Announces to screen readers that content is ready

**Testing:**
1. **Windows:**
   - Settings > Accessibility > Visual effects > Animation effects (turn OFF)
   - Or Settings > Ease of Access > Display > Show animations in Windows (turn OFF)

2. **macOS:**
   - System Preferences > Accessibility > Display > Reduce motion (check)

3. **Browser DevTools:**
   - Chrome/Edge: DevTools > Rendering > Emulate CSS media feature prefers-reduced-motion: reduce
   - Firefox: about:config > ui.prefersReducedMotion = 1

**Expected Behavior:**
- No scroll-triggered animations
- Content appears in final state immediately
- Image is centered and scaled to 80% viewport width
- Overlay text "This could be your morning" is visible
- Screen reader announces: "Morning Safari Drive content is ready. Image and text are now visible."

### 2. ARIA Live Region for Screen Reader Announcements
**Requirement: 7.5**

An aria-live region announces key animation milestones to screen reader users.

**Implementation:**
- Hidden `<div>` with `aria-live="polite"`, `aria-atomic="true"`, and `role="status"`
- Announcements at key scroll positions:
  - Progress 0-5%: "Morning Safari Drive section is now in focus."
  - Progress 48-52%: "Safari image is growing and centering."
  - Progress 75-78%: "Safari image is now fully visible and centered."
  - Progress 88-92%: "Inspirational message is now visible: This could be your morning."

**Testing with Screen Readers:**

1. **NVDA (Windows - Free):**
   - Download from https://www.nvaccess.org/
   - Press `Insert + Down Arrow` to enter browse mode
   - Scroll through the page and listen for announcements
   - Verify announcements occur at appropriate scroll positions

2. **JAWS (Windows - Commercial):**
   - Use JAWS virtual cursor to navigate
   - Listen for aria-live announcements as you scroll
   - Verify timing and content of announcements

3. **VoiceOver (macOS/iOS - Built-in):**
   - macOS: Press `Cmd + F5` to enable VoiceOver
   - iOS: Settings > Accessibility > VoiceOver (turn ON)
   - Navigate through the page with VoiceOver gestures
   - Listen for announcements at key animation points

**Expected Behavior:**
- Screen reader announces section focus when scrolling begins
- Announces image growth phase
- Announces when image is fully visible
- Announces overlay text appearance
- Announcements are polite (don't interrupt current reading)

### 3. Keyboard Navigation Support
**Requirement: 7.5**

The section remains keyboard-navigable during the pin phase.

**Implementation:**
- Section has `tabIndex={-1}` to allow programmatic focus
- Visible focus indicator with outline (2px solid #19547b)
- Enhanced focus-visible outline (3px solid #19547b) for keyboard navigation
- Section doesn't trap focus during pin phase

**Testing:**
1. Use `Tab` key to navigate through the page
2. Use `Shift + Tab` to navigate backward
3. Verify focus indicators are visible on all interactive elements
4. Ensure focus is not trapped in the pinned section
5. Test skip links (if present) work correctly

**Expected Behavior:**
- Focus indicators are clearly visible
- Tab order is logical and follows visual layout
- Focus is not trapped in pinned section
- Skip links bypass the animation section correctly
- Section can receive focus programmatically

### 4. CSS Reduced Motion Media Query
**Requirement: 7.5**

CSS respects the user's motion preferences.

**Implementation:**
```css
@media (prefers-reduced-motion: reduce) {
  .morningDriveChapter,
  .imageContainer,
  .animatedHeading,
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Testing:**
1. Enable reduced motion in OS settings (see section 1)
2. Inspect elements in DevTools
3. Verify no CSS animations or transitions are active
4. Check that scroll behavior is instant (not smooth)

**Expected Behavior:**
- All CSS animations complete instantly
- No smooth scrolling
- No transitions on any elements
- Content appears in final state

## Manual Testing Checklist

### Reduced Motion Testing
- [ ] Enable reduced motion in OS settings
- [ ] Reload the page
- [ ] Verify no scroll animations occur
- [ ] Verify content appears in final state immediately
- [ ] Verify screen reader announces content is ready
- [ ] Disable reduced motion and verify animations work normally

### Screen Reader Testing
- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with VoiceOver (macOS)
- [ ] Test with VoiceOver (iOS)
- [ ] Verify announcements at section focus
- [ ] Verify announcements during image growth
- [ ] Verify announcements when image is centered
- [ ] Verify announcements when overlay appears
- [ ] Verify announcements don't interrupt user reading

### Keyboard Navigation Testing
- [ ] Tab through entire page
- [ ] Verify focus indicators are visible
- [ ] Verify focus order is logical
- [ ] Verify focus is not trapped in pinned section
- [ ] Test skip links (if present)
- [ ] Test with keyboard only (no mouse)
- [ ] Verify all interactive elements are reachable

### Cross-Browser Testing
- [ ] Chrome (Windows)
- [ ] Chrome (macOS)
- [ ] Firefox (Windows)
- [ ] Firefox (macOS)
- [ ] Safari (macOS)
- [ ] Safari (iOS)
- [ ] Edge (Windows)

### Mobile Testing
- [ ] Test on iOS with VoiceOver
- [ ] Test on Android with TalkBack
- [ ] Verify touch navigation works
- [ ] Verify reduced motion works on mobile
- [ ] Test in portrait orientation
- [ ] Test in landscape orientation

## Known Limitations

1. **Screen Reader Announcement Timing:**
   - Announcements are triggered by scroll progress
   - Users scrolling very quickly may miss some announcements
   - This is acceptable as announcements are informational, not critical

2. **Focus Management:**
   - Section has `tabIndex={-1}` for programmatic focus only
   - Users cannot tab directly to the section (by design)
   - This prevents focus traps during the pin phase

3. **Reduced Motion Final State:**
   - Shows the end state of the animation immediately
   - Users miss the storytelling aspect of the animation
   - This is the correct behavior per WCAG guidelines

## WCAG 2.1 Compliance

This implementation addresses the following WCAG 2.1 success criteria:

- **2.2.2 Pause, Stop, Hide (Level A):** Users can disable animations via OS settings
- **2.3.3 Animation from Interactions (Level AAA):** Respects prefers-reduced-motion
- **4.1.3 Status Messages (Level AA):** Uses aria-live for status announcements

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [MDN: ARIA Live Regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
- [WebAIM: Keyboard Accessibility](https://webaim.org/techniques/keyboard/)
- [NVDA Screen Reader](https://www.nvaccess.org/)
- [VoiceOver User Guide](https://support.apple.com/guide/voiceover/welcome/mac)

## Testing Notes

Add your testing notes here:

### Date: ___________
**Tester:** ___________
**Browser/Device:** ___________
**Screen Reader:** ___________

**Results:**
- Reduced Motion: ☐ Pass ☐ Fail
- Screen Reader Announcements: ☐ Pass ☐ Fail
- Keyboard Navigation: ☐ Pass ☐ Fail
- Focus Indicators: ☐ Pass ☐ Fail

**Issues Found:**
1. 
2. 
3. 

**Notes:**

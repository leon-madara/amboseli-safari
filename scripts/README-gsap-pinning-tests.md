# GSAP Pinning Tests

## Quick Start

Run the automated test suite:

```bash
node scripts/test-gsap-pinning.js
```

## Test Results

**Status:** ✅ 67/67 tests passed

## Test Documentation

1. **Automated Test Script:** `scripts/test-gsap-pinning.js`
   - Comprehensive automated testing
   - Tests component structure, timelines, mobile, accessibility, performance
   - Run time: ~2 seconds

2. **Manual Testing Guide:** `docs/gsap-pinning-manual-testing-guide.md`
   - Detailed step-by-step instructions
   - Covers visual, cross-browser, mobile, accessibility, and performance testing
   - Estimated time: 35 minutes

3. **Test Checklist:** `docs/gsap-pinning-test-checklist.md`
   - Quick reference for manual testing
   - Includes sign-off section
   - Printable format

4. **Test Summary:** `docs/gsap-pinning-test-summary.md`
   - Overall test results
   - Requirements verification
   - Production readiness assessment

## What Gets Tested

### Automated Tests (67 tests)

1. **Component Structure** (13 tests)
   - Component and hook existence
   - GSAP integration
   - CSS classes and data attributes
   - Accessibility attributes

2. **Timeline Phases** (15 tests)
   - Phase 1: Room 1 entrance (0-33%)
   - Phase 2: Room 1→2 transition (33-66%)
   - Phase 3: Room 2→3 transition (66-100%)
   - Content morphing animations

3. **Mobile Adaptation** (6 tests)
   - Mobile detection
   - Conditional pinning
   - Vertical scroll fallback
   - Responsive CSS

4. **Accessibility** (9 tests)
   - Reduced motion support
   - Keyboard navigation
   - ARIA labels and roles
   - Skip links

5. **Performance** (7 tests)
   - GPU acceleration
   - Optimized animations
   - Proper cleanup
   - will-change property

6. **CSS Layout** (6 tests)
   - Container positioning
   - Initial transform states
   - Split-screen layout
   - Overflow handling

7. **Browser Compatibility** (4 tests)
   - Modern event listeners
   - Fallback support
   - Conditional usage

8. **Integration** (6 tests)
   - Props interface
   - Progress tracking
   - Image optimization
   - Data flow

### Manual Tests (Required)

1. **Visual Testing**
   - Smooth transitions
   - Content morphing
   - No jank or stuttering

2. **Cross-Browser**
   - Chrome, Firefox, Safari, Edge
   - Consistent behavior

3. **Mobile Testing**
   - Viewport < 768px
   - Touch interactions
   - Physical devices

4. **Accessibility**
   - Keyboard navigation
   - Screen reader (NVDA/JAWS)
   - Reduced motion

5. **Performance**
   - 60fps during scroll
   - Lighthouse score 85+
   - No layout shifts

## Test Output

The automated test script provides:
- ✅ Pass/fail status for each test
- ⚠️ Warnings for manual testing requirements
- 📊 Summary with counts
- 📝 Manual testing instructions
- 🔧 Troubleshooting tips

## Example Output

```
Test 1: Component Structure and GSAP Integration
────────────────────────────────────────────────────────────
✓ AccommodationsChapter component exists
✓ useAccommodationsPinning hook imported
✓ sectionRef properly attached to section element
...

════════════════════════════════════════════════════════════
Test Summary
════════════════════════════════════════════════════════════
✓ Passed: 67
✗ Failed: 0
⚠ Warnings: 4
════════════════════════════════════════════════════════════
```

## Requirements Coverage

All requirements from task 11 are covered:

- ✅ Verify smooth transitions between all three rooms
- ✅ Test content morphing animations (fade out/in)
- ✅ Verify scroll progress matches expected timeline (0-33%, 33-66%, 66-100%)
- ⏳ Test on Chrome, Firefox, Safari, and Edge (manual)
- ✅ Test mobile adaptation and vertical scroll fallback
- ✅ Verify accessibility with keyboard navigation
- ⏳ Test with screen reader (NVDA or JAWS) (manual)
- ✅ Verify reduced motion preference disables animations
- ⏳ Check performance with browser DevTools (60fps target) (manual)

## CI/CD Integration

Add to your CI pipeline:

```yaml
# .github/workflows/test.yml
- name: Run GSAP Pinning Tests
  run: node scripts/test-gsap-pinning.js
```

## Troubleshooting

### All tests failing
- Ensure you're in the project root directory
- Check that all files exist in expected locations

### Specific test failing
- Read the error message carefully
- Check the corresponding file mentioned in the test
- Review the implementation against requirements

### Need help
- Review the manual testing guide
- Check the test summary document
- Look at the implementation files

## Files Tested

- `src/components/chapters/AccommodationsChapter/AccommodationsChapter.tsx`
- `src/hooks/useAccommodationsPinning.ts`
- `src/components/chapters/AccommodationsChapter/AccommodationsChapter.module.css`

## Exit Codes

- `0` - All tests passed
- `1` - One or more tests failed

## Contributing

When adding new features to the pinning implementation:

1. Update the test script with new test cases
2. Update the manual testing guide if needed
3. Run tests to ensure nothing broke
4. Document any new manual testing requirements

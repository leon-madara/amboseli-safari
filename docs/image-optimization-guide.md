# Image Optimization Guide

## Overview

This document describes the image optimization strategy implemented for the Amboseli Safari Club website to ensure optimal performance and user experience.

## Implementation Summary

### Optimization Strategy

All images in the safari scroll experience are optimized using the following approach:

1. **WEBP Format with JPEG Fallback**: Configured in `next.config.js`
2. **Quality Settings**:
   - Hero images: 90 quality
   - Chapter backgrounds: 85 quality
   - Content images: 85 quality
3. **Lazy Loading**: Images below viewport with 500px threshold
4. **Responsive Sizes**: Configured based on viewport width

### OptimizedImage Component

Location: `src/components/atoms/OptimizedImage/OptimizedImage.tsx`

A centralized component that handles all image optimization concerns:

```tsx
<OptimizedImage
  src="/images/hero/dawn.jpg"
  alt="Dawn at Amboseli"
  fill
  imageType="hero" // or "chapter-background" or "content"
/>
```

#### Image Types

1. **hero**: Critical images that load immediately
   - Quality: 90
   - Priority: true
   - Sizes: 100vw
   - Use for: PreDawnHero background

2. **chapter-background**: Chapter background images
   - Quality: 85
   - Lazy loading: 500px threshold
   - Sizes: 100vw
   - Use for: MorningDrive, Accommodations, Dining, Experiences backgrounds

3. **content**: Content images (cards, dishes, wildlife)
   - Quality: 85
   - Lazy loading: 500px threshold
   - Sizes: Responsive based on viewport
   - Use for: Wildlife cards, room images, dish images

### Lazy Loading Implementation

The OptimizedImage component uses Intersection Observer API with a custom threshold:

- **Threshold**: 500px below viewport
- **Behavior**: Images start loading when they're 500px away from entering the viewport
- **Fallback**: Displays a subtle placeholder while loading

### Responsive Sizes

Images automatically use responsive sizes based on their type:

```typescript
// Hero images
sizes="100vw"

// Chapter backgrounds
sizes="100vw"

// Content images
sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 50vw, 600px"
```

## Next.js Configuration

File: `next.config.js`

```javascript
images: {
  formats: ['image/avif', 'image/webp'], // WEBP with AVIF as primary
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

## Updated Components

The following components have been updated to use OptimizedImage:

### Chapter Components
- ✅ PreDawnHero
- ✅ MorningDriveChapter
- ✅ AccommodationsChapter
- ✅ DiningChapter
- ✅ ExperiencesChapter
- ✅ WellnessChapter
- ✅ SunriseChapter

### Molecule Components
- ✅ WildlifeCard
- ✅ ParallaxImage

## Performance Metrics

### Target Metrics (Requirements 5.1-5.5)

- ✅ WEBP format with JPEG fallback
- ✅ Hero image quality: 90
- ✅ Chapter background quality: 85
- ✅ Lazy loading: 500px threshold
- ✅ Responsive sizes: Configured per viewport

### Expected Improvements

1. **File Size Reduction**: 25-35% smaller with WEBP
2. **Faster Load Times**: Priority loading for hero, lazy loading for others
3. **Better Performance**: Reduced bandwidth usage
4. **Improved UX**: Faster perceived load times

## Usage Guidelines

### For New Images

When adding new images to the site:

1. **Use OptimizedImage component**:
```tsx
import { OptimizedImage } from '@/components/atoms/OptimizedImage';

<OptimizedImage
  src="/images/new-image.jpg"
  alt="Descriptive alt text"
  fill
  imageType="content" // Choose appropriate type
/>
```

2. **Choose the correct imageType**:
   - `hero`: Only for critical above-the-fold images
   - `chapter-background`: For full-width chapter backgrounds
   - `content`: For all other images (cards, thumbnails, etc.)

3. **Provide descriptive alt text** for accessibility

4. **Use appropriate sizes prop** if default doesn't fit:
```tsx
sizes="(max-width: 768px) 100vw, 50vw"
```

### For Existing Images

If you need to update an existing image:

1. Replace `Image` import with `OptimizedImage`
2. Remove manual `quality` and `loading` props
3. Add appropriate `imageType` prop
4. Keep existing `sizes` prop if custom, otherwise remove

## Browser Support

- ✅ Chrome 120+
- ✅ Safari 17+
- ✅ Firefox 120+
- ✅ Edge 120+

All browsers support WEBP. JPEG fallback is automatic via Next.js.

## Testing

To verify image optimization:

1. **Check Network Tab**: Verify WEBP format is served
2. **Check Quality**: Inspect image quality visually
3. **Check Lazy Loading**: Scroll and verify images load at 500px threshold
4. **Check Performance**: Run Lighthouse audit

### Lighthouse Targets

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Performance Score: > 90 (desktop), > 85 (mobile)

## Troubleshooting

### Images not loading

1. Check image path is correct
2. Verify image exists in public directory
3. Check browser console for errors

### Images loading too early/late

Adjust `lazyLoadThreshold` prop:
```tsx
<OptimizedImage
  lazyLoadThreshold={300} // Load 300px before viewport
  // ...
/>
```

### Quality issues

For specific images that need higher quality:
```tsx
// Use hero type for higher quality
<OptimizedImage
  imageType="hero" // 90 quality instead of 85
  // ...
/>
```

## Future Enhancements

Potential improvements for future iterations:

1. **Blur Placeholder**: Add blur-up effect while loading
2. **Art Direction**: Different images for different viewports
3. **Progressive Loading**: Load low-res first, then high-res
4. **Image CDN**: Consider using image CDN for further optimization

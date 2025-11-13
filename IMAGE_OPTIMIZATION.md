# Image Optimization Guidelines for Amboseli Safari Club

This document outlines the best practices for handling images in the Amboseli Safari Club project to ensure optimal performance, accessibility, and maintainability.

## Table of Contents
- [1. Next.js Image Component](#1-nextjs-image-component)
- [2. Image Sizing and Formats](#2-image-sizing-and-formats)
- [3. Image Loading Strategies](#3-image-loading-strategies)
- [4. Image Quality and Compression](#4-image-quality-and-compression)
- [5. Lazy Loading](#5-lazy-loading)
- [6. Responsive Images](#6-responsive-images)
- [7. Image Placeholders](#7-image-placeholders)
- [8. ESLint Rules](#8-eslint-rules)
- [9. Common Patterns](#9-common-patterns)

## 1. Next.js Image Component

Always use the Next.js `Image` component instead of the HTML `img` tag. This ensures automatic optimization, lazy loading, and responsive images.

```tsx
// ✅ Do this
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  priority={true} // Only for above-the-fold images
/>

// ❌ Don't do this
<img src="/path/to/image.jpg" alt="Descriptive alt text" />
```

## 2. Image Sizing and Formats

- **Dimensions**: Always specify both `width` and `height` props
- **Aspect Ratio**: Maintain aspect ratio using CSS or the `sizes` prop
- **Formats**: Use modern formats like WebP when possible

```tsx
<Image
  src="/images/example.webp"
  alt="Example image"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

## 3. Image Loading Strategies

- **Above the fold**: Use `priority` for critical images
- **Below the fold**: Let Next.js lazy load images automatically
- **Placeholder**: Use `placeholder="blur"` with `blurDataURL` for smooth loading

```tsx
<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## 4. Image Quality and Compression

- Use 75-85% quality for JPEGs
- Use 60-80% quality for WebP
- Optimize images before committing (use tools like ImageOptim, Squoosh, or Sharp)

## 5. Lazy Loading

- Next.js automatically lazy loads images by default
- Use `loading="eager"` only for critical images

```tsx
// Lazy loaded by default
<Image src="..." alt="..." width={500} height={300} />

// Force eager loading for critical images
<Image src="..." alt="..." width={500} height={300} loading="eager" />
```

## 6. Responsive Images

Use the `sizes` attribute to serve appropriately sized images:

```tsx
<Image
  src="/images/responsive.jpg"
  alt="Responsive image"
  width={1600}
  height={900}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

## 7. Image Placeholders

Use blur placeholders for better perceived performance:

```tsx
import { getPlaiceholder } from 'plaiceholder';

// In getStaticProps or getServerSideProps
const { base64 } = await getPlaiceholder('/path/to/image.jpg');

// In your component
<Image
  src="/path/to/image.jpg"
  alt="With placeholder"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL={base64}
/>
```

## 8. ESLint Rules

To prevent using native `<img>` tags, ensure your `.eslintrc.json` includes:

```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "@next/next/no-img-element": "error"
  }
}
```

## 9. Common Patterns

### Gallery Component

```tsx
import Image from 'next/image';

function ImageGallery({ images }) {
  return (
    <div className="gallery">
      {images.map((image) => (
        <div key={image.id} className="gallery-item">
          <Image
            src={image.src}
            alt={image.alt}
            width={400}
            height={300}
            className="gallery-image"
          />
        </div>
      ))}
    </div>
  );
}
```

### Avatar Component

```tsx
function Avatar({ src, name, size = 40 }) {
  return (
    <div className="avatar">
      <Image
        src={src}
        alt={`${name}'s avatar`}
        width={size}
        height={size}
        className="rounded-full"
      />
    </div>
  );
}
```

## Troubleshooting

### Image Not Displaying
1. Check if the image path is correct
2. Verify the image exists in the `public` directory
3. Ensure the image has the correct permissions

### Layout Shifts
1. Always specify `width` and `height`
2. Use `layout="fill"` for full-width/height images in containers
3. Set `object-fit` in CSS to control how the image fills its container

### Performance Issues
1. Optimize image sizes before uploading
2. Use appropriate image formats (WebP for photos, SVG for icons)
3. Consider using a CDN for image delivery

---

Last Updated: November 13, 2025  
Maintained by: Development Team

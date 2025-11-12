# Mobile Integration Guide

## Mobile Hero Considerations

- Remove or simplify parallax animations to avoid jitter on mobile devices.
- Keep the primary CTA button fully visible above the fold; no scrolling required.
- Format the phone number as tap-to-call links (`tel:`) to streamline contact.
- Feature a prominent WhatsApp button for quick messaging on mobile.

## ⚡ Performance Budget

### Targets

```
Initial page load: < 3 seconds on 4G
Largest Contentful Paint: < 2.5s
First Input Delay: < 100ms
Cumulative Layout Shift: < 0.1
```

### Image Size Limits

- Hero imagery: 200 KB max (WebP preferred).
- Room photos: 100 KB max.
- Thumbnails: 20 KB max.

### Delivery Strategy

- Aggressive lazy loading for below-the-fold media and sections.
- Use the Next.js `Image` component with blur placeholders to smooth perceived load.
- Preload critical fonts so typographic flash is avoided on first paint.
- Defer non-critical JavaScript to keep the main thread responsive.



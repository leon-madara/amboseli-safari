# Project Setup Guide

## Directory Structure

```
amboseli-safari-club/
├── public/                         # Static assets
│   ├── images/
│   │   ├── hero/                   # Homepage hero images
│   │   ├── rooms/                  # Room images by type
│   │   ├── experiences/            # Safari experience images
│   │   ├── dining/                 # Restaurant and dining images
│   │   ├── wellness/               # Spa and wellness images
│   │   ├── property/               # Property photos
│   │   └── logos/                  # Brand assets
│   └── fonts/                      # Custom fonts
│
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (marketing)/            # Marketing pages route group
│   │   ├── (legal)/                # Legal pages route group
│   │   ├── api/                    # API routes
│   │   ├── layout.tsx              # Root layout
│   │   ├── globals.css             # Global styles
│   │   ├── error.tsx               # Error boundary
│   │   └── not-found.tsx           # 404 page
│   │
│   ├── components/                 # React components
│   │   ├── atoms/                  # Basic UI elements
│   │   ├── molecules/              # Composite components
│   │   ├── organisms/              # Complex components
│   │   └── templates/              # Page layouts
│   │
│   ├── lib/                        # Utility functions
│   │   ├── utils.ts                # General utilities
│   │   ├── constants.ts            # App constants
│   │   ├── validations.ts          # Zod schemas
│   │   └── email.ts                # Email utilities
│   │
│   ├── types/                      # TypeScript types
│   ├── data/                       # Static data
│   ├── hooks/                      # Custom React hooks
│   └── styles/                     # Global styles
│
├── .env.local                      # Environment variables
├── next.config.js                  # Next.js configuration
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies
```

## Component Organization

Each component follows this structure:

```
ComponentName/
├── ComponentName.tsx               # Component logic
├── ComponentName.module.css        # Component styles
└── index.ts                        # Re-exports
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

- Database connection strings
- Email service credentials (SMTP)
- API keys (Google Maps, etc.)
- Site configuration

## Development Workflow

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

3. **Code Quality**
   ```bash
   npm run lint
   ```

## Adding New Pages

1. Create page file in appropriate route group:
   - Marketing pages: `src/app/(marketing)/page-name/page.tsx`
   - Legal pages: `src/app/(legal)/page-name/page.tsx`

2. Add navigation link in `src/data/navigation.ts`

## Adding New Components

1. Create component directory in appropriate level (atoms/molecules/organisms)
2. Create component file, module.css, and index.ts
3. Export from index.ts for clean imports

## Styling Approach

- **Tailwind CSS:** Utility-first styling
- **CSS Modules:** Component-scoped styles
- **CSS Variables:** Design tokens in `src/styles/variables.css`

## Image Optimization

- Place images in appropriate `public/images/` subdirectory
- Use Next.js `<Image>` component for automatic optimization
- Provide multiple sizes for hero images (desktop/mobile)

## API Routes

API routes are in `src/app/api/`:
- `/api/contact` - Contact form submissions
- `/api/booking-inquiry` - Booking inquiries
- `/api/newsletter` - Newsletter subscriptions

## Data Management

Static data is stored in `src/data/`:
- `rooms.ts` - Accommodation data
- `experiences.ts` - Safari experiences
- `dining.ts` - Dining options
- `testimonials.ts` - Guest reviews
- `faqs.ts` - Frequently asked questions

## Type Safety

All data structures have corresponding TypeScript types in `src/types/`.

## Custom Hooks

Reusable hooks in `src/hooks/`:
- `useMediaQuery` - Responsive breakpoint detection
- `useInView` - Intersection observer
- `useScrollPosition` - Scroll tracking
- `useKenBurns` - Image animation effect

## Deployment

1. Build the project: `npm run build`
2. Deploy to Vercel, Netlify, or any Node.js hosting
3. Configure environment variables in hosting platform
4. Set up domain and SSL

## Performance Optimization

- Images are automatically optimized by Next.js
- CSS is tree-shaken in production
- Components are code-split automatically
- Use dynamic imports for heavy components

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive enhancement approach

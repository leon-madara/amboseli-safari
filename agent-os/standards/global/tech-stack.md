## Tech Stack - Amboseli Safari Club

This document defines the technical stack for the luxury safari lodge website. This serves as a reference for all team members and AI agents to maintain consistency across the project.

### Framework & Runtime
- **Application Framework:** Next.js 14.2.0+ (App Router with Server Components)
- **Language:** TypeScript 5.3.0+ (strict mode enabled)
- **Runtime:** Node.js 18.0.0+
- **Package Manager:** npm 9.0.0+

### Frontend Stack
- **UI Library:** React 18.3.0
- **CSS Framework:** Tailwind CSS 3.4.0
- **Component Styling:** CSS Modules (for complex/scoped styles)
- **Animation Library:** Framer Motion 11.0.0
- **Form Handling:** React Hook Form 7.51.0
- **Schema Validation:** Zod 3.22.0
- **Date Utilities:** date-fns 3.3.0
- **Utility Libraries:** clsx, tailwind-merge

### Architecture & Patterns
- **Design Pattern:** Atomic Design (atoms → molecules → organisms → templates → pages)
- **Component Strategy:** Server Components (default) + Client Components ('use client')
- **Routing:** Next.js App Router with route groups `(marketing)`, `(legal)`
- **Data Fetching:** Server-side in Server Components
- **State Management:** React Context API (minimal client-side state)
- **Type Safety:** TypeScript interfaces and types throughout

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── (marketing)/       # Marketing route group (/, /accommodations, /experiences, etc.)
│   ├── (legal)/           # Legal route group (/privacy-policy, /terms-of-service)
│   └── api/               # API routes (contact, booking-inquiry, newsletter)
├── components/            # Atomic Design components
│   ├── atoms/            # Basic building blocks (Button, Input, Badge, Icon)
│   ├── molecules/        # Simple combinations (FormField, Card, SearchBar)
│   ├── organisms/        # Complex components (Navigation, Footer, ContactForm, Hero)
│   └── templates/        # Page layouts
├── lib/                  # Utility functions and helpers
├── types/                # TypeScript type definitions
├── data/                 # Static data and constants
├── hooks/                # Custom React hooks
└── styles/               # Global styles, variables, utilities
```

### Design System
- **Colors:** Earth tones (terracotta, sand, ochre), Savannah (deep-green, sage, grass), Accents (gold, amber)
- **Typography:**
  - Display font: Playfair Display (serif) for headings
  - Body font: Inter (sans-serif) for content
- **Spacing:** Consistent 4px grid system (Tailwind default)
- **Breakpoints:** xs: 475px, sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px

### Email Integration
- **Library:** nodemailer 6.9.0
- **Purpose:** Contact forms, booking inquiries, newsletter signups
- **Templates:** HTML + plain text for better deliverability

### Testing & Quality (Future)
- **Test Framework:** Jest + React Testing Library
- **E2E Testing:** Playwright
- **Linting:** ESLint with Next.js config
- **Formatting:** Prettier with Tailwind plugin
- **Type Checking:** TypeScript strict mode

### Deployment & Infrastructure (Future)
- **Hosting:** Vercel (recommended for Next.js)
- **Domain:** TBD
- **CI/CD:** GitHub Actions or Vercel Git integration
- **Analytics:** Plausible Analytics or Google Analytics 4
- **Monitoring:** Sentry for error tracking

### Third-Party Services (Planned)
- **CMS:** Sanity or Contentful (for managing room content, blog posts)
- **Email Service:** Resend or SendGrid (for transactional emails)
- **Payment Processing:** Stripe (for booking deposits and payments)
- **Image CDN:** Vercel Image Optimization or Cloudinary
- **Maps:** Google Maps API (for location and directions)

### Accessibility Standards
- **Target:** WCAG 2.1 Level AA compliance
- **Focus Areas:**
  - Keyboard navigation
  - Screen reader compatibility
  - Color contrast ratios (4.5:1 minimum for normal text)
  - Semantic HTML
  - ARIA labels where appropriate
  - Reduced motion support

### SEO Strategy
- **Metadata:** Next.js Metadata API for dynamic meta tags
- **Open Graph:** Custom OG images and descriptions per page
- **Structured Data:** JSON-LD schema for hotel, reviews, events
- **Sitemap:** Auto-generated with next-sitemap
- **Robots.txt:** Configured for search engine crawling
- **Performance:** Target 90+ Lighthouse scores

### Browser Support
- **Modern Browsers:** Last 2 versions of Chrome, Firefox, Safari, Edge
- **Mobile:** iOS Safari 14+, Chrome Mobile
- **Graceful Degradation:** Progressive enhancement approach

### Development Workflow
- **Version Control:** Git
- **Branching:** Feature branches off main
- **Code Review:** PR reviews before merging
- **Documentation:** Inline comments, README updates, Agent OS specs
- **Standards:** Defined in Agent OS profile standards

### Performance Targets
- **First Contentful Paint (FCP):** < 1.8s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Total Blocking Time (TBT):** < 200ms
- **Cumulative Layout Shift (CLS):** < 0.1
- **Speed Index:** < 3.4s

### Security Best Practices
- **Environment Variables:** Stored in .env.local (never committed)
- **API Routes:** Input validation with Zod schemas
- **CORS:** Configured per endpoint
- **Content Security Policy:** Implemented via Next.js headers
- **XSS Prevention:** React's built-in escaping + sanitization for user input
- **CSRF Protection:** Token-based for form submissions

---

**Note:** This is a living document. Update it as the tech stack evolves or new integrations are added.

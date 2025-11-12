## General Development Conventions - Amboseli Safari Club

### Brand Voice & Tone
- **Tone**: Sophisticated, elegant, welcoming, and warm
- **Language**: Professional yet personable; evocative descriptions that transport readers
- **Focus**: Authentic safari experience, luxury comfort, conservation commitment
- **Avoid**: Overly casual language, excessive exclamation marks, clickbait phrases
- **Emotional Appeal**: Wonder, adventure, relaxation, connection with nature

#### Content Writing Examples
```
✅ Good - Sophisticated and evocative
"Experience the majesty of Mount Kilimanjaro from your private terrace as elephants graze peacefully in the golden savannah below."

❌ Bad - Too casual or generic
"Check out our awesome rooms with killer views!!!"

✅ Good - Professional and informative
"Our luxury suites feature handcrafted furniture from local artisans, floor-to-ceiling windows, and en-suite bathrooms with rainfall showers."

❌ Bad - Bland and uninspiring
"Our rooms have nice furniture and big windows."
```

### Naming Conventions

#### Routes & URLs
- **Format**: lowercase with hyphens
- **Clarity**: Descriptive and SEO-friendly
- **Structure**: Logical hierarchy

```
✅ Good
/accommodations
/accommodations/luxury-tent
/accommodations/family-suite
/experiences/game-drives
/about/conservation-efforts
/privacy-policy
/terms-of-service

❌ Bad
/acc
/room1
/gameDrive
/privacy_policy
```

#### Components
- **PascalCase**: All component names
- **Descriptive**: Clear purpose from name
- **No Abbreviations**: Spell out full words

```
✅ Good
Button
Navigation
RoomCard
BookingInquiryForm
TestimonialCarousel
ImageGallery
PriceTag

❌ Bad
Btn
Nav
RmCard
BIF
TestimonialCrsl
```

#### Functions & Methods
- **camelCase**: All function names
- **Verbs First**: Start with action verb
- **Specific**: Describe what function does

```
✅ Good
fetchAvailableRooms()
calculateTotalPrice()
validateBookingDates()
formatCurrency()
sendBookingConfirmation()

❌ Bad
getStuff()
doIt()
process()
handler()
```

#### Variables
- **camelCase**: All variable names
- **Descriptive**: Self-documenting
- **Boolean Prefixes**: Use is, has, should, can

```
✅ Good
maxGuests
pricePerNight
isAvailable
hasBreakfast
shouldShowDiscount
canCheckIn

❌ Bad
mg
ppn
avail
bfast
disc
```

#### Constants
- **UPPER_SNAKE_CASE**: True constants
- **camelCase**: Configuration objects

```typescript
// ✅ Good
const MAX_GUESTS_PER_ROOM = 4;
const MIN_STAY_NIGHTS = 2;
const CHECK_IN_TIME = '14:00';
const CHECK_OUT_TIME = '10:00';

const navigationLinks = [
  { label: 'Home', href: '/' },
  { label: 'Accommodations', href: '/accommodations' },
];
```

### Project Structure Conventions

#### Component Organization
```
components/
├── atoms/              # Smallest building blocks
│   ├── Button/
│   ├── Input/
│   ├── Badge/
│   └── Icon/
├── molecules/          # Simple combinations
│   ├── FormField/
│   ├── Card/
│   ├── SearchBar/
│   └── PriceTag/
├── organisms/          # Complex components
│   ├── Navigation/
│   ├── Footer/
│   ├── Hero/
│   └── ContactForm/
└── templates/          # Page layouts
    ├── MarketingLayout/
    └── ContentLayout/
```

#### File Naming Within Components
```
Button/
├── Button.tsx           # Component implementation
├── Button.module.css    # CSS Module styles
├── Button.test.tsx      # Unit tests (future)
└── index.ts             # Barrel export
```

### Version Control Best Practices

#### Branch Naming
```
✅ Good
feature/enhanced-navigation
feature/room-detail-pages
fix/hero-image-loading
chore/update-dependencies

❌ Bad
new-stuff
fix
update
```

#### Commit Messages
- **Format**: `type(scope): description`
- **Types**: feat, fix, chore, docs, style, refactor, test
- **Imperative Mood**: "Add" not "Added" or "Adds"
- **Concise**: 50 characters or less for subject line

```
✅ Good
feat(navigation): add sticky header with dropdown menus
fix(hero): resolve Ken Burns animation on mobile
chore(deps): update Next.js to 14.2.3
docs(readme): add Agent OS workflow section

❌ Bad
updated stuff
fixed bug
changes
WIP
```

### Environment Configuration

#### Environment Variables
- **Naming**: UPPER_SNAKE_CASE with descriptive prefixes
- **Documentation**: Document all required env vars in README
- **Never Commit**: Use .env.local, never commit to Git

```bash
# ✅ Good - Descriptive and prefixed
NEXT_PUBLIC_SITE_URL=https://amboselisafariclub.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=bookings@amboselisafariclub.com
EMAIL_PASS=xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# ❌ Bad - Generic or unclear
URL=https://example.com
KEY=xxxxx
SECRET=xxxxx
```

#### Public vs Private Variables
- **NEXT_PUBLIC_**: Expose to browser (API endpoints, public keys)
- **No Prefix**: Server-only (secrets, API keys, database URLs)

### Dependency Management

#### When to Add Dependencies
- **Evaluate First**: Can we implement it ourselves reasonably?
- **Bundle Size**: Check impact on bundle size
- **Maintenance**: Is the package actively maintained?
- **Alternatives**: Compare with similar packages

#### Document Major Dependencies
```typescript
// package.json with comments in README.md
{
  "dependencies": {
    "framer-motion": "^11.0.0",      // Animation library for smooth interactions
    "react-hook-form": "^7.51.0",    // Form handling with validation
    "zod": "^3.22.0",                // Runtime type validation
    "date-fns": "^3.3.0",            // Date manipulation and formatting
    "nodemailer": "^6.9.0"           // Email sending for contact/booking forms
  }
}
```

### Code Review Process

#### Before Requesting Review
1. Self-review: Read through your own changes
2. Test locally: Verify functionality works
3. Check linting: Run `npm run lint`
4. Update documentation: If adding new features
5. Add context: Describe what and why in PR description

#### Review Checklist
- Code follows project conventions and standards
- TypeScript types are properly defined
- Components use Server Components by default
- Accessibility standards met (WCAG 2.1 AA)
- Responsive design tested on mobile/tablet/desktop
- Performance optimized (images, animations, bundle size)
- SEO metadata included where appropriate

### Testing Requirements (Future)

#### Test Coverage Goals
- **Components**: Unit tests for all organisms
- **Utilities**: 100% coverage for lib functions
- **API Routes**: Integration tests for all endpoints
- **E2E**: Critical user flows (booking, contact)

#### Test File Naming
```
Button/
├── Button.tsx
├── Button.module.css
├── Button.test.tsx        # Unit tests
└── Button.stories.tsx     # Storybook stories (future)
```

### Feature Development Workflow

#### Agent OS Spec-Driven Development
1. **Shape Spec** (`/shape-spec`): Refine feature idea and requirements
2. **Write Spec** (`/write-spec`): Create detailed specification
3. **Create Tasks** (`/create-tasks`): Break spec into task list
4. **Implement** (`/implement-tasks` or `/orchestrate-tasks`)
5. **Verify**: Test and review implementation
6. **Document**: Update README and product roadmap

### Changelog Maintenance

#### Keep Updated
- Document breaking changes
- List new features and enhancements
- Note bug fixes and improvements
- Credit contributors

```markdown
# Changelog

## [1.1.0] - 2025-01-15
### Added
- Enhanced navigation with sticky header and dropdown menus
- Room detail pages with image galleries
- Booking inquiry form with date picker

### Fixed
- Hero image loading on slower connections
- Mobile menu animation performance

### Changed
- Updated background color to warmer cream tone (#f3e9d7)
```

### Accessibility Conventions

#### Always Include
- **Alt Text**: Descriptive alt text for all images
- **ARIA Labels**: For interactive elements without visible labels
- **Keyboard Navigation**: All interactive elements keyboard accessible
- **Focus Indicators**: Visible focus states for keyboard users
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Semantic HTML**: Use proper heading hierarchy and landmarks

### Performance Conventions

#### Image Optimization
- **Use next/image**: For all images
- **Proper Sizing**: Specify width and height
- **Priority**: Set priority={true} for above-the-fold images
- **Formats**: WebP/AVIF with fallbacks
- **Lazy Loading**: Default for below-the-fold images

#### Code Splitting
- **Dynamic Imports**: For large components not needed immediately
- **Route-based Splitting**: Automatic with Next.js App Router
- **Conditional Loading**: Load heavy libraries only when needed

### Security Conventions

#### Never Commit
- API keys and secrets
- Database credentials
- Email passwords
- Third-party service tokens
- .env files

#### Input Validation
- **Server-side**: Always validate on server (API routes)
- **Client-side**: Additional validation for UX, not security
- **Zod Schemas**: Use for runtime type checking
- **Sanitize**: Clean user input before rendering

#### API Route Security
```typescript
// ✅ Good - Validated and typed
import { z } from 'zod';

const BookingSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  checkIn: z.string().datetime(),
  checkOut: z.string().datetime(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const validated = BookingSchema.parse(body); // Throws if invalid

  // Process validated data...
}
```

### Documentation Conventions

#### README.md Must Include
- Project overview and purpose
- Tech stack and architecture
- Setup instructions
- Development workflow (Agent OS)
- Environment variables required
- Available scripts and commands
- Deployment process

#### Code Comments
- **When**: Explain "why", not "what"
- **Avoid**: Obvious comments
- **Use JSDoc**: For exported functions/components
- **Update**: Keep comments in sync with code

### Safari Lodge Specific Conventions

#### Room/Suite Naming
- Use full, descriptive names (not abbreviations)
- Consistent capitalization
- Match marketing materials

```
✅ Good
Luxury Safari Tent
Family Suite
Honeymoon Villa
Presidential Suite

❌ Bad
lux_tent
fam suite
Suite1
HS
```

#### Pricing Display
- Always show currency (USD)
- Include "per night" clarification
- Show seasonal pricing when applicable
- Transparency about taxes and fees

```typescript
// ✅ Good
<PriceTag amount={850} currency="USD" period="per night" />
// Displays: "$850 USD per night"

// Include tax notice
"*Rates are exclusive of 16% VAT and 10% service charge"
```

#### Wildlife & Conservation Language
- Use scientific names when appropriate
- Respectful language about wildlife and ecosystems
- Emphasize conservation commitment
- Authentic safari terminology

```
✅ Good
"Witness elephants (Loxodonta africana) in their natural habitat"
"Our conservation efforts support Amboseli Trust for Elephants"
"Morning game drive through acacia woodlands"

❌ Bad
"See cool animals!"
"Safari tour"
```

---

**Note:** These conventions ensure consistency across the Amboseli Safari Club project and align development with the luxury brand positioning. Update this document as new conventions are established.

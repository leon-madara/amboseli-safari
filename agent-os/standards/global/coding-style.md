## Coding Style Best Practices - Amboseli Safari Club

### General Principles
- **Consistent Naming Conventions**: Follow established naming conventions for variables, functions, classes, and files
- **Automated Formatting**: Use Prettier for consistent code style (indenting, line breaks, etc.)
- **Meaningful Names**: Choose descriptive names that reveal intent; avoid abbreviations except for well-known acronyms
- **Small, Focused Functions**: Keep functions small and focused on a single task for better readability and testability
- **DRY Principle**: Avoid duplication by extracting common logic into reusable functions or modules
- **Remove Dead Code**: Delete unused code, commented-out blocks, and imports rather than leaving them as clutter
- **Backward Compatibility**: Only write backward compatibility logic when specifically required

### TypeScript Conventions

#### Type Safety
- **Strict Mode**: Always use TypeScript strict mode (enabled in tsconfig.json)
- **Explicit Types**: Define explicit return types for functions
- **Avoid Any**: Never use `any` type; use `unknown` if type is truly unknown, then narrow with type guards
- **Type Inference**: Let TypeScript infer when obvious (e.g., `const count = 0` instead of `const count: number = 0`)
- **Interfaces over Types**: Prefer `interface` for object shapes, `type` for unions/intersections

```typescript
// ✅ Good
export interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: ReactNode;
  onClick?: () => void;
}

export function Button({ variant, children, onClick }: ButtonProps): ReactElement {
  return <button onClick={onClick}>{children}</button>;
}

// ❌ Bad
export function Button(props: any) {
  return <button>{props.children}</button>;
}
```

#### Null Safety
- **Optional Chaining**: Use `?.` for potentially undefined properties
- **Nullish Coalescing**: Use `??` instead of `||` for default values
- **Type Guards**: Create type guard functions for complex type narrowing

```typescript
// ✅ Good
const email = user?.profile?.email ?? 'No email';

// ❌ Bad
const email = user && user.profile && user.profile.email || 'No email';
```

### Next.js Patterns

#### Server vs Client Components
- **Default to Server**: Use Server Components by default (no 'use client')
- **Client When Needed**: Add 'use client' directive only when:
  - Using React hooks (useState, useEffect, useContext)
  - Adding event listeners (onClick, onChange)
  - Using browser APIs (window, localStorage)
  - Using Framer Motion animations

```typescript
// ✅ Server Component (default)
// src/components/organisms/RoomCard/RoomCard.tsx
import Image from 'next/image';

export interface RoomCardProps {
  title: string;
  price: number;
  image: string;
}

export default function RoomCard({ title, price, image }: RoomCardProps) {
  return (
    <div>
      <Image src={image} alt={title} width={400} height={300} />
      <h3>{title}</h3>
      <p>${price}/night</p>
    </div>
  );
}

// ✅ Client Component (with interactivity)
// src/components/organisms/BookingForm/BookingForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit } = useForm();

  // Component implementation...
}
```

#### Async Server Components
- **Leverage Async**: Server Components can be async functions
- **Data Fetching**: Fetch data directly in Server Components

```typescript
// ✅ Good - Async Server Component
export default async function RoomsPage() {
  const rooms = await fetchRooms();

  return (
    <div>
      {rooms.map(room => <RoomCard key={room.id} {...room} />)}
    </div>
  );
}
```

#### Metadata Export
- **SEO Metadata**: Export metadata objects for pages
- **Dynamic Metadata**: Use `generateMetadata` function for dynamic content

```typescript
// ✅ Static metadata
export const metadata: Metadata = {
  title: 'Accommodations | Amboseli Safari Club',
  description: 'Luxury safari accommodations with Mount Kilimanjaro views',
};

// ✅ Dynamic metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const room = await fetchRoom(params.slug);

  return {
    title: `${room.name} | Amboseli Safari Club`,
    description: room.description,
  };
}
```

### File Naming

#### Components
- **PascalCase**: Use PascalCase for component files
- **Match Component**: Filename should match exported component name
- **Index Files**: Use index.ts for barrel exports

```
✅ Good
components/atoms/Button/Button.tsx
components/atoms/Button/Button.module.css
components/atoms/Button/index.ts

❌ Bad
components/atoms/button.tsx
components/atoms/btn.tsx
```

#### Pages & Routes
- **lowercase**: Use lowercase for route files
- **Hyphens**: Use hyphens for multi-word routes

```
✅ Good
app/(marketing)/page.tsx
app/(marketing)/accommodations/page.tsx
app/(marketing)/privacy-policy/page.tsx

❌ Bad
app/(marketing)/Page.tsx
app/(marketing)/privacyPolicy/page.tsx
```

#### Utilities & Lib
- **camelCase**: Use camelCase for utility files
- **Descriptive**: Name based on function purpose

```
✅ Good
lib/formatCurrency.ts
lib/validateEmail.ts
hooks/useMediaQuery.ts

❌ Bad
lib/utils.ts (too generic)
lib/helper.ts (too vague)
```

### Variable Naming

```typescript
// ✅ Good - Descriptive, clear intent
const maxGuests = 4;
const isAvailable = true;
const roomDetails = await fetchRoom(id);
const handleSubmit = () => { /* ... */ };

// ❌ Bad - Unclear, abbreviated
const mg = 4;
const avail = true;
const rd = await fetchRoom(id);
const submit = () => { /* ... */ };
```

### Function Naming

```typescript
// ✅ Good - Verbs, descriptive
function calculateTotalPrice(nights: number, pricePerNight: number): number { }
function formatDate(date: Date): string { }
async function fetchAvailableRooms(): Promise<Room[]> { }

// ❌ Bad - Nouns, unclear
function total(n: number, p: number): number { }
function date(d: Date): string { }
async function rooms(): Promise<Room[]> { }
```

### Component Props Naming

```typescript
// ✅ Good - Clear, consistent
interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  backgroundImageAlt: string;
  primaryCTA?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
}

// ❌ Bad - Inconsistent, unclear
interface HeroProps {
  t: string;
  sub?: string;
  bgImg: string;
  alt: string;
  cta?: any;
}
```

### Constant Naming

```typescript
// ✅ Good - UPPER_SNAKE_CASE for true constants
const MAX_GUESTS_PER_ROOM = 4;
const DEFAULT_CHECK_IN_TIME = '14:00';
const BOOKING_CANCELLATION_HOURS = 24;

// ✅ Good - camelCase for configuration objects
const navigationLinks = [
  { label: 'Accommodations', href: '/accommodations' },
  { label: 'Experiences', href: '/experiences' },
];
```

### Indentation & Formatting

- **2 Spaces**: Use 2 spaces for indentation (configured in .editorconfig)
- **Single Quotes**: Use single quotes for strings (configured in Prettier)
- **Semicolons**: Include semicolons (configured in Prettier)
- **Trailing Commas**: Use trailing commas in multi-line objects/arrays
- **Max Line Length**: 100 characters (soft limit)

```typescript
// ✅ Good
const buttonProps = {
  variant: 'primary',
  size: 'lg',
  fullWidth: true,
  onClick: handleClick,
};

// ❌ Bad (no trailing comma, inconsistent spacing)
const buttonProps = {
  variant:'primary',
  size:'lg',
  fullWidth:true
};
```

### Import Organization

```typescript
// ✅ Good - Grouped and sorted
// 1. External libraries
import { ReactNode } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// 2. Internal absolute imports
import { Button } from '@/components/atoms/Button';
import { formatCurrency } from '@/lib/formatCurrency';

// 3. Types
import type { Room, Experience } from '@/types';

// 4. Relative imports
import styles from './Hero.module.css';

// 5. Side effects (if any)
import './animations.css';
```

### Comments

- **Why, Not What**: Explain why code exists, not what it does
- **JSDoc for Public APIs**: Use JSDoc for exported functions/components
- **Remove TODO**: Complete or create tickets instead of leaving TODOs in code

```typescript
// ✅ Good - Explains why
// Delay form submission to show loading state for better UX
await new Promise(resolve => setTimeout(resolve, 500));

// ❌ Bad - Explains what (obvious from code)
// Set isLoading to true
setIsLoading(true);

// ✅ Good - JSDoc for exported function
/**
 * Calculates the total booking cost including taxes and fees
 * @param nights - Number of nights booked
 * @param pricePerNight - Base room rate per night
 * @returns Total cost in USD
 */
export function calculateBookingTotal(nights: number, pricePerNight: number): number {
  const subtotal = nights * pricePerNight;
  const tax = subtotal * 0.16; // 16% Kenya VAT
  const serviceCharge = subtotal * 0.10; // 10% service charge
  return subtotal + tax + serviceCharge;
}
```

### Error Handling

```typescript
// ✅ Good - Specific error handling
try {
  const response = await fetch('/api/booking-inquiry', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Booking inquiry failed: ${response.statusText}`);
  }

  return await response.json();
} catch (error) {
  if (error instanceof Error) {
    console.error('Booking inquiry error:', error.message);
  }
  throw error;
}

// ❌ Bad - Silent failures, generic errors
try {
  const response = await fetch('/api/booking-inquiry');
  return await response.json();
} catch (error) {
  console.log(error);
}
```

### Conditional Rendering

```typescript
// ✅ Good - Clear and readable
{isLoading && <LoadingSpinner />}
{error && <ErrorMessage message={error} />}
{rooms.length > 0 ? (
  <RoomGrid rooms={rooms} />
) : (
  <EmptyState message="No rooms available" />
)}

// ❌ Bad - Ternary abuse
{isLoading ? <LoadingSpinner /> : error ? <ErrorMessage /> : rooms.length > 0 ? <RoomGrid /> : <EmptyState />}
```

### Early Returns

```typescript
// ✅ Good - Early returns reduce nesting
function getDiscountedPrice(price: number, discountCode?: string): number {
  if (!discountCode) {
    return price;
  }

  if (discountCode === 'SAFARI20') {
    return price * 0.8;
  }

  if (discountCode === 'SUMMER15') {
    return price * 0.85;
  }

  return price;
}

// ❌ Bad - Nested conditions
function getDiscountedPrice(price: number, discountCode?: string): number {
  if (discountCode) {
    if (discountCode === 'SAFARI20') {
      return price * 0.8;
    } else if (discountCode === 'SUMMER15') {
      return price * 0.85;
    } else {
      return price;
    }
  } else {
    return price;
  }
}
```

### Array Methods over Loops

```typescript
// ✅ Good - Functional approach
const availableRooms = rooms.filter(room => room.isAvailable);
const roomNames = rooms.map(room => room.name);
const totalCapacity = rooms.reduce((sum, room) => sum + room.capacity, 0);

// ❌ Bad - Imperative loops (when functional approach is clearer)
const availableRooms = [];
for (let i = 0; i < rooms.length; i++) {
  if (rooms[i].isAvailable) {
    availableRooms.push(rooms[i]);
  }
}
```

### Destructuring

```typescript
// ✅ Good - Destructure for clarity
function RoomCard({ title, price, image, capacity }: RoomCardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>${price}/night</p>
      <p>Sleeps {capacity}</p>
    </div>
  );
}

// ❌ Bad - Repetitive prop access
function RoomCard(props: RoomCardProps) {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>${props.price}/night</p>
      <p>Sleeps {props.capacity}</p>
    </div>
  );
}
```

---

**Note:** These coding standards ensure consistency across the Amboseli Safari Club codebase and make it easier for AI agents to generate code that matches the project's style.

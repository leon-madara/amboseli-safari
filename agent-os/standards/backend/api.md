## API Endpoint Standards - Next.js App Router

### Next.js API Routes Structure

API routes in Next.js 14 App Router live in `src/app/api/` directory and use `route.ts` files with named exports for HTTP methods.

```
src/app/api/
├── contact/
│   └── route.ts          # POST /api/contact
├── booking-inquiry/
│   └── route.ts          # POST /api/booking-inquiry
└── newsletter/
    └── route.ts          # POST /api/newsletter
```

### Route Handler Pattern

```typescript
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Define validation schema
const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1).max(200).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const data = ContactSchema.parse(body);

    // Business logic (send email, save to database, etc.)
    await sendContactEmail(data);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Contact form submitted successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          errors: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    // Handle other errors
    console.error('Contact form error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error. Please try again later.',
      },
      { status: 500 }
    );
  }
}
```

### HTTP Methods

Use named exports for each HTTP method:

```typescript
// GET - Retrieve data
export async function GET(request: NextRequest) {
  // Implementation
}

// POST - Create new resource or submit data
export async function POST(request: NextRequest) {
  // Implementation
}

// PUT - Replace entire resource
export async function PUT(request: NextRequest) {
  // Implementation
}

// PATCH - Update partial resource
export async function PATCH(request: NextRequest) {
  // Implementation
}

// DELETE - Remove resource
export async function DELETE(request: NextRequest) {
  // Implementation
}
```

### Input Validation with Zod

**Always** validate input using Zod schemas:

```typescript
// ✅ Good - Comprehensive validation
const BookingInquirySchema = z.object({
  // Guest information
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number').optional(),

  // Booking details
  checkIn: z.string().datetime(),
  checkOut: z.string().datetime(),
  adults: z.number().int().min(1).max(10),
  children: z.number().int().min(0).max(10).optional(),

  // Room selection
  roomType: z.enum(['luxury-tent', 'family-suite', 'honeymoon-villa', 'presidential-suite']),

  // Additional requests
  specialRequests: z.string().max(1000).optional(),

  // Marketing opt-in
  subscribeNewsletter: z.boolean().optional(),
}).refine(data => {
  const checkIn = new Date(data.checkIn);
  const checkOut = new Date(data.checkOut);
  return checkOut > checkIn;
}, {
  message: 'Check-out date must be after check-in date',
  path: ['checkOut'],
});

// ❌ Bad - No validation
export async function POST(request: NextRequest) {
  const body = await request.json();
  // Using body directly without validation is dangerous!
}
```

### Response Format

#### Success Response
```typescript
return NextResponse.json(
  {
    success: true,
    message: 'Operation completed successfully',
    data: { /* optional data */ },
  },
  { status: 200 } // or 201 for created resources
);
```

#### Error Response
```typescript
return NextResponse.json(
  {
    success: false,
    message: 'Human-readable error message',
    errors: [ /* optional array of detailed errors */ ],
  },
  { status: 400 } // or appropriate error status
);
```

### HTTP Status Codes

Use appropriate status codes consistently:

- **200 OK**: Successful GET, PUT, PATCH, or DELETE
- **201 Created**: Successful POST that creates a new resource
- **400 Bad Request**: Validation error, malformed request
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Authenticated but not authorized
- **404 Not Found**: Resource not found
- **405 Method Not Allowed**: HTTP method not supported on this endpoint
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Unexpected server error

```typescript
// ✅ Good - Appropriate status codes
if (validationFailed) {
  return NextResponse.json({ ...}, { status: 400 });
}

if (resourceNotFound) {
  return NextResponse.json({ ...}, { status: 404 });
}

if (serverError) {
  return NextResponse.json({ ...}, { status: 500 });
}
```

### Error Handling

```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = Schema.parse(body);

    // Business logic
    const result = await performOperation(data);

    return NextResponse.json({ success: true, data: result }, { status: 200 });

  } catch (error) {
    // Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    // Custom application errors
    if (error instanceof ApplicationError) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.statusCode }
      );
    }

    // Unknown errors - log but don't expose details
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Environment Variables

Store sensitive configuration in environment variables:

```typescript
// ✅ Good - Use environment variables
const emailConfig = {
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
};

// ❌ Bad - Hardcoded credentials
const emailConfig = {
  host: 'smtp.gmail.com',
  user: 'bookings@amboselisafariclub.com',
  pass: 'mypassword123', // NEVER DO THIS!
};
```

### CORS Configuration

```typescript
// For APIs that need CORS (called from other domains)
export async function POST(request: NextRequest) {
  // Handle preflight request
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // or specific domain
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Add CORS headers to response
  const response = NextResponse.json({ success: true });
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}
```

### Rate Limiting (Future)

```typescript
// Example pattern for rate limiting (requires additional setup)
import { rateLimit } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  // Check rate limit
  const { success, limit, remaining, reset } = await rateLimit(request);

  if (!success) {
    return NextResponse.json(
      { success: false, message: 'Too many requests' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': reset.toString(),
        },
      }
    );
  }

  // Process request...
}
```

### Email Sending Pattern

```typescript
// src/lib/email.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendBookingInquiryEmail(data: BookingInquiryData) {
  const htmlContent = `
    <h1>New Booking Inquiry</h1>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Check-in:</strong> ${data.checkIn}</p>
    <p><strong>Check-out:</strong> ${data.checkOut}</p>
    <!-- More details -->
  `;

  const textContent = `
    New Booking Inquiry
    Name: ${data.name}
    Email: ${data.email}
    Check-in: ${data.checkIn}
    Check-out: ${data.checkOut}
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'bookings@amboselisafariclub.com',
    subject: 'New Booking Inquiry from Website',
    text: textContent,
    html: htmlContent,
  });
}
```

### Testing API Routes (Future)

```typescript
// src/app/api/contact/route.test.ts
import { POST } from './route';
import { NextRequest } from 'next/server';

describe('POST /api/contact', () => {
  it('should return 400 for invalid email', async () => {
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email',
        message: 'Test message',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it('should return 200 for valid submission', async () => {
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test message',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
});
```

### Security Best Practices

1. **Always Validate Input**: Use Zod schemas for all request data
2. **Sanitize Output**: Don't expose internal error details to clients
3. **Use Environment Variables**: Never hardcode secrets
4. **Rate Limiting**: Implement rate limiting for public endpoints
5. **HTTPS Only**: Ensure API is only accessible over HTTPS in production
6. **CORS**: Configure CORS appropriately for your security needs
7. **Authentication**: Implement authentication for sensitive endpoints (future)
8. **Logging**: Log errors server-side, but don't expose them to clients

### Common Endpoints for Amboseli Safari Club

```typescript
// Contact form
POST /api/contact
Body: { name, email, subject?, message }

// Booking inquiry
POST /api/booking-inquiry
Body: { name, email, phone?, checkIn, checkOut, adults, children?, roomType, specialRequests? }

// Newsletter signup
POST /api/newsletter
Body: { email, name? }

// Availability check (future)
GET /api/availability?checkIn=2025-06-01&checkOut=2025-06-05&roomType=luxury-tent

// Room details (future)
GET /api/rooms/[slug]
```

### Naming Conventions

- **Lowercase**: Use lowercase for all route segments
- **Hyphens**: Use hyphens for multi-word routes
- **Plural Nouns**: Use plural for collections (e.g., `/api/rooms`)
- **Singular for Actions**: Use singular for actions (e.g., `/api/contact`, `/api/booking-inquiry`)

```
✅ Good
/api/contact
/api/booking-inquiry
/api/newsletter
/api/rooms
/api/rooms/luxury-tent

❌ Bad
/api/Contact
/api/bookingInquiry
/api/newsletter_signup
/api/room
```

---

**Note:** These API standards ensure secure, consistent, and maintainable API routes using Next.js 14 App Router conventions. Always prioritize input validation, error handling, and security.

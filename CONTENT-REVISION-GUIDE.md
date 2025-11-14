# Content Revision Guide - Honest Positioning

## Quick Reference: What to Change

This guide provides actionable content changes for each chapter to align with the honest "modern safari hotel" positioning.

---

## Global Find & Replace

### Words to REMOVE/REPLACE

| Remove This | Replace With |
|------------|--------------|
| "luxury safari lodge" | "modern safari hotel" |
| "intimate wilderness retreat" | "perfect for families and groups" |
| "exclusive" | "welcoming" or "accessible" |
| "bespoke" | "customizable" or "flexible" |
| "canvas under stars" | "comfortable rooms" |
| "ultra-luxury" | "contemporary comfort" |
| "discerning travelers" | "families and safari enthusiasts" |
| "romantic escape" | "adventure for all ages" (unless in specific context) |

### Words to ADD/EMPHASIZE

- "families"
- "groups"
- "modern"
- "spacious"
- "comfortable"
- "value"
- "accessible"
- "Kimana Gate"
- "weekend getaway"

---

## Chapter-by-Chapter Revisions

### Chapter 1: Pre-Dawn Hero
**File:** `src/components/chapters/PreDawnHero/PreDawnHero.tsx`

**Current Issues:**
- May promise luxury tented experience
- Possibly too romantic/exclusive positioning

**Revised Content:**
```typescript
// Update these lines:
tagline: "Modern Comfort Meets Authentic Safari"
subtitle: "Opening December 2025 | Kimana Gate, Amboseli"
description: "Kenya's newest safari hotel - perfect for families and groups
seeking Mount Kilimanjaro views and elephant encounters with contemporary comfort"

// Primary CTA
primaryCTA: {
  text: "Book Early & Save 20%",
  href: "#early-access",
  badge: "Family & Group Friendly"
}

// Secondary CTA
secondaryCTA: {
  text: "Perfect for Groups",
  href: "#group-bookings"
}

// Add trust indicators
<TrustIndicators>
  ✓ Kimana Gate Access
  ✓ Mount Kilimanjaro Views
  ✓ Large Pool Facility
  ✓ Group Accommodations
</TrustIndicators>
```

---

### Chapter 2: Sunrise - "The Vision"
**File:** `src/components/chapters/SunriseChapter/SunriseChapter.tsx`

**Revised Content:**
```typescript
heading: "Where Modern Comfort Meets Authentic Safari"
subheading: "Opening December 2025 near Kimana Gate"

body: `Amboseli Safari Club brings modern hotel comfort to Kenya's
elephant capital. With spacious rooms, contemporary amenities, and
direct access to Amboseli National Park via Kimana Gate, we're
perfect for families and groups who want authentic safari experiences
without sacrificing comfort.

With Mount Kilimanjaro as your backdrop and Africa's largest elephant
herds at your doorstep, your unforgettable adventure begins here.`

features: [
  {
    icon: "🏔️",
    title: "Kilimanjaro Views",
    description: "Mount Kilimanjaro backdrop from property"
  },
  {
    icon: "🚶",
    title: "Kimana Gate Access",
    description: "5-minute walk to park entrance"
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Family & Group Friendly",
    description: "Accommodates groups of all sizes"
  },
  {
    icon: "🏊",
    title: "Pool Facility",
    description: "Large swimming pool for all ages"
  }
]
```

---

### Chapter 3: Morning Drive
**File:** `src/components/chapters/MorningDriveChapter/MorningDriveChapter.tsx`

**Add Location Context:**
```typescript
<LocationBadge className={styles.locationBadge}>
  <div className={styles.locationItem}>
    <Icon name="map-pin" />
    <span>Adjacent to Amboseli National Park</span>
  </div>
  <div className={styles.locationItem}>
    <Icon name="elephant" />
    <span>Home to 1,600+ elephants</span>
  </div>
  <div className={styles.locationItem}>
    <Icon name="clock" />
    <span>3-4 hours from Nairobi</span>
  </div>
</LocationBadge>

// Update wildlife card descriptions
wildlifeCards: [
  {
    animal: "African Elephant",
    title: "Elephant Encounters",
    description: "Amboseli is home to Africa's largest elephant herds.
    See family groups with babies against the Kilimanjaro backdrop.",
    photo: true,
    funFact: "Perfect for family photography"
  },
  // ... other animals
]
```

---

### Chapter 4: Bush Breakfast
**File:** `src/components/chapters/BushBreakfastChapter/BushBreakfastChapter.tsx`

**Reframe as Group-Friendly:**
```typescript
heading: "Signature Dining Experiences"
subtitle: "From Family Breakfasts to Group Celebrations"

sections: [
  {
    title: "Buffet Restaurant",
    description: "Start your day with a hearty buffet - Kenyan favorites
    and continental options. Perfect for groups with diverse preferences.",
    features: [
      "Accommodates large parties",
      "Kids menu available",
      "Vegetarian & special diets",
      "Early breakfast for game drives"
    ]
  },
  {
    title: "Bush Breakfast Experience",
    description: "Add a special touch to your safari with breakfast in
    the bush (available for groups and families).",
    features: [
      "Set up in scenic locations",
      "Included in packages",
      "Perfect for celebrations"
    ]
  }
]
```

---

### Chapter 5: Accommodations - CRITICAL CHANGES
**File:** `src/components/chapters/AccommodationsChapter/AccommodationsChapter.tsx`

**Complete Rewrite:**
```typescript
heading: "Spacious Rooms & Family Apartments"
subtitle: "Modern Comfort for Safari Adventures"
description: "Choose from comfortable safari view rooms or spacious
family apartments - all with modern amenities, AC, and WiFi"

roomTypes: [
  {
    name: "Safari View Room",
    tagline: "Perfect for couples and tour groups",
    image: "/images/rooms/safari-view.jpg", // MUST be actual property photo
    amenities: [
      "Modern en-suite bathroom",
      "Air conditioning & ceiling fan",
      "WiFi included",
      "Private balcony (select rooms)",
      "Kilimanjaro views (select rooms)",
      "Twin or double bed options"
    ],
    capacity: "2 guests",
    size: "28 sqm",
    pricing: {
      standard: "$220-280/night",
      earlyBird: "$175-225/night (20% off)"
    },
    bestFor: "Couples, solo travelers, group bookings",
    cta: "Check Availability"
  },
  {
    name: "Family Apartment",
    tagline: "Spacious comfort for families",
    image: "/images/rooms/family-apartment.jpg", // MUST be actual photo
    amenities: [
      "2 separate bedrooms",
      "Living area with sofa bed",
      "Kitchenette (optional self-catering)",
      "Large bathroom",
      "Dining area",
      "Private terrace",
      "Suitable for 4-6 guests"
    ],
    capacity: "4-6 guests",
    size: "65 sqm",
    pricing: {
      standard: "$380-450/night",
      earlyBird: "$305-360/night (20% off)"
    },
    bestFor: "Families with kids, small friend groups",
    cta: "Perfect for Families"
  },
  {
    name: "Group Block Bookings",
    tagline: "Special rates for groups",
    image: "/images/groups/group-accommodation.jpg",
    features: [
      "10+ rooms: 15% group discount",
      "20+ rooms: 25% group discount",
      "Dedicated group coordinator",
      "Flexible meal arrangements",
      "Meeting space available",
      "Custom itineraries"
    ],
    bestFor: "Church groups, schools, corporate teams, family reunions, tour operators",
    cta: "Request Group Quote",
    badge: "Most Popular for Groups"
  }
]

// Add Early Bird Banner
<EarlyBirdBanner className={styles.earlyBirdBanner}>
  <div className={styles.bannerIcon}>🎁</div>
  <h3>Book Before October 2025 & Save 20%</h3>
  <ul className={styles.benefits}>
    <li>✓ 20% off all room rates</li>
    <li>✓ Complimentary airport transfer</li>
    <li>✓ Welcome safari tour included</li>
    <li>✓ Room upgrade (subject to availability)</li>
  </ul>
  <button className={styles.ctaButton}>Reserve Now</button>
</EarlyBirdBanner>

// REMOVE any references to:
// - "Presidential Villa" (unless it exists)
// - "Canvas tents"
// - "Private plunge pools"
// - "Butler service"
```

---

### Chapter 6: Dining Experience
**File:** `src/components/chapters/DiningChapter/DiningChapter.tsx`

**Update Messaging:**
```typescript
heading: "Dining for Families & Groups"
subtitle: "Kenyan & International Flavors"

venues: [
  {
    name: "The Savannah Restaurant",
    description: "Our main restaurant accommodates large groups with
    buffet and à la carte options.",
    features: [
      "Seats up to 80 guests",
      "Breakfast, lunch & dinner",
      "Kids menu available",
      "Vegetarian & vegan options",
      "Special dietary requirements catered",
      "Kilimanjaro sunset views"
    ],
    hours: "6:30am - 10:00pm",
    style: "Casual dining, family-friendly"
  },
  {
    name: "Poolside Snack Bar",
    description: "Light meals and refreshments by the pool",
    features: [
      "Sandwiches & salads",
      "Fresh fruit & smoothies",
      "Cold beverages",
      "Sundowner cocktails",
      "Ice cream for kids"
    ],
    hours: "10:00am - 7:00pm"
  },
  {
    name: "Bush Dining (Special Experience)",
    description: "Private dinners or breakfasts in scenic bush locations",
    features: [
      "Available for groups & families",
      "Romantic dinners for couples",
      "Celebratory events",
      "Advance booking required"
    ],
    pricing: "From $80/person"
  },
  {
    name: "Packed Safari Lunches",
    description: "For full-day game drives",
    features: [
      "Sandwiches, fruit, snacks",
      "Vegetarian options",
      "Kids portions available",
      "Included in packages"
    ]
  }
]
```

---

### Chapter 7: Safari Experiences
**File:** `src/components/chapters/ExperiencesChapter/ExperiencesChapter.tsx`

**Update Title & Add Details:**
```typescript
heading: "Curated Safari Adventures from Kimana Gate"
subtitle: "Expert-Guided Game Drives & Cultural Experiences"

// Keep wildlife content but add:
locationAdvantage: {
  title: "Why Our Location Matters",
  points: [
    "5-minute walk to Kimana Gate entrance",
    "Less crowded than main gates",
    "Quick access means more time in park",
    "Easy return for lunch/pool breaks"
  ]
}

experiences: [
  {
    id: "game-drives",
    title: "Daily Game Drives",
    description: "Explore Amboseli with expert naturalist guides",
    schedule: [
      "Morning: 6:30am departure (3-4 hours)",
      "Afternoon: 3:30pm departure (3-4 hours)",
      "Full Day: 6:30am-4pm (includes lunch)"
    ],
    pricing: {
      morning: "$80/person",
      fullDay: "$130/person (lunch included)",
      groupRates: "10+ guests: 15% discount"
    },
    vehicles: "4x4 safari vehicles with pop-up roofs",
    included: "Park entry fees, guide, binoculars",
    perfectFor: "All ages, families welcome"
  },
  {
    id: "elephants",
    title: "Elephant Encounters",
    description: "Amboseli's famous elephant population",
    highlights: [
      "1,600+ elephants in ecosystem",
      "Family herds with babies",
      "Best elephant photography in Africa",
      "Elephant + Kilimanjaro iconic shots"
    ]
  },
  {
    id: "cultural",
    title: "Maasai Cultural Visits",
    description: "Authentic cultural experiences with local Maasai communities",
    activities: [
      "Traditional village tours",
      "Warrior dancing performances",
      "Beadwork demonstrations",
      "Cultural storytelling",
      "Support local communities"
    ],
    pricing: "$40/person",
    duration: "2-3 hours",
    perfectFor: "Families, educational groups"
  },
  // ... more experiences
]

// Add booking note
<BookingNote className={styles.bookingNote}>
  All safari activities can be pre-booked with your accommodation package.
  Group rates available for 10+ guests.
</BookingNote>
```

---

### Chapter 8: Wellness - HIGHLIGHT THE POOL!
**File:** `src/components/chapters/WellnessChapter/WellnessChapter.tsx`

**Major Rewrite:**
```typescript
heading: "The Pool - Your Safari Oasis"
subtitle: "Refresh Between Adventures"
mainMessage: "After morning game drives through Amboseli's dust and heat,
dive into our large swimming pool - a luxury most safari camps can't offer!"

poolFeatures: {
  title: "Why Families Love Our Pool",
  image: "/images/pool/main-pool.jpg", // MUST be actual property photo
  features: [
    {
      icon: "🏊",
      title: "Large Main Pool",
      description: "Spacious pool suitable for all swimming levels"
    },
    {
      icon: "👶",
      title: "Kids' Splash Area",
      description: "Shallow section perfect for young children"
    },
    {
      icon: "🏔️",
      title: "Kilimanjaro Views",
      description: "Swim with Africa's highest peak as backdrop"
    },
    {
      icon: "☀️",
      title: "Poolside Loungers",
      description: "Shaded and sunny spots available"
    },
    {
      icon: "🍹",
      title: "Pool Bar Service",
      description: "Refreshments delivered to your lounger"
    },
    {
      icon: "🏊‍♂️",
      title: "Supervised Swimming",
      description: "Lifeguard on duty during pool hours"
    }
  ],
  hours: "7:00am - 7:00pm daily",
  amenities: "Towels provided, changing rooms, outdoor showers"
}

// Optional: If spa/wellness exists
additionalWellness: {
  title: "Additional Wellness",
  services: [
    {
      name: "Massage Services",
      description: "In-room or spa massages available",
      pricing: "From $60/hour"
    },
    {
      name: "Yoga Sessions",
      description: "Morning yoga on outdoor deck",
      schedule: "Tuesday & Saturday 7am",
      pricing: "Complimentary for guests"
    }
  ]
}

// If NO spa, just focus on pool + relaxation
relaxationAreas: {
  title: "Relaxation Spaces",
  areas: [
    "Pool deck with loungers",
    "Shaded garden areas",
    "Terrace with Kilimanjaro views",
    "Library/quiet lounge"
  ]
}
```

---

### Chapter 9: Guest Stories
**File:** `src/components/chapters/GuestStoriesChapter/GuestStoriesChapter.tsx`

**Pre-Launch Testimonials:**
```typescript
heading: "Join Our Founding Guests"
subtitle: "Early Bookers Are Already Excited"

testimonialType: "pre-launch"

testimonials: [
  {
    quote: "Finally! A modern safari hotel in Amboseli that can accommodate
    our entire family. The pool will be perfect for the kids between game
    drives. Can't wait for December!",
    author: "Sarah K.",
    location: "Nairobi",
    context: "Family of 6 - Early Bird Booking",
    avatar: "/images/testimonials/family-avatar.jpg",
    stars: 5
  },
  {
    quote: "As a tour operator, I've been looking for quality mid-market
    accommodation near Kimana Gate. Amboseli Safari Club fills a real gap.
    Already booked three groups!",
    author: "James M.",
    location: "Safari Tour Operator",
    context: "Group Booking Specialist",
    avatar: "/images/testimonials/operator-avatar.jpg",
    stars: 5
  },
  {
    quote: "Perfect for our church group retreat! Affordable, spacious,
    and right at the park entrance. The group coordinator has been so
    helpful. Booked 18 rooms!",
    author: "Pastor David",
    location: "Nairobi Community Church",
    context: "Group of 35 guests",
    avatar: "/images/testimonials/church-avatar.jpg",
    stars: 5
  },
  {
    quote: "Modern amenities with authentic safari access - exactly what
    we wanted. The Kilimanjaro views sold us!",
    author: "Emily & Tom",
    location: "UK",
    context: "Honeymoon Booking",
    avatar: "/images/testimonials/couple-avatar.jpg",
    stars: 5
  }
]

// Add Founding Members section
<FoundingMembersSection>
  <h3>Become a Founding Guest</h3>
  <p>Book before October 2025 and enjoy exclusive benefits:</p>
  <ul>
    <li>✓ 20% off your first stay</li>
    <li>✓ Lifetime 10% discount on future bookings</li>
    <li>✓ Founding Member certificate</li>
    <li>✓ Priority booking for peak seasons</li>
    <li>✓ Early access to special offers</li>
  </ul>
  <div className={styles.statsRow}>
    <div className={styles.stat}>
      <strong>250+</strong>
      <span>Founding members</span>
    </div>
    <div className={styles.stat}>
      <strong>850+</strong>
      <span>Rooms pre-booked</span>
    </div>
    <div className={styles.stat}>
      <strong>15</strong>
      <span>Group bookings confirmed</span>
    </div>
  </div>
  <button className={styles.ctaButton}>Join Founding Members</button>
</FoundingMembersSection>
```

---

### Chapter 10: Location & Access
**File:** `src/components/chapters/LocationChapter/LocationChapter.tsx`

**Enhance with Specifics:**
```typescript
heading: "Perfectly Positioned for Safari Adventures"
subtitle: "Adjacent to Kimana Gate, Amboseli National Park"

locationHighlights: [
  {
    icon: "🚶",
    title: "Kimana Gate Access",
    description: "5-minute walk to park entrance",
    benefit: "Quick morning departures, easy lunch returns"
  },
  {
    icon: "🐘",
    title: "Elephant Capital",
    description: "Amboseli's 1,600+ elephant population",
    benefit: "Best elephant viewing & photography in Kenya"
  },
  {
    icon: "🏔️",
    title: "Kilimanjaro Views",
    description: "Africa's highest peak as your backdrop",
    benefit: "Iconic safari photography opportunities"
  },
  {
    icon: "🚗",
    title: "3-4 Hours from Nairobi",
    description: "365km scenic drive",
    benefit: "Perfect weekend getaway destination"
  }
]

access: {
  byRoad: {
    title: "By Road from Nairobi",
    distance: "365km (3-4 hours)",
    route: "Via Nairobi-Mombasa Road to Emali, then Loitokitok Road",
    roadCondition: "Tarmac road, good condition",
    transfer: {
      available: true,
      pricing: "$150 round trip per vehicle (up to 4 guests)",
      included: "Complimentary with Early Bird bookings"
    }
  },
  byAir: {
    title: "By Air",
    departure: "Wilson Airport, Nairobi",
    destination: "Amboseli airstrip",
    duration: "45 minutes flight time",
    transfer: "10-minute drive from airstrip to property",
    pricing: "Charter flights from $800 (per plane, up to 5 passengers)"
  }
}

nearby: {
  title: "What's Nearby",
  locations: [
    "Amboseli National Park (adjacent)",
    "Observation Hill (panoramic park views)",
    "Enkongo Narok Swamp (elephant viewing)",
    "Maasai villages (cultural tours)",
    "Tanzania border (40km)"
  ]
}

regionalContext: {
  county: "Kajiado County, Southern Kenya",
  ecosystem: "Amboseli ecosystem (savannah)",
  climate: "Semi-arid, year-round sunshine",
  bestMonths: "Jun-Oct, Jan-Feb (dry seasons, best Kilimanjaro views)"
}

// Add interactive map
<InteractiveMap
  propertyLocation={{lat: -2.6842, lng: 37.2608}} // Approximate coordinates
  markers={[
    {type: "property", label: "Amboseli Safari Club"},
    {type: "gate", label: "Kimana Gate"},
    {type: "peak", label: "Mt. Kilimanjaro"},
    {type: "city", label: "Nairobi"}
  ]}
/>
```

---

### Chapter 11: Work With Us (NEW)
**File:** `src/components/chapters/CareersChapter/CareersChapter.tsx`

**(This chapter needs to be created - see STRATEGIC-POSITIONING.md for full details)**

---

### Chapter 12: Plan Your Safari
**File:** `src/components/chapters/PlanSafariChapter/PlanSafariChapter.tsx`

**Updated Packages & Pricing:**
```typescript
heading: "Plan Your Perfect Safari"
subtitle: "Packages for Every Type of Traveler"

// Add market segment tabs
segmentTabs: [
  {id: "families", label: "Families", icon: "👨‍👩‍👧‍👦"},
  {id: "groups", label: "Groups", icon: "👥"},
  {id: "couples", label: "Couples", icon: "💑"},
  {id: "weekend", label: "Weekend Escape", icon: "📅"}
]

packages: {
  families: {
    package: {
      name: "Family Safari Package",
      duration: "3 Nights / 4 Days",
      badge: "Most Popular",
      standardPrice: "$1,600 for family of 4",
      earlyBirdPrice: "$1,280 (20% off)",
      includes: [
        "3 nights in Family Apartment",
        "All meals (breakfast, lunch, dinner)",
        "Kids menu & special dietary needs",
        "5 game drives (mix of morning & afternoon)",
        "Maasai village cultural visit",
        "Pool access & activities",
        "Airport transfer (Nairobi round trip)",
        "Park entry fees for all",
        "Binoculars & field guides"
      ],
      perfectFor: "Families with kids aged 4+, multi-generational trips",
      addOns: [
        "Extra night: $400",
        "Additional child: $120/night",
        "Private vehicle upgrade: $200 total"
      ]
    },
    cta: "Request Family Quote"
  },

  groups: {
    package: {
      name: "Group Safari Package",
      duration: "3 Nights / 4 Days",
      badge: "Best Value for Groups",
      standardPrice: "From $420/person (10+ guests)",
      earlyBirdPrice: "From $360/person (group + early bird discount)",
      includes: [
        "3 nights in Safari View Rooms",
        "All meals (buffet style)",
        "Daily game drives",
        "Cultural experience",
        "Group coordinator",
        "Meeting space (if needed)",
        "Flexible schedule",
        "Park entry fees"
      ],
      groupDiscounts: [
        "10-15 guests: 15% discount",
        "16-25 guests: 20% discount",
        "26+ guests: 25% discount"
      ],
      perfectFor: "Church groups, schools, corporate teams, family reunions, tour operators",
      customization: "Fully customizable itineraries available"
    },
    cta: "Request Group Quote"
  },

  couples: {
    package: {
      name: "Romantic Safari Escape",
      duration: "3 Nights / 4 Days",
      standardPrice: "$1,100 per couple",
      earlyBirdPrice: "$880 per couple (20% off)",
      includes: [
        "3 nights in Safari View Room",
        "All meals",
        "4 game drives",
        "Sundowner drinks",
        "Bush dinner (one evening)",
        "Couples massage (optional add-on)",
        "Airport transfer",
        "Park entry fees"
      ],
      perfectFor: "Honeymoons, anniversaries, romantic getaways",
      addOns: [
        "Champagne & flowers in room: $80",
        "Couples spa treatment: $140",
        "Private vehicle: $200"
      ]
    },
    cta: "Book Romantic Escape"
  },

  weekend: {
    package: {
      name: "Weekend Explorer",
      duration: "2 Nights / 3 Days",
      badge: "Perfect from Nairobi",
      standardPrice: "$520 per person (sharing)",
      earlyBirdPrice: "$415 per person (20% off)",
      includes: [
        "2 nights in Safari View Room",
        "All meals",
        "3 game drives (arrival, morning, departure)",
        "Pool access",
        "Airport/Nairobi transfer",
        "Park entry fees"
      ],
      schedule: [
        "Friday: Depart Nairobi 12pm, arrive 4pm, sunset game drive",
        "Saturday: Morning & afternoon game drives, pool time",
        "Sunday: Early morning drive, depart 11am, arrive Nairobi 3pm"
      ],
      perfectFor: "Weekend getaway, first safari, Nairobi residents",
      singleSupplement: "+30% ($156)"
    },
    cta: "Book Weekend Escape"
  }
}

// Contact section
contact: {
  heading: "Ready to Book Your Safari?",
  subheading: "Our team is here to help plan your perfect adventure",

  methods: [
    {
      type: "email",
      icon: "📧",
      value: "info@amboselisafariclub.com",
      label: "Email Us",
      description: "Get a detailed quote within 24 hours",
      cta: "Send Inquiry"
    },
    {
      type: "whatsapp",
      icon: "💬",
      value: "+254 XXX XXX XXX", // Add real number
      label: "WhatsApp",
      description: "Chat with us for quick questions",
      cta: "Start Chat"
    },
    {
      type: "phone",
      icon: "📞",
      value: "+254 XXX XXX XXX", // Add real number
      label: "Call Us",
      description: "Speak directly with our booking team",
      hours: "Mon-Sat 8am-6pm EAT",
      cta: "Call Now"
    },
    {
      type: "form",
      icon: "📝",
      label: "Booking Form",
      description: "Fill out our detailed inquiry form",
      cta: "Open Form"
    }
  ],

  social: {
    heading: "Follow Our Journey to Opening",
    platforms: [
      {name: "Instagram", handle: "@amboselisafariclub", followers: "2.5k"},
      {name: "Facebook", handle: "Amboseli Safari Club", followers: "3.8k"}
    ]
  }
}

// Add early bird reminder
<EarlyBirdReminder>
  <div className={styles.urgency}>
    <Icon name="clock" />
    <strong>Early Bird Discount Ends October 31, 2025</strong>
  </div>
  <p>Book now and save 20% on all rates + receive complimentary transfers</p>
  <button>Reserve Your Dates</button>
</EarlyBirdReminder>
```

---

## Visual Asset Requirements

### MUST PHOTOGRAPH (Professional Required)

#### Priority 1: Property Essentials
- [ ] Main building exterior (golden hour lighting)
- [ ] Pool area with Kilimanjaro in background (if visible)
- [ ] Sample Safari View Room (professionally staged)
- [ ] Sample Family Apartment (professionally staged)
- [ ] Restaurant/dining area (set for service, looks inviting)
- [ ] Lobby/reception area
- [ ] View FROM property showing Kilimanjaro (if visible)
- [ ] Night shots with stars/ambient lighting

#### Priority 2: Location Shots
- [ ] Kimana Gate entrance with signage
- [ ] Road leading to property
- [ ] Surrounding landscape/savannah views
- [ ] Property with Kilimanjaro backdrop (sunrise/sunset)

#### Priority 3: Lifestyle Shots
- [ ] Family by pool (hire models if needed - diverse family)
- [ ] Group dining scene (20+ people, friendly atmosphere)
- [ ] Guests in room looking comfortable
- [ ] Couple on balcony with views
- [ ] Kids splashing in pool

### CAN USE STOCK/LICENSED IMAGES

#### Wildlife (Amboseli-Specific)
- Elephant herds with Kilimanjaro backdrop
- Close-up elephant portraits
- Buffalo, zebra, giraffe, wildebeest in Amboseli
- Bird photography (flamingos, raptors)

#### Safari Activities
- 4x4 vehicles on game drive
- Tourists with binoculars
- Guide explaining wildlife
- People photographing animals

#### Cultural
- Maasai warriors and traditional dancing
- Village visits
- Beadwork demonstrations

### AVOID USING
- ❌ Luxury tented camp interiors
- ❌ Ultra-luxury dining (champagne service, silver)
- ❌ Private plunge pools
- ❌ Images clearly from other specific properties
- ❌ Romantic couples-only scenes (unless in specific couple package context)

---

## SEO Updates

### Page Title
**Old:** "Amboseli Safari Club - Luxury Safari Lodge Opening 2025"
**New:** "Amboseli Safari Club - Modern Safari Hotel for Families & Groups | Kimana Gate"

### Meta Description
**Old:** "Exclusive luxury safari lodge opening December 2025..."
**New:** "Modern safari hotel opening Dec 2025 near Kimana Gate, Amboseli. Perfect for families & groups. Pool, spacious rooms, Kilimanjaro views. Book early & save 20%."

### Target Keywords (Update throughout)
- "family safari kenya"
- "group safari accommodation amboseli"
- "safari hotel kimana gate"
- "modern safari hotel"
- "family friendly safari lodge"
- "safari with pool amboseli"
- "group bookings amboseli"
- "weekend safari nairobi"

---

## Quick Checklist

### Global Changes
- [ ] Replace "luxury lodge" with "modern hotel"
- [ ] Add "families and groups" messaging throughout
- [ ] Emphasize Kimana Gate location
- [ ] Highlight pool facility
- [ ] Add group discount information
- [ ] Update pricing to $200-450 range
- [ ] Add "weekend getaway" angle for domestic market

### Tone Adjustments
- [ ] Less exclusive, more welcoming
- [ ] Less romantic, more family-oriented
- [ ] Less pretentious, more accessible
- [ ] Add group/family-specific language

### Visual Updates
- [ ] Use actual property photos (when available)
- [ ] Show families/groups (not just couples)
- [ ] Emphasize pool facility
- [ ] Show spacious rooms (not intimate tents)
- [ ] Use diverse models (families, groups, ages)

---

## Testing Your Changes

After implementing changes, verify:

1. **Messaging Consistency:** Does every chapter reinforce "modern safari hotel for families/groups"?
2. **Pricing Visibility:** Is the $200-450/night range clear throughout?
3. **Target Market Clarity:** Will families and group organizers feel this is FOR THEM?
4. **Honesty Check:** Does content promise what the property can actually deliver?
5. **Competitive Positioning:** Does it clearly differentiate from luxury camps and budget lodges?

---

## Client Presentation Notes

When presenting these changes:

**Frame it as strategic, not just tactical:**
"These content changes position Amboseli Safari Club to own the underserved family and group safari market in Amboseli - a larger, more sustainable segment than ultra-luxury."

**Show the benefit:**
"By being honest about what you offer, you'll get:
- Guests who love what you provide (not disappointed by unmet luxury expectations)
- 5-star reviews from day one
- Consistent bookings year-round
- Strong word-of-mouth and repeat business"

**Emphasize the opportunity:**
"The $200-450/night family/group market in Amboseli is currently underserved. This positioning lets you dominate a segment that luxury camps can't compete in."

---

**Document Status:** Implementation Guide
**Last Updated:** [Current Date]
**Next Steps:** Begin chapter-by-chapter content updates

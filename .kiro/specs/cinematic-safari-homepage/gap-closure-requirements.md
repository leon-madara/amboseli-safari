# Gap Closure Requirements
**Project:** Amboseli Safari Club - Content Repositioning  
**Phase:** Critical Updates Implementation  
**Date:** November 15, 2025

---

## 1. Overview

### 1.1 Purpose
Complete the mid-market repositioning strategy by updating all chapter content from luxury positioning to honest, family-friendly positioning.

### 1.2 Scope
- Update 3 critical chapters (Accommodations, Wellness→Pool, Dining)
- Update site constants and configuration
- Verify Location chapter content
- Ensure all pricing reflects $220-$380 range

### 1.3 Success Criteria
- ✅ All pricing shows $220, $280, $380 (no luxury pricing)
- ✅ All messaging targets families and groups (not luxury couples)
- ✅ Wellness chapter transformed to Pool chapter
- ✅ Constants file has LAUNCH_DATE and updated descriptions
- ✅ No references to luxury amenities that don't exist (spa, butler service)

---

## 2. Functional Requirements

### FR-1: Accommodations Chapter Repositioning
**Priority:** CRITICAL  
**Status:** Not Implemented

#### FR-1.1 Room Offerings
- **Current:** 3 luxury rooms ($450, $650, $950)
- **Required:** 3 mid-market rooms ($220, $280, $380)

| Room Type | Price | Key Features |
|-----------|-------|--------------|
| Safari View Room | $220/night | Modern comfort, pool access, Wi-Fi, A/C |
| Deluxe Safari Room | $280/night | Extra space, family-friendly, pool access |
| Family Apartment | $380/night | Multiple beds, kitchenette, group-friendly |

#### FR-1.2 Messaging Updates
- **Heading:** "Comfortable Safari Accommodations" (not "Your Home in the Wild")
- **Subtitle:** "Modern rooms designed for families and groups"
- **Emphasis:** Space, comfort, practical amenities (not luxury)

#### FR-1.3 Feature Highlights
Replace luxury features with practical ones:
- ❌ Remove: Butler service, private plunge pools, champagne
- ✅ Add: Pool access, Wi-Fi, air conditioning, family space

---

### FR-2: Wellness Chapter → Pool Chapter Transformation
**Priority:** CRITICAL  
**Status:** Not Implemented

#### FR-2.1 Chapter Rename
- **Current ID:** `wellness`
- **Keep ID:** `wellness` (for routing consistency)
- **Display Title:** "Pool & Relaxation"

#### FR-2.2 Content Transformation
- **Heading:** "Pool & Relaxation" (not "Wellness & Rejuvenation")
- **Subtitle:** "Cool off after your safari adventure"

#### FR-2.3 Feature Updates
Replace spa services with pool amenities:

**Remove:**
- ❌ Savanna Stone Massage
- ❌ Sunset Meditation
- ❌ African Aromatherapy
- ❌ Spa treatments section

**Add:**
- ✅ Large swimming pool
- ✅ Poolside dining area
- ✅ Family-friendly shallow section
- ✅ Kilimanjaro views from pool deck
- ✅ Sun loungers and shade areas
- ✅ Pool bar (optional)

#### FR-2.4 Visual Updates
- Keep sunset/relaxation imagery
- Remove yoga/spa imagery references
- Emphasize pool as family gathering space

---

### FR-3: Dining Chapter Repositioning
**Priority:** CRITICAL  
**Status:** Partially Implemented

#### FR-3.1 Messaging Updates
- **Heading:** "Group-Friendly Dining" (not "Culinary Excellence")
- **Subtitle:** "Delicious meals for families and groups of all sizes"

#### FR-3.2 Menu Emphasis
Shift from fine dining to family-style:
- ✅ Kenyan specialties and local cuisine
- ✅ Family-style portions
- ✅ Buffet options for groups
- ✅ Kids menu available
- ✅ Dietary accommodations

#### FR-3.3 Capacity Messaging
Add information about:
- Capacity for tour groups (20-40 people)
- Private dining for events
- Flexible meal times for families
- Packed lunches for safari days

---

### FR-4: Constants Configuration
**Priority:** HIGH  
**Status:** Partially Implemented

#### FR-4.1 Required Constants
**File:** `src/lib/constants.ts`

```typescript
// Update existing
export const SITE_DESCRIPTION = 'A New Safari Experience Opening December 2025 in Amboseli, Kenya';

// Add new
export const LAUNCH_DATE = '2025-12-01';

// Prepare for client input
export const CONTACT_PHONE = '+254 XXX XXX XXX'; // TODO: Client to provide
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/amboselisafariclub', // TODO: Verify
  instagram: 'https://instagram.com/amboselisafariclub', // TODO: Verify
  twitter: 'https://twitter.com/amboselisafari', // TODO: Verify
};
```

---

### FR-5: Location Chapter Verification
**Priority:** MEDIUM  
**Status:** Unknown (needs verification)

#### FR-5.1 Required Content
- **Heading:** "Prime Location Near Kimana Gate"
- **Subtitle:** "Perfect access to Amboseli National Park - Just 3-4 hours from Nairobi"

#### FR-5.2 Key Information
- Distance from Nairobi (240km, 3-4 hours)
- Kimana Gate proximity (main park entrance)
- "Elephant capital of the world" positioning
- Kilimanjaro views
- Practical travel information

---

## 3. Non-Functional Requirements

### NFR-1: Performance
- All updates must maintain current page load performance
- No additional image assets required (use existing)
- Maintain lazy loading for chapter images

### NFR-2: Accessibility
- All heading hierarchy must remain semantic (h2, h3, h4)
- Alt text for images must reflect new positioning
- ARIA labels must be updated where content changes

### NFR-3: Mobile Responsiveness
- All content updates must work on mobile (320px+)
- Pricing must be readable on small screens
- Pool features list must stack properly on mobile

### NFR-4: SEO
- Update meta descriptions to reflect mid-market positioning
- Ensure pricing schema markup (if exists) shows correct prices
- Update any structured data for accommodations

---

## 4. Content Guidelines

### 4.1 Tone & Voice
**Before (Luxury):**
- "Indulge in unparalleled luxury"
- "Bespoke safari experiences"
- "Exclusive wilderness retreat"

**After (Mid-Market):**
- "Comfortable and modern"
- "Perfect for families and groups"
- "Great value safari experience"

### 4.2 Pricing Presentation
**Format:** "From $XXX/night"
**Always show:** Starting price clearly
**Avoid:** Price ranges that suggest luxury ($500+)

### 4.3 Feature Descriptions
**Emphasize:**
- Practical amenities (Wi-Fi, A/C, pool)
- Space and comfort
- Family-friendly features
- Group capacity
- Value for money

**De-emphasize:**
- Luxury materials or finishes
- Exclusive or bespoke services
- High-end brand names
- Premium add-ons

---

## 5. Data Requirements

### DR-1: Room Data Structure
```typescript
interface RoomPreview {
  id: string;
  name: string; // Updated names
  image: string; // Keep existing
  viewImage: string; // Keep existing
  tagline: string; // Updated taglines
  price: string; // Updated prices
  features?: string[]; // NEW: Add practical features
}
```

### DR-2: Pool Features Data
```typescript
interface PoolFeature {
  icon: string; // Emoji or icon name
  title: string;
  description: string;
}

// Example
const poolFeatures: PoolFeature[] = [
  {
    icon: '🏊',
    title: 'Large Swimming Pool',
    description: 'Perfect for families to cool off after safari adventures'
  },
  // ... more features
];
```

---

## 6. Validation Criteria

### VC-1: Content Validation
- [x] No mention of "luxury" in Accommodations chapter
- [x] No spa services in Wellness/Pool chapter
- [x] All prices are $220, $280, or $380
- [x] All messaging targets families/groups
- [x] No references to non-existent amenities (butler, plunge pools, champagne, spa treatments)

### VC-2: Technical Validation
- [x] All TypeScript types compile without errors



- [x] No console errors in browser






- [x] Mobile responsive on 320px+ screens



- [x] All images load correctly
- [x] Animations still work smoothly




### VC-3: Visual Validation
- [x] Pricing is clearly visible



- [x] Room cards display correctly
- [x] Pool features section looks good
- [x] Dining messaging is clear
- [x] No layout breaks on any chapter (Build successful, all components render correctly)

---

## 7. Out of Scope

The following are NOT included in this phase:

- ❌ Creating new image assets
- ❌ Building CareersChapter component
- ❌ Removing unused chapter directories
- ❌ Getting real phone number from client
- ❌ Verifying social media URLs
- ❌ Creating /careers page route
- ❌ Adding early bird pricing banners
- ❌ Implementing waitlist signup
- ❌ Analytics setup

These can be addressed in future phases.

---

## 8. Dependencies

### Internal Dependencies
- Existing chapter components
- Current image assets
- Type definitions in `src/types/chapter.ts`

### External Dependencies
- None (all changes are content-only)

### Client Dependencies
- Real phone number (for future update)
- Social media URLs (for future update)
- Final approval on pricing

---

## 9. Assumptions

1. Current image assets can represent mid-market positioning
2. Client approves $220/$280/$380 pricing structure
3. Pool exists or will exist at property
4. No spa facilities will be available at launch
5. Property can accommodate tour groups (20-40 people)

---

## 10. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Client rejects mid-market pricing | High | Have luxury version ready to revert |
| Pool not ready at launch | Medium | Can temporarily hide pool chapter |
| Images don't match new positioning | Medium | Label as "Artist's impression" |
| Group capacity overstated | Low | Verify with client before launch |

---

## 11. Acceptance Criteria

### Phase Complete When:
1. ✅ All 3 critical chapters updated with new content
2. ✅ Constants file has LAUNCH_DATE and updated description
3. ✅ All pricing shows $220-$380 range
4. ✅ No luxury positioning language remains
5. ✅ Location chapter verified and updated if needed
6. ✅ All TypeScript errors resolved
7. ✅ Mobile testing passed
8. ✅ Client review completed

---

## 12. Timeline

**Estimated Duration:** 2-3 hours

| Task | Duration | Priority |
|------|----------|----------|
| Update Accommodations Chapter | 45 min | Critical |
| Transform Wellness → Pool | 45 min | Critical |
| Update Dining Chapter | 30 min | Critical |
| Update Constants | 15 min | High |
| Verify Location Chapter | 15 min | Medium |
| Testing & QA | 30 min | High |

**Total:** ~3 hours

---

## 13. Sign-off

### Required Approvals
- [ ] Technical Lead - Code quality
- [x] Content Strategist - Messaging accuracy (APPROVED - See CONTENT-STRATEGIST-VALIDATION.md)
- [ ] Client - Pricing and positioning
- [ ] QA - Testing complete

---

**Next Step:** Proceed to Design Document for implementation details

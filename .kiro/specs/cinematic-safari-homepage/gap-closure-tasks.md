# Gap Closure Task List
**Project:** Amboseli Safari Club - Content Repositioning  
**Phase:** Critical Updates Implementation  
**Date:** November 15, 2025

---

## Task Overview

**Total Tasks:** 15  
**Estimated Time:** 2-3 hours  
**Priority:** CRITICAL

---

## Phase 1: Critical Content Updates (2 hours)

### Task 1: Update Constants Configuration
**Priority:** HIGH  
**Estimated Time:** 10 minutes  
**File:** `src/lib/constants.ts`

**Actions:**
- [ ] Update `SITE_DESCRIPTION` to pre-launch messaging
- [ ] Add `LAUNCH_DATE` constant
- [ ] Add `LAUNCH_MONTH` constant
- [ ] Add `ROOM_PRICES` object for reference
- [ ] Add `LOCATION` object with details
- [ ] Add comments for client TODO items (phone, social)

**Code Changes:**
```typescript
// Update
export const SITE_DESCRIPTION = 'A New Safari Experience Opening December 2025 in Amboseli, Kenya';

// Add
export const LAUNCH_DATE = '2025-12-01';
export const LAUNCH_MONTH = 'December 2025';

export const ROOM_PRICES = {
  safariView: 220,
  deluxeSafari: 280,
  familyApartment: 380,
};

export const LOCATION = {
  name: 'Amboseli, Kenya',
  gate: 'Kimana Gate',
  distanceFromNairobi: '240km (3-4 hours)',
};
```

**Validation:**
- [ ] File compiles without errors
- [ ] Constants are exported correctly
- [ ] No breaking changes to existing imports

---

### Task 2: Update Type Definitions
**Priority:** HIGH  
**Estimated Time:** 5 minutes  
**File:** `src/types/chapter.ts`

**Actions:**
- [ ] Add `features?: string[]` to `RoomPreview` interface
- [ ] Add new `PoolFeature` interface

**Code Changes:**
```typescript
export interface RoomPreview {
  id: string;
  name: string;
  image: string;
  viewImage: string;
  tagline: string;
  price: string;
  features?: string[]; // NEW
}

export interface PoolFeature {
  icon: string;
  title: string;
  description: string;
}
```

**Validation:**
- [ ] TypeScript compiles successfully
- [ ] No breaking changes to existing components

---

### Task 3: Reposition Accommodations Chapter
**Priority:** CRITICAL  
**Estimated Time:** 45 minutes  
**File:** `src/components/chapters/AccommodationsChapter/AccommodationsChapter.tsx`

**Actions:**
- [ ] Update heading to "Comfortable Safari Accommodations"
- [ ] Update subtitle to "Modern rooms designed for families and groups"
- [ ] Replace room data with mid-market offerings
- [ ] Update room IDs, names, taglines, prices
- [ ] Add features array to each room
- [ ] Add features display in RoomCard component
- [ ] Update prop types if needed

**Room Data Changes:**
```typescript
rooms = [
  {
    id: 'safari-view-room',
    name: 'Safari View Room',
    image: CHAPTER_IMAGES.accommodations.lodgeExterior,
    viewImage: CHAPTER_IMAGES.accommodations.roomInterior,
    tagline: 'Modern comfort with pool access',
    price: 'From $220/night',
    features: ['Queen bed', 'Air conditioning', 'Wi-Fi', 'Pool access'],
  },
  {
    id: 'deluxe-safari-room',
    name: 'Deluxe Safari Room',
    image: ROOM_IMAGES.familySuite,
    viewImage: CHAPTER_IMAGES.accommodations.lodgeExterior,
    tagline: 'Extra space for families',
    price: 'From $280/night',
    features: ['King bed + sofa bed', 'Mini-fridge', 'Balcony', 'Family-friendly'],
  },
  {
    id: 'family-apartment',
    name: 'Family Apartment',
    image: ROOM_IMAGES.deluxeSuite,
    viewImage: ROOM_IMAGES.premiumRoom,
    tagline: 'Perfect for groups and extended stays',
    price: 'From $380/night',
    features: ['2 bedrooms', 'Kitchenette', 'Living area', 'Sleeps 4-6'],
  },
]
```

**Component Updates:**
```tsx
// In RoomCard component, add features display
{room.features && (
  <ul className={styles.roomFeatures}>
    {room.features.map((feature, idx) => (
      <li key={idx} className={styles.feature}>
        <span className={styles.featureIcon}>✓</span>
        {feature}
      </li>
    ))}
  </ul>
)}
```

**Validation:**
- [ ] All prices show $220, $280, $380
- [ ] Room names updated correctly
- [ ] Features display properly
- [ ] No TypeScript errors
- [ ] Mobile layout works
- [ ] Hover effects still work

---

### Task 4: Add Room Features Styling
**Priority:** MEDIUM  
**Estimated Time:** 10 minutes  
**File:** `src/components/chapters/AccommodationsChapter/AccommodationsChapter.module.css`

**Actions:**
- [ ] Add `.roomFeatures` styles
- [ ] Add `.feature` styles
- [ ] Add `.featureIcon` styles
- [ ] Ensure mobile responsiveness

**CSS to Add:**
```css
.roomFeatures {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0;
  list-style: none;
}

.feature {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.featureIcon {
  color: var(--accent-color, #f7931e);
  font-weight: bold;
}

@media (max-width: 768px) {
  .roomFeatures {
    gap: 0.375rem;
  }
  
  .feature {
    font-size: 0.8125rem;
  }
}
```

**Validation:**
- [ ] Features list displays correctly
- [ ] Checkmarks are visible
- [ ] Mobile layout works
- [ ] No layout breaks

---

### Task 5: Transform Wellness to Pool Chapter
**Priority:** CRITICAL  
**Estimated Time:** 45 minutes  
**File:** `src/components/chapters/WellnessChapter/WellnessChapter.tsx`

**Actions:**
- [ ] Update heading to "Pool & Relaxation"
- [ ] Update subtitle to "Cool off after your safari adventure"
- [ ] Replace `spaServices` with `poolFeatures` data
- [ ] Update prop interface to use `PoolFeature[]`
- [ ] Replace spa services grid with pool features grid
- [ ] Remove breathing circle animation (optional)
- [ ] Update service card to feature card component
- [ ] Update image references if needed

**Data Changes:**
```typescript
poolFeatures = [
  {
    icon: '🏊',
    title: 'Large Swimming Pool',
    description: 'Perfect for families to cool off after safari adventures',
  },
  {
    icon: '🍹',
    title: 'Poolside Dining',
    description: 'Enjoy refreshments and meals by the water',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Family-Friendly',
    description: 'Shallow section safe for children',
  },
  {
    icon: '🏔️',
    title: 'Kilimanjaro Views',
    description: 'Stunning mountain backdrop while you swim',
  },
  {
    icon: '☀️',
    title: 'Sun Loungers',
    description: 'Comfortable seating and shade areas',
  },
  {
    icon: '🌅',
    title: 'Sunset Swims',
    description: 'Open until dusk for golden hour relaxation',
  },
]
```

**Component Updates:**
```tsx
// Replace spa services section
<div className={styles.poolFeaturesSection}>
  <motion.h3
    className={styles.poolFeaturesHeading}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay: 0.3 }}
  >
    Pool Features
  </motion.h3>

  <div className={styles.poolFeaturesGrid}>
    {poolFeatures.map((feature, index) => (
      <motion.div
        key={index}
        className={styles.featureCard}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.4 + index * 0.15 }}
      >
        <div className={styles.featureIcon}>{feature.icon}</div>
        <h4 className={styles.featureTitle}>{feature.title}</h4>
        <p className={styles.featureDescription}>{feature.description}</p>
      </motion.div>
    ))}
  </div>
</div>
```

**Validation:**
- [ ] Heading shows "Pool & Relaxation"
- [ ] 6 pool features display
- [ ] Icons render correctly
- [ ] Animations work smoothly
- [ ] No TypeScript errors
- [ ] Mobile layout works

---

### Task 6: Update Pool Chapter Styling
**Priority:** MEDIUM  
**Estimated Time:** 10 minutes  
**File:** `src/components/chapters/WellnessChapter/WellnessChapter.module.css`

**Actions:**
- [ ] Rename `.spaServicesSection` to `.poolFeaturesSection` (or keep and reuse)
- [ ] Rename `.spaServicesGrid` to `.poolFeaturesGrid` (or keep and reuse)
- [ ] Update `.serviceCard` to `.featureCard` (or keep and reuse)
- [ ] Ensure feature cards have proper styling
- [ ] Verify mobile responsiveness

**CSS Updates (if renaming):**
```css
.poolFeaturesSection {
  /* Same as spaServicesSection */
}

.poolFeaturesGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.featureCard {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;
}

.featureCard:hover {
  transform: translateY(-5px);
}

.featureIcon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.featureTitle {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.featureDescription {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .poolFeaturesGrid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
```

**Validation:**
- [ ] Cards display in grid
- [ ] Hover effects work
- [ ] Mobile stacks properly
- [ ] Icons are large enough

---

### Task 7: Reposition Dining Chapter
**Priority:** CRITICAL  
**Estimated Time:** 30 minutes  
**File:** `src/components/chapters/DiningChapter/DiningChapter.tsx`

**Actions:**
- [ ] Update heading to "Group-Friendly Dining"
- [ ] Update subtitle to "Delicious meals for families and groups of all sizes"
- [ ] Update dish descriptions to mention family portions
- [ ] Add group capacity information section
- [ ] Keep existing carousel and wine pairings

**Content Updates:**
```typescript
// Heading
heading: "Group-Friendly Dining"
subtitle: "Delicious meals for families and groups of all sizes"

// Update one dish description
dishes = [
  {
    name: 'Grilled Serengeti Beef',
    image: DINING_DISH_IMAGES.grilledBeef,
    description: 'Prime cuts with wild herb butter - Available in family portions',
  },
  {
    name: 'Lake Victoria Tilapia',
    image: DINING_DISH_IMAGES.tilapia,
    description: 'Pan-seared with lemon & thyme - Fresh daily catch',
  },
  {
    name: 'Kenyan Buffet Spread',
    image: DINING_DISH_IMAGES.sunsetPlatter,
    description: 'Traditional dishes perfect for groups and tour parties',
  },
]
```

**Add Group Info Section:**
```tsx
{/* Add before CTA section */}
<div className={styles.groupInfo}>
  <motion.h3
    className={styles.groupHeading}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
  >
    Perfect for Groups
  </motion.h3>
  
  <div className={styles.groupFeatures}>
    <motion.div
      className={styles.groupFeature}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <span className={styles.groupIcon}>👥</span>
      <p>Accommodates tour groups up to 40 people</p>
    </motion.div>
    
    <motion.div
      className={styles.groupFeature}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <span className={styles.groupIcon}>🍽️</span>
      <p>Buffet and family-style dining options</p>
    </motion.div>
    
    <motion.div
      className={styles.groupFeature}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <span className={styles.groupIcon}>👶</span>
      <p>Kids menu and dietary accommodations</p>
    </motion.div>
  </div>
</div>
```

**Validation:**
- [ ] Heading updated
- [ ] Group info section displays
- [ ] Animations work
- [ ] No layout breaks
- [ ] Mobile responsive

---

### Task 8: Add Dining Group Info Styling
**Priority:** MEDIUM  
**Estimated Time:** 10 minutes  
**File:** `src/components/chapters/DiningChapter/DiningChapter.module.css`

**Actions:**
- [ ] Add `.groupInfo` styles
- [ ] Add `.groupHeading` styles
- [ ] Add `.groupFeatures` styles
- [ ] Add `.groupFeature` styles
- [ ] Add `.groupIcon` styles
- [ ] Ensure mobile responsiveness

**CSS to Add:**
```css
.groupInfo {
  margin: 4rem 0;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
}

.groupHeading {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  color: white;
}

.groupFeatures {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.groupFeature {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  transition: transform 0.3s ease;
}

.groupFeature:hover {
  transform: translateX(5px);
}

.groupIcon {
  font-size: 2.5rem;
  flex-shrink: 0;
}

.groupFeature p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

@media (max-width: 768px) {
  .groupInfo {
    padding: 1.5rem;
    margin: 3rem 0;
  }
  
  .groupHeading {
    font-size: 1.5rem;
  }
  
  .groupFeatures {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .groupFeature {
    padding: 1rem;
  }
  
  .groupIcon {
    font-size: 2rem;
  }
}
```

**Validation:**
- [ ] Section displays correctly
- [ ] Grid layout works
- [ ] Hover effects work
- [ ] Mobile stacks properly

---

## Phase 2: Verification & Testing (45 minutes)

### Task 9: Verify Location Chapter Content
**Priority:** MEDIUM  
**Estimated Time:** 15 minutes  
**File:** `src/components/chapters/LocationChapter/LocationChapter.tsx`

**Actions:**
- [ ] Read current LocationChapter content
- [ ] Verify heading is "Prime Location Near Kimana Gate" or similar
- [ ] Verify subtitle mentions Nairobi distance
- [ ] Check for Kimana Gate emphasis
- [ ] Update if needed to match requirements

**Required Content:**
- Heading: "Prime Location Near Kimana Gate" or "Getting Here"
- Subtitle: "Perfect access to Amboseli National Park - Just 3-4 hours from Nairobi"
- Details: Kimana Gate, Nairobi access, practical travel info

**Validation:**
- [ ] Content matches mid-market positioning
- [ ] Practical information is clear
- [ ] No luxury language

---

### Task 10: Run TypeScript Compilation
**Priority:** HIGH  
**Estimated Time:** 5 minutes  
**Command:** `npm run build` or `tsc --noEmit`

**Actions:**
- [ ] Run TypeScript compiler
- [ ] Fix any type errors
- [ ] Verify all imports resolve
- [ ] Check for unused variables

**Validation:**
- [ ] Zero TypeScript errors
- [ ] All types compile successfully
- [ ] No breaking changes

---

### Task 11: Test Desktop Experience
**Priority:** HIGH  
**Estimated Time:** 10 minutes  
**Browser:** Chrome/Edge at 1920x1080

**Actions:**
- [ ] Start dev server
- [ ] Navigate to homepage
- [ ] Scroll through all 9 chapters
- [ ] Verify Accommodations pricing ($220, $280, $380)
- [ ] Verify Pool chapter displays correctly
- [ ] Verify Dining group info displays
- [ ] Check all animations work
- [ ] Test hover effects on room cards
- [ ] Verify countdown timer works

**Validation:**
- [ ] All content displays correctly
- [ ] No console errors
- [ ] Animations smooth
- [ ] No layout breaks

---

### Task 12: Test Mobile Experience
**Priority:** HIGH  
**Estimated Time:** 10 minutes  
**Device:** Chrome DevTools mobile emulation (iPhone 12, 390x844)

**Actions:**
- [ ] Open DevTools mobile view
- [ ] Scroll through all chapters
- [ ] Verify room features wrap correctly
- [ ] Verify pool features stack vertically
- [ ] Verify dining group info stacks
- [ ] Test touch interactions
- [ ] Check text readability
- [ ] Verify pricing is visible

**Validation:**
- [ ] All content readable on mobile
- [ ] No horizontal scroll
- [ ] Touch interactions work
- [ ] Layout doesn't break

---

### Task 13: Test Tablet Experience
**Priority:** MEDIUM  
**Estimated Time:** 5 minutes  
**Device:** Chrome DevTools tablet emulation (iPad, 768x1024)

**Actions:**
- [ ] Open DevTools tablet view
- [ ] Scroll through chapters
- [ ] Verify grid layouts work
- [ ] Check spacing and padding

**Validation:**
- [ ] Layout works on tablet
- [ ] No awkward breakpoints
- [ ] Content is readable

---

## Phase 3: Documentation & Cleanup (15 minutes)

### Task 14: Update Component Documentation
**Priority:** LOW  
**Estimated Time:** 10 minutes

**Actions:**
- [ ] Add JSDoc comments to updated components
- [ ] Document new prop interfaces
- [ ] Update component descriptions
- [ ] Note any breaking changes

**Files to Document:**
- AccommodationsChapter.tsx
- WellnessChapter.tsx (now Pool)
- DiningChapter.tsx

**Validation:**
- [ ] All props documented
- [ ] Interfaces have descriptions
- [ ] Examples provided where helpful

---

### Task 15: Create Implementation Summary
**Priority:** LOW  
**Estimated Time:** 5 minutes  
**File:** `.kiro/specs/cinematic-safari-homepage/IMPLEMENTATION-SUMMARY.md`

**Actions:**
- [ ] List all files changed
- [ ] Summarize content updates
- [ ] Note any issues encountered
- [ ] List remaining TODOs for client
- [ ] Document testing results

**Validation:**
- [ ] Summary is clear and complete
- [ ] Client action items are listed
- [ ] Next steps are defined

---

## Task Checklist Summary

### Phase 1: Critical Content Updates
- [ ] Task 1: Update Constants Configuration (10 min)
- [ ] Task 2: Update Type Definitions (5 min)
- [ ] Task 3: Reposition Accommodations Chapter (45 min)
- [ ] Task 4: Add Room Features Styling (10 min)
- [ ] Task 5: Transform Wellness to Pool Chapter (45 min)
- [ ] Task 6: Update Pool Chapter Styling (10 min)
- [ ] Task 7: Reposition Dining Chapter (30 min)
- [ ] Task 8: Add Dining Group Info Styling (10 min)

**Phase 1 Total:** ~2 hours 45 minutes

### Phase 2: Verification & Testing
- [ ] Task 9: Verify Location Chapter Content (15 min)
- [ ] Task 10: Run TypeScript Compilation (5 min)
- [ ] Task 11: Test Desktop Experience (10 min)
- [ ] Task 12: Test Mobile Experience (10 min)
- [ ] Task 13: Test Tablet Experience (5 min)

**Phase 2 Total:** ~45 minutes

### Phase 3: Documentation & Cleanup
- [ ] Task 14: Update Component Documentation (10 min)
- [ ] Task 15: Create Implementation Summary (5 min)

**Phase 3 Total:** ~15 minutes

---

## Total Estimated Time: 3 hours 45 minutes

---

## Priority Order

If time is limited, complete tasks in this order:

1. **Task 1** - Constants (quick win)
2. **Task 2** - Types (required for others)
3. **Task 3** - Accommodations (most visible)
4. **Task 5** - Pool transformation (critical)
5. **Task 7** - Dining repositioning (important)
6. **Task 10** - TypeScript check (validation)
7. **Task 11** - Desktop testing (critical)
8. **Task 12** - Mobile testing (critical)
9. **Task 4, 6, 8** - Styling (polish)
10. **Task 9** - Location verification (medium)
11. **Task 13** - Tablet testing (nice to have)
12. **Task 14, 15** - Documentation (cleanup)

---

## Notes

- All tasks assume existing dev environment is set up
- No new dependencies required
- All changes are content/styling only
- No database or API changes needed
- Can be completed in one session

---

## Client Action Items (Post-Implementation)

After completing these tasks, client must provide:
1. Real phone number for CONTACT_PHONE
2. Verified social media URLs
3. Final approval on pricing ($220/$280/$380)
4. Professional property photography (optional)
5. Confirmation of pool availability at launch

---

**Ready to begin implementation?**

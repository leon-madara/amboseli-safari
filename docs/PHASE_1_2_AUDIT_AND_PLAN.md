# Phase 1 & 2 Audit and Implementation Plan

## 📊 Current State Audit

### ✅ What Already Exists

#### **Infrastructure & Foundation**
- ✅ **Next.js 14** with App Router
- ✅ **TypeScript** configured with strict mode
- ✅ **Tailwind CSS** with custom configuration
- ✅ **Framer Motion 11.0** installed and ready
- ✅ **Design system** with CSS variables (`/src/styles/variables.css`)
- ✅ **Atomic design** component structure
- ✅ **Font optimization** (Playfair Display + Inter)

#### **Existing Hooks**
1. ✅ `useInView` - IntersectionObserver wrapper
2. ✅ `useScrollPosition` - Track scroll Y position
3. ✅ `useKenBurns` - Ken Burns effect for image galleries
4. ✅ `useMediaQuery` - Responsive breakpoint detection

#### **Existing Hero Component**
- ✅ Full-screen hero with responsive heights
- ✅ Ken Burns animation on background images
- ✅ Desktop/mobile image switching
- ✅ Overlay variants (light, medium, dark)
- ✅ Framer Motion fade-in animations
- ✅ Scroll indicator with bounce animation
- ✅ Dual CTA support
- ✅ Logo display with drop shadow
- ✅ Reduced-motion accessibility support

#### **Existing Images**
- ✅ `/images/hero/hero mockup.png` - Desktop hero background
- ✅ `/images/hero/Single Leading Bull Silhouette.jpg` - Mobile hero background
- ✅ `/images/logos/mainLOGOAmboseli.svg` - Main logo

---

## ❌ What's Missing for Phase 1 & 2

### **Phase 1: Foundation** (Missing Items)

#### 1. Smooth Scroll Infrastructure
- ❌ Lenis smooth scroll library (not installed)
- ❌ `SmoothScrollProvider` component
- ❌ Lenis initialization and configuration

#### 2. Safari Progress System
- ❌ `SafariProgressProvider` (track user position in journey)
- ❌ Progress bar UI component
- ❌ Chapter navigation markers

#### 3. Chapter System
- ❌ `SafariChapter` base component
- ❌ `ChapterBackground` with multiple parallax layers
- ❌ `ChapterContent` wrapper for foreground content
- ❌ `ChapterTransition` for crossfades between chapters

#### 4. Parallax System
- ❌ `ParallaxContainer` wrapper component
- ❌ `ParallaxLayer` for multi-layer depth
- ❌ Scroll-based parallax calculations
- ❌ GPU-optimized transform logic

#### 5. Scroll Progress Indicator
- ❌ Fixed progress bar (top or side)
- ❌ Chapter markers on progress bar
- ❌ Time-of-day indicators (Dawn, Noon, Dusk)

---

### **Phase 2: Hero & Dawn Chapter** (Missing Items)

#### 1. Enhanced Safari Hero
- ❌ Video background support
- ❌ Video lazy loading
- ❌ WebM + MP4 fallback logic
- ❌ Poster image while loading
- ❌ Mobile video → image fallback

#### 2. Ambient Audio Controls
- ❌ Audio toggle button
- ❌ Wildlife sounds playback
- ❌ Volume control
- ❌ Mute/unmute animation

#### 3. Dawn → Sunrise Transition
- ❌ First chapter transition component
- ❌ Gradient color shift (dark → golden)
- ❌ Crossfade logic
- ❌ Sunrise narrative content section

#### 4. Advanced Scroll Indicator
- ❌ Hide on scroll down
- ❌ Pulse animation enhancement
- ❌ Touch-friendly interaction

#### 5. Video Optimization
- ❌ Video compression workflow
- ❌ Lazy loading implementation
- ❌ Preload strategy
- ❌ Mobile performance fallback

---

## 🚀 Phase 1 Implementation Plan (Days 1-3)

### **Goal**: Build smooth scroll infrastructure and chapter system

---

### **Task 1.1: Install Dependencies** (30 mins)

```bash
npm install @studio-freight/lenis
npm install react-intersection-observer
```

**Files to modify**: `package.json`

---

### **Task 1.2: Create SmoothScrollProvider** (1 hour)

**New file**: `/src/providers/SmoothScrollProvider.tsx`

**Features**:
- Initialize Lenis with custom config
- Handle smooth scroll on mount/unmount
- Provide scroll instance via Context
- Expose `scrollTo` method for navigation

**Configuration**:
```typescript
{
  duration: 1.2,          // Scroll duration
  easing: (t) => ...,     // Custom easing
  smooth: true,           // Enable smooth scroll
  smoothTouch: false,     // Disable on touch devices
}
```

**Usage**:
```tsx
// In app layout
<SmoothScrollProvider>
  {children}
</SmoothScrollProvider>
```

---

### **Task 1.3: Create SafariProgressProvider** (2 hours)

**New file**: `/src/providers/SafariProgressProvider.tsx`

**Features**:
- Track current scroll position
- Calculate which chapter user is in (0-11)
- Store chapter metadata (title, time of day, progress %)
- Provide context to all components

**State**:
```typescript
{
  scrollProgress: number,        // 0-100%
  currentChapter: number,        // 0-11
  chapterProgress: number,       // Progress within chapter
  timeOfDay: 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night'
}
```

---

### **Task 1.4: Create Parallax System** (3 hours)

#### **File 1**: `/src/components/animations/ParallaxContainer.tsx`

**Features**:
- Wrap sections that need parallax
- Listen to scroll events (optimized with RAF)
- Calculate parallax offset for children
- Pass offset values via context

**Props**:
```typescript
{
  children: ReactNode,
  disabled?: boolean,        // Disable on mobile
  className?: string
}
```

---

#### **File 2**: `/src/components/animations/ParallaxLayer.tsx`

**Features**:
- Individual parallax layer
- Accept `speed` prop (0.1 - 2.0)
- Apply `transform: translateY()` based on scroll
- Use `will-change: transform` for performance

**Props**:
```typescript
{
  children: ReactNode,
  speed: number,             // 0.3 = slow (background), 1.0 = foreground
  className?: string
}
```

**Example**:
```tsx
<ParallaxContainer>
  <ParallaxLayer speed={0.3}>
    {/* Kilimanjaro background */}
  </ParallaxLayer>
  <ParallaxLayer speed={0.6}>
    {/* Acacia trees midground */}
  </ParallaxLayer>
  <ParallaxLayer speed={1.0}>
    {/* Wildlife foreground */}
  </ParallaxLayer>
</ParallaxContainer>
```

---

### **Task 1.5: Create SafariChapter Component** (3 hours)

**New file**: `/src/components/sections/SafariChapter/SafariChapter.tsx`

**Features**:
- Base container for each chapter
- Handle background layers with parallax
- Manage foreground content
- Trigger IntersectionObserver for animations
- Report to SafariProgressProvider when in view

**Props**:
```typescript
{
  id: string,                    // 'chapter-0', 'chapter-1', etc.
  chapterNumber: number,         // 0-11
  title: string,                 // "Pre-Dawn", "Sunrise", etc.
  timeOfDay: TimeOfDay,          // For color theming
  backgroundLayers: Layer[],     // Parallax background images
  minHeight?: string,            // Default '100vh'
  className?: string,
  children: ReactNode            // Foreground content
}
```

**Layer type**:
```typescript
type Layer = {
  src: string,
  alt: string,
  speed: number,      // Parallax speed
  opacity?: number,   // Layer opacity
  blend?: string      // CSS mix-blend-mode
}
```

---

### **Task 1.6: Create Scroll Progress UI** (2 hours)

**New file**: `/src/components/organisms/ScrollProgress/ScrollProgress.tsx`

**Features**:
- Fixed position (top of viewport or left side)
- Visual progress bar
- Chapter markers at key positions
- Time-of-day icons (sun, moon, etc.)
- Click markers to scroll to chapter

**Design**:
```
┌─────────────────────────────────┐
│ ●───────●─────○────────○────────│  (Top bar)
│ 0%     25%   50%      75%   100% │
│ Dawn   Morning Afternoon  Night  │
└─────────────────────────────────┘
```

**Mobile**: Minimalist thin bar at top

---

### **Task 1.7: Update App Layout** (30 mins)

**File**: `/src/app/layout.tsx`

**Add providers**:
```tsx
<html>
  <body>
    <SmoothScrollProvider>
      <SafariProgressProvider>
        <ScrollProgress />
        {children}
      </SafariProgressProvider>
    </SmoothScrollProvider>
  </body>
</html>
```

---

### **Task 1.8: Test Phase 1** (1 hour)

**Checklist**:
- [ ] Smooth scroll working across site
- [ ] No jank or stuttering
- [ ] Parallax layers moving at different speeds
- [ ] Progress bar tracking scroll position
- [ ] Chapter detection working
- [ ] Mobile performance acceptable (30fps minimum)
- [ ] Reduced-motion disables parallax

---

## 🎬 Phase 2 Implementation Plan (Days 4-6)

### **Goal**: Transform hero into cinematic safari entrance

---

### **Task 2.1: Enhance Hero with Video Support** (3 hours)

**File**: `/src/components/organisms/Hero/Hero.tsx`

**New Props**:
```typescript
{
  // ... existing props
  videoSrc?: string,              // WebM video
  videoFallback?: string,         // MP4 fallback
  videoPoster?: string,           // Poster image
  enableVideoOnMobile?: boolean,  // Default false
  ambientAudio?: string,          // Wildlife sounds
  enableAudioControl?: boolean    // Show audio toggle
}
```

**Implementation**:
```tsx
{videoSrc ? (
  <video
    autoPlay
    loop
    muted
    playsInline
    poster={videoPoster}
    className={styles.heroVideo}
  >
    <source src={videoSrc} type="video/webm" />
    <source src={videoFallback} type="video/mp4" />
    {/* Fallback to image */}
    <Image src={backgroundImage} alt={backgroundImageAlt} fill />
  </video>
) : (
  <Image ... />
)}
```

**Lazy loading**:
- Use IntersectionObserver to load video when near viewport
- Show poster image initially
- Preload="none" attribute

---

### **Task 2.2: Create Ambient Audio Control** (2 hours)

**New file**: `/src/components/organisms/Hero/AmbientControls.tsx`

**Features**:
- Floating audio toggle button
- Play/pause wildlife sounds
- Volume control slider (optional)
- Animated icon (sound waves)
- Save preference to localStorage

**Design**:
```
┌─────────────┐
│ 🔊 Ambient  │  (Muted)
└─────────────┘
      ↓ click
┌─────────────┐
│ 🔇 Ambient  │  (Playing)
└─────────────┘
```

**Position**: Bottom right, fixed, z-index high

---

### **Task 2.3: Create Dawn → Sunrise Transition** (3 hours)

**New file**: `/src/components/sections/DawnChapter/DawnChapter.tsx`

**Features**:
- Gradient overlay that shifts color on scroll
- Dark blue → warm orange transition
- Safari jeep fades in
- Text "Your Safari Begins" animates
- CTA button appears

**Scroll trigger**:
- 0-25%: Still on hero
- 25-50%: Transition begins (gradient shift)
- 50-75%: Jeep and text appear
- 75-100%: Fully transitioned to sunrise

**Colors**:
```css
--dawn-start: #1a1d2e;      /* Deep blue-black */
--dawn-end: #ff6b35;        /* Sunrise orange */
```

---

### **Task 2.4: Enhance Scroll Indicator** (1 hour)

**File**: `/src/components/organisms/Hero/Hero.tsx` (styles)

**Enhancements**:
- Hide indicator after 20% scroll
- Add pulse animation (scale + opacity)
- Larger touch target on mobile
- Add "Scroll to Explore" text (optional)

**Animation**:
```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 0.6;
    transform: translateX(-50%) scale(1.1);
  }
}
```

---

### **Task 2.5: Video Optimization** (2 hours)

**Compression workflow**:

1. **Source video requirements**:
   - Resolution: 1920x1080 (1080p) for desktop, 720p for mobile
   - Duration: 10-15 seconds (seamless loop)
   - Content: Elephants, Kilimanjaro sunrise

2. **Compression commands**:
```bash
# WebM (primary)
ffmpeg -i hero-raw.mp4 \
  -c:v libvpx-vp9 -crf 30 -b:v 0 \
  -an -pix_fmt yuv420p \
  hero-desktop.webm

# MP4 (fallback)
ffmpeg -i hero-raw.mp4 \
  -c:v libx264 -crf 28 \
  -preset slow -profile:v high \
  -an -pix_fmt yuv420p \
  hero-desktop.mp4

# Mobile version (720p)
ffmpeg -i hero-raw.mp4 \
  -vf scale=1280:720 \
  -c:v libx264 -crf 30 \
  -an -pix_fmt yuv420p \
  hero-mobile.mp4
```

**Target sizes**:
- Desktop WebM: < 5MB
- Desktop MP4: < 8MB
- Mobile MP4: < 3MB
- Poster image: < 200KB (JPEG)

---

### **Task 2.6: Mobile Optimization** (2 hours)

**Strategy**:
- Detect mobile with `useMediaQuery`
- Show Ken Burns image instead of video
- Lighter animations (reduce parallax intensity)
- Preload="none" on audio

**Implementation**:
```tsx
const isMobile = useMediaQuery('(max-width: 768px)');

return (
  <>
    {!isMobile && videoSrc ? (
      <video ... />
    ) : (
      <Image ... /> // Ken Burns effect via CSS
    )}
  </>
);
```

---

### **Task 2.7: Update Homepage** (1 hour)

**File**: `/src/app/(marketing)/page.tsx`

**Replace simple Hero with enhanced SafariHero**:
```tsx
import SafariHero from '@/components/sections/SafariHero';
import DawnChapter from '@/components/sections/DawnChapter';

export default function HomePage() {
  return (
    <main>
      <SafariHero
        videoSrc="/videos/hero-dawn.webm"
        videoFallback="/videos/hero-dawn.mp4"
        videoPoster="/images/hero/dawn-poster.jpg"
        backgroundImage="/images/hero/hero mockup.png"
        mobileBackgroundImage="/images/hero/Single Leading Bull Silhouette.jpg"
        ambientAudio="/audio/dawn-ambience.mp3"
        enableAudioControl
        title="Welcome to the Wild"
        subtitle="Your Safari Begins at Dawn"
        primaryCTA={{
          text: "Begin Your Safari",
          href: "#chapter-sunrise"
        }}
      />

      <DawnChapter />

      {/* More chapters to come... */}
    </main>
  );
}
```

---

### **Task 2.8: Test Phase 2** (1 hour)

**Checklist**:
- [ ] Video autoplays on desktop (muted)
- [ ] Poster image shows before video loads
- [ ] Mobile shows image with Ken Burns instead of video
- [ ] Audio toggle works (if present)
- [ ] Dawn → Sunrise transition is smooth
- [ ] No layout shift (CLS < 0.1)
- [ ] Page load time < 3 seconds on 4G
- [ ] No console errors
- [ ] Reduced-motion disables video autoplay

---

## 📸 Image & Video Asset Requirements

### **Phase 1 Assets** (Existing ✅ or Placeholder)

No additional images needed for Phase 1 - we'll use existing hero images as placeholders for parallax testing.

---

### **Phase 2 Assets** (REQUIRED)

#### **1. Hero Video - Dawn Scene** 🎥 **HIGH PRIORITY**

**Desktop Version**:
- **Filename**: `hero-dawn-desktop.webm` + `hero-dawn-desktop.mp4`
- **Resolution**: 1920x1080 (1080p)
- **Duration**: 10-15 seconds (must loop seamlessly)
- **Content**:
  - Mount Kilimanjaro in background at dawn
  - Silhouette of elephant walking slowly
  - Warm sunrise colors (orange, pink, gold)
  - Subtle morning mist (optional)
- **Target size**: < 5MB (WebM), < 8MB (MP4)
- **Aspect ratio**: 16:9

**Mobile Version**:
- **Filename**: `hero-dawn-mobile.mp4`
- **Resolution**: 1280x720 (720p)
- **Same content as desktop**, optimized for mobile
- **Target size**: < 3MB

**Alternative** (if video unavailable):
- High-res photo (4K) of the same scene
- We'll apply Ken Burns effect in CSS

---

#### **2. Hero Video Poster Image** 📷 **HIGH PRIORITY**

**Filename**: `dawn-poster.jpg`
- **Resolution**: 1920x1080
- **Content**: First frame of video (or similar)
- **Format**: JPEG (optimized)
- **Target size**: < 200KB

---

#### **3. Dawn → Sunrise Transition Images** 📷 **MEDIUM PRIORITY**

**Image 1**: Safari Jeep at Dawn
- **Filename**: `safari-jeep-dawn.jpg`
- **Resolution**: 2560x1440
- **Content**: Safari jeep with open top, golden hour lighting
- **Usage**: Fades in during sunrise transition

**Image 2**: Acacia Tree Silhouette (Midground)
- **Filename**: `acacia-midground.png`
- **Resolution**: 1920x1080
- **Content**: Acacia tree with transparent background
- **Format**: PNG with alpha channel
- **Usage**: Parallax midground layer

**Image 3**: Kilimanjaro Background (Wide)
- **Filename**: `kilimanjaro-sunrise-wide.jpg`
- **Resolution**: 3840x2160 (4K wide)
- **Content**: Mount Kilimanjaro with warm sunrise sky
- **Usage**: Parallax background layer (slowest moving)

---

#### **4. Ambient Audio** 🔊 **LOW PRIORITY** (Optional)

**Filename**: `dawn-ambience.mp3`
- **Content**:
  - Gentle bird chirping
  - Distant animal sounds
  - Soft wind rustling
  - No harsh or sudden sounds
- **Duration**: 1-2 minutes (seamless loop)
- **Format**: MP3 (128kbps)
- **Target size**: < 2MB

**Alternative**: Can be added in later phases

---

### **Asset Priority Summary**

| Asset | Priority | Required For | Can Use Placeholder? |
|-------|----------|--------------|----------------------|
| Hero video (desktop) | 🔴 HIGH | Phase 2 launch | ✅ Yes - use existing hero image |
| Video poster | 🔴 HIGH | Phase 2 launch | ✅ Yes - use existing hero image |
| Safari jeep image | 🟡 MEDIUM | Sunrise transition | ✅ Yes - use stock image |
| Acacia tree PNG | 🟡 MEDIUM | Parallax layers | ✅ Yes - can skip layer |
| Kilimanjaro wide | 🟡 MEDIUM | Parallax background | ✅ Yes - use existing |
| Ambient audio | 🟢 LOW | Nice-to-have | ✅ Yes - can disable feature |

---

## 🎨 Placeholder Strategy (If Assets Unavailable)

### **Phase 2 Without Video**

If video isn't ready, we can still launch Phase 2 with:

1. **Enhanced Ken Burns**: Use existing high-res image with more dramatic zoom
2. **Gradient overlay animation**: Animate the overlay colors (dawn → sunrise)
3. **Parallax on static images**: Use existing images in multi-layer parallax

**Result**: 80% of the impact without video

---

### **Stock Image Sources** (Temporary Placeholders)

If you need placeholders while getting professional photos:

1. **Unsplash**: Search "Mount Kilimanjaro", "African safari", "elephant sunrise"
2. **Pexels**: High-quality free safari images
3. **Pixabay**: Free stock photos

**Example searches**:
- "Kilimanjaro sunrise elephant"
- "Safari jeep Amboseli"
- "Acacia tree silhouette"

---

## 📋 Phase 1 & 2 Complete Checklist

### **Phase 1: Foundation** ✅

- [ ] Lenis installed and configured
- [ ] `SmoothScrollProvider` created
- [ ] `SafariProgressProvider` tracking chapters
- [ ] `ParallaxContainer` component built
- [ ] `ParallaxLayer` component built
- [ ] `SafariChapter` base component ready
- [ ] `ScrollProgress` UI showing progress bar
- [ ] Providers added to app layout
- [ ] Smooth scroll working site-wide
- [ ] Parallax tested with 3 layers
- [ ] Mobile performance optimized
- [ ] All TypeScript compiles with no errors

### **Phase 2: Hero & Dawn** ✅

- [ ] Hero enhanced with video support
- [ ] Video lazy loading implemented
- [ ] Mobile fallback to Ken Burns image
- [ ] `AmbientControls` component (if audio available)
- [ ] `DawnChapter` component built
- [ ] Dawn → Sunrise color transition
- [ ] Scroll indicator enhanced
- [ ] Homepage updated with new hero
- [ ] Videos optimized and compressed
- [ ] Hero video < 5MB, poster < 200KB
- [ ] Page load time < 3 seconds
- [ ] Lighthouse score > 85
- [ ] All browsers tested (Chrome, Firefox, Safari, Edge)
- [ ] Mobile tested (iOS Safari, Chrome Mobile)

---

## 🚀 Recommended Implementation Order

### **Week 1: Phase 1**

**Day 1**:
- Morning: Install dependencies, create SmoothScrollProvider
- Afternoon: Create SafariProgressProvider, test scroll tracking

**Day 2**:
- Morning: Build ParallaxContainer and ParallaxLayer
- Afternoon: Test parallax with existing images, optimize performance

**Day 3**:
- Morning: Build SafariChapter component
- Afternoon: Create ScrollProgress UI, integrate everything

---

### **Week 2: Phase 2**

**Day 4**:
- Morning: Enhance Hero with video support
- Afternoon: Implement lazy loading, add fallbacks

**Day 5**:
- Morning: Create DawnChapter with sunrise transition
- Afternoon: Build AmbientControls (if audio ready)

**Day 6**:
- Morning: Video optimization and compression
- Afternoon: Testing, bug fixes, performance optimization

---

## 📦 Deliverables

### **End of Phase 1**:
- ✅ Fully functional smooth scroll
- ✅ Working parallax system
- ✅ Chapter tracking and progress bar
- ✅ Reusable components for Phase 3+

### **End of Phase 2**:
- ✅ Cinematic video hero (or enhanced image)
- ✅ Dawn → Sunrise narrative transition
- ✅ Ambient audio control (if available)
- ✅ Mobile-optimized experience
- ✅ Performance targets met

---

## 🎯 Success Criteria

### **Phase 1**:
- Smooth scroll feels natural (no jank)
- Parallax creates depth illusion
- Performance: 30fps minimum on mobile
- Chapter detection accurate within 5% scroll

### **Phase 2**:
- Video loads in < 2 seconds on 4G
- Hero feels cinematic and engaging
- Dawn transition feels magical
- Mobile experience doesn't feel degraded
- Page load < 3 seconds total

---

## ❓ Questions Before Starting?

1. **Do you have the video footage?** Or should we plan for image-only?
2. **Audio files ready?** Or skip ambient audio for now?
3. **Any specific parallax intensity preferences?** (subtle vs dramatic)
4. **Timeline pressure?** Can we take full 6 days or need faster?
5. **Any performance constraints?** (target devices, connection speeds)

---

## 🏁 Ready to Start?

Once you confirm:
- ✅ You've reviewed this plan
- ✅ You understand what assets are needed
- ✅ You're ready to proceed

I'll begin implementation starting with **Task 1.1: Install Dependencies** and work through systematically, updating you at each checkpoint! 🚀

---

**Let me know if you want to proceed, or if you'd like to adjust anything in the plan first!**

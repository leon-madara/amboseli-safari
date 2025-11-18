# Morning Drive Animation Flow - Visual Diagram

## Phase 1: Pin Phase (0-150vh)

```
┌─────────────────────────────────────────┐
│         Morning Safari Drive            │  ← Section pins at top
├─────────────────────────────────────────┤
│  ┌───────────────────────────────────┐  │
│  │  First Light on the Golden Plains │  │
│  ├───────────────────────────────────┤  │
│  │  Description text...              │  │
│  │                                   │  │
│  │  [Image]                          │  │  ← Everything static
│  │                                   │  │
│  │  Trip Details...                  │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘

Status: Everything visible, no animations
```

## Phase 2: Animation Phase (150vh-230vh)

### At 150vh (Animation Starts)

```
┌─────────────────────────────────────────┐
│         Morning Safari Drive            │
├─────────────────────────────────────────┤
│  ┌───────────────────────────────────┐  │
│  │  First Light...                   │  │
│  ├───────────────────────────────────┤  │
│  │  Description...                   │  │
│  │                                   │  │
│  │  [Image] ← BREAKS FREE!           │  │  ← Image becomes position:fixed
│  │          (position: fixed)        │  │
│  │                                   │  │
│  │  Trip Details...                  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘

Image: position:fixed at current location
Card: Starts moving up and fading
```

### During Animation (150vh → 230vh)

```
┌─────────────────────────────────────────┐
│         Morning Safari Drive            │
├─────────────────────────────────────────┤
│                                         │
│     ┌─────────────────────┐             │  ← Card moving up ↑
│     │ First Light...      │ (fading)    │     opacity: 0.5
│     │ Description...      │             │     y: -100px
│     │                     │             │
│     │ Trip Details...     │             │
│     └─────────────────────┘             │
│                                         │
│                                         │
│         [  IMAGE  ]  ← Growing          │  ← Image stays fixed
│                      ← Scaling          │     scale: 1.5
│                                         │     position: fixed
│                                         │
└─────────────────────────────────────────┘

Image: Stays in place, grows larger
Card: Moves up and fades out
```

### End of Animation (230vh)

```
┌─────────────────────────────────────────┐
│         Morning Safari Drive            │
├─────────────────────────────────────────┤
│                                         │
│  (Card completely gone)                 │  ← Card: opacity 0, y: -200px
│                                         │
│                                         │
│                                         │
│      [    LARGE IMAGE    ]              │  ← Image: 80% viewport width
│      [    CENTERED       ]              │     position: fixed
│      [    SCALED         ]              │     scale: 4.0 (example)
│                                         │
│                                         │
└─────────────────────────────────────────┘

Image: Fully grown, centered, fixed
Card: Invisible and moved up
```

## Phase 3: Text Reveal (230vh-280vh)

```
┌─────────────────────────────────────────┐
│         Morning Safari Drive            │
├─────────────────────────────────────────┤
│                                         │
│                                         │
│                                         │
│      [    LARGE IMAGE    ]              │
│      [    CENTERED       ]              │
│      [    SCALED         ]              │
│                                         │
│                                         │
│   "This could be your morning."         │  ← Overlay text fades in
│   "Exciting. Beautiful. Captivating."   │
│                                         │
└─────────────────────────────────────────┘

Image: Remains fixed and scaled
Overlay: Fades in below image
```

---

## Animation Timeline Summary

| Scroll Position | Image State | Card State | Overlay State |
|----------------|-------------|------------|---------------|
| 0-150vh | Normal flow | Normal, visible | Hidden |
| 150vh | Becomes fixed | Starts moving up | Hidden |
| 150vh-230vh | Fixed, growing | Moving up, fading | Hidden |
| 230vh | Fixed, 80% width | Invisible, y:-200px | Starting to appear |
| 230vh-280vh | Fixed, 80% width | Invisible | Fading in |
| 280vh+ | Fixed, 80% width | Invisible | Fully visible |

---

## Key Behaviors

### Image (imageContainerRef)
- **0-150vh:** Normal document flow
- **150vh:** Switches to `position: fixed` at current location
- **150vh-230vh:** Stays fixed (browser keeps it in place), scales up
- **230vh+:** Remains fixed and scaled

### Card (cardRef)
- **0-150vh:** Normal, fully visible
- **150vh:** Starts animation
- **150vh-230vh:** Moves up 200px, fades from opacity 1 → 0
- **230vh+:** Invisible (opacity: 0, y: -200px)

### Content Elements (subHeading, description, tripDetails)
- **0-150vh:** Fully visible
- **150vh-230vh:** Fade from opacity 1 → 0 (inside moving card)
- **230vh+:** Invisible

### Overlay Text (animatedOverlayRef)
- **0-230vh:** Hidden (opacity: 0)
- **230vh-280vh:** Fades in from opacity 0 → 1
- **280vh+:** Fully visible

---

## The "Breaking Free" Effect

```
Before (150vh):
┌─────────────┐
│   Card      │
│  ┌───────┐  │
│  │ Image │  │  ← Image inside card
│  └───────┘  │
│   Text      │
└─────────────┘

After (150vh):
┌─────────────┐
│   Card      │  ← Card starts moving up
│             │
│   Text      │
└─────────────┘
     ↑
     
  ┌───────┐
  │ Image │  ← Image breaks free, stays fixed
  └───────┘

Result (230vh):
(Card gone)

  ┌─────────────┐
  │   LARGE     │  ← Image dominates viewport
  │   IMAGE     │
  └─────────────┘
```

This creates a cinematic effect where the image "breaks free" from its container and takes over the viewport while the card disappears behind/around it.


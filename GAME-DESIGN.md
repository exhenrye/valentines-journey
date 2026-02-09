# Our Journey - Game Design Spec

## Concept: Journey Path

A winding illustrated path that Elora travels along, stopping at 12 "memory stations" that reveal photos and captions from your love story.

**Visual metaphor:** Like a board game meets a love letter - she follows a path through your shared history.

---

## Visual Style: Soft Watercolor

- **Color palette:**
  - Background: Soft cream/blush (#fdf8f5, #fff5f0)
  - Path: Warm rose gold (#e8b4b8)
  - Accents: Dusty rose, sage green, soft gold
  - Text: Warm charcoal (#4a3f3f)

- **Feel:** Dreamy, romantic, elegant but warm
- **Inspiration:** Wedding invitations, watercolor journals, vintage postcards

---

## Screen Flow

```
[Title Screen] → [Journey Path] ↔ [Memory Modal] → [Finale]
```

---

## Screen 1: Title Screen

**Layout:**
```
    ┌─────────────────────────┐
    │                         │
    │      ♡  ♡  ♡            │
    │                         │
    │    Our Journey          │
    │                         │
    │  A love story across    │
    │     continents          │
    │                         │
    │      [ Begin ]          │
    │                         │
    └─────────────────────────┘
```

**Elements:**
- Soft gradient background (cream to blush)
- Floating hearts (gentle bobbing animation)
- Elegant serif title
- Subtle sparkles/stars

---

## Screen 2: Journey Path

**Layout (scrollable vertically on mobile):**
```
    ┌─────────────────────────┐
    │  Our Journey    🎵      │  ← Header
    ├─────────────────────────┤
    │                         │
    │    ① Madrid ←── START   │
    │     ╲                   │
    │      ╲                  │
    │       ② Granada         │
    │         ╱               │
    │        ╱                │
    │    ③ Leavenworth        │
    │       ╲                 │
    │        ④ Geneva         │
    │       ╱                 │
    │    ⑤ Totoro 🐕          │
    │       ╲                 │
    │     ⑥ Route de Chêne    │
    │         ╱               │
    │    ⑦ The Proposal 💍    │
    │       ╲                 │
    │      ⑧ Pignora 💒       │
    │         ╱               │
    │    ⑨ Seattle            │
    │       ╲                 │
    │  ⑩ Matthews Beach 🏠    │
    │       ╱                 │
    │    ⑪ Theo 👶            │
    │       ╲                 │
    │  ⑫ 2026 & Beyond        │
    │                         │
    │   Tap a memory to       │
    │   relive the moment     │
    └─────────────────────────┘
```

**Path mechanics:**
- Path winds down the screen (S-curve or zigzag)
- Each milestone is a "station" on the path
- Stations have small thematic icons:
  - Madrid: 🌹 or city silhouette
  - Granada: 🏰 (Alhambra)
  - Leavenworth: ✈️ or 🎃
  - Geneva: 🇨🇭 or mountains
  - Totoro: 🐕
  - Route de Chêne: 🏠
  - Proposal: 💍
  - Pignora: 💒
  - Seattle: 🌲 or Space Needle
  - Matthews Beach: 🏡
  - Theo: 👶
  - 2026: ✨ or ♡

**Station states:**
- **Locked:** Grayed out, no pulse
- **Current:** Glowing, pulsing, inviting tap
- **Completed:** Colored in, checkmark or filled heart

**Progression:**
- Start with only Madrid unlocked
- Completing a memory unlocks the next
- Path "fills in" with color as you progress
- A small heart or avatar could travel the path (optional)

---

## Screen 3: Memory Modal

**Layout:**
```
    ┌─────────────────────────┐
    │                      ✕  │
    │                         │
    │        Madrid           │
    │    October 20, 2017     │
    │                         │
    │   ┌─────────────────┐   │
    │   │                 │   │
    │   │     [PHOTO]     │   │
    │   │                 │   │
    │   └─────────────────┘   │
    │       ● ○ ○             │  ← Photo dots (if multiple)
    │                         │
    │  "Your phone died. We   │
    │   almost didn't find    │
    │   each other..."        │
    │                         │
    │   [ Continue Journey ]  │
    │                         │
    └─────────────────────────┘
```

**Features:**
- Slides up smoothly
- Photo takes center stage
- Swipe between multiple photos
- Caption in elegant italic
- "Continue Journey" completes the memory

---

## Screen 4: Finale

**Triggers:** After completing milestone 12

**Layout:**
```
    ┌─────────────────────────┐
    │                         │
    │     ♡ ♡ ♡ ♡ ♡          │  ← Hearts burst/float up
    │                         │
    │   Happy Valentine's     │
    │         Day             │
    │                         │
    │   "From a dead phone    │
    │    in Madrid to a       │
    │    baby boy in          │
    │    Seattle..."          │
    │                         │
    │    With all my love,    │
    │         Enea            │
    │                         │
    │  [ Relive Our Journey ] │
    │                         │
    └─────────────────────────┘
```

**Animation:**
- Hearts burst from center and float upward
- Soft particle effect (sparkles)
- Text fades in sequence

---

## The 12 Milestones (Data)

| # | ID | Name | Date | Icon | Caption |
|---|-----|------|------|------|---------|
| 1 | madrid | Madrid | October 20, 2017 | 🌹 | "Your phone died..." |
| 2 | granada | Granada | 2017-2018 | 🏰 | "Our first real adventure..." |
| 3 | leavenworth | Leavenworth | October 2018 | ✈️ | "We were an ocean apart..." |
| 4 | geneva | Geneva | 2019 | ⛰️ | "You left everything..." |
| 5 | totoro | Totoro | 2019 | 🐕 | "Our first baby..." |
| 6 | route-de-chene | Route de Chêne | 2020 | 🏠 | "Our first home..." |
| 7 | proposal | The Proposal | May 3, 2022 | 💍 | "I asked you to be mine..." |
| 8 | pignora | Pignora | August 13, 2022 | 💒 | "Surrounded by everyone..." |
| 9 | seattle | Seattle | 2022-2023 | 🌲 | "A new continent..." |
| 10 | matthews-beach | Matthews Beach | May 2025 | 🏡 | "A house with a backyard..." |
| 11 | theo | Theo | July 28, 2025 | 👶 | "The most perfect little boy..." |
| 12 | future | 2026 & Beyond | Valentine's Day | ✨ | "From a Tinder match..." |

---

## Photo Folder Structure

```
assets/photos/
├── 01-madrid/
├── 02-granada/
├── 03-leavenworth/
├── 04-geneva/
├── 05-totoro/
├── 06-route-de-chene/
├── 07-proposal/
├── 08-pignora/
├── 09-seattle/
├── 10-matthews-beach/
├── 11-theo/
└── 12-future/
```

---

## Interactions

| Action | Result |
|--------|--------|
| Tap "Begin" on title | Transition to path screen |
| Tap unlocked station | Open memory modal |
| Tap locked station | Gentle shake, no action |
| Swipe in modal | Navigate photos |
| Tap "Continue Journey" | Close modal, unlock next, animate path fill |
| Complete milestone 12 | Transition to finale |
| Tap "Relive Our Journey" | Reset progress, return to path |
| Tap music icon | Toggle background music |

---

## Animations

1. **Title hearts:** Gentle float up/down (2s loop, staggered)
2. **Station pulse:** Scale 1.0 → 1.1 → 1.0 with glow (2s loop)
3. **Path fill:** Color/opacity animates from station A to B (0.5s)
4. **Modal slide:** Slide up from bottom with fade (0.3s ease-out)
5. **Photo transition:** Crossfade between photos (0.5s)
6. **Finale hearts:** Burst from center, float up, fade (3s, staggered)
7. **Sparkles:** Small dots float and fade (ambient, continuous)

---

## Responsive Design

**Mobile (primary):**
- Path is vertical, scrollable
- Stations are large touch targets (min 44px)
- Modal is nearly full-screen

**Tablet/Desktop:**
- Path could be horizontal or maintain vertical
- More breathing room
- Modal centered with max-width

---

## Assets Needed

**From Enea:**
- 1-3 photos per milestone (12 folders)
- Final approval on captions
- Final Valentine's message choice

**Generated/Found:**
- Background music (romantic piano, Pixabay)
- Optional: Watercolor texture overlay
- Optional: Custom icons (can use emoji as fallback)

---

## Technical Implementation

- **Framework:** Vanilla HTML/CSS/JS (no build step)
- **Scrolling:** CSS scroll-snap for path smoothness
- **State:** LocalStorage for progress persistence
- **Hosting:** Vercel (auto-deploy from GitHub)

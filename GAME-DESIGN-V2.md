# Our Journey - Game Design v2

## Concept: Side-Scroller Love Story

A cute character walks through a continuous world that transforms as they progress through 12 milestones. At each milestone, a mini animated moment plays out with photos integrated into the scene.

**Feel:** Like a beautiful indie game - think Alto's Odyssey meets a love letter.

---

## Core Mechanics

### Movement
- **Desktop:** Arrow keys or click-to-move
- **Mobile:** Tap right side to walk forward, or auto-walk with tap-to-pause
- Character walks smoothly through the world

### World Structure
- Continuous horizontal world divided into 12 "zones"
- Each zone has a distinct visual theme matching the milestone
- Seamless transitions between zones (color shifts, parallax backgrounds)

### Milestone Moments
When character reaches a milestone marker:
1. Character stops automatically
2. Mini animated scene plays (2-5 seconds)
3. Photo(s) fade in, positioned naturally in scene
4. Caption appears as elegant overlay
5. Tap/click to continue

---

## Visual Design

### Character
- Simple, cute 2D character (can be abstract - a heart, a couple silhouette, or pixel art people)
- Walking animation (4-8 frames)
- Maybe starts as one heart, becomes two hearts when they meet, etc.

### World Zones (12 scenes)

| Zone | Theme | Visual Elements | Mood Colors |
|------|-------|-----------------|-------------|
| 1. Madrid | Spanish city at night | Street lamps, cafe tables, Serrano architecture | Warm orange, deep blue |
| 2. Granada | Moorish palace | Alhambra arches, fountains, orange trees | Terracotta, gold, green |
| 3. Leavenworth | Bavarian town | Alpine houses, autumn leaves, mountains | Orange, brown, purple |
| 4. Geneva | Swiss lakeside | Lake, mountains, old town | Blue, white, green |
| 5. Totoro | Home with dog | Living room, puppy, cozy interior | Warm cream, brown |
| 6. Route de Chêne | Apartment | Kitchen, plants, window view | Soft yellow, green |
| 7. Proposal | Romantic setting | Sunset, ring, two figures | Pink, gold, purple |
| 8. Pignora | Italian countryside | Vineyard, old stone house, wedding arch | Golden, terracotta, green |
| 9. Seattle | City skyline | Space Needle, rain, evergreens | Blue-gray, green |
| 10. Matthews Beach | Suburban home | House, backyard, horse in field | Green, blue, warm brown |
| 11. Theo | Nursery | Crib, soft lighting, baby items | Soft blue, cream, pink |
| 12. Future | Sunrise/horizon | Open sky, path continuing forward | Golden, hopeful |

### Parallax Layers
Each zone has 3-4 layers:
1. **Sky/Far background** (moves slowest)
2. **Mid background** (buildings, mountains)
3. **Near background** (trees, lamp posts)
4. **Ground** (where character walks)

---

## Mini Moment Animations

### 1. Madrid - "The Meeting"
- Two small heart characters on opposite sides
- They spot each other, hearts appear above them
- They walk toward each other
- Photo fades in: your first photo together

### 2. Granada - "First Adventure"
- Characters walk through Alhambra archway
- Sun sets in background
- Camera icon floats by (taking memories)
- Photo fades in

### 3. Leavenworth - "The Surprise"
- One character waits
- Airplane flies across sky
- Second character appears from left (surprise!)
- Characters embrace
- Photo fades in

### 4. Geneva - "She Chose Us"
- Character with suitcase walks in
- Second character welcomes them
- Heart grows larger between them
- Photo fades in

### 5. Totoro - "First Baby"
- Characters sitting
- Small puppy bounces in
- All three together, hearts float up
- Photo fades in

### 6. Route de Chêne - "First Home"
- Door opens
- Characters walk in together
- Cozy glow fills the scene
- Photo fades in

### 7. Proposal - "Forever"
- Sunset background
- One character kneels
- Ring sparkles
- Other character nods (hearts burst)
- Photo fades in

### 8. Pignora - "The Wedding"
- Wedding arch
- Characters face each other
- Confetti/petals fall
- Photo fades in (wedding photo!)

### 9. Seattle - "New Chapter"
- Rain falls gently
- Characters walk with umbrella
- Space Needle in background
- Photo fades in

### 10. Matthews Beach - "Home"
- House appears
- Characters walk to front door
- Horse grazes in background
- Photo fades in

### 11. Theo - "Complete"
- Soft nursery glow
- Characters look at crib
- Tiny heart floats up from crib
- Characters now have small heart with them
- Photo fades in (Theo!)

### 12. Future - "Forever Together"
- Sunrise over horizon
- Path continues into distance
- Three hearts walk together
- Final message appears

---

## Technical Implementation

### Approach: CSS + JavaScript (no canvas needed)
- Use CSS transforms for parallax
- Character is a sprite sheet animated with CSS
- Scenes are layered divs with background images
- Photos are positioned elements that fade in
- Simple but smooth

### File Structure
```
valentines-journey/
├── index.html
├── style.css
├── game.js
├── assets/
│   ├── photos/           # User's photos
│   ├── scenes/           # Background layers
│   │   ├── 01-madrid/
│   │   ├── 02-granada/
│   │   └── ...
│   ├── characters/       # Character sprites
│   │   ├── heart-walk.png
│   │   └── heart-idle.png
│   └── music/
│       └── background.mp3
```

### Scene Generation Options
1. **CSS gradients + simple shapes** (fastest, stylized)
2. **AI-generated backgrounds** (can generate soft illustrated scenes)
3. **Emoji/icon-based** (ultra simple, charming)

---

## Controls

| Input | Action |
|-------|--------|
| Tap right side / Right arrow | Walk forward |
| Tap left side / Left arrow | Walk backward (limited) |
| Tap during moment | Continue / skip |
| Music button | Toggle sound |

---

## Progress & Save

- Progress saved to localStorage
- Can resume from any completed milestone
- "Relive" button to restart from beginning

---

## Finale Sequence

After Milestone 12:
1. World fades to soft golden sunrise
2. Three hearts (family) walk toward horizon
3. Screen fades to white
4. "Happy Valentine's Day, Elora" appears
5. Final message types out
6. Hearts float up
7. "With all my love, Enea"
8. "Play Again" button

---

## Asset Needs

### To Create/Generate:
- [ ] Character sprites (simple heart or couple silhouette)
- [ ] 12 scene backgrounds (can be CSS gradients + simple SVG shapes)
- [ ] Scene-specific elements (lamp posts, arches, trees, etc.)

### From Enea:
- [ ] Photos for each milestone
- [ ] Final approval on captions

### Optional:
- [ ] Background music
- [ ] Sound effects (footsteps, sparkles, etc.)

---

## MVP vs Polish

### MVP (for Feb 14):
- Character walks through scenes
- Simple CSS gradient backgrounds with key visual elements
- Photos fade in at milestones
- Captions display
- Finale with message

### Polish (if time):
- Detailed illustrated backgrounds
- More elaborate animations
- Sound effects
- Particle effects (hearts, sparkles)

# Episode 3: Leavenworth - Detailed Storyboard

## Episode Metadata
| Field | Value |
|-------|-------|
| Episode | 3 of 12 |
| Location | Leavenworth, Washington |
| Date | October 2018 |
| Background | `christmas-night` (Bavarian Christmas village) |
| Has Photo | Yes |
| Context | Long-distance relationship. Enea flew from Geneva to Seattle, rented a car, drove to Leavenworth. Arrived in the evening just as Elora had fallen asleep. Surprise anniversary visit. |
| Duration | ~50-65 seconds total |

---

## Scene Setup

### Initial State
- **Background**: Christmas night (Bavarian village with lights)
- **Enea**: Hidden (he's still in Geneva at start)
- **Elora**: Appears alone, center screen
- **UI**: Episode indicator "Episode 3 of 12" at top

### Outfits
| Character | Outfit |
|-----------|--------|
| Enea | Green shirt, blue pants, boots, santa hat |
| Elora | Purple bodice, santa hat |

### Ground Position
- Characters stand at `height * 0.98`

---

## Sequence Breakdown

### BEAT 0: Location Card
| Property | Value |
|----------|-------|
| Trigger | Scene start |
| Duration | 2000ms total |
| Visual | Centered card with dark semi-transparent background |
| Title | "Leavenworth" (48px, Cormorant Garamond) |
| Subtitle | "October 2018" (20px, italic) |
| Animation | Fade in (500ms) -> Hold (1500ms) -> Fade out (500ms) |
| Interaction | None (automatic) |

---

### BEAT 1: Elora Alone
| Property | Value |
|----------|-------|
| Action | `elora-alone` |
| Type | Dialogue + action |
| Speaker | Elora |
| Text | "I miss him so much today..." |
| Duration | Instant positioning |
| Elora Position | `x: width * 0.5`, `y: groundY` (centered) |
| Enea | Hidden |
| Interaction | Wait for tap |

---

### BEAT 2: Anniversary Sadness
| Property | Value |
|----------|-------|
| Type | Dialogue |
| Speaker | Elora |
| Text | "Happy anniversary to us... an ocean apart." |
| Speech Bubble | Above Elora (centered) |
| Visual | Elora standing alone in the Christmas village |
| Interaction | Wait for tap |

---

### BEAT 3: Missing Him
| Property | Value |
|----------|-------|
| Type | Dialogue |
| Speaker | Elora |
| Text | "He's so far away right now..." |
| Speech Bubble | Above Elora |
| Visual | Loneliness conveyed through solitude in festive setting |
| Interaction | Wait for tap |

---

### BEAT 4: Elora Exits
| Property | Value |
|----------|-------|
| Action | `elora-exit` |
| Duration | 2000ms |
| Visual | Elora walks left off-screen (going to sleep) |
| Animation | Walk animation, `setFlipX(false)` facing left |
| Auto-advance | Yes (after tween completes) |

---

### BEAT 5: The Flight
| Property | Value |
|----------|-------|
| Action | `plane` |
| Duration | 4000ms |
| Visual | Pixel-art plane flies from left to right across sky |
| Start Position | `x: -100`, `y: height * 0.25` |
| End Position | `x: width + 100`, `y: height * 0.2` |
| Trail | White contrail dots spawned every 60ms, fade out over 1000ms |
| Ease | `Sine.easeInOut` |
| Auto-advance | Yes |

---

### BEAT 6: Journey Text
| Property | Value |
|----------|-------|
| Action | `journey-text` |
| Text | "Geneva -> Seattle -> Leavenworth" |
| Duration | 4100ms total (800ms fade in + 2500ms hold + 800ms fade out) |
| Visual | White text with black stroke, centered on screen |
| Font | 28px Georgia serif |
| Depth | 250 (above everything) |
| Auto-advance | Yes |

---

### BEAT 7: Enea Arrives
| Property | Value |
|----------|-------|
| Action | `enea-arrive` |
| Type | Dialogue + action |
| Speaker | Enea |
| Text | "She has no idea I'm here." |
| Duration | 2000ms walk-in |
| Enea Start | `x: width + 100` (off-screen right) |
| Enea End | `x: width * 0.6` |
| Facing | Left (`setFlipX(false)`) - he arrived from the right |
| Animation | Walk animation, stops at position |
| Interaction | Wait for tap (after walk completes) |

---

### BEAT 8: Worth Every Mile
| Property | Value |
|----------|-------|
| Type | Dialogue |
| Speaker | Enea |
| Text | "I drove for hours through the mountains. Worth every mile." |
| Speech Bubble | Above Enea (right side of screen) |
| Visual | Enea alone in the Christmas village at night |
| Interaction | Wait for tap |

---

### BEAT 9: Elora Appears (The Surprise)
| Property | Value |
|----------|-------|
| Action | `elora-appear` |
| Type | Dialogue + action |
| Speaker | Elora |
| Text | "ENEA?! What-- How are you HERE?!" |
| Duration | 1200ms rush-in |
| Elora Start | `x: -100` (off-screen left) |
| Elora End | `x: width * 0.35` |
| Facing | Right (`setFlipX(true)`) - toward Enea |
| Ease | `Cubic.easeOut` (fast start, slows down - rushing feel) |
| Animation | Walk animation, stops at position |
| Interaction | Wait for tap (after rush completes) |

---

### BEAT 10: The Reveal
| Property | Value |
|----------|-------|
| Type | Dialogue |
| Speaker | Enea |
| Text | "Surprise, amore. Happy anniversary." |
| Speech Bubble | Above Enea |
| Interaction | Wait for tap |

---

### BEAT 11: Elora's Reaction
| Property | Value |
|----------|-------|
| Type | Dialogue with effect |
| Speaker | Elora |
| Text | "You flew across the world... for me?" |
| Speech Bubble | Above Elora |
| Effect | `blush` (blush marks "///" on both characters) |
| Interaction | Wait for tap |

---

### BEAT 12: Enea's Promise
| Property | Value |
|----------|-------|
| Type | Dialogue |
| Speaker | Enea |
| Text | "I'd fly anywhere for you. Every single time." |
| Speech Bubble | Above Enea |
| Interaction | Wait for tap |

---

### BEAT 13: Hearts
| Property | Value |
|----------|-------|
| Action | `hearts` |
| Duration | ~2000ms |
| Visual | Hearts explosion between the two characters |
| Auto-advance | Yes |

---

### BEAT 14: Photo Moment
| Property | Value |
|----------|-------|
| Action | `photo` |
| Visual | Photo overlay with caption and icon |
| Caption | "We were an ocean apart. On our anniversary, I surprised you--flew across the world just to see your face. Every mile was worth it." |
| On Complete | Advance to Episode 4 |

---

## New Actions Specification

### `elora-exit`
```
Trigger: Action in dialogue array
Duration: 2000ms
Purpose: Elora walks off-screen (going to sleep)

Visual:
- Elora faces left (setFlipX false)
- Walk animation plays
- Tweens x from current position to -100
- Linear easing

On Complete:
- Stop walk animation
- Set invisible
- Auto-advance to next dialogue beat
```

### `enea-arrive`
```
Trigger: Action in dialogue array with optional speaker/text
Duration: 2000ms
Purpose: Enea enters from the RIGHT side (he drove there)

Visual:
- Enea starts at x: width + 100 (off-screen right)
- Faces left (setFlipX false)
- Walk animation plays
- Tweens to x: width * 0.6
- Linear easing

On Complete:
- Stop walk animation, set idle frame
- Show speech if speaker/text provided
```

### `elora-appear`
```
Trigger: Action in dialogue array with optional speaker/text
Duration: 1200ms
Purpose: Elora rushes in from left (surprised reunion)

Visual:
- Elora starts at x: -100 (off-screen left)
- Faces right (setFlipX true) - toward Enea
- Walk animation plays
- Tweens to x: width * 0.35
- Cubic.easeOut (fast start, slows - rushing feel)

On Complete:
- Stop walk animation, set idle frame
- Show speech if speaker/text provided
```

### `journey-text`
```
Trigger: Action in dialogue array
Duration: 4100ms total
Purpose: Display route/journey text as a cinematic card

Visual:
- Text centered on screen (width/2, height/2)
- 28px Georgia serif, white with black 4px stroke
- Depth 250 (above everything)

Animation:
- Fade in: 800ms
- Hold: 2500ms
- Fade out: 800ms (yoyo)

On Complete:
- Destroy text object
- Auto-advance to next dialogue beat
```

---

## Dialogue Data Structure

```javascript
dialogue: [
  // Scene 1: Elora alone on their anniversary
  { speaker: 'elora', text: 'I miss him so much today...', action: 'elora-alone' },
  { speaker: 'elora', text: 'Happy anniversary to us... an ocean apart.' },
  { speaker: 'elora', text: "He's so far away right now..." },
  { action: 'elora-exit' },

  // Scene 2: The Journey
  { action: 'plane' },
  { action: 'journey-text', text: 'Geneva -> Seattle -> Leavenworth' },

  // Scene 3: Enea arrives
  { speaker: 'enea', text: 'She has no idea I\'m here.', action: 'enea-arrive' },
  { speaker: 'enea', text: 'I drove for hours through the mountains. Worth every mile.' },

  // Scene 4: The Surprise
  { speaker: 'elora', text: 'ENEA?! What-- How are you HERE?!', action: 'elora-appear' },
  { speaker: 'enea', text: 'Surprise, amore. Happy anniversary.' },
  { speaker: 'elora', text: 'You flew across the world... for me?', effect: 'blush' },
  { speaker: 'enea', text: "I'd fly anywhere for you. Every single time." },
  { action: 'hearts' },
  { action: 'photo' },
]
```

---

## Visual Timeline

```
0s      2s      4s      6s      10s     14s     16s     18s     22s     26s
|-------|-------|-------|-------|-------|-------|-------|-------|-------|
[CARD  ]
        [ALONE][DIALOGUE x2]
                        [EXIT~~]
                                [PLANE~~~~~~]
                                        [JOURNEY TEXT~~~~]
                                                [ARRIVE~~][DIALOGUE]
                                                        [APPEAR~][DIALOGUE x3]
                                                                        [HEARTS]
                                                                            [PHOTO]
```

---

## Emotional Arc

1. **Longing** (Beats 1-3): Elora alone, missing Enea on their anniversary
2. **Transition** (Beats 4-6): Time passes, the journey unfolds cinematically
3. **Anticipation** (Beats 7-8): Enea arrives secretly, internal excitement
4. **Surprise** (Beat 9): The emotional payoff - Elora discovers him
5. **Joy** (Beats 10-14): Reunion, gratitude, love, celebration

---

## Notes

1. **Background choice**: `christmas-night` works perfectly for Leavenworth's Bavarian Christmas village aesthetic
2. **Plane animation**: Uses drawn Phaser Graphics plane (not emoji) with contrail effect
3. **Journey text**: Shows the actual route Enea traveled (Geneva -> Seattle -> Leavenworth)
4. **Elora's rush-in**: Cubic.easeOut gives a "bolting awake and running" feel
5. **No sad effect**: Elora's loneliness is conveyed through dialogue and being alone on screen, no special effect needed
6. **Outfit continuity**: Both wearing winter/Christmas outfits appropriate for Leavenworth in October

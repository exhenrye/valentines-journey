# Episode 1: Madrid - Detailed Storyboard

## Episode Metadata
| Field | Value |
|-------|-------|
| Episode | 1 of 12 |
| Location | Madrid, Spain |
| Date | October 20, 2017 |
| Background | `town-night` (5 parallax layers) |
| Has Photo | No (first date, no photos taken) |
| Characters Unlocked | Elora joins the journey |
| Duration | ~45-60 seconds total |

---

## Scene Setup

### Initial State
- **Background**: Town at night, subtle parallax scroll (0.1x speed)
- **Enea**: Hidden
- **Elora**: Hidden
- **UI**: Episode indicator "Episode 1 of 12" at top

### Ground Position
- Characters stand at `height * 0.98` (very bottom of screen, on the street)

---

## Sequence Breakdown

### BEAT 0: Location Card
| Property | Value |
|----------|-------|
| Trigger | Scene start |
| Duration | 2000ms total |
| Visual | Centered card with dark semi-transparent background |
| Title | "Madrid" (48px, Cormorant Garamond) |
| Subtitle | "October 20, 2017" (20px, italic) |
| Animation | Fade in (500ms) → Hold (1500ms) → Fade out (500ms) |
| Interaction | None (automatic) |

---

### BEAT 1: Enea Waits
| Property | Value |
|----------|-------|
| Action | `enea-wait-right` |
| Duration | Instant |
| Enea Position | `x: width * 0.7`, `y: groundY` |
| Enea Facing | Left (toward where Elora will appear) - `setFlipX(true)` |
| Enea Animation | Static frame 0 (standing still) |
| Enea Visible | Yes |
| Elora Visible | No |
| Auto-advance | Yes (immediately to next beat) |

---

### BEAT 2: Enea's Worry
| Property | Value |
|----------|-------|
| Type | Dialogue |
| Speaker | Enea |
| Text | "She's not coming... her phone must have died." |
| Speech Bubble | Above Enea, white with rounded corners |
| Speaker Label | "Enea" in coral (#e57373) |
| Continue Prompt | "▶ Tap to continue" at top center |
| Interaction | Wait for tap/click/spacebar |

---

### BEAT 3: Elora Enters
| Property | Value |
|----------|-------|
| Action | `elora-enter-left` |
| Duration | 2500ms |
| Elora Start | `x: -100` (off-screen left), `y: groundY` |
| Elora End | `x: width * 0.35` |
| Elora Facing During Walk | Right - `setFlipX(false)` |
| Elora Animation During Walk | `female-walk` (frames 16-23, 10fps) |
| Elora Facing After Stop | Right (facing Enea) - `setFlipX(false)` |
| Elora Animation After Stop | Static frame 0 |
| Easing | Linear |
| Auto-advance | Yes (after tween completes) |

---

### BEAT 4: Pause/Beat
| Property | Value |
|----------|-------|
| Action | `pause-beat` |
| Duration | 800ms |
| Purpose | Dramatic pause - they see each other |
| Visual | Both standing, facing each other, no speech |
| Auto-advance | Yes (after delay) |

**NEW ACTION NEEDED**

---

### BEAT 5: Elora Apologizes
| Property | Value |
|----------|-------|
| Type | Dialogue |
| Speaker | Elora |
| Text | "Enea? I'm so sorry—my phone died!" |
| Speech Bubble | Above Elora |
| Interaction | Wait for tap |

---

### BEAT 6: Enea's Relief + Blush
| Property | Value |
|----------|-------|
| Type | Dialogue with effect |
| Speaker | Enea |
| Text | "You came. You actually came." |
| Speech Bubble | Above Enea |
| **Effect** | Blush particles appear around both characters |
| Blush Details | See "Blush Effect Spec" below |
| Interaction | Wait for tap |

**NEW EFFECT NEEDED**

---

### BEAT 7: Elora's Question
| Property | Value |
|----------|-------|
| Type | Dialogue |
| Speaker | Elora |
| Text | "Of course I did. Now... where are you taking me?" |
| Speech Bubble | Above Elora |
| Interaction | Wait for tap |

---

### BEAT 8: Tacos Line
| Property | Value |
|----------|-------|
| Type | Dialogue |
| Speaker | Enea |
| Text | "Tacos and margaritas?" |
| Speech Bubble | Above Enea |
| Interaction | Wait for tap |

---

### BEAT 9: Look at Each Other
| Property | Value |
|----------|-------|
| Action | `look-at-each-other` |
| Duration | 1200ms |
| Purpose | Romantic pause before walking off together |
| Visual | Both standing still, facing each other |
| Optional | Small heart emoji floats up between them |
| Auto-advance | Yes (after delay) |

**NEW ACTION NEEDED**

---

### BEAT 10: Walk Together
| Property | Value |
|----------|-------|
| Action | `walk-together-right` |
| Duration | 3000ms |
| Enea Position | Starts at current, moves to `width * 0.6` |
| Elora Position | Starts at current, moves to `width * 0.5` |
| Both Facing | Right - `setFlipX(false)` |
| Both Animation | Walk animations |
| Background | Scrolls right (parallax speed * 3) |
| Auto-advance | Yes (after tween completes) |

---

### BEAT 11: Pause Before Exit
| Property | Value |
|----------|-------|
| Action | `pause-before-exit` |
| Duration | 600ms |
| Visual | Both stop walking, still facing right |
| Animation | Static frame 0 |
| Auto-advance | Yes (after delay) |

**NEW ACTION NEEDED**

---

### BEAT 12: Exit Right
| Property | Value |
|----------|-------|
| Action | `exit-right` |
| Duration | 2500ms |
| Enea End | `x: width + 150` (off-screen right) |
| Elora End | `x: width + 150` (off-screen right) |
| Both Facing | Right - `setFlipX(false)` |
| Both Animation | Walk animations |
| Background | Scrolls right faster (parallax speed * 4) |
| On Complete | Hide both characters |
| Auto-advance | Yes (after tween completes) |

---

### BEAT 13: Transition
| Property | Value |
|----------|-------|
| Action | `next-episode` |
| Duration | 500ms |
| Visual | Screen fades to black |
| On Complete | Load Episode 2 |

---

## New Effects Specification

### Blush Effect
```
Trigger: During "You came. You actually came." dialogue
Duration: 2000ms (persists through dialogue, fades on tap)

Particles:
- Type: Small pink circles or "///" marks
- Color: #ffb6c1 (light pink) with 50% opacity
- Count: 3-4 per character
- Position: Near cheeks (offset from character center)
- Animation:
  - Fade in over 300ms
  - Gentle float/wobble
  - Fade out over 500ms when dismissed

Alternative (simpler):
- Pink tint overlay on character sprites
- Or pink emoji "///" positioned near faces
```

### Heart Float (Look at Each Other)
```
Trigger: During look-at-each-other pause
Duration: 1200ms

Single Heart:
- Emoji: ❤️ (32px)
- Start: Between characters, at chest height
- End: Float up 50px
- Animation:
  - Fade in over 200ms
  - Float up with slight wobble
  - Fade out over 300ms at end
```

---

## Dialogue Data Structure (Updated)

```javascript
dialogue: [
  { action: 'enea-wait-right' },
  { speaker: 'enea', text: "She's not coming... her phone must have died." },
  { action: 'elora-enter-left' },
  { action: 'pause-beat', duration: 800 },
  { speaker: 'elora', text: "Enea? I'm so sorry—my phone died!" },
  { speaker: 'enea', text: "You came. You actually came.", effect: 'blush' },
  { speaker: 'elora', text: "Of course I did. Now... where are you taking me?" },
  { speaker: 'enea', text: "Tacos and margaritas?" },
  { action: 'look-at-each-other', duration: 1200, effect: 'heart-float' },
  { action: 'walk-together-right' },
  { action: 'pause-before-exit', duration: 600 },
  { action: 'exit-right' },
  { action: 'next-episode' }
]
```

---

## Implementation Checklist

### New Actions to Code
- [x] `pause-beat` - Simple delay with no interaction
- [x] `look-at-each-other` - Pause with heart float
- [x] `pause-before-exit` - Brief stop before exiting

### New Effects to Code
- [x] `blush` - Pink "///" marks near character faces
- [x] `heart-float` - Single heart rises between characters (built into look-at-each-other)

### Existing Actions (Already Implemented)
- [x] `enea-wait-right`
- [x] `elora-enter-left`
- [x] `walk-together-right`
- [x] `exit-right`
- [x] `next-episode`

---

## Visual Timeline

```
0s      2s      4s      6s      8s      12s     16s     20s     24s
|-------|-------|-------|-------|-------|-------|-------|-------|
[CARD  ]
        [ENEA WAITS + DIALOGUE]
                [ELORA ENTERS~~~]
                        [PAUSE]
                         [DIALOGUE x4 with BLUSH~~~~~~]
                                         [LOOK♥]
                                               [WALK~~~~]
                                                      [P][EXIT~~~]
                                                              [FADE]
```

---

## Notes

1. **No tap during animations** - User cannot skip walking/entering animations
2. **Background always subtly moving** - Even when stationary, 0.1x parallax drift
3. **Speech bubbles clear on tap** - Previous speech hidden before next appears
4. **Blush persists** - Effect stays visible through the dialogue beat, clears on tap
5. **Scale** - Characters at 3x scale, positioned at bottom of screen

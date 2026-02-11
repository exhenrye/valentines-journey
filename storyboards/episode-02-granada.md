# Episode 2: Granada - Detailed Storyboard

## Episode Metadata
| Field | Value |
|-------|-------|
| Episode | 2 of 12 |
| Location | Granada, Spain |
| Date | December 21-23, 2017 |
| Background | `town-sunset` (warm tones for Spanish architecture) |
| Has Photo | Yes |
| Context | First weekend getaway before Christmas. Enea rented a car, drove down, stayed at Airbnb. Visited Alhambra. Elora was vlogging with selfie stick. |
| Duration | ~60-75 seconds total |

---

## Scene Setup

### Initial State
- **Background**: Town at sunset (warm Spanish vibes)
- **Enea**: Hidden
- **Elora**: Hidden (now unlocked from Episode 1)
- **UI**: Episode indicator "Episode 2 of 12" at top

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
| Title | "Granada" (48px, Cormorant Garamond) |
| Subtitle | "December 21-23, 2017" (20px, italic) |
| Animation | Fade in (500ms) → Hold (1500ms) → Fade out (500ms) |
| Interaction | None (automatic) |

---

### BEAT 1: Arriving Together
| Property | Value |
|----------|-------|
| Action | `walk-together-start` |
| Duration | Instant |
| Enea Position | `x: width * 0.35`, `y: groundY` |
| Elora Position | `x: width * 0.45`, `y: groundY` |
| Both Facing | Right - `setFlipX(true)` |
| Auto-advance | Yes |

---

### BEAT 2: Elora's Wonder
| Property | Value |
|----------|-------|
| Type | Dialogue |
| Speaker | Elora |
| Text | "I can't believe we're actually here! The Alhambra!" |
| Speech Bubble | Above Elora |
| Interaction | Wait for tap |

---

### BEAT 3: Enea's Contentment
| Property | Value |
|----------|-------|
| Type | Dialogue |
| Speaker | Enea |
| Text | "Worth every minute of that drive." |
| Speech Bubble | Above Enea |
| Interaction | Wait for tap |

---

### BEAT 4: Walking Through Granada
| Property | Value |
|----------|-------|
| Action | `walk-together` |
| Duration | 2500ms |
| Visual | Both walk right, background scrolls |
| Both Animation | Walk animations |
| Auto-advance | Yes (after tween completes) |

---

### BEAT 5: Elora Pulls Out Selfie Stick
| Property | Value |
|----------|-------|
| Action | `pause-beat` |
| Duration | 600ms |
| Purpose | Pause before selfie stick moment |
| Auto-advance | Yes |

---

### BEAT 6: Selfie Stick Moment
| Property | Value |
|----------|-------|
| Type | Dialogue |
| Speaker | Elora |
| Text | "Wait! I need to vlog this! Hold on..." |
| Speech Bubble | Above Elora |
| Visual | (Elora "holds up" invisible selfie stick - we can imply this through dialogue) |
| Interaction | Wait for tap |

---

### BEAT 7: Enea's Internal Monologue
| Property | Value |
|----------|-------|
| Type | Dialogue with effect |
| Speaker | Enea |
| Text | "I hate selfie sticks... but watching her this happy? I'd hold a hundred of them." |
| Speech Bubble | Above Enea |
| Effect | `heart-flutter` (optional - small hearts near Enea) |
| Note | This is internal thought, could style differently |
| Interaction | Wait for tap |

---

### BEAT 8: Elora Vlogging
| Property | Value |
|----------|-------|
| Type | Dialogue |
| Speaker | Elora |
| Text | "And THIS is the famous Alhambra! Look at those arches!" |
| Speech Bubble | Above Elora |
| Visual | Enthusiastic vlogging energy |
| Interaction | Wait for tap |

---

### BEAT 9: Walk to Dinner
| Property | Value |
|----------|-------|
| Action | `walk-together` |
| Duration | 2000ms |
| Visual | Both walk right, background scrolls |
| Purpose | Transition to dinner scene |
| Auto-advance | Yes |

---

### BEAT 10: Dinner Setup
| Property | Value |
|----------|-------|
| Action | `face-each-other` |
| Duration | Instant |
| Enea Position | `x: width * 0.4` |
| Elora Position | `x: width * 0.6` |
| Purpose | Seated at fancy restaurant (implied) |
| Auto-advance | Yes |

---

### BEAT 11: At the Restaurant
| Property | Value |
|----------|-------|
| Type | Dialogue |
| Speaker | Enea |
| Text | "This restaurant is incredible. Very fancy." |
| Speech Bubble | Above Enea |
| Interaction | Wait for tap |

---

### BEAT 12: Elora's Mishap
| Property | Value |
|----------|-------|
| Type | Dialogue with effect |
| Speaker | Elora |
| Text | "Oh no! My napkin... and the fork... I'm so sorry!" |
| Speech Bubble | Above Elora |
| Effect | `embarrassed` (blush marks on Elora, maybe "!" or sweat drop) |
| Interaction | Wait for tap |

**NEW EFFECT NEEDED**

---

### BEAT 13: Enea Reassures
| Property | Value |
|----------|-------|
| Type | Dialogue |
| Speaker | Enea |
| Text | "Hey... you're the most elegant woman in here. Even when you're juggling silverware." |
| Speech Bubble | Above Enea |
| Interaction | Wait for tap |

---

### BEAT 14: Elora's Relief
| Property | Value |
|----------|-------|
| Type | Dialogue with effect |
| Speaker | Elora |
| Text | "You always know what to say." |
| Speech Bubble | Above Elora |
| Effect | `blush` (both characters) |
| Interaction | Wait for tap |

---

### BEAT 15: Romantic Pause
| Property | Value |
|----------|-------|
| Action | `look-at-each-other` |
| Duration | 1000ms |
| Visual | Heart floats up between them |
| Auto-advance | Yes |

---

### BEAT 16: The Promise
| Property | Value |
|----------|-------|
| Type | Dialogue |
| Speaker | Elora |
| Text | "Promise me we'll always travel together." |
| Speech Bubble | Above Elora |
| Interaction | Wait for tap |

---

### BEAT 17: Enea's Vow
| Property | Value |
|----------|-------|
| Type | Dialogue |
| Speaker | Enea |
| Text | "Always. Every adventure, every road trip, every awkward dinner... with you." |
| Speech Bubble | Above Enea |
| Interaction | Wait for tap |

---

### BEAT 18: Photo Moment
| Property | Value |
|----------|-------|
| Action | `photo` |
| Visual | Photo overlay with caption and icon |
| Caption | "Our first real adventure together. Wandering the Alhambra, getting lost in narrow streets, realizing I never wanted to travel without you again." |
| On Complete | Advance to Episode 3 |

---

## New Effects Specification

### Embarrassed Effect
```
Trigger: During Elora's mishap dialogue
Duration: 2000ms (persists through dialogue, fades on tap)

Visual:
- Blush marks "///" on Elora only
- Optional: "!" exclamation mark above head (32px, red)
- Or sweat drop emoji near forehead

Animation:
  - Quick appearance (150ms)
  - Slight shake/wobble on Elora sprite (optional)
  - Fade out over 500ms when dismissed
```

### Heart Flutter (for Enea's internal monologue)
```
Trigger: During "I hate selfie sticks..." dialogue
Duration: 1500ms

Visual:
- 2-3 small hearts near Enea
- Float upward gently
- Indicate he's smitten despite the selfie stick

Animation:
  - Staggered appearance
  - Float up 30-40px
  - Fade out
```

---

## Dialogue Data Structure

```javascript
dialogue: [
  { action: 'walk-together-start' },
  { speaker: 'elora', text: "I can't believe we're actually here! The Alhambra!" },
  { speaker: 'enea', text: "Worth every minute of that drive." },
  { action: 'walk-together' },
  { action: 'pause-beat', duration: 600 },
  { speaker: 'elora', text: "Wait! I need to vlog this! Hold on..." },
  { speaker: 'enea', text: "I hate selfie sticks... but watching her this happy? I'd hold a hundred of them.", effect: 'heart-flutter' },
  { speaker: 'elora', text: "And THIS is the famous Alhambra! Look at those arches!" },
  { action: 'walk-together' },
  { action: 'face-each-other' },
  { speaker: 'enea', text: "This restaurant is incredible. Very fancy." },
  { speaker: 'elora', text: "Oh no! My napkin... and the fork... I'm so sorry!", effect: 'embarrassed' },
  { speaker: 'enea', text: "Hey... you're the most elegant woman in here. Even when you're juggling silverware." },
  { speaker: 'elora', text: "You always know what to say.", effect: 'blush' },
  { action: 'look-at-each-other', duration: 1000 },
  { speaker: 'elora', text: "Promise me we'll always travel together." },
  { speaker: 'enea', text: "Always. Every adventure, every road trip, every awkward dinner... with you." },
  { action: 'photo' }
]
```

---

## Implementation Checklist

### New Actions to Code
- [x] None new (uses existing actions)

### New Effects to Code
- [x] `embarrassed` - Blush + "!" on Elora for her dinner mishap
- [x] `heart-flutter` - Small hearts floating near Enea during internal monologue

### Existing Actions (Already Implemented)
- [x] `walk-together-start`
- [x] `walk-together`
- [x] `pause-beat`
- [x] `face-each-other`
- [x] `look-at-each-other`
- [x] `photo`
- [x] `blush`

---

## Visual Timeline

```
0s      2s      4s      6s      8s      12s     16s     20s     24s     28s
|-------|-------|-------|-------|-------|-------|-------|-------|-------|
[CARD  ]
        [START][DIALOGUE x2]
                        [WALK~~~]
                                [PAUSE][SELFIE STICK DIALOGUES x3]
                                                [WALK~~~]
                                                        [FACE][DINNER x4]
                                                                    [LOOK]
                                                                        [PROMISE x2]
                                                                                [PHOTO]
```

---

## Background Considerations

Current background is `town-sunset` which gives warm Spanish vibes. Ideally we'd have:
- Moorish architecture hints (arches, tiles)
- Warm golden/orange sunset tones
- But `town-sunset` works as a reasonable substitute

If we want to add an Alhambra-specific background later:
- Look for pixel art with Islamic/Moorish architecture
- Or create a simple overlay with arch silhouettes

---

## Notes

1. **Elora now unlocked** - She appears from the start of this episode
2. **Road trip context** - Could add a car emoji or driving action if desired
3. **Selfie stick** - Implied through dialogue (no actual prop needed)
4. **Restaurant scene** - `face-each-other` implies they're seated across from each other
5. **Internal monologue** - Enea's selfie stick thought could be styled differently (italics? different bubble color?)
6. **Date update needed** - Change from "2017-2018" to "December 21-23, 2017" in EPISODES array

---

## Questions for Enea

1. Do you have a specific photo from Granada/Alhambra to include?
2. Any other memorable moments from this trip to add?
3. Should Enea's internal monologue look different (italics, thought bubble style)?
4. Is the restaurant mishap accurate to how it happened?

# Execution-Ready Storyboards: Episodes 6-12

> Reference document for parallel episode authoring agents.
> Each beat specifies exact positions, actions, animation states, and input behavior.

---

## Engine Reference (frozen)

| Property | Value |
|----------|-------|
| Canvas | 1280x720 |
| Character scale | 3x (100x64px frames -> 300x192px rendered) |
| groundY | 706 (720 * 0.98) |
| Bubble Y | groundY - 260 = 446 |
| `walkTogether()` targets | Enea->896, Elora->976, Dog->816, BG scrolls, 2500ms |
| `embrace()` | approach center+-40 (1200ms), hearts+hold (1500ms), separate center+-130 (800ms) |
| `face-each-other` | Enea: 512 (0.4), Elora: 768 (0.6) |
| `walk-together-start` | Enea: 384 (0.3), Elora: 512 (0.4), Dog: 256 (0.2) |
| `family-arrive` | Enea: 448 (0.35), Elora: 576 (0.45), Dog: 320 (0.25) |
| `family-together` | Enea: 448, Elora: 576, Dog: 320, Baby: 512 (0.4) |
| showSpeech() | Auto-faces characters toward each other, clamps bubble to screen edges (20px) |

### Action Contract (32 valid actions)

```
wait, enea-wait-right, elora-enter-left, pause-beat, look-at-each-other,
pause-before-exit, walk-together-right, exit-right, next-episode, elora-enter,
elora-alone, enea-alone, enea-enter, enea-enter-right, embrace, walk-together,
walk-together-start, face-each-other, restaurant-scene, plane, dog-join,
baby-arrive, family-arrive, family-together, wedding-setup, elora-walk-aisle,
kneel, hearts, photo, finale
```

---

## EP06 -- Route de Chene (First Home, 2020)

**Background:** `town-day`
**Characters:** Enea + Elora + Dog (dog unlocked in EP05)
**Tone:** Cozy, lighthearted, fun. The pandemic was actually a good time for them -- cooking, French lessons, Totoro on the couch, reinventing careers. Not dramatic.
**Caption:** "Our first home. Just us, our animals, and a pandemic. We weathered the storm together. I'd do it all again with you."

| # | Action | Speaker | Text | Positions After | Input | Notes |
|---|--------|---------|------|-----------------|-------|-------|
| 1 | `walk-together-start` | -- | -- | Enea:384 Elora:512 Dog:256, flipX:true (face right), idle frame 0 | auto | Couple+dog positioned, facing their apartment |
| 2 | -- | enea | "Route de Chene 5. Our first real apartment." | Same, auto-face via showSpeech | tap | Real address |
| 3 | -- | elora | "Our own kitchen. Our own couch. No more tiptoeing past your parents' room." | Same | tap | Specific, grounded, callback to Geneva bedroom |
| 4 | `walk-together` | -- | -- | Enea:896 Elora:976 Dog:816, walk anims, BG scroll 2500ms | auto | Walking into the apartment / exploring |
| 5 | -- | enea | "And then the whole world shut down." | Both idle, auto-face | tap | Pandemic arrives |
| 6 | -- | elora | "Honestly? I didn't mind. Nowhere I'd rather be stuck." | Same | tap | Lighthearted -- she liked it |
| 7 | -- | enea | "Totoro claimed the couch on day one. We never got it back." | Same | tap | Dog humor, real detail |
| 8 | `look-at-each-other` | -- | -- | Same + heart floats center, 1000ms | auto | Warm moment |
| 9 | -- | elora | "You quit JPMorgan. I started my degree. We reinvented ourselves." | Same | tap | Real: Enea to startups, Elora WSU Bachelor's |
| 10 | -- | enea | "Best lockdown project was learning to cook without burning the kitchen." | Same | tap | Self-deprecating humor |
| 11 | -- | elora | "Your risotto was always perfect though. Even Totoro agreed." | Same | tap | Warm callback to cooking together |
| 12 | `walk-together` | -- | -- | Walk right, BG scrolls, 2500ms | auto | Walking through pandemic life |
| 13 | -- | enea | "Two years in that apartment. We grew up in there." | Both idle, auto-face | tap | Reflective, not sentimental |
| 14 | -- | elora | "We didn't just survive it. We built our whole life in it." | Same | tap | Thematic closer |
| 15 | `hearts` | -- | -- | Heart burst, 2000ms | auto | |
| 16 | `photo` | -- | -- | Photo overlay | tap | Episode end |

---

## EP07 -- The Proposal (May 3, 2022)

**Background:** `ancient-temple`
**Characters:** Enea + Elora + Dog
**Tone:** Building nervous energy from Enea, genuine surprise from Elora, natural joy. Not over-the-top.
**Caption:** "I asked you to be mine forever. You said yes. The happiest moment of my life -- until you kept topping it."

**Known issue:** `kneel` sets `enea.scaleY = 2.2` but never resets. The `embrace` handler must reset scaleY to 3 at the start (see "New Actions / Fixes Needed" below).

| # | Action | Speaker | Text | Positions After | Input | Notes |
|---|--------|---------|------|-----------------|-------|-------|
| 1 | `walk-together-start` | -- | -- | Enea:384 Elora:512 Dog:256, face right, idle | auto | Walking together, Enea has the ring |
| 2 | -- | enea | "Hey, can we stop here for a second?" | Auto-face | tap | Casual, trying to play it cool |
| 3 | -- | elora | "What's wrong? You've been acting weird all day." | Same | tap | She noticed |
| 4 | `face-each-other` | -- | -- | Enea:512 Elora:768, facing each other | auto | Turn to face |
| 5 | -- | enea | "Nothing's wrong. Everything's right, actually." | Same | tap | Building |
| 6 | `kneel` | enea | "Elora... from the first night in Madrid, I knew." | Enea: scaleY->2.2 (500ms), same X | tap | Enea kneels, speech shows after |
| 7 | -- | elora | "Enea... are you--" | Same | tap | Dawning realization |
| 8 | -- | enea | "Will you marry me?" | Same | tap | The question |
| 9 | -- | elora | "Yes. Yes! Obviously yes." | Same | tap | Joy, not scripted |
| 10 | `embrace` | -- | -- | Reset scaleY->3, approach center+-40, hearts, separate center+-130 | auto | Must reset kneel scaleY first |
| 11 | -- | elora | "I can't believe you actually got me." | Enea:510 Elora:770 (post-embrace) | tap | Playful, real |
| 12 | -- | enea | "Happiest moment of my life. Until you keep topping it." | Same | tap | Callback to caption |
| 13 | `look-at-each-other` | -- | -- | Heart floats, 1200ms | auto | |
| 14 | `hearts` | -- | -- | Heart burst, 2000ms | auto | |
| 15 | `photo` | -- | -- | Photo overlay | tap | Episode end |

---

## EP08 -- Pignora (August 13, 2022)

**Background:** `forest`
**Characters:** Enea + Elora + Dog
**Tone:** Elegant, intimate, deep emotion but grounded. Not generic-wedding -- specific to their day at Pignora.
**Caption:** "Surrounded by everyone we love. You walked toward me and I couldn't breathe. The day you became my wife."

**Context:** Pignora is Enea's family country house in Novazzano. Ceremony at the courthouse (Mayor of Novazzano), party at Pignora. Intimate wedding with family and friends. Honeymoon in Paris with Elora's parents.

| # | Action | Speaker | Text | Positions After | Input | Notes |
|---|--------|---------|------|-----------------|-------|-------|
| 1 | `wedding-setup` | enea | "This is really happening." | Enea:896(0.7) facing left, Elora:192(0.15) facing right | tap | Wedding positions, speech shows immediately |
| 2 | -- | enea | "Pignora. Where my family has gathered for generations. And she's about to walk toward me." | Same | tap | Specific to their venue |
| 3 | `elora-walk-aisle` | -- | -- | Elora walks 192->704(0.55), 3000ms. Enea moves to 768(0.6) on complete | auto | Walking the aisle |
| 4 | `pause-beat` | -- | -- | Same, 1200ms silence | auto | Moment of stillness |
| 5 | -- | elora | "Hi." | Enea:768 Elora:704, auto-face | tap | Simple. Perfect. |
| 6 | -- | enea | "You're the most beautiful thing I've ever seen." | Same | tap | Genuine |
| 7 | -- | elora | "Don't make me cry. I just did my makeup." | Same | tap | Humor to cut the emotion |
| 8 | `look-at-each-other` | -- | -- | Heart floats, 1200ms | auto | |
| 9 | -- | enea | "I do. Forever." | Same | tap | Vows |
| 10 | -- | elora | "I do." | Same | tap | Simple |
| 11 | `embrace` | -- | -- | Approach, hearts, separate to 510/770 | auto | Wedding embrace |
| 12 | -- | enea | "My wife. I'll never get tired of saying that." | Post-embrace positions | tap | |
| 13 | `hearts` | -- | -- | Heart burst, 2000ms | auto | |
| 14 | `photo` | -- | -- | Photo overlay | tap | Wedding photos |

---

## EP09 -- Seattle (2022-2023)

**Background:** `city-night`
**Characters:** Enea + Elora + Dog
**Tone:** Brave, adventurous, "us against the world" energy. Mix of excitement and resilience. Real details: Joey, Felix, Cleo. Capitol Hill then Ballard.
**Caption:** "A new continent. A new chapter. We packed our life into suitcases and started over. Because we're braver together."

| # | Action | Speaker | Text | Positions After | Input | Notes |
|---|--------|---------|------|-----------------|-------|-------|
| 1 | `plane` | -- | -- | Plane crosses screen L->R at y=180, 5000ms, sine oscillation, contrail | auto | Transatlantic flight |
| 2 | `pause-beat` | -- | -- | 1000ms | auto | Arrival beat |
| 3 | `family-arrive` | -- | -- | Enea:448 Elora:576 Dog:320, all visible | auto | Family appears in Seattle |
| 4 | -- | elora | "Seattle. We actually did it." | Auto-face | tap | First reaction |
| 5 | -- | enea | "New country. New timezone. Same team." | Same | tap | Grounded confidence |
| 6 | -- | elora | "Joey handled the twelve-hour flight better than you did." | Same | tap | Humor, real detail |
| 7 | -- | enea | "That's because Joey didn't have to wrestle three pet carriers through customs." | Same | tap | Callback humor |
| 8 | `walk-together` | -- | -- | Walk right, BG scrolls, 2500ms | auto | Exploring Seattle |
| 9 | -- | elora | "Capitol Hill, then Ballard. Every neighborhood felt like a fresh start." | Both idle, auto-face | tap | Real Seattle neighborhoods |
| 10 | -- | enea | "Every apartment was different. But home was always wherever you were." | Same | tap | Warm, not sappy |
| 11 | -- | elora | "We keep rebuilding. I think that's just what we do." | Same | tap | Resilience theme |
| 12 | `look-at-each-other` | -- | -- | Heart floats, 1000ms | auto | |
| 13 | -- | enea | "Braver together. Always." | Same | tap | Thematic line from caption |
| 14 | `hearts` | -- | -- | Heart burst, 2000ms | auto | |
| 15 | `photo` | -- | -- | Photo overlay | tap | Episode end |

---

## EP10 -- Matthews Beach (May 2025)

**Background:** `town-day`
**Characters:** Enea + Elora + Dog
**Tone:** Settled, warm, at peace. After years of moving, finally putting down roots. Real details: Marzipan (dog), Rome (horse, Enea's 30th birthday gift from Elora), backyard.
**Caption:** "A house with a backyard. Rome in the field. This isn't just where we live -- it's where we're building our forever."

**Note:** By this point in the story, their dog is Marzipan (Belgian Malinois). Totoro and Joey have both passed. The dog sprite represents Marzipan now.

| # | Action | Speaker | Text | Positions After | Input | Notes |
|---|--------|---------|------|-----------------|-------|-------|
| 1 | `walk-together-start` | -- | -- | Enea:384 Elora:512 Dog:256, face right, idle | auto | Walking toward their house |
| 2 | -- | elora | "A real house. With an actual backyard." | Auto-face | tap | Simple wonder |
| 3 | -- | enea | "Marzi's going to lose her mind out there." | Same | tap | Real detail: Marzipan |
| 4 | `walk-together` | -- | -- | Walk right, BG scrolls, 2500ms | auto | Walking through neighborhood |
| 5 | -- | enea | "This is the first time we don't feel like we're going anywhere." | Both idle, auto-face | tap | After all the moves |
| 6 | -- | elora | "Good. I'm done packing boxes." | Same | tap | Humor, real |
| 7 | -- | enea | "And then for my birthday you got me a horse." | Same | tap | Rome! Real detail |
| 8 | -- | elora | "Rome. Because apparently a dog and two cats weren't enough animals." | Same | tap | Playful, real |
| 9 | `look-at-each-other` | -- | -- | Heart floats, 1000ms | auto | |
| 10 | -- | enea | "A backyard. A dog. A horse. All that's missing is..." | Same | tap | Foreshadowing Theo |
| 11 | -- | elora | "I know. I've been thinking about it too." | Same | tap | Subtle, powerful |
| 12 | `walk-together` | -- | -- | Walk right, BG scrolls, 2500ms | auto | Into their future |
| 13 | `hearts` | -- | -- | Heart burst, 2000ms | auto | |
| 14 | `photo` | -- | -- | Photo overlay | tap | Episode end |

---

## EP11 -- Theo (July 28, 2025)

**Background:** `town-sunset`
**Characters:** Enea + Elora + Dog -> unlocks Baby
**Tone:** Tender, awestruck, genuinely overwhelming. The deepest emotional moment. Simple words for a profound experience.
**Caption:** "The most perfect little boy arrived. You made me a father. You made us complete. I didn't know my heart could hold this much love."
**Unlock:** `baby`

| # | Action | Speaker | Text | Positions After | Input | Notes |
|---|--------|---------|------|-----------------|-------|-------|
| 1 | `face-each-other` | -- | -- | Enea:512 Elora:768, facing each other | auto | |
| 2 | -- | elora | "He's here. Our boy." | Same | tap | Simple announcement |
| 3 | `baby-arrive` | -- | -- | Baby fades in at 640 (center), alpha 0->1, 500ms. Sets hasBaby=true | auto | Theo appears |
| 4 | `pause-beat` | -- | -- | 1200ms | auto | Let the moment breathe |
| 5 | -- | enea | "Theo. Hey, little guy. I'm your dad." | Same | tap | First words to his son |
| 6 | -- | elora | "Look at his hands. They're so small." | Same | tap | Tender observation |
| 7 | -- | enea | "I didn't know it was possible to love someone this much this fast." | Same | tap | Overwhelming |
| 8 | `look-at-each-other` | -- | -- | Heart floats, 1500ms (use duration param) | auto | Longest pause -- peak moment |
| 9 | -- | elora | "We made a whole person." | Same | tap | Wonder + slight humor |
| 10 | -- | enea | "You made me a father. You made us complete." | Same | tap | From the caption |
| 11 | -- | elora | "Everything we've been through -- Madrid, Geneva, Seattle -- it all led here." | Same | tap | Arc callback |
| 12 | `embrace` | -- | -- | Approach, hearts, separate | auto | Parents embrace |
| 13 | `hearts` | -- | -- | Heart burst, 2000ms | auto | |
| 14 | `photo` | -- | -- | Photo overlay | tap | Theo photos |

---

## EP12 -- 2026 & Beyond (Valentine's Day)

**Background:** `sunset-purple`
**Characters:** Full family (Enea + Elora + Dog + Baby)
**Tone:** Reflective, grateful, hopeful. Not sad -- triumphant. Building to the emotional climax of the finale message screen.
**Caption:** "From a Tinder match in Madrid to a family in Seattle. I'm the luckiest man alive. Here's to forever, my love."

| # | Action | Speaker | Text | Positions After | Input | Notes |
|---|--------|---------|------|-----------------|-------|-------|
| 1 | `family-together` | -- | -- | Enea:448 Elora:576 Dog:320 Baby:512, all face right | auto | Full family positioned |
| 2 | -- | enea | "Eight years." | Auto-face | tap | Opening |
| 3 | -- | elora | "Three countries." | Same | tap | Building |
| 4 | -- | enea | "More apartments than I can count." | Same | tap | Humor, real |
| 5 | -- | elora | "One dog, two cats, a horse, and the most perfect baby." | Same | tap | Full family inventory |
| 6 | `walk-together` | -- | -- | Family walks right, BG scrolls, 2500ms | auto | Walking into the sunset together |
| 7 | -- | enea | "Every flight, every move, every 3am feeding -- I'd do it all again." | Both idle, auto-face | tap | From the caption |
| 8 | -- | elora | "Me too. Every single part." | Same | tap | Simple confirmation |
| 9 | `look-at-each-other` | -- | -- | Heart floats, 1200ms | auto | |
| 10 | -- | enea | "Here's to forever, my love." | Same | tap | Closing line |
| 11 | `hearts` | -- | -- | Heart burst, 2000ms | auto | Final hearts |
| 12 | `photo` | -- | -- | Photo overlay | tap | Episode photos |
| 13 | `finale` | -- | -- | Camera fadeOut 1000ms -> FinaleScene | auto | Transition to personal message |

---

## New Actions / Fixes Needed

### 1. Fix: `embrace` must reset `scaleY` (REQUIRED for EP07)

**File:** `src/actions/characters.js` -- `embrace()`
**Why:** `kneel` in EP07 sets `enea.scaleY = 2.2`. The next action is `embrace`, which tweens X positions but not scaleY. Enea stays squished for the rest of the episode.
**Fix:** Add at the top of `embrace()`:
```js
scene.enea.setScale(3); // Reset from any prior scaleY change (e.g., kneel)
scene.elora.setScale(3);
```

### 2. No new action types needed

All 7 episodes can be choreographed using the existing 32 actions. The vocabulary is sufficient.

---

## Dialogue Tone Reference

Across all episodes, the dialogue should be:
- **Matter-of-fact with warmth** -- how they actually talk, not how a greeting card talks
- **Specific real details** -- names, places, animals, events from their actual life
- **Not over-dramatic** -- even emotional moments stay grounded
- **Self-deprecating humor** -- especially from Enea
- **Playful banter** -- they joke with each other naturally
- **Short sentences** -- fits speech bubbles, feels like real conversation

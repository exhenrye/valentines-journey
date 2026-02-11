# Valentine's Journey - Project Context

A Valentine's Day game telling Enea and Elora's love story through 12 episodes.

## Tech Stack
- **Framework**: Phaser 3 (game engine)
- **Language**: Vanilla JavaScript (no build step)
- **Testing**: Jest (data tests) + Playwright (integration tests)

## Project Structure
```
valentines-journey/
├── index.html          # Main entry point
├── game.js             # All game logic (scenes, episodes, actions)
├── style.css           # Styling
├── assets/             # Backgrounds, characters, photos, music
├── tests/
│   ├── setup.js        # Extracts game data for Node.js testing
│   ├── data.test.js    # Episode/background validation
│   ├── actions.test.js # Action handler validation
│   └── integration/    # Playwright browser tests
└── CLAUDE.md           # This file
```

## Key Data Structures

### EPISODES Array (lines 7-215)
12 episodes with: id, name, date, background, icon, caption, dialogue[], unlock

### BACKGROUNDS Object (lines 218-283)
8 parallax background configurations: city-night, forest, town-sunset, town-day, town-night, mountains, sunset, sunset-purple

### Character Unlock Sequence
- Episode 1 (Madrid): unlocks Elora
- Episode 5 (Totoro): unlocks dog
- Episode 11 (Theo): unlocks baby

---

## QA Agent Configuration

### Trigger Phrases

| Command | Action |
|---------|--------|
| "test this" | Run `npm test` (Jest data + action tests) |
| "validate episodes" | Run `npm test -- tests/data.test.js` |
| "check actions" | Run `npm test -- tests/actions.test.js` |
| "run integration tests" | Run `npm run test:integration` (Playwright) |
| "run qa" | Run full test suite (Jest + Playwright) |

### Auto-QA Triggers

Claude should proactively run tests when:
- New action added to an episode's dialogue array
- Episode structure modified (fields changed)
- New episode added or existing episode deleted
- handleAction switch statement modified
- Scene transitions changed

### Issue Classification

**Engineering Bugs (Block & Fix):**
- Action used in dialogue but no handler exists
- Background reference doesn't exist in BACKGROUNDS
- Episode missing required fields (id, name, dialogue, etc.)
- Unlock value not in valid set (elora, dog, baby)
- Scene transition errors or crashes
- State flags not updating correctly

**UX Issues (Note & Suggest):**
- Sprite positioning looks off
- Animation timing feels slow/fast
- Text overflow or styling issues
- Visual glitches during transitions
- Sound/music timing

### Test Commands

```bash
# Install dependencies
npm install

# Run data validation tests (fast, no browser)
npm test

# Run specific test file
npm test -- tests/data.test.js
npm test -- tests/actions.test.js

# Run integration tests (requires browser)
npm run test:integration

# Start local server for manual testing
npm run serve
```

### Test Hooks

The game exposes `window.__GAME_STATE__` for Playwright:
- `getScene()` - Current active scene name
- `getEpisode()` - Current episode index (0-11)
- `getDialogueIndex()` - Current dialogue item index
- `getFlags()` - { hasElora, hasDog, hasBaby }
- `isAnimating()` - Whether animation is in progress

---

## Common Tasks

### Adding a New Episode
1. Add episode object to EPISODES array
2. Ensure background exists in BACKGROUNDS
3. Verify all dialogue actions have handlers
4. Run `npm test` to validate

### Adding a New Action
1. Add case to handleAction switch in GameScene
2. Use action in episode dialogue
3. Add to HANDLED_ACTIONS in tests/setup.js
4. Run `npm test` to validate

### Debugging
- Check browser console for position/animation logs
- Use `window.__GAME_STATE__` to inspect state
- Run specific tests to isolate issues

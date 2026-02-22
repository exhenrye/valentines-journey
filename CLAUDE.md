# Valentine's Journey - Project Context

A Valentine's Day game telling Enea and Elora's love story through 12 episodes.

## Tech Stack
- **Framework**: Phaser 3 (game engine, loaded via CDN)
- **Language**: ES modules (vanilla JavaScript)
- **Build**: Vite (dev server + bundler)
- **Testing**: Jest (data tests) + Playwright (integration tests)

## Project Structure
```
valentines-journey/
├── index.html              # Entry point, loads Phaser CDN + src/game.js
├── vite.config.js           # Vite config (port 8080)
├── src/
│   ├── game.js              # Entry: imports, GameScene class, Phaser config, test hooks
│   ├── data/
│   │   ├── episodes/        # One file per episode (ep01-madrid.js ... ep12-finale.js)
│   │   │   └── index.js     # Re-exports EPISODES array (ordered)
│   │   └── backgrounds.js   # BACKGROUNDS object (10 parallax configs)
│   ├── scenes/
│   │   ├── BootScene.js     # Asset preloading
│   │   ├── TitleScene.js    # Title screen with parallax
│   │   └── FinaleScene.js   # Valentine's message
│   └── actions/
│       ├── index.js         # ACTION_HANDLERS map (action-name -> function)
│       ├── movement.js      # walk-together, exit-right, etc.
│       ├── characters.js    # enea-wait-right, elora-enter, face-each-other, etc.
│       ├── events.js        # plane, dog-join, baby-arrive, wedding-*, restaurant-scene
│       └── effects.js       # hearts, photo, finale, pause-beat, look-at-each-other
├── assets/                  # Backgrounds, characters, photos, music
├── tests/
│   ├── setup.js             # Loads data from src/data/ modules for Node.js testing
│   ├── data.test.js         # Episode/background validation
│   ├── actions.test.js      # Action handler validation
│   └── integration/         # Playwright browser tests
└── CLAUDE.md                # This file
```

## Key Data Structures

### EPISODES Array (src/data/episodes/)
12 episodes, one per file. Each exports: `{ id, name, date, background, icon, outfits, caption, dialogue[], photos?, noPhoto?, unlock? }`

### BACKGROUNDS Object (src/data/backgrounds.js)
10 parallax background configurations with layer keys and scroll speeds.

### ACTION_HANDLERS Map (src/actions/index.js)
28 action handlers mapped by kebab-case name. Each handler receives `(scene, dialogue)`.

### Character Unlock Sequence
- Episode 1 (Madrid): unlocks Elora
- Episode 5 (Totoro): unlocks dog
- Episode 11 (Theo): unlocks baby

---

## Parallel Development Workflow

This project supports parallel agent work via the coordinator/worker pattern.

### Independence Boundaries

These modules can be edited independently (different agents, different files):
- **Episode files** (`src/data/episodes/ep*.js`) - Each is independent. Agents can edit separate episodes in parallel.
- **Action handler files** (`src/actions/*.js`) - Can be edited independently from episode data (as long as no new action names are introduced).
- **Scene files** (`src/scenes/*.js`) - Independent from each other and from episodes.

### Contracts (shared interfaces - freeze before parallel work)

| Contract | Location | What it defines |
|----------|----------|----------------|
| Valid action names | `src/actions/index.js` | Keys of ACTION_HANDLERS |
| Background keys | `src/data/backgrounds.js` | Keys of BACKGROUNDS |
| Episode schema | Any `src/data/episodes/ep*.js` | Required fields for episode objects |
| Outfit/hat keys | `src/scenes/BootScene.js` | Spritesheet keys loaded in preload() |

### Trigger Phrases

| Command | Action |
|---------|--------|
| "parallel edit episodes" | Multi-agent episode editing workflow (see below) |
| "parallel feature" | Multi-agent feature development workflow |

### "parallel edit episodes" Workflow

When Enea describes changes to multiple episodes:

1. **Analyze**: Read all affected episode files under `src/data/episodes/`
2. **Contract Check**: Read `src/actions/index.js` to get valid action names
3. **Dispatch**: Use Task tool to spawn one agent per episode change
4. **Worker Context**: Each agent gets:
   - The specific episode file to modify
   - The valid actions list (frozen contract)
   - The episode schema (copy from any existing episode)
   - The specific changes requested
   - Instruction: do NOT modify any other files
5. **Integrate**: After all agents complete, verify changes
6. **Validate**: Run `npm test` and report results

### Worker Template for Episode Authoring

```
SCOPE: src/data/episodes/epNN-name.js (create or modify)
CONTRACT (do NOT change):
  Valid actions: [list from ACTION_HANDLERS keys]
  Valid backgrounds: [list from BACKGROUNDS keys]
  Valid outfit keys: [list from BootScene clothesList/hatsList]
CONSTRAINTS: Do NOT touch any file outside your scope
PATTERN: See any existing episode file for format
CHECKLIST:
  - File exports default object with required fields
  - All action references exist in the contract
  - Background reference exists in the contract
  - Dialogue ends with 'photo', 'next-episode', or 'finale'
```

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
- Action handler modified or added
- Scene transitions changed

### Issue Classification

**Engineering Bugs (Block & Fix):**
- Action used in dialogue but no handler in ACTION_HANDLERS
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

# Start dev server (hot reload)
npm run dev

# Start preview server (production build)
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
1. Create `src/data/episodes/epNN-name.js` with episode object
2. Add import to `src/data/episodes/index.js`
3. Ensure background exists in BACKGROUNDS
4. Verify all dialogue actions exist in ACTION_HANDLERS
5. Run `npm test` to validate

### Adding a New Action
1. Add handler function to the appropriate `src/actions/*.js` file
2. Add mapping in `src/actions/index.js`
3. Use action in episode dialogue
4. Run `npm test` to validate (handler list is auto-detected from index.js)

### Debugging
- Check browser console for position/animation logs
- Use `window.__GAME_STATE__` to inspect state
- Run specific tests to isolate issues
- `npm run dev` for hot-reload development

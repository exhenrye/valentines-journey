/**
 * Structural validation of extracted modules
 *
 * Verifies that all modules created during the refactoring export
 * the expected classes, functions, and interfaces.
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

function readModule(relativePath) {
  return fs.readFileSync(path.join(srcDir, relativePath), 'utf8');
}

describe('BackgroundManager', () => {
  const source = readModule('managers/BackgroundManager.js');

  test('exports a default class', () => {
    expect(source).toMatch(/export default class BackgroundManager/);
  });

  test('has load, update, scrollLayers, clear methods', () => {
    expect(source).toMatch(/\bload\s*\(/);
    expect(source).toMatch(/\bupdate\s*\(/);
    expect(source).toMatch(/\bscrollLayers\s*\(/);
    expect(source).toMatch(/\bclear\s*\(/);
  });

  test('imports BACKGROUNDS data', () => {
    expect(source).toMatch(/import.*BACKGROUNDS.*from/);
  });
});

describe('CharacterManager', () => {
  const source = readModule('managers/CharacterManager.js');

  test('exports a default class', () => {
    expect(source).toMatch(/export default class CharacterManager/);
  });

  test('has createAll method for sprite initialization', () => {
    expect(source).toMatch(/\bcreateAll\s*\(/);
  });

  test('has outfit management methods', () => {
    expect(source).toMatch(/\bapplyOutfits\s*\(/);
    expect(source).toMatch(/\bsyncClothing\s*\(/);
    expect(source).toMatch(/\bgetDogForEpisode\s*\(/);
  });

  test('has episode reset method', () => {
    expect(source).toMatch(/\bresetForEpisode\s*\(/);
  });

  test('has state snapshot methods for goBack', () => {
    expect(source).toMatch(/\bgetState\s*\(/);
    expect(source).toMatch(/\brestoreState\s*\(/);
  });

  test('has walkTogether method', () => {
    expect(source).toMatch(/\bwalkTogether\s*\(/);
  });

  test('declares all companion flags', () => {
    expect(source).toMatch(/this\.hasElora/);
    expect(source).toMatch(/this\.hasDog/);
    expect(source).toMatch(/this\.hasBaby/);
    expect(source).toMatch(/this\.hasCats/);
    expect(source).toMatch(/this\.hasHorse/);
  });
});

describe('PhotoOverlay', () => {
  const source = readModule('ui/PhotoOverlay.js');

  test('exports a default class', () => {
    expect(source).toMatch(/export default class PhotoOverlay/);
  });

  test('has show and setVisible methods', () => {
    expect(source).toMatch(/\bshow\s*\(/);
    expect(source).toMatch(/\bsetVisible\s*\(/);
  });

  test('has visible getter', () => {
    expect(source).toMatch(/get visible\s*\(/);
  });
});

describe('SpeechBubble', () => {
  const source = readModule('ui/SpeechBubble.js');

  test('exports a default class', () => {
    expect(source).toMatch(/export default class SpeechBubble/);
  });

  test('has show, hide, addToContainer methods', () => {
    expect(source).toMatch(/\bshow\s*\(/);
    expect(source).toMatch(/\bhide\s*\(/);
    expect(source).toMatch(/\baddToContainer\s*\(/);
  });

  test('has visible getter', () => {
    expect(source).toMatch(/get visible\s*\(/);
  });
});

describe('GameUI', () => {
  const source = readModule('ui/GameUI.js');

  test('exports a default class', () => {
    expect(source).toMatch(/export default class GameUI/);
  });

  test('has episode indicator method', () => {
    expect(source).toMatch(/\bupdateEpisodeIndicator\s*\(/);
  });

  test('has location card methods', () => {
    expect(source).toMatch(/\bshowLocationCard\s*\(/);
    expect(source).toMatch(/\bhideLocationCard\s*\(/);
  });

  test('has prompt management methods', () => {
    expect(source).toMatch(/\bshowContinuePrompt\s*\(/);
    expect(source).toMatch(/\bhidePrompts\s*\(/);
  });

  test('accepts callbacks in constructor', () => {
    expect(source).toMatch(/onSkipEpisode/);
    expect(source).toMatch(/onGoBack/);
  });
});

describe('RestaurantScene', () => {
  const source = readModule('restaurant/RestaurantScene.js');

  test('exports a default class', () => {
    expect(source).toMatch(/export default class RestaurantScene/);
  });

  test('has setup and cleanup methods', () => {
    expect(source).toMatch(/\bsetup\s*\(/);
    expect(source).toMatch(/\bcleanup\s*\(/);
  });

  test('has isActive getter', () => {
    expect(source).toMatch(/get isActive\s*\(/);
  });

  test('tracks cutlery for embarrassed effect', () => {
    expect(source).toMatch(/eloraCutleryFork/);
    expect(source).toMatch(/eloraCutleryKnife/);
    expect(source).toMatch(/eloraNapkin/);
  });
});

describe('VisualEffects', () => {
  const source = readModule('effects/VisualEffects.js');

  test('exports all effect functions', () => {
    const expectedExports = [
      'createHeartGraphic', 'createHeart', 'createPixelPlane',
      'createBlushEffect', 'clearBlushEffect', 'createHeartFlutterEffect',
      'createEmbarrassedEffect', 'createHearts',
    ];
    expectedExports.forEach(name => {
      expect(source).toMatch(new RegExp(`export function ${name}\\s*\\(`));
    });
  });
});

describe('Action Utilities', () => {
  const source = readModule('actions/utils.js');

  test('exports advanceDialogue', () => {
    expect(source).toMatch(/export function advanceDialogue\s*\(/);
  });

  test('exports advanceDialogueAfterDelay', () => {
    expect(source).toMatch(/export function advanceDialogueAfterDelay\s*\(/);
  });

  test('advanceDialogue sets isAnimating, increments index, calls processDialogue', () => {
    expect(source).toMatch(/scene\.isAnimating\s*=\s*false/);
    expect(source).toMatch(/scene\.dialogueIndex\+\+/);
    expect(source).toMatch(/scene\.processDialogue\(\)/);
  });
});

describe('Progression Utilities', () => {
  const source = readModule('utils/progression.js');

  test('exports applyUnlocksUpTo', () => {
    expect(source).toMatch(/export function applyUnlocksUpTo\s*\(/);
  });

  test('exports applyCurrentUnlock', () => {
    expect(source).toMatch(/export function applyCurrentUnlock\s*\(/);
  });

  test('imports EPISODES data', () => {
    expect(source).toMatch(/import.*EPISODES.*from/);
  });

  test('handles elora, dog, baby unlocks', () => {
    expect(source).toMatch(/unlock\s*===\s*'elora'/);
    expect(source).toMatch(/unlock\s*===\s*'dog'/);
    expect(source).toMatch(/unlock\s*===\s*'baby'/);
  });
});

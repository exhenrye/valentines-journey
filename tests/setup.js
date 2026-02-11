/**
 * Test Setup - Extracts game data for Node.js testing
 *
 * This parses game.js to extract EPISODES and BACKGROUNDS arrays
 * without requiring a browser environment.
 */

const fs = require('fs');
const path = require('path');

// Read game.js
const gameJsPath = path.join(__dirname, '..', 'game.js');
const gameJs = fs.readFileSync(gameJsPath, 'utf8');

// Extract EPISODES array (lines 7-215)
const episodesMatch = gameJs.match(/const EPISODES = \[([\s\S]*?)\];/);
if (!episodesMatch) {
  throw new Error('Could not find EPISODES array in game.js');
}

// Extract BACKGROUNDS object (lines 218-283)
const backgroundsMatch = gameJs.match(/const BACKGROUNDS = \{([\s\S]*?)\};/);
if (!backgroundsMatch) {
  throw new Error('Could not find BACKGROUNDS object in game.js');
}

// Evaluate the extracted code
// Wrap object in parentheses to ensure it's parsed as expression, not code block
const EPISODES = eval('[' + episodesMatch[1] + ']');
const BACKGROUNDS = eval('({' + backgroundsMatch[1] + '})');

// All action handlers found in game.js (from handleAction switch statement)
const HANDLED_ACTIONS = [
  'wait',
  'enea-wait-right',
  'elora-enter-left',
  'pause-beat',
  'look-at-each-other',
  'pause-before-exit',
  'walk-together-right',
  'exit-right',
  'next-episode',
  'elora-enter',
  'elora-alone',
  'enea-alone',
  'enea-enter',
  'walk-together',
  'walk-together-start',
  'face-each-other',
  'plane',
  'dog-join',
  'baby-arrive',
  'family-arrive',
  'family-together',
  'wedding-setup',
  'elora-walk-aisle',
  'kneel',
  'hearts',
  'photo',
  'finale'
];

module.exports = {
  EPISODES,
  BACKGROUNDS,
  HANDLED_ACTIONS
};

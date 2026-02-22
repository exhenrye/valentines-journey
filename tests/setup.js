/**
 * Test Setup - Loads game data for Node.js testing
 *
 * Reads episode and background data from modular source files,
 * stripping ESM syntax for Node.js/Jest compatibility.
 */

const fs = require('fs');
const path = require('path');

// Load episode files from src/data/episodes/
const episodesDir = path.join(__dirname, '..', 'src', 'data', 'episodes');
const episodeFiles = fs.readdirSync(episodesDir)
  .filter(f => f.startsWith('ep') && f.endsWith('.js'))
  .sort();

const EPISODES = episodeFiles.map(file => {
  const content = fs.readFileSync(path.join(episodesDir, file), 'utf8');
  // Strip ESM syntax: remove 'export default episode;' and 'const episode = '
  const cleaned = content
    .replace(/^export default episode;\s*$/m, '')
    .replace(/^const episode = /m, 'return ');
  // Wrap in a function and evaluate
  return new Function(cleaned)();
});

// Load backgrounds from src/data/backgrounds.js
const bgContent = fs.readFileSync(
  path.join(__dirname, '..', 'src', 'data', 'backgrounds.js'), 'utf8'
);
const bgCleaned = bgContent
  .replace(/^export const BACKGROUNDS = /m, 'return ')
  .replace(/;\s*$/, '');
const BACKGROUNDS = new Function(bgCleaned)();

// Extract action handler names from src/actions/index.js
const actionsIndexContent = fs.readFileSync(
  path.join(__dirname, '..', 'src', 'actions', 'index.js'), 'utf8'
);
// Parse ACTION_HANDLERS keys from the source (e.g., 'walk-together': walkTogetherRight,)
const actionKeyMatches = actionsIndexContent.matchAll(/'([^']+)':/g);
const HANDLED_ACTIONS = [...actionKeyMatches].map(m => m[1]);

module.exports = {
  EPISODES,
  BACKGROUNDS,
  HANDLED_ACTIONS,
};

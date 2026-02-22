// Centralized unlock logic for episode progression

import { EPISODES } from '../data/episodes/index.js';

export function applyUnlocksUpTo(scene, targetIndex) {
  scene.hasElora = false;
  scene.hasDog = false;
  scene.hasBaby = false;
  for (let i = 0; i < targetIndex; i++) {
    const ep = EPISODES[i];
    if (ep.unlock === 'elora') scene.hasElora = true;
    if (ep.unlock === 'dog') scene.hasDog = true;
    if (ep.unlock === 'baby') scene.hasBaby = true;
  }
}

export function applyCurrentUnlock(scene, episode) {
  if (episode.unlock === 'elora') scene.hasElora = true;
  if (episode.unlock === 'dog') scene.hasDog = true;
  if (episode.unlock === 'baby') scene.hasBaby = true;
}

/**
 * Data Validation Tests
 *
 * These tests validate the EPISODES and BACKGROUNDS data structures
 * to catch engineering bugs in game data.
 */

const { EPISODES, BACKGROUNDS } = require('./setup');

describe('EPISODES Data Integrity', () => {
  test('should have exactly 12 episodes', () => {
    expect(EPISODES.length).toBe(12);
  });

  test('episode IDs should be sequential 1-12', () => {
    const ids = EPISODES.map(ep => ep.id);
    expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  test.each(EPISODES)('Episode $id ($name) has all required fields', (episode) => {
    expect(episode.id).toBeGreaterThan(0);
    expect(typeof episode.name).toBe('string');
    expect(episode.name.length).toBeGreaterThan(0);
    expect(typeof episode.date).toBe('string');
    expect(episode.date.length).toBeGreaterThan(0);
    expect(typeof episode.background).toBe('string');
    expect(typeof episode.icon).toBe('string');
    expect(typeof episode.caption).toBe('string');
    expect(episode.caption.length).toBeGreaterThan(0);
    expect(Array.isArray(episode.dialogue)).toBe(true);
    expect(episode.dialogue.length).toBeGreaterThan(0);
  });

  test.each(EPISODES)('Episode $id ($name) has valid background reference', (episode) => {
    expect(BACKGROUNDS).toHaveProperty(episode.background);
  });
});

describe('BACKGROUNDS Data Integrity', () => {
  test('should have 10 background configurations', () => {
    expect(Object.keys(BACKGROUNDS).length).toBe(10);
  });

  test('all backgrounds should have layers array', () => {
    Object.entries(BACKGROUNDS).forEach(([name, config]) => {
      expect(Array.isArray(config.layers)).toBe(true);
      expect(config.layers.length).toBeGreaterThan(0);
    });
  });

  test('all layers should have key and speed properties', () => {
    Object.entries(BACKGROUNDS).forEach(([name, config]) => {
      config.layers.forEach((layer, index) => {
        expect(typeof layer.key).toBe('string');
        expect(typeof layer.speed).toBe('number');
        expect(layer.speed).toBeGreaterThan(0);
        expect(layer.speed).toBeLessThanOrEqual(1);
      });
    });
  });
});

describe('Character Unlock Sequence', () => {
  test('Elora unlocks in Episode 1 (Madrid)', () => {
    const madrid = EPISODES.find(ep => ep.id === 1);
    expect(madrid.unlock).toBe('elora');
    expect(madrid.name).toBe('Madrid');
  });

  test('Dog unlocks in Episode 5 (Totoro)', () => {
    const totoro = EPISODES.find(ep => ep.id === 5);
    expect(totoro.unlock).toBe('dog');
    expect(totoro.name).toBe('Totoro');
  });

  test('Baby unlocks in Episode 11 (Theo)', () => {
    const theo = EPISODES.find(ep => ep.id === 11);
    expect(theo.unlock).toBe('baby');
    expect(theo.name).toBe('Theo');
  });

  test('unlock values are valid', () => {
    const validUnlocks = ['elora', 'dog', 'baby', undefined];
    EPISODES.forEach(ep => {
      expect(validUnlocks).toContain(ep.unlock);
    });
  });

  test('exactly 3 episodes have unlock property', () => {
    const unlockEpisodes = EPISODES.filter(ep => ep.unlock);
    expect(unlockEpisodes.length).toBe(3);
  });
});

describe('Dialogue Structure', () => {
  test('dialogue items have valid structure', () => {
    EPISODES.forEach(ep => {
      ep.dialogue.forEach((item, index) => {
        // Each item should have either speaker+text or action
        const hasSpeaker = 'speaker' in item;
        const hasAction = 'action' in item;

        // At least one of these should be true
        expect(hasSpeaker || hasAction).toBe(true);

        if (hasSpeaker) {
          expect(['enea', 'elora']).toContain(item.speaker);
          expect(typeof item.text).toBe('string');
        }

        if (hasAction) {
          expect(typeof item.action).toBe('string');
        }
      });
    });
  });

  test('final episode ends with finale action', () => {
    const finalEpisode = EPISODES.find(ep => ep.id === 12);
    const lastDialogue = finalEpisode.dialogue[finalEpisode.dialogue.length - 1];
    expect(lastDialogue.action).toBe('finale');
  });

  test('photo action exists in episodes with photos', () => {
    const episodesWithPhotos = EPISODES.filter(ep => !ep.noPhoto);
    episodesWithPhotos.forEach(ep => {
      const hasPhotoAction = ep.dialogue.some(d => d.action === 'photo');
      expect(hasPhotoAction).toBe(true);
    });
  });
});

describe('Episode Progression', () => {
  test('episodes with dialogue end with progression action', () => {
    // Episodes should end with next-episode, photo, or finale
    const progressionActions = ['next-episode', 'photo', 'finale'];

    EPISODES.forEach(ep => {
      const dialogueWithActions = ep.dialogue.filter(d => d.action);
      const lastAction = dialogueWithActions[dialogueWithActions.length - 1];

      if (lastAction) {
        expect(progressionActions).toContain(lastAction.action);
      }
    });
  });
});

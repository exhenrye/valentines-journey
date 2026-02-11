/**
 * Action Handler Validation Tests
 *
 * These tests ensure all dialogue actions have corresponding handlers
 * and that handlers are actually used.
 */

const { EPISODES, HANDLED_ACTIONS } = require('./setup');

describe('Dialogue Action Handlers', () => {
  // Collect all unique actions used in dialogue
  const usedActions = new Set();
  EPISODES.forEach(ep => {
    ep.dialogue.forEach(d => {
      if (d.action) usedActions.add(d.action);
    });
  });

  test('all dialogue actions have corresponding handlers', () => {
    const missingHandlers = [];

    usedActions.forEach(action => {
      if (!HANDLED_ACTIONS.includes(action)) {
        missingHandlers.push(action);
      }
    });

    if (missingHandlers.length > 0) {
      throw new Error(
        `Missing handlers for actions: ${missingHandlers.join(', ')}\n` +
        `Add these to handleAction() in GameScene`
      );
    }

    expect(missingHandlers).toEqual([]);
  });

  test.each([...usedActions])('action "%s" has a handler', (action) => {
    expect(HANDLED_ACTIONS).toContain(action);
  });

  test('all handlers are used (minimal dead code)', () => {
    const unusedHandlers = HANDLED_ACTIONS.filter(h => !usedActions.has(h));

    // Allow some unused handlers (legacy or future use)
    // But warn if too many are unused
    if (unusedHandlers.length > 3) {
      console.warn(
        `Warning: ${unusedHandlers.length} handlers are unused: ${unusedHandlers.join(', ')}`
      );
    }

    // This is a soft check - we allow some unused handlers
    expect(unusedHandlers.length).toBeLessThan(5);
  });
});

describe('Action Usage Statistics', () => {
  test('photo action is used in most episodes', () => {
    const episodesWithPhoto = EPISODES.filter(ep =>
      ep.dialogue.some(d => d.action === 'photo')
    );

    // At least 10 of 12 episodes should have photo action
    expect(episodesWithPhoto.length).toBeGreaterThanOrEqual(10);
  });

  test('hearts action is used for romantic moments', () => {
    const episodesWithHearts = EPISODES.filter(ep =>
      ep.dialogue.some(d => d.action === 'hearts')
    );

    // Hearts should be used in multiple episodes
    expect(episodesWithHearts.length).toBeGreaterThanOrEqual(3);
  });

  test('walk-together-start is followed by walking or photo', () => {
    const walkStartEpisodes = EPISODES.filter(ep =>
      ep.dialogue.some(d => d.action === 'walk-together-start')
    );

    walkStartEpisodes.forEach(ep => {
      const hasWalkOrPhoto = ep.dialogue.some(
        d => d.action === 'walk-together' ||
             d.action === 'walk-together-right' ||
             d.action === 'photo'
      );

      // If we start walking, should continue walking or end with photo
      expect(hasWalkOrPhoto).toBe(true);
    });
  });
});

describe('Special Episode Actions', () => {
  test('Episode 1 (Madrid) uses enea-wait-right and elora-enter-left', () => {
    const madrid = EPISODES.find(ep => ep.id === 1);
    const actions = madrid.dialogue.filter(d => d.action).map(d => d.action);

    expect(actions).toContain('enea-wait-right');
    expect(actions).toContain('elora-enter-left');
  });

  test('Episode 7 (Proposal) uses kneel action', () => {
    const proposal = EPISODES.find(ep => ep.id === 7);
    const actions = proposal.dialogue.filter(d => d.action).map(d => d.action);

    expect(actions).toContain('kneel');
  });

  test('Episode 8 (Wedding) uses wedding-setup and elora-walk-aisle', () => {
    const wedding = EPISODES.find(ep => ep.id === 8);
    const actions = wedding.dialogue.filter(d => d.action).map(d => d.action);

    expect(actions).toContain('wedding-setup');
    expect(actions).toContain('elora-walk-aisle');
  });

  test('Episode 5 (Totoro) uses dog-join action', () => {
    const totoro = EPISODES.find(ep => ep.id === 5);
    const actions = totoro.dialogue.filter(d => d.action).map(d => d.action);

    expect(actions).toContain('dog-join');
  });

  test('Episode 11 (Theo) uses baby-arrive action', () => {
    const theo = EPISODES.find(ep => ep.id === 11);
    const actions = theo.dialogue.filter(d => d.action).map(d => d.action);

    expect(actions).toContain('baby-arrive');
  });

  test('Episode 12 uses finale action', () => {
    const finale = EPISODES.find(ep => ep.id === 12);
    const actions = finale.dialogue.filter(d => d.action).map(d => d.action);

    expect(actions).toContain('finale');
  });
});

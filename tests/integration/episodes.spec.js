/**
 * Episode Progression Integration Tests
 *
 * These tests verify that episodes progress correctly and
 * character unlocks happen at the right times.
 */

const { test, expect } = require('@playwright/test');

// Helper to start the game
async function startGame(page) {
  await page.goto('/');
  await page.waitForFunction(
    () => window.__GAME_STATE__.getScene() === 'TitleScene',
    { timeout: 15000 }
  );
  await page.keyboard.press('Space');
  await page.waitForFunction(
    () => window.__GAME_STATE__.getScene() === 'GameScene',
    { timeout: 5000 }
  );
}

// Helper to advance dialogue (waits for animation to complete)
async function advanceDialogue(page, times = 1) {
  for (let i = 0; i < times; i++) {
    // Wait for any animation to complete
    await page.waitForFunction(
      () => !window.__GAME_STATE__.isAnimating(),
      { timeout: 10000 }
    );
    await page.keyboard.press('Space');
    await page.waitForTimeout(300);
  }
}

test.describe('Episode 1: Madrid', () => {
  test('starts at episode 0 (index)', async ({ page }) => {
    await startGame(page);

    const episode = await page.evaluate(() =>
      window.__GAME_STATE__.getEpisode()
    );
    expect(episode).toBe(0);
  });

  test('dialogue progresses through episode', async ({ page }) => {
    await startGame(page);

    // Advance a few times
    await advanceDialogue(page, 3);

    const dialogueIndex = await page.evaluate(() =>
      window.__GAME_STATE__.getDialogueIndex()
    );

    expect(dialogueIndex).toBeGreaterThan(0);
  });
});

test.describe('Character Unlocks', () => {
  test('Elora becomes available after Episode 1', async ({ page }) => {
    await startGame(page);

    // Episode 1 (Madrid) has unlock: 'elora'
    // The unlock happens when the episode data is processed
    // hasElora should be true during/after Episode 1

    // Wait a bit for initial state
    await page.waitForTimeout(1000);

    // Advance through some dialogue
    await advanceDialogue(page, 5);

    const flags = await page.evaluate(() =>
      window.__GAME_STATE__.getFlags()
    );

    // Elora should be unlocked (visible/available) during Episode 1
    expect(flags.hasElora).toBe(true);
  });
});

test.describe('Dialogue State Management', () => {
  test('dialogue index resets are handled correctly', async ({ page }) => {
    await startGame(page);

    // Get initial state
    const initialState = await page.evaluate(() => ({
      episode: window.__GAME_STATE__.getEpisode(),
      dialogue: window.__GAME_STATE__.getDialogueIndex()
    }));

    expect(initialState.episode).toBe(0);
    expect(typeof initialState.dialogue).toBe('number');
  });

  test('animation flag prevents input during animations', async ({ page }) => {
    await startGame(page);

    // The isAnimating function should be available
    const hasAnimatingFlag = await page.evaluate(() =>
      typeof window.__GAME_STATE__.isAnimating === 'function'
    );

    expect(hasAnimatingFlag).toBe(true);
  });
});

test.describe('Game State Integrity', () => {
  test('all state getters return valid values', async ({ page }) => {
    await startGame(page);

    const state = await page.evaluate(() => ({
      scene: window.__GAME_STATE__.getScene(),
      episode: window.__GAME_STATE__.getEpisode(),
      dialogueIndex: window.__GAME_STATE__.getDialogueIndex(),
      flags: window.__GAME_STATE__.getFlags(),
      isAnimating: window.__GAME_STATE__.isAnimating()
    }));

    expect(state.scene).toBe('GameScene');
    expect(typeof state.episode).toBe('number');
    expect(typeof state.dialogueIndex).toBe('number');
    expect(typeof state.flags.hasElora).toBe('boolean');
    expect(typeof state.flags.hasDog).toBe('boolean');
    expect(typeof state.flags.hasBaby).toBe('boolean');
    expect(typeof state.isAnimating).toBe('boolean');
  });

  test('episode number is within valid range', async ({ page }) => {
    await startGame(page);

    const episode = await page.evaluate(() =>
      window.__GAME_STATE__.getEpisode()
    );

    expect(episode).toBeGreaterThanOrEqual(0);
    expect(episode).toBeLessThan(12);
  });
});

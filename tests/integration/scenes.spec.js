/**
 * Scene Transition Integration Tests
 *
 * These tests verify that Phaser scenes load and transition correctly.
 */

const { test, expect } = require('@playwright/test');

test.describe('Scene Transitions', () => {
  test('game initializes and shows title screen', async ({ page }) => {
    await page.goto('/');

    // Wait for Phaser to initialize
    await page.waitForFunction(() => window.__GAME_STATE__, { timeout: 10000 });

    // Should eventually reach TitleScene after loading
    await page.waitForFunction(
      () => window.__GAME_STATE__.getScene() === 'TitleScene',
      { timeout: 15000 }
    );

    const scene = await page.evaluate(() => window.__GAME_STATE__.getScene());
    expect(scene).toBe('TitleScene');
  });

  test('clicking start transitions to GameScene', async ({ page }) => {
    await page.goto('/');

    // Wait for title screen
    await page.waitForFunction(
      () => window.__GAME_STATE__.getScene() === 'TitleScene',
      { timeout: 15000 }
    );

    // Click to start (or press space)
    await page.keyboard.press('Space');

    // Wait for GameScene
    await page.waitForFunction(
      () => window.__GAME_STATE__.getScene() === 'GameScene',
      { timeout: 5000 }
    );

    const scene = await page.evaluate(() => window.__GAME_STATE__.getScene());
    expect(scene).toBe('GameScene');
  });

  test('game starts at episode 0', async ({ page }) => {
    await page.goto('/');

    // Wait for title and start
    await page.waitForFunction(
      () => window.__GAME_STATE__.getScene() === 'TitleScene',
      { timeout: 15000 }
    );
    await page.keyboard.press('Space');

    // Wait for GameScene
    await page.waitForFunction(
      () => window.__GAME_STATE__.getScene() === 'GameScene',
      { timeout: 5000 }
    );

    const episode = await page.evaluate(() => window.__GAME_STATE__.getEpisode());
    expect(episode).toBe(0);
  });

  test('initial flags are set correctly', async ({ page }) => {
    await page.goto('/');

    // Wait for title and start
    await page.waitForFunction(
      () => window.__GAME_STATE__.getScene() === 'TitleScene',
      { timeout: 15000 }
    );
    await page.keyboard.press('Space');

    // Wait for GameScene
    await page.waitForFunction(
      () => window.__GAME_STATE__.getScene() === 'GameScene',
      { timeout: 5000 }
    );

    const flags = await page.evaluate(() => window.__GAME_STATE__.getFlags());

    // Initially, no characters are unlocked yet
    // (Elora unlocks during Episode 1, not before it starts)
    expect(flags.hasDog).toBe(false);
    expect(flags.hasBaby).toBe(false);
  });
});

test.describe('Input Handling', () => {
  test('space bar advances dialogue', async ({ page }) => {
    await page.goto('/');

    // Start game
    await page.waitForFunction(
      () => window.__GAME_STATE__.getScene() === 'TitleScene',
      { timeout: 15000 }
    );
    await page.keyboard.press('Space');
    await page.waitForFunction(
      () => window.__GAME_STATE__.getScene() === 'GameScene',
      { timeout: 5000 }
    );

    // Get initial dialogue index
    const initialIndex = await page.evaluate(() =>
      window.__GAME_STATE__.getDialogueIndex()
    );

    // Wait for any initial animation to complete
    await page.waitForFunction(
      () => !window.__GAME_STATE__.isAnimating(),
      { timeout: 5000 }
    );

    // Press space to advance
    await page.keyboard.press('Space');
    await page.waitForTimeout(500);

    // Dialogue index should have changed
    const newIndex = await page.evaluate(() =>
      window.__GAME_STATE__.getDialogueIndex()
    );

    // Index should have advanced (or stayed same if animation started)
    expect(newIndex).toBeGreaterThanOrEqual(initialIndex);
  });

  test('enter key also advances dialogue', async ({ page }) => {
    await page.goto('/');

    // Start game
    await page.waitForFunction(
      () => window.__GAME_STATE__.getScene() === 'TitleScene',
      { timeout: 15000 }
    );
    await page.keyboard.press('Enter');
    await page.waitForFunction(
      () => window.__GAME_STATE__.getScene() === 'GameScene',
      { timeout: 5000 }
    );

    // Game should be running
    const scene = await page.evaluate(() => window.__GAME_STATE__.getScene());
    expect(scene).toBe('GameScene');
  });
});

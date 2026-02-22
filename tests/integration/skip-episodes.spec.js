/**
 * Episode Skip Integration Tests
 *
 * Verifies that skipping to specific episodes correctly applies
 * all unlocks from prior episodes and sets the right state.
 */

const { test, expect } = require('@playwright/test');

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

test.describe('Episode Skipping', () => {
  test('skip to EP5 sets hasDog flag', async ({ page }) => {
    await startGame(page);

    // EP5 is index 4, dog unlocks at EP5 (id 5, index 4)
    // Skip to EP6 (index 5) so EP5 unlock has been applied
    await page.evaluate(() => window.__GAME_STATE__.skipToEpisode(5));

    // Wait for transition
    await page.waitForTimeout(1000);
    await page.waitForFunction(
      () => !window.__GAME_STATE__.isAnimating(),
      { timeout: 10000 }
    );

    const flags = await page.evaluate(() =>
      window.__GAME_STATE__.getFlags()
    );

    expect(flags.hasElora).toBe(true);
    expect(flags.hasDog).toBe(true);
  });

  test('skip to EP11 sets hasBaby flag', async ({ page }) => {
    await startGame(page);

    // Baby unlocks at EP11 (id 11, index 10)
    // Skip to EP12 (index 11) so EP11 unlock has been applied
    await page.evaluate(() => window.__GAME_STATE__.skipToEpisode(11));

    await page.waitForTimeout(1000);
    await page.waitForFunction(
      () => !window.__GAME_STATE__.isAnimating(),
      { timeout: 10000 }
    );

    const flags = await page.evaluate(() =>
      window.__GAME_STATE__.getFlags()
    );

    expect(flags.hasElora).toBe(true);
    expect(flags.hasDog).toBe(true);
    expect(flags.hasBaby).toBe(true);
  });

  test('skip to EP1 starts with no companions unlocked', async ({ page }) => {
    await startGame(page);

    // Skip to episode 0 (EP1) — no prior episodes to unlock from
    await page.evaluate(() => window.__GAME_STATE__.skipToEpisode(0));

    await page.waitForTimeout(1000);
    await page.waitForFunction(
      () => !window.__GAME_STATE__.isAnimating(),
      { timeout: 10000 }
    );

    const flags = await page.evaluate(() =>
      window.__GAME_STATE__.getFlags()
    );

    expect(flags.hasDog).toBe(false);
    expect(flags.hasBaby).toBe(false);
  });

  test('skip updates episode index correctly', async ({ page }) => {
    await startGame(page);

    await page.evaluate(() => window.__GAME_STATE__.skipToEpisode(7));

    await page.waitForTimeout(1000);
    await page.waitForFunction(
      () => !window.__GAME_STATE__.isAnimating(),
      { timeout: 10000 }
    );

    const episode = await page.evaluate(() =>
      window.__GAME_STATE__.getEpisode()
    );

    expect(episode).toBe(7);
  });

  test('skip resets dialogue history', async ({ page }) => {
    await startGame(page);

    // Build some history first
    for (let i = 0; i < 3; i++) {
      await page.waitForFunction(
        () => !window.__GAME_STATE__.isAnimating(),
        { timeout: 10000 }
      );
      await page.keyboard.press('Space');
      await page.waitForTimeout(300);
    }

    // Skip to another episode
    await page.evaluate(() => window.__GAME_STATE__.skipToEpisode(3));

    await page.waitForTimeout(1000);
    await page.waitForFunction(
      () => !window.__GAME_STATE__.isAnimating(),
      { timeout: 10000 }
    );

    const historyLength = await page.evaluate(() =>
      window.__GAME_STATE__.getHistoryLength()
    );

    // History should be reset for the new episode
    expect(historyLength).toBe(0);
  });
});

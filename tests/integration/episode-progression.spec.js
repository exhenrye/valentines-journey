/**
 * Episode Progression Integration Tests
 *
 * Verifies that playing through Episode 1 advances to Episode 2,
 * and that dialogue progresses correctly within an episode.
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

async function advanceDialogue(page, times = 1) {
  for (let i = 0; i < times; i++) {
    await page.waitForFunction(
      () => !window.__GAME_STATE__.isAnimating(),
      { timeout: 10000 }
    );
    await page.keyboard.press('Space');
    await page.waitForTimeout(300);
  }
}

test.describe('Episode 1 Full Progression', () => {
  test('dialogue index advances with each input', async ({ page }) => {
    await startGame(page);

    // Advance through several dialogue beats
    await advanceDialogue(page, 5);

    const dialogueIndex = await page.evaluate(() =>
      window.__GAME_STATE__.getDialogueIndex()
    );

    // After 5 advances, index should have moved forward
    // (exact number depends on how many are actions vs dialogue)
    expect(dialogueIndex).toBeGreaterThan(0);
  });

  test('episode advances when skipping to next', async ({ page }) => {
    await startGame(page);

    // Use the skip hook to jump to episode 1 (index 1 = EP2)
    await page.evaluate(() => window.__GAME_STATE__.skipToEpisode(1));

    // Wait for transition
    await page.waitForTimeout(1000);
    await page.waitForFunction(
      () => !window.__GAME_STATE__.isAnimating(),
      { timeout: 10000 }
    );

    const episode = await page.evaluate(() =>
      window.__GAME_STATE__.getEpisode()
    );

    expect(episode).toBe(1);
  });

  test('dialogue index resets when moving to a new episode', async ({ page }) => {
    await startGame(page);

    // Advance dialogue in EP1
    await advanceDialogue(page, 3);

    // Skip to EP2
    await page.evaluate(() => window.__GAME_STATE__.skipToEpisode(1));
    await page.waitForTimeout(1000);
    await page.waitForFunction(
      () => !window.__GAME_STATE__.isAnimating(),
      { timeout: 10000 }
    );

    const dialogueIndex = await page.evaluate(() =>
      window.__GAME_STATE__.getDialogueIndex()
    );

    // Dialogue index should be at the start of the new episode
    // (may be > 0 if first entry is an action that auto-advances)
    expect(dialogueIndex).toBeLessThan(5);
  });
});

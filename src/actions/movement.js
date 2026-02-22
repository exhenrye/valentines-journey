import { advanceDialogue, advanceDialogueAfterDelay } from './utils.js';

export function walkTogetherRight(scene, dialogue) {
  // Both face right and walk together
  // Keep characters mostly stationary, scroll background to create movement illusion
  scene.enea.setFlipX(true); // Flip to face right
  scene.elora.setFlipX(true); // Flip to face right
  scene.enea.play('male-walk');
  scene.elora.play('female-walk');

  // Position characters in center of screen (they "walk in place" while world moves)
  scene.enea.setPosition(scene.width * 0.55, scene.groundY);
  scene.elora.setPosition(scene.width * 0.4, scene.groundY);

  // Scroll background to create walking illusion (slower, more comfortable)
  scene.tweens.add({
    targets: { val: 0 },
    val: 1,
    duration: 3000,
    onUpdate: () => {
      scene.bgLayers.forEach(layer => {
        layer.sprite.tilePositionX += layer.speed * 2;
      });
    },
    onComplete: () => {
      scene.enea.stop();
      scene.enea.setFrame(0);
      scene.elora.stop();
      scene.elora.setFrame(0);
      advanceDialogue(scene);
    },
  });
}

export function exitRight(scene, dialogue) {
  // Both walk and exit to the right
  // Sprites naturally face LEFT, so flip to face RIGHT
  scene.enea.setFlipX(true);
  scene.elora.setFlipX(true);
  scene.enea.play('male-walk');
  scene.elora.play('female-walk');

  // Continue scrolling background (slower, more comfortable)
  scene.tweens.add({
    targets: { val: 0 },
    val: 1,
    duration: 2500,
    onUpdate: () => {
      scene.bgLayers.forEach(layer => {
        layer.sprite.tilePositionX += layer.speed * 1.5;
      });
    },
  });

  scene.tweens.add({
    targets: [scene.enea, scene.elora],
    x: scene.width + 150,
    duration: 2500,
    ease: 'Linear',
    onComplete: () => {
      scene.enea.stop();
      scene.elora.stop();
      scene.enea.setVisible(false);
      scene.elora.setVisible(false);
      advanceDialogue(scene);
    },
  });
}

export function walkTogether(scene, dialogue) {
  scene.walkTogether(() => {
    advanceDialogue(scene);
  });
}

export function walkTogetherStart(scene, dialogue) {
  // Setup for walking right together
  const walkStartEneaX = scene.width * 0.3;
  const walkStartEloraX = scene.width * 0.48;

  scene.enea.setPosition(walkStartEneaX, scene.groundY);
  scene.enea.setVisible(true);
  scene.enea.setFlipX(true); // Face right
  scene.eneaExpectedX = walkStartEneaX;

  if (scene.hasElora) {
    scene.elora.setPosition(walkStartEloraX, scene.groundY);
    scene.elora.setVisible(true);
    scene.elora.setFlipX(true); // Face right
    scene.eloraExpectedX = walkStartEloraX;
  }
  if (scene.hasDog) {
    scene.dog.setPosition(scene.width * 0.22, scene.dogGroundY);
    scene.dog.setFlipX(true); // Face right (walking direction)
    scene.dog.setVisible(true);
  }
  if (scene.hasCats) {
    scene.cat1.setPosition(scene.width * 0.14, scene.groundY);
    scene.cat1.setFlipX(true);
    scene.cat1.setVisible(true);
    scene.cat1.play('cat-idle-anim');
    scene.cat2.setPosition(scene.width * 0.1, scene.groundY);
    scene.cat2.setFlipX(true);
    scene.cat2.setVisible(true);
    scene.cat2.play('cat-idle-anim');
  }
  if (scene.hasHorse) {
    scene.horse.setPosition(scene.width * 0.03, scene.groundY);
    scene.horse.setFlipX(true);
    scene.horse.setVisible(true);
  }
  advanceDialogue(scene);
}

export function pauseBeforeExit(scene, dialogue) {
  // Brief stop before exiting - characters stop walking
  const exitPauseDuration = dialogue.duration || 600;
  scene.enea.stop();
  scene.enea.setFrame(0);
  scene.elora.stop();
  scene.elora.setFrame(0);

  advanceDialogueAfterDelay(scene, exitPauseDuration);
}

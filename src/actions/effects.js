export function wait(scene, dialogue) {
  scene.showSpeech(dialogue.speaker, dialogue.text);
}

export function pauseBeat(scene, dialogue) {
  // Dramatic pause - no interaction, just wait
  const pauseDuration = dialogue.duration || 800;
  scene.time.delayedCall(pauseDuration, () => {
    scene.isAnimating = false;
    scene.dialogueIndex++;
    scene.processDialogue();
  });
}

export function lookAtEachOther(scene, dialogue) {
  // Romantic pause with heart floating up
  const lookDuration = dialogue.duration || 1200;

  // Use expected positions as fallback
  const lookEneaX = scene.enea.x > 100 ? scene.enea.x : (scene.eneaExpectedX || scene.width * 0.7);
  const lookEloraX = scene.elora.x > 100 ? scene.elora.x : (scene.eloraExpectedX || scene.width * 0.35);

  // Create a drawn heart that floats up between them
  const heartX = (lookEneaX + lookEloraX) / 2;
  const heartY = scene.groundY - 100;
  const floatingHeart = scene.createHeartGraphic(heartX, heartY, 20, 0xe57373);
  floatingHeart.setAlpha(0).setDepth(150);

  // Fade in and float up
  scene.tweens.add({
    targets: floatingHeart,
    alpha: 1,
    y: heartY - 60,
    duration: lookDuration * 0.7,
    ease: 'Sine.easeOut',
    onComplete: () => {
      // Fade out
      scene.tweens.add({
        targets: floatingHeart,
        alpha: 0,
        y: heartY - 80,
        duration: lookDuration * 0.3,
        ease: 'Sine.easeIn',
        onComplete: () => {
          floatingHeart.destroy();
          scene.isAnimating = false;
          scene.dialogueIndex++;
          scene.processDialogue();
        },
      });
    },
  });
}

export function hearts(scene, dialogue) {
  scene.createHearts();
  scene.time.delayedCall(2000, () => {
    scene.isAnimating = false;
    scene.dialogueIndex++;
    scene.processDialogue();
  });
}

export function photo(scene, dialogue) {
  scene.showPhoto();
}

export function finale(scene, dialogue) {
  scene.cameras.main.fadeOut(1000, 0, 0, 0);
  scene.time.delayedCall(1000, () => {
    scene.scene.start('FinaleScene');
  });
}

import { createHearts } from '../effects/VisualEffects.js';

export function eneaWaitRight(scene, dialogue) {
  // Explicitly position Enea at 70% width, facing left
  const waitRightX = scene.width * 0.7;
  scene.enea.setPosition(waitRightX, scene.groundY);
  scene.enea.setFlipX(false); // Face left toward where Elora will appear
  scene.enea.setVisible(true);
  scene.enea.setAlpha(1);
  scene.enea.stop();
  scene.enea.setFrame(0);
  scene.eneaExpectedX = waitRightX;

  scene.isAnimating = false;
  scene.dialogueIndex++;
  scene.time.delayedCall(50, () => {
    scene.processDialogue();
  });
}

export function eloraEnterLeft(scene, dialogue) {
  // Elora enters from the left, walking right toward Enea
  // Per storyboard: walks from -100 to width * 0.35, facing right
  scene.hasElora = true;
  const eloraTargetX = scene.width * 0.35;
  scene.elora.setPosition(-100, scene.groundY);
  scene.elora.setVisible(true);
  scene.elora.setFlipX(true); // Face right (walking direction)
  scene.elora.play('female-walk');

  // Store expected position for speech bubble
  scene.eloraExpectedX = eloraTargetX;

  scene.tweens.add({
    targets: scene.elora,
    x: eloraTargetX,
    duration: 2500,
    ease: 'Linear',
    onComplete: () => {
      scene.elora.stop();
      scene.elora.setFrame(0);
      scene.elora.setFlipX(true); // Face right toward Enea
      scene.isAnimating = false;
      scene.dialogueIndex++;
      scene.processDialogue();
    },
  });
}

export function eloraEnter(scene, dialogue) {
  // Elora enters from RIGHT, walks LEFT — stops at conversational distance from Enea
  scene.hasElora = true;
  const targetX = scene.width * 0.7;
  scene.elora.setPosition(scene.width + 100, scene.groundY);
  scene.elora.setVisible(true);
  scene.elora.setFlipX(false); // Face left (natural direction)
  scene.elora.play('female-walk');
  scene.eloraExpectedX = targetX;

  scene.tweens.add({
    targets: scene.elora,
    x: targetX,
    duration: 2000,
    ease: 'Linear',
    onComplete: () => {
      scene.elora.stop();
      scene.elora.setFrame(0);
      scene.showSpeech(dialogue.speaker, dialogue.text);
    },
  });
}

export function eloraAlone(scene, dialogue) {
  scene.elora.setPosition(scene.width * 0.5, scene.groundY);
  scene.elora.setVisible(true);
  scene.enea.setVisible(false);
  scene.showSpeech(dialogue.speaker, dialogue.text);
}

export function eneaAlone(scene, dialogue) {
  scene.enea.setPosition(scene.width * 0.5, scene.groundY);
  scene.enea.setVisible(true);
  scene.elora.setVisible(false);
  scene.showSpeech(dialogue.speaker, dialogue.text);
}

export function eneaEnter(scene, dialogue) {
  // Enea enters from LEFT, walks RIGHT
  scene.enea.setPosition(-100, scene.groundY);
  scene.enea.setVisible(true);
  scene.enea.setFlipX(true); // Flip to face right
  scene.enea.play('male-walk');

  scene.tweens.add({
    targets: scene.enea,
    x: scene.width * 0.4,
    duration: 2000,
    ease: 'Linear',
    onComplete: () => {
      scene.enea.stop();
      scene.enea.setFrame(0);
      scene.showSpeech(dialogue.speaker, dialogue.text);
    },
  });
}

export function faceEachOther(scene, dialogue) {
  // Enea on left, Elora on right, facing each other
  const faceEneaX = scene.width * 0.4;
  const faceEloraX = scene.width * 0.6;

  scene.enea.setPosition(faceEneaX, scene.groundY);
  scene.enea.setFlipX(true); // Face right toward Elora
  scene.enea.setVisible(true);
  scene.eneaExpectedX = faceEneaX;

  scene.elora.setPosition(faceEloraX, scene.groundY);
  scene.elora.setFlipX(false); // Face left toward Enea
  scene.elora.setVisible(true);
  scene.eloraExpectedX = faceEloraX;

  scene.isAnimating = false;
  scene.dialogueIndex++;
  scene.processDialogue();
}

export function familyArrive(scene, dialogue) {
  scene.enea.setPosition(scene.width * 0.3, scene.groundY);
  scene.enea.setVisible(true);
  scene.eneaExpectedX = scene.width * 0.3;
  scene.elora.setPosition(scene.width * 0.5, scene.groundY);
  scene.elora.setVisible(true);
  scene.eloraExpectedX = scene.width * 0.5;
  if (scene.hasDog) {
    scene.dog.setPosition(scene.width * 0.2, scene.dogGroundY);
    scene.dog.setFlipX(true);
    scene.dog.setVisible(true);
  }
  if (scene.hasCats) {
    scene.cat1.setPosition(scene.width * 0.14, scene.groundY);
    scene.cat1.setFlipX(true);
    scene.cat1.setVisible(true);
    scene.cat1.play('cat-idle-anim');
    scene.cat2.setPosition(scene.width * 0.08, scene.groundY);
    scene.cat2.setFlipX(true);
    scene.cat2.setVisible(true);
    scene.cat2.play('cat-idle-anim');
  }
  if (scene.hasHorse) {
    scene.horse.setPosition(scene.width * 0.03, scene.groundY);
    scene.horse.setFlipX(true);
    scene.horse.setVisible(true);
  }
  scene.isAnimating = false;
  scene.dialogueIndex++;
  scene.processDialogue();
}

export function eneaEnterRight(scene, dialogue) {
  // Enea enters from RIGHT, walks LEFT — stops at conversational distance
  const targetX = scene.width * 0.7;
  scene.enea.setPosition(scene.width + 100, scene.groundY);
  scene.enea.setVisible(true);
  scene.enea.setFlipX(false); // Face left (natural direction)
  scene.enea.play('male-walk');
  scene.eneaExpectedX = targetX;

  scene.tweens.add({
    targets: scene.enea,
    x: targetX,
    duration: 2000,
    ease: 'Linear',
    onComplete: () => {
      scene.enea.stop();
      scene.enea.setFrame(0);
      scene.showSpeech(dialogue.speaker, dialogue.text);
    },
  });
}

export function embrace(scene, dialogue) {
  // Two-phase embrace: approach close, hearts, then separate to conversation distance
  // meetX = midpoint between characters so they move equal distances
  const eneaX = scene.enea.x;
  const eloraX = scene.elora.x;
  const meetX = (eneaX + eloraX) / 2;
  const closeGap = 40; // 80px apart at closest (visible but intimate)
  const convGap = 130; // 260px apart for conversation after

  // Reset scale and Y position from any prior modifications (e.g., kneel sinks Y)
  scene.enea.setScale(3);
  scene.enea.setY(scene.groundY);
  scene.elora.setScale(3);

  // Clean up proposal ring if present (from kneel action)
  if (scene.proposalRing) { scene.proposalRing.destroy(); scene.proposalRing = null; }
  if (scene.proposalRingGlow) { scene.proposalRingGlow.destroy(); scene.proposalRingGlow = null; }

  // Determine who's left vs right so they face each other
  const eneaIsLeft = eneaX <= eloraX;
  const eneaCloseX = eneaIsLeft ? meetX - closeGap : meetX + closeGap;
  const eloraCloseX = eneaIsLeft ? meetX + closeGap : meetX - closeGap;

  // Phase 1: Walk toward each other
  scene.enea.setFlipX(eneaIsLeft); // Face right if left, face left if right
  scene.elora.setFlipX(!eneaIsLeft); // Opposite of Enea
  scene.enea.play('male-walk');
  scene.elora.play('female-walk');

  scene.tweens.add({
    targets: scene.enea,
    x: eneaCloseX,
    duration: 1200,
    ease: 'Linear',
  });

  scene.tweens.add({
    targets: scene.elora,
    x: eloraCloseX,
    duration: 1200,
    ease: 'Linear',
    onComplete: () => {
      // Stop walking — they've met
      scene.enea.stop();
      scene.enea.setFrame(0);
      scene.elora.stop();
      scene.elora.setFrame(0);

      // Hearts while they're close together
      createHearts(scene);

      // Phase 2: Hold close for a moment, then separate to conversation distance
      const eneaSepX = eneaIsLeft ? meetX - convGap : meetX + convGap;
      const eloraSepX = eneaIsLeft ? meetX + convGap : meetX - convGap;
      scene.time.delayedCall(1500, () => {
        scene.tweens.add({
          targets: scene.enea,
          x: eneaSepX,
          duration: 800,
          ease: 'Sine.easeInOut',
        });

        scene.tweens.add({
          targets: scene.elora,
          x: eloraSepX,
          duration: 800,
          ease: 'Sine.easeInOut',
          onComplete: () => {
            // Set expected positions for speech bubble anchoring
            scene.eneaExpectedX = eneaSepX;
            scene.eloraExpectedX = eloraSepX;
            scene.isAnimating = false;
            scene.dialogueIndex++;
            scene.processDialogue();
          },
        });
      });
    },
  });
}

export function familyTogether(scene, dialogue) {
  // Family positioned together, facing right (ready to walk)
  scene.enea.setPosition(scene.width * 0.3, scene.groundY);
  scene.enea.setFlipX(true); // Face right
  scene.enea.setVisible(true);
  scene.eneaExpectedX = scene.width * 0.3;
  scene.elora.setPosition(scene.width * 0.5, scene.groundY);
  scene.elora.setFlipX(true); // Face right
  scene.elora.setVisible(true);
  scene.eloraExpectedX = scene.width * 0.5;
  if (scene.hasDog) {
    scene.dog.setPosition(scene.width * 0.2, scene.dogGroundY);
    scene.dog.setFlipX(true);
    scene.dog.setVisible(true);
  }
  if (scene.hasBaby) {
    scene.baby.setPosition(scene.width * 0.4, scene.groundY);
    scene.baby.setVisible(true);
    scene.baby.play('baby-idle');
  }
  if (scene.hasCats) {
    scene.cat1.setPosition(scene.width * 0.14, scene.groundY);
    scene.cat1.setFlipX(true);
    scene.cat1.setVisible(true);
    scene.cat1.play('cat-idle-anim');
    scene.cat2.setPosition(scene.width * 0.08, scene.groundY);
    scene.cat2.setFlipX(true);
    scene.cat2.setVisible(true);
    scene.cat2.play('cat-idle-anim');
  }
  if (scene.hasHorse) {
    scene.horse.setPosition(scene.width * 0.05, scene.groundY);
    scene.horse.setFlipX(true);
    scene.horse.setVisible(true);
  }
  scene.isAnimating = false;
  scene.dialogueIndex++;
  scene.processDialogue();
}

import { EPISODES } from '../data/episodes/index.js';

export function nextEpisode(scene, dialogue) {
  // Handle unlock before advancing (same as photo action)
  const currentEp = EPISODES[scene.currentEpisode];
  if (currentEp.unlock === 'elora') scene.hasElora = true;
  if (currentEp.unlock === 'dog') scene.hasDog = true;
  if (currentEp.unlock === 'baby') scene.hasBaby = true;

  // Skip to next episode without photo
  scene.currentEpisode++;
  if (scene.currentEpisode < EPISODES.length) {
    scene.cameras.main.fadeOut(500, 0, 0, 0);
    scene.time.delayedCall(500, () => {
      scene.cameras.main.fadeIn(500, 0, 0, 0);
      scene.startEpisode();
    });
  }
}

export function plane(scene, dialogue) {
  const startY = scene.height * 0.22;
  const endY = scene.height * 0.18;
  const flightDuration = 5500;

  scene.plane.setPosition(-200, startY);
  scene.plane.setVisible(true);
  scene.plane.setRotation(-0.06); // Entry bank

  // Ground shadow — translucent oval that tracks the plane's X
  const shadowY = scene.groundY - 10;
  const shadow = scene.add.ellipse(
    -200, shadowY, 80, 12, 0x000000, 0.15
  ).setDepth(50);

  // Dual contrails — one from each engine, offset from plane tail
  const trailTimer = scene.time.addEvent({
    delay: 35,
    callback: () => {
      if (!scene.plane.visible) return;
      const trailX = scene.plane.x - 70;
      [-10, 10].forEach(offset => {
        const dot = scene.add.circle(
          trailX, scene.plane.y + offset,
          2.5 + Math.random() * 2, 0xffffff, 0.45
        ).setDepth(199);
        scene.tweens.add({
          targets: dot,
          alpha: 0,
          scaleX: 5,
          scaleY: 3,
          duration: 1800,
          onComplete: () => dot.destroy(),
        });
      });
    },
    loop: true,
  });

  // Horizontal movement
  scene.tweens.add({
    targets: scene.plane,
    x: scene.width + 200,
    duration: flightDuration,
    ease: 'Sine.easeInOut',
    onUpdate: (tween) => {
      const t = tween.progress;
      // Sine wave vertical oscillation (±10px, gentler)
      const baseY = startY + (endY - startY) * t;
      const oscillation = Math.sin(t * Math.PI * 3) * 10;
      scene.plane.y = baseY + oscillation;

      // Track shadow to plane X (with vertical compression for perspective)
      shadow.x = scene.plane.x;
      shadow.setAlpha(0.12 + 0.06 * Math.sin(t * Math.PI)); // Strongest at center

      // Ease rotation: bank in → level → slight exit climb
      if (t < 0.25) {
        scene.plane.setRotation(-0.06 * (1 - t / 0.25));
      } else if (t > 0.75) {
        scene.plane.setRotation(0.04 * ((t - 0.75) / 0.25));
      } else {
        scene.plane.setRotation(0);
      }
    },
    onComplete: () => {
      scene.plane.setVisible(false);
      scene.plane.setRotation(0);
      shadow.destroy();
      trailTimer.destroy();
      scene.isAnimating = false;
      scene.dialogueIndex++;
      scene.processDialogue();
    },
  });
}

export function dogJoin(scene, dialogue) {
  scene.hasDog = true;
  scene.dog.setPosition(scene.width * 0.5, scene.dogGroundY);
  scene.dog.setVisible(true);
  scene.dog.setAlpha(0);

  scene.tweens.add({
    targets: scene.dog,
    alpha: 1,
    duration: 500,
    onComplete: () => {
      scene.isAnimating = false;
      scene.dialogueIndex++;
      scene.processDialogue();
    },
  });
}

export function babyArrive(scene, dialogue) {
  scene.hasBaby = true;
  scene.baby.setPosition(scene.width * 0.5, scene.groundY);
  scene.baby.setVisible(true);
  scene.baby.setAlpha(0);
  scene.baby.play('baby-idle');

  scene.tweens.add({
    targets: scene.baby,
    alpha: 1,
    duration: 500,
    onComplete: () => {
      scene.isAnimating = false;
      scene.dialogueIndex++;
      scene.processDialogue();
    },
  });
}

export function restaurantScene(scene, dialogue) {
  // Kill character movement tweens before restaurant setup (not all tweens)
  scene.tweens.killTweensOf([scene.enea, scene.elora, scene.dog]);
  // Transition to restaurant interior
  scene.setupRestaurant();
  scene.isAnimating = false;
  scene.dialogueIndex++;
  scene.processDialogue();
}

export function weddingSetup(scene, dialogue) {
  // Wedding: Enea waits on right, Elora starts far left, facing each other
  const eneaX = scene.width * 0.7;
  const eloraX = scene.width * 0.15;
  scene.enea.setPosition(eneaX, scene.groundY);
  scene.enea.setFlipX(false); // Face left toward Elora
  scene.enea.setVisible(true);
  scene.eneaExpectedX = eneaX;
  scene.elora.setPosition(eloraX, scene.groundY);
  scene.elora.setFlipX(true); // Face right toward Enea
  scene.elora.setVisible(true);
  scene.eloraExpectedX = eloraX;
  scene.showSpeech(dialogue.speaker, dialogue.text);
}

export function eloraWalkAisle(scene, dialogue) {
  // Elora walks the aisle from far left toward Enea on the right
  // Stop at 0.45 (576px) — Enea stays at 0.65 (832px) = 256px gap
  const eloraTarget = scene.width * 0.45;
  const eneaTarget = scene.width * 0.65;
  scene.elora.play('female-walk');
  scene.tweens.add({
    targets: scene.elora,
    x: eloraTarget,
    duration: 3000,
    ease: 'Linear',
    onComplete: () => {
      scene.elora.stop();
      scene.elora.setFrame(0);
      scene.enea.setPosition(eneaTarget, scene.groundY);
      scene.eneaExpectedX = eneaTarget;
      scene.eloraExpectedX = eloraTarget;
      scene.isAnimating = false;
      scene.dialogueIndex++;
      scene.processDialogue();
    },
  });
}

export function kneel(scene, dialogue) {
  // Kneel effect: sink Enea below the ground line so legs are hidden off-screen
  // At scale 3 (192px tall), sinking 60px hides ~30% = kneeling appearance
  const ringX = scene.enea.x + (scene.enea.flipX ? 40 : -40);
  const ringY = scene.groundY - 50;

  scene.tweens.add({
    targets: scene.enea,
    y: scene.groundY + 60,
    duration: 600,
    ease: 'Sine.easeInOut',
    onComplete: () => {
      // Show ring with pop-in effect
      const ring = scene.add.image(ringX, ringY + 20, 'ring-pixel')
        .setScale(0.5).setDepth(150).setAlpha(0);
      scene.proposalRing = ring;

      scene.tweens.add({
        targets: ring,
        alpha: 1,
        y: ringY,
        scale: 3.5,
        duration: 400,
        ease: 'Back.easeOut',
      });

      // Diamond sparkle glow
      const glow = scene.add.circle(ringX, ringY - 4, 18, 0x88ccff, 0.15).setDepth(149);
      scene.tweens.add({
        targets: glow,
        alpha: 0.05,
        scaleX: 0.8,
        scaleY: 0.8,
        duration: 800,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
      scene.proposalRingGlow = glow;

      // Show speech if this dialogue entry has text
      if (dialogue.speaker && dialogue.text) {
        scene.showSpeech(dialogue.speaker, dialogue.text);
      } else {
        scene.isAnimating = false;
        scene.dialogueIndex++;
        scene.processDialogue();
      }
    },
  });
}

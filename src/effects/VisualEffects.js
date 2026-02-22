// Visual effect functions extracted from GameScene
// All functions receive (scene, ...) as first param — same pattern as action handlers

export function createHeartGraphic(scene, x, y, size, color) {
  const scale = size / 8;
  const heart = scene.add.image(x, y, 'heart-pixel')
    .setScale(scale)
    .setOrigin(0.5, 0.5);
  if (color && color !== 0xe57373) {
    heart.setTint(color);
  }
  return heart;
}

export function createHeart(scene, x, y, size, color) {
  const scale = size / 8;
  const heart = scene.add.image(x, y, 'heart-pixel').setScale(scale);
  if (color && color !== 0xe57373) heart.setTint(color);
  return heart;
}

export function createPixelPlane(scene) {
  const plane = scene.add.image(0, 0, 'plane-pixel')
    .setDepth(200)
    .setScale(4);
  return plane;
}

export function createBlushEffect(scene) {
  const blushMarks = [];

  const eneaX = scene.enea.x > 100 ? scene.enea.x : (scene.eneaExpectedX || scene.width * 0.7);
  const eloraX = scene.elora.x > 100 ? scene.elora.x : (scene.eloraExpectedX || scene.width * 0.35);

  const eneaBlush = scene.add.text(eneaX + 15, scene.groundY - 140, '///', {
    fontSize: '18px',
    color: '#ffb6c1'
  }).setOrigin(0.5).setAlpha(0).setDepth(150).setRotation(-0.2);

  const eloraBlush = scene.add.text(eloraX - 15, scene.groundY - 140, '///', {
    fontSize: '18px',
    color: '#ffb6c1'
  }).setOrigin(0.5).setAlpha(0).setDepth(150).setRotation(0.2);

  blushMarks.push(eneaBlush, eloraBlush);

  scene.currentBlushMarks = blushMarks;

  blushMarks.forEach((blush, i) => {
    scene.tweens.add({
      targets: blush,
      alpha: 0.8,
      duration: 300,
      delay: i * 100
    });

    scene.tweens.add({
      targets: blush,
      y: blush.y - 3,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  });
}

export function clearBlushEffect(scene) {
  if (scene.currentBlushMarks) {
    scene.currentBlushMarks.forEach(blush => {
      scene.tweens.add({
        targets: blush,
        alpha: 0,
        duration: 300,
        onComplete: () => blush.destroy()
      });
    });
    scene.currentBlushMarks = null;
  }
}

export function createHeartFlutterEffect(scene) {
  const eneaX = scene.enea.x > 100 ? scene.enea.x : (scene.eneaExpectedX || scene.width * 0.7);

  for (let i = 0; i < 3; i++) {
    const heart = scene.add.image(
      eneaX - 20 + i * 18,
      scene.groundY - 120 - i * 15,
      'heart-pixel'
    ).setScale(0.8 + i * 0.2).setAlpha(0).setDepth(150);

    scene.tweens.add({
      targets: heart,
      alpha: 0.8,
      y: heart.y - 40,
      duration: 800,
      delay: i * 200,
      ease: 'Sine.easeOut',
      onComplete: () => {
        scene.tweens.add({
          targets: heart,
          alpha: 0,
          y: heart.y - 20,
          duration: 400,
          onComplete: () => heart.destroy()
        });
      }
    });
  }
}

export function createEmbarrassedEffect(scene) {
  const eloraX = scene.elora.x > 100 ? scene.elora.x : (scene.eloraExpectedX || scene.width * 0.6);
  const eloraY = scene.elora.y;
  const embarrassedMarks = [];

  const eloraBlush = scene.add.text(eloraX - 15, eloraY - 140, '///', {
    fontSize: '20px',
    color: '#ff9999'
  }).setOrigin(0.5).setAlpha(0).setDepth(150).setRotation(0.2);
  embarrassedMarks.push(eloraBlush);

  const exclaim = scene.add.text(eloraX, eloraY - 180, '!', {
    fontSize: '32px',
    fontStyle: 'bold',
    color: '#ff6666'
  }).setOrigin(0.5).setAlpha(0).setDepth(150);
  embarrassedMarks.push(exclaim);

  scene.currentBlushMarks = embarrassedMarks;

  scene.tweens.add({
    targets: eloraBlush,
    alpha: 0.9,
    duration: 150
  });

  scene.tweens.add({
    targets: exclaim,
    alpha: 1,
    y: exclaim.y - 10,
    duration: 200,
    ease: 'Back.easeOut'
  });
  scene.tweens.add({
    targets: exclaim,
    rotation: 0.1,
    duration: 100,
    yoyo: true,
    repeat: 3
  });

  // Flying cutlery + napkin from the table
  if (scene.eloraCutleryFork && scene.eloraCutleryKnife) {
    scene.eloraCutleryFork.setDepth(150);
    scene.tweens.add({
      targets: scene.eloraCutleryFork,
      x: scene.eloraCutleryFork.x + 140,
      y: scene.eloraCutleryFork.y - 220,
      angle: 360 * 4,
      alpha: 0,
      duration: 1000,
      ease: 'Sine.easeOut'
    });

    scene.eloraCutleryKnife.setDepth(150);
    scene.tweens.add({
      targets: scene.eloraCutleryKnife,
      x: scene.eloraCutleryKnife.x - 100,
      y: scene.eloraCutleryKnife.y - 180,
      angle: -360 * 3,
      alpha: 0,
      duration: 900,
      delay: 100,
      ease: 'Sine.easeOut'
    });

    if (scene.eloraNapkin) {
      scene.eloraNapkin.setDepth(150);
      scene.tweens.add({
        targets: scene.eloraNapkin,
        x: scene.eloraNapkin.x + 80,
        y: scene.eloraNapkin.y - 160,
        angle: 360 * 3,
        alpha: 0,
        scaleX: 5,
        scaleY: 5,
        duration: 1200,
        delay: 50,
        ease: 'Sine.easeOut'
      });
    }
  }
}

export function createHearts(scene) {
  const colors = [0xe57373, 0xef5350, 0xf48fb1, 0xff8a80, 0xce93d8];
  const centerX = (scene.enea.x + scene.elora.x) / 2 || scene.width * 0.5;

  for (let i = 0; i < 20; i++) {
    const startX = centerX - 120 + Math.random() * 240;
    const startY = scene.groundY - 40 + Math.random() * 40;
    const scale = 1.2 + Math.random() * 1.8;
    const color = colors[Math.floor(Math.random() * colors.length)];

    const heart = scene.add.image(startX, startY, 'heart-pixel')
      .setScale(0.1)
      .setDepth(200)
      .setAlpha(0.9)
      .setTint(color);

    const delay = i * 80;
    const swayDir = Math.random() > 0.5 ? 1 : -1;

    scene.tweens.add({
      targets: heart,
      scale: scale,
      duration: 300,
      delay: delay,
      ease: 'Back.easeOut',
    });

    scene.tweens.add({
      targets: heart,
      y: startY - 180 - Math.random() * 120,
      x: startX + swayDir * (20 + Math.random() * 40),
      alpha: 0,
      duration: 1600 + Math.random() * 600,
      delay: delay + 200,
      ease: 'Sine.easeIn',
      onComplete: () => heart.destroy()
    });
  }
}

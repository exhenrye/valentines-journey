import { BACKGROUNDS } from '../data/backgrounds.js';
import { createHeart } from '../effects/VisualEffects.js';

class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Create parallax background
    this.bgLayers = [];
    const bgConfig = BACKGROUNDS['city-night'];

    bgConfig.layers.forEach((layer, index) => {
      const bg = this.add.tileSprite(0, 0, width, height, layer.key)
        .setOrigin(0, 0)
        .setScrollFactor(0);

      // Scale to fill screen
      const scaleX = width / bg.width;
      const scaleY = height / bg.height;
      const scale = Math.max(scaleX, scaleY);
      bg.setScale(scale);

      this.bgLayers.push({ sprite: bg, speed: layer.speed });
    });

    // Dark overlay
    this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.5);

    // Floating hearts (drawn graphics)
    this.hearts = [];
    for (let i = 0; i < 2; i++) {
      const heartX = width / 2 - 50 + i * 100;
      const heartY = height / 2 - 150;
      const heart = createHeart(this, heartX, heartY, 24, 0xe57373);

      this.tweens.add({
        targets: heart,
        y: heartY - 15,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: i * 300
      });

      this.hearts.push(heart);
    }

    // Title
    this.add.text(width / 2, height / 2 - 50, 'Our Journey', {
      fontFamily: 'Cormorant Garamond',
      fontSize: '72px',
      color: '#ffffff',
      shadow: { blur: 10, color: '#000000', fill: true }
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(width / 2, height / 2 + 20, 'A love story across continents', {
      fontFamily: 'Cormorant Garamond',
      fontSize: '24px',
      color: '#cccccc',
      fontStyle: 'italic'
    }).setOrigin(0.5);

    // Start button
    const button = this.add.rectangle(width / 2, height / 2 + 120, 280, 60, 0xe57373)
      .setInteractive({ useHandCursor: true });

    const buttonText = this.add.text(width / 2, height / 2 + 120, 'BEGIN OUR STORY', {
      fontFamily: 'Lato',
      fontSize: '18px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Button hover effect
    button.on('pointerover', () => {
      button.setFillStyle(0xc94c4c);
      this.tweens.add({
        targets: [button, buttonText],
        scaleX: 1.05,
        scaleY: 1.05,
        duration: 100
      });
    });

    button.on('pointerout', () => {
      button.setFillStyle(0xe57373);
      this.tweens.add({
        targets: [button, buttonText],
        scaleX: 1,
        scaleY: 1,
        duration: 100
      });
    });

    button.on('pointerdown', () => {
      this.startGame();
    });

    // Controls hint
    this.add.text(width / 2, height / 2 + 200, 'Press SPACE or click to advance', {
      fontFamily: 'Lato',
      fontSize: '14px',
      color: '#888888'
    }).setOrigin(0.5);

    // Keyboard input
    this.input.keyboard.on('keydown-SPACE', () => {
      this.startGame();
    });

    this.input.keyboard.on('keydown-ENTER', () => {
      this.startGame();
    });
  }

  update() {
    // Scroll backgrounds
    this.bgLayers.forEach(layer => {
      layer.sprite.tilePositionX += layer.speed * 0.5;
    });
  }

  startGame() {
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.time.delayedCall(500, () => {
      this.scene.start('GameScene', { episode: 0 });
    });
  }

}

export default TitleScene;

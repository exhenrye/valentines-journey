import { EPISODES } from '../data/episodes/index.js';

class FinaleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'FinaleScene' });
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Gradient background
    const graphics = this.add.graphics();
    graphics.fillGradientStyle(0xff9a9e, 0xff9a9e, 0xfecfef, 0xfdfbfb, 1);
    graphics.fillRect(0, 0, width, height);

    // Floating hearts (drawn graphics)
    for (let i = 0; i < 3; i++) {
      const heartX = width / 2 - 80 + i * 80;
      const heartY = 80;
      const heart = this.createHeart(heartX, heartY, 24, 0xe57373);

      this.tweens.add({
        targets: heart,
        y: heartY - 15,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
        delay: i * 200
      });
    }

    // Title
    this.add.text(width / 2, 170, "Happy Valentine's Day", {
      fontFamily: 'Cormorant Garamond',
      fontSize: '52px',
      color: '#c94c4c'
    }).setOrigin(0.5);

    // Her name
    this.add.text(width / 2, 230, 'Elora', {
      fontFamily: 'Cormorant Garamond',
      fontSize: '42px',
      color: '#e57373',
      fontStyle: 'italic'
    }).setOrigin(0.5);

    // Message
    const messages = [
      "From a dead phone in Madrid to a baby boy in Seattle.",
      "From thigh-high boots to 3am feedings.",
      "You took a chance on a guy from Tinder,",
      "and I've spent every day since trying to deserve you.",
      "",
      "Eight years, twelve places, three countries,",
      "and one perfect little family.",
      "",
      "Thank you for choosing me, for choosing us,",
      "for building this beautiful life together.",
      "",
      "I love you more than words.",
      "",
      "Ti amo per sempre."
    ];

    let yPos = 300;
    messages.forEach((msg, i) => {
      const isItalian = msg.includes('Ti amo');
      this.add.text(width / 2, yPos, msg, {
        fontFamily: 'Cormorant Garamond',
        fontSize: isItalian ? '22px' : '18px',
        color: isItalian ? '#c94c4c' : '#4a3f3f',
        fontStyle: 'italic',
        align: 'center'
      }).setOrigin(0.5);
      yPos += msg === '' ? 15 : 28;
    });

    // Signature
    this.add.text(width / 2, height - 120, 'With all my love,', {
      fontFamily: 'Cormorant Garamond',
      fontSize: '18px',
      color: '#4a3f3f'
    }).setOrigin(0.5);

    this.add.text(width / 2, height - 85, 'Enea', {
      fontFamily: 'Cormorant Garamond',
      fontSize: '28px',
      color: '#c94c4c',
      fontStyle: 'italic'
    }).setOrigin(0.5);

    // Restart button
    const button = this.add.rectangle(width / 2, height - 35, 200, 40, 0x000000, 0)
      .setStrokeStyle(2, 0xc94c4c)
      .setInteractive({ useHandCursor: true });

    this.add.text(width / 2, height - 35, 'Relive Our Journey', {
      fontFamily: 'Lato',
      fontSize: '14px',
      color: '#c94c4c'
    }).setOrigin(0.5);

    button.on('pointerdown', () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.time.delayedCall(500, () => {
        this.scene.start('GameScene', { episode: 0 });
      });
    });

    button.on('pointerover', () => button.setFillStyle(0xc94c4c, 0.1));
    button.on('pointerout', () => button.setFillStyle(0x000000, 0));

    // Fade in
    this.cameras.main.fadeIn(1000, 0, 0, 0);
  }

  createHeart(x, y, size, color) {
    const scale = size / 8;
    const heart = this.add.image(x, y, 'heart-pixel').setScale(scale);
    if (color && color !== 0xe57373) heart.setTint(color);
    return heart;
  }
}

export default FinaleScene;

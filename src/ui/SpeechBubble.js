// Speech bubble rendering extracted from GameScene

export default class SpeechBubble {
  constructor(scene) {
    this.scene = scene;

    this.container = scene.add.container(0, 0).setVisible(false);

    this.bg = scene.add.graphics();
    this.speakerText = scene.add.text(0, 0, '', {
      fontFamily: 'Lato',
      fontSize: '14px',
      color: '#e57373',
      fontStyle: 'bold',
    });
    this.contentText = scene.add.text(0, 20, '', {
      fontFamily: 'Lato',
      fontSize: '18px',
      color: '#333333',
      wordWrap: { width: 350 },
    });

    this.container.add([this.bg, this.speakerText, this.contentText]);
  }

  show(name, text, charX, charY, screenWidth) {
    this.speakerText.setText(name);
    this.contentText.setText(text);

    // Calculate bubble size
    const textBounds = this.contentText.getBounds();
    const bubbleWidth = Math.max(textBounds.width + 40, 200);
    const bubbleHeight = textBounds.height + 60;

    let bubbleX = charX;
    // Position bubble above the character's head
    // Character sprite is 192px tall (64 * scale 3), origin at bottom
    // Extra gap leaves room for blush/emotion effects above the head
    let bubbleY = charY - 260;

    // Keep bubble on screen
    if (bubbleX - bubbleWidth / 2 < 20) bubbleX = bubbleWidth / 2 + 20;
    if (bubbleX + bubbleWidth / 2 > screenWidth - 20) bubbleX = screenWidth - bubbleWidth / 2 - 20;
    if (bubbleY < 100) bubbleY = 100;

    // Draw bubble background with pointer
    this.bg.clear();
    this.bg.fillStyle(0xffffff, 1);
    this.bg.fillRoundedRect(-20, -20, bubbleWidth, bubbleHeight, 15);

    // Pointer triangle pointing down toward character
    const pointerX = bubbleWidth / 2 - 20;
    this.bg.fillTriangle(
      pointerX - 10, bubbleHeight - 20,
      pointerX + 10, bubbleHeight - 20,
      pointerX, bubbleHeight,
    );

    // Subtle border
    this.bg.lineStyle(2, 0xe57373, 0.5);
    this.bg.strokeRoundedRect(-20, -20, bubbleWidth, bubbleHeight, 15);

    this.container.setPosition(bubbleX - bubbleWidth / 2, bubbleY);
    this.container.setVisible(true);
    this.container.setAlpha(0);

    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 200,
    });
  }

  hide() {
    this.container.setVisible(false);
  }

  get visible() {
    return this.container.visible;
  }

  addToContainer(parent) {
    parent.add(this.container);
  }
}

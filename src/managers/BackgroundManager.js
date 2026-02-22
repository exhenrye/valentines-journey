// Background loading and parallax scrolling extracted from GameScene
import { BACKGROUNDS } from '../data/backgrounds.js';

export default class BackgroundManager {
  constructor(scene) {
    this.scene = scene;
    this.layers = [];
  }

  load(bgKey) {
    this.clear();

    const config = BACKGROUNDS[bgKey];
    if (!config) return;

    config.layers.forEach((layer, index) => {
      const texture = this.scene.textures.get(layer.key);
      const frame = texture.get();
      const texHeight = frame.height;

      const bg = this.scene.add.tileSprite(
        0, 0, this.scene.width, this.scene.height, layer.key
      )
        .setOrigin(0, 0)
        .setScrollFactor(0)
        .setDepth(-100 + index);

      const tileScale = this.scene.height / texHeight;
      bg.setTileScale(tileScale, tileScale);

      this.layers.push({ sprite: bg, speed: layer.speed, tileScale });
    });
  }

  update() {
    this.layers.forEach(layer => {
      layer.sprite.tilePositionX += layer.speed * 0.02;
    });
  }

  scrollLayers(speedMultiplier) {
    this.layers.forEach(layer => {
      layer.sprite.tilePositionX += layer.speed * speedMultiplier;
    });
  }

  clear() {
    this.layers.forEach(layer => layer.sprite.destroy());
    this.layers = [];
  }
}

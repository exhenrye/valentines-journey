// Restaurant interior setup/cleanup extracted from GameScene

import { EPISODES } from '../data/episodes/index.js';

export default class RestaurantScene {
  constructor(scene) {
    this.scene = scene;
    this.elements = null;
    this.eloraCutleryFork = null;
    this.eloraCutleryKnife = null;
    this.eloraNapkin = null;
  }

  get isActive() {
    return this.elements !== null;
  }

  setup() {
    const scene = this.scene;

    // Clear parallax backgrounds
    scene.backgroundManager.clear();
    this.cleanup();
    this.elements = [];

    const w = scene.width;
    const h = scene.height;
    const add = (el) => { this.elements.push(el); return el; };
    const S = 6; // Pixel art scale factor (8px tiles -> 48px on screen)

    // Full-screen black background (prevents any gaps)
    add(scene.add.rectangle(w / 2, h / 2, w, h, 0x1a0e08).setDepth(-110));

    // Wallpaper - tiled across the wall area (upper 65%)
    const wallH = h * 0.65;
    add(scene.add.tileSprite(0, 0, w, wallH, 'wallpaper-tile')
      .setOrigin(0, 0).setTileScale(S, S).setDepth(-100));
    // Warm tint over wallpaper
    add(scene.add.rectangle(w / 2, wallH / 2, w, wallH, 0x331500, 0.2).setDepth(-99));

    // Floor - tiled across the rest
    const floorY = wallH;
    const floorH = h - wallH;
    add(scene.add.tileSprite(0, floorY, w, floorH, 'floor-tile')
      .setOrigin(0, 0).setTileScale(S, S).setDepth(-100));
    // Darken floor slightly
    add(scene.add.rectangle(w / 2, floorY + floorH / 2, w, floorH, 0x0a0505, 0.3).setDepth(-99));

    // Baseboard / wainscoting strip
    add(scene.add.rectangle(w / 2, floorY, w, 6, 0x3a1e14).setDepth(-98));
    add(scene.add.rectangle(w / 2, floorY + 3, w, 2, 0x5a3828).setDepth(-97));

    // Wall decorations
    // Window (center-left wall)
    add(scene.add.image(w * 0.22, wallH * 0.38, 'window-front')
      .setScale(S).setOrigin(0.5, 0.5).setDepth(-95));
    // Night sky glow behind window
    add(scene.add.rectangle(w * 0.22, wallH * 0.38, 16 * S * 0.7, 24 * S * 0.5, 0x1a1a3a, 0.6)
      .setDepth(-96));

    // Paintings on wall
    add(scene.add.image(w * 0.42, wallH * 0.32, 'painting-lg')
      .setScale(S).setOrigin(0.5, 0.5).setDepth(-95));
    add(scene.add.image(w * 0.62, wallH * 0.30, 'painting-sm')
      .setScale(S).setOrigin(0.5, 0.5).setDepth(-95));
    add(scene.add.image(w * 0.78, wallH * 0.34, 'painting-lg')
      .setScale(S).setOrigin(0.5, 0.5).setDepth(-95).setFlipX(true));

    // Ceiling lamp (assembled from 3 parts)
    const lampX = w / 2;
    const lampPartH = 8 * S;
    add(scene.add.image(lampX, 0, 'ceiling-lamp-top')
      .setScale(S).setOrigin(0.5, 0).setDepth(-94));
    add(scene.add.image(lampX, lampPartH, 'ceiling-lamp-mid')
      .setScale(S).setOrigin(0.5, 0).setDepth(-94));
    add(scene.add.image(lampX, lampPartH * 2, 'ceiling-lamp-btm')
      .setScale(S).setOrigin(0.5, 0).setDepth(-94));
    // Warm light cone from ceiling lamp
    const lightCone = scene.add.graphics().setDepth(-93);
    lightCone.fillStyle(0xffcc66, 0.06);
    lightCone.fillTriangle(lampX, lampPartH * 3, lampX - 300, floorY, lampX + 300, floorY);
    add(lightCone);

    // Floor lamps on far edges
    add(scene.add.image(w * 0.08, floorY, 'floor-lamp')
      .setScale(S).setOrigin(0.5, 1).setDepth(-90));
    add(scene.add.image(w * 0.92, floorY, 'floor-lamp')
      .setScale(S).setOrigin(0.5, 1).setDepth(-90).setFlipX(true));
    // Warm glow circles at floor lamp tops
    add(scene.add.circle(w * 0.08, floorY - 24 * S + 10, 50, 0xffaa33, 0.08).setDepth(-89));
    add(scene.add.circle(w * 0.92, floorY - 24 * S + 10, 50, 0xffaa33, 0.08).setDepth(-89));

    // Plants in corners
    add(scene.add.image(w * 0.04, floorY, 'plant')
      .setScale(S).setOrigin(0.5, 1).setDepth(-85));
    add(scene.add.image(w * 0.96, floorY, 'plant')
      .setScale(S).setOrigin(0.5, 1).setDepth(-85).setFlipX(true));

    // Table - drawn with graphics at depth 110 (ABOVE characters at 100)
    const tableX = w / 2;
    const tableTopY = h * 0.58;
    const tableW = 440;

    const tableGfx = scene.add.graphics().setDepth(110);
    tableGfx.fillStyle(0xffeedd, 0.3);
    tableGfx.fillRoundedRect(tableX - tableW / 2 - 10, tableTopY - 5, tableW + 20, 30, 6);
    tableGfx.fillStyle(0x5c3a28, 1);
    tableGfx.fillRoundedRect(tableX - tableW / 2, tableTopY, tableW, 22, 4);
    tableGfx.fillStyle(0x7a5038, 1);
    tableGfx.fillRoundedRect(tableX - tableW / 2 + 8, tableTopY + 4, tableW - 16, 6, 2);
    tableGfx.fillStyle(0x4a2a18, 1);
    tableGfx.fillRect(tableX - tableW / 2 + 20, tableTopY + 22, 10, 80);
    tableGfx.fillRect(tableX + tableW / 2 - 30, tableTopY + 22, 10, 80);
    add(tableGfx);

    // Chairs at table (behind characters, depth 95)
    add(scene.add.image(tableX - 150, floorY, 'chair')
      .setScale(S).setOrigin(0.5, 1).setDepth(95));
    add(scene.add.image(tableX + 150, floorY, 'chair')
      .setScale(S).setOrigin(0.5, 1).setDepth(95).setFlipX(true));

    // Table items (depth 112, above table surface)
    // Candle centerpiece
    add(scene.add.image(tableX, tableTopY, 'candle')
      .setScale(S * 0.7).setOrigin(0.5, 1).setDepth(112));
    const glow = scene.add.circle(tableX, tableTopY - 30, 45, 0xffaa33, 0.12).setDepth(112);
    add(glow);
    scene.tweens.add({
      targets: glow, alpha: 0.06, scaleX: 0.85, scaleY: 0.85,
      duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut',
    });

    // Plates
    const cutS = 1.5;
    add(scene.add.sprite(tableX - 80, tableTopY + 4, 'silverware', 4)
      .setScale(cutS).setOrigin(0.5, 0.5).setDepth(112));
    add(scene.add.sprite(tableX + 80, tableTopY + 4, 'silverware', 4)
      .setScale(cutS).setOrigin(0.5, 0.5).setDepth(112));

    // Enea's cutlery (static, left side)
    add(scene.add.sprite(tableX - 105, tableTopY - 2, 'silverware', 0)
      .setScale(cutS).setOrigin(0.5, 0.5).setDepth(113));
    add(scene.add.sprite(tableX - 55, tableTopY - 2, 'silverware', 2)
      .setScale(cutS).setOrigin(0.5, 0.5).setDepth(113));

    // Elora's cutlery (will fly away during embarrassed effect)
    this.eloraCutleryFork = scene.add.sprite(tableX + 105, tableTopY - 2, 'silverware', 0)
      .setScale(cutS).setOrigin(0.5, 0.5).setDepth(113);
    this.eloraCutleryKnife = scene.add.sprite(tableX + 55, tableTopY - 2, 'silverware', 2)
      .setScale(cutS).setOrigin(0.5, 0.5).setDepth(113);
    add(this.eloraCutleryFork);
    add(this.eloraCutleryKnife);

    // Napkin near Elora's plate
    this.eloraNapkin = scene.add.sprite(tableX + 130, tableTopY + 2, 'silverware', 7)
      .setScale(cutS).setOrigin(0.5, 0.5).setDepth(113);
    add(this.eloraNapkin);

    // Warm ambient overlay (entire scene)
    add(scene.add.rectangle(w / 2, h / 2, w, h, 0x331500, 0.08).setDepth(-80));

    // Position characters at the table
    const dinnerScale = 3;
    const spriteH = 64 * dinnerScale;
    const seatY = tableTopY + Math.round(spriteH * 0.38);
    const eneaDinnerX = tableX - 160;
    const eloraDinnerX = tableX + 160;

    scene.enea.setPosition(eneaDinnerX, seatY);
    scene.enea.setScale(dinnerScale);
    scene.enea.setFlipX(true);
    scene.enea.setVisible(true);
    scene.enea.stop();
    scene.enea.setFrame(0);
    scene.enea.setDepth(100);
    scene.eneaExpectedX = eneaDinnerX;

    // Dinner outfits
    const cm = scene.characterManager;
    cm.currentEneaOutfit = 'male-chainmail';
    cm.eneaClothes.setTexture('male-chainmail');
    cm.currentEneaHat = null;
    cm.currentEneaShirt = null;
    cm.currentEneaPants = null;
    cm.currentEneaBoots = null;

    scene.elora.setPosition(eloraDinnerX, seatY);
    scene.elora.setScale(dinnerScale);
    scene.elora.setFlipX(false);
    scene.elora.setVisible(true);
    scene.elora.stop();
    scene.elora.setFrame(0);
    scene.elora.setDepth(100);
    cm.currentEloraOutfit = 'female-fancy-blue';
    cm.eloraClothes.setTexture('female-fancy-blue');
    cm.currentEloraHat = null;
    scene.eloraExpectedX = eloraDinnerX;
  }

  cleanup() {
    if (this.elements) {
      this.elements.forEach(el => { if (el && el.destroy) el.destroy(); });
      this.elements = null;
    }
    const scene = this.scene;
    if (scene.enea) { scene.enea.setDepth(100); scene.enea.setScale(3); scene.enea.clearTint(); }
    if (scene.elora) { scene.elora.setDepth(100); scene.elora.setScale(3); scene.elora.clearTint(); }
    // Restore episode outfits (dinner scene overrides them)
    const episode = EPISODES[scene.currentEpisode];
    if (episode) scene.characterManager.applyOutfits(episode.outfits);
    this.eloraCutleryFork = null;
    this.eloraCutleryKnife = null;
    this.eloraNapkin = null;
  }
}

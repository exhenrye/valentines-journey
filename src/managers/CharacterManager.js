// Character sprite creation, outfits, clothing sync, and companion management
// extracted from GameScene

export default class CharacterManager {
  constructor(scene) {
    this.scene = scene;

    // Ground levels
    this.groundY = scene.height * 0.98;
    this.dogGroundY = this.groundY - 8;

    // Unlock flags
    this.hasElora = false;
    this.hasDog = false;
    this.hasBaby = false;
    this.hasCats = false;
    this.hasHorse = false;

    // Position tracking for speech bubble anchoring
    this.eneaExpectedX = scene.width * 0.5;
    this.eloraExpectedX = 0;

    // Current outfit keys
    this.currentEneaOutfit = null;
    this.currentEloraOutfit = null;
    this.currentEneaHat = null;
    this.currentEloraHat = null;
    this.currentEneaShirt = null;
    this.currentEneaPants = null;
    this.currentEneaBoots = null;
  }

  createAll() {
    const scene = this.scene;
    const width = scene.width;

    // Enea (hidden initially, actions will show/position)
    this.enea = scene.add.sprite(width * 0.5, this.groundY, 'male')
      .setScale(3).setOrigin(0.5, 1).setDepth(100).setVisible(false);
    this.enea.setFrame(0);

    // Elora (hidden initially)
    this.elora = scene.add.sprite(0, this.groundY, 'female')
      .setScale(3).setOrigin(0.5, 1).setDepth(100).setVisible(false);
    this.elora.setFrame(0);

    // Clothing overlay sprites (rendered on top of base characters)
    this.eneaClothes = scene.add.sprite(0, 0, 'male-split-hose')
      .setScale(3).setOrigin(0.5, 1).setDepth(101).setVisible(false);
    this.eloraClothes = scene.add.sprite(0, 0, 'female-dress-red')
      .setScale(3).setOrigin(0.5, 1).setDepth(101).setVisible(false);

    // Shirt overlay (separate from body clothing - stacks on top)
    this.eneaShirt = scene.add.sprite(0, 0, 'male-shirt-blue')
      .setScale(3).setOrigin(0.5, 1).setDepth(101).setVisible(false);

    // Pants overlay
    this.eneaPants = scene.add.sprite(0, 0, 'male-pants-brown')
      .setScale(3).setOrigin(0.5, 1).setDepth(101).setVisible(false);

    // Boots overlay
    this.eneaBoots = scene.add.sprite(0, 0, 'male-boots')
      .setScale(3).setOrigin(0.5, 1).setDepth(101).setVisible(false);

    // Hat overlay sprites (rendered on top of clothing overlays)
    this.eneaHat = scene.add.sprite(0, 0, 'male-hat1')
      .setScale(3).setOrigin(0.5, 1).setDepth(102).setVisible(false);
    this.eloraHat = scene.add.sprite(0, 0, 'female-hat1')
      .setScale(3).setOrigin(0.5, 1).setDepth(102).setVisible(false);

    // Dog sprite (changes texture per episode: Totoro/Joey/Marzipan)
    this.dog = scene.add.sprite(width * 0.2, this.dogGroundY, 'dog-totoro')
      .setScale(3).setOrigin(0.5, 1).setDepth(100).setVisible(false);
    this.dog.setFrame(8);

    // Baby sprite (Elthen pack - hidden initially, shown in EP11)
    this.baby = scene.add.sprite(width * 0.5, this.groundY, 'baby')
      .setScale(3).setOrigin(0.5, 1).setDepth(100).setVisible(false);
    this.baby.setFrame(0);

    // Cat sprites (two orange cats - same texture, cat2 flipped for variety)
    this.cat1 = scene.add.sprite(width * 0.15, this.groundY, 'cat-idle')
      .setScale(2).setOrigin(0.5, 1).setDepth(100).setVisible(false);
    this.cat1.setFrame(0);
    this.cat2 = scene.add.sprite(width * 0.12, this.groundY, 'cat-idle')
      .setScale(2).setOrigin(0.5, 1).setDepth(100).setVisible(false).setFlipX(true);
    this.cat2.setFrame(0);

    // Horse sprite (Onfe black horse - Rome)
    this.horse = scene.add.sprite(width * 0.1, this.groundY, 'horse-black')
      .setScale(3).setOrigin(0.5, 1).setDepth(99).setVisible(false);
    this.horse.setFrame(0);
  }

  getDogForEpisode(episodeId) {
    // EP05-06: Totoro (grey/brindle miniature bull terrier, small)
    // EP07-09: Joey (black, small-mid)
    // EP10-12: Marzipan (brown Belgian Malinois, mid-large)
    if (episodeId <= 6) return { texture: 'dog-totoro', scale: 3 };
    if (episodeId <= 9) return { texture: 'dog-joey', scale: 3 };
    return { texture: 'dog-marzipan', scale: 4 };
  }

  applyOutfits(outfits) {
    const textures = this.scene.textures;

    if (outfits?.enea && textures.exists(outfits.enea)) {
      this.eneaClothes.setTexture(outfits.enea);
      this.currentEneaOutfit = outfits.enea;
    } else {
      this.currentEneaOutfit = null;
    }
    if (outfits?.elora && textures.exists(outfits.elora)) {
      this.eloraClothes.setTexture(outfits.elora);
      this.currentEloraOutfit = outfits.elora;
    } else {
      this.currentEloraOutfit = null;
    }
    if (outfits?.eneaHat && textures.exists(outfits.eneaHat)) {
      this.eneaHat.setTexture(outfits.eneaHat);
      this.currentEneaHat = outfits.eneaHat;
    } else {
      this.currentEneaHat = null;
    }
    if (outfits?.eloraHat && textures.exists(outfits.eloraHat)) {
      this.eloraHat.setTexture(outfits.eloraHat);
      this.currentEloraHat = outfits.eloraHat;
    } else {
      this.currentEloraHat = null;
    }
    if (outfits?.eneaShirt && textures.exists(outfits.eneaShirt)) {
      this.eneaShirt.setTexture(outfits.eneaShirt);
      this.currentEneaShirt = outfits.eneaShirt;
    } else {
      this.currentEneaShirt = null;
    }
    if (outfits?.eneaPants && textures.exists(outfits.eneaPants)) {
      this.eneaPants.setTexture(outfits.eneaPants);
      this.currentEneaPants = outfits.eneaPants;
    } else {
      this.currentEneaPants = null;
    }
    if (outfits?.eneaBoots && textures.exists(outfits.eneaBoots)) {
      this.eneaBoots.setTexture(outfits.eneaBoots);
      this.currentEneaBoots = outfits.eneaBoots;
    } else {
      this.currentEneaBoots = null;
    }
  }

  syncClothing() {
    this._syncOverlay(this.enea, this.eneaClothes, this.currentEneaOutfit, 1);
    this._syncOverlay(this.elora, this.eloraClothes, this.currentEloraOutfit, 1);
    this._syncOverlay(this.enea, this.eneaShirt, this.currentEneaShirt, 1);
    this._syncOverlay(this.enea, this.eneaPants, this.currentEneaPants, 1);
    this._syncOverlay(this.enea, this.eneaBoots, this.currentEneaBoots, 1);
    this._syncOverlay(this.enea, this.eneaHat, this.currentEneaHat, 2);
    this._syncOverlay(this.elora, this.eloraHat, this.currentEloraHat, 2);
  }

  _syncOverlay(base, overlay, outfitKey, depthOffset) {
    if (!outfitKey || !base.visible) {
      overlay.setVisible(false);
      return;
    }
    overlay.setVisible(true);
    overlay.setPosition(base.x, base.y);
    overlay.setScale(base.scaleX, base.scaleY);
    overlay.setFlipX(base.flipX);
    overlay.setOrigin(base.originX, base.originY);
    overlay.setDepth(base.depth + (depthOffset || 1));
    overlay.setAlpha(base.alpha);
    overlay.setFrame(base.frame.name);
  }

  resetForEpisode(episode) {
    const scene = this.scene;
    const width = scene.width;

    // Reset main characters
    this.enea.setVisible(false);
    this.enea.setPosition(width * 0.5, this.groundY);
    this.enea.stop();
    this.enea.setFrame(0);
    this.enea.setScale(3);

    this.elora.setVisible(false);
    this.elora.setPosition(width * 0.5, this.groundY);
    this.elora.stop();
    this.elora.setFrame(0);

    this.enea.clearTint();
    this.elora.clearTint();

    // Clean up proposal ring if present (from kneel action)
    if (scene.proposalRing) { scene.proposalRing.destroy(); scene.proposalRing = null; }
    if (scene.proposalRingGlow) { scene.proposalRingGlow.destroy(); scene.proposalRingGlow = null; }

    // Apply clothing overlays for this episode
    this.applyOutfits(episode.outfits);

    // Swap dog texture/scale based on story timeline
    const dogInfo = this.getDogForEpisode(episode.id);
    this.dog.setTexture(dogInfo.texture);
    this.dog.setScale(dogInfo.scale);
    if (scene.anims.exists('dog-walk')) {
      scene.anims.remove('dog-walk');
    }
    scene.anims.create({
      key: 'dog-walk',
      frames: scene.anims.generateFrameNumbers(dogInfo.texture, { start: 8, end: 15 }),
      frameRate: 10,
      repeat: -1,
    });

    this.dog.setVisible(false);
    this.dog.setPosition(width * 0.2, this.dogGroundY);
    this.dog.stop();
    this.dog.setFrame(8);

    this.baby.setVisible(false);
    this.baby.stop();
    this.baby.setFrame(0);

    // Set companion flags based on story timeline + per-episode overrides
    this.hasDog = episode.id >= 6 && !episode.noDog;

    this.hasCats = episode.id >= 9;
    this.cat1.setVisible(false);
    this.cat1.stop();
    this.cat1.setFrame(0);
    this.cat2.setVisible(false);
    this.cat2.stop();
    this.cat2.setFrame(0);

    this.hasHorse = episode.id >= 10;
    this.horse.setVisible(false);
    this.horse.stop();
    this.horse.setFrame(0);
  }

  walkTogether(callback) {
    const scene = this.scene;
    const targetX = scene.width * 0.7;

    // Walking right, so face right
    this.enea.setFlipX(true);
    this.enea.play('male-walk');

    if (this.hasElora) {
      this.elora.setFlipX(true);
      this.elora.play('female-walk');
    }

    const tweens = [
      scene.tweens.add({
        targets: this.enea,
        x: targetX,
        duration: 2500,
        ease: 'Linear',
      }),
    ];

    if (this.hasElora) {
      tweens.push(scene.tweens.add({
        targets: this.elora,
        x: targetX + 150,
        duration: 2500,
        ease: 'Linear',
      }));
    }

    if (this.hasDog) {
      this.dog.setFlipX(true);
      this.dog.play('dog-walk');
      tweens.push(scene.tweens.add({
        targets: this.dog,
        x: targetX - 60,
        duration: 2500,
        ease: 'Linear',
      }));
    }

    if (this.hasCats && this.cat1.visible) {
      this.cat1.setFlipX(true);
      this.cat2.setFlipX(false);
      this.cat1.play('cat-walk-anim');
      this.cat2.play('cat-walk-anim');
      tweens.push(scene.tweens.add({
        targets: this.cat1,
        x: targetX - 100,
        duration: 2500,
        ease: 'Linear',
      }));
      tweens.push(scene.tweens.add({
        targets: this.cat2,
        x: targetX - 140,
        duration: 2500,
        ease: 'Linear',
      }));
    }

    if (this.hasHorse && this.horse.visible) {
      this.horse.setFlipX(true);
      this.horse.play('horse-walk');
      tweens.push(scene.tweens.add({
        targets: this.horse,
        x: targetX - 220,
        duration: 2500,
        ease: 'Linear',
      }));
    }

    // Scroll background (slower, more comfortable)
    scene.tweens.add({
      targets: { value: 0 },
      value: 200,
      duration: 2500,
      ease: 'Linear',
      onUpdate: () => {
        scene.backgroundManager.scrollLayers(1);
      },
    });

    scene.time.delayedCall(2500, () => {
      this.enea.stop();
      this.enea.setFrame(0);
      if (this.hasElora) {
        this.elora.stop();
        this.elora.setFrame(0);
      }
      if (this.hasDog) {
        this.dog.stop();
        this.dog.setFrame(8);
      }
      if (this.hasCats && this.cat1.visible) {
        this.cat1.play('cat-idle-anim');
        this.cat2.play('cat-idle-anim');
      }
      if (this.hasHorse && this.horse.visible) {
        this.horse.stop();
        this.horse.setFrame(0);
      }
      callback();
    });
  }
}

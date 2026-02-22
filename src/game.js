// ============================================================
// OUR JOURNEY - A Valentine's Day Game
// Built with Phaser 3
// ============================================================

import { EPISODES } from './data/episodes/index.js';
import { BACKGROUNDS } from './data/backgrounds.js';
import BootScene from './scenes/BootScene.js';
import TitleScene from './scenes/TitleScene.js';
import FinaleScene from './scenes/FinaleScene.js';
import { ACTION_HANDLERS } from './actions/index.js';

// ============================================================
// GAME SCENE - Main gameplay
// ============================================================
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init(data) {
    this.currentEpisode = data.episode || 0;
    this.dialogueIndex = 0;
    this.hasElora = false;
    this.hasDog = false;
    this.hasBaby = false;
    this.hasCats = false;
    this.hasHorse = false;
    this.isAnimating = false;
    this.dialogueHistory = [];
  }

  create() {
    // Use game config dimensions directly - more reliable than camera dimensions
    const width = this.sys.game.config.width;
    const height = this.sys.game.config.height;

    this.width = width;
    this.height = height;

    // Create background container
    this.bgLayers = [];

    // Ground level - characters walk at the very bottom on the street
    this.groundY = height * 0.98;
    this.dogGroundY = this.groundY - 8; // Raised so dog legs aren't lost in background ground

    // Create Enea (hidden initially, actions will show/position)
    this.enea = this.add.sprite(width * 0.5, this.groundY, 'male')
      .setScale(3)
      .setOrigin(0.5, 1)
      .setDepth(100)
      .setVisible(false);
    this.enea.setFrame(0);
    this.eneaExpectedX = width * 0.5;

    // Create Elora (hidden initially)
    this.elora = this.add.sprite(0, this.groundY, 'female')
      .setScale(3)
      .setOrigin(0.5, 1)
      .setDepth(100)
      .setVisible(false);
    this.elora.setFrame(0);

    // Clothing overlay sprites (rendered on top of base characters)
    // All overlays sync position/frame/scale/flip with base sprite every frame
    this.eneaClothes = this.add.sprite(0, 0, 'male-split-hose')
      .setScale(3).setOrigin(0.5, 1).setDepth(101).setVisible(false);
    this.eloraClothes = this.add.sprite(0, 0, 'female-dress-red')
      .setScale(3).setOrigin(0.5, 1).setDepth(101).setVisible(false);

    // Shirt overlay (separate from body clothing — stacks on top)
    this.eneaShirt = this.add.sprite(0, 0, 'male-shirt-blue')
      .setScale(3).setOrigin(0.5, 1).setDepth(101).setVisible(false);

    // Pants overlay
    this.eneaPants = this.add.sprite(0, 0, 'male-pants-brown')
      .setScale(3).setOrigin(0.5, 1).setDepth(101).setVisible(false);

    // Boots overlay
    this.eneaBoots = this.add.sprite(0, 0, 'male-boots')
      .setScale(3).setOrigin(0.5, 1).setDepth(101).setVisible(false);

    // Hat overlay sprites (rendered on top of clothing overlays)
    this.eneaHat = this.add.sprite(0, 0, 'male-hat1')
      .setScale(3).setOrigin(0.5, 1).setDepth(102).setVisible(false);
    this.eloraHat = this.add.sprite(0, 0, 'female-hat1')
      .setScale(3).setOrigin(0.5, 1).setDepth(102).setVisible(false);

    // Dog sprite (changes texture per episode: Totoro/Joey/Marzipan)
    this.dog = this.add.sprite(width * 0.2, this.dogGroundY, 'dog-totoro')
      .setScale(3)
      .setOrigin(0.5, 1)
      .setDepth(100)
      .setVisible(false);
    this.dog.setFrame(8);

    // Baby sprite (Elthen pack - hidden initially, shown in EP11)
    this.baby = this.add.sprite(width * 0.5, this.groundY, 'baby')
      .setScale(3)
      .setOrigin(0.5, 1)
      .setDepth(100)
      .setVisible(false);
    this.baby.setFrame(0);

    // Cat sprites (two orange cats - same texture, cat2 flipped for variety)
    this.cat1 = this.add.sprite(width * 0.15, this.groundY, 'cat-idle')
      .setScale(2)
      .setOrigin(0.5, 1)
      .setDepth(100)
      .setVisible(false);
    this.cat1.setFrame(0);

    this.cat2 = this.add.sprite(width * 0.12, this.groundY, 'cat-idle')
      .setScale(2)
      .setOrigin(0.5, 1)
      .setDepth(100)
      .setVisible(false)
      .setFlipX(true);
    this.cat2.setFrame(0);

    // Horse sprite (Onfe black horse - Rome)
    this.horse = this.add.sprite(width * 0.1, this.groundY, 'horse-black')
      .setScale(3)
      .setOrigin(0.5, 1)
      .setDepth(99)
      .setVisible(false);
    this.horse.setFrame(0);

    // Create UI layer (highest depth)
    this.uiContainer = this.add.container(0, 0).setDepth(200);

    // Episode indicator with skip buttons
    this.prevEpisodeBtn = this.add.text(width / 2 - 140, 30, '◀◀', {
      fontFamily: 'Lato',
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#00000088',
      padding: { x: 10, y: 8 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.prevEpisodeBtn.on('pointerdown', () => this.skipToEpisode(this.currentEpisode - 1));
    this.prevEpisodeBtn.on('pointerover', () => this.prevEpisodeBtn.setBackgroundColor('#444444cc'));
    this.prevEpisodeBtn.on('pointerout', () => this.prevEpisodeBtn.setBackgroundColor('#00000088'));
    this.uiContainer.add(this.prevEpisodeBtn);

    this.episodeText = this.add.text(width / 2, 30, '', {
      fontFamily: 'Lato',
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#00000088',
      padding: { x: 15, y: 8 }
    }).setOrigin(0.5);
    this.uiContainer.add(this.episodeText);

    this.nextEpisodeBtn = this.add.text(width / 2 + 140, 30, '▶▶', {
      fontFamily: 'Lato',
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#00000088',
      padding: { x: 10, y: 8 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.nextEpisodeBtn.on('pointerdown', () => this.skipToEpisode(this.currentEpisode + 1));
    this.nextEpisodeBtn.on('pointerover', () => this.nextEpisodeBtn.setBackgroundColor('#444444cc'));
    this.nextEpisodeBtn.on('pointerout', () => this.nextEpisodeBtn.setBackgroundColor('#00000088'));
    this.uiContainer.add(this.nextEpisodeBtn);

    // Location card (centered)
    this.locationCard = this.add.container(width / 2, height / 2);
    this.locationCard.setVisible(false);

    const locationBg = this.add.rectangle(0, 0, 400, 150, 0x000000, 0.8);
    this.locationTitle = this.add.text(0, -30, '', {
      fontFamily: 'Cormorant Garamond',
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5);
    this.locationDate = this.add.text(0, 30, '', {
      fontFamily: 'Cormorant Garamond',
      fontSize: '20px',
      color: '#cccccc',
      fontStyle: 'italic'
    }).setOrigin(0.5);

    this.locationCard.add([locationBg, this.locationTitle, this.locationDate]);
    this.uiContainer.add(this.locationCard);

    // Speech bubble
    this.speechBubble = this.add.container(0, 0);
    this.speechBubble.setVisible(false);

    this.speechBg = this.add.graphics();
    this.speechSpeaker = this.add.text(0, 0, '', {
      fontFamily: 'Lato',
      fontSize: '14px',
      color: '#e57373',
      fontStyle: 'bold'
    });
    this.speechText = this.add.text(0, 20, '', {
      fontFamily: 'Lato',
      fontSize: '18px',
      color: '#333333',
      wordWrap: { width: 350 }
    });

    this.speechBubble.add([this.speechBg, this.speechSpeaker, this.speechText]);
    this.uiContainer.add(this.speechBubble);

    // Continue prompt - top center so it doesn't overlap characters
    this.continuePrompt = this.add.text(width / 2, 80, '▶ Tap to continue', {
      fontFamily: 'Lato',
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#e5737388',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setVisible(false);
    this.uiContainer.add(this.continuePrompt);

    // Back button for dialogue - allows going back through conversation
    this.backButton = this.add.text(20, 80, '◀ Back', {
      fontFamily: 'Lato',
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#55555588',
      padding: { x: 15, y: 10 }
    }).setOrigin(0, 0.5).setVisible(false).setInteractive({ useHandCursor: true });
    this.backButton.on('pointerdown', () => this.goBack());
    this.backButton.on('pointerover', () => this.backButton.setBackgroundColor('#777777aa'));
    this.backButton.on('pointerout', () => this.backButton.setBackgroundColor('#55555588'));
    this.uiContainer.add(this.backButton);

    // Track dialogue history for back navigation
    this.dialogueHistory = [];

    // Plane for flying animation (drawn pixel art, no emoji)
    this.plane = this.createPixelPlane();
    this.plane.setPosition(-100, height * 0.3);
    this.plane.setVisible(false);

    // Hearts container for explosion
    this.heartsContainer = this.add.container(0, 0);

    // Photo moment overlay
    this.photoOverlay = this.add.container(0, 0).setDepth(300);
    this.photoOverlay.setVisible(false);
    this.currentPhotoIndex = 0;
    this.currentPhotos = [];

    const photoBg = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.95);
    this.photoTitle = this.add.text(width / 2, height * 0.08, '', {
      fontFamily: 'Cormorant Garamond',
      fontSize: '36px',
      color: '#ffcdd2'
    }).setOrigin(0.5);
    this.photoDate = this.add.text(width / 2, height * 0.13, '', {
      fontFamily: 'Cormorant Garamond',
      fontSize: '16px',
      color: '#999999',
      fontStyle: 'italic'
    }).setOrigin(0.5);

    // Photo display area (will hold actual image or icon)
    this.photoImage = null; // Will be created dynamically
    this.photoIcon = this.add.text(width / 2, height * 0.42, '', {
      fontSize: '96px'
    }).setOrigin(0.5);

    // Photo counter (e.g., "1 / 4")
    this.photoCounter = this.add.text(width / 2, height * 0.72, '', {
      fontFamily: 'Lato',
      fontSize: '14px',
      color: '#888888'
    }).setOrigin(0.5);

    this.photoCaption = this.add.text(width / 2, height * 0.78, '', {
      fontFamily: 'Cormorant Garamond',
      fontSize: '16px',
      color: '#cccccc',
      fontStyle: 'italic',
      align: 'center',
      wordWrap: { width: 600 }
    }).setOrigin(0.5);

    // Navigation arrows for slideshow
    this.prevPhotoBtn = this.add.text(width * 0.1, height * 0.42, '◀', {
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true }).setAlpha(0.7);
    this.prevPhotoBtn.on('pointerdown', () => { this._photoClickHandled = true; this.showPrevPhoto(); });
    this.prevPhotoBtn.on('pointerover', () => this.prevPhotoBtn.setAlpha(1));
    this.prevPhotoBtn.on('pointerout', () => this.prevPhotoBtn.setAlpha(0.7));

    this.nextPhotoBtn = this.add.text(width * 0.9, height * 0.42, '▶', {
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true }).setAlpha(0.7);
    this.nextPhotoBtn.on('pointerdown', () => { this._photoClickHandled = true; this.showNextPhoto(); });
    this.nextPhotoBtn.on('pointerover', () => this.nextPhotoBtn.setAlpha(1));
    this.nextPhotoBtn.on('pointerout', () => this.nextPhotoBtn.setAlpha(0.7));

    const continueBtn = this.add.rectangle(width / 2, height * 0.92, 250, 45, 0x000000, 0)
      .setStrokeStyle(2, 0xe57373)
      .setInteractive({ useHandCursor: true });
    const continueBtnText = this.add.text(width / 2, height * 0.92, 'Continue →', {
      fontFamily: 'Lato',
      fontSize: '16px',
      color: '#ffffff'
    }).setOrigin(0.5);

    continueBtn.on('pointerdown', () => { this._photoClickHandled = true; this.closePhoto(); });
    continueBtn.on('pointerover', () => continueBtn.setFillStyle(0xe57373, 1));
    continueBtn.on('pointerout', () => continueBtn.setFillStyle(0x000000, 0));

    this.photoOverlay.add([photoBg, this.photoTitle, this.photoDate, this.photoIcon, this.photoCounter, this.photoCaption, this.prevPhotoBtn, this.nextPhotoBtn, continueBtn, continueBtnText]);

    // Input handling
    this.input.on('pointerdown', () => this.handleInput());
    this.input.keyboard.on('keydown-SPACE', () => this.handleInput());
    this.input.keyboard.on('keydown-ENTER', () => this.handleInput());

    // Debug overlay toggle (press D to show/hide)
    this.debugEnabled = false;
    this.debugText = this.add.text(10, 10, '', {
      fontSize: '11px', color: '#00ff00', backgroundColor: '#000000cc',
      padding: { x: 6, y: 4 }, wordWrap: { width: 500 }
    }).setDepth(999).setScrollFactor(0).setVisible(false);
    this.input.keyboard.on('keydown-D', () => {
      this.debugEnabled = !this.debugEnabled;
      this.debugText.setVisible(this.debugEnabled);
    });

    // Fade in and start episode
    this.cameras.main.fadeIn(500, 0, 0, 0);
    this.startEpisode();
  }

  loadBackground(bgKey) {
    // Clear existing backgrounds
    this.bgLayers.forEach(layer => layer.sprite.destroy());
    this.bgLayers = [];

    const config = BACKGROUNDS[bgKey];
    if (!config) return;

    config.layers.forEach((layer, index) => {
      // Get the texture dimensions
      const texture = this.textures.get(layer.key);
      const frame = texture.get();
      const texWidth = frame.width;
      const texHeight = frame.height;

      // Create tileSprite at screen size
      const bg = this.add.tileSprite(0, 0, this.width, this.height, layer.key)
        .setOrigin(0, 0)
        .setScrollFactor(0)
        .setDepth(-100 + index);

      // Scale tiles to fill screen height (use tileScale, not scale)
      const tileScale = this.height / texHeight;
      bg.setTileScale(tileScale, tileScale);

      this.bgLayers.push({ sprite: bg, speed: layer.speed, tileScale: tileScale });
    });
  }

  startEpisode() {
    const episode = EPISODES[this.currentEpisode];
    if (!episode) return;

    this.dialogueIndex = 0;
    this.dialogueHistory = []; // Reset history for new episode

    // Update episode indicator and skip button visibility
    this.episodeText.setText(`Episode ${episode.id} of ${EPISODES.length}`);
    this.prevEpisodeBtn.setVisible(this.currentEpisode > 0);
    this.nextEpisodeBtn.setVisible(this.currentEpisode < EPISODES.length - 1);

    // Clean up restaurant scene if it was active
    this.cleanupRestaurant();

    // Load background
    this.loadBackground(episode.background);

    // Reset ALL character positions and visibility for clean slate
    // Hide everyone first, then actions will show them as needed
    this.enea.setVisible(false);
    this.enea.setPosition(this.width * 0.5, this.groundY);
    this.enea.stop();
    this.enea.setFrame(0);
    this.enea.setScale(3); // Reset scale (restaurant changes it)

    this.elora.setVisible(false);
    this.elora.setPosition(this.width * 0.5, this.groundY);
    this.elora.stop();
    this.elora.setFrame(0);

    // Clear tints (dinner scene may have set them)
    this.enea.clearTint();
    this.elora.clearTint();

    // Clean up proposal ring if present (from kneel action)
    if (this.proposalRing) { this.proposalRing.destroy(); this.proposalRing = null; }
    if (this.proposalRingGlow) { this.proposalRingGlow.destroy(); this.proposalRingGlow = null; }

    // Apply clothing overlays for this episode
    this.applyOutfits(episode.outfits);

    // Swap dog texture/scale based on story timeline
    const dogInfo = this.getDogForEpisode(episode.id);
    this.dog.setTexture(dogInfo.texture);
    this.dog.setScale(dogInfo.scale);
    if (this.anims.exists('dog-walk')) {
      this.anims.remove('dog-walk');
    }
    this.anims.create({
      key: 'dog-walk',
      frames: this.anims.generateFrameNumbers(dogInfo.texture, { start: 8, end: 15 }),
      frameRate: 10,
      repeat: -1
    });

    this.dog.setVisible(false);
    this.dog.setPosition(this.width * 0.2, this.dogGroundY);
    this.dog.stop();
    this.dog.setFrame(8);

    this.baby.setVisible(false);
    this.baby.stop();
    this.baby.setFrame(0);

    // Set animal flags based on story timeline + per-episode overrides
    // Dog: joins in EP05 (via dog-join action mid-episode), present from EP06+
    // Some episodes override this (e.g., EP07: Joey wasn't in Rome)
    this.hasDog = episode.id >= 6 && !episode.noDog;

    // Cats: acquired in Geneva era, first confirmed EP09 (3 pet carriers to Seattle)
    this.hasCats = episode.id >= 9;
    this.cat1.setVisible(false);
    this.cat1.stop();
    this.cat1.setFrame(0);
    this.cat2.setVisible(false);
    this.cat2.stop();
    this.cat2.setFrame(0);

    // Horse: Rome gifted at Matthews Beach (EP10)
    this.hasHorse = episode.id >= 10;
    this.horse.setVisible(false);
    this.horse.stop();
    this.horse.setFrame(0);

    // Block input during location card display
    this.isAnimating = true;

    // Show location card
    this.locationTitle.setText(episode.name);
    this.locationDate.setText(episode.date);
    this.locationCard.setVisible(true);
    this.locationCard.setAlpha(0);

    this.tweens.add({
      targets: this.locationCard,
      alpha: 1,
      duration: 500,
      onComplete: () => {
        this.time.delayedCall(1500, () => {
          this.tweens.add({
            targets: this.locationCard,
            alpha: 0,
            duration: 500,
            onComplete: () => {
              this.locationCard.setVisible(false);
              this.isAnimating = false;
              this.processDialogue();
            }
          });
        });
      }
    });
  }

  processDialogue() {
    const episode = EPISODES[this.currentEpisode];
    if (!episode || this.dialogueIndex >= episode.dialogue.length) return;

    const dialogue = episode.dialogue[this.dialogueIndex];

    // Handle actions
    if (dialogue.action) {
      this.handleAction(dialogue.action, dialogue);
      return;
    }

    // Show speech bubble
    if (dialogue.speaker && dialogue.text) {
      this.showSpeech(dialogue.speaker, dialogue.text, dialogue.effect);
    }
  }

  handleAction(action, dialogue) {
    this.isAnimating = true;

    const handler = ACTION_HANDLERS[action];
    if (handler) {
      handler(this, dialogue);
    } else {
      console.warn('Unknown action:', action);
      this.isAnimating = false;
      this.dialogueIndex++;
      this.processDialogue();
    }
  }

  setupRestaurant() {
    // STEP 1: Clear parallax backgrounds
    this.bgLayers.forEach(layer => layer.sprite.destroy());
    this.bgLayers = [];
    this.cleanupRestaurant();
    this.restaurantElements = [];

    const w = this.width;   // 1280
    const h = this.height;  // 720
    const add = (el) => { this.restaurantElements.push(el); return el; };
    const S = 6; // Pixel art scale factor (8px tiles → 48px on screen)

    // Full-screen black background (prevents any gaps)
    add(this.add.rectangle(w / 2, h / 2, w, h, 0x1a0e08).setDepth(-110));

    // STEP 2: Restaurant background using pixel art tiles
    // Wallpaper - tiled across the wall area (upper 65%)
    const wallH = h * 0.65;
    add(this.add.tileSprite(0, 0, w, wallH, 'wallpaper-tile')
      .setOrigin(0, 0).setTileScale(S, S).setDepth(-100));
    // Warm tint over wallpaper
    add(this.add.rectangle(w / 2, wallH / 2, w, wallH, 0x331500, 0.2).setDepth(-99));

    // Floor - tiled across the rest
    const floorY = wallH;
    const floorH = h - wallH;
    add(this.add.tileSprite(0, floorY, w, floorH, 'floor-tile')
      .setOrigin(0, 0).setTileScale(S, S).setDepth(-100));
    // Darken floor slightly
    add(this.add.rectangle(w / 2, floorY + floorH / 2, w, floorH, 0x0a0505, 0.3).setDepth(-99));

    // Baseboard / wainscoting strip
    add(this.add.rectangle(w / 2, floorY, w, 6, 0x3a1e14).setDepth(-98));
    add(this.add.rectangle(w / 2, floorY + 3, w, 2, 0x5a3828).setDepth(-97));

    // STEP 2b: Wall decorations
    // Window (center-left wall)
    add(this.add.image(w * 0.22, wallH * 0.38, 'window-front')
      .setScale(S).setOrigin(0.5, 0.5).setDepth(-95));
    // Night sky glow behind window
    add(this.add.rectangle(w * 0.22, wallH * 0.38, 16 * S * 0.7, 24 * S * 0.5, 0x1a1a3a, 0.6)
      .setDepth(-96));

    // Paintings on wall
    add(this.add.image(w * 0.42, wallH * 0.32, 'painting-lg')
      .setScale(S).setOrigin(0.5, 0.5).setDepth(-95));
    add(this.add.image(w * 0.62, wallH * 0.30, 'painting-sm')
      .setScale(S).setOrigin(0.5, 0.5).setDepth(-95));
    add(this.add.image(w * 0.78, wallH * 0.34, 'painting-lg')
      .setScale(S).setOrigin(0.5, 0.5).setDepth(-95).setFlipX(true));

    // Ceiling lamp (assembled from 3 parts) center of room
    const lampX = w / 2;
    const lampPartH = 8 * S; // 48px per part
    add(this.add.image(lampX, 0, 'ceiling-lamp-top')
      .setScale(S).setOrigin(0.5, 0).setDepth(-94));
    add(this.add.image(lampX, lampPartH, 'ceiling-lamp-mid')
      .setScale(S).setOrigin(0.5, 0).setDepth(-94));
    add(this.add.image(lampX, lampPartH * 2, 'ceiling-lamp-btm')
      .setScale(S).setOrigin(0.5, 0).setDepth(-94));
    // Warm light cone from ceiling lamp
    const lightCone = this.add.graphics().setDepth(-93);
    lightCone.fillStyle(0xffcc66, 0.06);
    lightCone.fillTriangle(lampX, lampPartH * 3, lampX - 300, floorY, lampX + 300, floorY);
    add(lightCone);

    // Floor lamps on far edges
    add(this.add.image(w * 0.08, floorY, 'floor-lamp')
      .setScale(S).setOrigin(0.5, 1).setDepth(-90));
    add(this.add.image(w * 0.92, floorY, 'floor-lamp')
      .setScale(S).setOrigin(0.5, 1).setDepth(-90).setFlipX(true));
    // Warm glow circles at floor lamp tops
    add(this.add.circle(w * 0.08, floorY - 24 * S + 10, 50, 0xffaa33, 0.08).setDepth(-89));
    add(this.add.circle(w * 0.92, floorY - 24 * S + 10, 50, 0xffaa33, 0.08).setDepth(-89));

    // Plants in corners
    add(this.add.image(w * 0.04, floorY, 'plant')
      .setScale(S).setOrigin(0.5, 1).setDepth(-85));
    add(this.add.image(w * 0.96, floorY, 'plant')
      .setScale(S).setOrigin(0.5, 1).setDepth(-85).setFlipX(true));

    // STEP 3: Table - drawn with graphics at depth 110 (ABOVE characters at 100)
    const tableX = w / 2;
    const tableTopY = h * 0.58;
    const tableW = 440; // Slightly wider

    const tableGfx = this.add.graphics().setDepth(110);
    // Tablecloth (white linen, subtle)
    tableGfx.fillStyle(0xffeedd, 0.3);
    tableGfx.fillRoundedRect(tableX - tableW / 2 - 10, tableTopY - 5, tableW + 20, 30, 6);
    // Table surface (dark wood)
    tableGfx.fillStyle(0x5c3a28, 1);
    tableGfx.fillRoundedRect(tableX - tableW / 2, tableTopY, tableW, 22, 4);
    // Highlight stripe
    tableGfx.fillStyle(0x7a5038, 1);
    tableGfx.fillRoundedRect(tableX - tableW / 2 + 8, tableTopY + 4, tableW - 16, 6, 2);
    // Legs
    tableGfx.fillStyle(0x4a2a18, 1);
    tableGfx.fillRect(tableX - tableW / 2 + 20, tableTopY + 22, 10, 80);
    tableGfx.fillRect(tableX + tableW / 2 - 30, tableTopY + 22, 10, 80);
    add(tableGfx);

    // Chairs at table (behind characters, depth 95)
    add(this.add.image(tableX - 150, floorY, 'chair')
      .setScale(S).setOrigin(0.5, 1).setDepth(95));
    add(this.add.image(tableX + 150, floorY, 'chair')
      .setScale(S).setOrigin(0.5, 1).setDepth(95).setFlipX(true));

    // STEP 4: Table items (depth 112, above table surface)
    // Candle centerpiece
    add(this.add.image(tableX, tableTopY, 'candle')
      .setScale(S * 0.7).setOrigin(0.5, 1).setDepth(112));
    const glow = this.add.circle(tableX, tableTopY - 30, 45, 0xffaa33, 0.12).setDepth(112);
    add(glow);
    this.tweens.add({
      targets: glow, alpha: 0.06, scaleX: 0.85, scaleY: 0.85,
      duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
    });

    // Plates (silverware frame 4 = plate)
    const cutS = 1.5; // 32px * 1.5 = 48px — proportional to characters
    add(this.add.sprite(tableX - 80, tableTopY + 4, 'silverware', 4)
      .setScale(cutS).setOrigin(0.5, 0.5).setDepth(112));
    add(this.add.sprite(tableX + 80, tableTopY + 4, 'silverware', 4)
      .setScale(cutS).setOrigin(0.5, 0.5).setDepth(112));

    // Enea's cutlery (static, left side)
    add(this.add.sprite(tableX - 105, tableTopY - 2, 'silverware', 0)
      .setScale(cutS).setOrigin(0.5, 0.5).setDepth(113)); // fork
    add(this.add.sprite(tableX - 55, tableTopY - 2, 'silverware', 2)
      .setScale(cutS).setOrigin(0.5, 0.5).setDepth(113)); // knife

    // Elora's cutlery (will fly away during embarrassed effect)
    this.eloraCutleryFork = this.add.sprite(tableX + 105, tableTopY - 2, 'silverware', 0)
      .setScale(cutS).setOrigin(0.5, 0.5).setDepth(113);
    this.eloraCutleryKnife = this.add.sprite(tableX + 55, tableTopY - 2, 'silverware', 2)
      .setScale(cutS).setOrigin(0.5, 0.5).setDepth(113);
    add(this.eloraCutleryFork);
    add(this.eloraCutleryKnife);

    // Napkin near Elora's plate (frame 7 = folded napkin)
    this.eloraNapkin = this.add.sprite(tableX + 130, tableTopY + 2, 'silverware', 7)
      .setScale(cutS).setOrigin(0.5, 0.5).setDepth(113);
    add(this.eloraNapkin);

    // Warm ambient overlay (entire scene)
    add(this.add.rectangle(w / 2, h / 2, w, h, 0x331500, 0.08).setDepth(-80));

    // STEP 5: Position characters at the table
    const dinnerScale = 3;
    const spriteH = 64 * dinnerScale; // 192px
    const seatY = tableTopY + Math.round(spriteH * 0.38);
    const eneaDinnerX = tableX - 160;
    const eloraDinnerX = tableX + 160;

    this.enea.setPosition(eneaDinnerX, seatY);
    this.enea.setScale(dinnerScale);
    this.enea.setFlipX(true);  // Face right (toward Elora)
    this.enea.setVisible(true);
    this.enea.stop();
    this.enea.setFrame(0);
    this.enea.setDepth(100);   // Behind table (110)
    this.eneaExpectedX = eneaDinnerX;
    // Dinner outfit: swap to chainmail for fancy/formal look
    this.currentEneaOutfit = 'male-chainmail';
    this.eneaClothes.setTexture('male-chainmail');
    // No hats/shirt/pants/boots at dinner (chainmail covers everything)
    this.currentEneaHat = null;
    this.currentEneaShirt = null;
    this.currentEneaPants = null;
    this.currentEneaBoots = null;

    this.elora.setPosition(eloraDinnerX, seatY);
    this.elora.setScale(dinnerScale);
    this.elora.setFlipX(false); // Face left (toward Enea)
    this.elora.setVisible(true);
    this.elora.stop();
    this.elora.setFrame(0);
    this.elora.setDepth(100);   // Behind table (110)
    // Dinner outfit: fancy blue dress
    this.currentEloraOutfit = 'female-fancy-blue';
    this.eloraClothes.setTexture('female-fancy-blue');
    this.currentEloraHat = null; // No hats at dinner
    this.eloraExpectedX = eloraDinnerX;

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
    // Set clothing overlay textures for this episode
    if (outfits && outfits.enea && this.textures.exists(outfits.enea)) {
      this.eneaClothes.setTexture(outfits.enea);
      this.currentEneaOutfit = outfits.enea;
    } else {
      this.currentEneaOutfit = null;
    }
    if (outfits && outfits.elora && this.textures.exists(outfits.elora)) {
      this.eloraClothes.setTexture(outfits.elora);
      this.currentEloraOutfit = outfits.elora;
    } else {
      this.currentEloraOutfit = null;
    }
    // Set hat overlay textures
    if (outfits && outfits.eneaHat && this.textures.exists(outfits.eneaHat)) {
      this.eneaHat.setTexture(outfits.eneaHat);
      this.currentEneaHat = outfits.eneaHat;
    } else {
      this.currentEneaHat = null;
    }
    if (outfits && outfits.eloraHat && this.textures.exists(outfits.eloraHat)) {
      this.eloraHat.setTexture(outfits.eloraHat);
      this.currentEloraHat = outfits.eloraHat;
    } else {
      this.currentEloraHat = null;
    }
    // Set shirt/pants/boots overlay textures (Enea only for now)
    if (outfits && outfits.eneaShirt && this.textures.exists(outfits.eneaShirt)) {
      this.eneaShirt.setTexture(outfits.eneaShirt);
      this.currentEneaShirt = outfits.eneaShirt;
    } else {
      this.currentEneaShirt = null;
    }
    if (outfits && outfits.eneaPants && this.textures.exists(outfits.eneaPants)) {
      this.eneaPants.setTexture(outfits.eneaPants);
      this.currentEneaPants = outfits.eneaPants;
    } else {
      this.currentEneaPants = null;
    }
    if (outfits && outfits.eneaBoots && this.textures.exists(outfits.eneaBoots)) {
      this.eneaBoots.setTexture(outfits.eneaBoots);
      this.currentEneaBoots = outfits.eneaBoots;
    } else {
      this.currentEneaBoots = null;
    }
  }

  syncClothingOverlay(base, overlay, outfitKey, depthOffset) {
    // Sync overlay with base character: position, frame, scale, flip, visibility, depth, alpha
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
    // Sync animation frame
    overlay.setFrame(base.frame.name);
  }

  cleanupRestaurant() {
    if (this.restaurantElements) {
      this.restaurantElements.forEach(el => { if (el && el.destroy) el.destroy(); });
      this.restaurantElements = null;
    }
    if (this.enea) { this.enea.setDepth(100); this.enea.setScale(3); this.enea.clearTint(); }
    if (this.elora) { this.elora.setDepth(100); this.elora.setScale(3); this.elora.clearTint(); }
    // Restore episode outfits (dinner scene overrides them)
    const episode = EPISODES[this.currentEpisode];
    if (episode) this.applyOutfits(episode.outfits);
    this.eloraCutleryFork = null;
    this.eloraCutleryKnife = null;
    this.eloraNapkin = null;
  }

  walkTogether(callback) {
    const targetX = this.width * 0.7;

    // Walking right, so face right
    this.enea.setFlipX(true);
    this.enea.play('male-walk');

    if (this.hasElora) {
      this.elora.setFlipX(true);
      this.elora.play('female-walk');
    }

    const tweens = [
      this.tweens.add({
        targets: this.enea,
        x: targetX,
        duration: 2500,
        ease: 'Linear'
      })
    ];

    if (this.hasElora) {
      tweens.push(this.tweens.add({
        targets: this.elora,
        x: targetX + 150,
        duration: 2500,
        ease: 'Linear'
      }));
    }

    if (this.hasDog) {
      this.dog.setFlipX(true); // Face right (walking direction)
      this.dog.play('dog-walk');
      tweens.push(this.tweens.add({
        targets: this.dog,
        x: targetX - 60,
        duration: 2500,
        ease: 'Linear'
      }));
    }

    if (this.hasCats && this.cat1.visible) {
      this.cat1.setFlipX(true);
      this.cat2.setFlipX(false); // cat2 is already flipped, so unflip = face right
      this.cat1.play('cat-walk-anim');
      this.cat2.play('cat-walk-anim');
      tweens.push(this.tweens.add({
        targets: this.cat1,
        x: targetX - 100,
        duration: 2500,
        ease: 'Linear'
      }));
      tweens.push(this.tweens.add({
        targets: this.cat2,
        x: targetX - 140,
        duration: 2500,
        ease: 'Linear'
      }));
    }

    if (this.hasHorse && this.horse.visible) {
      this.horse.setFlipX(true);
      this.horse.play('horse-walk');
      tweens.push(this.tweens.add({
        targets: this.horse,
        x: targetX - 220,
        duration: 2500,
        ease: 'Linear'
      }));
    }

    // Scroll background (slower, more comfortable)
    this.tweens.add({
      targets: { value: 0 },
      value: 200,
      duration: 2500,
      ease: 'Linear',
      onUpdate: (tween) => {
        this.bgLayers.forEach(layer => {
          layer.sprite.tilePositionX += layer.speed * 1;
        });
      }
    });

    this.time.delayedCall(2500, () => {
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

  showSpeech(speaker, text, effect) {
    const isEnea = speaker === 'enea';
    const char = isEnea ? this.enea : this.elora;
    const name = isEnea ? 'Enea' : 'Elora';

    // Auto-face characters toward each other when both are visible
    if (this.enea.visible && this.elora.visible) {
      const eneaX = this.enea.x > 100 ? this.enea.x : (this.eneaExpectedX || this.width * 0.4);
      const eloraX = this.elora.x > 100 ? this.elora.x : (this.eloraExpectedX || this.width * 0.6);

      if (eneaX < eloraX) {
        // Enea is left, Elora is right - face each other
        this.enea.setFlipX(true);   // Face right (toward Elora)
        this.elora.setFlipX(false); // Face left (toward Enea)
      } else {
        // Enea is right, Elora is left
        this.enea.setFlipX(false);  // Face left (toward Elora)
        this.elora.setFlipX(true);  // Face right (toward Enea)
      }
    }

    this.speechSpeaker.setText(name);
    this.speechText.setText(text);

    // Calculate bubble size
    const textBounds = this.speechText.getBounds();
    const bubbleWidth = Math.max(textBounds.width + 40, 200);
    const bubbleHeight = textBounds.height + 60;

    // Position bubble above the speaking character
    // Use expected position as fallback, or hardcoded position if all else fails
    let charX = char.x;
    if (isEnea) {
      // For Enea, use expected position or default to right side (70% of screen)
      if (charX < 100) {
        charX = this.eneaExpectedX || (this.width || 1280) * 0.7;
      }
    } else {
      // For Elora, use expected position or default to left side (35% of screen)
      if (charX < 100) {
        charX = this.eloraExpectedX || (this.width || 1280) * 0.35;
      }
    }

    let bubbleX = charX;
    // Position bubble above the character's head
    // Character sprite is 192px tall (64 * scale 3), origin at bottom
    // Head is at char.y - 192, bubble goes well above that
    // Extra gap leaves room for blush/emotion effects above the head
    let bubbleY = char.y - 260;

    // Keep bubble on screen
    const screenWidth = this.width || 1280;
    if (bubbleX - bubbleWidth / 2 < 20) bubbleX = bubbleWidth / 2 + 20;
    if (bubbleX + bubbleWidth / 2 > screenWidth - 20) bubbleX = screenWidth - bubbleWidth / 2 - 20;
    if (bubbleY < 100) bubbleY = 100;

    // Draw bubble background with pointer
    this.speechBg.clear();
    this.speechBg.fillStyle(0xffffff, 1);
    this.speechBg.fillRoundedRect(-20, -20, bubbleWidth, bubbleHeight, 15);

    // Draw pointer triangle pointing down toward character
    const pointerX = bubbleWidth / 2 - 20; // Center of bubble
    this.speechBg.fillTriangle(
      pointerX - 10, bubbleHeight - 20,
      pointerX + 10, bubbleHeight - 20,
      pointerX, bubbleHeight
    );

    // Add subtle border
    this.speechBg.lineStyle(2, 0xe57373, 0.5);
    this.speechBg.strokeRoundedRect(-20, -20, bubbleWidth, bubbleHeight, 15);

    this.speechBubble.setPosition(bubbleX - bubbleWidth / 2, bubbleY);
    this.speechBubble.setVisible(true);
    this.speechBubble.setAlpha(0);

    this.tweens.add({
      targets: this.speechBubble,
      alpha: 1,
      duration: 200
    });

    // Handle special effects
    if (effect === 'blush') {
      this.createBlushEffect();
    } else if (effect === 'heart-flutter') {
      this.createHeartFlutterEffect();
    } else if (effect === 'embarrassed') {
      this.createEmbarrassedEffect();
    }

    this.continuePrompt.setVisible(true);
    // Show back button if we have dialogue history
    this.backButton.setVisible(this.dialogueHistory.length > 0);
    this.isAnimating = false;
  }

  // Draw a heart shape using graphics (Phaser 3 compatible - no bezier)
  createHeartGraphic(x, y, size, color) {
    // Use pixel-art heart texture instead of drawn shapes
    const scale = size / 8; // 16px texture, so size 16 = scale 2
    const heart = this.add.image(x, y, 'heart-pixel')
      .setScale(scale)
      .setOrigin(0.5, 0.5);
    if (color && color !== 0xe57373) {
      heart.setTint(color);
    }
    return heart;
  }

  // Draw a pixel-art airplane using Phaser Graphics (no emoji)
  createPixelPlane() {
    // Pixel-art plane from canvas texture — matches game's pixel aesthetic
    const plane = this.add.image(0, 0, 'plane-pixel')
      .setDepth(200)
      .setScale(4);
    return plane;
  }

  createBlushEffect() {
    // Create blush marks near both characters' faces
    const blushMarks = [];

    // Use expected positions as fallback
    const eneaX = this.enea.x > 100 ? this.enea.x : (this.eneaExpectedX || this.width * 0.7);
    const eloraX = this.elora.x > 100 ? this.elora.x : (this.eloraExpectedX || this.width * 0.35);

    // Blush for Enea (right side of screen)
    const eneaBlush = this.add.text(eneaX + 15, this.groundY - 140, '///', {
      fontSize: '18px',
      color: '#ffb6c1'
    }).setOrigin(0.5).setAlpha(0).setDepth(150).setRotation(-0.2);

    // Blush for Elora (left side of screen)
    const eloraBlush = this.add.text(eloraX - 15, this.groundY - 140, '///', {
      fontSize: '18px',
      color: '#ffb6c1'
    }).setOrigin(0.5).setAlpha(0).setDepth(150).setRotation(0.2);

    blushMarks.push(eneaBlush, eloraBlush);

    // Store reference to clear later
    this.currentBlushMarks = blushMarks;

    // Fade in with gentle wobble
    blushMarks.forEach((blush, i) => {
      this.tweens.add({
        targets: blush,
        alpha: 0.8,
        duration: 300,
        delay: i * 100
      });

      // Subtle wobble
      this.tweens.add({
        targets: blush,
        y: blush.y - 3,
        duration: 600,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    });
  }

  clearBlushEffect() {
    if (this.currentBlushMarks) {
      this.currentBlushMarks.forEach(blush => {
        this.tweens.add({
          targets: blush,
          alpha: 0,
          duration: 300,
          onComplete: () => blush.destroy()
        });
      });
      this.currentBlushMarks = null;
    }
  }

  createHeartFlutterEffect() {
    // Small hearts floating near Enea (for his internal monologue)
    const eneaX = this.enea.x > 100 ? this.enea.x : (this.eneaExpectedX || this.width * 0.7);

    for (let i = 0; i < 3; i++) {
      const heart = this.add.image(
        eneaX - 20 + i * 18,
        this.groundY - 120 - i * 15,
        'heart-pixel'
      ).setScale(0.8 + i * 0.2).setAlpha(0).setDepth(150);

      this.tweens.add({
        targets: heart,
        alpha: 0.8,
        y: heart.y - 40,
        duration: 800,
        delay: i * 200,
        ease: 'Sine.easeOut',
        onComplete: () => {
          this.tweens.add({
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

  createEmbarrassedEffect() {
    const eloraX = this.elora.x > 100 ? this.elora.x : (this.eloraExpectedX || this.width * 0.6);
    const eloraY = this.elora.y;
    const embarrassedMarks = [];

    // Blush on Elora (position relative to character, not groundY)
    const eloraBlush = this.add.text(eloraX - 15, eloraY - 140, '///', {
      fontSize: '20px',
      color: '#ff9999'
    }).setOrigin(0.5).setAlpha(0).setDepth(150).setRotation(0.2);
    embarrassedMarks.push(eloraBlush);

    // Exclamation mark above head
    const exclaim = this.add.text(eloraX, eloraY - 180, '!', {
      fontSize: '32px',
      fontStyle: 'bold',
      color: '#ff6666'
    }).setOrigin(0.5).setAlpha(0).setDepth(150);
    embarrassedMarks.push(exclaim);

    // Store for cleanup
    this.currentBlushMarks = embarrassedMarks;

    // Animate blush in
    this.tweens.add({
      targets: eloraBlush,
      alpha: 0.9,
      duration: 150
    });

    // Exclamation pop
    this.tweens.add({
      targets: exclaim,
      alpha: 1,
      y: exclaim.y - 10,
      duration: 200,
      ease: 'Back.easeOut'
    });
    this.tweens.add({
      targets: exclaim,
      rotation: 0.1,
      duration: 100,
      yoyo: true,
      repeat: 3
    });

    // === FLYING CUTLERY + NAPKIN from the table ===
    if (this.eloraCutleryFork && this.eloraCutleryKnife) {
      // Fork flies up-right with spin
      this.eloraCutleryFork.setDepth(150);
      this.tweens.add({
        targets: this.eloraCutleryFork,
        x: this.eloraCutleryFork.x + 140,
        y: this.eloraCutleryFork.y - 220,
        angle: 360 * 4,
        alpha: 0,
        duration: 1000,
        ease: 'Sine.easeOut'
      });

      // Knife flies up-left with spin
      this.eloraCutleryKnife.setDepth(150);
      this.tweens.add({
        targets: this.eloraCutleryKnife,
        x: this.eloraCutleryKnife.x - 100,
        y: this.eloraCutleryKnife.y - 180,
        angle: -360 * 3,
        alpha: 0,
        duration: 900,
        delay: 100,
        ease: 'Sine.easeOut'
      });

      // Napkin tumbles away
      if (this.eloraNapkin) {
        this.eloraNapkin.setDepth(150);
        this.tweens.add({
          targets: this.eloraNapkin,
          x: this.eloraNapkin.x + 80,
          y: this.eloraNapkin.y - 160,
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

  hideSpeech() {
    this.speechBubble.setVisible(false);
    this.continuePrompt.setVisible(false);
    this.backButton.setVisible(false);
    this.clearBlushEffect();
  }

  createHearts() {
    const colors = [0xe57373, 0xef5350, 0xf48fb1, 0xff8a80, 0xce93d8];
    const centerX = (this.enea.x + this.elora.x) / 2 || this.width * 0.5;

    for (let i = 0; i < 20; i++) {
      const startX = centerX - 120 + Math.random() * 240;
      const startY = this.groundY - 40 + Math.random() * 40;
      const scale = 1.2 + Math.random() * 1.8;
      const color = colors[Math.floor(Math.random() * colors.length)];

      const heart = this.add.image(startX, startY, 'heart-pixel')
        .setScale(0.1)
        .setDepth(200)
        .setAlpha(0.9)
        .setTint(color);

      // Staggered pop-in, float up with gentle sway, then fade
      const delay = i * 80;
      const swayDir = Math.random() > 0.5 ? 1 : -1;

      this.tweens.add({
        targets: heart,
        scale: scale,
        duration: 300,
        delay: delay,
        ease: 'Back.easeOut',
      });

      this.tweens.add({
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

  showPhoto() {
    const episode = EPISODES[this.currentEpisode];

    this.photoTitle.setText(episode.name);
    this.photoDate.setText(episode.date);
    this.photoCaption.setText(episode.caption);

    // Check if episode has actual photos
    if (episode.photos && episode.photos.length > 0) {
      this.currentPhotos = episode.photos;
      this.currentPhotoIndex = 0;
      this.photoIcon.setVisible(false);
      this.displayCurrentPhoto();

      // Show/hide navigation based on photo count
      const hasMultiple = this.currentPhotos.length > 1;
      this.prevPhotoBtn.setVisible(false);
      this.prevPhotoBtn.disableInteractive();
      this.nextPhotoBtn.setVisible(hasMultiple);
      if (hasMultiple) this.nextPhotoBtn.setInteractive(); else this.nextPhotoBtn.disableInteractive();
      this.photoCounter.setVisible(hasMultiple);
    } else {
      // No photos - show icon instead
      this.currentPhotos = [];
      this.photoIcon.setText(episode.icon);
      this.photoIcon.setVisible(true);
      this.prevPhotoBtn.setVisible(false);
      this.prevPhotoBtn.disableInteractive();
      this.nextPhotoBtn.setVisible(false);
      this.nextPhotoBtn.disableInteractive();
      this.photoCounter.setVisible(false);
      if (this.photoImage) {
        this.photoImage.destroy();
        this.photoImage = null;
      }
    }

    this.photoOverlay.setVisible(true);
    this.photoOverlay.setAlpha(0);

    this.tweens.add({
      targets: this.photoOverlay,
      alpha: 1,
      duration: 500
    });

    this.hideSpeech();

    // Handle unlock
    if (episode.unlock === 'elora') this.hasElora = true;
    if (episode.unlock === 'dog') this.hasDog = true;
    if (episode.unlock === 'baby') this.hasBaby = true;
  }

  displayCurrentPhoto() {
    const episode = EPISODES[this.currentEpisode];
    const photoKey = `photo-${episode.id}-${this.currentPhotoIndex}`;

    // Remove old photo image if exists
    if (this.photoImage) {
      this.photoImage.destroy();
      this.photoImage = null;
    }

    // Check if texture exists
    if (this.textures.exists(photoKey)) {
      this.photoImage = this.add.image(this.width / 2, this.height * 0.42, photoKey);

      // Scale to fit within bounds (max 500x350)
      const maxWidth = 500;
      const maxHeight = 350;
      const scaleX = maxWidth / this.photoImage.width;
      const scaleY = maxHeight / this.photoImage.height;
      const scale = Math.min(scaleX, scaleY, 1); // Don't scale up
      this.photoImage.setScale(scale);

      // Add to overlay container
      this.photoOverlay.add(this.photoImage);
    }

    // Update counter
    this.photoCounter.setText(`${this.currentPhotoIndex + 1} / ${this.currentPhotos.length}`);

    // Show/hide arrows based on position in slideshow — also toggle interactivity
    if (this.currentPhotos.length > 1) {
      const showPrev = this.currentPhotoIndex > 0;
      const showNext = this.currentPhotoIndex < this.currentPhotos.length - 1;
      this.prevPhotoBtn.setVisible(showPrev);
      this.nextPhotoBtn.setVisible(showNext);
      if (showPrev) this.prevPhotoBtn.setInteractive(); else this.prevPhotoBtn.disableInteractive();
      if (showNext) this.nextPhotoBtn.setInteractive(); else this.nextPhotoBtn.disableInteractive();
    }
  }

  showNextPhoto() {
    if (this.currentPhotos.length === 0) return;
    if (this.currentPhotoIndex >= this.currentPhotos.length - 1) return; // Don't cycle past last
    this.currentPhotoIndex++;
    this.displayCurrentPhoto();
  }

  showPrevPhoto() {
    if (this.currentPhotos.length === 0) return;
    if (this.currentPhotoIndex <= 0) return; // Don't cycle past first
    this.currentPhotoIndex--;
    this.displayCurrentPhoto();
  }

  closePhoto() {
    this.tweens.add({
      targets: this.photoOverlay,
      alpha: 0,
      duration: 500,
      onComplete: () => {
        this.photoOverlay.setVisible(false);

        // Clean up photo image
        if (this.photoImage) {
          this.photoImage.destroy();
          this.photoImage = null;
        }
        this.currentPhotos = [];
        this.currentPhotoIndex = 0;

        // Check for finale
        const episode = EPISODES[this.currentEpisode];
        const hasFinale = episode.dialogue.some(d => d.action === 'finale');

        if (hasFinale) {
          this.cameras.main.fadeOut(1000, 0, 0, 0);
          this.time.delayedCall(1000, () => {
            this.scene.start('FinaleScene');
          });
        } else {
          // Next episode
          this.currentEpisode++;
          if (this.currentEpisode < EPISODES.length) {
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
              this.cameras.main.fadeIn(500, 0, 0, 0);
              this.startEpisode();
            });
          }
        }
      }
    });
  }

  handleInput() {
    // If photo overlay is showing, only arrow buttons navigate — ignore general clicks
    if (this.photoOverlay.visible) {
      if (this._photoClickHandled) {
        this._photoClickHandled = false;
      }
      return;
    }

    // If animating, ignore
    if (this.isAnimating) return;

    // Save current state to history before advancing (only for dialogue, not actions)
    const episode = EPISODES[this.currentEpisode];
    if (episode && this.dialogueIndex < episode.dialogue.length) {
      const currentDialogue = episode.dialogue[this.dialogueIndex];
      if (currentDialogue.speaker && currentDialogue.text) {
        // This is a dialogue beat - save position for back navigation
        this.dialogueHistory.push({
          index: this.dialogueIndex,
          eneaX: this.enea.x,
          eneaY: this.enea.y,
          eneaVisible: this.enea.visible,
          eneaFlipX: this.enea.flipX,
          eneaExpectedX: this.eneaExpectedX,
          eloraX: this.elora.x,
          eloraY: this.elora.y,
          eloraVisible: this.elora.visible,
          eloraFlipX: this.elora.flipX,
          eloraExpectedX: this.eloraExpectedX
        });
      }
    }

    // Hide speech and advance dialogue
    this.hideSpeech();
    this.dialogueIndex++;
    this.processDialogue();
  }

  goBack() {
    // Can't go back while animating or during photo
    if (this.isAnimating || this.photoOverlay.visible) return;

    // Check if we have history to go back to
    if (this.dialogueHistory.length === 0) return;

    // Pop the last saved state
    const prevState = this.dialogueHistory.pop();

    // Hide current speech
    this.hideSpeech();

    // Restore character positions
    this.enea.setPosition(prevState.eneaX, prevState.eneaY);
    this.enea.setVisible(prevState.eneaVisible);
    this.enea.setFlipX(prevState.eneaFlipX);
    this.enea.stop();
    this.enea.setFrame(0);
    this.eneaExpectedX = prevState.eneaExpectedX;

    this.elora.setPosition(prevState.eloraX, prevState.eloraY);
    this.elora.setVisible(prevState.eloraVisible);
    this.elora.setFlipX(prevState.eloraFlipX);
    this.elora.stop();
    this.elora.setFrame(0);
    this.eloraExpectedX = prevState.eloraExpectedX;

    // Go back to previous dialogue
    this.dialogueIndex = prevState.index;
    this.processDialogue();
  }

  skipToEpisode(targetIndex) {
    // Clamp to valid range
    if (targetIndex < 0 || targetIndex >= EPISODES.length) return;

    // Stop all running tweens to prevent callbacks from old episode
    this.tweens.killAll();
    // Block input during transition (prevents global handleInput from firing)
    this.isAnimating = true;

    // Hide speech and photo overlays
    this.hideSpeech();
    this.photoOverlay.setVisible(false);
    this.locationCard.setVisible(false);

    // Apply all unlocks from episodes up to (but not including) the target
    this.hasElora = false;
    this.hasDog = false;
    this.hasBaby = false;
    for (let i = 0; i < targetIndex; i++) {
      const ep = EPISODES[i];
      if (ep.unlock === 'elora') this.hasElora = true;
      if (ep.unlock === 'dog') this.hasDog = true;
      if (ep.unlock === 'baby') this.hasBaby = true;
    }

    // Jump to the target episode
    this.currentEpisode = targetIndex;

    // Fade transition
    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.time.delayedCall(300, () => {
      this.cameras.main.fadeIn(300, 0, 0, 0);
      this.startEpisode();
    });
  }

  update() {
    // Very subtle background scrolling (slowed down)
    this.bgLayers.forEach(layer => {
      layer.sprite.tilePositionX += layer.speed * 0.02;
    });

    // Sync clothing overlays with base characters every frame
    this.syncClothingOverlay(this.enea, this.eneaClothes, this.currentEneaOutfit, 1);
    this.syncClothingOverlay(this.elora, this.eloraClothes, this.currentEloraOutfit, 1);
    // Sync shirt/pants/boots overlays (same depth offset as clothing - no overlap between them)
    this.syncClothingOverlay(this.enea, this.eneaShirt, this.currentEneaShirt, 1);
    this.syncClothingOverlay(this.enea, this.eneaPants, this.currentEneaPants, 1);
    this.syncClothingOverlay(this.enea, this.eneaBoots, this.currentEneaBoots, 1);
    // Sync hat overlays (depth +2 above base, so above clothing)
    this.syncClothingOverlay(this.enea, this.eneaHat, this.currentEneaHat, 2);
    this.syncClothingOverlay(this.elora, this.eloraHat, this.currentEloraHat, 2);

    // Debug overlay (toggle with D key)
    if (this.debugEnabled && this.debugText) {
      const e = this.enea;
      const el = this.elora;
      const tintStr = (obj) => obj.tintTopLeft ? `0x${obj.tintTopLeft.toString(16)}` : 'none';
      let lines = [
        `EP${EPISODES[this.currentEpisode]?.id || '?'} | DI:${this.dialogueIndex} | Anim:${this.isAnimating} | Tweens:${this.tweens.getTweens().length}`,
        `Enea:  vis=${e.visible} a=${e.alpha.toFixed(1)} pos=(${Math.round(e.x)},${Math.round(e.y)}) sc=${e.scale.toFixed(1)} dp=${e.depth} tint=${tintStr(e)}`,
        `Elora: vis=${el.visible} a=${el.alpha.toFixed(1)} pos=(${Math.round(el.x)},${Math.round(el.y)}) sc=${el.scale.toFixed(1)} dp=${el.depth} tint=${tintStr(el)}`,
      ];
      // Dog/Baby if visible
      if (this.dog && this.dog.visible) {
        lines.push(`Dog:   vis=true pos=(${Math.round(this.dog.x)},${Math.round(this.dog.y)}) sc=${this.dog.scale.toFixed(1)} dp=${this.dog.depth}`);
      }
      if (this.baby && this.baby.visible) {
        lines.push(`Baby:  vis=true pos=(${Math.round(this.baby.x)},${Math.round(this.baby.y)}) sc=${this.baby.scale.toFixed(1)}`);
      }
      // Scene state
      lines.push(`Photo: ${this.photoOverlay.visible ? `OPEN ${this.currentPhotoIndex + 1}/${this.currentPhotos.length}` : 'closed'} | Restaurant: ${this.restaurantElements ? `active (${this.restaurantElements.length} els)` : 'none'}`);
      // Outfits
      lines.push(`E outfit: ${this.currentEneaOutfit || '-'} shirt:${this.currentEneaShirt || '-'} pants:${this.currentEneaPants || '-'} boots:${this.currentEneaBoots || '-'} hat:${this.currentEneaHat || '-'}`);
      lines.push(`L outfit: ${this.currentEloraOutfit || '-'} hat:${this.currentEloraHat || '-'}`);
      // BG layers
      lines.push(`BG layers: ${this.bgLayers.length} | Speech: ${this.speechBubble.visible ? 'showing' : 'hidden'}`);
      // Cutlery state if restaurant active
      if (this.restaurantElements) {
        lines.push(`Fork: ${this.eloraCutleryFork ? `a=${this.eloraCutleryFork.alpha.toFixed(1)}` : 'gone'} | Knife: ${this.eloraCutleryKnife ? `a=${this.eloraCutleryKnife.alpha.toFixed(1)}` : 'gone'} | Napkin: ${this.eloraNapkin ? `a=${this.eloraNapkin.alpha.toFixed(1)}` : 'gone'}`);
      }
      this.debugText.setText(lines.join('\n'));
    }
  }
}
// Game Configuration
const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: 1280,
  height: 720,
  backgroundColor: '#0a0a0a',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [BootScene, TitleScene, GameScene, FinaleScene]
};

// Start the game
const game = new Phaser.Game(config);

// Test hooks for QA automation (Playwright integration)
if (typeof window !== 'undefined') {
  window.__GAME_STATE__ = {
    getScene: () => {
      const activeScenes = game.scene.getScenes(true);
      return activeScenes.length > 0 ? activeScenes[0].scene.key : null;
    },
    getEpisode: () => {
      const gameScene = game.scene.getScene('GameScene');
      return gameScene ? gameScene.currentEpisode : null;
    },
    getDialogueIndex: () => {
      const gameScene = game.scene.getScene('GameScene');
      return gameScene ? gameScene.dialogueIndex : null;
    },
    getFlags: () => {
      const gameScene = game.scene.getScene('GameScene');
      if (!gameScene) return { hasElora: false, hasDog: false, hasBaby: false };
      return {
        hasElora: gameScene.hasElora || false,
        hasDog: gameScene.hasDog || false,
        hasBaby: gameScene.hasBaby || false
      };
    },
    isAnimating: () => {
      const gameScene = game.scene.getScene('GameScene');
      return gameScene ? gameScene.isAnimating : false;
    }
  };
}

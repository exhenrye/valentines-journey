// ============================================================
// OUR JOURNEY - A Valentine's Day Game
// Built with Phaser 3
// ============================================================

import { EPISODES } from './data/episodes/index.js';
import BootScene from './scenes/BootScene.js';
import TitleScene from './scenes/TitleScene.js';
import FinaleScene from './scenes/FinaleScene.js';
import { ACTION_HANDLERS } from './actions/index.js';
import {
  createHeartGraphic, createPixelPlane,
  createBlushEffect, clearBlushEffect, createHeartFlutterEffect,
  createEmbarrassedEffect, createHearts
} from './effects/VisualEffects.js';
import PhotoOverlay from './ui/PhotoOverlay.js';
import BackgroundManager from './managers/BackgroundManager.js';
import CharacterManager from './managers/CharacterManager.js';

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
    this.isAnimating = false;
    this.dialogueHistory = [];
  }

  // Backward compat getter for action handlers that access scene.bgLayers directly
  get bgLayers() { return this.backgroundManager ? this.backgroundManager.layers : []; }

  create() {
    // Use game config dimensions directly - more reliable than camera dimensions
    const width = this.sys.game.config.width;
    const height = this.sys.game.config.height;

    this.width = width;
    this.height = height;

    // Background manager
    this.backgroundManager = new BackgroundManager(this);

    // Character manager — owns all character sprites, outfits, companions
    this.characterManager = new CharacterManager(this);
    this.characterManager.createAll();

    // Proxy getters so action handlers can use scene.enea, scene.hasElora, etc.
    ['enea', 'elora', 'dog', 'cat1', 'cat2', 'horse', 'baby'].forEach(key => {
      Object.defineProperty(this, key, {
        get() { return this.characterManager[key]; },
        configurable: true,
      });
    });
    ['hasElora', 'hasDog', 'hasBaby', 'hasCats', 'hasHorse',
      'groundY', 'dogGroundY', 'eneaExpectedX', 'eloraExpectedX',
    ].forEach(key => {
      Object.defineProperty(this, key, {
        get() { return this.characterManager[key]; },
        set(v) { this.characterManager[key] = v; },
        configurable: true,
      });
    });

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
    this.plane = createPixelPlane(this);
    this.plane.setPosition(-100, height * 0.3);
    this.plane.setVisible(false);

    // Hearts container for explosion
    this.heartsContainer = this.add.container(0, 0);

    // Photo moment overlay
    this.photoOverlay = new PhotoOverlay(this);

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
    this.backgroundManager.load(episode.background);

    // Reset all character positions, outfits, and companion flags
    this.characterManager.resetForEpisode(episode);

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
    this.backgroundManager.clear();
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
    const cm = this.characterManager;
    cm.currentEneaOutfit = 'male-chainmail';
    cm.eneaClothes.setTexture('male-chainmail');
    // No hats/shirt/pants/boots at dinner (chainmail covers everything)
    cm.currentEneaHat = null;
    cm.currentEneaShirt = null;
    cm.currentEneaPants = null;
    cm.currentEneaBoots = null;

    this.elora.setPosition(eloraDinnerX, seatY);
    this.elora.setScale(dinnerScale);
    this.elora.setFlipX(false); // Face left (toward Enea)
    this.elora.setVisible(true);
    this.elora.stop();
    this.elora.setFrame(0);
    this.elora.setDepth(100);   // Behind table (110)
    // Dinner outfit: fancy blue dress
    cm.currentEloraOutfit = 'female-fancy-blue';
    cm.eloraClothes.setTexture('female-fancy-blue');
    cm.currentEloraHat = null; // No hats at dinner
    this.eloraExpectedX = eloraDinnerX;

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
    if (episode) this.characterManager.applyOutfits(episode.outfits);
    this.eloraCutleryFork = null;
    this.eloraCutleryKnife = null;
    this.eloraNapkin = null;
  }

  walkTogether(callback) {
    this.characterManager.walkTogether(callback);
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
      createBlushEffect(this);
    } else if (effect === 'heart-flutter') {
      createHeartFlutterEffect(this);
    } else if (effect === 'embarrassed') {
      createEmbarrassedEffect(this);
    }

    this.continuePrompt.setVisible(true);
    // Show back button if we have dialogue history
    this.backButton.setVisible(this.dialogueHistory.length > 0);
    this.isAnimating = false;
  }

  hideSpeech() {
    this.speechBubble.setVisible(false);
    this.continuePrompt.setVisible(false);
    this.backButton.setVisible(false);
    clearBlushEffect(this);
  }

  showPhoto() {
    const episode = EPISODES[this.currentEpisode];

    this.hideSpeech();

    // Handle unlock
    if (episode.unlock === 'elora') this.hasElora = true;
    if (episode.unlock === 'dog') this.hasDog = true;
    if (episode.unlock === 'baby') this.hasBaby = true;

    this.photoOverlay.show(episode, () => {
      // Episode progression after photo closes
      const hasFinale = episode.dialogue.some(d => d.action === 'finale');

      if (hasFinale) {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.time.delayedCall(1000, () => {
          this.scene.start('FinaleScene');
        });
      } else {
        this.currentEpisode++;
        if (this.currentEpisode < EPISODES.length) {
          this.cameras.main.fadeOut(500, 0, 0, 0);
          this.time.delayedCall(500, () => {
            this.cameras.main.fadeIn(500, 0, 0, 0);
            this.startEpisode();
          });
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
          eloraExpectedX: this.eloraExpectedX,
          dogVisible: this.dog.visible,
          dogX: this.dog.x,
          dogY: this.dog.y,
          cat1Visible: this.cat1.visible,
          cat1X: this.cat1.x,
          cat2Visible: this.cat2.visible,
          cat2X: this.cat2.x,
          horseVisible: this.horse.visible,
          horseX: this.horse.x,
          babyVisible: this.baby.visible,
          babyX: this.baby.x,
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

    // Restore companion state
    this.dog.setPosition(prevState.dogX, prevState.dogY);
    this.dog.setVisible(prevState.dogVisible);
    this.cat1.setPosition(prevState.cat1X, this.cat1.y);
    this.cat1.setVisible(prevState.cat1Visible);
    this.cat2.setPosition(prevState.cat2X, this.cat2.y);
    this.cat2.setVisible(prevState.cat2Visible);
    this.horse.setPosition(prevState.horseX, this.horse.y);
    this.horse.setVisible(prevState.horseVisible);
    this.baby.setPosition(prevState.babyX, this.baby.y);
    this.baby.setVisible(prevState.babyVisible);

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
    this.backgroundManager.update();

    // Sync clothing overlays with base characters every frame
    this.characterManager.syncClothing();

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
      lines.push(`Photo: ${this.photoOverlay.visible ? `OPEN ${this.photoOverlay.currentPhotoIndex + 1}/${this.photoOverlay.currentPhotos.length}` : 'closed'} | Restaurant: ${this.restaurantElements ? `active (${this.restaurantElements.length} els)` : 'none'}`);
      // Outfits
      const cm = this.characterManager;
      lines.push(`E outfit: ${cm.currentEneaOutfit || '-'} shirt:${cm.currentEneaShirt || '-'} pants:${cm.currentEneaPants || '-'} boots:${cm.currentEneaBoots || '-'} hat:${cm.currentEneaHat || '-'}`);
      lines.push(`L outfit: ${cm.currentEloraOutfit || '-'} hat:${cm.currentEloraHat || '-'}`);
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
      const cm = gameScene?.characterManager;
      if (!cm) return { hasElora: false, hasDog: false, hasBaby: false, hasCats: false, hasHorse: false };
      return {
        hasElora: cm.hasElora || false,
        hasDog: cm.hasDog || false,
        hasBaby: cm.hasBaby || false,
        hasCats: cm.hasCats || false,
        hasHorse: cm.hasHorse || false,
      };
    },
    isAnimating: () => {
      const gameScene = game.scene.getScene('GameScene');
      return gameScene ? gameScene.isAnimating : false;
    }
  };
}

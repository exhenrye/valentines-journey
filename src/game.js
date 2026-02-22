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
import SpeechBubble from './ui/SpeechBubble.js';
import GameUI from './ui/GameUI.js';
import BackgroundManager from './managers/BackgroundManager.js';
import CharacterManager from './managers/CharacterManager.js';
import RestaurantScene from './restaurant/RestaurantScene.js';
import { applyUnlocksUpTo, applyCurrentUnlock } from './utils/progression.js';

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

    // Restaurant scene manager
    this.restaurant = new RestaurantScene(this);

    // Game UI — episode indicator, location card, prompts, back button
    this.gameUI = new GameUI(this, {
      onSkipEpisode: (delta) => this.skipToEpisode(this.currentEpisode + delta),
      onGoBack: () => this.goBack(),
    });

    // Speech bubble
    this.speechBubble = new SpeechBubble(this);
    this.speechBubble.addToContainer(this.gameUI.container);

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
    this.gameUI.updateEpisodeIndicator(episode.id, EPISODES.length, this.currentEpisode);

    // Clean up restaurant scene if it was active
    this.cleanupRestaurant();

    // Load background
    this.backgroundManager.load(episode.background);

    // Reset all character positions, outfits, and companion flags
    this.characterManager.resetForEpisode(episode);

    // Block input during location card display
    this.isAnimating = true;

    // Show location card with animated reveal
    this.gameUI.showLocationCard(episode.name, episode.date, () => {
      this.isAnimating = false;
      this.processDialogue();
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
    this.restaurant.setup();
  }

  cleanupRestaurant() {
    this.restaurant.cleanup();
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
        this.enea.setFlipX(true);
        this.elora.setFlipX(false);
      } else {
        this.enea.setFlipX(false);
        this.elora.setFlipX(true);
      }
    }

    // Resolve character position with fallbacks
    let charX = char.x;
    if (charX < 100) {
      charX = isEnea
        ? (this.eneaExpectedX || this.width * 0.7)
        : (this.eloraExpectedX || this.width * 0.35);
    }

    this.speechBubble.show(name, text, charX, char.y, this.width);

    // Trigger speech effects
    if (effect === 'blush') createBlushEffect(this);
    else if (effect === 'heart-flutter') createHeartFlutterEffect(this);
    else if (effect === 'embarrassed') createEmbarrassedEffect(this);

    this.gameUI.showContinuePrompt(this.dialogueHistory.length > 0);
    this.isAnimating = false;
  }

  hideSpeech() {
    this.speechBubble.hide();
    this.gameUI.hidePrompts();
    clearBlushEffect(this);
  }

  showPhoto() {
    const episode = EPISODES[this.currentEpisode];

    this.hideSpeech();

    // Handle unlock
    applyCurrentUnlock(this, episode);

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
          ...this.characterManager.getState(),
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

    // Restore character and companion state
    this.characterManager.restoreState(prevState);

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
    this.gameUI.hideLocationCard();

    // Apply all unlocks from episodes up to (but not including) the target
    applyUnlocksUpTo(this, targetIndex);

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
      const rest = this.restaurant;
      lines.push(`Photo: ${this.photoOverlay.visible ? `OPEN ${this.photoOverlay.currentPhotoIndex + 1}/${this.photoOverlay.currentPhotos.length}` : 'closed'} | Restaurant: ${rest.isActive ? `active (${rest.elements.length} els)` : 'none'}`);
      // Outfits
      const cm = this.characterManager;
      lines.push(`E outfit: ${cm.currentEneaOutfit || '-'} shirt:${cm.currentEneaShirt || '-'} pants:${cm.currentEneaPants || '-'} boots:${cm.currentEneaBoots || '-'} hat:${cm.currentEneaHat || '-'}`);
      lines.push(`L outfit: ${cm.currentEloraOutfit || '-'} hat:${cm.currentEloraHat || '-'}`);
      // BG layers
      lines.push(`BG layers: ${this.bgLayers.length} | Speech: ${this.speechBubble.visible ? 'showing' : 'hidden'}`);
      // Cutlery state if restaurant active
      if (rest.isActive) {
        lines.push(`Fork: ${rest.eloraCutleryFork ? `a=${rest.eloraCutleryFork.alpha.toFixed(1)}` : 'gone'} | Knife: ${rest.eloraCutleryKnife ? `a=${rest.eloraCutleryKnife.alpha.toFixed(1)}` : 'gone'} | Napkin: ${rest.eloraNapkin ? `a=${rest.eloraNapkin.alpha.toFixed(1)}` : 'gone'}`);
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

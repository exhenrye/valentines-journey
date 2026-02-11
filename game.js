// ============================================================
// OUR JOURNEY - A Valentine's Day Game
// Built with Phaser 3
// ============================================================

// Episode Data
const EPISODES = [
  {
    id: 1,
    name: "Madrid",
    date: "October 20, 2017",
    background: "town-night",
    icon: "🌹",
    caption: "Your phone died. We almost didn't find each other. But somehow, in the crowd of Serrano, we did. Thigh-high boots, a cream dress, and the most beautiful woman I'd ever seen.",
    noPhoto: true,
    dialogue: [
      { action: 'enea-wait-right' },
      { speaker: 'enea', text: "She's not coming... her phone must have died." },
      { action: 'elora-enter-left' },
      { action: 'pause-beat', duration: 800 },
      { speaker: 'elora', text: "Enea? I'm so sorry—my phone died!" },
      { speaker: 'enea', text: "You came. You actually came.", effect: 'blush' },
      { speaker: 'elora', text: "Of course I did. Now... where are you taking me?" },
      { speaker: 'enea', text: "Tacos and margaritas?" },
      { action: 'look-at-each-other', duration: 1200 },
      { action: 'walk-together-right' },
      { action: 'pause-before-exit', duration: 600 },
      { action: 'exit-right' },
      { action: 'next-episode' }
    ],
    unlock: 'elora'
  },
  {
    id: 2,
    name: "Granada",
    date: "December 21-23, 2017",
    background: "town-sunset",
    icon: "🏰",
    caption: "Our first real adventure together. Wandering the Alhambra, getting lost in narrow streets, realizing I never wanted to travel without you again.",
    photos: [
      'assets/photos/02-granada/kiss-selfie.jpg',
      'assets/photos/02-granada/couple-selfie.jpg',
      'assets/photos/02-granada/alhambra.jpg',
      'assets/photos/02-granada/elora-posing.jpg'
    ],
    dialogue: [
      { action: 'walk-together-start' },
      { speaker: 'elora', text: "I can't believe we're actually here! The Alhambra!" },
      { speaker: 'enea', text: "Worth every minute of that drive." },
      { action: 'walk-together' },
      { action: 'pause-beat', duration: 600 },
      { speaker: 'elora', text: "Wait! I need to vlog this! Hold on..." },
      { speaker: 'enea', text: "I hate selfie sticks... but watching her this happy? I'd hold a hundred of them.", effect: 'heart-flutter' },
      { speaker: 'elora', text: "And THIS is the famous Alhambra! Look at those arches!" },
      { action: 'walk-together' },
      { action: 'restaurant-scene' },
      { speaker: 'enea', text: "This restaurant is incredible. Very fancy." },
      { speaker: 'elora', text: "Oh no! My napkin... and the fork... I'm so sorry!", effect: 'embarrassed' },
      { speaker: 'enea', text: "Hey... you're the most elegant woman in here. Even when you're juggling silverware." },
      { speaker: 'elora', text: "You always know what to say.", effect: 'blush' },
      { action: 'look-at-each-other', duration: 1000 },
      { speaker: 'elora', text: "Promise me we'll always travel together." },
      { speaker: 'enea', text: "Always. Every adventure, every road trip, every awkward dinner... with you." },
      { action: 'photo' }
    ]
  },
  {
    id: 3,
    name: "Leavenworth",
    date: "October 2018",
    background: "town-sunset",
    icon: "✈️",
    caption: "We were an ocean apart. On our anniversary, I surprised you—flew across the world just to see your face. Every mile was worth it.",
    dialogue: [
      { speaker: 'elora', text: "I miss him so much today...", action: 'elora-alone' },
      { action: 'plane' },
      { speaker: 'enea', text: "Surprise, amore.", action: 'enea-enter' },
      { speaker: 'elora', text: "ENEA?! You flew all this way?!" },
      { speaker: 'enea', text: "I'd fly anywhere for you. Happy anniversary." },
      { action: 'hearts' },
      { action: 'photo' }
    ]
  },
  {
    id: 4,
    name: "Geneva",
    date: "2019",
    background: "mountains",
    icon: "⛰️",
    caption: "You left everything—your country, your family, your comfort—to build a life with me. The courage that took still amazes me. You chose us.",
    dialogue: [
      { speaker: 'enea', text: "She's really doing this. She's coming.", action: 'enea-alone' },
      { action: 'plane' },
      { speaker: 'enea', text: "You're here. You're really here.", action: 'elora-enter' },
      { speaker: 'elora', text: "I left everything... but I found everything too." },
      { speaker: 'enea', text: "We're going to build something beautiful." },
      { action: 'photo' }
    ]
  },
  {
    id: 5,
    name: "Totoro",
    date: "2019",
    background: "town-day",
    icon: "♡",
    caption: "Our first baby. That little bull terrier made us a family. He taught us how to love something together.",
    dialogue: [
      { action: 'walk-together-start' },
      { speaker: 'elora', text: "Look at that little face..." },
      { speaker: 'enea', text: "He's the one. I can feel it." },
      { action: 'dog-join' },
      { speaker: 'elora', text: "Welcome to the family, Totoro!" },
      { action: 'walk-together' },
      { action: 'photo' }
    ],
    unlock: 'dog'
  },
  {
    id: 6,
    name: "Route de Chêne",
    date: "2020",
    background: "town-day",
    icon: "♡",
    caption: "Our first home. Just us, our animals, and a pandemic. We weathered the storm together. I'd do it all again with you.",
    dialogue: [
      { action: 'walk-together-start' },
      { speaker: 'enea', text: "Our very first home." },
      { speaker: 'elora', text: "Just us, Totoro, and... whatever 2020 throws at us." },
      { speaker: 'enea', text: "We'll get through it together. We always do." },
      { action: 'photo' }
    ]
  },
  {
    id: 7,
    name: "The Proposal",
    date: "May 3, 2022",
    background: "sunset",
    icon: "♡",
    caption: "I asked you to be mine forever. You said yes. The happiest moment of my life—until you kept topping it.",
    dialogue: [
      { action: 'face-each-other' },
      { speaker: 'enea', text: "Elora... there's something I need to ask you." },
      { speaker: 'elora', text: "Enea? What's going on?" },
      { speaker: 'enea', text: "Will you marry me?", action: 'kneel' },
      { speaker: 'elora', text: "YES! A thousand times yes!" },
      { action: 'hearts' },
      { action: 'photo' }
    ]
  },
  {
    id: 8,
    name: "Pignora",
    date: "August 13, 2022",
    background: "forest",
    icon: "♡",
    caption: "Surrounded by everyone we love. You walked toward me and I couldn't breathe. The day you became my wife.",
    dialogue: [
      { speaker: 'enea', text: "She's so beautiful... I can't breathe.", action: 'wedding-setup' },
      { action: 'elora-walk-aisle' },
      { speaker: 'elora', text: "I do." },
      { speaker: 'enea', text: "I do. Forever." },
      { action: 'hearts' },
      { action: 'photo' }
    ]
  },
  {
    id: 9,
    name: "Seattle",
    date: "2022-2023",
    background: "city-night",
    icon: "♡",
    caption: "A new continent. A new chapter. We packed our life into suitcases and started over. Because we're braver together.",
    dialogue: [
      { action: 'plane' },
      { action: 'family-arrive' },
      { speaker: 'elora', text: "A whole new continent. A whole new life." },
      { speaker: 'enea', text: "Together. Always together." },
      { action: 'walk-together' },
      { action: 'photo' }
    ]
  },
  {
    id: 10,
    name: "Matthews Beach",
    date: "May 2025",
    background: "town-day",
    icon: "♡",
    caption: "A house with a backyard. Rome in the field. This isn't just where we live—it's where we're building our forever.",
    dialogue: [
      { action: 'walk-together-start' },
      { speaker: 'elora', text: "Our own house. With a backyard for Totoro." },
      { speaker: 'enea', text: "This is where we build our forever." },
      { action: 'photo' }
    ]
  },
  {
    id: 11,
    name: "Theo",
    date: "July 28, 2025",
    background: "town-sunset",
    icon: "♡",
    caption: "The most perfect little boy arrived. You made me a father. You made us complete. I didn't know my heart could hold this much love.",
    dialogue: [
      { action: 'face-each-other' },
      { speaker: 'elora', text: "He's here. Our baby is here." },
      { action: 'baby-arrive' },
      { speaker: 'enea', text: "Hello, Theo. I'm your dad." },
      { speaker: 'elora', text: "Our family is complete." },
      { action: 'hearts' },
      { action: 'photo' }
    ],
    unlock: 'baby'
  },
  {
    id: 12,
    name: "2026 & Beyond",
    date: "Valentine's Day",
    background: "sunset-purple",
    icon: "♡",
    caption: "From a Tinder match in Madrid to a family in Seattle. I'm the luckiest man alive. Here's to forever, my love.",
    dialogue: [
      { action: 'family-together' },
      { speaker: 'enea', text: "Look how far we've come." },
      { speaker: 'elora', text: "From Madrid to here. Our little family." },
      { action: 'walk-together' },
      { speaker: 'enea', text: "Here's to forever, my love." },
      { action: 'hearts' },
      { action: 'photo' },
      { action: 'finale' }
    ]
  }
];

// Background configurations
const BACKGROUNDS = {
  'city-night': {
    layers: [
      { key: 'city1', speed: 0.1 },
      { key: 'city2', speed: 0.2 },
      { key: 'city3', speed: 0.35 },
      { key: 'city4', speed: 0.5 },
      { key: 'city5', speed: 0.7 },
      { key: 'city6', speed: 1.0 }
    ]
  },
  'forest': {
    layers: [
      { key: 'forest1', speed: 0.2 },
      { key: 'forest2', speed: 0.5 },
      { key: 'forest3', speed: 1.0 }
    ]
  },
  'town-sunset': {
    layers: [
      { key: 'town-sunset1', speed: 0.1 },
      { key: 'town-sunset5', speed: 0.4 },
      { key: 'town-sunset9', speed: 1.0 }
    ]
  },
  'town-day': {
    layers: [
      { key: 'town-day1', speed: 0.1 },
      { key: 'town-day5', speed: 0.4 },
      { key: 'town-day9', speed: 1.0 }
    ]
  },
  'town-night': {
    layers: [
      { key: 'town-night1', speed: 0.05 },
      { key: 'town-night3', speed: 0.15 },
      { key: 'town-night5', speed: 0.35 },
      { key: 'town-night7', speed: 0.6 },
      { key: 'town-night9', speed: 1.0 }
    ]
  },
  'mountains': {
    layers: [
      { key: 'mtn-sky', speed: 0.05 },
      { key: 'mtn-far', speed: 0.2 },
      { key: 'mtn-mid', speed: 0.4 },
      { key: 'mtn-trees', speed: 1.0 }
    ]
  },
  'sunset': {
    layers: [
      { key: 'sunset1', speed: 0.1 },
      { key: 'sunset2', speed: 0.3 },
      { key: 'sunset3', speed: 0.6 },
      { key: 'sunset4', speed: 1.0 }
    ]
  },
  'sunset-purple': {
    layers: [
      { key: 'purple1', speed: 0.1 },
      { key: 'purple2', speed: 0.3 },
      { key: 'purple3', speed: 0.6 },
      { key: 'purple4', speed: 1.0 }
    ]
  }
};

// ============================================================
// BOOT SCENE - Load all assets
// ============================================================
class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Show loading bar
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

    const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
      font: '20px Lato',
      fill: '#ffffff'
    }).setOrigin(0.5);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xe57373, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    // Load character sprites
    this.load.spritesheet('male', 'assets/chars/male.png', {
      frameWidth: 100,
      frameHeight: 64
    });
    this.load.spritesheet('female', 'assets/chars/female.png', {
      frameWidth: 100,
      frameHeight: 64
    });

    // Load city-night backgrounds
    this.load.image('city1', 'assets/backgrounds/city-night/PixelcityFullHD02_layer01.png');
    this.load.image('city2', 'assets/backgrounds/city-night/PixelcityFullHD02_layer02.png');
    this.load.image('city3', 'assets/backgrounds/city-night/PixelcityFullHD02_layer03.png');
    this.load.image('city4', 'assets/backgrounds/city-night/PixelcityFullHD02_layer04.png');
    this.load.image('city5', 'assets/backgrounds/city-night/PixelcityFullHD02_layer05.png');
    this.load.image('city6', 'assets/backgrounds/city-night/PixelcityFullHD02_layer06.png');

    // Load forest backgrounds
    this.load.image('forest1', 'assets/backgrounds/forest-oak/background_layer_1.png');
    this.load.image('forest2', 'assets/backgrounds/forest-oak/background_layer_2.png');
    this.load.image('forest3', 'assets/backgrounds/forest-oak/background_layer_3.png');

    // Load town-sunset backgrounds
    this.load.image('town-sunset1', 'assets/backgrounds/town-sunset/PixelTown_Sunset_layer01.png');
    this.load.image('town-sunset5', 'assets/backgrounds/town-sunset/PixelTown_Sunset_layer05.png');
    this.load.image('town-sunset9', 'assets/backgrounds/town-sunset/PixelTown_Sunset_layer09.png');

    // Load town-day backgrounds
    this.load.image('town-day1', 'assets/backgrounds/town-day/PixelTown_Day_layer01.png');
    this.load.image('town-day5', 'assets/backgrounds/town-day/PixelTown_Day_layer05.png');
    this.load.image('town-day9', 'assets/backgrounds/town-day/PixelTown_Day_layer09.png');

    // Load town-night backgrounds (for Madrid)
    this.load.image('town-night1', 'assets/backgrounds/town/Pixel Town - Parallax Background 1.2/Night/PixelTown_Night_layer01.png');
    this.load.image('town-night3', 'assets/backgrounds/town/Pixel Town - Parallax Background 1.2/Night/PixelTown_Night_layer03.png');
    this.load.image('town-night5', 'assets/backgrounds/town/Pixel Town - Parallax Background 1.2/Night/PixelTown_Night_layer05.png');
    this.load.image('town-night7', 'assets/backgrounds/town/Pixel Town - Parallax Background 1.2/Night/PixelTown_Night_layer07.png');
    this.load.image('town-night9', 'assets/backgrounds/town/Pixel Town - Parallax Background 1.2/Night/PixelTown_Night_layer09.png');

    // Load mountain backgrounds
    this.load.image('mtn-sky', 'assets/backgrounds/mountains-dusk/sky.png');
    this.load.image('mtn-far', 'assets/backgrounds/mountains-dusk/far-mountains.png');
    this.load.image('mtn-mid', 'assets/backgrounds/mountains-dusk/mountains.png');
    this.load.image('mtn-trees', 'assets/backgrounds/mountains-dusk/trees.png');

    // Load sunset backgrounds
    this.load.image('sunset1', 'assets/backgrounds/sunset-orange/01_SkyOrange.png');
    this.load.image('sunset2', 'assets/backgrounds/sunset-orange/02_SkysunsetOrange.png');
    this.load.image('sunset3', 'assets/backgrounds/sunset-orange/03_WaterOrange.png');
    this.load.image('sunset4', 'assets/backgrounds/sunset-orange/04_PalmsOrange.png');

    // Load purple sunset backgrounds
    this.load.image('purple1', 'assets/backgrounds/sunset-purple/01_SkyPurple.png');
    this.load.image('purple2', 'assets/backgrounds/sunset-purple/02_SkysunsetPurple.png');
    this.load.image('purple3', 'assets/backgrounds/sunset-purple/03_WaterPurple.png');
    this.load.image('purple4', 'assets/backgrounds/sunset-purple/04_PalmsPurple.png');

    // Load dog sprite sheet (Totoro)
    this.load.spritesheet('dog', 'assets/characters/GandalfHardcore Pet companion/GandalfHardcore doggy sheet.png', {
      frameWidth: 24,
      frameHeight: 32
    });

    // Load restaurant / interior assets
    this.load.image('wallpaper-tile', 'assets/backgrounds/interior/House/Wallpaper5_Tile.png');
    this.load.image('floor-tile', 'assets/backgrounds/interior/House/Platform_Middle.png');
    this.load.image('table-single', 'assets/backgrounds/interior/Furniture/Table_Single.png');
    this.load.image('chair', 'assets/backgrounds/interior/Furniture/Chair.png');
    this.load.image('candle', 'assets/backgrounds/interior/Furniture/Candle.png');
    this.load.image('painting-lg', 'assets/backgrounds/interior/Furniture/Painting_Large.png');
    this.load.image('painting-sm', 'assets/backgrounds/interior/Furniture/Painting_Small.png');
    this.load.image('plant', 'assets/backgrounds/interior/Furniture/Plant.png');
    this.load.image('floor-lamp', 'assets/backgrounds/interior/Furniture/FloorLamp.png');
    this.load.image('ceiling-lamp-top', 'assets/backgrounds/interior/Furniture/CeilingLamp_Top.png');
    this.load.image('ceiling-lamp-mid', 'assets/backgrounds/interior/Furniture/CeilingLamp_Mid.png');
    this.load.image('ceiling-lamp-btm', 'assets/backgrounds/interior/Furniture/CeilingLamp_Bottom.png');

    // Load episode photos dynamically
    EPISODES.forEach(episode => {
      if (episode.photos) {
        episode.photos.forEach((photoPath, index) => {
          const key = `photo-${episode.id}-${index}`;
          this.load.image(key, photoPath);
        });
      }
    });
  }

  create() {
    // Create character animations
    // Sprite sheet layout: Row 0 = idle (5 frames), Row 2 = walk right (8 frames)
    // Each row has 8 columns, so row 2 starts at frame 16

    this.anims.create({
      key: 'male-walk',
      frames: this.anims.generateFrameNumbers('male', { start: 16, end: 23 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'male-idle',
      frames: this.anims.generateFrameNumbers('male', { start: 0, end: 4 }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: 'female-walk',
      frames: this.anims.generateFrameNumbers('female', { start: 16, end: 23 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'female-idle',
      frames: this.anims.generateFrameNumbers('female', { start: 0, end: 4 }),
      frameRate: 6,
      repeat: -1
    });

    // Dog animations (sprite sheet: 8 columns x 2 rows, 24x32 per frame)
    // Row 0 (frames 0-7): walk animation
    this.anims.create({
      key: 'dog-walk',
      frames: this.anims.generateFrameNumbers('dog', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    // Go to title scene
    this.scene.start('TitleScene');
  }
}

// ============================================================
// TITLE SCENE - Animated title screen
// ============================================================
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
      const heart = this.createHeart(heartX, heartY, 24, 0xe57373);

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

  createHeart(x, y, size, color) {
    const graphics = this.add.graphics();
    graphics.fillStyle(color, 1);
    // Draw heart using two circles and a triangle (Phaser 3 compatible)
    const r = size * 0.5; // radius for the bumps
    // Left bump
    graphics.fillCircle(-r * 0.5, -r * 0.3, r);
    // Right bump
    graphics.fillCircle(r * 0.5, -r * 0.3, r);
    // Bottom triangle
    graphics.fillTriangle(-size, -r * 0.3, size, -r * 0.3, 0, size * 1.2);
    graphics.setPosition(x, y);
    return graphics;
  }
}

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
    this.elora.setFrame(0); // Static frame, no animation

    // Dog sprite (Totoro - hidden initially)
    this.dog = this.add.sprite(width * 0.2, this.groundY, 'dog')
      .setScale(3)
      .setOrigin(0.5, 1)
      .setDepth(100)
      .setVisible(false);
    this.dog.setFrame(0);

    // Baby placeholder (simple drawn shape, hidden initially)
    this.baby = this.add.graphics();
    this.baby.fillStyle(0xFFDDBB, 1); // Skin tone
    this.baby.fillCircle(0, 0, 12); // Head
    this.baby.fillStyle(0xFFB6C1, 1); // Pink for clothes
    this.baby.fillCircle(0, 18, 10); // Body
    this.baby.setPosition(width * 0.5, this.groundY - 80);
    this.baby.setVisible(false).setDepth(100);

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

    // Plane for flying animation
    this.plane = this.add.text(-100, height * 0.3, '✈️', {
      fontSize: '64px'
    }).setVisible(false);

    // Hearts container for explosion
    this.heartsContainer = this.add.container(0, 0);

    // Photo moment overlay
    this.photoOverlay = this.add.container(0, 0);
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
    this.enea.setScale(3); // Reset scale (kneeling changes it)

    this.elora.setVisible(false);
    this.elora.setPosition(this.width * 0.5, this.groundY);
    this.elora.stop();
    this.elora.setFrame(0);

    this.dog.setVisible(false);
    this.dog.setPosition(this.width * 0.2, this.groundY);
    this.dog.stop();
    this.dog.setFrame(0);

    this.baby.setVisible(false);

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

    switch (action) {
      case 'wait':
        this.showSpeech(dialogue.speaker, dialogue.text);
        break;

      // === EPISODE 1: MADRID ACTIONS ===
      case 'enea-wait-right':
        // Explicitly position Enea at 70% width, facing left
        const waitRightX = this.width * 0.7;
        this.enea.setPosition(waitRightX, this.groundY);
        this.enea.setFlipX(true); // Face left toward where Elora will appear
        this.enea.setVisible(true);
        this.enea.setAlpha(1);
        this.enea.stop();
        this.enea.setFrame(0);
        this.eneaExpectedX = waitRightX;

        this.isAnimating = false;
        this.dialogueIndex++;
        this.time.delayedCall(50, () => {
          this.processDialogue();
        });
        break;

      case 'elora-enter-left':
        // Elora enters from the left, walking right toward Enea
        // Per storyboard: walks from -100 to width * 0.35, facing right
        this.hasElora = true;
        const eloraTargetX = this.width * 0.35;
        this.elora.setPosition(-100, this.groundY);
        this.elora.setVisible(true);
        this.elora.setFlipX(true); // Face right (walking direction)
        this.elora.play('female-walk');

        // Store expected position for speech bubble
        this.eloraExpectedX = eloraTargetX;

        this.tweens.add({
          targets: this.elora,
          x: eloraTargetX,
          duration: 2500,
          ease: 'Linear',
          onComplete: () => {
            this.elora.stop();
            this.elora.setFrame(0);
            this.elora.setFlipX(true); // Face right toward Enea
            this.isAnimating = false;
            this.dialogueIndex++;
            this.processDialogue();
          }
        });
        break;

      case 'pause-beat':
        // Dramatic pause - no interaction, just wait
        const pauseDuration = dialogue.duration || 800;
        this.time.delayedCall(pauseDuration, () => {
          this.isAnimating = false;
          this.dialogueIndex++;
          this.processDialogue();
        });
        break;

      case 'look-at-each-other':
        // Romantic pause with heart floating up
        const lookDuration = dialogue.duration || 1200;

        // Use expected positions as fallback
        const lookEneaX = this.enea.x > 100 ? this.enea.x : (this.eneaExpectedX || this.width * 0.7);
        const lookEloraX = this.elora.x > 100 ? this.elora.x : (this.eloraExpectedX || this.width * 0.35);

        // Create a drawn heart that floats up between them
        const heartX = (lookEneaX + lookEloraX) / 2;
        const heartY = this.groundY - 100;
        const floatingHeart = this.createHeartGraphic(heartX, heartY, 20, 0xe57373);
        floatingHeart.setAlpha(0).setDepth(150);

        // Fade in and float up
        this.tweens.add({
          targets: floatingHeart,
          alpha: 1,
          y: heartY - 60,
          duration: lookDuration * 0.7,
          ease: 'Sine.easeOut',
          onComplete: () => {
            // Fade out
            this.tweens.add({
              targets: floatingHeart,
              alpha: 0,
              y: heartY - 80,
              duration: lookDuration * 0.3,
              ease: 'Sine.easeIn',
              onComplete: () => {
                floatingHeart.destroy();
                this.isAnimating = false;
                this.dialogueIndex++;
                this.processDialogue();
              }
            });
          }
        });
        break;

      case 'pause-before-exit':
        // Brief stop before exiting - characters stop walking
        const exitPauseDuration = dialogue.duration || 600;
        this.enea.stop();
        this.enea.setFrame(0);
        this.elora.stop();
        this.elora.setFrame(0);

        this.time.delayedCall(exitPauseDuration, () => {
          this.isAnimating = false;
          this.dialogueIndex++;
          this.processDialogue();
        });
        break;

      case 'walk-together-right':
        // Both face right and walk together
        // Keep characters mostly stationary, scroll background to create movement illusion
        this.enea.setFlipX(true); // Flip to face right
        this.elora.setFlipX(true); // Flip to face right
        this.enea.play('male-walk');
        this.elora.play('female-walk');

        // Position characters in center of screen (they "walk in place" while world moves)
        this.enea.setPosition(this.width * 0.55, this.groundY);
        this.elora.setPosition(this.width * 0.45, this.groundY);

        // Scroll background to create walking illusion (slower, more comfortable)
        this.tweens.add({
          targets: { val: 0 },
          val: 1,
          duration: 3000,
          onUpdate: () => {
            this.bgLayers.forEach(layer => {
              layer.sprite.tilePositionX += layer.speed * 2;
            });
          },
          onComplete: () => {
            this.enea.stop();
            this.enea.setFrame(0);
            this.elora.stop();
            this.elora.setFrame(0);
            this.isAnimating = false;
            this.dialogueIndex++;
            this.processDialogue();
          }
        });
        break;

      case 'exit-right':
        // Both walk and exit to the right
        // Sprites naturally face LEFT, so flip to face RIGHT
        this.enea.setFlipX(true);
        this.elora.setFlipX(true);
        this.enea.play('male-walk');
        this.elora.play('female-walk');

        // Continue scrolling background (slower, more comfortable)
        this.tweens.add({
          targets: { val: 0 },
          val: 1,
          duration: 2500,
          onUpdate: () => {
            this.bgLayers.forEach(layer => {
              layer.sprite.tilePositionX += layer.speed * 1.5;
            });
          }
        });

        this.tweens.add({
          targets: [this.enea, this.elora],
          x: this.width + 150,
          duration: 2500,
          ease: 'Linear',
          onComplete: () => {
            this.enea.stop();
            this.elora.stop();
            this.enea.setVisible(false);
            this.elora.setVisible(false);
            this.isAnimating = false;
            this.dialogueIndex++;
            this.processDialogue();
          }
        });
        break;

      case 'next-episode':
        // Handle unlock before advancing (same as photo action)
        const currentEp = EPISODES[this.currentEpisode];
        if (currentEp.unlock === 'elora') this.hasElora = true;
        if (currentEp.unlock === 'dog') this.hasDog = true;
        if (currentEp.unlock === 'baby') this.hasBaby = true;

        // Skip to next episode without photo
        this.currentEpisode++;
        if (this.currentEpisode < EPISODES.length) {
          this.cameras.main.fadeOut(500, 0, 0, 0);
          this.time.delayedCall(500, () => {
            this.cameras.main.fadeIn(500, 0, 0, 0);
            this.startEpisode();
          });
        }
        break;

      case 'elora-enter':
        // Elora enters from RIGHT, walks LEFT
        this.hasElora = true;
        this.elora.setPosition(this.width + 100, this.groundY);
        this.elora.setVisible(true);
        this.elora.setFlipX(false); // Face left (natural direction)
        this.elora.play('female-walk');

        this.tweens.add({
          targets: this.elora,
          x: this.width * 0.55,
          duration: 2000,
          ease: 'Linear',
          onComplete: () => {
            this.elora.stop();
            this.elora.setFrame(0);
            this.showSpeech(dialogue.speaker, dialogue.text);
          }
        });
        break;

      case 'elora-alone':
        this.elora.setPosition(this.width * 0.5, this.groundY);
        this.elora.setVisible(true);
        this.enea.setVisible(false);
        this.showSpeech(dialogue.speaker, dialogue.text);
        break;

      case 'enea-alone':
        this.enea.setPosition(this.width * 0.5, this.groundY);
        this.enea.setVisible(true);
        this.elora.setVisible(false);
        this.showSpeech(dialogue.speaker, dialogue.text);
        break;

      case 'enea-enter':
        // Enea enters from LEFT, walks RIGHT
        this.enea.setPosition(-100, this.groundY);
        this.enea.setVisible(true);
        this.enea.setFlipX(true); // Flip to face right
        this.enea.play('male-walk');

        this.tweens.add({
          targets: this.enea,
          x: this.width * 0.4,
          duration: 2000,
          ease: 'Linear',
          onComplete: () => {
            this.enea.stop();
            this.enea.setFrame(0);
            this.showSpeech(dialogue.speaker, dialogue.text);
          }
        });
        break;

      case 'walk-together':
        this.walkTogether(() => {
          this.isAnimating = false;
          this.dialogueIndex++;
          this.processDialogue();
        });
        break;

      case 'walk-together-start':
        // Setup for walking right together
        const walkStartEneaX = this.width * 0.3;
        const walkStartEloraX = this.width * 0.4;

        this.enea.setPosition(walkStartEneaX, this.groundY);
        this.enea.setVisible(true);
        this.enea.setFlipX(true); // Face right
        this.eneaExpectedX = walkStartEneaX;

        if (this.hasElora) {
          this.elora.setPosition(walkStartEloraX, this.groundY);
          this.elora.setVisible(true);
          this.elora.setFlipX(true); // Face right
          this.eloraExpectedX = walkStartEloraX;
        }
        if (this.hasDog) {
          this.dog.setPosition(this.width * 0.2, this.groundY);
          this.dog.setFlipX(true); // Face right
          this.dog.setVisible(true);
        }
        this.isAnimating = false;
        this.dialogueIndex++;
        this.processDialogue();
        break;

      case 'face-each-other':
        // Enea on left, Elora on right, facing each other
        const faceEneaX = this.width * 0.4;
        const faceEloraX = this.width * 0.6;

        this.enea.setPosition(faceEneaX, this.groundY);
        this.enea.setFlipX(true); // Face right toward Elora
        this.enea.setVisible(true);
        this.eneaExpectedX = faceEneaX;

        this.elora.setPosition(faceEloraX, this.groundY);
        this.elora.setFlipX(false); // Face left toward Enea
        this.elora.setVisible(true);
        this.eloraExpectedX = faceEloraX;

        this.isAnimating = false;
        this.dialogueIndex++;
        this.processDialogue();
        break;

      case 'restaurant-scene':
        // Transition to restaurant interior
        this.setupRestaurant();
        this.isAnimating = false;
        this.dialogueIndex++;
        this.processDialogue();
        break;

      case 'plane':
        this.plane.setPosition(-100, this.height * 0.25);
        this.plane.setVisible(true);

        this.tweens.add({
          targets: this.plane,
          x: this.width + 100,
          y: this.height * 0.2,
          duration: 4000,
          ease: 'Sine.easeInOut',
          onComplete: () => {
            this.plane.setVisible(false);
            this.isAnimating = false;
            this.dialogueIndex++;
            this.processDialogue();
          }
        });
        break;

      case 'dog-join':
        this.hasDog = true;
        this.dog.setPosition(this.width * 0.5, this.groundY);
        this.dog.setVisible(true);
        this.dog.setAlpha(0);

        this.tweens.add({
          targets: this.dog,
          alpha: 1,
          duration: 500,
          onComplete: () => {
            this.isAnimating = false;
            this.dialogueIndex++;
            this.processDialogue();
          }
        });
        break;

      case 'baby-arrive':
        this.hasBaby = true;
        this.baby.setPosition(this.width * 0.5, this.height * 0.6);
        this.baby.setVisible(true);
        this.baby.setAlpha(0);

        this.tweens.add({
          targets: this.baby,
          alpha: 1,
          duration: 500,
          onComplete: () => {
            this.isAnimating = false;
            this.dialogueIndex++;
            this.processDialogue();
          }
        });
        break;

      case 'family-arrive':
        this.enea.setPosition(this.width * 0.35, this.groundY);
        this.enea.setVisible(true);
        this.elora.setPosition(this.width * 0.45, this.groundY);
        this.elora.setVisible(true);
        if (this.hasDog) {
          this.dog.setPosition(this.width * 0.25, this.groundY);
          this.dog.setFlipX(true); // Face right
          this.dog.setVisible(true);
        }
        this.isAnimating = false;
        this.dialogueIndex++;
        this.processDialogue();
        break;

      case 'family-together':
        // Family positioned together, facing right (ready to walk)
        this.enea.setPosition(this.width * 0.35, this.groundY);
        this.enea.setFlipX(true); // Face right
        this.enea.setVisible(true);
        this.elora.setPosition(this.width * 0.45, this.groundY);
        this.elora.setFlipX(true); // Face right
        this.elora.setVisible(true);
        if (this.hasDog) {
          this.dog.setPosition(this.width * 0.25, this.groundY);
          this.dog.setFlipX(true); // Face right
          this.dog.setVisible(true);
        }
        if (this.hasBaby) {
          this.baby.setPosition(this.width * 0.4, this.height * 0.6);
          this.baby.setVisible(true);
        }
        this.isAnimating = false;
        this.dialogueIndex++;
        this.processDialogue();
        break;

      case 'wedding-setup':
        // Wedding: Enea waits on right, Elora on left, facing each other
        this.enea.setPosition(this.width * 0.7, this.groundY);
        this.enea.setFlipX(false); // Face left toward Elora
        this.enea.setVisible(true);
        this.elora.setPosition(this.width * 0.15, this.groundY);
        this.elora.setFlipX(true); // Face right toward Enea
        this.elora.setVisible(true);
        this.showSpeech(dialogue.speaker, dialogue.text);
        break;

      case 'elora-walk-aisle':
        this.elora.play('female-walk');
        this.tweens.add({
          targets: this.elora,
          x: this.width * 0.55,
          duration: 3000,
          ease: 'Linear',
          onComplete: () => {
            this.elora.play('female-idle');
            this.enea.setPosition(this.width * 0.6, this.groundY);
            this.isAnimating = false;
            this.dialogueIndex++;
            this.processDialogue();
          }
        });
        break;

      case 'kneel':
        // Visual kneel effect (lower position slightly)
        this.tweens.add({
          targets: this.enea,
          y: this.groundY,
          scaleY: 2.2,
          duration: 500,
          onComplete: () => {
            this.isAnimating = false;
            this.dialogueIndex++;
            this.processDialogue();
          }
        });
        break;

      case 'hearts':
        this.createHearts();
        this.time.delayedCall(2000, () => {
          this.isAnimating = false;
          this.dialogueIndex++;
          this.processDialogue();
        });
        break;

      case 'photo':
        this.showPhoto();
        break;

      case 'finale':
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.time.delayedCall(1000, () => {
          this.scene.start('FinaleScene');
        });
        break;
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

    // STEP 2: Simple restaurant background
    // Wall (warm red/brown, upper 60%)
    add(this.add.rectangle(w / 2, h * 0.3, w, h * 0.6, 0x6b2a2a).setDepth(-100));
    // Floor (dark wood, lower 40%)
    add(this.add.rectangle(w / 2, h * 0.8, w, h * 0.4, 0x2a1510).setDepth(-100));
    // Baseboard divider
    add(this.add.rectangle(w / 2, h * 0.6, w, 4, 0x4a2820).setDepth(-99));
    // Warm ambient tint
    add(this.add.rectangle(w / 2, h / 2, w, h, 0x331500, 0.15).setDepth(-98));

    // STEP 3: Table - drawn with graphics at depth 110 (ABOVE characters at 100)
    // Table centered, wide enough for two characters
    const tableX = w / 2;
    const tableTopY = h * 0.58; // Table surface Y position
    const tableW = 400;

    const tableGfx = this.add.graphics().setDepth(110);
    // Tablecloth (white, subtle)
    tableGfx.fillStyle(0xffeedd, 0.3);
    tableGfx.fillRoundedRect(tableX - tableW / 2 - 8, tableTopY - 4, tableW + 16, 28, 6);
    // Table surface
    tableGfx.fillStyle(0x5c3a28, 1);
    tableGfx.fillRoundedRect(tableX - tableW / 2, tableTopY, tableW, 20, 4);
    // Highlight
    tableGfx.fillStyle(0x7a5038, 1);
    tableGfx.fillRoundedRect(tableX - tableW / 2 + 6, tableTopY + 3, tableW - 12, 6, 2);
    // Legs
    tableGfx.fillStyle(0x4a2a18, 1);
    tableGfx.fillRect(tableX - tableW / 2 + 20, tableTopY + 20, 10, 80);
    tableGfx.fillRect(tableX + tableW / 2 - 30, tableTopY + 20, 10, 80);
    add(tableGfx);

    // STEP 4: Table items (depth 112, above table surface)
    // Small candle
    add(this.add.image(tableX, tableTopY, 'candle')
      .setScale(4).setOrigin(0.5, 1).setDepth(112));
    const glow = this.add.circle(tableX, tableTopY - 25, 40, 0xffaa33, 0.1).setDepth(112);
    add(glow);
    this.tweens.add({
      targets: glow, alpha: 0.05, scaleX: 0.85, scaleY: 0.85,
      duration: 1000, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
    });

    // Small plates
    const plateGfx = this.add.graphics().setDepth(112);
    [-80, 80].forEach(off => {
      plateGfx.fillStyle(0xeeeeee, 0.8);
      plateGfx.fillCircle(tableX + off, tableTopY + 6, 14);
      plateGfx.lineStyle(1, 0xcccccc, 0.6);
      plateGfx.strokeCircle(tableX + off, tableTopY + 6, 14);
    });
    add(plateGfx);

    // Cutlery near Elora's plate (for embarrassed animation)
    this.eloraCutleryFork = this.add.text(tableX + 100, tableTopY + 2, '🍴', {
      fontSize: '14px'
    }).setOrigin(0.5).setDepth(113);
    this.eloraCutleryKnife = this.add.text(tableX + 60, tableTopY + 2, '🔪', {
      fontSize: '12px'
    }).setOrigin(0.5).setDepth(113);
    add(this.eloraCutleryFork);
    add(this.eloraCutleryKnife);

    // STEP 5: Position characters at the table
    // Scale down to 2.5 for restaurant (normal is 3)
    // At scale 2.5: 100*2.5=250w, 64*2.5=160h pixels. Origin (0.5,1)=feet at Y.
    // Table covers lower 35% → feet at tableTopY + (160 * 0.35) = tableTopY + 56
    const dinnerScale = 2.5;
    const spriteH = 64 * dinnerScale; // 160px
    const seatY = tableTopY + Math.round(spriteH * 0.35);
    const eneaDinnerX = tableX - 130;  // Well left of center
    const eloraDinnerX = tableX + 130; // Well right of center

    this.enea.setPosition(eneaDinnerX, seatY);
    this.enea.setScale(dinnerScale);
    this.enea.setFlipX(true);  // Face right (toward Elora)
    this.enea.setVisible(true);
    this.enea.stop();
    this.enea.setFrame(0);
    this.enea.setDepth(100);   // Behind table (110)
    this.eneaExpectedX = eneaDinnerX;

    this.elora.setPosition(eloraDinnerX, seatY);
    this.elora.setScale(dinnerScale);
    this.elora.setFlipX(false); // Face left (toward Enea)
    this.elora.setVisible(true);
    this.elora.stop();
    this.elora.setFrame(0);
    this.elora.setDepth(100);   // Behind table (110)
    this.eloraExpectedX = eloraDinnerX;

    // Debug markers
    const debug = this.add.graphics().setDepth(250);
    debug.fillStyle(0x00ff00, 0.8);
    debug.fillCircle(eneaDinnerX, seatY, 5);
    debug.fillCircle(eloraDinnerX, seatY, 5);
    // Blue dots at character heads
    debug.fillStyle(0x0088ff, 0.8);
    debug.fillCircle(eneaDinnerX, seatY - spriteH, 5);
    debug.fillCircle(eloraDinnerX, seatY - spriteH, 5);
    // Red line for table surface
    debug.lineStyle(2, 0xff0000, 0.8);
    debug.lineBetween(tableX - tableW / 2, tableTopY, tableX + tableW / 2, tableTopY);
    add(debug);
    add(this.add.text(10, h - 80,
      `Scale: ${dinnerScale} | SpriteH: ${spriteH}px | Table Y: ${tableTopY} | Seat Y: ${seatY}\n` +
      `Enea: (${eneaDinnerX}, ${seatY}) head@${seatY - spriteH} | Elora: (${eloraDinnerX}, ${seatY}) head@${seatY - spriteH}\n` +
      `Visible above table: ${seatY - spriteH} to ${tableTopY} = ${tableTopY - (seatY - spriteH)}px`,
      { fontSize: '11px', color: '#00ff00', backgroundColor: '#000000aa', padding: { x: 8, y: 4 } }
    ).setDepth(250));
  }

  cleanupRestaurant() {
    if (this.restaurantElements) {
      this.restaurantElements.forEach(el => { if (el && el.destroy) el.destroy(); });
      this.restaurantElements = null;
    }
    if (this.enea) { this.enea.setDepth(100); this.enea.setScale(3); }
    if (this.elora) { this.elora.setDepth(100); this.elora.setScale(3); }
    this.eloraCutleryFork = null;
    this.eloraCutleryKnife = null;
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
        x: targetX + 80,
        duration: 2500,
        ease: 'Linear'
      }));
    }

    if (this.hasDog) {
      this.dog.setFlipX(true); // Face right
      this.dog.play('dog-walk');
      tweens.push(this.tweens.add({
        targets: this.dog,
        x: targetX - 80,
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
        this.dog.setFrame(0);
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
    // Head is at char.y - 192, bubble goes above that
    let bubbleY = char.y - 220;

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
    const graphics = this.add.graphics();
    graphics.fillStyle(color, 1);
    // Draw heart using two circles and a triangle
    const r = size * 0.5; // radius for the bumps
    // Left bump
    graphics.fillCircle(-r * 0.5, -r * 0.3, r);
    // Right bump
    graphics.fillCircle(r * 0.5, -r * 0.3, r);
    // Bottom triangle
    graphics.fillTriangle(-size, -r * 0.3, size, -r * 0.3, 0, size * 1.2);
    graphics.setPosition(x, y);
    return graphics;
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
    const heartEffects = [];

    for (let i = 0; i < 3; i++) {
      const heart = this.createHeartGraphic(
        eneaX - 30 + i * 20,
        this.groundY - 120 - i * 15,
        10,
        0xe57373
      );
      heart.setAlpha(0).setDepth(150);
      heartEffects.push(heart);

      // Staggered fade in and float up
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

    // === FLYING CUTLERY from the table ===
    // If we're in the restaurant scene, animate the cutlery items flying
    if (this.eloraCutleryFork && this.eloraCutleryKnife) {
      // Fork flies up-right with spin
      this.tweens.add({
        targets: this.eloraCutleryFork,
        x: this.eloraCutleryFork.x + 120,
        y: this.eloraCutleryFork.y - 200,
        rotation: Math.PI * 3,
        alpha: 0,
        duration: 1000,
        ease: 'Sine.easeOut',
        onComplete: () => this.eloraCutleryFork.destroy()
      });

      // Knife flies up-left with spin (slightly delayed)
      this.tweens.add({
        targets: this.eloraCutleryKnife,
        x: this.eloraCutleryKnife.x - 80,
        y: this.eloraCutleryKnife.y - 160,
        rotation: -Math.PI * 2.5,
        alpha: 0,
        duration: 900,
        delay: 100,
        ease: 'Sine.easeOut',
        onComplete: () => this.eloraCutleryKnife.destroy()
      });

      // Create a napkin that also flies
      const napkin = this.add.text(eloraX + 20, eloraY - 60, '🧻', {
        fontSize: '20px'
      }).setOrigin(0.5).setDepth(150);

      this.tweens.add({
        targets: napkin,
        x: napkin.x + 60,
        y: napkin.y - 100,
        rotation: Math.PI * 2,
        alpha: 0,
        duration: 1200,
        delay: 50,
        ease: 'Sine.easeOut',
        onComplete: () => napkin.destroy()
      });
    }
  }

  hideSpeech() {
    this.speechBubble.setVisible(false);
    this.continuePrompt.setVisible(false);
    this.backButton.setVisible(false);
    this.clearBlushEffect();
  }

  createHearts() {
    for (let i = 0; i < 15; i++) {
      const startX = this.width * 0.3 + Math.random() * this.width * 0.4;
      const startY = this.height * 0.5 + Math.random() * 100;
      const size = 12 + Math.random() * 8; // Random size between 12-20

      const heart = this.createHeartGraphic(startX, startY, size, 0xe57373);
      heart.setDepth(200);

      this.tweens.add({
        targets: heart,
        y: startY - 200 - Math.random() * 100,
        alpha: 0,
        scale: 1.5,
        duration: 1500 + Math.random() * 500,
        ease: 'Sine.easeOut',
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
      this.prevPhotoBtn.setVisible(hasMultiple);
      this.nextPhotoBtn.setVisible(hasMultiple);
      this.photoCounter.setVisible(hasMultiple);
    } else {
      // No photos - show icon instead
      this.currentPhotos = [];
      this.photoIcon.setText(episode.icon);
      this.photoIcon.setVisible(true);
      this.prevPhotoBtn.setVisible(false);
      this.nextPhotoBtn.setVisible(false);
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
  }

  showNextPhoto() {
    if (this.currentPhotos.length === 0) return;
    this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.currentPhotos.length;
    this.displayCurrentPhoto();
  }

  showPrevPhoto() {
    if (this.currentPhotos.length === 0) return;
    this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.currentPhotos.length) % this.currentPhotos.length;
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
    // If photo overlay is showing, navigate through photos or close
    if (this.photoOverlay.visible) {
      // If a button handler already processed this click, skip
      if (this._photoClickHandled) {
        this._photoClickHandled = false;
        return;
      }
      if (this.currentPhotos.length > 1 && this.currentPhotoIndex < this.currentPhotos.length - 1) {
        // More photos to show - advance to next
        this.showNextPhoto();
      } else {
        // Last photo (or no photos / single photo) - close overlay
        this.closePhoto();
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
    this.isAnimating = false;

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
  }
}

// ============================================================
// FINALE SCENE - Valentine's message
// ============================================================
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
    const graphics = this.add.graphics();
    graphics.fillStyle(color, 1);
    // Draw heart using two circles and a triangle (Phaser 3 compatible)
    const r = size * 0.5; // radius for the bumps
    // Left bump
    graphics.fillCircle(-r * 0.5, -r * 0.3, r);
    // Right bump
    graphics.fillCircle(r * 0.5, -r * 0.3, r);
    // Bottom triangle
    graphics.fillTriangle(-size, -r * 0.3, size, -r * 0.3, 0, size * 1.2);
    graphics.setPosition(x, y);
    return graphics;
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

import { EPISODES } from '../data/episodes/index.js';

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

    // Log any failed assets
    this.load.on('loaderror', (file) => {
      console.error('LOAD FAILED:', file.key, file.url);
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

    // Load christmas-night backgrounds (for Leavenworth)
    const xmasBase = 'assets/backgrounds/town/Pixel Town - Parallax Background 1.2/Christmas Night/';
    this.load.image('xmas1', xmasBase + 'PixelTown_Christmasnight_layer01.png');
    this.load.image('xmas3', xmasBase + 'PixelTown_Christmasnight_layer03.png');
    this.load.image('xmas5', xmasBase + 'PixelTown_Christmasnight_layer05.png');
    this.load.image('xmas7', xmasBase + 'PixelTown_Christmasnight_layer07.png');
    this.load.image('xmas9', xmasBase + 'PixelTown_Christmasnight_layer09.png');
    this.load.image('xmas10', xmasBase + 'PixelTown_Christmasnight_layer10.png');

    // Load ancient temple backgrounds (for Rome proposal)
    const templeBase = 'assets/backgrounds/ancient-temple/PNG/background 3/';
    this.load.image('temple1', templeBase + 'Plan 1.png');
    this.load.image('temple2', templeBase + 'Plan 2.png');
    this.load.image('temple3', templeBase + 'Plan 3.png');
    this.load.image('temple4', templeBase + 'Plan 4.png');
    this.load.image('temple5', templeBase + 'Plan 5.png');

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

    // Load dog sprite sheets (3 variants for story timeline)
    const dogBase = 'assets/characters/GandalfHardcore Pet companion/';
    this.load.spritesheet('dog-totoro', dogBase + 'GandalfHardcore doggy sheet 3.png', {
      frameWidth: 24, frameHeight: 32
    });
    this.load.spritesheet('dog-joey', dogBase + 'GandalfHardcore doggy sheet 2.png', {
      frameWidth: 24, frameHeight: 32
    });
    this.load.spritesheet('dog-marzipan', dogBase + 'GandalfHardcore doggy sheet.png', {
      frameWidth: 24, frameHeight: 32
    });

    // Load cat sprite sheets (Mattz Art - orange cat, 64x64 frames)
    this.load.spritesheet('cat-idle', 'assets/characters/cat/cat-idle.png', {
      frameWidth: 64, frameHeight: 64
    });
    this.load.spritesheet('cat-walk', 'assets/characters/cat/cat-walk.png', {
      frameWidth: 64, frameHeight: 64
    });

    // Load horse sprite sheet (Onfe pack - black horse, 80x64 frames, 9 cols x 18 rows)
    this.load.spritesheet('horse-black', 'assets/characters/horse/horse-black.png', {
      frameWidth: 80, frameHeight: 64
    });

    // Load baby sprite sheet (Elthen pack - 32x32 frames, 12 cols x 6 rows)
    this.load.spritesheet('baby', 'assets/characters/baby/Human Baby Sprite Sheet.png', {
      frameWidth: 32, frameHeight: 32
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
    this.load.image('window-front', 'assets/backgrounds/interior/House/Window_Front.png');
    this.load.image('mug', 'assets/backgrounds/interior/Furniture/Mug.png');

    // Restaurant tileset (Riley's pack) - silverware and furniture
    this.load.spritesheet('silverware', 'assets/restaurant-tileset/Spritesheets/Silverware.png', {
      frameWidth: 32, frameHeight: 32
    });
    // Silverware frames: 0=fork, 1=spoon, 2=knife, 3=small plate, 4=plate, 5=bowl, 6=napkin dark, 7=napkin folded, 8=small item
    this.load.spritesheet('rest-furniture', 'assets/restaurant-tileset/Spritesheets/Furniture.png', {
      frameWidth: 32, frameHeight: 32
    });
    // Furniture frames: 0=stool, 1=table, 2=chair, 3=door

    // Load clothing overlays (GandalfHardcore pack - same 100x64 frame layout as base sprites)
    const clothesBase = 'assets/chars/clothes/';
    const clothesList = [
      'female-dress-red', 'female-dress-blue', 'female-bodice-orange',
      'female-bodice-purple', 'female-bodice-green', 'female-queen-dress',
      'female-fancy-blue', 'male-chainmail', 'male-split-hose',
      'male-shirt-blue', 'male-shirt-green', 'male-shirt-purple',
      'male-shirt-orange', 'male-shirt-white',
      'male-pants-blue', 'male-pants-green', 'male-pants-orange',
      'male-pants-purple', 'male-pants-brown',
      'male-boots', 'male-shoes'
    ];
    clothesList.forEach(key => {
      this.load.spritesheet(key, clothesBase + key + '.png', {
        frameWidth: 100, frameHeight: 64
      });
    });

    // Load hat overlays (GandalfHardcore pack - same 100x64 frame layout)
    const hatsBase = 'assets/chars/hats/';
    const hatsList = [
      'male-hat1', 'male-hat2', 'male-hat3', 'male-hat4', 'male-hat5',
      'male-blue-cap', 'male-green-cap', 'male-red-cap', 'male-orange-cap',
      'male-purple-cap', 'male-santa-hat', 'male-guard-helmet', 'male-farming-hat',
      'female-hat1', 'female-hat2', 'female-hat3', 'female-santa-hat',
      'female-blue-cap', 'female-red-cap'
    ];
    hatsList.forEach(key => {
      this.load.spritesheet(key, hatsBase + key + '.png', {
        frameWidth: 100, frameHeight: 64
      });
    });

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
    // Initial dog-walk animation (will be recreated per episode for texture swaps)
    this.anims.create({
      key: 'dog-walk',
      frames: this.anims.generateFrameNumbers('dog-totoro', { start: 8, end: 15 }),
      frameRate: 10,
      repeat: -1
    });

    // Cat animations (Mattz Art - separate idle and walk sprite sheets)
    this.anims.create({
      key: 'cat-idle-anim',
      frames: this.anims.generateFrameNumbers('cat-idle', { start: 0, end: 9 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'cat-walk-anim',
      frames: this.anims.generateFrameNumbers('cat-walk', { start: 0, end: 14 }),
      frameRate: 10,
      repeat: -1
    });

    // Horse animations (Onfe pack - 9 columns per row)
    // Row 0 (frames 0-7): idle side view
    // Row 1 (frames 9-16): walk side view
    this.anims.create({
      key: 'horse-idle',
      frames: this.anims.generateFrameNumbers('horse-black', { start: 0, end: 7 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'horse-walk',
      frames: this.anims.generateFrameNumbers('horse-black', { start: 9, end: 16 }),
      frameRate: 8,
      repeat: -1
    });

    // Baby animations (sprite sheet: 12 columns x 6 rows, 32x32 per frame)
    // Row 0 (frames 0-11): idle, Row 3 (frames 36-47): cry
    this.anims.create({
      key: 'baby-idle',
      frames: this.anims.generateFrameNumbers('baby', { start: 0, end: 11 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'baby-cry',
      frames: this.anims.generateFrameNumbers('baby', { start: 36, end: 47 }),
      frameRate: 8,
      repeat: -1
    });

    // Generate pixel-art heart texture (16x16)
    const heartCanvas = document.createElement('canvas');
    heartCanvas.width = 16;
    heartCanvas.height = 16;
    const ctx = heartCanvas.getContext('2d');
    // Pixel art heart shape (each row is 16px wide)
    const heartPixels = [
      '..xxxx..xxxx..',
      '.xxxxxxxxxxxxxx.',
      'xxxxxxxxxxxxxxxx',
      'xxxxxxxxxxxxxxxx',
      'xxxxxxxxxxxxxxxx',
      'xxxxxxxxxxxxxxxx',
      '.xxxxxxxxxxxxxx.',
      '..xxxxxxxxxxxx..',
      '...xxxxxxxxxx...',
      '....xxxxxxxx....',
      '.....xxxxxx.....',
      '......xxxx......',
      '.......xx.......',
    ];
    ctx.fillStyle = '#e57373';
    heartPixels.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        if (row[x] === 'x') ctx.fillRect(x, y + 1, 1, 1);
      }
    });
    // Add highlight pixels for 3D feel
    ctx.fillStyle = '#ef9a9a';
    ctx.fillRect(3, 2, 2, 2);
    ctx.fillRect(9, 2, 2, 2);
    ctx.fillStyle = '#c62828';
    ctx.fillRect(7, 9, 2, 2);
    this.textures.addCanvas('heart-pixel', heartCanvas);

    // Generate pixel-art ring texture (12x12) — gold band with diamond
    const ringCanvas = document.createElement('canvas');
    ringCanvas.width = 12;
    ringCanvas.height = 12;
    const rctx = ringCanvas.getContext('2d');
    // Gold band
    const ringPixels = [
      '....dd....',
      '...dDDd...',
      '...dDDd...',
      '..x.dd.x..',
      '.x......x.',
      'x........x',
      'x........x',
      '.x......x.',
      '..x....x..',
      '...xxxx...',
    ];
    ringPixels.forEach((row, y) => {
      for (let rx = 0; rx < row.length; rx++) {
        if (row[rx] === 'x') {
          rctx.fillStyle = '#d4a017'; // Gold
          rctx.fillRect(rx, y + 1, 1, 1);
        } else if (row[rx] === 'd') {
          rctx.fillStyle = '#88ccff'; // Diamond edge
          rctx.fillRect(rx, y + 1, 1, 1);
        } else if (row[rx] === 'D') {
          rctx.fillStyle = '#ffffff'; // Diamond center
          rctx.fillRect(rx, y + 1, 1, 1);
        }
      }
    });
    // Gold highlight on band
    rctx.fillStyle = '#f0d060';
    rctx.fillRect(1, 7, 1, 1);
    rctx.fillRect(9, 7, 1, 1);
    this.textures.addCanvas('ring-pixel', ringCanvas);

    // Generate pixel-art plane texture (32x12) — side-view airplane facing right
    const planeCanvas = document.createElement('canvas');
    planeCanvas.width = 32;
    planeCanvas.height = 12;
    const plctx = planeCanvas.getContext('2d');
    const planePixels = [
      '......R.........................',
      '.....RR.........................',
      '....RRw.........................',
      '...RRwwwwwwwwwwwwwwwnn..........',
      'WW.Rwwwbwbwbwbwwwwwwwnnn........',
      'WWWWwwwwwwwwwwwwwwwwwwnnn.......',
      'WWWWwwgggggggggwwwwwwwnnn.......',
      'WW.Rwwwwwwwwwwwwwwwwwwnnn.......',
      '...RRwwwwwwwwwwwwwwwnn..........',
      '....RRw.........................',
      '.....RR.........................',
      '......R.........................',
    ];
    const planeColors = {
      'w': '#e8eef4', 'g': '#c0c8d0', 'n': '#505860',
      'b': '#6699cc', 'W': '#8898a8', 'R': '#cc4444',
    };
    planePixels.forEach((row, y) => {
      for (let px = 0; px < row.length; px++) {
        const c = row[px];
        if (c !== '.' && planeColors[c]) {
          plctx.fillStyle = planeColors[c];
          plctx.fillRect(px, y, 1, 1);
        }
      }
    });
    // Cockpit highlight at nose
    plctx.fillStyle = '#88bbee';
    plctx.fillRect(22, 4, 1, 1);
    plctx.fillRect(22, 5, 1, 1);
    // Fuselage highlight stripe
    plctx.fillStyle = '#f4f8ff';
    for (let hx = 6; hx <= 20; hx++) {
      plctx.fillRect(hx, 3, 1, 1);
    }
    this.textures.addCanvas('plane-pixel', planeCanvas);

    // Go to title scene
    this.scene.start('TitleScene');
  }
}

export default BootScene;

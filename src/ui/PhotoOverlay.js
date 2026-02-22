// Photo slideshow overlay extracted from GameScene
import { EPISODES } from '../data/episodes/index.js';

export default class PhotoOverlay {
  constructor(scene) {
    this.scene = scene;
    this.currentPhotoIndex = 0;
    this.currentPhotos = [];
    this.photoImage = null;
    this.onClose = null;

    const width = scene.width;
    const height = scene.height;

    // Container
    this.container = scene.add.container(0, 0).setDepth(300);
    this.container.setVisible(false);

    // Background
    const photoBg = scene.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.95);

    // Title
    this.title = scene.add.text(width / 2, height * 0.08, '', {
      fontFamily: 'Cormorant Garamond',
      fontSize: '36px',
      color: '#ffcdd2'
    }).setOrigin(0.5);

    // Date
    this.date = scene.add.text(width / 2, height * 0.13, '', {
      fontFamily: 'Cormorant Garamond',
      fontSize: '16px',
      color: '#999999',
      fontStyle: 'italic'
    }).setOrigin(0.5);

    // Icon (fallback when no photos)
    this.icon = scene.add.text(width / 2, height * 0.42, '', {
      fontSize: '96px'
    }).setOrigin(0.5);

    // Photo counter
    this.counter = scene.add.text(width / 2, height * 0.72, '', {
      fontFamily: 'Lato',
      fontSize: '14px',
      color: '#888888'
    }).setOrigin(0.5);

    // Caption
    this.caption = scene.add.text(width / 2, height * 0.78, '', {
      fontFamily: 'Cormorant Garamond',
      fontSize: '16px',
      color: '#cccccc',
      fontStyle: 'italic',
      align: 'center',
      wordWrap: { width: 600 }
    }).setOrigin(0.5);

    // Navigation arrows
    this.prevBtn = scene.add.text(width * 0.1, height * 0.42, '\u25C0', {
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true }).setAlpha(0.7);
    this.prevBtn.on('pointerdown', () => { scene._photoClickHandled = true; this.showPrev(); });
    this.prevBtn.on('pointerover', () => this.prevBtn.setAlpha(1));
    this.prevBtn.on('pointerout', () => this.prevBtn.setAlpha(0.7));

    this.nextBtn = scene.add.text(width * 0.9, height * 0.42, '\u25B6', {
      fontSize: '48px',
      color: '#ffffff'
    }).setOrigin(0.5).setInteractive({ useHandCursor: true }).setAlpha(0.7);
    this.nextBtn.on('pointerdown', () => { scene._photoClickHandled = true; this.showNext(); });
    this.nextBtn.on('pointerover', () => this.nextBtn.setAlpha(1));
    this.nextBtn.on('pointerout', () => this.nextBtn.setAlpha(0.7));

    // Continue button
    const continueBtn = scene.add.rectangle(width / 2, height * 0.92, 250, 45, 0x000000, 0)
      .setStrokeStyle(2, 0xe57373)
      .setInteractive({ useHandCursor: true });
    const continueBtnText = scene.add.text(width / 2, height * 0.92, 'Continue \u2192', {
      fontFamily: 'Lato',
      fontSize: '16px',
      color: '#ffffff'
    }).setOrigin(0.5);

    continueBtn.on('pointerdown', () => { scene._photoClickHandled = true; this.close(); });
    continueBtn.on('pointerover', () => continueBtn.setFillStyle(0xe57373, 1));
    continueBtn.on('pointerout', () => continueBtn.setFillStyle(0x000000, 0));

    this.container.add([
      photoBg, this.title, this.date, this.icon,
      this.counter, this.caption,
      this.prevBtn, this.nextBtn, continueBtn, continueBtnText
    ]);
  }

  get visible() {
    return this.container.visible;
  }

  setVisible(v) {
    this.container.setVisible(v);
  }

  show(episode, onClose) {
    this.onClose = onClose;

    this.title.setText(episode.name);
    this.date.setText(episode.date);
    this.caption.setText(episode.caption);

    if (episode.photos && episode.photos.length > 0) {
      this.currentPhotos = episode.photos;
      this.currentPhotoIndex = 0;
      this.icon.setVisible(false);
      this.displayCurrentPhoto();

      const hasMultiple = this.currentPhotos.length > 1;
      this.prevBtn.setVisible(false);
      this.prevBtn.disableInteractive();
      this.nextBtn.setVisible(hasMultiple);
      if (hasMultiple) this.nextBtn.setInteractive(); else this.nextBtn.disableInteractive();
      this.counter.setVisible(hasMultiple);
    } else {
      this.currentPhotos = [];
      this.icon.setText(episode.icon);
      this.icon.setVisible(true);
      this.prevBtn.setVisible(false);
      this.prevBtn.disableInteractive();
      this.nextBtn.setVisible(false);
      this.nextBtn.disableInteractive();
      this.counter.setVisible(false);
      if (this.photoImage) {
        this.photoImage.destroy();
        this.photoImage = null;
      }
    }

    this.container.setVisible(true);
    this.container.setAlpha(0);

    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 500
    });
  }

  displayCurrentPhoto() {
    const episode = EPISODES[this.scene.currentEpisode];
    const photoKey = `photo-${episode.id}-${this.currentPhotoIndex}`;

    if (this.photoImage) {
      this.photoImage.destroy();
      this.photoImage = null;
    }

    if (this.scene.textures.exists(photoKey)) {
      this.photoImage = this.scene.add.image(
        this.scene.width / 2, this.scene.height * 0.42, photoKey
      );

      const maxWidth = 500;
      const maxHeight = 350;
      const scaleX = maxWidth / this.photoImage.width;
      const scaleY = maxHeight / this.photoImage.height;
      const scale = Math.min(scaleX, scaleY, 1);
      this.photoImage.setScale(scale);

      this.container.add(this.photoImage);
    }

    this.counter.setText(`${this.currentPhotoIndex + 1} / ${this.currentPhotos.length}`);

    if (this.currentPhotos.length > 1) {
      const showPrev = this.currentPhotoIndex > 0;
      const showNext = this.currentPhotoIndex < this.currentPhotos.length - 1;
      this.prevBtn.setVisible(showPrev);
      this.nextBtn.setVisible(showNext);
      if (showPrev) this.prevBtn.setInteractive(); else this.prevBtn.disableInteractive();
      if (showNext) this.nextBtn.setInteractive(); else this.nextBtn.disableInteractive();
    }
  }

  showNext() {
    if (this.currentPhotos.length === 0) return;
    if (this.currentPhotoIndex >= this.currentPhotos.length - 1) return;
    this.currentPhotoIndex++;
    this.displayCurrentPhoto();
  }

  showPrev() {
    if (this.currentPhotos.length === 0) return;
    if (this.currentPhotoIndex <= 0) return;
    this.currentPhotoIndex--;
    this.displayCurrentPhoto();
  }

  close() {
    this.scene.tweens.add({
      targets: this.container,
      alpha: 0,
      duration: 500,
      onComplete: () => {
        this.container.setVisible(false);

        if (this.photoImage) {
          this.photoImage.destroy();
          this.photoImage = null;
        }
        this.currentPhotos = [];
        this.currentPhotoIndex = 0;

        if (this.onClose) {
          this.onClose();
        }
      }
    });
  }
}

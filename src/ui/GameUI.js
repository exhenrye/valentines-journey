// HUD elements extracted from GameScene:
// episode indicator, skip buttons, location card, continue prompt, back button

export default class GameUI {
  constructor(scene, { onSkipEpisode, onGoBack }) {
    this.scene = scene;

    const width = scene.width;
    const height = scene.height;

    // UI container (highest depth)
    this.container = scene.add.container(0, 0).setDepth(200);

    // Episode indicator with skip buttons
    this.prevEpisodeBtn = scene.add.text(width / 2 - 140, 30, '◀◀', {
      fontFamily: 'Lato',
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#00000088',
      padding: { x: 10, y: 8 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.prevEpisodeBtn.on('pointerdown', () => onSkipEpisode(-1));
    this.prevEpisodeBtn.on('pointerover', () => this.prevEpisodeBtn.setBackgroundColor('#444444cc'));
    this.prevEpisodeBtn.on('pointerout', () => this.prevEpisodeBtn.setBackgroundColor('#00000088'));
    this.container.add(this.prevEpisodeBtn);

    this.episodeText = scene.add.text(width / 2, 30, '', {
      fontFamily: 'Lato',
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#00000088',
      padding: { x: 15, y: 8 },
    }).setOrigin(0.5);
    this.container.add(this.episodeText);

    this.nextEpisodeBtn = scene.add.text(width / 2 + 140, 30, '▶▶', {
      fontFamily: 'Lato',
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#00000088',
      padding: { x: 10, y: 8 },
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.nextEpisodeBtn.on('pointerdown', () => onSkipEpisode(1));
    this.nextEpisodeBtn.on('pointerover', () => this.nextEpisodeBtn.setBackgroundColor('#444444cc'));
    this.nextEpisodeBtn.on('pointerout', () => this.nextEpisodeBtn.setBackgroundColor('#00000088'));
    this.container.add(this.nextEpisodeBtn);

    // Location card (centered)
    this.locationCard = scene.add.container(width / 2, height / 2).setVisible(false);
    const locationBg = scene.add.rectangle(0, 0, 400, 150, 0x000000, 0.8);
    this.locationTitle = scene.add.text(0, -30, '', {
      fontFamily: 'Cormorant Garamond',
      fontSize: '48px',
      color: '#ffffff',
    }).setOrigin(0.5);
    this.locationDate = scene.add.text(0, 30, '', {
      fontFamily: 'Cormorant Garamond',
      fontSize: '20px',
      color: '#cccccc',
      fontStyle: 'italic',
    }).setOrigin(0.5);
    this.locationCard.add([locationBg, this.locationTitle, this.locationDate]);
    this.container.add(this.locationCard);

    // Continue prompt - top center so it doesn't overlap characters
    this.continuePrompt = scene.add.text(width / 2, 80, '▶ Tap to continue', {
      fontFamily: 'Lato',
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#e5737388',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setVisible(false);
    this.container.add(this.continuePrompt);

    // Back button for dialogue navigation
    this.backButton = scene.add.text(20, 80, '◀ Back', {
      fontFamily: 'Lato',
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#55555588',
      padding: { x: 15, y: 10 },
    }).setOrigin(0, 0.5).setVisible(false).setInteractive({ useHandCursor: true });
    this.backButton.on('pointerdown', () => onGoBack());
    this.backButton.on('pointerover', () => this.backButton.setBackgroundColor('#777777aa'));
    this.backButton.on('pointerout', () => this.backButton.setBackgroundColor('#55555588'));
    this.container.add(this.backButton);
  }

  updateEpisodeIndicator(episodeId, totalEpisodes, currentIndex) {
    this.episodeText.setText(`Episode ${episodeId} of ${totalEpisodes}`);
    this.prevEpisodeBtn.setVisible(currentIndex > 0);
    this.nextEpisodeBtn.setVisible(currentIndex < totalEpisodes - 1);
  }

  showLocationCard(name, date, onComplete) {
    this.locationTitle.setText(name);
    this.locationDate.setText(date);
    this.locationCard.setVisible(true);
    this.locationCard.setAlpha(0);

    this.scene.tweens.add({
      targets: this.locationCard,
      alpha: 1,
      duration: 500,
      onComplete: () => {
        this.scene.time.delayedCall(1500, () => {
          this.scene.tweens.add({
            targets: this.locationCard,
            alpha: 0,
            duration: 500,
            onComplete: () => {
              this.locationCard.setVisible(false);
              onComplete();
            },
          });
        });
      },
    });
  }

  showContinuePrompt(hasHistory) {
    this.continuePrompt.setVisible(true);
    this.backButton.setVisible(hasHistory);
  }

  hidePrompts() {
    this.continuePrompt.setVisible(false);
    this.backButton.setVisible(false);
  }

  hideLocationCard() {
    this.locationCard.setVisible(false);
  }
}

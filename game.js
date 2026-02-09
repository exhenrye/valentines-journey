// ===== Game Data: 12 Milestones =====
const milestones = [
  {
    id: 1,
    name: "Madrid",
    date: "October 20, 2017",
    icon: "🌹",
    photos: ["assets/photos/01-madrid/photo1.jpg"],
    caption: "Your phone died. We almost didn't find each other. But somehow, in the crowd of Serrano, we did. Thigh-high boots, a cream dress, and the most beautiful woman I'd ever seen. That Mexican dinner changed my life forever."
  },
  {
    id: 2,
    name: "Granada",
    date: "2017-2018",
    icon: "🏰",
    photos: ["assets/photos/02-granada/photo1.jpg"],
    caption: "Our first real adventure together. Wandering the Alhambra, getting lost in narrow streets, realizing I never wanted to travel without you again."
  },
  {
    id: 3,
    name: "Leavenworth",
    date: "October 2018",
    icon: "✈️",
    photos: ["assets/photos/03-leavenworth/photo1.jpg"],
    caption: "We were an ocean apart. I counted the days. On our anniversary, I surprised you—flew across the world just to see your face. Fireman and Dalmatian for Halloween. Every mile was worth it."
  },
  {
    id: 4,
    name: "Geneva",
    date: "2019",
    icon: "⛰️",
    photos: ["assets/photos/04-geneva/photo1.jpg"],
    caption: "You left everything—your country, your family, your comfort—to build a life with me in my childhood bedroom. The courage that took still amazes me. You chose us."
  },
  {
    id: 5,
    name: "Totoro",
    date: "2019",
    icon: "🐕",
    photos: ["assets/photos/05-totoro/photo1.jpg"],
    caption: "Our first baby. That little miniature bull terrier made us a family. He taught us how to love something together."
  },
  {
    id: 6,
    name: "Route de Chêne",
    date: "2020",
    icon: "🏠",
    photos: ["assets/photos/06-route-de-chene/photo1.jpg"],
    caption: "Our first home. Just us, our animals, and a pandemic. We cooked, we laughed, we cried. We weathered the storm together. I'd do it all again with you."
  },
  {
    id: 7,
    name: "The Proposal",
    date: "May 3, 2022",
    icon: "💍",
    photos: ["assets/photos/07-proposal/photo1.jpg"],
    caption: "I asked you to be mine forever. You said yes. The happiest moment of my life—until you kept topping it."
  },
  {
    id: 8,
    name: "Pignora",
    date: "August 13, 2022",
    icon: "💒",
    photos: ["assets/photos/08-pignora/photo1.jpg"],
    caption: "Surrounded by everyone we love, in the place my family has gathered for generations. You walked toward me and I couldn't breathe. The day you became my wife."
  },
  {
    id: 9,
    name: "Seattle",
    date: "2022-2023",
    icon: "🌲",
    photos: ["assets/photos/09-seattle/photo1.jpg"],
    caption: "A new continent. A new chapter. We packed our life into suitcases—Joey, Felix, Cleo, and us—and started over. Again. Because we're braver together."
  },
  {
    id: 10,
    name: "Matthews Beach",
    date: "May 2025",
    icon: "🏡",
    photos: ["assets/photos/10-matthews-beach/photo1.jpg"],
    caption: "A house with a backyard. A neighborhood with roots. Rome in the field. This isn't just where we live—it's where we're building our forever."
  },
  {
    id: 11,
    name: "Theo",
    date: "July 28, 2025",
    icon: "👶",
    photos: ["assets/photos/11-theo/photo1.jpg"],
    caption: "The most perfect little boy arrived. Everything before led to this. You made me a father. You made us complete. I didn't know my heart could hold this much love."
  },
  {
    id: 12,
    name: "2026 & Beyond",
    date: "Valentine's Day",
    icon: "✨",
    photos: ["assets/photos/12-future/photo1.jpg"],
    caption: "From a Tinder match in Madrid to a family in Seattle. Every step, every flight, every home—I'd do it all again. I'm the luckiest man alive because I get to build this life with you. Here's to forever, my love."
  }
];

// ===== Game State =====
let currentProgress = 0;  // Number of completed milestones (0-12)
let currentPhotoIndex = 0;
let musicPlaying = false;

// ===== DOM Elements =====
const titleScreen = document.getElementById('title-screen');
const pathScreen = document.getElementById('path-screen');
const finaleScreen = document.getElementById('finale-screen');
const modal = document.getElementById('memory-modal');

const startBtn = document.getElementById('start-btn');
const musicToggle = document.getElementById('music-toggle');
const closeBtn = document.querySelector('.close-btn');
const continueBtn = document.getElementById('continue-btn');
const restartBtn = document.getElementById('restart-btn');
const prevPhotoBtn = document.getElementById('prev-photo');
const nextPhotoBtn = document.getElementById('next-photo');

const pathProgress = document.getElementById('path-progress');
const bgMusic = document.getElementById('bg-music');

// ===== Initialization =====
function initGame() {
  // Load saved progress
  const saved = localStorage.getItem('journeyProgress');
  if (saved) {
    currentProgress = parseInt(saved, 10);
  }

  updateStations();
  updatePathProgress();

  // Event listeners
  startBtn.addEventListener('click', startGame);
  musicToggle.addEventListener('click', toggleMusic);
  closeBtn.addEventListener('click', closeModal);
  continueBtn.addEventListener('click', continueJourney);
  restartBtn.addEventListener('click', restartGame);
  prevPhotoBtn.addEventListener('click', () => changePhoto(-1));
  nextPhotoBtn.addEventListener('click', () => changePhoto(1));

  // Station clicks
  document.querySelectorAll('.station').forEach(station => {
    station.addEventListener('click', () => {
      const stationId = parseInt(station.dataset.station, 10);
      if (stationId <= currentProgress + 1) {
        openMemory(stationId);
      } else {
        // Shake animation for locked stations
        station.classList.add('shake');
        setTimeout(() => station.classList.remove('shake'), 500);
      }
    });
  });

  // Close modal on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active')) {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') changePhoto(-1);
      if (e.key === 'ArrowRight') changePhoto(1);
    }
  });

  // Touch swipe for photos
  setupSwipe();
}

function startGame() {
  showScreen(pathScreen);
  playMusic();

  // Scroll to show the first unlocked station
  setTimeout(() => {
    const firstUnlocked = document.querySelector('.station:not(.locked):not(.completed)');
    if (firstUnlocked) {
      firstUnlocked.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 300);
}

// ===== Screen Transitions =====
function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

// ===== Station Management =====
function updateStations() {
  document.querySelectorAll('.station').forEach(station => {
    const stationId = parseInt(station.dataset.station, 10);

    station.classList.remove('locked', 'completed');

    if (stationId <= currentProgress) {
      station.classList.add('completed');
    } else if (stationId > currentProgress + 1) {
      station.classList.add('locked');
    }
  });
}

function updatePathProgress() {
  // Calculate how much of the path to show (percentage based on progress)
  const totalLength = 2000; // Approximate path length
  const segmentLength = totalLength / milestones.length;
  const offset = totalLength - (currentProgress * segmentLength);

  pathProgress.style.strokeDashoffset = Math.max(0, offset);
}

// ===== Memory Modal =====
function openMemory(stationId) {
  const milestone = milestones[stationId - 1];
  if (!milestone) return;

  currentPhotoIndex = 0;

  // Update modal content
  document.getElementById('modal-icon').textContent = milestone.icon;
  document.getElementById('modal-title').textContent = milestone.name;
  document.getElementById('modal-date').textContent = milestone.date;
  document.getElementById('modal-caption').textContent = milestone.caption;

  // Setup photos
  setupPhotos(milestone.photos);

  // Store current station
  modal.dataset.currentStation = stationId;

  // Show modal
  modal.classList.add('active');
}

function setupPhotos(photos) {
  const container = document.getElementById('photo-container');
  const dotsContainer = document.getElementById('photo-dots');
  const galleryNav = document.getElementById('gallery-nav');

  container.innerHTML = '';
  dotsContainer.innerHTML = '';

  if (photos.length === 0) {
    container.innerHTML = '<div class="photo-placeholder">❤</div>';
    galleryNav.classList.add('hidden');
    return;
  }

  let loadedCount = 0;
  let hasError = false;

  photos.forEach((photo, index) => {
    const img = document.createElement('img');
    img.src = photo;
    img.alt = `Memory ${index + 1}`;

    img.onload = () => {
      loadedCount++;
      if (loadedCount === 1 && !hasError) {
        // First image loaded, remove placeholder
        const placeholder = container.querySelector('.photo-placeholder');
        if (placeholder) placeholder.remove();
      }
    };

    img.onerror = () => {
      hasError = true;
      img.style.display = 'none';
      // Show placeholder on first image error if no images visible
      if (container.querySelectorAll('img[style*="display: none"]').length === photos.length) {
        if (!container.querySelector('.photo-placeholder')) {
          const placeholder = document.createElement('div');
          placeholder.className = 'photo-placeholder';
          placeholder.textContent = '❤';
          container.appendChild(placeholder);
        }
      }
    };

    if (index === 0) img.classList.add('active');
    container.appendChild(img);

    // Create dot
    const dot = document.createElement('span');
    dot.className = 'dot' + (index === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToPhoto(index));
    dotsContainer.appendChild(dot);
  });

  // Add placeholder initially
  const placeholder = document.createElement('div');
  placeholder.className = 'photo-placeholder';
  placeholder.textContent = '❤';
  container.insertBefore(placeholder, container.firstChild);

  // Show/hide navigation
  if (photos.length <= 1) {
    galleryNav.classList.add('hidden');
  } else {
    galleryNav.classList.remove('hidden');
  }

  updatePhotoNav();
}

function changePhoto(direction) {
  const photos = document.querySelectorAll('#photo-container img');
  if (photos.length <= 1) return;

  const newIndex = currentPhotoIndex + direction;
  if (newIndex >= 0 && newIndex < photos.length) {
    goToPhoto(newIndex);
  }
}

function goToPhoto(index) {
  const photos = document.querySelectorAll('#photo-container img');
  const dots = document.querySelectorAll('#photo-dots .dot');

  photos.forEach((p, i) => p.classList.toggle('active', i === index));
  dots.forEach((d, i) => d.classList.toggle('active', i === index));

  currentPhotoIndex = index;
  updatePhotoNav();
}

function updatePhotoNav() {
  const photos = document.querySelectorAll('#photo-container img');
  prevPhotoBtn.disabled = currentPhotoIndex === 0;
  nextPhotoBtn.disabled = currentPhotoIndex >= photos.length - 1;
}

function closeModal() {
  modal.classList.remove('active');
}

function continueJourney() {
  const viewedStation = parseInt(modal.dataset.currentStation, 10);

  // If this was the next milestone to complete, update progress
  if (viewedStation === currentProgress + 1) {
    currentProgress = viewedStation;
    localStorage.setItem('journeyProgress', currentProgress);
    updateStations();
    updatePathProgress();
  }

  closeModal();

  // Check if journey is complete
  if (currentProgress >= milestones.length) {
    setTimeout(() => {
      showScreen(finaleScreen);
    }, 600);
  } else {
    // Scroll to next station
    setTimeout(() => {
      const nextStation = document.querySelector(`.station[data-station="${currentProgress + 1}"]`);
      if (nextStation) {
        nextStation.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
  }
}

// ===== Music =====
function playMusic() {
  if (bgMusic.src && bgMusic.src !== window.location.href) {
    bgMusic.play().then(() => {
      musicPlaying = true;
      musicToggle.classList.remove('muted');
    }).catch(() => {
      // Autoplay blocked - user can tap music button
      console.log('Autoplay blocked - tap music button to play');
    });
  }
}

function toggleMusic() {
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
    musicToggle.classList.add('muted');
  } else {
    bgMusic.play().then(() => {
      musicPlaying = true;
      musicToggle.classList.remove('muted');
    }).catch(err => {
      console.log('Music playback failed:', err);
    });
  }
}

// ===== Restart =====
function restartGame() {
  currentProgress = 0;
  localStorage.removeItem('journeyProgress');
  updateStations();
  updatePathProgress();
  showScreen(pathScreen);

  // Scroll to top
  document.querySelector('.path-container').scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Touch Swipe =====
function setupSwipe() {
  let touchStartX = 0;
  let touchEndX = 0;

  const photoContainer = document.getElementById('photo-container');

  photoContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  photoContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        changePhoto(1); // Swipe left = next
      } else {
        changePhoto(-1); // Swipe right = prev
      }
    }
  }, { passive: true });
}

// ===== Add shake animation CSS dynamically =====
const style = document.createElement('style');
style.textContent = `
  .station.shake {
    animation: shake 0.5s ease;
  }
  @keyframes shake {
    0%, 100% { transform: translateX(-50%); }
    25% { transform: translateX(calc(-50% - 5px)); }
    75% { transform: translateX(calc(-50% + 5px)); }
  }
`;
document.head.appendChild(style);

// ===== Initialize on DOM ready =====
document.addEventListener('DOMContentLoaded', initGame);

// ===== Game Data =====
const locations = [
  {
    id: 1,
    name: "Madrid",
    date: "Where it all began",
    photos: ["assets/photos/1-madrid/photo1.jpg"],
    caption: "The city where our eyes first met. Little did we know this was just the beginning of our greatest adventure."
  },
  {
    id: 2,
    name: "Granada",
    date: "Our first trip together",
    photos: ["assets/photos/2-granada/photo1.jpg"],
    caption: "Our first adventure together. The Alhambra, the sunsets, and the start of countless memories to come."
  },
  {
    id: 3,
    name: "USA",
    date: "One year anniversary",
    photos: ["assets/photos/3-usa-surprise/photo1.jpg"],
    caption: "I flew across the ocean just to surprise you. Your face when you saw me made every mile worth it."
  },
  {
    id: 4,
    name: "Switzerland",
    date: "Moving in together",
    photos: ["assets/photos/4-switzerland/photo1.jpg"],
    caption: "You took a leap of faith and crossed continents to build a life with me. Our first home together."
  },
  {
    id: 5,
    name: "Our Pup",
    date: "Growing our family",
    photos: ["assets/photos/5-dog/photo1.jpg"],
    caption: "The day we became a family of three. Those puppy eyes stole both our hearts instantly."
  },
  {
    id: 6,
    name: "Rome",
    date: "The proposal",
    photos: ["assets/photos/6-rome/photo1.jpg"],
    caption: "In the eternal city, I asked you to be mine forever. And you said yes."
  },
  {
    id: 7,
    name: "Pignora",
    date: "Our wedding day",
    photos: ["assets/photos/7-wedding/photo1.jpg"],
    caption: "Surrounded by family at Pignora, we promised each other forever. The most beautiful day of my life."
  },
  {
    id: 8,
    name: "Seattle",
    date: "A new chapter",
    photos: ["assets/photos/8-seattle/photo1.jpg"],
    caption: "Our newest adventure begins. From Europe to the Pacific Northwest, always together."
  }
];

// ===== Game State =====
let currentLocation = 0;  // Index of highest unlocked location
let currentPhotoIndex = 0;
let musicPlaying = false;

// ===== DOM Elements =====
const titleScreen = document.getElementById('title-screen');
const mapScreen = document.getElementById('map-screen');
const finaleScreen = document.getElementById('finale-screen');
const modal = document.getElementById('location-modal');

const startBtn = document.getElementById('start-btn');
const musicToggle = document.getElementById('music-toggle');
const closeBtn = document.querySelector('.close-btn');
const continueBtn = document.getElementById('continue-btn');
const restartBtn = document.getElementById('restart-btn');
const prevPhotoBtn = document.getElementById('prev-photo');
const nextPhotoBtn = document.getElementById('next-photo');

const bgMusic = document.getElementById('bg-music');

// ===== Screen Transitions =====
function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
  });
  screen.classList.add('active');
}

// ===== Initialize Game =====
function initGame() {
  // Load saved progress from localStorage
  const savedProgress = localStorage.getItem('journeyProgress');
  if (savedProgress) {
    currentLocation = parseInt(savedProgress, 10);
  }

  // Update map markers
  updateMapMarkers();

  // Event listeners
  startBtn.addEventListener('click', startGame);
  musicToggle.addEventListener('click', toggleMusic);
  closeBtn.addEventListener('click', closeModal);
  continueBtn.addEventListener('click', continueJourney);
  restartBtn.addEventListener('click', restartGame);
  prevPhotoBtn.addEventListener('click', () => changePhoto(-1));
  nextPhotoBtn.addEventListener('click', () => changePhoto(1));

  // Location marker clicks
  document.querySelectorAll('.location').forEach(loc => {
    loc.addEventListener('click', () => {
      const locId = parseInt(loc.dataset.location, 10);
      if (locId <= currentLocation + 1) {
        openLocation(locId);
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
}

function startGame() {
  showScreen(mapScreen);
  // Try to play music (may be blocked by browser autoplay policy)
  if (!musicPlaying) {
    playMusic();
  }
}

// ===== Map Management =====
function updateMapMarkers() {
  document.querySelectorAll('.location').forEach(loc => {
    const locId = parseInt(loc.dataset.location, 10);
    const marker = loc.querySelector('.marker');

    if (locId < currentLocation + 1) {
      // Completed
      loc.classList.remove('locked');
      loc.classList.add('completed');
    } else if (locId === currentLocation + 1) {
      // Current (unlocked but not visited)
      loc.classList.remove('locked');
      loc.classList.remove('completed');
    } else {
      // Locked
      loc.classList.add('locked');
      loc.classList.remove('completed');
    }
  });
}

// ===== Location Modal =====
function openLocation(locId) {
  const location = locations[locId - 1];
  if (!location) return;

  currentPhotoIndex = 0;

  // Set modal content
  document.getElementById('modal-title').textContent = location.name;
  document.getElementById('modal-date').textContent = location.date;
  document.getElementById('modal-caption').textContent = location.caption;

  // Setup photos
  setupPhotoGallery(location.photos);

  // Show modal
  modal.classList.add('active');

  // Mark as current location being viewed
  modal.dataset.currentLocation = locId;
}

function setupPhotoGallery(photos) {
  const container = document.getElementById('photo-container');
  const dotsContainer = document.getElementById('photo-dots');

  container.innerHTML = '';
  dotsContainer.innerHTML = '';

  if (photos.length === 0) {
    // Placeholder if no photos
    container.innerHTML = '<div class="photo-placeholder">&#10084;</div>';
    prevPhotoBtn.style.display = 'none';
    nextPhotoBtn.style.display = 'none';
    return;
  }

  photos.forEach((photo, index) => {
    const img = document.createElement('img');
    img.src = photo;
    img.alt = `Memory ${index + 1}`;
    img.onerror = function() {
      // Show placeholder on error
      this.style.display = 'none';
      if (container.querySelector('.photo-placeholder') === null) {
        const placeholder = document.createElement('div');
        placeholder.className = 'photo-placeholder active';
        placeholder.innerHTML = '&#10084;';
        container.appendChild(placeholder);
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

  // Show/hide nav buttons based on photo count
  if (photos.length <= 1) {
    prevPhotoBtn.style.display = 'none';
    nextPhotoBtn.style.display = 'none';
    dotsContainer.style.display = 'none';
  } else {
    prevPhotoBtn.style.display = 'flex';
    nextPhotoBtn.style.display = 'flex';
    dotsContainer.style.display = 'flex';
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

  photos.forEach((p, i) => {
    p.classList.toggle('active', i === index);
  });

  dots.forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });

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
  const viewedLocation = parseInt(modal.dataset.currentLocation, 10);

  // Unlock next location if this was the current frontier
  if (viewedLocation === currentLocation + 1) {
    currentLocation = viewedLocation;
    localStorage.setItem('journeyProgress', currentLocation);
    updateMapMarkers();
  }

  closeModal();

  // Check if journey is complete
  if (currentLocation >= locations.length) {
    setTimeout(() => {
      showScreen(finaleScreen);
    }, 500);
  }
}

// ===== Music =====
function playMusic() {
  if (bgMusic.src && bgMusic.src !== window.location.href) {
    bgMusic.play().then(() => {
      musicPlaying = true;
      musicToggle.classList.remove('muted');
    }).catch(() => {
      // Autoplay blocked - that's okay
      console.log('Autoplay blocked');
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
    }).catch(() => {
      console.log('Music playback failed');
    });
  }
}

// ===== Restart =====
function restartGame() {
  currentLocation = 0;
  localStorage.removeItem('journeyProgress');
  updateMapMarkers();
  showScreen(mapScreen);
}

// ===== Touch/Swipe Support for Photos =====
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('photo-container').addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.getElementById('photo-container').addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const threshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      changePhoto(1); // Swipe left = next
    } else {
      changePhoto(-1); // Swipe right = prev
    }
  }
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', initGame);

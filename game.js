// ===== Milestone Data =====
const milestones = [
  {
    id: 1,
    name: "Madrid",
    date: "October 20, 2017",
    icon: "🌹",
    scene: "madrid",
    position: 400,
    photos: ["assets/photos/01-madrid/photo1.jpg"],
    caption: "Your phone died. We almost didn't find each other. But somehow, in the crowd of Serrano, we did. Thigh-high boots, a cream dress, and the most beautiful woman I'd ever seen. That Mexican dinner changed my life forever.",
    characterChange: "meetPartner" // Second heart appears
  },
  {
    id: 2,
    name: "Granada",
    date: "2017-2018",
    icon: "🏰",
    scene: "granada",
    position: 900,
    photos: ["assets/photos/02-granada/photo1.jpg"],
    caption: "Our first real adventure together. Wandering the Alhambra, getting lost in narrow streets, realizing I never wanted to travel without you again."
  },
  {
    id: 3,
    name: "Leavenworth",
    date: "October 2018",
    icon: "✈️",
    scene: "leavenworth",
    position: 1400,
    photos: ["assets/photos/03-leavenworth/photo1.jpg"],
    caption: "We were an ocean apart. I counted the days. On our anniversary, I surprised you—flew across the world just to see your face. Fireman and Dalmatian for Halloween. Every mile was worth it."
  },
  {
    id: 4,
    name: "Geneva",
    date: "2019",
    icon: "⛰️",
    scene: "geneva",
    position: 1900,
    photos: ["assets/photos/04-geneva/photo1.jpg"],
    caption: "You left everything—your country, your family, your comfort—to build a life with me in my childhood bedroom. The courage that took still amazes me. You chose us."
  },
  {
    id: 5,
    name: "Totoro",
    date: "2019",
    icon: "🐕",
    scene: "totoro",
    position: 2400,
    photos: ["assets/photos/05-totoro/photo1.jpg"],
    caption: "Our first baby. That little miniature bull terrier made us a family. He taught us how to love something together."
  },
  {
    id: 6,
    name: "Route de Chêne",
    date: "2020",
    icon: "🏠",
    scene: "routedechene",
    position: 2900,
    photos: ["assets/photos/06-route-de-chene/photo1.jpg"],
    caption: "Our first home. Just us, our animals, and a pandemic. We cooked, we laughed, we cried. We weathered the storm together. I'd do it all again with you."
  },
  {
    id: 7,
    name: "The Proposal",
    date: "May 3, 2022",
    icon: "💍",
    scene: "proposal",
    position: 3400,
    photos: ["assets/photos/07-proposal/photo1.jpg"],
    caption: "I asked you to be mine forever. You said yes. The happiest moment of my life—until you kept topping it."
  },
  {
    id: 8,
    name: "Pignora",
    date: "August 13, 2022",
    icon: "💒",
    scene: "pignora",
    position: 3900,
    photos: ["assets/photos/08-pignora/photo1.jpg"],
    caption: "Surrounded by everyone we love, in the place my family has gathered for generations. You walked toward me and I couldn't breathe. The day you became my wife."
  },
  {
    id: 9,
    name: "Seattle",
    date: "2022-2023",
    icon: "🌲",
    scene: "seattle",
    position: 4400,
    photos: ["assets/photos/09-seattle/photo1.jpg"],
    caption: "A new continent. A new chapter. We packed our life into suitcases—Joey, Felix, Cleo, and us—and started over. Again. Because we're braver together."
  },
  {
    id: 10,
    name: "Matthews Beach",
    date: "May 2025",
    icon: "🏡",
    scene: "matthewsbeach",
    position: 4900,
    photos: ["assets/photos/10-matthews-beach/photo1.jpg"],
    caption: "A house with a backyard. A neighborhood with roots. Rome in the field. This isn't just where we live—it's where we're building our forever."
  },
  {
    id: 11,
    name: "Theo",
    date: "July 28, 2025",
    icon: "👶",
    scene: "theo",
    position: 5400,
    photos: ["assets/photos/11-theo/photo1.jpg"],
    caption: "The most perfect little boy arrived. Everything before led to this. You made me a father. You made us complete. I didn't know my heart could hold this much love.",
    characterChange: "addBaby" // Baby heart appears
  },
  {
    id: 12,
    name: "2026 & Beyond",
    date: "Valentine's Day",
    icon: "✨",
    scene: "future",
    position: 5900,
    photos: ["assets/photos/12-future/photo1.jpg"],
    caption: "From a Tinder match in Madrid to a family in Seattle. Every step, every flight, every home—I'd do it all again. I'm the luckiest man alive because I get to build this life with you. Here's to forever, my love.",
    isFinale: true
  }
];

// ===== Game State =====
const WORLD_WIDTH = 6500;
const CHAR_SPEED = 5;
const PARALLAX_SPEEDS = { sky: 0.1, far: 0.2, mid: 0.4, near: 0.6, ground: 1, decorations: 0.8, milestones: 1 };

let worldX = 0;
let characterX = 15; // percentage from left
let isWalking = false;
let walkDirection = 0; // -1 left, 0 stopped, 1 right
let currentScene = 'madrid';
let completedMilestones = new Set();
let activeMilestone = null;
let gameStarted = false;
let musicPlaying = false;

// DOM Elements
let world, character, ground, decorations, milestonesEl, progressFill;
let sky, far, mid, near;
let momentOverlay, momentTitle, momentDate, momentPhoto, momentCaption;

// ===== Initialization =====
function init() {
  // Cache DOM elements
  world = document.getElementById('world');
  character = document.getElementById('character');
  ground = document.querySelector('.ground');
  decorations = document.getElementById('decorations');
  milestonesEl = document.getElementById('milestones');
  progressFill = document.getElementById('progress-fill');

  sky = document.querySelector('.parallax-layer.sky');
  far = document.querySelector('.parallax-layer.far');
  mid = document.querySelector('.parallax-layer.mid');
  near = document.querySelector('.parallax-layer.near');

  momentOverlay = document.getElementById('moment-overlay');
  momentTitle = document.getElementById('moment-title');
  momentDate = document.getElementById('moment-date');
  momentPhoto = document.getElementById('moment-photo');
  momentCaption = document.getElementById('moment-caption');

  // Load saved progress
  loadProgress();

  // Create milestone markers
  createMilestoneMarkers();

  // Create decorations
  createDecorations();

  // Event listeners
  document.getElementById('start-btn').addEventListener('click', startGame);
  document.getElementById('moment-continue').addEventListener('click', closeMoment);
  document.getElementById('restart-btn').addEventListener('click', restartGame);
  document.getElementById('music-toggle').addEventListener('click', toggleMusic);

  // Keyboard controls
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);

  // Touch/click controls
  document.getElementById('game-screen').addEventListener('touchstart', handleTouch);
  document.getElementById('game-screen').addEventListener('touchend', handleTouchEnd);
  document.getElementById('game-screen').addEventListener('mousedown', handleClick);
  document.getElementById('game-screen').addEventListener('mouseup', handleClickEnd);

  // Update scene based on saved progress
  updateScene();
}

function loadProgress() {
  const saved = localStorage.getItem('journeyProgress');
  if (saved) {
    const ids = JSON.parse(saved);
    ids.forEach(id => completedMilestones.add(id));

    // Set world position to after last completed milestone
    if (completedMilestones.size > 0) {
      const lastCompleted = Math.max(...completedMilestones);
      const milestone = milestones.find(m => m.id === lastCompleted);
      if (milestone) {
        worldX = Math.max(0, milestone.position - 200);
      }
    }

    // Update character based on progress
    updateCharacterAppearance();
  }
}

function saveProgress() {
  localStorage.setItem('journeyProgress', JSON.stringify([...completedMilestones]));
}

function startGame() {
  gameStarted = true;
  showScreen('game-screen');
  playMusic();
  requestAnimationFrame(gameLoop);
}

function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// ===== Milestone Markers =====
function createMilestoneMarkers() {
  milestonesEl.innerHTML = '';

  milestones.forEach(m => {
    const marker = document.createElement('div');
    marker.className = 'milestone-marker';
    marker.dataset.id = m.id;
    marker.style.left = `${m.position}px`;

    if (completedMilestones.has(m.id)) {
      marker.classList.add('completed');
    }

    marker.innerHTML = `
      <div class="marker-glow">${m.icon}</div>
      <span class="marker-label">${m.name}</span>
    `;

    marker.addEventListener('click', () => {
      if (isNearMilestone(m)) {
        triggerMilestone(m);
      }
    });

    milestonesEl.appendChild(marker);
  });
}

function updateMilestoneMarkers() {
  document.querySelectorAll('.milestone-marker').forEach(marker => {
    const id = parseInt(marker.dataset.id);
    const milestone = milestones.find(m => m.id === id);

    marker.classList.remove('active', 'completed');

    if (completedMilestones.has(id)) {
      marker.classList.add('completed');
    } else if (isNearMilestone(milestone)) {
      marker.classList.add('active');
    }
  });
}

function isNearMilestone(milestone) {
  const charWorldX = worldX + (window.innerWidth * characterX / 100);
  return Math.abs(charWorldX - milestone.position) < 80;
}

// ===== Decorations =====
function createDecorations() {
  const decoTypes = {
    madrid: ['🏛️', '🌙', '⭐', '🏠', '🌃'],
    granada: ['🏰', '🌳', '🌺', '⛲'],
    leavenworth: ['🍂', '🌲', '🏔️', '🎃'],
    geneva: ['⛰️', '🏔️', '🌲', '🏠'],
    totoro: ['🏠', '🌳', '🌸'],
    routedechene: ['🏢', '🌳', '🪴'],
    proposal: ['🌹', '✨', '💫'],
    pignora: ['🍇', '🌿', '🏡', '🌻'],
    seattle: ['🌲', '🌧️', '☕', '🏙️'],
    matthewsbeach: ['🏡', '🌳', '🐎', '🌸'],
    theo: ['🧸', '⭐', '🌙', '💫'],
    future: ['☀️', '✨', '🌈', '💕']
  };

  let x = 100;
  milestones.forEach((m, index) => {
    const sceneDecos = decoTypes[m.scene] || ['🌳'];
    const sceneStart = index === 0 ? 0 : milestones[index - 1].position + 100;
    const sceneEnd = m.position + 200;

    for (let pos = sceneStart; pos < sceneEnd; pos += 150 + Math.random() * 100) {
      const deco = document.createElement('div');
      deco.className = 'decoration';
      deco.textContent = sceneDecos[Math.floor(Math.random() * sceneDecos.length)];
      deco.style.left = `${pos}px`;
      deco.style.fontSize = `${1.5 + Math.random() * 1.5}rem`;
      deco.style.opacity = 0.4 + Math.random() * 0.4;
      decorations.appendChild(deco);
    }
  });
}

// ===== Scene Management =====
function updateScene() {
  const charWorldX = worldX + (window.innerWidth * characterX / 100);

  // Find current scene
  let newScene = 'madrid';
  for (let i = milestones.length - 1; i >= 0; i--) {
    if (charWorldX >= milestones[i].position - 200) {
      newScene = milestones[i].scene;
      break;
    }
  }

  if (newScene !== currentScene) {
    // Remove old scene class
    world.classList.remove(`scene-${currentScene}`);
    // Add new scene class
    world.classList.add(`scene-${newScene}`);
    currentScene = newScene;
  }

  // Update progress bar
  const progress = Math.min(100, (charWorldX / (WORLD_WIDTH - 500)) * 100);
  progressFill.style.width = `${progress}%`;
}

// ===== Character =====
function updateCharacterAppearance() {
  const heart2 = character.querySelector('.heart-2');
  const heartBaby = character.querySelector('.heart-baby');

  // After Madrid (meeting), show second heart
  if (completedMilestones.has(1)) {
    heart2.style.display = 'inline';
  }

  // After Theo, show baby heart
  if (completedMilestones.has(11)) {
    heartBaby.style.display = 'inline';
  }
}

// ===== Movement =====
function handleKeyDown(e) {
  if (!gameStarted || momentOverlay.classList.contains('active')) return;

  if (e.key === 'ArrowRight' || e.key === 'd') {
    walkDirection = 1;
    isWalking = true;
    character.classList.add('walking');
  } else if (e.key === 'ArrowLeft' || e.key === 'a') {
    walkDirection = -1;
    isWalking = true;
    character.classList.add('walking');
  }
}

function handleKeyUp(e) {
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'ArrowLeft' || e.key === 'a') {
    walkDirection = 0;
    isWalking = false;
    character.classList.remove('walking');
  }
}

function handleTouch(e) {
  if (!gameStarted || momentOverlay.classList.contains('active')) return;
  if (e.target.closest('.music-btn') || e.target.closest('.moment-overlay')) return;

  const touchX = e.touches[0].clientX;
  if (touchX > window.innerWidth / 2) {
    walkDirection = 1;
  } else {
    walkDirection = -1;
  }
  isWalking = true;
  character.classList.add('walking');
}

function handleTouchEnd() {
  walkDirection = 0;
  isWalking = false;
  character.classList.remove('walking');
}

function handleClick(e) {
  if (!gameStarted || momentOverlay.classList.contains('active')) return;
  if (e.target.closest('.music-btn') || e.target.closest('.moment-overlay')) return;

  if (e.clientX > window.innerWidth / 2) {
    walkDirection = 1;
  } else {
    walkDirection = -1;
  }
  isWalking = true;
  character.classList.add('walking');
}

function handleClickEnd() {
  walkDirection = 0;
  isWalking = false;
  character.classList.remove('walking');
}

function moveWorld() {
  if (!isWalking || walkDirection === 0) return;

  const newWorldX = worldX + (CHAR_SPEED * walkDirection);

  // Boundaries
  if (newWorldX < 0 || newWorldX > WORLD_WIDTH - window.innerWidth) return;

  worldX = newWorldX;

  // Apply parallax
  sky.style.transform = `translateX(${-worldX * PARALLAX_SPEEDS.sky}px)`;
  far.style.transform = `translateX(${-worldX * PARALLAX_SPEEDS.far}px)`;
  mid.style.transform = `translateX(${-worldX * PARALLAX_SPEEDS.mid}px)`;
  near.style.transform = `translateX(${-worldX * PARALLAX_SPEEDS.near}px)`;
  ground.style.transform = `translateX(${-worldX * PARALLAX_SPEEDS.ground}px)`;
  decorations.style.transform = `translateX(${-worldX * PARALLAX_SPEEDS.decorations}px)`;
  milestonesEl.style.transform = `translateX(${-worldX * PARALLAX_SPEEDS.milestones}px)`;

  // Check for milestone triggers
  checkMilestones();

  // Update scene colors
  updateScene();

  // Update milestone markers
  updateMilestoneMarkers();
}

function checkMilestones() {
  const charWorldX = worldX + (window.innerWidth * characterX / 100);

  for (const m of milestones) {
    if (completedMilestones.has(m.id)) continue;

    if (Math.abs(charWorldX - m.position) < 50) {
      // Auto-trigger if walking into milestone
      triggerMilestone(m);
      break;
    }
  }
}

// ===== Moments =====
function triggerMilestone(milestone) {
  if (activeMilestone) return;

  activeMilestone = milestone;
  isWalking = false;
  walkDirection = 0;
  character.classList.remove('walking');

  // Update moment content
  momentTitle.textContent = milestone.name;
  momentDate.textContent = milestone.date;
  momentCaption.textContent = milestone.caption;

  // Load photo
  momentPhoto.innerHTML = '';
  if (milestone.photos && milestone.photos.length > 0) {
    const img = document.createElement('img');
    img.src = milestone.photos[0];
    img.onerror = () => {
      momentPhoto.innerHTML = '<div class="photo-placeholder">❤</div>';
    };
    momentPhoto.appendChild(img);
  } else {
    momentPhoto.innerHTML = '<div class="photo-placeholder">❤</div>';
  }

  // Show overlay
  momentOverlay.classList.add('active');
}

function closeMoment() {
  if (!activeMilestone) return;

  // Mark as completed
  completedMilestones.add(activeMilestone.id);
  saveProgress();

  // Update character if needed
  if (activeMilestone.characterChange === 'meetPartner') {
    character.querySelector('.heart-2').style.display = 'inline';
  } else if (activeMilestone.characterChange === 'addBaby') {
    character.querySelector('.heart-baby').style.display = 'inline';
  }

  // Check for finale
  if (activeMilestone.isFinale) {
    momentOverlay.classList.remove('active');
    activeMilestone = null;
    setTimeout(() => showScreen('finale-screen'), 500);
    return;
  }

  // Close overlay
  momentOverlay.classList.remove('active');
  activeMilestone = null;

  // Update markers
  updateMilestoneMarkers();
}

// ===== Game Loop =====
function gameLoop() {
  if (!gameStarted) return;

  moveWorld();

  requestAnimationFrame(gameLoop);
}

// ===== Music =====
function playMusic() {
  const music = document.getElementById('bg-music');
  if (music.src) {
    music.play().then(() => {
      musicPlaying = true;
      document.getElementById('music-toggle').classList.remove('muted');
    }).catch(() => {
      console.log('Autoplay blocked');
    });
  }
}

function toggleMusic() {
  const music = document.getElementById('bg-music');
  const btn = document.getElementById('music-toggle');

  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
    btn.classList.add('muted');
  } else {
    music.play().then(() => {
      musicPlaying = true;
      btn.classList.remove('muted');
    }).catch(() => {});
  }
}

// ===== Restart =====
function restartGame() {
  worldX = 0;
  completedMilestones.clear();
  localStorage.removeItem('journeyProgress');

  // Reset character
  character.querySelector('.heart-2').style.display = 'none';
  character.querySelector('.heart-baby').style.display = 'none';

  // Reset world position
  sky.style.transform = 'translateX(0)';
  far.style.transform = 'translateX(0)';
  mid.style.transform = 'translateX(0)';
  near.style.transform = 'translateX(0)';
  ground.style.transform = 'translateX(0)';
  decorations.style.transform = 'translateX(0)';
  milestonesEl.style.transform = 'translateX(0)';

  // Update markers
  updateMilestoneMarkers();
  updateScene();

  showScreen('game-screen');
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', init);

const episode = {
  id: 1,
  name: 'Madrid',
  date: 'October 20, 2017',
  background: 'town-night',
  icon: '\u{1F339}',
  outfits: { elora: 'female-dress-red' },
  caption: 'Your phone died. We almost didn\'t find each other. But somehow, in the crowd of Serrano, we did. Thigh-high boots, a cream dress, and the most beautiful woman I\'d ever seen.',
  noPhoto: true,
  dialogue: [
    { action: 'enea-wait-right' },
    { speaker: 'enea', text: 'She\'s not coming... her phone must have died.' },
    { action: 'elora-enter-left' },
    { action: 'pause-beat', duration: 800 },
    { speaker: 'elora', text: 'Enea? I\'m so sorry\u2014my phone died!' },
    { speaker: 'enea', text: 'You came. You actually came.', effect: 'blush' },
    { speaker: 'elora', text: 'Of course I did. Now... where are you taking me?' },
    { speaker: 'enea', text: 'Tacos and margaritas?' },
    { action: 'look-at-each-other', duration: 1200 },
    { action: 'walk-together-right' },
    { action: 'pause-before-exit', duration: 600 },
    { action: 'exit-right' },
    { action: 'next-episode' },
  ],
  unlock: 'elora',
};

export default episode;

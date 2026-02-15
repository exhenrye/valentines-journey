const episode = {
  id: 4,
  name: 'Geneva',
  date: '2019',
  background: 'mountains',
  icon: '\u26F0\uFE0F',
  outfits: { eneaShirt: 'male-shirt-purple', eneaPants: 'male-pants-green', eneaBoots: 'male-boots', eneaHat: 'male-green-cap', elora: 'female-bodice-green', eloraHat: 'female-blue-cap' },
  caption: 'You left everything\u2014your country, your family, your comfort\u2014to build a life with me. The courage that took still amazes me. You chose us.',
  dialogue: [
    { speaker: 'enea', text: 'She\'s really doing this. She\'s coming.', action: 'enea-alone' },
    { action: 'plane' },
    { speaker: 'enea', text: 'You\'re here. You\'re really here.', action: 'elora-enter' },
    { speaker: 'elora', text: 'I left everything... but I found everything too.' },
    { speaker: 'enea', text: 'We\'re going to build something beautiful.' },
    { action: 'photo' },
  ],
};

export default episode;

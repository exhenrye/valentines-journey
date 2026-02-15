const episode = {
  id: 11,
  name: 'Theo',
  date: 'July 28, 2025',
  background: 'town-sunset',
  icon: '\u2661',
  outfits: { eneaShirt: 'male-shirt-purple', eneaPants: 'male-pants-blue', eneaBoots: 'male-shoes', eneaHat: 'male-purple-cap', elora: 'female-fancy-blue', eloraHat: 'female-blue-cap' },
  caption: 'The most perfect little boy arrived. You made me a father. You made us complete. I didn\'t know my heart could hold this much love.',
  dialogue: [
    { action: 'face-each-other' },
    { speaker: 'elora', text: 'He\'s here. Our baby is here.' },
    { action: 'baby-arrive' },
    { speaker: 'enea', text: 'Hello, Theo. I\'m your dad.' },
    { speaker: 'elora', text: 'Our family is complete.' },
    { action: 'hearts' },
    { action: 'photo' },
  ],
  unlock: 'baby',
};

export default episode;

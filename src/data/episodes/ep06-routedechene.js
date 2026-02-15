const episode = {
  id: 6,
  name: 'Route de Ch\u00eane',
  date: '2020',
  background: 'town-day',
  icon: '\u2661',
  outfits: { eneaShirt: 'male-shirt-white', eneaPants: 'male-pants-purple', eneaBoots: 'male-shoes', eneaHat: 'male-hat2', elora: 'female-bodice-purple', eloraHat: 'female-hat2' },
  caption: 'Our first home. Just us, our animals, and a pandemic. We weathered the storm together. I\'d do it all again with you.',
  dialogue: [
    { action: 'walk-together-start' },
    { speaker: 'enea', text: 'Our very first home.' },
    { speaker: 'elora', text: 'Just us, Totoro, and... whatever 2020 throws at us.' },
    { speaker: 'enea', text: 'We\'ll get through it together. We always do.' },
    { action: 'photo' },
  ],
};

export default episode;

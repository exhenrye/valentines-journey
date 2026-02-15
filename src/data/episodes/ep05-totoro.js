const episode = {
  id: 5,
  name: 'Totoro',
  date: '2019',
  background: 'town-day',
  icon: '\u2661',
  outfits: { eneaShirt: 'male-shirt-orange', eneaPants: 'male-pants-brown', eneaBoots: 'male-boots', eneaHat: 'male-farming-hat', elora: 'female-bodice-orange', eloraHat: 'female-hat1' },
  caption: 'Our first baby. That little bull terrier made us a family. He taught us how to love something together.',
  dialogue: [
    { action: 'walk-together-start' },
    { speaker: 'elora', text: 'Look at that little face...' },
    { speaker: 'enea', text: 'He\'s the one. I can feel it.' },
    { action: 'dog-join' },
    { speaker: 'elora', text: 'Welcome to the family, Totoro!' },
    { action: 'walk-together' },
    { action: 'photo' },
  ],
  unlock: 'dog',
};

export default episode;

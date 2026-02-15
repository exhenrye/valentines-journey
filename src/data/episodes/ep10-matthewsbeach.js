const episode = {
  id: 10,
  name: 'Matthews Beach',
  date: 'May 2025',
  background: 'town-day',
  icon: '\u2661',
  outfits: { eneaShirt: 'male-shirt-orange', eneaPants: 'male-pants-brown', eneaBoots: 'male-shoes', eneaHat: 'male-orange-cap', elora: 'female-dress-red', eloraHat: 'female-hat1' },
  caption: 'A house with a backyard. Rome in the field. This isn\'t just where we live\u2014it\'s where we\'re building our forever.',
  dialogue: [
    { action: 'walk-together-start' },
    { speaker: 'elora', text: 'Our own house. With a backyard for Totoro.' },
    { speaker: 'enea', text: 'This is where we build our forever.' },
    { action: 'photo' },
  ],
};

export default episode;

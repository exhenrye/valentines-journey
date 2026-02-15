const episode = {
  id: 3,
  name: 'Leavenworth',
  date: 'October 2018',
  background: 'christmas-night',
  icon: '\u2708\uFE0F',
  outfits: { eneaShirt: 'male-shirt-green', eneaPants: 'male-pants-blue', eneaBoots: 'male-boots', eneaHat: 'male-santa-hat', elora: 'female-bodice-purple', eloraHat: 'female-santa-hat' },
  caption: 'We were an ocean apart. On our anniversary, I surprised you\u2014flew across the world just to see your face. Every mile was worth it.',
  dialogue: [
    { speaker: 'elora', text: 'I miss him so much today...', action: 'elora-alone' },
    { action: 'plane' },
    { speaker: 'enea', text: 'Surprise, amore.', action: 'enea-enter' },
    { speaker: 'elora', text: 'ENEA?! You flew all this way?!' },
    { speaker: 'enea', text: 'I\'d fly anywhere for you. Happy anniversary.' },
    { action: 'hearts' },
    { action: 'photo' },
  ],
};

export default episode;

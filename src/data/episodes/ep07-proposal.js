const episode = {
  id: 7,
  name: 'The Proposal',
  date: 'May 3, 2022',
  background: 'ancient-temple',
  icon: '\u2661',
  noDog: true, // Joey wasn't in Rome for the proposal
  outfits: { eneaShirt: 'male-shirt-blue', eneaPants: 'male-pants-blue', eneaBoots: 'male-shoes', elora: 'female-dress-blue' },
  caption: 'I asked you to be mine forever. You said yes. The happiest moment of my life\u2014until you kept topping it.',
  photos: [
    'assets/photos/07-proposal/FDEE51FF-5E61-4287-B552-2FCE8603621F.jpg',
    'assets/photos/07-proposal/IMG_2943.jpeg',
    'assets/photos/07-proposal/IMG_3002.jpeg',
    'assets/photos/07-proposal/IMG_3011.jpeg',
    'assets/photos/07-proposal/2306dba4-2d2f-4182-b849-34648d619f1b.jpg',
    'assets/photos/07-proposal/IMG_3017.jpeg',
    'assets/photos/07-proposal/IMG_9566.jpeg',
  ],
  dialogue: [
    { action: 'walk-together-start' },
    { speaker: 'enea', text: 'Hey, can we stop here for a second?' },
    { speaker: 'elora', text: 'What\'s wrong? You\'ve been acting weird all day.' },
    { action: 'face-each-other' },
    { speaker: 'enea', text: 'Nothing\'s wrong. Everything\'s right, actually.' },
    { speaker: 'enea', text: 'Elora... from the first night in Madrid, I knew.', action: 'kneel' },
    { speaker: 'elora', text: 'Enea... are you\u2014' },
    { speaker: 'enea', text: 'Will you marry me?' },
    { speaker: 'elora', text: 'Yes. Yes! Obviously yes.' },
    { action: 'embrace' },
    { speaker: 'elora', text: 'I can\'t believe you actually got me.' },
    { speaker: 'enea', text: 'Happiest moment of my life. Until you keep topping it.' },
    { action: 'look-at-each-other', duration: 1200 },
    { action: 'hearts' },
    { action: 'photo' },
  ],
};

export default episode;

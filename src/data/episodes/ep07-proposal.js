const episode = {
  id: 7,
  name: 'The Proposal',
  date: 'May 3, 2022',
  background: 'ancient-temple',
  icon: '\u2661',
  outfits: { eneaShirt: 'male-shirt-blue', eneaPants: 'male-pants-blue', eneaBoots: 'male-shoes', elora: 'female-dress-blue' },
  caption: 'I asked you to be mine forever. You said yes. The happiest moment of my life\u2014until you kept topping it.',
  dialogue: [
    { action: 'face-each-other' },
    { speaker: 'enea', text: 'Elora... there\'s something I need to ask you.' },
    { speaker: 'elora', text: 'Enea? What\'s going on?' },
    { speaker: 'enea', text: 'Will you marry me?', action: 'kneel' },
    { speaker: 'elora', text: 'YES! A thousand times yes!' },
    { action: 'hearts' },
    { action: 'photo' },
  ],
};

export default episode;

const episode = {
  id: 3,
  name: 'Leavenworth',
  date: 'October 2018',
  background: 'christmas-night',
  icon: '\u2708\uFE0F',
  outfits: { eneaShirt: 'male-shirt-green', eneaPants: 'male-pants-blue', eneaBoots: 'male-boots', eneaHat: 'male-santa-hat', elora: 'female-bodice-purple', eloraHat: 'female-santa-hat' },
  caption: 'We were an ocean apart. On our anniversary, I surprised you\u2014flew across the world just to see your face. Every mile was worth it.',
  dialogue: [
    // Scene 1: Elora alone on their anniversary
    { speaker: 'elora', text: 'I miss him so much today...', action: 'elora-alone' },
    { speaker: 'elora', text: 'Happy anniversary to us... an ocean apart.' },
    { speaker: 'elora', text: 'He\'s so far away right now...' },
    { action: 'elora-exit' },

    // Scene 2: The Journey
    { action: 'plane' },
    { action: 'journey-text', text: 'Geneva \u2192 Seattle \u2192 Leavenworth' },

    // Scene 3: Enea arrives
    { speaker: 'enea', text: 'She has no idea I\'m here.', action: 'enea-arrive' },
    { speaker: 'enea', text: 'I drove for hours through the mountains. Worth every mile.' },

    // Scene 4: The Surprise
    { speaker: 'elora', text: 'ENEA?! What\u2014 How are you HERE?!', action: 'elora-appear' },
    { speaker: 'enea', text: 'Surprise, amore. Happy anniversary.' },
    { speaker: 'elora', text: 'You flew across the world... for me?', effect: 'blush' },
    { speaker: 'enea', text: 'I\'d fly anywhere for you. Every single time.' },
    { action: 'hearts' },
    { action: 'photo' },
  ],
};

export default episode;

import { walkTogetherRight, exitRight, walkTogether, walkTogetherStart, pauseBeforeExit } from './movement.js';
import { eneaWaitRight, eloraEnterLeft, eloraEnter, eloraAlone, eneaAlone, eneaEnter, eneaEnterRight, embrace, faceEachOther, familyArrive, familyTogether } from './characters.js';
import { nextEpisode, plane, dogJoin, babyArrive, restaurantScene, weddingSetup, eloraWalkAisle, kneel } from './events.js';
import { wait as waitAction, pauseBeat, lookAtEachOther, hearts, photo, finale } from './effects.js';

export const ACTION_HANDLERS = {
  'wait': waitAction,
  'enea-wait-right': eneaWaitRight,
  'elora-enter-left': eloraEnterLeft,
  'pause-beat': pauseBeat,
  'look-at-each-other': lookAtEachOther,
  'pause-before-exit': pauseBeforeExit,
  'walk-together-right': walkTogetherRight,
  'exit-right': exitRight,
  'next-episode': nextEpisode,
  'elora-enter': eloraEnter,
  'elora-alone': eloraAlone,
  'enea-alone': eneaAlone,
  'enea-enter': eneaEnter,
  'enea-enter-right': eneaEnterRight,
  'embrace': embrace,
  'walk-together': walkTogether,
  'walk-together-start': walkTogetherStart,
  'face-each-other': faceEachOther,
  'restaurant-scene': restaurantScene,
  'plane': plane,
  'dog-join': dogJoin,
  'baby-arrive': babyArrive,
  'family-arrive': familyArrive,
  'family-together': familyTogether,
  'wedding-setup': weddingSetup,
  'elora-walk-aisle': eloraWalkAisle,
  'kneel': kneel,
  'hearts': hearts,
  'photo': photo,
  'finale': finale,
};

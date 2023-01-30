/* PLOP_INJECT_IMPORT_REDUCER */
import collections from './collections/reducer';
import games from './games/reducer';
import modals from './modals/reducer';
import nft from './nft/reducer';
import nfts from './nfts/reducer';
import notifications from './notifications/reducer';
import profile from './profile/reducer';
import ui from './ui/reducer';
import user from './user/reducer';

export default {
  ui,
  user,
  modals,
  /* PLOP_INJECT_PLACE_REDUCER */
  collections,
  nft,
  notifications,
  nfts,
  profile,
  games,
};

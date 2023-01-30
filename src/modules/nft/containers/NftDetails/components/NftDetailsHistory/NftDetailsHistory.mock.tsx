import { noop } from 'lodash';

import { historyCardPropsMocked } from './components/HistoryCard/HistoryCard.mock';
import { ownerHistoryCardPropsMocked } from './components/OwnerHistoryCard/OwnerHistoryCard.mock';
import { NftDetailsHistoryProps } from './NftDetailsHistory';

export const nftDetailsHistoryPropsMocked: NftDetailsHistoryProps = {
  owners: [ownerHistoryCardPropsMocked, ownerHistoryCardPropsMocked, ownerHistoryCardPropsMocked],
  history: [historyCardPropsMocked, historyCardPropsMocked, historyCardPropsMocked],
  onBuyClick: noop,
  userAddress: '',
};

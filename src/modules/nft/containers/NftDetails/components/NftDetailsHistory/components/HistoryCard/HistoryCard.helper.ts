import { Method } from 'types/api/enums';

export const methodToText: Record<Method, (amount: number) => string> = {
  [Method.Burn]: (amount) => `Burned ${amount} ${amount > 1 ? 'tokens' : 'token'}`,
  [Method.Buy]: (amount) => `Purchased ${amount} ${amount > 1 ? 'tokens' : 'token'} for`,
  [Method.Listing]: (amount) => `Listed ${amount} ${amount > 1 ? 'tokens' : 'token'} for`,
  [Method.Mint]: (amount) => `Minted ${amount} ${amount > 1 ? 'tokens' : 'token'}`,
  [Method.Transfer]: (amount) => `Transferred ${amount} ${amount > 1 ? 'tokens' : 'token'} to`,
  [Method.AuctionWin]: (amount) => `Win ${amount || 1} ${amount > 1 ? 'tokens' : 'token'}`,
  [Method.like]: () => 'Like',
  [Method.follow]: () => 'Follow',
  [Method.Bet]: () => 'Bet',
};

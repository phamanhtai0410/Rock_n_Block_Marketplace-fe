import { Nullable } from 'types';
import { PromotionSettings } from 'types/api/PromotionSettings';
import { TokenFull } from 'types/api/TokenFull';
import { TokenSlim } from 'types/api/TokenSlim';

export type NftState = {
  nft: Nullable<TokenFull>;
  promotion: Nullable<PromotionSettings[]>;
  ownedTokenAmount: string;
  relatedTokens: TokenSlim[];
};

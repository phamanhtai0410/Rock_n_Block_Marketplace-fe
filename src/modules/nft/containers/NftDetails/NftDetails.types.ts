import { Ownership } from 'types/api/Ownership';

export type SetBuyMultipleModalCallback = (buyData: Ownership[]) => void;

export type ListForSaleCallback = (prop: {
  newPrice: number;
  newCurrency?: string;
  amount?: number;
  listingType?: 'Price' | 'Auction' | 'Time Auction';
  auctionDuration?: number;
}) => void;

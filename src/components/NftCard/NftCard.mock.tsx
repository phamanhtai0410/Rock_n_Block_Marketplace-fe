import { mockUnit } from 'assets/images';
import { Currency } from 'types/api/Currency';
import { Standard } from 'types/api/enums';
import { Network } from 'types/api/Network';

import { NftCardProps } from './NftCard';

export const mockedCurrency: Currency = {
  rate: '18',
  symbol: 'CHTH',
  name: 'CHTH full name',
  image: '',
};

export const mockedNetwork: Network = {
  ipfsIcon: '',
  name: 'BSC',
  nativeSymbol: 'BNB',
  currencies: [mockedCurrency],
  exchangeAddress: '',
  fabric1155Address: '',
  fabric721Address: '',
  platformFeePercentage: '',
  promotionAddress: '',
};
export const nftCardPropsMocked: NftCardProps = {
  isSelling: true,
  isTimedAucSelling: false,
  likeCount: 23,
  id: 4566,
  bids: [],
  name: 'great warrior',
  media: mockUnit,
  animation: '',
  price: '23',
  currency: mockedCurrency,
  usdPrice: 12,
  collection: {
    network: mockedNetwork,
    standard: Standard.ERC721,
    symbol: 'ETH',
    creatorRoyalty: '1',
  },
  description: 'What a great token!',
  isLiked: true,
  format: '',
  network: mockedNetwork,
  creator: {
    avatar: 'https://www.nme.com/wp-content/uploads/2021/01/012621-diablo-ii-windows-front-cover-696x442.jpg',
    address: '0xxslasfl312412ds',
    name: 'Ivan Ivanov',
  },
  hasDigitalKey: false,
  isAucSelling: false,
  totalSupply: 0,
};

export const nftCardAuctionPropsMocked: NftCardProps = {
  isSelling: false,
  isTimedAucSelling: true,
  likeCount: 23,
  id: 4567,
  bids: [],
  name: 'great warrior',
  media: mockUnit,
  animation: '',
  price: '23',
  currency: mockedCurrency,
  usdPrice: 12,
  collection: {
    network: mockedNetwork,
    standard: Standard.ERC721,
    symbol: 'ETH',
    creatorRoyalty: '0',
  },
  description: 'What a great token!',
  isLiked: true,
  format: '',
  network: mockedNetwork,
  creator: {
    avatar: 'https://www.nme.com/wp-content/uploads/2021/01/012621-diablo-ii-windows-front-cover-696x442.jpg',
    address: '0xxslasfl312412ds',
    name: 'Ivan Ivanov',
  },
  hasDigitalKey: false,
  isAucSelling: true,
  totalSupply: 0,
};

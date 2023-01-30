import { Add, AddDouble, AddTripple } from 'components/Icon/components';
import { NftStandard } from 'types';
/* eslint-disable */

export const createVariants = [
  {
    icon: Add,
    title: 'Single NFT',
    linkTo: `/create/nft?standard=${NftStandard.ERC721}`,
  },
  {
    icon: AddDouble,
    title: 'Multiple NFT',
    linkTo: `/create/nft?standard=${NftStandard.ERC1155}`,
  },
  {
    icon: AddTripple,
    title: 'Collection NFT',
    linkTo: 'collection',
  },
];

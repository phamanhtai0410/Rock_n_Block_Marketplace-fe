import React from 'react';
import { Box, Container } from '@mui/material';

import { NftCardSkeleton } from './components/NftCardSkeleton';
import { NftCard } from './NftCard';
import { nftCardAuctionPropsMocked, nftCardPropsMocked } from './NftCard.mock';

export default {
  title: 'components/NftCard',
  component: NftCard,
};

export const Default: React.FC = () => (
  <Box style={{ maxWidth: 500 }}>
    <Container sx={{ display: 'flex' }}>
      <NftCard {...nftCardPropsMocked} />
      <NftCard {...nftCardAuctionPropsMocked} />
      <NftCard {...nftCardPropsMocked} />
      <NftCard {...nftCardAuctionPropsMocked} />
      <NftCardSkeleton />
    </Container>
  </Box>
);

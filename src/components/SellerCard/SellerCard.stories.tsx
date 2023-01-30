import React from 'react';
import { Box } from '@mui/material';

import { SellerCardSkeleton } from './components/SellerCardSkeleton';
import { SellerCard, SellerCardProps } from './SellerCard';
import { sellersMock } from './SellerCard.mock';

export default {
  title: 'components/SellerCard',
  component: SellerCard,
};

export const Default: React.FC = () => (
  <Box style={{ maxWidth: 500 }}>
    {sellersMock.map((seller: SellerCardProps) => (
      <SellerCard {...seller} key={seller.place} />
    ))}
    <SellerCardSkeleton />
  </Box>
);

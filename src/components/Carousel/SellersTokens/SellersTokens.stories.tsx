/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { nftCardAuctionPropsMocked, nftCardPropsMocked } from 'components/NftCard/NftCard.mock';
import { selectPropsMocked } from 'components/Select/Select.mock';
import { sellersMock } from 'components/SellerCard/SellerCard.mock';
import { useWindowState } from 'hooks';

import { SellersTokens } from './SellersTokens';

export default {
  title: 'components/SellersTokens',
  component: SellersTokens,
};

export const Default: React.FC = () => {
  const { width } = useWindowState();
  const [selectedTrendingType, setSelectedTrendignType] = useState(selectPropsMocked.menuItems[0].value);
  const mockNfts = [...Array(4).fill(nftCardPropsMocked), ...Array(4).fill(nftCardAuctionPropsMocked)].sort(
    () => Math.random() - 0.5,
  );
  return (
    <>
      <Typography variant="h6">Product SellersTokens (width: {width}px)</Typography>
      <SellersTokens
        sellers={sellersMock}
        featured={mockNfts}
        trending={mockNfts}
        categories={selectPropsMocked.menuItems}
        category={selectedTrendingType}
        onCategoryChange={(event) => setSelectedTrendignType(event.target.value)}
      />
    </>
  );
};

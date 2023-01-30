/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { YellowFire, YellowLightning } from 'components/Icon/components';
import { NftCard } from 'components/NftCard';
import { nftCardAuctionPropsMocked, nftCardPropsMocked } from 'components/NftCard/NftCard.mock';
import { Select } from 'components/Select';
import { selectPropsMocked } from 'components/Select/Select.mock';
import { SellerCard } from 'components/SellerCard';
import { sellersMock } from 'components/SellerCard/SellerCard.mock';
import { useWindowState } from 'hooks';
import { COLOR_PRIMARY_1 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { flexHelper } from 'utils';

import { Carousel } from './Carousel';

export default {
  title: 'components/Carousel',
  component: Carousel,
};

export const Default: React.FC = () => {
  const { width } = useWindowState();
  const mockNfts = [...Array(4).fill(nftCardPropsMocked), ...Array(4).fill(nftCardAuctionPropsMocked)].sort(
    () => Math.random() - 0.5,
  );
  return (
    <>
      <Typography variant="h6">Product Carousel (width: {width}px)</Typography>
      <Carousel
        header={
          <Box display="flex">
            <Typography
              variant="h4"
              sx={(theme) => ({
                marginRight: theme.spacing(0.5),
              })}
            >
              Top Seller
            </Typography>
            <YellowLightning />
          </Box>
        }
      >
        {sellersMock.map((seller) => (
          <SellerCard {...seller} key={seller.place} />
        ))}
      </Carousel>
      <Carousel
        header={
          <Box display="flex">
            <Typography
              variant="h4"
              sx={(theme) => ({
                marginRight: theme.spacing(0.5),
              })}
            >
              Featured Tokens
            </Typography>
            <YellowLightning />
          </Box>
        }
      >
        {mockNfts.map((nft, index) => (
          <NftCard {...nft} key={index} />
        ))}
      </Carousel>
      <Carousel
        header={
          <Box display="flex">
            <Typography
              variant="h4"
              sx={(theme) => ({
                marginRight: theme.spacing(0.5),
              })}
            >
              Trending In
            </Typography>
            <Select
              menuItems={selectPropsMocked.menuItems}
              defaultValue={selectPropsMocked.menuItems[0].value}
              paperWidth="256px"
              sx={{
                '& .MuiInputBase-input': {
                  color: COLOR_PRIMARY_1,
                  fontSize: '32px',
                  lineHeight: '40px',
                  fontWeight: FontWeights.fontWeightSemiBold,
                  padding: 0,
                  width: '100%',
                },
                '& .MuiSvgIcon-root': {
                  border: 'none',
                  margin: 0,
                  width: '26px',
                  path: {
                    fill: COLOR_PRIMARY_1,
                  },
                },
              }}
            />
            <YellowFire
              sx={{
                ...flexHelper(),
              }}
            />
          </Box>
        }
      >
        {mockNfts.map((nft, index) => (
          <NftCard {...nft} key={index} />
        ))}
      </Carousel>
    </>
  );
};

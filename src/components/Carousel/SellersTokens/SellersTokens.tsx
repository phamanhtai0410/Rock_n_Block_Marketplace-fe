/* eslint-disable react/no-array-index-key */
import { FC } from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { YellowFire, YellowLightning } from 'components/Icon/components';
import { NftCard, NftCardProps } from 'components/NftCard';
import { NftCardSkeleton } from 'components/NftCard/components/NftCardSkeleton';
import { Select } from 'components/Select';
import { SellerCard, SellerCardProps } from 'components/SellerCard';
import { SellerCardSkeleton } from 'components/SellerCard/components/SellerCardSkeleton';
import { useShallowSelector } from 'hooks';
import { CreateAndSell } from 'modules/landing/containers';
import nftsActionTypes from 'store/nfts/actionTypes';
import uiSelector from 'store/ui/selectors';
import userActionTypes from 'store/user/actionTypes';
import { FontWeights } from 'theme/Typography';
import { RequestStatus } from 'types';
import { flexHelper } from 'utils';

import { Carousel } from '../Carousel';

import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/swiper.min.css';

export interface SellersTokensProps {
  sellers: SellerCardProps[];
  featured: NftCardProps[];
  trending: NftCardProps[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any;
  category?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCategoryChange: (value: any) => void;
}

export const SellersTokens: FC<SellersTokensProps> = ({
  sellers,
  featured,
  trending,
  categories,
  category,
  onCategoryChange,
}) => {
  const theme = useTheme();
  const getHomeDataStatus = useShallowSelector(uiSelector.getProp(userActionTypes.GET_HOME_DATA));
  const isHomeDataLoading = getHomeDataStatus === RequestStatus.REQUEST;
  const isTrendingTokensStatus = useShallowSelector(uiSelector.getProp(nftsActionTypes.GET_TRENDING_TOKENS));
  const isTrendingTokensLoading = isTrendingTokensStatus === RequestStatus.REQUEST;

  return (
    <>
      <Container>
        <CreateAndSell />
      </Container>

      {!!featured.length && (
        <Carousel
          loop
          sx={{ mt: 12.5 }}
          header={
            <Box sx={{ ...flexHelper('flex-start', 'center'), mb: theme.spacing(3.5) }}>
              <Typography
                variant="h4"
                letterSpacing="-0.01em"
                sx={{
                  marginRight: theme.spacing(0.75),
                }}
              >
                Featured Tokens
              </Typography>
              <YellowLightning />
            </Box>
          }
        >
          {isHomeDataLoading
            ? Array(4)
                .fill('')
                .map((_, index) => <NftCardSkeleton key={index} />)
            : featured.map((nft) => <NftCard key={nft.id} {...nft} />)}
        </Carousel>
      )}
      <Carousel
        sx={{ mt: 12.5 }}
        loop
        header={
          <Box
            sx={{
              ...flexHelper('flex-start', 'center'),
              flexWrap: { xs: 'wrap', sm: 'noWrap' },
              mb: theme.spacing(3.5),
            }}
          >
            <Typography
              variant="h4"
              letterSpacing="-0.01em"
              sx={{
                marginRight: theme.spacing(1),
              }}
            >
              Trending In
            </Typography>
            <Box sx={{ ...flexHelper(), flexDirection: 'row' }}>
              <Select
                menuItems={[{ value: '', label: 'all' }, ...categories]}
                paperWidth="256px"
                value={category}
                onChange={onCategoryChange}
                displayEmpty
                sx={{
                  marginLeft: { sm: theme.spacing(1.25) },
                  select: { alignItems: 'initial' },
                  '& .MuiInputBase-input': {
                    color: theme.themeColors.colorTrendingCategory,
                    fontSize: '32px',
                    lineHeight: '40px',
                    fontWeight: FontWeights.fontWeightSemiBold,
                    padding: 0,
                    width: '100%',
                    textTransform: 'lowercase',
                  },
                  '& .MuiSvgIcon-root': {
                    border: 'none',
                    m: 0,
                    width: '26px',
                    path: {
                      fill: theme.themeColors.colorTrendingCategory,
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
          </Box>
        }
      >
        {isHomeDataLoading || isTrendingTokensLoading
          ? Array(4)
              .fill('')
              .map((_, index) => <NftCardSkeleton key={index} />)
          : trending.map((nft) => <NftCard {...nft} key={nft.id} />)}
      </Carousel>

      <Carousel
        loop
        sx={{ mt: 12 }}
        header={
          <Box sx={{ ...flexHelper('flex-start', 'center'), mb: theme.spacing(3.5) }}>
            <Typography
              variant="h4"
              letterSpacing="-0.01em"
              sx={{
                mr: theme.spacing(0.75),
              }}
            >
              Top Seller
            </Typography>
            <YellowLightning />
          </Box>
        }
      >
        {isHomeDataLoading
          ? Array(4)
              .fill('')
              .map((_, index) => <SellerCardSkeleton key={index} />)
          : sellers.map((seller) => <SellerCard {...seller} key={seller.place} />)}
      </Carousel>
    </>
  );
};

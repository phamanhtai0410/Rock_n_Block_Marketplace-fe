import { useEffect } from 'react';
import { Box } from '@mui/material';
import { Spinner } from 'components';
import { useShallowSelector } from 'hooks';
import nftActionTypes from 'store/nft/actionTypes';
import uiSelectors from 'store/ui/selectors';
import userActionTypes from 'store/user/actionTypes';
import { RequestStatus } from 'types';

export const GlobalLoader = () => {
  const {
    [nftActionTypes.LIKE]: likeStatus,
    [userActionTypes.FOLLOW]: followStatus,
    [userActionTypes.GET_RATES]: getRatesStatus,
    [nftActionTypes.SET_ON_SALE]: listForSaleStatus,
    [nftActionTypes.SET_ON_AUCTION]: listForAuctionStatus,
    [nftActionTypes.REMOVE_FROM_SALE]: removeFromSaleStatus,
  } = useShallowSelector(uiSelectors.getUI);

  const shouldShowLoader = [
    likeStatus,
    followStatus,
    getRatesStatus,
    listForSaleStatus,
    removeFromSaleStatus,
    listForAuctionStatus,
  ].includes(RequestStatus.REQUEST);

  useEffect(() => {
    const { body } = document;
    if (shouldShowLoader) {
      body.classList.add('stopScrolling');
    } else {
      body.classList.remove('stopScrolling');
    }
  }, [shouldShowLoader]);

  return shouldShowLoader ? (
    <Box
      sx={{
        svg: { zIndex: 21 },
        zIndex: 1299,
        background: 'rgba(0,0,0,.5)',
        width: '100vw',
        height: '100%',
        position: 'fixed',
      }}
    >
      <Spinner size="xl" position="center" />
    </Box>
  ) : null;
};

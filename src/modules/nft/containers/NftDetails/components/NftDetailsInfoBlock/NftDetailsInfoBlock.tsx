import { FC } from 'react';
import { Grid, Stack } from '@mui/material';

import { NftDetailsBid } from '../NftDetailsBid';
import { NftDetailsBuy, NftDetailsBuyProps } from '../NftDetailsBuy';
import {
  NftDetailsCollectionProps,
  NftDetailsCreatorCollection,
  NftDetailsCreatorCollectionProps,
} from '../NftDetailsCreatorCollection';
import { NftDetailsDescription, NftDetailsDescriptionProps } from '../NftDetailsDescription';
import { NftDetailsHistory, NftDetailsHistoryProps } from '../NftDetailsHistory';

export interface NftDetailsInfoBlockProps {
  descriptionProps: NftDetailsDescriptionProps;
  buyProps: NftDetailsBuyProps;
  creatorProps: NftDetailsCreatorCollectionProps;
  collectionProps: NftDetailsCollectionProps;
  gameProps: NftDetailsCreatorCollectionProps;
  historyProps: NftDetailsHistoryProps;
  bidProps: {
    avatar?: string;
    name?: string;
    endAuction?: string;
    id?: string;
  };
  isOwner: boolean;
  isSeller: boolean;
  isOtherSeller: boolean;
  isAucSelling: boolean;
  isHighestBid: boolean;
  onBidClick: () => void;
  onAcceptBidClick: () => void;
  openConnectModal: () => void;
  isLogged: boolean;
}

export const NftDetailsInfoBlock: FC<NftDetailsInfoBlockProps> = ({
  descriptionProps,
  buyProps,
  creatorProps,
  collectionProps,
  gameProps,
  historyProps,
  isOwner,
  bidProps: { name, avatar, endAuction, id },
  isSeller,
  isOtherSeller,
  isAucSelling,
  isHighestBid,
  onBidClick,
  onAcceptBidClick,
  openConnectModal,
  isLogged,
}) => {
  return (
    <Stack
      sx={{
        width: '100%',
      }}
    >
      <NftDetailsDescription {...descriptionProps} collectionId={collectionProps.id} sx={{ mb: 3, order: 1 }} />
      {isOtherSeller && !isAucSelling && (
        <NftDetailsBuy
          {...buyProps}
          sx={{ mb: 3, order: { xs: 3, sm: 3, md: 2 } }}
          isLogged={isLogged}
          openConnectModal={openConnectModal}
        />
      )}
      {isAucSelling && (
        <NftDetailsBid
          currentHighestBid={{
            amount: String(buyProps.price),
            currency: buyProps.currency,
            usdAmount: String(buyProps.usdPrice),
            address: '',
            name,
            avatar,
            id,
          }}
          sx={{ mb: 3, order: { xs: 3, sm: 3, md: 2 } }}
          isHighestBid={isHighestBid}
          onBidClick={onBidClick}
          onAcceptBidClick={onAcceptBidClick}
          isOwner={isOwner}
          endAuction={endAuction}
          isLogged={isLogged}
          openConnectModal={openConnectModal}
        />
      )}
      <Grid container sx={{ mb: 3, order: { xs: 2, sm: 2, md: 3 } }} spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <NftDetailsCreatorCollection {...creatorProps} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <NftDetailsCreatorCollection {...collectionProps} />
        </Grid>
        {gameProps.name && (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <NftDetailsCreatorCollection {...gameProps} />
          </Grid>
        )}
      </Grid>
      <NftDetailsHistory sx={{ order: 4 }} {...historyProps} />
    </Stack>
  );
};

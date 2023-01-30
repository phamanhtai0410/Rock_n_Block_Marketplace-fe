import { FC } from 'react';
import { Box, useTheme } from '@mui/material';
import { LikeButton, ShareButton } from 'components';
import { Rates } from 'modules/create/containers';
import { flexHelper } from 'utils';

import { ListForSaleCallback } from '../../NftDetails.types';

import { OpenContolMenuButton } from './components';

export interface NftDetailsControlBlockProps {
  onLikeClick: () => void;
  isLiked: boolean;
  likeCount: number;
  isOwner: boolean;
  isSeller: boolean;
  currency: string;
  price: string | number;
  usdPrice: string | number;
  onUpdatePrice: ListForSaleCallback;
  onListForSale: ListForSaleCallback;
  onBurn: (amount?: number) => void;
  onTransfer: (recipientAddress: string, amount?: number) => void;
  isMultiple: boolean;
  rates: Rates[];
  onRemoveFromSale: () => void;
  ownedTokenAmount?: string;
  isHighestBid: boolean;
  onPromoteClick: () => void;
  royalties?: string;
  serviceFee?: string;
  isImported?: boolean;
}

export const NftDetailsControlBlock: FC<NftDetailsControlBlockProps> = ({
  onLikeClick,
  isLiked,
  likeCount,
  isOwner,
  usdPrice,
  currency,
  isSeller,
  price,
  onUpdatePrice,
  onListForSale,
  onBurn,
  onTransfer,
  isMultiple,
  rates,
  onRemoveFromSale,
  ownedTokenAmount,
  isHighestBid,
  onPromoteClick,
  royalties,
  serviceFee,
  isImported,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        ...flexHelper(),
        flexDirection: 'column',
        '& > *:not(:last-child)': {
          mb: 2,
        },
        [theme.breakpoints.down('md')]: {
          flexDirection: 'row',
          '& > *:not(:last-child)': {
            mb: 0,
            mr: 2,
          },
        },
      }}
    >
      <ShareButton variant="round" url={window.location.href} />
      <LikeButton variant="round" onClick={onLikeClick} isLiked={isLiked} likeCount={likeCount} />
      {isOwner && (
        <OpenContolMenuButton
          isSeller={isSeller}
          currency={currency}
          price={price}
          usdPrice={usdPrice}
          onUpdatePrice={onUpdatePrice}
          onListForSale={onListForSale}
          onBurn={onBurn}
          onTransfer={onTransfer}
          isMultiple={isMultiple}
          rates={rates}
          onRemoveFromSale={onRemoveFromSale}
          ownedTokenAmount={ownedTokenAmount}
          isHighestBid={isHighestBid}
          onPromoteClick={onPromoteClick}
          royalties={royalties}
          serviceFee={serviceFee}
          isImported={isImported}
        />
      )}
    </Box>
  );
};

import { FC, useCallback, useEffect, useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { Carousel, QuantityInput } from 'components';
import { Modal, ModalProps } from 'components/Modal';
import { Ownership } from 'types/api/Ownership';
import { flexHelper } from 'utils';

import { OwnerHistoryCard } from '../../NftDetailsHistory/components';

export interface BuyMultipleModalProps extends ModalProps {
  onBuyMultiple: (sellerId: string, tokenAmount?: number, tokenPrice?: string, tokenAddress?: string) => void;
  sellers: Ownership[];
  userAddress: string;
}

export const BuyMultipleModal: FC<BuyMultipleModalProps> = ({ open, onClose, onBuyMultiple, sellers, userAddress }) => {
  const initTokenAmount = sellers.map(() => 1);
  const theme = useTheme();
  const [amounts, setAmounts] = useState<number[]>(initTokenAmount);
  const handleChangeAmount = useCallback(
    (newAmount: number, index: number) => {
      const newAmounts = [...amounts];
      newAmounts[index] = newAmount;
      setAmounts(newAmounts);
    },
    [amounts],
  );

  const handleClose = () => {
    onClose();
    setAmounts(initTokenAmount);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      isThinCross
      sx={{
        maxWidth: 448,
        width: '100%',
        margin: '0 auto',
        paddind: 4,
        borderRadius: '20px !important',
        overflowX: 'hidden',
      }}
      title="Buy multiple NFT"
    >
      <Typography align="center" variant="body1" className="s-weak">
        Select the owner to purchase the NFT
      </Typography>
      <Carousel
        isSmall
        swiperProps={{
          slidesPerView: 1,
          spaceBetween: 16,
          breakpoints: undefined,
        }}
      >
        {sellers.map((seller, index) => (
          <Box
            key={seller.url}
            sx={{
              padding: theme.spacing(3, 2, 2),
              background: theme.themeColors.colorBackground,
              borderRadius: '16px',
              mt: 4,
              ...flexHelper(),
              flexDirection: 'column',
            }}
          >
            <OwnerHistoryCard
              {...seller}
              userAddress={userAddress}
              shouldShowButton={false}
              sx={{ marginRight: 'auto' }}
            />
            <QuantityInput
              value={amounts[index] || 1}
              onChange={(newAmount) => handleChangeAmount(newAmount, index)}
              size="small"
              maxAmount={Number(seller?.sellingQuantity)}
            />
            <Button
              size="large"
              variant="contained"
              onClick={() => {
                handleClose();
                onBuyMultiple(seller?.url || '', amounts[index], seller.price, seller.currency.address);
              }}
              disabled={false}
              sx={{ textTransform: 'none', mt: 2 }}
            >
              Buy
            </Button>
          </Box>
        ))}
      </Carousel>
    </Modal>
  );
};

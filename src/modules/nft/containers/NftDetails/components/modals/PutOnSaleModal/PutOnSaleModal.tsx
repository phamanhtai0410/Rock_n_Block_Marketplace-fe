import { FC, useCallback, useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { Modal, ModalProps } from 'components/Modal';
import { ListForSale, Rates } from 'modules/create/containers';
import { ListForSaleCallback } from 'modules/nft/containers/NftDetails/NftDetails.types';
import { COLOR_NEUTRALS_4 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { Nullable } from 'types';
import { flexHelper } from 'utils';

// TODO: change ALL any types to necessary
export interface PutOnSaleModal extends ModalProps {
  isMultiple?: boolean;
  onPutOnSale: ListForSaleCallback;
  rates: Rates[];
  ownedTokenAmount?: string;
  royalties?: string;
  serviceFee?: string;
}

export const PutOnSaleModal: FC<PutOnSaleModal> = ({
  open,
  onClose,
  rates,
  isMultiple,
  onPutOnSale,
  ownedTokenAmount,
  royalties,
  serviceFee,
}) => {
  const theme = useTheme();

  const [saleData, setSaleData] = useState<Nullable<any>>(null);

  const handleSetSaleData = useCallback((newState: any) => {
    setSaleData(newState);
  }, []);

  const isContinueButtonDisabled = saleData?.amount <= 0 || Number(saleData?.priceValue) <= 0;

  return (
    <Modal
      open={open}
      onClose={onClose}
      isThinCross
      sx={{
        maxWidth: 448,
        width: '100%',
        margin: '0 auto',
        paddind: 4,
        borderRadius: '20px !important',
      }}
      title={
        <Typography
          variant="h4"
          fontWeight={FontWeights.fontWeightSemiBold}
          color={theme.themeColors.colorsNftDetailsModalsTitle}
        >
          Put on sale
        </Typography>
      }
    >
      <ListForSale
        rates={rates}
        maxAmount={Number(ownedTokenAmount)}
        isMultiple={isMultiple}
        updateOuterState={handleSetSaleData}
        isModal
      />
      <Box sx={{ ...flexHelper('space-between') }} mt={1}>
        <Typography variant="body1" color={COLOR_NEUTRALS_4}>
          Service fee %
        </Typography>
        <Typography noWrap variant="body1" maxWidth="60%" color={theme.themeColors.colorTabOutlinedTextActive}>
          {`${serviceFee} %`}
        </Typography>
      </Box>
      {royalties && (
        <Box sx={{ ...flexHelper('space-between') }} mt={1}>
          <Typography variant="body1" color={COLOR_NEUTRALS_4}>
            Royalties %
          </Typography>
          <Typography noWrap variant="body1" maxWidth="60%" color={theme.themeColors.colorTabOutlinedTextActive}>
            {`${royalties} %`}
          </Typography>
        </Box>
      )}
      <Box sx={{ ...flexHelper(), flexDirection: 'column', mt: 4 }}>
        <Button
          size="large"
          variant="contained"
          onClick={() => {
            onClose();
            onPutOnSale({
              newPrice: Number(saleData?.priceValue),
              newCurrency: saleData?.selectedCurrency.symbol,
              amount: saleData?.amount,
              listingType: saleData?.listType,
              auctionDuration: saleData?.selectedTimestamp,
            });
          }}
          sx={{ textTransform: 'none', width: '100%' }}
          disabled={isContinueButtonDisabled}
        >
          Continue
        </Button>

        <Button
          size="large"
          variant="outlined"
          onClick={onClose} // TODO check types and change
          sx={{ textTransform: 'none', width: '100%', mt: theme.spacing(2) }}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

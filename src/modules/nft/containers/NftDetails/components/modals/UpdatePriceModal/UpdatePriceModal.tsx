/* eslint-disable max-len */
import { FC, useMemo } from 'react';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import BigNumber from 'bignumber.js';
import { Modal, ModalProps } from 'components/Modal';
import { useValidateInputField, ValidationTypes } from 'hooks';
import { Rates } from 'modules/create/containers';
import { COLOR_NEUTRALS_4 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { flexHelper, formatCurrency } from 'utils';
import { smartRound } from 'utils/accurateToFixed';

import { ListForSaleCallback } from '../../../NftDetails.types';

export interface UpdatePriceModalProps extends ModalProps {
  currency: string;
  price: string | number;
  rates: Rates[];
  onUpdatePrice: ListForSaleCallback;
}

export const UpdatePriceModal: FC<UpdatePriceModalProps> = ({
  open,
  onClose,
  currency,
  onUpdatePrice,
  price,
  rates,
}) => {
  const theme = useTheme();

  const [inputValue, handleInputChange, setInputValue] = useValidateInputField({ type: ValidationTypes.number });

  const priceInUsd = useMemo(() => {
    const selectedToken = rates.find((tokenRate) => tokenRate.symbol === currency);
    if (selectedToken && inputValue) {
      return new BigNumber(selectedToken.rate).multipliedBy(inputValue).toFixed(2);
    }
    return '0.00';
  }, [rates, inputValue, currency]);

  const handleClose = () => {
    onClose();
    setInputValue('');
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
      }}
      title="Update price"
    >
      <Typography
        align="center"
        variant="body1"
        className="s"
        sx={{
          color: theme.themeColors.colorModalsText,
        }}
      >
        Current price
      </Typography>
      <Typography
        align="center"
        variant="body1"
        className="bold"
        sx={{
          mt: 2,
          fontSize: '24px',
          fontWeight: FontWeights.fontWeightSemiBold,
          textTransform: 'uppercase',
          pb: 2,
          mb: 1.5,
          borderBottom: theme.themeColors.colorModalsBorderBottom,
        }}
      >
        {`${smartRound(Number(price))} ${currency}`}
      </Typography>
      <Typography
        align="center"
        variant="body1"
        sx={{
          mt: 2,
          fontSize: '12px',
          color: theme.themeColors.colorModalsText,
          fontWeight: FontWeights.fontWeightBold,
        }}
      >
        NEW PRICE
      </Typography>
      <TextField
        onChange={handleInputChange}
        value={inputValue}
        sx={{
          width: '100%',
          margin: '0 auto',
          fontSize: '20px',
          mt: 1.5,
          '&:after': {
            content: '""',
            mt: 1.5,
            borderBottom: theme.themeColors.colorModalsBorderBottom,
          },
        }}
        placeholder="0.00"
        InputProps={{
          endAdornment: currency,
        }}
      />
      <Box sx={{ ...flexHelper('space-between') }} mt={1.5}>
        <Typography variant="body1" color={COLOR_NEUTRALS_4}>
          Price in USD
        </Typography>
        <Typography noWrap variant="body1" maxWidth="60%" color={theme.themeColors.colorTabOutlinedTextActive}>
          {formatCurrency(priceInUsd)}
        </Typography>
      </Box>
      <Box sx={{ ...flexHelper(), flexDirection: 'column', mt: 4 }}>
        <Button
          size="large"
          variant="contained"
          onClick={() => {
            handleClose();
            onUpdatePrice({ newPrice: +inputValue });
            setInputValue('');
          }}
          sx={{ textTransform: 'none', width: '100%' }}
        >
          Update
        </Button>

        <Button
          size="large"
          variant="outlined"
          onClick={handleClose}
          sx={{ textTransform: 'none', width: '100%', mt: theme.spacing(2) }}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

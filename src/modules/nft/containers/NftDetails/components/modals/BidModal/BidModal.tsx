/* eslint-disable max-len */
import { FC, useMemo } from 'react';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { Modal, ModalProps } from 'components/Modal';
import { useValidateInputField, ValidationTypes } from 'hooks';
import { FontWeights } from 'theme/Typography';
import { flexHelper } from 'utils';

export interface BidModalProps extends ModalProps {
  userBalance: string | number;
  currentHighestBid: {
    amount: string;
    currency: string;
    address: string;
    usdAmount: number;
  };
  isHighestbid: boolean;
  onBid: (amount: number) => void;
}

export const BidModal: FC<BidModalProps> = (props) => {
  const { open, onClose, currentHighestBid, userBalance, isHighestbid, onBid } = props;
  const theme = useTheme();

  const [inputValue, handleInputChange] = useValidateInputField({ type: ValidationTypes.number });

  const isBidButtonDisabled = useMemo(() => {
    if (!isHighestbid) {
      return +currentHighestBid.amount > +inputValue || +userBalance < +inputValue;
    }
    return +currentHighestBid.amount >= +inputValue || +userBalance < +inputValue;
  }, [isHighestbid, currentHighestBid.amount, inputValue, userBalance]);

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
      title="Place a bid"
    >
      <Typography align="center" variant="body1" className="s-weak">
        You are about to place a bit for NFTMAC
      </Typography>
      <Typography
        align="center"
        variant="body1"
        className="bold"
        sx={{
          mt: 4,
          fontSize: '24px',
          fontWeight: FontWeights.fontWeightSemiBold,
        }}
      >
        Your bid
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
        Enter bid
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
          endAdornment: currentHighestBid.currency,
        }}
      />
      <Box sx={{ ...flexHelper('space-between'), mt: theme.spacing(1.5) }}>
        <Typography variant="body2" sx={{ color: theme.themeColors.colorModalsText }}>
          Your balance:
        </Typography>
        <Typography variant="body2">{`${(+userBalance).toFixed(2)} ${currentHighestBid.currency}`}</Typography>
      </Box>
      <Box sx={{ ...flexHelper(), flexDirection: 'column', mt: 4 }}>
        <Button
          size="large"
          variant="contained"
          onClick={() => {
            onBid(+inputValue);
            onClose();
          }}
          disabled={isBidButtonDisabled}
          sx={{ textTransform: 'none', width: '100%' }}
        >
          Place a bid
        </Button>

        <Button
          size="large"
          variant="outlined"
          onClick={onClose}
          sx={{ textTransform: 'none', width: '100%', mt: theme.spacing(2) }}
        >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

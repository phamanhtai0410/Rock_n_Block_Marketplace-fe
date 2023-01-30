import { FC, useCallback, useState } from 'react';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { Modal, ModalProps, QuantityInput } from 'components';
import { useShallowSelector, useValidateInputField, ValidationTypes } from 'hooks';
import { useWalletConnectorContext } from 'services';
import userSelector from 'store/user/selectors';
import { COLOR_NEUTRALS_4 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { flexHelper } from 'utils';

export interface TransferModalProps extends ModalProps {
  isMultiple?: boolean;
  onTransfer: (recipientAddress: string, amount?: number) => void;
  ownedTokenAmount?: string;
}

export const TransferModal: FC<TransferModalProps> = ({ open, onClose, onTransfer, isMultiple, ownedTokenAmount }) => {
  const theme = useTheme();

  const { walletService } = useWalletConnectorContext();
  const { chain } = useShallowSelector(userSelector.getUser);

  const [transferAddress, handleTransferAddressChange, setTransferAddress] = useValidateInputField({
    type: ValidationTypes.string,
  });

  const [transferAmount, setTransferAmount] = useState(1);
  const handleChangeTransferAmount = useCallback((newAmount: number) => {
    setTransferAmount(newAmount);
  }, []);

  const isButtonDisabled = !walletService.Web3(chain.rpc).utils.isAddress(transferAddress);

  const handleClose = () => {
    onClose();
    setTransferAmount(1);
    setTransferAddress('');
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
      title={
        <Typography
          variant="h4"
          fontWeight={FontWeights.fontWeightSemiBold}
          color={theme.themeColors.colorsNftDetailsModalsTitle}
        >
          Transfer token
        </Typography>
      }
    >
      <Typography align="center" variant="body1" className="s-weak" color={COLOR_NEUTRALS_4}>
        You can transfer tokens from your address to another
      </Typography>

      {isMultiple && (
        <QuantityInput
          value={+transferAmount}
          onChange={handleChangeTransferAmount}
          maxAmount={Number(ownedTokenAmount)}
        />
      )}
      <Typography variant="h5" fontWeight={FontWeights.fontWeightSemiBold} mt={4}>
        Receiver address
      </Typography>
      <Typography
        align="center"
        variant="body1"
        sx={{
          mt: 2,
          fontSize: '12px',
          color: theme.themeColors.colorModalsText,
          fontWeight: FontWeights.fontWeightBold,
          lineHeight: '12px',
          textTransform: 'uppercase',
        }}
      >
        Address
      </Typography>
      <TextField
        onChange={handleTransferAddressChange}
        value={transferAddress}
        sx={{
          width: '100%',
          mt: 1.5,
        }}
        placeholder="Paste address"
      />
      <Box sx={{ ...flexHelper(), flexDirection: 'column', mt: 4 }}>
        <Button
          size="large"
          variant="contained"
          onClick={() => {
            handleClose();
            onTransfer(transferAddress, Number(transferAmount));
          }}
          disabled={isButtonDisabled}
          sx={{ textTransform: 'none', width: '100%' }}
        >
          Continue
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

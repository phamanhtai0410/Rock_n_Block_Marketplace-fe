import { FC, useCallback, useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { QuantityInput } from 'components';
import { Fire } from 'components/Icon/components';
import { Modal, ModalProps } from 'components/Modal';
import { COLOR_PRIMARY_3 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { flexHelper } from 'utils';

export interface BurnModalProps extends ModalProps {
  isMultiple?: boolean;
  onBurn: (amount: number) => void;
  ownedTokenAmount?: string;
}

export const BurnModal: FC<BurnModalProps> = ({ open, onClose, onBurn, isMultiple, ownedTokenAmount }) => {
  const theme = useTheme();
  const [amount, setAmount] = useState(1);
  const handleChangeAmount = useCallback((newAmount: number) => {
    setAmount(newAmount);
  }, []);

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
        <Typography variant="h4" fontWeight={FontWeights.fontWeightSemiBold}>
          <Fire sx={{ color: COLOR_PRIMARY_3, width: 22, height: 24 }} /> Burn token
        </Typography>
      }
    >
      <Typography align="center" variant="body1" className="s-weak">
        Are you sure to burn this token? This action cannot be undone. Token will be transferred to zero address
      </Typography>

      {isMultiple && (
        <QuantityInput value={+amount} onChange={handleChangeAmount} maxAmount={Number(ownedTokenAmount)} />
      )}
      <Box sx={{ ...flexHelper(), flexDirection: 'column', mt: 4 }}>
        <Button
          size="large"
          variant="contained"
          className="danger"
          onClick={() => {
            onClose();
            onBurn(+amount);
          }}
          sx={{ textTransform: 'none', width: '100%' }}
        >
          Continue
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

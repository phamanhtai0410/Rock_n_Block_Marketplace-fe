import { FC } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { Modal, ModalProps } from 'components/Modal';
import { COLOR_NEUTRALS_4 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { flexHelper } from 'utils';

export interface RemoveModalProps extends ModalProps {
  onRemove: () => void;
}

export const RemoveModal: FC<RemoveModalProps> = ({ open, onClose, onRemove }) => {
  const theme = useTheme();

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
          Remove from sale
        </Typography>
      }
    >
      <Typography align="center" variant="body1" className="s-weak" color={COLOR_NEUTRALS_4}>
        Do you really want to remove your item from sale? You can put it on sale anytime
      </Typography>
      <Box sx={{ ...flexHelper(), flexDirection: 'column', mt: 4 }}>
        <Button
          size="large"
          variant="contained"
          onClick={() => {
            onRemove();
            onClose();
          }}
          sx={{ textTransform: 'none', width: '100%' }}
        >
          Remove now
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

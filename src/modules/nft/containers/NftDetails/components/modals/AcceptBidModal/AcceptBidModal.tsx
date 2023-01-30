/* eslint-disable max-len */
import { FC } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { Modal, ModalProps } from 'components/Modal';
import { UserImage } from 'modules/landing/components/UserImage';
import { FontWeights } from 'theme/Typography';
import { flexHelper } from 'utils';
import { smartRound } from 'utils/accurateToFixed';
import { shortenName } from 'utils/shortenName';

export interface AcceptBidModalProps extends ModalProps {
  currency: string;
  highestBid: string;
  highestBidUsd: string;
  onAcceptBid: (amount: string) => void;
  bidder: {
    name?: string;
    avatar?: string;
  };
}

export const AcceptBidModal: FC<AcceptBidModalProps> = (props) => {
  const { open, onClose, currency, highestBid, onAcceptBid, bidder, highestBidUsd } = props;
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
      title="Accept bid"
    >
      <Box
        sx={{
          ...flexHelper('flex-start'),
        }}
      >
        <UserImage mr={1} sx={{ width: 64, height: 64 }} avatar={bidder.avatar} />

        <Typography
          align="center"
          variant="body1"
          className="s-weak"
          sx={{
            span: {
              fontWeight: FontWeights.fontWeightBold,
            },
          }}
        >
          {`You are about to accept a bid from ${shortenName(bidder?.name)}`}
        </Typography>
      </Box>
      <Typography
        align="center"
        variant="body1"
        className="s"
        sx={{
          mt: 4,
          color: theme.themeColors.colorModalsText,
        }}
      >
        Highest bid
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
        {`${smartRound(Number(highestBid))} ${currency}`}
      </Typography>
      <Box sx={{ ...flexHelper('space-between'), mt: theme.spacing(1.5) }}>
        <Typography variant="body2" sx={{ color: theme.themeColors.colorModalsText }}>
          Price in USD
        </Typography>
        <Typography variant="body2">{`$ ${highestBidUsd}`}</Typography>
      </Box>
      <Box sx={{ ...flexHelper(), flexDirection: 'column', mt: 4 }}>
        <Button
          size="large"
          variant="contained"
          onClick={() => {
            onClose();
            onAcceptBid(highestBid);
          }}
          sx={{ textTransform: 'none', width: '100%' }}
        >
          Accept bid
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

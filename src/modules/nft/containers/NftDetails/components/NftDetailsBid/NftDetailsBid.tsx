import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Box, BoxProps, Button, Typography, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { Amount, Avatar, Card } from 'components';
import { Bid } from 'components/Icon/components';
import { useTimeLeft } from 'hooks';
import { COLOR_PRIMARY_1 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { flexHelper, getDateData } from 'utils';
import { shortenName } from 'utils/shortenName';

export interface NftDetailsBidProps {
  currentHighestBid: {
    amount: string;
    currency: string;
    address: string;
    usdAmount?: string;
    avatar?: string;
    name?: string;
    id?: string;
  };
  onBidClick: () => void;
  onAcceptBidClick: () => void;
  isHighestBid: boolean;
  isOwner: boolean;
  endAuction?: string;
  isLogged: boolean;
  openConnectModal: () => void;
}

export const NftDetailsBid: FC<NftDetailsBidProps & BoxProps> = ({
  currentHighestBid: { amount, currency, address, usdAmount, avatar, name, id },
  onBidClick,
  onAcceptBidClick,
  openConnectModal,
  isHighestBid,
  isOwner,
  endAuction,
  isLogged,
  ...boxProps
}) => {
  const theme = useTheme();
  const { year, month, day, time } = getDateData(+(endAuction || 0) * 1000);
  const { days, hours, minutes, seconds } = useTimeLeft(+(endAuction || 0) * 1000) ?? {};

  const buttonState = useMemo(() => {
    if (!isLogged) {
      return {
        text: 'Connect wallet',
        callback: openConnectModal,
        isShown: true,
      };
    }
    if (isOwner) {
      return {
        text: 'Accept bid',
        callback: onAcceptBidClick,
        isShown: isHighestBid && !endAuction,
      };
    }

    return {
      text: 'Place a bid',
      callback: onBidClick,
      isShown: true,
    };
  }, [endAuction, isHighestBid, isLogged, isOwner, onAcceptBidClick, onBidClick, openConnectModal]);

  return (
    <Card {...boxProps}>
      {endAuction && (
        <>
          <Typography className="s" fontWeight={FontWeights.fontWeightMedium} mb={2}>
            {!!seconds || !!minutes ? `Sale ends ${month} ${day}, ${year} at ${time}` : 'Sale ended'}
          </Typography>
          <Typography
            sx={{
              background: theme.themeColors.colorsNftDetailsBidTimeLeftBackground,
              borderRadius: '8px',
              padding: theme.spacing(1.25, 2),
              fontWeight: FontWeights.fontWeightMedium,
              mb: 3,
              strong: {
                color: COLOR_PRIMARY_1,
              },
              '& > *': {
                fontWeight: FontWeights.fontWeightMedium,
              },
            }}
          >
            {!!days && (
              <Typography component="span">
                <strong>{days}</strong> days{' '}
              </Typography>
            )}
            {!!hours && (
              <Typography component="span">
                <strong>{hours}</strong> hours{' '}
              </Typography>
            )}
            <strong>{minutes}</strong> minutes <strong>{seconds}</strong> seconds
          </Typography>
        </>
      )}
      {isHighestBid ? (
        <Box
          sx={{
            ...flexHelper('flex-start'),
          }}
          mb={isOwner ? 0 : 3}
        >
          <Link to={routes.profile.root.getPath(String(id))}>
            <Avatar size="xl" image={avatar || ''} />
          </Link>
          <Box>
            <Typography
              className="s"
              sx={{
                fontWeight: FontWeights.fontWeightSemiBold,
                span: {
                  color: theme.themeColors.colorTextBody2,
                },
              }}
            >
              Highest bid by <span>{shortenName(name)}</span>
            </Typography>
            <Typography
              className="xl"
              sx={{
                fontWeight: FontWeights.fontWeightSemiBold,
                span: {
                  color: theme.themeColors.colorTextBody2,
                },
              }}
            >
              {`${amount} ${currency} `}
              <span>{`$${usdAmount}`}</span>
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
          <Typography
            fontWeight={FontWeights.fontWeightMedium}
            mb={1}
            className="xs"
            color={theme.themeColors.colorTextBody2}
          >
            Minimal bid
          </Typography>
          <Typography
            mb={isHighestBid || !isOwner ? 4 : 1}
            className="xl"
            sx={{
              fontWeight: FontWeights.fontWeightSemiBold,
              span: {
                color: theme.themeColors.colorTextBody2,
              },
            }}
          >
            {`${amount} ${currency} `}
            <span>{`$${Number(usdAmount).toFixed(5)}`}</span>
          </Typography>
        </>
      )}
      {buttonState.isShown && (
        <Button sx={{ mt: 2 }} variant="contained" fullWidth onClick={buttonState.callback} endIcon={<Bid />}>
          {buttonState.text}
        </Button>
      )}
    </Card>
  );
};

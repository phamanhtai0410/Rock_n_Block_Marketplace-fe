import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, BoxProps, Button, Typography, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { Avatar } from 'components';
import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';
import { COLOR_PRIMARY_1 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { Ownership } from 'types/api/Ownership';
import { checksumAddress, flexHelper } from 'utils';
import { smartRound } from 'utils/accurateToFixed';
import { shortenName } from 'utils/shortenName';

export type OwnerHistoryCardProps = Ownership &
  BoxProps & {
    onBuyClick?: any;
    userAddress: string;
    shouldShowButton?: boolean;
  };

export const OwnerHistoryCard: FC<OwnerHistoryCardProps> = ({
  name,
  avatar,
  price,
  currency,
  url,
  onBuyClick,
  quantity,
  sellingQuantity,
  userAddress,
  address,
  shouldShowButton = true,
  ...boxProps
}) => {
  const theme = useTheme();
  const currentUserAddress = useShallowSelector(userSelector.getProp('address'));

  return (
    <Box
      sx={{
        ...flexHelper('flex-start'),
        ...boxProps.sx,
      }}
    >
      <Link to={routes.profile.root.getPath(String(url))}>
        <Avatar size="semiMedium" image={avatar || ''} />
      </Link>
      <Box>
        <Typography className="s" sx={{ fontWeight: FontWeights.fontWeightSemiBold }}>
          {shortenName(name)}
        </Typography>
        {Number(sellingQuantity) > 0 ? (
          <Typography
            className="s"
            color={theme.themeColors.colorTextBody2}
            sx={{
              span: {
                color: COLOR_PRIMARY_1,
                fontWeight: FontWeights.fontWeightSemiBold,
              },
            }}
          >
            {sellingQuantity}/{quantity} sale for
            <span>{` ${smartRound(Number(price), 18)} ${currency?.symbol} `}</span>
            {`${Number(sellingQuantity) > 1 ? 'each' : ''}`}
          </Typography>
        ) : (
          <Typography
            className="s"
            color={theme.themeColors.colorTextBody2}
            sx={{
              span: {
                color: COLOR_PRIMARY_1,
                fontWeight: FontWeights.fontWeightSemiBold,
              },
            }}
          >
            Selling {sellingQuantity}/{quantity}
          </Typography>
        )}
      </Box>
      {Number(sellingQuantity) > 0 &&
        checksumAddress(userAddress) !== checksumAddress(address) &&
        shouldShowButton &&
        currentUserAddress && (
          <Button
            variant="contained"
            size="small"
            sx={{
              ml: 'auto',
            }}
            onClick={() => {
              if (onBuyClick) {
                onBuyClick([
                  {
                    avatar,
                    price,
                    quantity,
                    sellingQuantity,
                    url,
                    currency,
                  },
                ]);
              }
            }}
          >
            Buy
          </Button>
        )}
    </Box>
  );
};

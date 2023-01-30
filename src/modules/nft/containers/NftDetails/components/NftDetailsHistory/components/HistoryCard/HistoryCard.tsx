import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { Avatar } from 'components';
import { COLOR_PRIMARY_1 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { Method } from 'types/api/enums';
import { flexHelper, getTimeAgo, shortenPhrase } from 'utils';
import { smartRound } from 'utils/accurateToFixed';
import { shortenName } from 'utils/shortenName';

import { methodToText } from './HistoryCard.helper';

export interface HistoryCardProps {
  type: Method;
  price?: string | number;
  currency?: string;
  timestamp?: string | number;
  address?: string;
  avatar?: string;
  id?: string;
  newOwnerName?: string;
  newOwnerId?: string;
  amount?: string;
}

export const HistoryCard: FC<HistoryCardProps> = ({
  type,
  price,
  currency,
  avatar,
  id,
  address,
  timestamp,
  newOwnerName,
  newOwnerId,
  amount,
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        ...flexHelper('flex-start'),
      }}
    >
      <Link to={routes.profile.root.getPath(String(id))}>
        <Avatar size="semiMedium" image={avatar || ''} />
      </Link>
      <Box>
        <Typography
          className="s"
          sx={{
            fontWeight: FontWeights.fontWeightSemiBold,
            span: {
              color: COLOR_PRIMARY_1,
            },
          }}
        >
          {`${methodToText[type](Number(amount))}`}
          {price && currency && <span>{` ${smartRound(+price, 18)} ${currency}`}</span>}
          {newOwnerName && newOwnerId && <span>{` ${shortenName(newOwnerName)}`}</span>}
        </Typography>
        <Typography
          className="s"
          color={theme.themeColors.colorTextBody2}
          sx={{
            span: {
              color: theme.themeColors.colorTextDefault,
              fontWeight: FontWeights.fontWeightSemiBold,
            },
          }}
        >
          by
          <span>{` ${shortenPhrase(String(address), 5, 4)} `}</span>
          {getTimeAgo(String(timestamp))} ago
        </Typography>
      </Box>
    </Box>
  );
};

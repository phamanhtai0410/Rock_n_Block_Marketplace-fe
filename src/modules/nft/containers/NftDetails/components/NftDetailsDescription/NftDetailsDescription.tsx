import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, BoxProps, Typography, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { Card } from 'components';
import { Clock } from 'components/Icon/components';
import { chains } from 'services/WalletService/config';
import { COLOR_PRIMARY_1 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { Chains } from 'types';
import { flexHelper, getTimeTo } from 'utils';

export interface NftDetailsDescriptionProps {
  name: string;
  inStock?: number;
  owned?: number;
  id: string | number;
  collectionId?: string | number;
  promotionQueue?: number;
  description: string;
  promotionEndTime?: string;
  creatorEarnings?: number;
  network?: string;
}

export const NftDetailsDescription: FC<NftDetailsDescriptionProps & Omit<BoxProps, 'id'>> = ({
  name,
  owned,
  inStock,
  id,
  description,
  promotionEndTime,
  promotionQueue,
  creatorEarnings,
  collectionId,
  network,
  ...boxProps
}) => {
  const theme = useTheme();

  let promotionValidTime;

  if (promotionEndTime && new Date(String(promotionEndTime)).getTime() > Date.now()) {
    promotionValidTime = getTimeTo(promotionEndTime);
  }

  return (
    <Box {...boxProps}>
      <Typography
        component={Link}
        to={routes.collections.root.getPath(collectionId || '1')}
        display="block"
        noWrap
        variant="h3"
        mb={2}
      >
        {name}
      </Typography>
      {!!inStock && (
        <Typography color={theme.themeColors.colorTextBody2} className="s" mb={2}>{`${inStock} in stock`}</Typography>
      )}
      {!!owned && (
        <Typography color={theme.themeColors.colorTextBody2} className="s" mb={2}>{`${owned} owned`}</Typography>
      )}
      {promotionValidTime && (
        <Card
          sx={{
            ...flexHelper('flex-start'),
            background: theme.themeColors.colorsNftDetailsBidTimeLeftBackground,
            color: COLOR_PRIMARY_1,
            padding: theme.spacing(1.25, 2),
            border: `1px solid ${COLOR_PRIMARY_1}`,
            mb: 3,
            borderRadius: '8px',
            width: 'fit-content',
          }}
        >
          <Clock
            sx={{
              mr: 1,
            }}
          />
          {`In progress, ${promotionValidTime} left`}
        </Card>
      )}
      {!!promotionQueue && (
        <Card
          sx={{
            ...flexHelper('flex-start'),
            padding: theme.spacing(1.25, 2),
            color: theme.themeColors.colorTextDefault,
            width: 'fit-content',
            borderRadius: '8px',
            mb: 3,
          }}
        >
          <Clock
            sx={{
              mr: 1,
            }}
          />
          <Typography
            className="s"
            fontWeight={FontWeights.fontWeightMedium}
          >{`Waiting list. There are ${promotionQueue} NFTs before yours`}</Typography>
        </Card>
      )}
      <Typography color={theme.themeColors.colorTextBody2} className="s" mb={3}>{`Id: ${id}`}</Typography>
      <Typography
        sx={{
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          span: {
            color: theme.themeColors.colorTextBody2,
            marginRight: 1,
          },
        }}
      >
        <span>Blockchain:</span>
        <Box
          component="img"
          src={chains[network as Chains].mainnet.img}
          sx={{ width: 20, height: 20, marginRight: 1 }}
        />
        {network}
      </Typography>
      <Typography sx={{ wordBreak: 'break-all' }}>{description}</Typography>
      <Typography
        sx={{
          mt: 3,
          span: {
            color: theme.themeColors.colorTextBody2,
          },
        }}
      >
        <span>Creator earnings: </span>
        {creatorEarnings}%
      </Typography>
    </Box>
  );
};

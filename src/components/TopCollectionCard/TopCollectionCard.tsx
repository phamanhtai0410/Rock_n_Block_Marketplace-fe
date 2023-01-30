import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Stack, styled, Typography, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { Avatar } from 'components/Avatar/Avatar';
import { Card } from 'components/Card';
import { BlueCheck, Trash } from 'components/Icon/components';
import { COLOR_NEUTRALS_2, COLOR_PRIMARY_1 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { Collection } from 'types/api/Collection';
import { Currency } from 'types/api/Currency';
import { flexHelper, shortenPhrase } from 'utils';
import { smartRound } from 'utils/accurateToFixed';

export type TopCollectionCardProps = {
  index?: number | string;
  onDelete?: () => void;
} & Pick<Collection, 'floorPrice' | 'volumeTraded' | 'avatar' | 'url' | 'currency' | 'name' | 'isVerified'>;

export const Text = styled(Typography)(() => ({
  lineHeight: '20px',
  fontSize: '12px',
  span: { color: COLOR_PRIMARY_1, fontWeight: FontWeights.fontWeightSemiBold },
}));

export const TopCollectionCard: FC<TopCollectionCardProps> = (props) => {
  const theme = useTheme();
  const { name, floorPrice, volumeTraded, index, avatar, url, currency, isVerified, onDelete } = props;

  return (
    <Card
      noBorder
      sx={{
        ...flexHelper('flex-start', 'center'),
        position: 'relative',
      }}
    >
      {index && (
        <Typography
          variant="body1"
          className="xl"
          sx={{ color: theme.themeColors.colorTopCollectionCardTextDefault, mr: 1.5 }}
        >
          {index}
        </Typography>
      )}
      <Link to={routes.collections.root.getPath(String(url))}>
        <Avatar size="xl" image={avatar || ''} />
      </Link>
      <Stack ml={1}>
        <Stack direction="row" alignItems="center" spacing={1.25}>
          <Typography
            variant="body1"
            fontWeight={FontWeights.fontWeightMedium}
            sx={{ color: theme.themeColors.colorTopCollectionCardTextDefault }}
          >
            {shortenPhrase(name || '', 5, 2)}
          </Typography>
          {isVerified && <BlueCheck sx={{ width: '16px', height: '16px' }} />}
        </Stack>
        <Text lineHeight="20px">
          <span style={{ color: theme.themeColors.colorTopCollectionCardFloorText }}>Floor price:</span> ${' '}
          <span>
            {floorPrice && (currency as Currency)?.rate
              ? smartRound(Number(floorPrice) * Number((currency as Currency).rate), 5)
              : '0'}
          </span>
        </Text>
        <Text variant="body1">
          Trade volume: $ <span>{smartRound(Number(volumeTraded))}</span>
        </Text>
      </Stack>
      {onDelete && (
        <IconButton
          sx={{ ml: 1.5, color: COLOR_NEUTRALS_2, position: 'absolute', top: '24px', right: '24px' }}
          onClick={onDelete}
        >
          <Trash sx={{ fill: 'none' }} />
        </IconButton>
      )}
    </Card>
  );
};

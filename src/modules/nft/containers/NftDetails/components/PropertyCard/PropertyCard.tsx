import { FC } from 'react';
import { BoxProps, styled, Tooltip, Typography } from '@mui/material';
import { Card } from 'components';
import { COLOR_NEUTRALS_4 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { Property } from 'types/api/Property';
import { shortenPhrase, smartRound } from 'utils';

const TypographyDark = styled(Typography)({
  fontWeight: FontWeights.fontWeightMedium,
  color: COLOR_NEUTRALS_4,
  textAlign: 'center',
});

export type PropertyCardProps = Property;
export const PropertyCard: FC<PropertyCardProps & BoxProps> = ({ traitType, traitValue, rarity, ...boxProps }) => (
  <Card
    sx={{
      py: 2,
      background: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      ...boxProps.sx,
    }}
  >
    <Tooltip title={traitType}>
      <TypographyDark className="s" textTransform="uppercase" textAlign="center">
        {shortenPhrase(String(traitType), 14, 2)}
      </TypographyDark>
    </Tooltip>
    <Tooltip title={traitValue} arrow sx={{ cursor: 'pointer' }}>
      <Typography
        className="xl"
        textAlign="center"
        sx={{ marginTop: 'auto', wordBreak: 'break-word', textTransform: 'capitalize' }}
      >
        {shortenPhrase(traitValue, 14, 2)}
      </Typography>
    </Tooltip>
    <TypographyDark className="xs" sx={{ marginTop: 'auto' }}>
      {`${smartRound(Number(rarity), 2)} % have this trait`}
    </TypographyDark>
  </Card>
);

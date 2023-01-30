import { FC } from 'react';
import { Box, Checkbox, Stack, Typography } from '@mui/material';
import { COLOR_NEUTRALS_3 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { flexHelper } from 'utils';

export type PropertyRowCardProps = {
  name: string;
  isActive: boolean;
  amount: number;
  onPerkChangeClick: () => void;
};

export const PropertyRowCard: FC<PropertyRowCardProps> = ({ name, isActive, amount, onPerkChangeClick }) => {
  return (
    <Box sx={{ ...flexHelper('space-between', 'center') }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Checkbox onChange={onPerkChangeClick} checked={isActive} />
        <Typography fontWeight={FontWeights.fontWeightSemiBold}>{name}</Typography>
      </Stack>
      <Typography fontWeight={FontWeights.fontWeightSemiBold} color={COLOR_NEUTRALS_3}>
        {amount}
      </Typography>
    </Box>
  );
};

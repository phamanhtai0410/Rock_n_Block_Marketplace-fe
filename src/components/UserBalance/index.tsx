import { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { COLOR_RED } from 'theme/colors';
import { FontWeights } from 'theme/Typography';

interface UserBalancProps {
  balance: string;
}

export const UserBalance: FC<UserBalancProps> = ({ balance }) => {
  return (
    <Box
      sx={{
        width: '120px',
      }}
    >
      <Grid container direction="column" justifyContent="center" alignItems="flex-end">
        <Grid item>
          <Typography variant="body2" fontWeight={FontWeights.fontWeightRegular}>
            Balance:
          </Typography>
        </Grid>
        <Grid item container justifyContent="center" alignItems="center" wrap="nowrap">
          <Grid item>
            <Typography
              variant="h4"
              fontWeight={FontWeights.fontWeightRegular}
              color={COLOR_RED}
              textTransform="uppercase"
              sx={{
                maxWidth: '85px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {balance}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h4"
              fontWeight={FontWeights.fontWeightRegular}
              color={COLOR_RED}
              textTransform="uppercase"
            >
              CRO
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

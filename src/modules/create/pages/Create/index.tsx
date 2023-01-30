import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Stack, Typography, useTheme } from '@mui/material';
import { DesignationCard } from 'components';
import { TRANSITION_DEFAULT_TIME } from 'theme/variables';

import { createVariants } from './Create.helper';

export const Create: FC = () => {
  const theme = useTheme();
  return (
    <Stack minHeight={582} pb={12}>
      <Typography variant="h4">Create Nft</Typography>
      <Grid container spacing={3} pt={{ xs: 8, md: 5.5 }}>
        {createVariants.map(({ icon, title, linkTo }) => {
          return (
            <Grid item xs={12} md={4} key={title}>
              <Link to={linkTo}>
                <DesignationCard
                  title={title}
                  Icon={icon}
                  sx={{
                    alignItems: 'center',
                    padding: theme.spacing(6.75, 3, 4.75),
                    transition: TRANSITION_DEFAULT_TIME,
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      backgroundColor: theme.themeColors.colorNftCardBackgroundHover,
                    },
                  }}
                />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

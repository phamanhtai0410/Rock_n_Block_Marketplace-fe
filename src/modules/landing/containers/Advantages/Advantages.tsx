import { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { Carousel, DesignationCard } from 'components';

import { advantagesCards } from './Advantages.helper';

export const Advantages: FC = () => {
  return (
    <Box
      sx={{
        pt: 7,
        marginBottom: 8,
      }}
    >
      <Grid container sx={{ display: { xs: 'none', sm: 'flex' } }} spacing={4}>
        {advantagesCards.map(({ title, text, Icon }) => (
          <Grid item key={title} sm={6} md={6} lg={3}>
            <DesignationCard title={title} text={text} Icon={Icon} />
          </Grid>
        ))}
      </Grid>
      <Carousel loop sx={{ px: 0, display: { sm: 'none' } }}>
        {advantagesCards.map(({ title, text, Icon }) => (
          <DesignationCard key={title} title={title} text={text} Icon={Icon} />
        ))}
      </Carousel>
    </Box>
  );
};

import { FC } from 'react';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Carousel, StepCard } from 'components';
import { OrangeFace } from 'components/Icon/components';
import { flexHelper } from 'utils';

import { createAndSellHelper } from './CreateAndSell.helper';

export const CreateAndSell: FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Box id="howItWorks" sx={{ ...flexHelper('flex-start'), mb: 5.5 }}>
        <Typography
          variant="h4"
          sx={{
            marginRight: theme.spacing(2),
          }}
        >
          Create And Sell Your NFTs
        </Typography>
        <OrangeFace sx={{ display: { xs: 'none', sm: 'flex' } }} />
      </Box>
      {!isSmallScreen ? (
        <Grid container sx={{ display: { xs: 'none', md: 'flex' } }} spacing={4}>
          {createAndSellHelper.map(({ title, text, step, Icon }) => {
            return (
              <Grid item key={step} sm={6}>
                <StepCard sx={{ height: '100%' }} step={step} title={title} text={text} Icon={Icon} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Carousel loop sx={{ px: 0, display: { md: 'none' } }}>
          {createAndSellHelper.map(({ title, text, Icon, step }) => (
            <StepCard sx={{ minHeight: '384px' }} key={title} step={step} title={title} text={text} Icon={Icon} />
          ))}
        </Carousel>
      )}
    </>
  );
};

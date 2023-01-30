import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { routes } from 'appConstants';
import { notFound } from 'modules/layout/assets/images';
import { COLOR_GRADIENT_ACCENT, COLOR_GRADIENT_SHADOW, COLOR_GRAY } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { flexHelper } from 'utils';

export const NotFound: FC = () => {
  return (
    <Box sx={{ background: COLOR_GRADIENT_SHADOW }}>
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100vh',
          background: `url(${notFound}) center no-repeat `,
          backgroundSize: 'cover',
          opacity: '0.5',
        }}
      />
      <Box sx={{ ...flexHelper(), flexDirection: 'column', position: 'relative', height: '100vh' }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '128px', sm: '250px' },
            lineHeight: '250px',
            fontWeight: FontWeights.fontWeightBold,
            background: COLOR_GRADIENT_ACCENT,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </Typography>
        <Typography variant="h4" color={COLOR_GRAY}>
          Page not found.
        </Typography>
        <Typography variant="body1" color={COLOR_GRAY} sx={{ maxWidth: 320, textAlign: 'center' }} mt={1} mb={4.25}>
          Our apologies, this is almost certainly not the page you were looking for.
        </Typography>
        <NavLink to={routes.home.root.path}>
          <Button variant="contained" color="secondary">
            Go to home page
          </Button>
        </NavLink>
      </Box>
    </Box>
  );
};

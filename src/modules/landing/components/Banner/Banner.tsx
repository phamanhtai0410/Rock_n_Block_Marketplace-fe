import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';
import { COLOR_PRIMARY_1 } from 'theme/colors';
import { flexHelper } from 'utils';

export const Banner = () => {
  const theme = useTheme();
  const isLight = useShallowSelector(userSelector.getProp('theme')) === 'light';
  return (
    <Box>
      <Container
        sx={{
          ...flexHelper('space-between'),
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: { xs: 'center', sm: 'center', md: 'flex-start' },
            flexDirection: 'column',
            maxWidth: { xs: 290, sm: 450, md: 450 },
            zIndex: 10,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              strong: {
                color: COLOR_PRIMARY_1,
              },
              mb: 2,
              textAlign: { xs: 'center', sm: 'center', md: 'left' },
              [theme.breakpoints.down('md')]: {
                fontSize: '40px',
                lineHeight: '48px',
              },
            }}
          >
            Buy and sell digital art <strong>NFT</strong> collection
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mb: { xs: 3, sm: 3, md: 5 },
              textAlign: { xs: 'center', sm: 'center', md: 'left' },
            }}
          >
            Everything you need to build, host, scale amazing dapps free by creating account today
          </Typography>
          <Button variant="contained" component={Link} to={routes.explore.root.path}>
            Explore
          </Button>
        </Box>
        <Box
          component="img"
          src={theme.themeColors.bannerImage}
          alt="banner"
          sx={{
            position: 'relative',
            transform: { xs: 'none', sm: 'none', md: isLight ? 'none' : 'translateY(40px) scale(1.3)' },
            maxWidth: { xs: isLight ? '100%' : '135%', sm: '100%', md: '50%' },
            marginTop: { xs: isLight ? 3 : 0, md: 0 },
            zIndex: 1,
          }}
        />
      </Container>
    </Box>
  );
};

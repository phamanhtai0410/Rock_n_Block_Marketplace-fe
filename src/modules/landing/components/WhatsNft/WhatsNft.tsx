/* eslint-disable react/no-array-index-key */
import { Box, Container, Typography, useTheme } from '@mui/material';
import { leavesImage, starImage } from 'assets/images';
import { useShallowSelector } from 'hooks';
import userSelector from 'store/user/selectors';
import { COLOR_PRIMARY_1 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';

export const WhatsNft = () => {
  const theme = useTheme();
  const isLight = useShallowSelector(userSelector.getProp('theme')) === 'light';

  return (
    <Box
      sx={{
        background: theme.themeColors.colorWhatsNftBackground,
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 530,
        }}
      >
        <Box
          component="img"
          src={leavesImage}
          alt=""
          sx={{
            position: 'absolute',
            left: { xs: '-30%', sm: '-10%', md: 0 },
            filter: `brightness(${isLight ? 1 : 4})`,
          }}
        />
        <Box
          sx={{
            maxWidth: 830,
          }}
        >
          <Box
            sx={{
              mb: 5,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {!isLight && (
              <Box
                sx={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: { xs: 'none', sm: 'none', md: 'block' },
                  width: 100,
                  height: 50,
                  background: COLOR_PRIMARY_1,
                  filter: 'blur(70px)',
                }}
              />
            )}
            {Array(5)
              .fill('')
              .map((_, index) => {
                return (
                  <Box
                    key={index}
                    component="img"
                    alt="star"
                    src={starImage}
                    sx={{
                      ':not(:last-child)': {
                        mr: 1.5,
                      },
                      ...(index !== 2 && {
                        transform: 'scale(0.55)',
                      }),
                    }}
                  />
                );
              })}
          </Box>
          <Typography
            variant="body2"
            className="l"
            sx={{
              textAlign: 'center',
              color: theme.themeColors.colorWhatsNftText,
            }}
          >
            “ What even is an NFT? NFT stands for non-fungible token, which basically means that it`s one kind digital
            asset that belongs to you and you only. The most popular NFTs right include artwork and music, include
            videos and even tweets “
          </Typography>
          <Typography
            className="l"
            sx={{
              fontWeight: FontWeights.fontWeightSemiBold,
              textAlign: 'center',
              mt: { xs: 3, sm: 4, md: 5 },
            }}
          >
            Alexandra Daddario
          </Typography>
        </Box>
        <Box
          component="img"
          src={leavesImage}
          alt=""
          sx={{
            position: 'absolute',
            right: { xs: '-30%', sm: '-10%', md: 0 },
            transform: 'rotateY(180deg)',
            filter: `brightness(${isLight ? 1 : 4})`,
          }}
        />
      </Container>
    </Box>
  );
};

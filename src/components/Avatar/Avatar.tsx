import { FC, SyntheticEvent } from 'react';
import { Box, BoxProps, Stack, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { mockAva } from 'assets/images';
import { TRANSITION_DEFAULT_TIME } from 'theme/variables';
import { flexHelper, shortenPhrase } from 'utils';

export interface AvatarProps {
  size?: 'small' | 'semiMedium' | 'medium' | 'xl' | 'xxl' | 'big';
  image?: string;
  name?: string;
  noWrap?: boolean;
  isLoading?: boolean;
  onClick?: (event: Event | SyntheticEvent) => void;
  isWithBorder?: boolean;
}

const classes = {
  small: {
    minWidth: 30,
    width: 30,
    height: 30,
    '& img': {
      width: 30,
      height: 30,
      objectFit: 'cover',
    },
  },

  semiMedium: {
    minWidth: 48,
    width: 48,
    height: 48,
    '& img': {
      width: 48,
      height: 48,
      objectFit: 'cover',
    },
  },

  medium: {
    width: 56,
    height: 56,
    '& img': {
      width: 56,
      height: 56,
      objectFit: 'cover',
    },
  },

  xl: {
    width: 64,
    height: 64,
    '& img': {
      width: 64,
      height: 64,
      objectFit: 'cover',
    },
  },

  xxl: {
    width: 120,
    height: 120,
    '& img': {
      width: 120,
      height: 120,
      objectFit: 'cover',
    },
  },

  big: {
    width: 150,
    height: 150,
    textAlign: 'center',
    '& img': {
      width: 150,
      height: 150,
      objectFit: 'cover',
    },
  },
};

export const Avatar: FC<AvatarProps & BoxProps> = ({
  image = mockAva,
  size = 'small',
  name = '',
  noWrap = false,
  onClick,
  isLoading = false,
  isWithBorder = true,
  ...boxProps
}) => {
  return (
    <Stack
      direction="row"
      onClick={onClick}
      sx={(theme) => ({
        ...flexHelper(),
        marginRight: theme.spacing(1),
        flexDirection: size === 'big' ? 'column' : 'row',
        minWidth: noWrap ? 0 : 'none',
        [theme.breakpoints.down('sm')]: { margin: 0, mr: 1 },
      })}
      spacing={size !== 'big' && !!name ? 1.5 : 1}
      {...boxProps}
    >
      <Box
        sx={(theme) => ({
          ...classes[size],
          cursor: 'pointer',
          '& img': {
            border: isWithBorder ? `2px solid ${theme.themeColors.colorAvatarBorderDefault}` : 'none',
            borderRadius: '50%',
            maxWidth: '100%',
            transition: TRANSITION_DEFAULT_TIME,

            '&:hover': {
              borderColor: theme.themeColors.colorAvatarBorderHover,
            },
            ...classes[size]['& img'],
          },
          ...flexHelper(),
        })}
      >
        {isLoading ? (
          <Skeleton height="100%" variant="circular" width="100%" />
        ) : (
          <img
            onError={(event) => {
              event.currentTarget.src = mockAva;
            }}
            src={image}
            alt="user avatar"
          />
        )}
      </Box>
      {name && (
        <Stack direction="row" spacing={0.5}>
          <Typography variant={size === 'big' ? 'h4' : 'body1'} className="xs pink">
            by{' '}
          </Typography>
          <Typography
            align={size === 'big' ? 'center' : 'left'}
            variant={size === 'big' ? 'h4' : 'body1'}
            className="xs"
            noWrap={noWrap}
            sx={(theme) => ({
              maxWidth: '100%',
              wordBreak: 'break-all',
              '&.MuiTypography-root ': {
                color: theme.themeColors.colorAvatarText,
              },
            })}
          >
            {isLoading ? (
              <Skeleton variant="text" sx={{ ...classes[size] }} height="30px" />
            ) : (
              shortenPhrase(name, 5, 3)
            )}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

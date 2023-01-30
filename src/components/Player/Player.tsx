import { useMemo } from 'react';
import { Box, SxProps, useTheme } from '@mui/material';
import Plyr, { PlyrProps } from 'plyr-react';

import 'plyr-react/plyr.css';

export type PlayerProps = {
  sx?: SxProps;
} & PlyrProps;

export const Player = ({ sx, ...plyrProps }: PlayerProps) => {
  const theme = useTheme();

  const memoizedPlayerOptions = useMemo(
    () => ({
      controls: ['play', 'progress', 'current-time', 'duration', 'mute', 'fullscreen'],
      resetOnEnd: true,
      ...plyrProps?.options,
    }),
    [plyrProps?.options],
  );
  return (
    <Box
      sx={{
        '.plyr': {
          borderRadius: '20px !important',
          '&__controls': {
            background: 'none !important',
            backgroundColor: `${theme.themeColors.colorPlayerBackground} !important`,
            boxShadow: `${theme.themeColors.colorPlayerBoxShadow} !important`,
            borderRadius: '48px !important',
            padding: '4px 8px !important',
            color: `${theme.themeColors.colorPlayerControlColor} !important`,
            '&:hover': {
              color: `${theme.themeColors.colorPlayerControlColorHover} !important`,
            },
          },
          '&__control': {
            color: `${theme.themeColors.colorPlayerPlayColor} !important`,
            ':hover': {
              color: `${theme.themeColors.colorPlayerPlayColorHover} !important`,
              backgroundColor: 'transparent !important',
            },
          },
          '&__progress': {
            'input[type="range"]': {
              cursor: 'pointer',
              color: `${theme.themeColors.colorPlayerProgressColor} !important`,

              '&::-webkit-slider-thumb': {
                // change if thumb needed
                width: '0px',
                height: '0px',
                boxShadow: 'none',
                border: 'none',

                WebkitAppearance: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                background: 'orange',
              },
              '&::-moz-range-thumb': {
                // change if thumb needed
                width: '0px',
                height: '0px',
                boxShadow: 'none',

                borderRadius: '50%',
                cursor: 'pointer',
                background: 'orange',
              },
            },
            '&__buffer': {
              color: `${theme.themeColors.colorPlayerProgressBackground} !important`,
            },
            '.plyr__tooltip': {
              display: 'none', // delete if tooltip needed

              backgroundColor: 'yellow !important',

              '&::before': {
                borderTopColor: 'yellow !important',
              },
            },
          },
          '&__time': {
            '&--current': {
              display: 'none',
            },
            '&--duration': {
              marginLeft: '8px !important',

              '&::before': {
                display: 'none',
              },
            },
          },
          '&__volume': {
            minWidth: 0,
            width: 'auto',
          },
        },
        ...sx,
      }}
    >
      <Plyr
        // {...plyrProps}
        // https://github.com/sampotts/plyr#the-source-setter
        source={plyrProps.source}
        // https://github.com/sampotts/plyr#options
        options={memoizedPlayerOptions}
      />
    </Box>
  );
};

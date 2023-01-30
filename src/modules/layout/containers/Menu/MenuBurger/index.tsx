import { FC } from 'react';
import { Box, BoxProps } from '@mui/material';
import { COLOR_BLACK } from 'theme/colors';
import { BORDER_RADIUS_DEFAULT } from 'theme/variables';

export type BurgerProps = {
  isMenuVisible: boolean;
};

export const Burger: FC<BurgerProps & Pick<BoxProps, 'sx'>> = ({ sx, isMenuVisible }) => (
  <Box
    sx={{
      ...sx,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      span: {
        height: '2px',
        background: COLOR_BLACK,
        borderRadius: BORDER_RADIUS_DEFAULT,
        transition: '.4s  cubic-bezier(0.68, -0.6, 0.32, 1.6)',

        '&:nth-of-type(1)': {
          transformOrigin: 'center',
          width: isMenuVisible ? '50%' : '100%',
          transform: isMenuVisible ? 'rotatez(45deg) translate(4.5px, 1px)' : 'none',
        },
        '&:nth-of-type(2)': {
          width: '100%',
          transform: isMenuVisible ? 'rotatez(-45deg)' : 'none',
        },
        '&:nth-of-type(3)': {
          width: '50%',
          transformOrigin: 'bottom',
          transform: isMenuVisible ? 'translate(9.5px, -4.5px) rotatez(45deg)' : 'none',
        },
      },
    }}
  >
    <span />
    <span />
    <span />
  </Box>
);

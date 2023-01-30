import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';

export const getMuiSwitchOverrides = (theme: Theme): ComponentsOverrides['MuiSwitch'] => {
  const trackSize = {
    width: '40px',
    height: '20px',
    borderRadius: '32px',
    padding: 0,
    border: 'none',
  };

  const switchBaseSize = {
    padding: 0,
    width: trackSize.height,
    height: trackSize.height,
    borderRadius: '50%',
  };

  return {
    root: {
      ...trackSize,
      boxSizing: 'content-box',
      opacity: '1 !important',
      margin: theme.spacing(0),
      overflow: 'visible',

      '&:focus-within::before': {
        display: 'block',
      },
    },
    switchBase: {
      ...switchBaseSize,
      backgroundColor: 'transparent',
      opacity: '1 !important',
      border: 'none',

      '&.Mui-checked': {
        transform: 'translateX(20px)',

        '.MuiSwitch-thumb': {
          backgroundColor: theme.themeColors.colorSwitchTrack,
        },

        '& + .MuiSwitch-track': {
          backgroundColor: theme.themeColors.colorSwitchThumb,
        },
      },
    },
    input: {
      ...switchBaseSize,
      top: 0,
      left: 0,
      width: '100%',
    },
    thumb: {
      boxShadow: 'unset',
      width: 12,
      height: 12,
      border: 'none',
      backgroundColor: theme.themeColors.colorSwitchThumb,
    },
    track: {
      borderRadius: '48px',
      opacity: '1 !important',
      backgroundColor: theme.themeColors.colorSwitchTrack,
    },
  };
};

export const getMuiSwitchDefaultProps = (): ComponentsProps['MuiSwitch'] => ({
  color: 'primary',
});

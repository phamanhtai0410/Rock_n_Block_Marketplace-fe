import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMuiBackdropOverrides = (theme?: Theme): ComponentsOverrides['MuiBackdrop'] => ({
  root: {
    background: 'rgba(26, 26, 26, 0.4)',
  },
});

export const getMuiBackdropDefaultProps = (): ComponentsProps['MuiBackdrop'] => ({});

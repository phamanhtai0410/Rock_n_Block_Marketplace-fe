import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMuiLinkOverrides = (theme?: Theme): ComponentsOverrides['MuiLink'] => ({
  root: {
    textDecoration: 'none',
  },
});

export const getMuiLinkDefaultProps = (): ComponentsProps['MuiLink'] => ({});

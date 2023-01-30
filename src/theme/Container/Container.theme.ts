import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';

export const getMuiContainerOverrides = (theme: Theme): ComponentsOverrides['MuiContainer'] => ({
  root: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
  },
});

export const getMuiContainerDefaultProps = (): ComponentsProps['MuiContainer'] => ({
  maxWidth: 'lg',
  sx: {
    mx: 'auto',
  },
});

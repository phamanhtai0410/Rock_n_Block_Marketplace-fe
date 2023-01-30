/* eslint-disable @typescript-eslint/no-unused-vars */

import { ComponentsOverrides, ComponentsProps, Theme } from '@mui/material';

export const getMuiAccordion = (theme: Theme): ComponentsOverrides['MuiAccordion'] => ({
  root: {
    background: 'transparent',
    boxShadow: 'none',
  },
});

export const getMuiAccordionDetails = (theme: Theme): ComponentsOverrides['MuiAccordionDetails'] => ({
  root: {
    padding: 0,
  },
});

export const getMuiAccordionPropsDefaultProps = (): ComponentsProps['MuiAccordion'] => ({
  disableGutters: true,
  elevation: 0,
  square: true,
});

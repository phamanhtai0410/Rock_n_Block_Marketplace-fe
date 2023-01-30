import React, { ReactNode } from 'react';
import { Grid, GridProps, SxProps, Theme } from '@mui/material';

export interface GridContainerProps extends Omit<GridProps, 'columns'> {
  children?: ReactNode;
  columns?: number;
  gridItemSx?: SxProps<Theme>;
}

export const GridContainer = ({ children, columns = 4, gridItemSx, ...gridProps }: GridContainerProps) => (
  <Grid container spacing={{ xs: 0, sm: 4 }} sx={{ marginTop: 2, marginBottom: 4 }} {...gridProps}>
    {React.Children.map(children, (element) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={12 / (columns - 1)}
        lg={12 / columns}
        sx={{ marginBottom: { xs: 2, md: 0 }, ...gridItemSx }}
      >
        {element}
      </Grid>
    ))}
  </Grid>
);

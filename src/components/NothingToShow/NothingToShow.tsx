import { FC } from 'react';
import { SxProps, Theme, Typography } from '@mui/material';

export type NothingToShowProps = {
  sx?: SxProps<Theme>;
};

export const NothingToShow: FC<NothingToShowProps> = ({ sx }) => {
  return (
    <Typography variant="h4" textAlign="center" sx={{ ...sx }}>
      Nothing to show
    </Typography>
  );
};

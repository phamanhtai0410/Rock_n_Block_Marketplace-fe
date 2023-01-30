import { FC, PropsWithChildren } from 'react';
import { Box, BoxProps, useTheme } from '@mui/material';
import { COLOR_RED } from 'theme/colors';

export interface CardProps {
  noBorder?: boolean;
  error?: boolean;
}

export const Card: FC<PropsWithChildren<CardProps & BoxProps>> = ({ noBorder, children, error, ...boxProps }) => {
  const theme = useTheme();
  return (
    <Box
      {...boxProps}
      sx={{
        padding: 3,
        background: theme.themeColors.colorCardBackground,
        boxShadow: theme.themeColors.colorCardBoxShadow,
        borderRadius: '16px',
        ...(!noBorder && {
          border: `1px solid ${error ? COLOR_RED : theme.themeColors.colorCardBorder}`,
        }),
        ...boxProps.sx,
      }}
    >
      {children}
    </Box>
  );
};

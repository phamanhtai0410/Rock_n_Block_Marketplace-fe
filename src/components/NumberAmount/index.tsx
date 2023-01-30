import { ReactNode } from 'react';
import { Box, Tooltip, TooltipProps } from '@mui/material';

export interface NumberAmountProps {
  value: ReactNode;
  children: ReactNode;
}

export const NumberAmount = ({ value, children }: Omit<TooltipProps, 'title' | 'children'> & NumberAmountProps) => {
  return (
    <Tooltip title={<Box>{value}</Box>}>
      <Box>{children}</Box>
    </Tooltip>
  );
};

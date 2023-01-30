import { Tooltip, useTheme } from '@mui/material';

export interface ValueLabelProps {
  children?: any;
  open: boolean;
  value: number;
  symbol?: string;
}

export const ValueLabel = ({ children, open, value, symbol = '' }: ValueLabelProps) => {
  const theme = useTheme();

  return (
    <Tooltip
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={`${value} ${symbol}`}
      componentsProps={{ tooltip: { sx: { backgroundColor: theme.themeColors.colorSliderTooltip } } }}
    >
      {children}
    </Tooltip>
  );
};

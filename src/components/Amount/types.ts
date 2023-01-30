import { TooltipProps, TypographyProps } from '@mui/material';

export type FormatType = 'standard' | 'compact';

export type TooltipOptionProps = {
  active?: boolean;
  prefix?: 'inherit' | string;
  suffix?: 'inherit' | string;
} & Omit<TooltipProps, 'children' | 'title'>;

export interface AmountProps extends TypographyProps {
  value: string;
  prefix?: string;
  suffix?: string;
  minimumFractions?: number;
  maximumFractions?: number;
  withEllipses?: boolean;
  tooltipOptions?: TooltipOptionProps;
}

export interface AmountWrapperProps extends AmountProps {
  rawValue: string;
}

export interface FiatProps extends AmountProps {
  locales?: string | string[];
  currency?: string;
}

export interface CryptoProps extends AmountProps {
  decimals?: number;
  symbol?: string;
  normalize?: boolean;
}

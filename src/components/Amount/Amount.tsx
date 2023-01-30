import { Tooltip, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';

import { AmountWrapperProps, CryptoProps, FiatProps } from './types';

const getBrowserLocal = () => navigator.language;
const defaultTooltipOptions = {
  active: true,
  prefix: '',
  suffix: '',
};

export const AmountWrapper = ({
  value,
  prefix,
  suffix,
  rawValue,
  withEllipses = true,
  tooltipOptions,
  sx = {},
  ...rest
}: AmountWrapperProps) => {
  let amountComponent = (
    <Typography component="span" sx={{ display: 'inline-block', ...sx }} {...rest}>
      {prefix}
      {value}
      {withEllipses && value !== rawValue ? '' : ''} {suffix}
    </Typography>
  );
  const {
    active: activeTooltip,
    prefix: tooltipPrefix,
    suffix: tooltipSuffix,
    ...tooltipRest
  } = { ...defaultTooltipOptions, ...tooltipOptions };
  if (activeTooltip && +rawValue && rawValue !== value.slice(1)) {
    // allows to easily inherit component prefix and suffix
    const selectedTooltipPrefix = tooltipPrefix === 'inherit' ? prefix : tooltipPrefix;
    const selectedTooltipSuffix = tooltipSuffix === 'inherit' ? suffix : tooltipSuffix;
    amountComponent = (
      <Tooltip
        title={`${selectedTooltipPrefix} ${new BigNumber(rawValue).toString(10)} ${selectedTooltipSuffix}`}
        {...tooltipRest}
      >
        {amountComponent}
      </Tooltip>
    );
  }
  return amountComponent;
};

const Fiat = ({
  value,
  locales = getBrowserLocal(),
  currency = 'USD',
  minimumFractions,
  maximumFractions = 8,
  ...rest
}: FiatProps) => {
  let formattedValue = value;
  if (Intl) {
    formattedValue = Intl.NumberFormat(locales, {
      style: 'currency',
      currency,
      minimumFractionDigits: minimumFractions,
      maximumFractionDigits: maximumFractions,
    }).format(+value);
  }
  return <AmountWrapper rawValue={value} value={formattedValue} {...rest} />;
};

const Crypto = ({
  value,
  decimals = 18,
  normalize = false,
  symbol = '',
  maximumFractions = 8,
  ...rest
}: CryptoProps) => {
  let rawValue = value;
  if (normalize) {
    rawValue = new BigNumber(value).dividedBy(10 ** decimals).toString();
  }

  const shortValue = new BigNumber(rawValue).decimalPlaces(maximumFractions).toString(10);

  return <AmountWrapper rawValue={rawValue} suffix={symbol} value={shortValue} {...rest} />;
};

const Default = ({ value, locales = getBrowserLocal(), minimumFractions, maximumFractions, ...rest }) => {
  let formattedValue = value;
  if (Intl) {
    formattedValue = Intl.NumberFormat(locales, {
      minimumFractionDigits: minimumFractions,
      maximumFractionDigits: maximumFractions,
    }).format(+value);
  }
  return <AmountWrapper rawValue={value} value={formattedValue} {...rest} />;
};

export const Amount = {
  Default,
  Fiat,
  Crypto,
};

import { accurateToFixed } from './accurateToFixed';

export const formatNumber = (number: number | string) => new Intl.NumberFormat().format(+number);

export const formatCurrency = (amount: number | string, locale = 'en-US', currency = 'usd'): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(+amount);

export function numberFormatterShortenner(num, digits = 0) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find((arrItem) => num >= arrItem.value);

  return item ? accurateToFixed(num / item.value, digits).replace(rx, '$1') + item.symbol : '0';
}

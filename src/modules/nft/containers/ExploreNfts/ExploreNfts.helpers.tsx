export const defaultMinPrice = '0';
export const defaultMaxPrice = '10000';

export const categories = [
  { title: 'Games' },
  { title: 'Art' },
  { title: 'Trading Cards' },
  { title: 'Music' },
  { title: 'Domain names' },
];

export enum VariantValues {
  Explore = 'Explore',
  Landing = 'Landing',
  Mixed = 'Mixed',
}

export type VariantProps = keyof typeof VariantValues;

export const getSplitItemPart = (item: string, separator = '_', position = 0) => item.split(separator)[position];

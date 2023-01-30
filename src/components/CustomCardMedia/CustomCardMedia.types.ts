// eslint-disable-next-line no-shadow
export enum Proportions {
  p1to1 = 1,
  p3to4 = 3 / 4,
  p4to3 = 4 / 3,
  p16to9 = 16 / 9,
  p8to6 = 8 / 6,
}

export interface CustomCardMediaProps {
  width?: number;
  proportions?: number;
  src?: string;
  alt?: string;
  title?: string;
  className?: string;
}

export * from './routes';
export * from './resCodes';
export { default as URL } from './URL';

export const isProduction = true;

export const baseURL = isProduction ? 'https://kainu.io/api/v1' : 'https://katanainu.rocknblock.io/api/v1/';

export const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
export const ethMaskAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

export const ITEMS_PER_PAGE_8 = 8;
export const ITEMS_PER_PAGE_6 = 6;
export const ITEMS_PER_PAGE_9 = 9;

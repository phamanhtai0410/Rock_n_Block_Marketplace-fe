import Web3 from 'web3';

export const isAddress = (value: string): boolean => Web3.utils.isAddress(value);

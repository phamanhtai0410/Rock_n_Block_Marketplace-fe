import Web3 from 'web3';

export const getWeb3 = (provider = Web3.givenProvider) => {
  const web3 = new Web3(provider);
  return web3;
};

import { contractsConfig, ContractsNames } from 'services/WalletService/config';
import { Chains } from 'types';
import { AbiItem } from 'web3-utils';

export const getContractDataByItsName = (
  name: ContractsNames,
  isProduction: boolean,
  network: Chains,
): [AbiItem[], string] => {
  const { abi: contractAbi, address: contractAddress } =
    contractsConfig.contracts[name][isProduction ? 'mainnet' : 'testnet'];

  return [contractAbi as AbiItem[], contractAddress?.[network] || '']; // TODO: configure when address will added
};

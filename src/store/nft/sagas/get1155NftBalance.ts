import { isProduction } from 'appConstants';
import { call } from 'redux-saga/effects';
import { ContractsNames } from 'services/WalletService/config';
import { Chains } from 'types';
import { Collection1155Abi } from 'types/contracts';
import { getContractDataByItsName } from 'utils';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

type Props = {
  tokenId: string;
  web3Provider: Web3;
  collectionAddress: string;
  userAddress: string;
  network: Chains;
};

export function* get1155NftBalance({
  tokenId,
  web3Provider,
  collectionAddress,
  userAddress,
  network,
}: Props): Generator<any, string, any> {
  try {
    let ownedTokenAmount = '';
    const [collection1155Abi] = getContractDataByItsName(ContractsNames.collection1155, isProduction, network);

    const collectionContract: Collection1155Abi = yield new web3Provider.eth.Contract(
      collection1155Abi as AbiItem[],
      collectionAddress,
    );

    ownedTokenAmount = yield call(collectionContract.methods.balanceOf(userAddress, String(tokenId)).call);

    return ownedTokenAmount;
  } catch (error) {
    console.error(error);
    return '';
  }
}

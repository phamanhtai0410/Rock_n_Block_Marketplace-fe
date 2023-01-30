import { FC, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useShallowSelector } from 'hooks';
import { CollectionContainer, IFormInputs } from 'modules/layout/containers/CollectionContainer';
import { useWalletConnectorContext } from 'services';
import { createCollection } from 'store/collections/actions';
import actionTypes from 'store/collections/actionTypes';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';
import { NftStandard, RequestStatus } from 'types';

import { convertValuesToFormData } from './createCollection.helper';

export const CreateCollection: FC = () => {
  const dispatch = useDispatch();
  const { [actionTypes.CREATE_COLLECTION]: collectionCreateRequest } = useShallowSelector(uiSelector.getUI);
  const isStatusSuccess = collectionCreateRequest === RequestStatus.SUCCESS;
  const isStatusRequest = collectionCreateRequest === RequestStatus.REQUEST;
  const { chain } = useShallowSelector(userSelector.getUser);
  const network = useShallowSelector(userSelector.getProp('network'));
  const { walletService } = useWalletConnectorContext();

  const initialFormValues = useMemo<IFormInputs>(
    () => ({
      avatar: null,
      name: '',
      symbol: '',
      creatorRoyalty: '',
      standard: NftStandard.ERC721,
      gameSubcategoryId: '',
      description: '',
      foo: '',
      socials: {
        site: '',
        twitter: '',
        telegram: '',
        instagram: '',
        discord: '',
        medium: '',
      },
    }),
    [],
  );

  const handleSubmit = useCallback(
    (formValues: IFormInputs) => {
      const createCollectionFormData = convertValuesToFormData(formValues);
      dispatch(
        createCollection({
          collection: createCollectionFormData,
          network,
          web3: walletService.Web3(chain.rpc),
        }),
      );
    },
    [chain.rpc, dispatch, network, walletService],
  );

  return (
    <CollectionContainer
      onSubmit={handleSubmit}
      formValues={initialFormValues}
      isStatusSuccess={isStatusSuccess}
      isStatusRequest={isStatusRequest}
      isForEdit={false}
    />
  );
};

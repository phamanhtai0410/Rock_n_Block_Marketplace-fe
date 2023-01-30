import { FC, useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useShallowSelector } from 'hooks';
import { CollectionContainer, IFormInputs } from 'modules/layout/containers/CollectionContainer';
import { editCollection, getSingleCollection } from 'store/collections/actions';
import actionTypes from 'store/collections/actionTypes';
import collectionsSelectors from 'store/collections/selectors';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';
import { RequestStatus } from 'types';

import { convertToFormRequestData } from './editCollection.helper';

interface Params {
  id: string;
}

export type TEditCollection = Pick<IFormInputs, 'avatar' | 'description' | 'socials' | 'creatorRoyalty'>;

export const EditCollection: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<keyof Params>() as Params;
  const { id: userId } = useShallowSelector(userSelector.getProp('user'));
  const navigate = useNavigate();

  const { [actionTypes.EDIT_COLLECTION]: collectionCreateRequest } = useShallowSelector(uiSelector.getUI);
  const { [actionTypes.GET_SINGLE_COLLECTION]: collectionRequest } = useShallowSelector(uiSelector.getUI);

  const isStatusSuccess = collectionCreateRequest === RequestStatus.SUCCESS;
  const isStatusRequest = collectionCreateRequest === RequestStatus.REQUEST;

  useEffect(() => {
    dispatch(getSingleCollection({ id }));
  }, [id]);

  const collection = useShallowSelector(collectionsSelectors.getProp('singleCollection'));

  const initialEditValues = useMemo<TEditCollection>(
    () => ({
      name: collection?.name,
      symbol: collection?.symbol,
      description: collection?.description || '',
      creatorRoyalty: String(collection?.creatorRoyalty) || '',
      avatar: collection?.avatar || null,
      socials: {
        telegram: collection?.telegram || '',
        site: collection?.site || '',
        twitter: collection?.twitter || '',
        medium: collection?.medium || '',
        instagram: collection?.instagram || '',
        discord: collection?.discord || '',
      },
    }),
    [dispatch, collection],
  );

  useEffect(() => {
    if (collectionRequest === RequestStatus.SUCCESS && collection?.creator.id !== userId) {
      navigate('/404');
    }
  }, [collection]);

  const handleSubmit = useCallback(
    (values: TEditCollection) => {
      const newFormData = convertToFormRequestData(values);
      dispatch(
        editCollection({
          data: newFormData,
          id,
        }),
      );
    },
    [dispatch],
  );

  if (!collection) {
    return null;
  }

  return (
    <CollectionContainer
      onSubmit={handleSubmit}
      formValues={initialEditValues}
      isStatusSuccess={isStatusSuccess}
      isStatusRequest={isStatusRequest}
      collectionId={id}
      isForEdit
    />
  );
};

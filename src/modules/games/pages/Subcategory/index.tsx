/* eslint-disable react/no-array-index-key */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { Box, Divider } from '@mui/material';
import { ITEMS_PER_PAGE_6, routes } from 'appConstants';
import { NothingToShow, TopCollectionCard } from 'components';
import { GridContainer } from 'components/GridContainer';
import { TopCollectionCardSkeleton } from 'components/TopCollectionCard/components/TopCollectionCardSkeleton';
import { topCollectionCardMock } from 'components/TopCollectionCard/TopCollectionCard.mock';
import { useGetQuery, useModal, useShallowSelector } from 'hooks';
import { CategoryInfoHeader, SectionHeaderSkeleton } from 'modules/games/components';
import { DeleteItemProps, DeleteSubcategoryModal } from 'modules/games/pages/Category/components';
import { deleteCollection, getSubcategory } from 'store/games/actions';
import actionTypes from 'store/games/actionTypes';
import gamesSelectors from 'store/games/selectors';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';
import { CategoryParams, RequestStatus } from 'types';

export type SubcategoryParams = {
  subcategoryId: string;
} & CategoryParams;

export const Subcategory = () => {
  const dispatch = useDispatch();
  const params = useParams<keyof SubcategoryParams>() as SubcategoryParams;
  const navigate = useNavigate();
  const network = useGetQuery('network');

  const [isDeleteModalOpen, setDeleteModalOpen, setDeleteModalClose] = useModal(false);
  const [collectionOnDelete, setCollectionOnDelete] = useState<DeleteItemProps>({ id: 0, name: '' });

  const {
    user: { id: userId },
  } = useShallowSelector(userSelector.getUser);
  const { subcategory } = useShallowSelector(gamesSelectors.getGames);
  const getCollectionStatus = useShallowSelector(uiSelector.getProp(actionTypes.GET_SUBCATEGORY));
  const isCollectionDataLoading = getCollectionStatus === RequestStatus.REQUEST;

  const { name: subcategoryName, avatar, collections, owner } = subcategory ?? {};

  const isAbleToEdit = useMemo(() => Number(owner) === Number(userId), [userId, owner]);

  const handleOpenDeleteModal = ({ id, name }: DeleteItemProps) => {
    if (id) {
      setDeleteModalOpen();
      setCollectionOnDelete({ id, name });
    }
  };

  const handleDeleteCollection = useCallback(
    (id: number | string) => {
      dispatch(deleteCollection({ id, params: { ...params, network } }));
    },
    [dispatch, network, params],
  );

  const handleAddCollection = useCallback(() => {
    navigate(
      routes.games.game.category.subcategory.addGameCollection.root.getPath({
        network,
        ...params,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSubcategory({ network, ...params }));
  }, [dispatch, params]);

  return (
    <>
      <Box sx={{ position: 'relative', mb: 5 }}>
        {isCollectionDataLoading ? (
          <SectionHeaderSkeleton />
        ) : (
          <CategoryInfoHeader
            isAbleToEdit={isAbleToEdit}
            avatar={avatar}
            name={subcategoryName}
            subName={params.gameId}
            onAddMore={handleAddCollection}
            buttonText="Add collection +"
          />
        )}

        <Divider sx={{ mb: 5, mt: 4 }} />
        <Box sx={{ position: 'relative' }}>
          {!collections?.length && !isCollectionDataLoading ? (
            <NothingToShow sx={{ marginTop: 'auto', height: '100%' }} />
          ) : (
            <GridContainer columns={3} spacing={3} mt={5}>
              {isCollectionDataLoading
                ? Array(ITEMS_PER_PAGE_6)
                    .fill(topCollectionCardMock)
                    .map((_, index) => <TopCollectionCardSkeleton key={index} />)
                : collections?.map((collection) => (
                    <TopCollectionCard
                      key={collection.name}
                      {...collection}
                      onDelete={
                        isAbleToEdit
                          ? () => handleOpenDeleteModal({ id: collection.url || '', name: collection.name || '' })
                          : undefined
                      }
                    />
                  ))}
            </GridContainer>
          )}
        </Box>
      </Box>
      {isDeleteModalOpen && (
        <DeleteSubcategoryModal
          open={isDeleteModalOpen}
          deletedItemProps={collectionOnDelete}
          onClose={setDeleteModalClose}
          onDelete={handleDeleteCollection}
        />
      )}
    </>
  );
};

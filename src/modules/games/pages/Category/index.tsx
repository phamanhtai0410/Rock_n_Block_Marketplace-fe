/* eslint-disable react/no-array-index-key */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { Box, Divider, IconButton } from '@mui/material';
import { ITEMS_PER_PAGE_8, routes } from 'appConstants';
import { NothingToShow } from 'components';
import { GridContainer } from 'components/GridContainer';
import { Trash } from 'components/Icon/components';
import { useGetQuery, useModal, useShallowSelector, useUnmountEffect } from 'hooks';
import { CategoryCard, CategoryInfoHeader, SectionHeaderSkeleton } from 'modules/games/components';
import { CategoryCardSkeleton } from 'modules/games/components/CategoryCardSkeleton';
import { DeleteItemProps, DeleteSubcategoryModal } from 'modules/games/pages/Category/components';
import { deleteSubcategory, getCategory } from 'store/games/actions';
import gamesActionTypes from 'store/games/actionTypes';
import { clearCategory } from 'store/games/reducer';
import gamesSelectors from 'store/games/selectors';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';
import { COLOR_NEUTRALS_4 } from 'theme/colors';
import { CategoryParams, RequestStatus } from 'types';
import { fillArray } from 'utils';

export const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gameId, categoryId } = useParams<keyof CategoryParams>() as CategoryParams;
  const [subcategoryOnDelete, setSubcategoryOnDelete] = useState<DeleteItemProps>({ id: 0, name: '' });
  const [isDeleteModalOpen, setDeleteModalOpen, setDeleteModalClose] = useModal(false);
  const network = useGetQuery('network');

  const { category } = useShallowSelector(gamesSelectors.getGames);

  const { name: categoryName, avatar, subcategories, owner } = category ?? {};

  const {
    user: { id: userId },
  } = useShallowSelector(userSelector.getUser);

  const { [gamesActionTypes.GET_CATEGORY]: getCategoryRequestStatus } = useShallowSelector(uiSelector.getUI);
  const isCategoryLoading = getCategoryRequestStatus === RequestStatus.REQUEST;

  const isAbleToEdit = useMemo(() => Number(owner) === Number(userId), [userId, owner]);

  const handleOpenDeleteModal = ({ id, name }: DeleteItemProps) => {
    if (id) {
      setDeleteModalOpen();
      setSubcategoryOnDelete({ id, name });
    }
  };

  const handleAddSubcategory = () => {
    navigate(routes.games.game.category.addNewSubcategory.root.getPath({ gameId, categoryId, network }));
  };

  const handleOnDeleteSubCategory = useCallback(
    (id: number | string) => {
      dispatch(deleteSubcategory({ id, params: { gameId, categoryId, network } }));
    },
    [dispatch, subcategoryOnDelete],
  );

  useEffect(() => {
    dispatch(getCategory({ gameId, categoryId, network }));
  }, [dispatch, categoryId, gameId]);

  useUnmountEffect(() => dispatch(clearCategory()));

  return (
    <>
      <Box sx={{ position: 'relative', mb: 5 }}>
        {isCategoryLoading ? (
          <SectionHeaderSkeleton />
        ) : (
          <CategoryInfoHeader
            isAbleToEdit={isAbleToEdit}
            avatar={avatar}
            name={categoryName}
            subName={gameId}
            onAddMore={handleAddSubcategory}
            buttonText="Add subcategory +"
          />
        )}

        <Divider sx={{ mb: 5, mt: 4 }} />
        <Box>
          {!subcategories?.length && !isCategoryLoading ? (
            <NothingToShow sx={{ marginTop: 'auto', height: '100%' }} />
          ) : (
            <GridContainer columns={3} spacing={3} mt={5}>
              {isCategoryLoading
                ? fillArray(ITEMS_PER_PAGE_8).map((_, index) => <CategoryCardSkeleton key={index} />)
                : subcategories?.map(({ name, id, avatar: subcategoryAvatar }) => (
                    <CategoryCard
                      isAbleToEdit={isAbleToEdit}
                      path={routes.games.game.category.subcategory.root.getPath({
                        gameId,
                        categoryId,
                        subcategoryId: String(name),
                        network,
                      })}
                      name={name}
                      media={subcategoryAvatar as string}
                      key={name}
                    >
                      <IconButton
                        size="small"
                        className="rounded"
                        sx={{ ml: 1.5, color: COLOR_NEUTRALS_4 }}
                        onClick={() => handleOpenDeleteModal({ id: id || 0, name: name || '' })}
                      >
                        <Trash sx={{ fill: 'none', width: 16, height: 16 }} />
                      </IconButton>
                    </CategoryCard>
                  ))}
            </GridContainer>
          )}
        </Box>
      </Box>
      {isDeleteModalOpen && (
        <DeleteSubcategoryModal
          open={isDeleteModalOpen}
          deletedItemProps={subcategoryOnDelete}
          onClose={setDeleteModalClose}
          onDelete={handleOnDeleteSubCategory}
        />
      )}
    </>
  );
};

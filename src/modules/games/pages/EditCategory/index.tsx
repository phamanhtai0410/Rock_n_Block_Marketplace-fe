import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { routes } from 'appConstants';
import { useGetQuery, useRedirectHook, useShallowSelector, useUnmountEffect } from 'hooks';
import { CategoryContainer, formatDataForRequest, IAddCategoryForm, renameAddressKey } from 'modules/games/containers';
import { editCategory, getCategory } from 'store/games/actions';
import actionTypes from 'store/games/actionTypes';
import { clearCategory } from 'store/games/reducer';
import gamesSelectors from 'store/games/selectors';
import uiSelector from 'store/ui/selectors';
import { CategoryParams, RequestStatus } from 'types';

export const EditCategory = () => {
  const dispatch = useDispatch();
  const { gameId, categoryId } = useParams<keyof CategoryParams>() as CategoryParams;
  const navigate = useNavigate();
  const network = useGetQuery('network');

  const { category } = useShallowSelector(gamesSelectors.getGames);
  const { [actionTypes.EDIT_CATEGORY]: editCategoryRequest } = useShallowSelector(uiSelector.getUI);

  const { name, avatar, subcategories, owner } = category ?? {};

  const isStatusRequest = editCategoryRequest === RequestStatus.REQUEST;

  const initialEditValues = useMemo<IAddCategoryForm>(
    () => ({
      name: name || '',
      avatar: avatar || null,
      subcategories: renameAddressKey(subcategories || []) || [],
    }),
    [name, avatar, subcategories],
  );

  const handleSubmitForm = useCallback(
    async (values: IAddCategoryForm) => {
      const formattedData = await formatDataForRequest(values);
      dispatch(
        editCategory({
          gameId,
          categoryId,
          network,
          data: formattedData,
          navigate,
        }),
      );
    },
    [dispatch],
  );

  const handleCancelClick = useCallback(() => {
    navigate(routes.games.game.root.getPath(gameId, network));
  }, [gameId, navigate]);

  useEffect(() => {
    dispatch(getCategory({ gameId, categoryId, network }));
  }, [dispatch]);

  useRedirectHook({ id: Number(owner), isEntityLoaded: Boolean(category) });

  useUnmountEffect(() => dispatch(clearCategory()));

  // TODO: make skeletons
  if (!category) {
    return null;
  }
  return (
    <CategoryContainer
      formValues={initialEditValues}
      isEditPage
      onSubmit={handleSubmitForm}
      onCancel={handleCancelClick}
      isStatusRequest={isStatusRequest}
    />
  );
};

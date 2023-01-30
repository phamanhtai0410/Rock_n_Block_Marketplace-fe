import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { routes } from 'appConstants';
import { useGetQuery, useRedirectHook, useShallowSelector } from 'hooks';
import { CategoryContainer, IAddCategoryForm } from 'modules/games/containers';
import { addCategory, getGame } from 'store/games/actions';
import actionTypes from 'store/games/actionTypes';
import gamesSelectors from 'store/games/selectors';
import uiSelector from 'store/ui/selectors';
import { RequestStatus } from 'types';

export type Params = {
  id: string;
};

const initialFormValues = {
  name: '',
  subcategories: [
    {
      name: '',
      addresses: [
        {
          address: '',
        },
      ],
    },
  ],
};

export const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<keyof Params>() as Params;
  const { game } = useShallowSelector(gamesSelectors.getGames);

  const network = useGetQuery('network');

  const { [actionTypes.ADD_CATEGORY]: addCategoryRequest } = useShallowSelector(uiSelector.getUI);
  const isStatusRequest = addCategoryRequest === RequestStatus.REQUEST;

  const handleSubmitForm = useCallback(
    (data: IAddCategoryForm) => {
      dispatch(addCategory({ id, data: [data], navigate, network }));
    },
    [dispatch, id],
  );

  const handleCancelClick = useCallback(() => {
    navigate(routes.games.game.root.getPath(id, network));
  }, [id, navigate]);

  useEffect(() => {
    dispatch(getGame({ gameName: id, network }));
  }, []);

  useRedirectHook({ id: Number(game?.user?.id), isEntityLoaded: Boolean(game) });

  return (
    <CategoryContainer
      isStatusRequest={isStatusRequest}
      formValues={initialFormValues}
      onSubmit={handleSubmitForm}
      onCancel={handleCancelClick}
    />
  );
};

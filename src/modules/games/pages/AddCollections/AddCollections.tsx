import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { Card, FormButtons } from 'components';
import { useGetQuery, useRedirectHook, useShallowSelector } from 'hooks';
import { Address } from 'modules/games/components';
import { SubcategoryParams } from 'modules/games/pages/Subcategory';
import apiActions from 'store/api/actions';
import { addCollections, getSubcategory } from 'store/games/actions';
import actionTypes from 'store/games/actionTypes';
import gamesSelectors from 'store/games/selectors';
import uiSelector from 'store/ui/selectors';
import { Addresses, RequestStatus } from 'types';

import { initialFormValues, validationSchema } from './AddCollections.helper';

export const AddCollections = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const params = useParams<keyof SubcategoryParams>() as SubcategoryParams;
  const navigate = useNavigate();
  const network = useGetQuery('network');
  const { subcategory } = useShallowSelector(gamesSelectors.getGames);

  const { [actionTypes.ADD_COLLECTIONS]: addCollectionRequest } = useShallowSelector(uiSelector.getUI);
  const isStatusRequest = addCollectionRequest === RequestStatus.REQUEST;
  const isCollectionAdded = addCollectionRequest === RequestStatus.SUCCESS;

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Addresses>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: initialFormValues,
  });

  const handleCancelClick = useCallback(() => {
    navigate(routes.games.game.category.subcategory.root.getPath({ network, ...params }));
  }, [navigate, network, params]);

  const handleSubmitForm = (formData: Addresses) => {
    dispatch(
      addCollections({
        data: formData,
        network,
        ...params,
      }),
    );
  };

  useEffect(() => {
    if (isCollectionAdded) {
      handleCancelClick();
      dispatch(apiActions.reset(actionTypes.ADD_COLLECTIONS));
    }
  }, [dispatch, handleCancelClick, isCollectionAdded]);

  useEffect(() => {
    dispatch(getSubcategory({ network, ...params }));
  }, [dispatch, params]);

  useRedirectHook({ id: Number(subcategory?.owner), isEntityLoaded: Boolean(subcategory) });

  return (
    <Box sx={{ pb: 10 }}>
      <Typography sx={{ mb: 7 }} variant="h2">
        Add new collection
      </Typography>
      <Box
        onSubmit={handleSubmit(handleSubmitForm)}
        component="form"
        sx={{ width: '100%', maxWidth: isSmallScreen ? '100%' : '640px' }}
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            background: theme.themeColors.colorBackground,
            padding: 2,
            mt: 2.5,
          }}
        >
          <Address<Addresses>
            {...{
              register,
              errors,
              control,
              watch,
            }}
            pathToError={(addressIndex) => errors?.addresses?.[addressIndex]}
            pathToItem={(addressIndex) => `addresses.${addressIndex}.address`}
            fieldArrayName="addresses"
            sx={{ maxWidth: '100%' }}
          />
        </Card>
        <FormButtons isStatusRequest={isStatusRequest} onCancelClick={handleCancelClick} />
      </Box>
    </Box>
  );
};

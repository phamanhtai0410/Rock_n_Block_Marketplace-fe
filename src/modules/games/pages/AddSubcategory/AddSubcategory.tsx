import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { routes } from 'appConstants';
import { Card, FormButtons } from 'components';
import { useGetQuery, useRedirectHook, useShallowSelector, useUnmountEffect } from 'hooks';
import { Address } from 'modules/games/components';
import { addSubcategory, getCategory } from 'store/games/actions';
import actionTypes from 'store/games/actionTypes';
import { clearCategory } from 'store/games/reducer';
import gamesSelectors from 'store/games/selectors';
import uiSelector from 'store/ui/selectors';
import { TextFieldLabel } from 'theme/variables';
import { CategoryParams, RequestStatus } from 'types';

import { AddSubcategoryFormType, initialFormValues, validationSchema } from './AddSubcategory.helper';

export const AddSubcategory = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const network = useGetQuery('network');
  const { gameId, categoryId } = useParams<keyof CategoryParams>() as CategoryParams;
  const { category } = useShallowSelector(gamesSelectors.getGames);

  const { [actionTypes.ADD_SUBCATEGORY]: addSubcategoryRequest } = useShallowSelector(uiSelector.getUI);
  const isStatusRequest = addSubcategoryRequest === RequestStatus.REQUEST;

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<AddSubcategoryFormType>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: initialFormValues,
  });

  const handleSubmitForm = (formData: AddSubcategoryFormType) => {
    dispatch(
      addSubcategory({
        data: formData,
        network,
        gameId,
        categoryId,
        navigate,
      }),
    );
  };

  const handleCancelClick = () => {
    navigate(routes.games.game.category.root.getPath({ gameId, categoryId, network }));
  };

  useEffect(() => {
    dispatch(getCategory({ gameId, categoryId, network }));
  }, [dispatch, categoryId, gameId]);

  useUnmountEffect(() => dispatch(clearCategory()));

  useRedirectHook({ id: Number(category?.owner), isEntityLoaded: Boolean(category) });

  return (
    <Box sx={{ pb: 10 }}>
      <Typography sx={{ mb: 7 }} variant="h2">
        Add new subcategory
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
          <TextFieldLabel>{errors.name?.message || 'Subcategory name'}</TextFieldLabel>
          <TextField
            error={Boolean(errors.name)}
            {...register('name')}
            sx={{ mb: 2.5, width: '100%' }}
            placeholder="Subcategory name"
          />
          <Address<AddSubcategoryFormType>
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

        <FormButtons isEditPage onCancelClick={handleCancelClick} isStatusRequest={isStatusRequest} sx={{ mt: 4 }} />
      </Box>
    </Box>
  );
};

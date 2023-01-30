import { Fragment, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, MenuItem, Stack, styled, TextField, Typography } from '@mui/material';
import { routes } from 'appConstants';
import { FormButtons } from 'components';
import { FormSkeleton } from 'components/FormSkeleton';
import { useGetQuery, useRedirectHook, useShallowSelector } from 'hooks';
import { socialMediaFormFields } from 'modules/layout/containers';
import apiActions from 'store/api/actions';
import { editGame, getGame } from 'store/games/actions';
import actionTypes from 'store/games/actionTypes';
import gamesSelectors from 'store/games/selectors';
import uiSelector from 'store/ui/selectors';
import { BORDER_NEUTRALS_6, TextFieldLabel } from 'theme/variables';
import { RequestStatus } from 'types';
import { flexHelper } from 'utils';

import { backgroundColorsVariants, gameValidationSchema, IEditGameFormInputs } from './EditGame.helper';

export const InputField = styled(TextField)({
  width: '100%',
});

export const InputLabel = styled(TextFieldLabel)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

interface Params {
  id: string;
}

export const EditGame = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: gameName } = useParams<keyof Params>() as Params;
  const currentNetwork = useGetQuery('network');

  const { [actionTypes.EDIT_GAME]: editGameRequest, [actionTypes.GET_GAME]: getGameRequest } = useShallowSelector(
    uiSelector.getUI,
  );
  const isStatusRequest = editGameRequest === RequestStatus.REQUEST;
  const isGetGameRequest = getGameRequest === RequestStatus.REQUEST;

  const isStatusSuccess = editGameRequest === RequestStatus.SUCCESS;

  const { game } = useShallowSelector(gamesSelectors.getGames);

  useEffect(() => {
    dispatch(getGame({ gameName, network: currentNetwork }));
  }, [dispatch, gameName]);

  const onSubmitForm = (data: IEditGameFormInputs) => {
    dispatch(
      editGame({
        data: {
          website: data.site,
          ...data,
        },
        id: gameName,
        network: currentNetwork,
      }),
    );
  };

  const handleCancelClick = useCallback(() => {
    if (game?.name) {
      navigate(routes.games.game.root.getPath(game.name, currentNetwork));
    }
  }, [currentNetwork, navigate]);

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditGameFormInputs>({
    resolver: yupResolver(gameValidationSchema),
    mode: 'onChange',
  });

  const defaultColorValue = backgroundColorsVariants.find(({ label }) => label === 'Dark')?.value;

  useEffect(() => {
    reset({
      name: game?.name || '',
      email: game?.email || '',
      description: game?.description || '',
      backgroundColor: game?.backgroundColor || '',
      twitter: game?.twitter || '',
      telegram: game?.telegram || '',
      site: game?.website || '',
      medium: game?.medium || '',
      instagram: game?.instagram || '',
      discord: game?.discord || '',
    });
  }, [game, reset]);

  useEffect(() => {
    if (isStatusSuccess) {
      handleCancelClick();
      dispatch(apiActions.reset(actionTypes.EDIT_GAME));
    }
  }, [dispatch, handleCancelClick, isStatusSuccess]);

  useRedirectHook({ id: Number(game?.user?.id), isEntityLoaded: Boolean(game) });

  return (
    <Box sx={{ pb: 10 }}>
      <Typography sx={{ mb: 7 }} variant="h2">
        Edit game page
      </Typography>
      {isGetGameRequest ? (
        <FormSkeleton withLabels />
      ) : (
        <Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 4, md: 14 }}>
            <Box sx={{ maxWidth: '443px', width: '100%' }}>
              <Typography variant="body2">Information</Typography>
              <InputLabel>{errors.name?.message || 'Name'}</InputLabel>
              <InputField
                error={Boolean(errors.name)}
                placeholder="e. g. “Redeemable Bitcoin Card with logo”"
                {...register('name')}
              />
              <InputLabel>{errors.email?.message || 'Contact email'}</InputLabel>
              <InputField error={Boolean(errors.email)} placeholder="enricocole@gmail.com" {...register('email')} />

              <InputLabel>{errors.backgroundColor?.message || 'Background color'}</InputLabel>
              <TextField
                {...register('backgroundColor')}
                select
                sx={{ width: '100%' }}
                error={Boolean(errors.backgroundColor)}
                value={watch('backgroundColor') || defaultColorValue}
              >
                {backgroundColorsVariants.map((color) => (
                  <MenuItem key={color.label} value={color.value} sx={{ ...flexHelper('flex-start', 'center') }}>
                    <Box
                      sx={{
                        width: 25,
                        height: 25,
                        marginRight: 1,
                        background: color.value,
                        borderRadius: '50%',
                        border: BORDER_NEUTRALS_6,
                      }}
                    />
                    {color.label}
                  </MenuItem>
                ))}
              </TextField>

              <InputLabel>{errors.description?.message || 'Description'}</InputLabel>
              <InputField
                multiline
                rows={5}
                error={Boolean(errors.description)}
                placeholder="e. g. “After purchasing you will able to recived the logo...”"
                {...register('description')}
              />
            </Box>
            <Box sx={{ maxWidth: '443px', width: '100%' }}>
              <Typography variant="body2">Social media</Typography>
              {socialMediaFormFields.map(({ name, label, placeholder }) => (
                <Fragment key={name}>
                  <InputLabel>{errors[name]?.message || label}</InputLabel>
                  <InputField {...register(name)} error={!!errors[name]} placeholder={placeholder} />
                </Fragment>
              ))}
            </Box>
          </Stack>

          <FormButtons
            isEditPage
            onCancelClick={handleCancelClick}
            isStatusRequest={isStatusRequest}
            sx={{ marginTop: { xs: 4, sm: 7.5, md: 11 } }}
          />
        </Box>
      )}
    </Box>
  );
};

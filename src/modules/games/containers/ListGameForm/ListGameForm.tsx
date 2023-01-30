import { Fragment, useCallback, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, IconButton, MenuItem, TextField, Typography, useMediaQuery } from '@mui/material';
import { routes } from 'appConstants';
import { Card, FormButtons } from 'components';
import { Trash } from 'components/Icon/components';
import { useShallowSelector } from 'hooks';
import { getCategoryFormId } from 'modules/games/containers';
import { Subcategories } from 'modules/games/containers/ListGameForm/components';
import { socialMediaFormFields } from 'modules/layout/containers';
import { currentChains } from 'services/WalletService/config';
import apiActions from 'store/api/actions';
import { listGame } from 'store/games/actions';
import actionTypes from 'store/games/actionTypes';
import uiSelector from 'store/ui/selectors';
import { TextFieldLabel } from 'theme/variables';
import { RequestStatus } from 'types';
import { flexHelper } from 'utils';

import { formDefaultValues, validationSchema } from './ListGame.helper';
import { IListFormInputs } from './ListGame.types';

const SelectLabel = () => <TextFieldLabel>Choose blockchain</TextFieldLabel>;

export const ListGameForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { [actionTypes.LIST_GAME]: listGameRequest } = useShallowSelector(uiSelector.getUI);
  const isStatusSuccess = listGameRequest === RequestStatus.SUCCESS;
  const isStatusRequest = listGameRequest === RequestStatus.REQUEST;

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, dirtyFields },
  } = useForm<IListFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: formDefaultValues,
  });

  const isSmallScreen = useMediaQuery('(max-width:1000px)');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'categories',
  });

  const handleSubmitForm = useCallback(
    (data: IListFormInputs) => {
      const reqData = { website: data.site, ...data };
      dispatch(listGame(reqData));
    },
    [dispatch],
  );

  const handleCancelClick = () => {
    navigate(routes.games.root.path);
  };

  useEffect(() => {
    if (isStatusSuccess) {
      dispatch(apiActions.reset(actionTypes.LIST_GAME));
      handleCancelClick();
    }
  }, [isStatusSuccess, dispatch]);

  return (
    <Box sx={{ pb: 10 }}>
      <Typography sx={{ mb: 7 }} variant="h2">
        List my game
      </Typography>
      <Box
        onSubmit={handleSubmit(handleSubmitForm)}
        component="form"
        sx={{ width: '100%', maxWidth: isSmallScreen ? '100%' : '640px' }}
      >
        <TextFieldLabel>{errors.name?.message || 'Game Name'}</TextFieldLabel>
        <TextField
          error={Boolean(errors.name)}
          {...register('name')}
          sx={{ mb: 4, width: '100%' }}
          placeholder="Name"
        />
        <TextFieldLabel>{errors.email?.message || 'Project contact e-mail'}</TextFieldLabel>
        <TextField
          error={Boolean(errors.email)}
          {...register('email')}
          sx={{ mb: 4, width: '100%' }}
          placeholder="mail@mail.com"
        />
        <TextFieldLabel>{errors.network?.message || 'Choose blockchain of the game (ETH/BSC/POLYGON)'}</TextFieldLabel>
        <TextField
          {...register('network')}
          select
          sx={{ mb: 4, width: '100%' }}
          error={Boolean(errors.network)}
          value={watch('network')}
          SelectProps={{
            displayEmpty: true,
            renderValue: dirtyFields.network ? undefined : SelectLabel,
          }}
        >
          {currentChains.map(({ name, id, img, chainId }) => (
            <MenuItem key={chainId} value={id} sx={{ ...flexHelper('flex-start', 'center') }}>
              <Box component="img" src={img} sx={{ width: 20, height: 20, marginRight: 1 }} />
              {name}
            </MenuItem>
          ))}
        </TextField>
        <TextFieldLabel>{errors.description?.message || 'Description'}</TextFieldLabel>
        <TextField
          multiline
          rows={5}
          error={Boolean(errors.description)}
          placeholder="e. g. “After purchasing you will able to recived the logo...”"
          {...register('description')}
          sx={{ mb: 4, width: '100%' }}
        />
        {socialMediaFormFields.map(({ id, name, label, placeholder }) => {
          return (
            <Fragment key={id}>
              <TextFieldLabel>{(!!errors[id] && errors[name]?.message) || label}</TextFieldLabel>
              <TextField
                error={Boolean(errors[id])}
                placeholder={placeholder}
                {...register(`${name}`)}
                sx={{ mb: 4, width: '100%' }}
              />
            </Fragment>
          );
        })}
        <TextFieldLabel>{errors.whitepaperLink?.message || 'Whitepaper link'}</TextFieldLabel>
        <TextField
          error={Boolean(errors.whitepaperLink)}
          {...register('whitepaperLink')}
          sx={{ mb: 4, width: '100%' }}
          placeholder="https://katanainu.com/katanainuwhitepaper.pdf"
        />

        <Typography variant="h4">Category</Typography>
        {fields.map((category, categoryIndex) => {
          return (
            <Card
              sx={{
                mt: 5,
                padding: 2,
                position: 'relative',
              }}
              error={Boolean(errors.categories?.[categoryIndex])}
              key={category.id}
            >
              <Box sx={{ ...flexHelper('space-between', 'center'), mb: 2.5 }}>
                <Typography>{`Category №${categoryIndex + 1}`}</Typography>
                {fields.length > 1 && (
                  <IconButton className="border" onClick={() => remove(categoryIndex)}>
                    <Trash sx={{ fill: 'none' }} />
                  </IconButton>
                )}
              </Box>
              <TextFieldLabel>{errors.categories?.[categoryIndex]?.name?.message || 'Category name'}</TextFieldLabel>
              <TextField
                error={Boolean(errors.categories?.[categoryIndex]?.name)}
                {...register(getCategoryFormId({ categoryIndex }))}
                sx={{ width: '100%' }}
                placeholder="Category"
              />
              <Subcategories {...{ control, watch, register, errors, categoryIndex }} />
            </Card>
          );
        })}
        <Button
          variant="outlined"
          size="small"
          sx={{ mt: 6.5 }}
          onClick={() => append([{ name: '', subcategories: [{ name: '', addresses: [{ address: '' }] }] }])}
        >
          Add category +
        </Button>

        <FormButtons
          isStatusRequest={isStatusRequest}
          onCancelClick={handleCancelClick}
          sx={{ mt: 6, maxWidth: '362px' }}
        />
      </Box>
    </Box>
  );
};

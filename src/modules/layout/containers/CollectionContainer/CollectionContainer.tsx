import { createRef, FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { routes } from 'appConstants';
import { Card, Icon, Spinner } from 'components';
import { InfoFieldsSkeleton, SocialsSkeletons } from 'components/FormSkeleton/components';
import { useShallowSelector } from 'hooks';
import { TEditCollection } from 'modules/collection/pages/EditCollection';
import apiActions from 'store/api/actions';
import { getMaxRoyalty } from 'store/collections/actions';
import actionTypes from 'store/collections/actionTypes';
import collectionsSelectors from 'store/collections/selectors';
import { getGame, getOwnedGames } from 'store/games/actions';
import gamesSelectors from 'store/games/selectors';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';
import { COLOR_RED } from 'theme/colors';
import { TextFieldLabel } from 'theme/variables';
import { NftStandard, RequestStatus } from 'types';

import { FileUploader, FileUploaderHandlers } from '../FileUploader';
import { imagesTypes } from '../FileUploader/FileUploader.helper';

import { Information } from './components/Information';
import { NftVariants } from './components/NftVariants/NftVariants';
import { SocialMedia } from './components/SocialMedia/SocialMedia';
import { validationSchema } from './CollectionContainer.helper';

export interface IFormInputs {
  name: string;
  symbol: string;
  description: string;
  creatorRoyalty: string;
  standard: NftStandard;
  avatar: File | null | string;
  gameSubcategoryId?: string;
  socials: {
    site: string;
    twitter: string;
    telegram: string;
    instagram: string;
    discord: string;
    medium: string;
  };
}

export type CollectionContainerProps = {
  isForEdit: boolean;
  formValues: IFormInputs | TEditCollection;
  onSubmit: (data: IFormInputs) => void;
  isStatusRequest: boolean;
  isStatusSuccess: boolean;
  collectionId?: string;
};

// eslint-disable-next-line react/display-name
const SelectLabel = (variant: 'category' | 'subcategory') => () => <TextFieldLabel>{variant}</TextFieldLabel>;

export const CollectionContainer: FC<CollectionContainerProps> = ({
  onSubmit,
  formValues,
  isForEdit,
  isStatusSuccess,
  isStatusRequest,
  collectionId,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { id: userId } = useShallowSelector(userSelector.getProp('user'));
  const network = useShallowSelector(userSelector.getProp('network'));
  const { ownedGames, game } = useShallowSelector(gamesSelectors.getGames);
  const dropzoneRef = createRef<FileUploaderHandlers>();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();

  const maxRoyalty = useShallowSelector(collectionsSelectors.getProp('maxRoyalty'));
  const { [actionTypes.GET_SINGLE_COLLECTION]: collectionRequest } = useShallowSelector(uiSelector.getUI);
  const isCollectionRequest = collectionRequest === RequestStatus.REQUEST;

  const handleUploadCollectionLogo = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  const handleGetGame = useCallback(
    (gameName, gameNetwork) => {
      dispatch(getGame({ gameName, network: gameNetwork }));
    },
    [dispatch],
  );

  const [isAddToGame, setIsAddToGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const schema = useMemo(
    () => validationSchema({ maxRoyalty, isAddToGame: Boolean(selectedGame && isAddToGame) }),
    [isAddToGame, maxRoyalty, selectedGame],
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    resetField,
    formState: { errors, dirtyFields },
  } = useForm<IFormInputs>({
    defaultValues: formValues,
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const submitHandler: typeof onSubmit = useCallback(
    (data) => {
      const { gameSubcategoryId, ...restData } = data;
      onSubmit({
        ...(isAddToGame && { gameSubcategoryId }),
        ...restData,
      });
    },
    [isAddToGame, onSubmit],
  );

  const handleChangeTab = useCallback(
    (_: unknown, newValue: string) => {
      setSelectedGame(newValue);
      setSelectedCategory('');
      resetField('gameSubcategoryId');
      handleGetGame(newValue, network);
    },
    [handleGetGame, network],
  );

  const handleDeleteCollectionLogo = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.clearPreview();
    }
  };

  const handleClearClick = () => {
    if (isForEdit && collectionId) {
      navigate(routes.collections.root.getPath(+collectionId));
    } else {
      navigate(routes.create.root.path);
    }
  };
  useEffect(() => {
    if (isStatusSuccess) {
      reset(formValues);
      handleDeleteCollectionLogo();
      dispatch(apiActions.reset(isForEdit ? actionTypes.EDIT_COLLECTION : actionTypes.CREATE_COLLECTION));
      handleClearClick();
    }
  }, [isStatusSuccess, dispatch, formValues, reset]);

  const handleUpdateGames = useCallback(() => {
    dispatch(getOwnedGames({ id: String(userId), network }));
  }, [dispatch, network]);

  useEffect(() => {
    dispatch(getMaxRoyalty());
    if (!isForEdit) {
      handleUpdateGames();
    }
  }, [dispatch, handleUpdateGames, isForEdit]);

  const availableSubcategories = useMemo(
    () => game?.categories?.find((item) => item.name === selectedCategory),
    [game?.categories, selectedCategory],
  );

  useEffect(() => {
    if (ownedGames[0]?.name) {
      handleChangeTab('', ownedGames[0]?.name);
    }
  }, [ownedGames]);

  return (
    <Box sx={{ pb: 5 }}>
      <Typography sx={{ mb: 7 }} variant="h2">
        {isForEdit ? 'Edit collection' : 'Create collection'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(submitHandler)}>
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ mb: 4 }} variant="body2">
            Upload logo image
          </Typography>
          <Stack direction="row" spacing={4} alignItems={isForEdit ? 'center' : 'flex-start'}>
            <FileUploader
              defaultPreview={formValues.avatar || ''}
              error={Boolean(errors.avatar?.message)}
              acceptFiles={imagesTypes}
              {...register('avatar')}
              onChange={(file) => {
                setValue('avatar', file);
              }}
              ref={dropzoneRef}
              maxFileSize={5}
            />
            <Box>
              {!isForEdit && (
                <>
                  <Typography sx={{ mb: 1.5, maxWidth: 324, fontSize: '14px' }}>
                    Acceptable file format: PNG, JPG, GIF maximum file size: 5 MB
                  </Typography>
                  <Typography sx={{ mb: 1.5, maxWidth: 324, fontSize: '14px' }}>
                    We recommend an image of at least 400x400. Gifs work too 🙌
                  </Typography>
                </>
              )}
              {isForEdit ? (
                <Button
                  size="small"
                  disabled={!watch('avatar')}
                  variant="outlined"
                  onClick={handleDeleteCollectionLogo}
                >
                  Delete
                </Button>
              ) : (
                <Button size="small" variant="outlined" onClick={handleUploadCollectionLogo}>
                  Upload
                </Button>
              )}
            </Box>
          </Stack>
        </Box>
        <Divider sx={{ mb: 4 }} />
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 4, md: 10 }}>
          <Box sx={{ width: '100%' }}>
            {isCollectionRequest ? (
              <InfoFieldsSkeleton withLabels />
            ) : (
              <Information isForEdit={isForEdit} register={register} errors={errors} />
            )}
            {!isForEdit && ownedGames.length > 0 && (
              <Card
                error={Boolean(errors.gameSubcategoryId?.message)}
                sx={{ mb: 4, width: '100%', pt: 3.5, maxWidth: isSmallScreen ? '100%' : '443px' }}
              >
                {!!errors.gameSubcategoryId && (
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 0.5,
                      fontSize: '12px',
                      lineHeight: '20px',
                      fontWeight: 400,
                      color: COLOR_RED,
                      position: 'absolute',
                      transform: 'translateY(-22px)',
                    }}
                  >
                    All fields must be filled
                  </Typography>
                )}
                <FormControlLabel
                  checked={isAddToGame}
                  onChange={() => setIsAddToGame(!isAddToGame)}
                  control={<Checkbox />}
                  label="Add collection to the game"
                />
                {isAddToGame && (
                  <>
                    <Stack alignItems="center" direction="row" spacing={2} sx={{ mb: 0.5, mt: 3 }}>
                      <Typography variant="body1">Сhoose game</Typography>
                      <IconButton onClick={handleUpdateGames} size="small" className="rounded">
                        <Icon.Refresh />
                      </IconButton>
                    </Stack>
                    <Typography sx={{ fontSize: '12px', mb: 3 }} variant="body2">
                      Choose an exiting game collection
                    </Typography>
                    <Tabs
                      onChange={handleChangeTab}
                      value={selectedGame}
                      variant="scrollable"
                      scrollButtons
                      allowScrollButtonsMobile
                      TabScrollButtonProps={{ className: 'bottom' }}
                      className="outlined scrollable"
                    >
                      {ownedGames.map(({ avatar, name }) => (
                        <Tab
                          sx={{ mr: 2, padding: `${theme.spacing(3)} !important`, borderRadius: '16px' }}
                          key={name}
                          value={name || ''}
                          label={
                            <Stack sx={{ width: 145, wordBreak: 'break-word' }}>
                              <Box
                                component="img"
                                src={avatar}
                                sx={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: '50%',
                                  marginBottom: 1,
                                }}
                              />
                              <Box sx={{ textAlign: 'start' }}>{name}</Box>
                            </Stack>
                          }
                        />
                      ))}
                    </Tabs>
                    {selectedGame && (
                      <Grid container spacing={{ xs: 2, sm: 1 }}>
                        <Grid item xs={12} sm={6}>
                          <TextFieldLabel>Category</TextFieldLabel>
                          <TextField
                            select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            SelectProps={{
                              displayEmpty: true,
                              renderValue: selectedCategory ? undefined : SelectLabel('category'),
                            }}
                            sx={{ width: '100%' }}
                          >
                            {game?.categories?.map(({ name, id }) => (
                              <MenuItem key={id} value={name}>
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {name}
                                </span>
                              </MenuItem>
                            )) ?? <MenuItem>No items</MenuItem>}
                          </TextField>
                        </Grid>
                        {selectedCategory && (
                          <Grid item xs={12} sm={6}>
                            <TextFieldLabel>Subcategory</TextFieldLabel>
                            <TextField
                              select
                              error={Boolean(errors.gameSubcategoryId?.message)}
                              {...register('gameSubcategoryId')}
                              value={watch('gameSubcategoryId')}
                              SelectProps={{
                                displayEmpty: true,
                                renderValue: dirtyFields.gameSubcategoryId ? undefined : SelectLabel('subcategory'),
                              }}
                              sx={{ width: '100%' }}
                            >
                              {availableSubcategories?.subcategories.map(({ name, id }) => (
                                <MenuItem key={id} value={id}>
                                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {name}
                                  </span>
                                </MenuItem>
                              )) ?? <MenuItem>No items</MenuItem>}
                            </TextField>
                          </Grid>
                        )}
                      </Grid>
                    )}
                  </>
                )}
              </Card>
            )}
            <TextFieldLabel>{errors.creatorRoyalty?.message || 'Royalties'}</TextFieldLabel>
            <TextField
              placeholder="10"
              error={Boolean(errors.creatorRoyalty)}
              {...register('creatorRoyalty')}
              sx={{ mb: 4 }}
            />
            {!isForEdit && !isSmallScreen && <NftVariants register={register} />}
          </Box>

          <Box sx={{ width: '100%' }}>
            {isCollectionRequest ? (
              <SocialsSkeletons withLabels />
            ) : (
              <SocialMedia register={register} errors={errors} />
            )}
          </Box>
        </Stack>

        {!isForEdit && isSmallScreen && <NftVariants register={register} />}

        <Divider sx={{ mb: 4 }} />

        <Box sx={{ display: 'flex', gap: '14px' }}>
          <Button
            disabled={isStatusRequest}
            type="submit"
            sx={{ mr: 1.5 }}
            endIcon={isStatusRequest ? <Spinner type="simple" /> : null}
          >
            {isForEdit ? 'Save' : 'Create collection'}
          </Button>
          <Button disabled={isStatusRequest} onClick={handleClearClick} variant="outlined">
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

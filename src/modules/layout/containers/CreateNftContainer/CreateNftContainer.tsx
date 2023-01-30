import { FC, Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FileWithPath } from 'react-dropzone';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  Stack,
  styled,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { routes } from 'appConstants';
import { Card, Icon, QuantityInput } from 'components';
import { ChainSelect } from 'components/ChainSelect';
import { Plus } from 'components/Icon/components/Plus';
import { useShallowSelector } from 'hooks';
import { uniqueId } from 'lodash';
import { ListForSale, Listings, Rates, saleTokenStateKeys } from 'modules/create/containers/ListForSale';
import { useWalletConnectorContext } from 'services';
import { getMyCollections } from 'store/collections/actions';
import collectionsSelectors from 'store/collections/selectors';
import { createNft } from 'store/nft/actions';
import { getCategories } from 'store/nfts/actions';
import nftsSelectors from 'store/nfts/selectors';
import userSelector from 'store/user/selectors';
import { COLOR_NEUTRALS_4, COLOR_NEUTRALS_8, COLOR_RED } from 'theme/colors';
import { TextFieldLabel } from 'theme/variables';
import { Chains, Nullable, Token } from 'types';
import { Standard } from 'types/api/enums';
import { flexHelper } from 'utils';

import { FileUploader } from '../FileUploader';
import { imagesTypes } from '../FileUploader/FileUploader.helper';

import { PreviewNft } from './components/PreviewNft';
import {
  checkIfCoverIsRequired,
  convertToFormRequestData,
  formDefaultValues,
  MAX_FILE_SIZE,
  validationSchema,
} from './CreateNftContainer.helper';

export interface NftDetails {
  name: string;
  type: string;
}

export interface IFormInputs {
  name: string;
  description: string;
  category: number;
  media?: FileWithPath | null;
  sellingQuantity?: number;
  currency?: Token;
  saleType?: string;
  price?: string;
  totalSupply?: number;
  preview?: File | null;
  collection?: number;
  auctionTimestamp?: number;
  details?: Array<NftDetails>;
}

const SectionTitle = styled(Typography)(() => ({
  fontSize: '14px',
  fontWeight: 500,
}));

const SelectLabel = () => <TextFieldLabel>Choose category</TextFieldLabel>;

export const CreateNftContainer: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { walletService, connect } = useWalletConnectorContext();
  const { provider, chain, network } = useShallowSelector(userSelector.getUser);

  const theme = useTheme();

  const { myCollections } = useShallowSelector(collectionsSelectors.getCollections);
  const {
    user: { name: userName, address: userAddress },
    tokenData,
  } = useShallowSelector(userSelector.getUser);

  const { categories } = useShallowSelector(nftsSelectors.getNfts);

  const [nftStandard, setNftStandard] = useState(
    new URLSearchParams(window.location.search).get('standard') as Standard,
  );
  const [isAddToCollection, setIsAddToCollection] = useState(false);
  const [isListForSaleNow, setIsListForSaleNow] = useState(false);
  const [isPreviewNftModalOpen, setIsPreviewNftModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    trigger,
    formState: { errors, dirtyFields },
  } = useForm<IFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: formDefaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'details',
  });
  const isSingle = nftStandard === Standard.ERC721;

  const handleChangeListForSaleField = (fieldName: saleTokenStateKeys, fieldValue: any) => {
    switch (fieldName) {
      case saleTokenStateKeys.amount:
        setValue('sellingQuantity', +fieldValue);
        break;
      case saleTokenStateKeys.listType:
        setValue('saleType', fieldValue);
        break;
      case saleTokenStateKeys.selectedCurrency:
        setValue('currency', fieldValue);
        break;
      case saleTokenStateKeys.priceValue:
        setValue('price', fieldValue);
        break;
      case saleTokenStateKeys.selectedTimestamp:
        setValue('auctionTimestamp', fieldValue);
        break;

      default:
        break;
    }
  };

  const handleToogleNftStandard = () => {
    const newNftStandard = nftStandard === Standard.ERC721 ? Standard.ERC1155 : Standard.ERC721;
    if (newNftStandard !== nftStandard) {
      navigate(`/create/nft/?standard=${newNftStandard}`);
      setNftStandard(newNftStandard);
    }
  };

  const handleNavigateToCreateCollection = () => {
    navigate(routes.create.collection.root.path);
  };

  const handleUpdateCollections = useCallback(() => {
    dispatch(getMyCollections());
  }, [dispatch]);

  const handleCancelClick = () => {
    navigate(routes.create.root.path);
  };
  const mediaKeyHolder = useRef<Nullable<HTMLDivElement>>(null);

  const handleResetFiles = () => {
    if (mediaKeyHolder && mediaKeyHolder.current) {
      mediaKeyHolder.current.id = uniqueId();
      mediaKeyHolder.current.id = uniqueId();
    }
    setValue('preview', undefined);
    setValue('media', undefined);
  };

  const handleListForSaleClick = () => {
    setIsListForSaleNow(!isListForSaleNow);
    if (!isListForSaleNow) {
      setValue('price', '0');
      setValue('currency', tokenData[0]);
      setValue('saleType', Listings.Price);
      return;
    }
    setValue('price', undefined);
    setValue('currency', undefined);
    setValue('saleType', undefined);
  };

  const updatedCollections = useMemo(() => {
    return myCollections?.filter(
      ({ standard, isDefault, network: collectionNetwork }) =>
        standard === nftStandard && isDefault !== true && collectionNetwork?.name === network,
    );
  }, [myCollections, network, nftStandard]);

  const mediaFile = watch('media');
  const isNeedPreview = mediaFile ? checkIfCoverIsRequired(mediaFile) : false;

  const handleSubmitForm = (data: IFormInputs) => {
    const selectedCollection = myCollections.find(({ url }) => url === data?.collection);

    const defaultCollection = myCollections.find(
      ({ isDefault, standard, network: collectionNetwork }) =>
        isDefault === true && standard === nftStandard && collectionNetwork?.name === network,
    );

    const { totalSupply, ...restData } = data;

    const formData = convertToFormRequestData({
      ...restData,
      ...(nftStandard === Standard.ERC1155 && { totalSupply }),
      collection: Number(isAddToCollection ? data.collection : defaultCollection?.url),
      preview: isNeedPreview ? data.preview : undefined,
    });

    dispatch(
      createNft({
        data: {
          dataForCreation: formData,
          isListForSaleNow,
        },
        navigate,
        web3Provider: walletService.Web3(chain.rpc),
        tokenAddress: String(selectedCollection?.address || defaultCollection?.address),
      }),
    );
  };

  const isSmallScreen = useMediaQuery('(max-width:1000px)');

  useEffect(() => {
    if (userAddress.length) {
      handleUpdateCollections();
      dispatch(getCategories());
    } else {
      navigate(routes.home.root.path);
    }
  }, [dispatch, handleUpdateCollections, navigate, userAddress.length]);
  return (
    <Box sx={{ pb: 10 }} ref={mediaKeyHolder}>
      <Box sx={{ position: 'relative', mb: 6 }}>
        <Typography
          sx={{
            maxWidth: {
              xs: '75%',
              md: '45%',
            },
          }}
          variant="h2"
        >
          Create {isSingle ? 'single' : 'multiple'} NFT
        </Typography>
        <Button
          sx={{
            position: {
              xs: 'relative',
              md: 'absolute',
            },
            left: {
              xs: '0',
              md: '50%',
            },
            mt: {
              xs: 2,
              md: 0,
            },
            top: 0,
          }}
          onClick={handleToogleNftStandard}
          variant="outlined"
        >
          Switch to {isSingle ? 'multiple' : 'single'}
        </Button>
      </Box>
      <Stack spacing={12} direction="row" justifyContent="space-between">
        <Box
          onSubmit={handleSubmit(handleSubmitForm)}
          component="form"
          sx={{ width: '100%', maxWidth: isSmallScreen ? '100%' : '640px' }}
        >
          <SectionTitle sx={{ mb: 0.5 }}>Upload file</SectionTitle>
          <Typography
            variant="body2"
            sx={{
              mb: 0.5,
              fontSize: '12px',
              fontWeight: 400,
              ...(errors.sellingQuantity?.message && {
                color: COLOR_RED,
              }),
            }}
          >
            {errors.media?.message || 'Drag or choose your file to upload'}
          </Typography>
          <FileUploader
            key={mediaKeyHolder?.current?.id || '1'}
            size="big"
            error={Boolean(errors.media)}
            maxFileSize={MAX_FILE_SIZE}
            {...register('media')}
            onChange={(file) => setValue('media', file)}
            sx={{ mb: 2 }}
          />
          {isNeedPreview && (
            <>
              <SectionTitle sx={{ mb: 0.5 }}>Upload a preview for your file</SectionTitle>
              {!!errors.preview?.message?.length && (
                <Typography
                  variant="body2"
                  sx={{
                    mb: 0.5,
                    fontSize: '12px',
                    fontWeight: 400,
                    color: COLOR_RED,
                  }}
                >
                  {errors.preview?.message}
                </Typography>
              )}
              <FileUploader
                key={mediaKeyHolder?.current?.id || '1'}
                maxFileSize={5}
                size="big"
                error={Boolean(errors.preview)}
                {...register('preview')}
                acceptFiles={imagesTypes}
                onChange={(file) => setValue('preview', file)}
                sx={{ mb: 2 }}
              />
            </>
          )}

          <SectionTitle sx={{ mb: 4 }}>Information</SectionTitle>
          <TextFieldLabel>{errors.name?.message || 'Name'}</TextFieldLabel>
          <TextField
            error={Boolean(errors.name)}
            {...register('name')}
            sx={{ mb: 4, width: '100%' }}
            placeholder="e. g. 'Redeemable Bitcoin Card with logo'"
          />
          <TextFieldLabel>Network</TextFieldLabel>
          <ChainSelect
            sx={{ width: '300px', mb: 4 }}
            onChange={(e) => connect(provider, e.target.value as Chains, false, true)}
          />
          <TextFieldLabel>{errors.description?.message || 'Description'}</TextFieldLabel>
          <TextField
            error={Boolean(errors.description)}
            {...register('description')}
            sx={{ mb: 4, width: '100%' }}
            placeholder="e. g. 'After purchasing you will able to recived the logo...'"
          />
          <TextFieldLabel>{errors.category?.message || 'Category'}</TextFieldLabel>
          <TextField
            {...register('category')}
            select
            sx={{ mb: 4, width: '100%' }}
            error={Boolean(errors.category)}
            value={watch('category')}
            SelectProps={{
              displayEmpty: true,
              renderValue: dirtyFields.category ? undefined : SelectLabel,
            }}
          >
            {categories.map(({ name, id }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </TextField>
          <SectionTitle sx={{ mb: 2 }}>{errors.details?.message || 'Properties'}</SectionTitle>
          <Card
            error={Boolean(errors.details?.message)}
            sx={{
              mb: 2,
            }}
          >
            {fields.map((item, index) => (
              <Fragment key={item.id}>
                {!!errors?.details?.[index] && (
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 0.5,
                      fontSize: '12px',
                      fontWeight: 400,
                      color: COLOR_RED,
                      position: 'absolute',
                      transform: 'translateY(-18px)',
                    }}
                  >
                    Both fields must be filled
                  </Typography>
                )}
                <TextFieldLabel>Type</TextFieldLabel>
                <TextField
                  {...register(`details.${index}.type`)}
                  value={watch(`details.${index}.type`)}
                  sx={{ mb: 4, width: '100%' }}
                  placeholder="Color"
                  error={errors?.details?.[index] && !watch(`details.${index}.type`)}
                  onBlur={() => trigger()}
                />
                <TextFieldLabel>Name</TextFieldLabel>
                <TextField
                  {...register(`details.${index}.name`)}
                  value={watch(`details.${index}.name`)}
                  sx={{ mb: 4, width: '100%' }}
                  placeholder="White"
                  error={errors?.details?.[index] && !watch(`details.${index}.name`)}
                  onBlur={() => trigger()}
                />
              </Fragment>
            ))}
          </Card>
          <Stack direction="row" spacing={1.5} sx={{ mt: 8.5, mb: 4 }}>
            <Button endIcon={<Icon.PlusIcon />} onClick={() => append({ name: '', type: '' })}>
              Add more
            </Button>
            {fields.length > 1 && (
              <Button variant="outlined" onClick={() => remove(fields.length - 1)}>
                Delete one
              </Button>
            )}
          </Stack>
          {!isSingle && (
            <QuantityInput
              withTitle
              title="In stock"
              sx={{ mb: 4 }}
              value={watch('totalSupply')}
              {...register('totalSupply')}
              onChange={(totalSupply) => setValue('totalSupply', +totalSupply)}
              maxAmount={10000}
            />
          )}
          <Card sx={{ mb: 4 }}>
            <FormControlLabel
              checked={isAddToCollection}
              onChange={() => setIsAddToCollection(!isAddToCollection)}
              control={<Checkbox />}
              label="Add to collection"
            />
            {isAddToCollection && (
              <>
                <Stack alignItems="center" direction="row" spacing={2} sx={{ mb: 0.5, mt: 3 }}>
                  <Typography variant="body1">Choose collection</Typography>
                  <IconButton onClick={handleUpdateCollections} size="small" className="rounded">
                    <Icon.Refresh />
                  </IconButton>
                </Stack>
                <Typography sx={{ fontSize: '12px', mb: 3 }} variant="body2">
                  Choose an exiting collection or create a new one
                </Typography>
                <Tabs
                  {...register('collection')}
                  onChange={(_, value) => setValue('collection', value)}
                  value={watch('collection')}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  TabScrollButtonProps={{ className: 'bottom' }}
                  className="outlined scrollable"
                >
                  <Tab
                    sx={{ mr: 2, padding: `${theme.spacing(3)} !important`, borderRadius: '16px' }}
                    value={0}
                    onClick={handleNavigateToCreateCollection}
                    label={
                      <Stack sx={{ width: 160 }}>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            marginBottom: 1,
                            background: COLOR_NEUTRALS_8,
                            color: COLOR_NEUTRALS_4,
                            ...flexHelper(),
                          }}
                        >
                          <Plus />
                        </Box>
                        <Box sx={{ textAlign: 'start' }}>Create collection</Box>
                      </Stack>
                    }
                  />
                  {updatedCollections.map(({ avatar, url, name }) => (
                    <Tab
                      sx={{ mr: 2, padding: `${theme.spacing(3)} !important`, borderRadius: '16px' }}
                      key={url}
                      value={url}
                      label={
                        <Stack sx={{ width: 160 }}>
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
              </>
            )}
          </Card>
          <Card>
            <FormControlLabel
              checked={isListForSaleNow}
              onChange={handleListForSaleClick}
              control={<Checkbox />}
              label="List for sale now"
            />
            {isListForSaleNow && (
              <>
                {isSingle && (
                  <Typography sx={{ mb: 0.5, mt: 3, fontSize: '16px', fontWeigth: 500 }}>
                    Choose a sale method
                  </Typography>
                )}
                <ListForSale
                  rates={tokenData as Rates[]}
                  onListForSale={handleChangeListForSaleField}
                  isMultiple={!isSingle}
                  sx={{ mt: 3 }}
                  error={Boolean(errors.sellingQuantity)}
                  createNftTokenMessage={
                    <Typography
                      variant={isSingle ? 'body2' : 'body1'}
                      sx={{
                        mb: 0.5,
                        fontSize: isSingle ? '12px' : '16px',
                        fontWeight: 400,
                        ...(errors.sellingQuantity?.message && {
                          color: COLOR_RED,
                        }),
                      }}
                    >
                      {errors.sellingQuantity?.message || 'Choose a token to pay for your NFT and the type of sale'}
                    </Typography>
                  }
                />
              </>
            )}
          </Card>
          <Box sx={{ mt: 5 }}>
            {isSmallScreen && (
              <Button onClick={() => setIsPreviewNftModalOpen(true)} fullWidth variant="outlined">
                Preview
              </Button>
            )}
            <Stack direction="row" spacing={1.5} mt={1.5}>
              <Button type="submit">Create item</Button>
              <Button onClick={handleCancelClick} variant="outlined">
                Cancel
              </Button>
            </Stack>
          </Box>
        </Box>
        <PreviewNft
          mode={isSmallScreen ? 'modal' : 'default'}
          open={isPreviewNftModalOpen}
          onClose={() => setIsPreviewNftModalOpen(false)}
          onClear={handleResetFiles}
          name={watch('name')}
          price={watch('price')}
          currency={watch('currency')?.symbol}
          preview={isNeedPreview ? watch('preview') : watch('media')}
          userName={userName || userAddress}
        />
      </Stack>
    </Box>
  );
};

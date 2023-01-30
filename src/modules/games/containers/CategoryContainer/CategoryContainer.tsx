import { createRef, FC, useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Card, FormButtons } from 'components';
import { Address } from 'modules/games/components';
import { MAX_FILE_SIZE } from 'modules/layout/containers/CreateNftContainer';
import { FileUploader, FileUploaderHandlers } from 'modules/layout/containers/FileUploader';
import { COLOR_NEUTRALS_4, COLOR_PRIMARY_1 } from 'theme/colors';
import { TextFieldLabel } from 'theme/variables';
import { Nullable } from 'types';

import { acceptedImageTypes, IAddCategoryForm, validationSchema } from './CategoryContainer.helper';

export type CategoryContaineryProps = {
  isEditPage?: boolean;
  formValues: IAddCategoryForm;
  onSubmit: (data: IAddCategoryForm) => void;
  isStatusRequest?: boolean;
  categoryId?: string;
  onCancel: () => void;
};

export const CategoryContainer: FC<CategoryContaineryProps> = ({
  isEditPage = false,
  formValues,
  isStatusRequest,
  onSubmit,
  onCancel,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:1000px)');

  const coverRef = createRef<FileUploaderHandlers>();
  const subcategoryCoverRef = useRef<Nullable<FileUploaderHandlers>[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<IAddCategoryForm>({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: formValues,
  });
  const media = watch('avatar');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subcategories',
  });

  const handleResetFile = () => {
    if (coverRef.current) {
      coverRef.current.clearPreview();
    }
    setValue('avatar', null);
  };

  const handleResetFiles = (index: number) => {
    if (subcategoryCoverRef.current) {
      subcategoryCoverRef?.current[index]?.clearPreview();
    }
    setValue(`subcategories.${index}.avatar`, null);
  };

  return (
    <Box sx={{ pb: 10 }}>
      <Typography sx={{ mb: 7 }} variant="h2">
        {isEditPage ? 'Edit category' : 'Add new category'}
      </Typography>
      <Box onSubmit={handleSubmit(onSubmit)} component="form">
        <Stack direction={{ xs: 'column-reverse', md: 'row' }} spacing={4}>
          <Card
            sx={{
              padding: 2,
              width: '100%',
              maxWidth: isSmallScreen ? '100%' : '640px',
            }}
          >
            <TextFieldLabel>{errors.name?.message || 'Category name'}</TextFieldLabel>
            <TextField
              error={Boolean(errors.name)}
              {...register('name')}
              sx={{ width: '100%' }}
              placeholder="Category"
            />

            {fields.map((subcategory, subcategoryIndex) => (
              <Card
                key={subcategory.id}
                error={Boolean(errors.subcategories?.[subcategoryIndex])}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: theme.themeColors.colorBackground,
                  padding: 2,
                  mt: 2.5,
                }}
              >
                <TextFieldLabel>
                  {errors.subcategories?.[subcategoryIndex]?.name?.message || 'Subcategory name'}
                </TextFieldLabel>
                <TextField
                  error={Boolean(errors.subcategories?.[subcategoryIndex]?.name)}
                  {...register(`subcategories.${subcategoryIndex}.name`)}
                  value={watch(`subcategories.${subcategoryIndex}.name`)}
                  sx={{ mb: 2.5, width: '100%' }}
                  placeholder="Subcategory name"
                />
                <TextFieldLabel>{errors.subcategories?.[subcategoryIndex]?.avatar?.message}</TextFieldLabel>
                {isEditPage && (
                  <Stack sx={{ marginBottom: 2.5 }}>
                    <FileUploader
                      maxFileSize={5}
                      defaultPreview={subcategory?.avatar || null}
                      size="big"
                      error={Boolean(errors.subcategories?.[subcategoryIndex]?.avatar)}
                      {...register(`subcategories.${subcategoryIndex}.avatar`)}
                      acceptFiles={acceptedImageTypes}
                      onChange={(file) => setValue(`subcategories.${subcategoryIndex}.avatar`, file)}
                      ref={(el) => {
                        subcategoryCoverRef.current[subcategoryIndex] = el;
                      }}
                    />
                    <Button
                      sx={{
                        alignSelf: 'end',
                        p: 0,
                        mt: 2.5,
                        color: COLOR_NEUTRALS_4,
                        fontSize: 14,
                        textDecoration: 'underline',
                      }}
                      variant="text"
                      onClick={() => handleResetFiles(subcategoryIndex)}
                    >
                      Delete image
                    </Button>
                  </Stack>
                )}

                <Address<IAddCategoryForm>
                  {...{
                    register,
                    errors,
                    control,
                    watch,
                    subcategoryIndex,
                    ...(fields.length > 1 && { onRemoveSubcategory: () => remove(subcategoryIndex) }),
                  }}
                  isCanEdit={!isEditPage}
                  pathToError={(addressIndex) => errors?.subcategories?.[subcategoryIndex]?.addresses?.[addressIndex]}
                  pathToItem={(addressIndex) => `subcategories.${subcategoryIndex}.addresses.${addressIndex}.address`}
                  fieldArrayName={`subcategories.${subcategoryIndex}.addresses`}
                  sx={{ maxWidth: '100%' }}
                />
                <Button
                  sx={{ alignSelf: 'end', p: 0, mt: 2.5 }}
                  variant="text"
                  onClick={() => append([{ name: '', addresses: [{ address: '' }] }])}
                >
                  <Typography color={COLOR_PRIMARY_1}>Add subcategory +</Typography>
                </Button>
              </Card>
            ))}
          </Card>
          {isEditPage && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <TextFieldLabel>{errors.avatar?.message || 'Upload Cover Category'}</TextFieldLabel>
              <FileUploader
                size="big"
                defaultPreview={formValues?.avatar || null}
                error={Boolean(errors.avatar)}
                acceptFiles={acceptedImageTypes}
                maxFileSize={MAX_FILE_SIZE}
                {...register('avatar')}
                onChange={(file) => setValue('avatar', file)}
                ref={coverRef}
              />
              {media && (
                <Button
                  onClick={handleResetFile}
                  size="small"
                  sx={{ width: 'fit-content', alignSelf: 'center' }}
                  variant="outlined"
                >
                  Delete
                </Button>
              )}
            </Stack>
          )}
        </Stack>
        <FormButtons isStatusRequest={isStatusRequest} isEditPage={isEditPage} onCancelClick={onCancel} />
      </Box>
    </Box>
  );
};

import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Card, FormButtons } from 'components';
import { Address } from 'modules/games/components';
import { TextFieldLabel } from 'theme/variables';

import {
  collectionValidationSchema,
  GameCollectionContainerProps,
  ICollectionContainer,
} from './GameCollectionContainer.helper';

export const GameCollectionContainer: FC<GameCollectionContainerProps> = ({
  isEditPage = false,
  isStatusRequest,
  onSubmit,
  formValues,
}) => {
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<ICollectionContainer>({
    mode: 'onBlur',
    resolver: yupResolver(collectionValidationSchema),
    defaultValues: formValues,
  });

  const isSmallScreen = useMediaQuery('(max-width:1000px)');

  const handleCancelClick = useCallback(() => {
    if (isEditPage) {
      // navigate();
    } else {
      // navigate();
    }
  }, []);
  return (
    <Box sx={{ pb: 10 }}>
      <Typography sx={{ mb: 7 }} variant="h2">
        {isEditPage ? 'Edit category' : 'Add new category'}
      </Typography>
      <Box onSubmit={handleSubmit(onSubmit)} component="form">
        <Card
          sx={{
            padding: { xs: 1.25, sm: 2 },
            width: '100%',
            maxWidth: isSmallScreen ? '100%' : '640px',
          }}
        >
          <TextFieldLabel>{errors.name?.message || 'Collection name'}</TextFieldLabel>
          <TextField
            error={Boolean(errors.name)}
            {...register('name')}
            sx={{ width: '100%' }}
            placeholder="Collection"
          />

          <Card
            error={Boolean(errors.addresses)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              background: theme.themeColors.colorBackground,
              padding: 2,
              mt: 2.5,
            }}
          >
            <Address<ICollectionContainer>
              {...{
                register,
                errors,
                control,
                watch,
              }}
              fieldArrayName="addresses"
              pathToItem={(addressIndex) => `addresses.${addressIndex}.address`}
              pathToError={(addressIndex) => errors?.addresses?.[addressIndex]}
              sx={{ maxWidth: '100%' }}
            />
          </Card>
        </Card>
        <FormButtons isStatusRequest={isStatusRequest} isEditPage={isEditPage} onCancelClick={handleCancelClick} />
      </Box>
    </Box>
  );
};

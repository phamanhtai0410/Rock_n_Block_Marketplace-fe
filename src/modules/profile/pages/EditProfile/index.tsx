import { createRef, FC, Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { FileUploader, FileUploaderHandlers } from 'modules/layout/containers/FileUploader';
import { imagesTypes } from 'modules/layout/containers/FileUploader/FileUploader.helper';
import apiActions from 'store/api/actions';
import uiSelector from 'store/ui/selectors';
import { updateUserData } from 'store/user/actions';
import actionTypes from 'store/user/actionTypes';
import userSelector from 'store/user/selectors';
import { TextFieldLabel } from 'theme/variables';
import { RequestStatus } from 'types';

import { socials, validationSchema } from './EditProfile.helper';

export interface IFormInputs {
  avatar?: File | null;
  displayName?: string;
  email?: string;
  bio?: string;
  site?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  cover?: File | null;
}

export const EditProfile: FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInputs>({ resolver: yupResolver(validationSchema), mode: 'onBlur' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { [actionTypes.UPDATE_USER_DATA]: editProfileRequest } = useShallowSelector(uiSelector.getUI);
  const isEditStatusSuccess = editProfileRequest === RequestStatus.SUCCESS;

  const { id: userId } = useShallowSelector(userSelector.getProp('user'));

  const profile = useShallowSelector(userSelector.getProp('user'));

  const dropzoneRef = createRef<FileUploaderHandlers>();
  const handleUploadCollectionLogo = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  const onSubmitForm = (data: IFormInputs) => {
    dispatch(updateUserData(data));
  };

  useEffect(() => {
    if (isEditStatusSuccess) {
      navigate(routes.profile.root.getPath(Number(userId)));
    }
    return () => {
      dispatch(apiActions.reset(actionTypes.UPDATE_USER_DATA));
    };
  }, [isEditStatusSuccess]);

  const handleClearClick = () => {
    navigate(routes.profile.root.getPath(Number(userId)));
  };

  if (!profile) {
    return null;
  }

  return (
    <Box sx={{ pb: 5 }}>
      <Typography sx={{ mb: 7 }} variant="h2">
        Edit profile
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ mb: 4 }} variant="body2">
            Upload avatar
          </Typography>
          <Stack direction="row" spacing={4}>
            <FileUploader
              defaultPreview={profile.avatar}
              {...register('avatar')}
              maxFileSize={5}
              acceptFiles={imagesTypes}
              onChange={(file) => setValue('avatar', file)}
              ref={dropzoneRef}
            />
            <Box>
              <Typography sx={{ mb: 1.5, maxWidth: 324, fontSize: '14px' }}>
                Acceptable file format: PNG, JPG, GIF maximum file size: 5 MB
              </Typography>
              <Typography sx={{ mb: 1.5, maxWidth: 324, fontSize: '14px' }}>
                We recommend an image of at least 400x400. Gifs work too 🙌
              </Typography>
              <Button size="small" variant="outlined" onClick={handleUploadCollectionLogo}>
                Upload
              </Button>
            </Box>
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ width: '100%', marginRight: 4 }}>
            <TextFieldLabel>{errors.displayName?.message || 'Name'}</TextFieldLabel>
            <TextField
              {...register('displayName')}
              error={!!errors.displayName}
              defaultValue={profile.displayName || undefined}
              placeholder="enrico cole"
              sx={{ mb: 4, width: '100%', maxWidth: '640px' }}
            />

            <TextFieldLabel>Wallet address</TextFieldLabel>
            <TextField value={profile.address} disabled sx={{ mb: 4, width: '100%', maxWidth: '640px' }} />

            <TextFieldLabel>{errors.email?.message || 'Contact email'}</TextFieldLabel>
            <TextField
              {...register('email')}
              error={!!errors.email}
              placeholder="enricocole@mail.com"
              defaultValue={profile.email}
              sx={{ mb: 4, width: '100%', maxWidth: '640px' }}
            />

            <TextFieldLabel>{errors.bio?.message || 'Bio'}</TextFieldLabel>
            <TextField
              {...register('bio')}
              error={!!errors.bio}
              defaultValue={profile.bio}
              placeholder="About yourself in a few words"
              sx={{ mb: 4, width: '100%', maxWidth: '640px' }}
              multiline
              rows={6}
            />
          </Box>
          <Box sx={{ width: '100%' }}>
            {socials.map(({ name, label, placeholder }) => (
              <Fragment key={name}>
                <TextFieldLabel>{errors[name]?.message || label}</TextFieldLabel>
                <TextField
                  {...register(name)}
                  error={!!errors[name]}
                  placeholder={placeholder}
                  defaultValue={profile[name]}
                  sx={{ mb: 4, width: '100%', maxWidth: '640px' }}
                />
              </Fragment>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex' }}>
          <Button type="submit" sx={{ mr: 1.5 }}>
            Save
          </Button>
          <Button onClick={handleClearClick} variant="outlined">
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

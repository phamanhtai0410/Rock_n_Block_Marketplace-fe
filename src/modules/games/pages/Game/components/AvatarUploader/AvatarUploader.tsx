import React, { FC, useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { Button, Stack, useTheme } from '@mui/material';
import { defaultBackgroundImage } from 'assets/images';
import { Avatar } from 'components';
import { getToastMessage } from 'utils';

export type AvatarUploaderProps = {
  avatar?: string;
  onDeleteAvatar: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onUploadAvatar: (file: File | null) => void;
  isAbleToEdit?: boolean;
};

export const AvatarUploader: FC<AvatarUploaderProps> = ({
  avatar,
  isAbleToEdit = false,
  onDeleteAvatar,
  onUploadAvatar,
}) => {
  const theme = useTheme();

  const onDrop = useCallback(
    (acceptedFiles: File[], FileRejections: Array<FileRejection>) => {
      if (!acceptedFiles.length) {
        getToastMessage('error', FileRejections[0].errors[0].message);
        return;
      }

      const currentFile = acceptedFiles[0];
      onUploadAvatar(currentFile);
    },
    [onUploadAvatar],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/gif': [],
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': [],
    },
    maxFiles: 1,
  });
  return (
    <Stack spacing={1.5} alignItems="center">
      <Avatar
        image={avatar || defaultBackgroundImage}
        size="xxl"
        sx={{ img: { background: !avatar ? theme.themeColors.colorCardBackground : 'inherit' } }}
      />
      <div {...getRootProps()}>
        {isAbleToEdit &&
          (avatar ? (
            <Button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => onDeleteAvatar(e)}
              variant="text"
              sx={{ p: 0, minWidth: 'auto', color: theme.themeColors.colorLogoText }}
            >
              Delete
            </Button>
          ) : (
            <>
              <input {...getInputProps()} />
              <Button variant="text" sx={{ p: 0, minWidth: 'auto', color: theme.themeColors.colorLogoText }}>
                Upload
              </Button>
            </>
          ))}
      </div>
    </Stack>
  );
};

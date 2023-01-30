import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';
import { Box, SxProps, Theme } from '@mui/material';
import { fileValidation } from 'modules/layout/containers/CreateNftContainer';
import { COLOR_NEUTRALS_1, COLOR_PRIMARY_1, COLOR_RED } from 'theme/colors';
import { getToastMessage } from 'utils';

import { Uploader } from './components';

export interface FileUploaderProps {
  size?: 'big' | 'small';
  maxFileSize?: number;
  defaultPreview?: string | File | null;
  acceptFiles?: Accept;
  error?: boolean;
  sx?: SxProps<Theme>;
  onChange?: (file: File | null) => void;
}

export interface FileUploaderHandlers {
  open: () => void;
  clearPreview: () => void;
}

export const FileUploader = forwardRef<FileUploaderHandlers, FileUploaderProps>(
  ({ defaultPreview, sx, onChange, error = false, size = 'small', acceptFiles, maxFileSize = 5 }, ref) => {
    const [filePreview, setFilePreview] = useState('');
    const [fileType, setFileType] = useState('');
    const [fileName, setFileName] = useState('');

    useEffect(() => {
      if (defaultPreview) {
        setFilePreview(defaultPreview as string);
      }
    }, [defaultPreview]);

    const clearPreview = useCallback(() => {
      setFilePreview('');
      setFileType('');
      if (onChange) {
        onChange(null);
      }
    }, [onChange]);

    const onDrop = (acceptedFiles: File[], FileRejections: Array<FileRejection>) => {
      if (!acceptedFiles.length) {
        getToastMessage('error', FileRejections[0].errors[0].message);
        return;
      }
      const currentFile = acceptedFiles[0];
      if (onChange) {
        onChange(currentFile);
      }

      const preview = URL.createObjectURL(currentFile);
      setFilePreview(preview);
      // https://stackoverflow.com/questions/1201945/how-is-mime-type-of-an-uploaded-file-determined-by-browser
      setFileType(currentFile.type);
      setFileName(currentFile.name);
    };

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
      onDrop,
      accept: acceptFiles,
      validator: (file) => fileValidation(file, maxFileSize),
    });

    useImperativeHandle(ref, () => ({ open, clearPreview }), [open, clearPreview]);

    const borderColor = useMemo(() => {
      if (isDragActive) {
        return COLOR_PRIMARY_1;
      }
      if (error) {
        return COLOR_RED;
      }
      return COLOR_NEUTRALS_1;
    }, [isDragActive, error]);

    const isBigSize = size === 'big';

    const allowedFormats = useMemo(() => {
      if (acceptFiles) {
        return Object.keys(acceptFiles)
          .map((file) => file.substring(file.lastIndexOf('/') + 1).toUpperCase())
          .join(', ');
      }
      return `PNG, GIF, WEBP, MP4, JPEG, SVG, WEBM, WAV, OGG, GLTF or MP3`;
    }, [acceptFiles]);

    if (filePreview.length) {
      return (
        <Uploader
          allowedFormats={allowedFormats}
          fileName={fileName}
          fileType={fileType}
          filePreview={filePreview}
          borderColor={borderColor}
          maxFileSize={maxFileSize}
          isBigSize={isBigSize}
        />
      );
    }

    return (
      <Box
        sx={{
          width: isBigSize ? '100%' : 'fit-content',
          ...sx,
        }}
        {...getRootProps()}
      >
        <Box component="input" {...getInputProps()} />
        <Uploader
          allowedFormats={allowedFormats}
          fileName={fileName}
          fileType={fileType}
          filePreview={filePreview}
          borderColor={borderColor}
          maxFileSize={maxFileSize}
          isBigSize={isBigSize}
        />
      </Box>
    );
  },
);

FileUploader.displayName = 'FileUploader';

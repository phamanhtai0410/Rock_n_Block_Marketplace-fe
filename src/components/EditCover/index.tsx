import { FC, useCallback, useMemo, useRef } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { Button, ButtonProps } from '@mui/material';
import { ImageIcon, Trash } from 'components/Icon/components';
import { PopoverButton, VariantProps } from 'components/PopoverButton';
import { useModal, useShallowSelector } from 'hooks';
import { fileValidation, MAX_FILE_SIZE } from 'modules/layout/containers/CreateNftContainer';
import userSelector from 'store/user/selectors';
import { COLOR_NEUTRALS_2, COLOR_NEUTRALS_8 } from 'theme/colors';
import { Themes } from 'types';
import { getToastMessage } from 'utils';

export type EditCoverProps = {
  variantBtn?: VariantProps;
  onDeleteCover: () => void;
  onUpdateCover: (file: File) => void;
};

export const EditCover: FC<EditCoverProps & ButtonProps> = ({
  variantBtn = 'more',
  onDeleteCover,
  onUpdateCover,
  ...buttonProps
}) => {
  const dispatch = useDispatch();
  const [isOptionsOpen, togglePopover, handleClosePopover] = useModal(false);
  const popoverButtonRef = useRef(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], FileRejections: Array<FileRejection>) => {
      handleClosePopover();
      if (!acceptedFiles.length) {
        getToastMessage('error', FileRejections[0].errors[0].message);
        return;
      }

      const currentFile = acceptedFiles[0];
      onUpdateCover(currentFile);
    },
    [dispatch],
  );

  const siteTheme = useShallowSelector(userSelector.getProp('theme'));
  const isDarkTheme = useMemo(() => siteTheme === Themes.dark, [siteTheme]);
  const textColor = useMemo(() => (isDarkTheme ? COLOR_NEUTRALS_8 : COLOR_NEUTRALS_2), [isDarkTheme]);

  const onCoverDelete = useCallback(() => {
    handleClosePopover();
    onDeleteCover();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/gif': [],
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': [],
    },
    validator: (file) => fileValidation(file, MAX_FILE_SIZE),
    maxFiles: 1,
  });
  return (
    <PopoverButton
      handleClosePopover={handleClosePopover}
      togglePopover={togglePopover}
      popoverButtonRef={popoverButtonRef}
      isOptionsOpen={isOptionsOpen}
      buttonVariant={variantBtn}
      {...buttonProps}
    >
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Button
          startIcon={<ImageIcon sx={{ width: '21px' }} />}
          variant="text"
          size="small"
          sx={{ color: textColor, opacity: 0.5 }}
        >
          Edit cover
        </Button>
      </div>
      <Button
        variant="text"
        sx={{ color: textColor, opacity: 0.5 }}
        size="small"
        startIcon={<Trash sx={{ fill: 'none' }} />}
        onClick={onCoverDelete}
      >
        Delete cover
      </Button>
    </PopoverButton>
  );
};

import { FC } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { FilePreview } from 'components/FilePreview';
import { COLOR_NEUTRALS_4, COLOR_PRIMARY_1 } from 'theme/colors';
import { flexHelper } from 'utils';

export type UploaderContainerProps = {
  isBigSize: boolean;
  borderColor: string;
  filePreview: string;
  fileType: string;
  fileName: string;
  allowedFormats: string;
  maxFileSize: number;
};

const UploaderContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isBigSize' && prop !== 'borderColor',
})<{ isBigSize: boolean; borderColor: string }>(({ theme, isBigSize, borderColor }) => ({
  width: '100%',
  maxWidth: isBigSize ? '100%' : '112px',
  minWidth: isBigSize ? '100%' : '112px',
  height: isBigSize ? 'fit-content' : '112px',
  minHeight: isBigSize ? 184 : 'unset',
  borderRadius: isBigSize ? '16px' : '50%',
  overflow: 'hidden',
  background: theme.themeColors.colorFileUploaderBackground,
  cursor: 'pointer',
  transition: '0.4s ease',
  padding: theme.spacing(2),
  border: `2px dashed ${borderColor}`,
  ...flexHelper('center', 'center'),
  flexDirection: 'column',
  '&:hover': {
    borderColor: COLOR_PRIMARY_1,
  },
}));

export const Uploader: FC<UploaderContainerProps> = ({
  isBigSize,
  maxFileSize,
  fileName,
  fileType,
  filePreview,
  allowedFormats,
  borderColor,
}) => {
  return (
    <UploaderContainer isBigSize={isBigSize} borderColor={borderColor}>
      <FilePreview fileUrl={filePreview} fileType={fileType} fileName={fileName} />
      {isBigSize && !filePreview && (
        <Typography textAlign="center" sx={{ fontSize: '12px', color: COLOR_NEUTRALS_4, mt: 1 }}>
          ({allowedFormats}. Max {maxFileSize} Mb.)
        </Typography>
      )}
    </UploaderContainer>
  );
};

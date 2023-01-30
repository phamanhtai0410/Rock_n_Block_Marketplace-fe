import { UploadFile } from '@mui/icons-material';
import { Box, SxProps, Theme } from '@mui/material';
import { COLOR_NEUTRALS_4 } from 'theme/colors';
import { ModelViewerElement } from 'types/model-viewer';

export type ModelViewerProps = {
  sx?: SxProps<Theme>;
  isNftPage?: boolean;
} & ModelViewerElement;

export const ModelViewer = ({ sx, isNftPage = false, ...modelViewerProps }: ModelViewerProps) => {
  if (!modelViewerProps.src) {
    return <UploadFile sx={{ color: COLOR_NEUTRALS_4 }} />;
  }
  return (
    <Box sx={{ '& > *': sx, ...sx } as SxProps}>
      <model-viewer
        // https://modelviewer.dev/docs/
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        touch-action="pan-y"
        auto-rotate
        shadow-intensity={1}
        shadow-softness={1}
        style={{
          ...(isNftPage && {
            minHeight: '500px',
            maxHeight: '700px',
            width: '100%',
          }),
        }}
        {...modelViewerProps}
      />
    </Box>
  );
};

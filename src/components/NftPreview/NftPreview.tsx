import { Box } from '@mui/material';
import { CustomImage } from 'components/CustomImage';
import { ModelViewer } from 'components/ModelViewer';
import { Player } from 'components/Player';

import { NftFormat } from './NftPreview.helper';

export interface NftPreviewProps {
  media: string; // preview file (main file for image)
  format: string;
  animation: string; // main file for audio/video/model
}

export const NftPreview = ({ media, format, animation }: NftPreviewProps) => {
  if (format === NftFormat.image) {
    return (
      <CustomImage
        media={media}
        customCardMediaSx={{ objectFit: 'contain', aspectRatio: 'auto', maxHeight: '700px' }}
      />
    );
  }

  if (format === NftFormat.audio) {
    return (
      <Box sx={{ marginBottom: 4, position: 'relative' }}>
        <CustomImage media={media} />
        <Player
          source={{ sources: [{ src: animation }], type: 'audio' }}
          sx={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            '.plyr__controls': { margin: '16px !important' },
          }}
        />
      </Box>
    );
  }

  if (format === NftFormat.video) {
    return (
      <Player
        source={{ sources: [{ src: animation }], type: 'video' }}
        sx={{
          '.plyr__controls': { margin: '16px !important' },
        }}
      />
    );
  }

  return <ModelViewer src={animation} isNftPage />;
};

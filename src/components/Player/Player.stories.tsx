import React from 'react';
import { Box } from '@mui/material';

import { Player } from './Player';
import { audioMock, videoMock } from './Player.mock';

export default {
  title: 'components/Player',
  component: Player,
};

export const Default: React.FC = () => (
  <Box style={{ maxWidth: 500 }}>
    <Player source={{ sources: [{ src: audioMock }], type: 'audio' }} sx={{ marginBottom: 4 }} />
    <Box sx={{ marginBottom: 4, width: 500, height: 300, position: 'relative' }}>
      <Box
        component="img"
        src="https://file-examples.com/storage/fe6a5406fa63112369b75a2/2017/10/file_example_JPG_1MB.jpg"
        sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', borderRadius: '20px' }}
      />
      <Player
        source={{
          sources: [{ src: audioMock }],
          type: 'audio',
        }}
        sx={{ position: 'absolute', left: 0, bottom: 0, width: '100%' }}
      />
    </Box>
    <Player source={{ sources: [{ src: videoMock }], type: 'video' }} />
  </Box>
);

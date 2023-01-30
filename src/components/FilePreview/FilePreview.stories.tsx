import React from 'react';
import { Box } from '@mui/material';
import audioFile from 'assets/file_example_MP3_700KB.mp3';

import { FilePreview } from './FilePreview';

export default {
  title: 'components/FilePreview',
  component: FilePreview,
};

export const Default: React.FC = () => (
  <Box style={{ maxWidth: 500 }}>
    <FilePreview fileUrl="assets/file_example_MP4_640_3MG.mp4" fileType="'video/mp4'" />
    <FilePreview fileUrl={audioFile} fileType="audio/mpeg" />
    <FilePreview fileUrl={audioFile} />
    <FilePreview
      fileUrl="https://raw.githubusercontent.com/dwqdaiwenqi/react-3d-viewer/master/site/src/lib/model/DamagedHelmet.gltf"
      sx={{ width: 500, height: 500 }}
    />
    <FilePreview fileUrl="https://i.ytimg.com/vi/xPpdQqxvUtU/maxresdefault.jpg" />
  </Box>
);

import { useMemo } from 'react';
import { SxProps } from '@mui/material';
import { CustomImage } from 'components';
import { ModelViewer } from 'components/ModelViewer';
import { Player } from 'components/Player';
import mime from 'mime';
import {
  audioTypes,
  imagesTypes,
  modelTypes,
  videosTypes,
} from 'modules/layout/containers/FileUploader/FileUploader.helper';

export type NftPreviewProps = {
  fileUrl: string;
  fileType?: string; // optional MIME type recognized by the browser/OS
  fileName?: string; // optional canonical file name (recommend if URL.createObjectUrl used)
  isNftPage?: boolean;
  sx?: SxProps;
};

export enum MediaType {
  image,
  audio,
  video,
  model,
}

export const FilePreview = ({ fileUrl, fileType, fileName, sx, isNftPage }: NftPreviewProps) => {
  const mimeType = useMemo(() => fileType || mime.getType(fileName || fileUrl) || '', [fileName, fileType, fileUrl]);

  if (Object.keys(audioTypes).includes(mimeType)) {
    return <Player source={{ sources: [{ src: fileUrl }], type: 'audio' }} sx={sx} />;
  }
  if (Object.keys(videosTypes).includes(mimeType)) {
    return <Player source={{ sources: [{ src: fileUrl }], type: 'video' }} sx={sx} />;
  }
  if (Object.keys(modelTypes).includes(mimeType)) {
    return <ModelViewer src={fileUrl} isNftPage={isNftPage} sx={sx} />;
  }
  return <CustomImage media={fileUrl} />;
};

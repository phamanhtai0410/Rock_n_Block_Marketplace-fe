import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Box, BoxProps, CardMediaProps } from '@mui/material';
import { CustomCardMedia } from 'components/index';
import { flexHelper } from 'utils';

export interface CustomImageProps {
  media: string;
  altImage?: string;
  path?: string;
  sx?: BoxProps['sx'];
  customCardMediaSx?: CardMediaProps['sx'];
}

export const CustomImage: FC<CustomImageProps & BoxProps> = ({ media, altImage, path, sx, customCardMediaSx }) => {
  return (
    <Box
      component={path ? Link : Box}
      to={path}
      sx={{
        cursor: path ? 'pointer' : '',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        img: {
          borderRadius: 4,
        },
        ...flexHelper(),
        ...sx,
      }}
    >
      <CustomCardMedia src={media} alt={altImage} sx={customCardMediaSx} />
    </Box>
  );
};

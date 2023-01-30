import { FC } from 'react';
import { Box, BoxProps } from '@mui/material';
import { defaultBackgroundImage, profileBanner } from 'assets/images';
import { backgroundImageGradient } from 'modules/landing/components';

export type BackgroundCoverProps = {
  cover?: string;
  defaultTransparentBanner?: boolean;
};

export const BackgroundCover: FC<BackgroundCoverProps & BoxProps> = ({
  cover,
  defaultTransparentBanner = false,
  ...boxProps
}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        top: 88,
        width: '100vw',
        height: 300,
        background: cover
          ? `${backgroundImageGradient}, url(${cover})`
          : ` url(${cover || defaultTransparentBanner ? defaultBackgroundImage : profileBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...boxProps.sx,
      }}
    />
  );
};

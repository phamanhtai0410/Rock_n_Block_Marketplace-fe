import { FC, PropsWithChildren, useMemo } from 'react';
import { Stack, StackProps } from '@mui/material';
import { defaultBackgroundImage, profileBanner } from 'assets/images';
import { backgroundImageGradient } from 'modules/landing/components';

export type BackgroundImageCoverProps = {
  cover?: string;
  backgroundColor?: string;
  isPlainBackgroundColor?: boolean;
  defaultTransparentBanner?: boolean;
};

export const BackgroundImageCover: FC<BackgroundImageCoverProps & PropsWithChildren & StackProps> = ({
  cover,
  isPlainBackgroundColor = false,
  backgroundColor,
  defaultTransparentBanner = false,
  children,
  ...stackProps
}) => {
  const coverVariant = useMemo(() => {
    if (!isPlainBackgroundColor) {
      return {
        background: cover
          ? `${backgroundImageGradient}, url(${cover})`
          : ` url(${defaultTransparentBanner ? defaultBackgroundImage : profileBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };
    }
    return { background: backgroundColor || 'transparent' };
  }, [backgroundColor, isPlainBackgroundColor, cover, defaultTransparentBanner]);

  return (
    <Stack
      {...stackProps}
      sx={{
        position: 'relative',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: '-114.5px',
          left: '50%',
          transform: 'translateX(-50%)',
          height: 'calc(100% + 200px)',
          width: '100vw',
          zIndex: '-1',
          ...coverVariant,
        },
        ...stackProps.sx,
      }}
    >
      {children}
    </Stack>
  );
};

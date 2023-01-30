import { FC, PropsWithChildren } from 'react';
import { Box, SxProps, Theme, useTheme } from '@mui/material';

enum BackgroundTypes {
  banner = 'banner',
  withImage = 'withImage',
  default = 'default',
}
const useStyles = (type: keyof typeof BackgroundTypes, theme: Theme) => {
  const styles = {
    banner: {
      background: theme.themeColors.backgroundBanner,
      minHeight: { xs: 'auto', md: 800 },
      mb: { xs: 0, md: theme.spacing(-35) },
    },
    withImage: {
      background: theme.themeColors.backgroundWithImage,
    },
    default: {
      background: theme.themeColors.backgroundDefault,
    },
  };
  return styles[type];
};

interface BackgroundBoxProps {
  type: keyof typeof BackgroundTypes;
  sx?: SxProps;
}
export const BackgroundBox: FC<PropsWithChildren<BackgroundBoxProps>> = ({ type, sx, children }) => {
  const theme = useTheme();
  return <Box sx={{ ...useStyles(type, theme), ...sx }}>{children}</Box>;
};

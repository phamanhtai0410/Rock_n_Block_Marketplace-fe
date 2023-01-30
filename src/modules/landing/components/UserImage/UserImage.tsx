import { FC } from 'react';
import { Box, BoxProps, useTheme } from '@mui/material';
import { UserAdd } from 'components/Icon/components';
import { flexHelper } from 'utils';

export interface UserImageProps {
  avatar?: string;
  type?: 'round' | 'square';
}

export const UserImage: FC<UserImageProps & BoxProps> = ({ avatar, type, ...boxProps }) => {
  const theme = useTheme();
  if (avatar) {
    return (
      <Box
        {...boxProps}
        component="img"
        src={avatar}
        alt="user"
        sx={{
          width: type === 'square' ? 64 : 40,
          height: type === 'square' ? 64 : 40,
          borderRadius: type === 'square' ? '20px' : '50%',
          boxShadow: theme.themeColors.boxShadowNotificationMini,
          ...boxProps.sx,
        }}
      />
    );
  }
  return (
    <Box
      {...boxProps}
      sx={{
        ...flexHelper(),
        width: type === 'square' ? 64 : 40,
        height: type === 'square' ? 64 : 40,
        borderRadius: type === 'square' ? '20px' : '50%',
        color: theme.themeColors.colorIconDefault,
        background: theme.themeColors.colorNotificationMiniColorsNoImageBoxBackground,
        boxShadow: theme.themeColors.boxShadowNotificationMini,
        ...boxProps.sx,
      }}
    >
      <UserAdd />
    </Box>
  );
};

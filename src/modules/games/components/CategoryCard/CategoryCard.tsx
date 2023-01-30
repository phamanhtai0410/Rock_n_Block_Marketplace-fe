import { FC, PropsWithChildren } from 'react';
import { Stack, SxProps, Theme, Typography, useTheme } from '@mui/material';
import { defaultBackgroundImage } from 'assets/images';
import { Card, CustomImage, Proportions } from 'components';
import { BORDER_RADIUS_SMALL } from 'theme/variables';
import { flexHelper, shortenPhrase } from 'utils';

export type CategoryCardProps = {
  name?: string;
  isAbleToEdit?: boolean;
  media?: string;
  path: string;
  backgroundColor?: string;
  sx?: SxProps<Theme>;
};

export const CategoryCard: FC<CategoryCardProps & PropsWithChildren> = ({
  name,
  media,
  isAbleToEdit = false,
  path,
  children,
  backgroundColor = '',
  sx,
}) => {
  const theme = useTheme();
  return (
    <Card
      sx={{ padding: 1.5, pb: 2, background: backgroundColor || theme.themeColors.colorCardBackground, ...sx }}
      noBorder
    >
      <CustomImage
        path={path}
        customCardMediaSx={{ aspectRatio: `${Proportions.p8to6}` }}
        media={media || defaultBackgroundImage}
        altImage={name}
        sx={{
          img: {
            background: theme.themeColors.colorCardBackground,
            borderRadius: BORDER_RADIUS_SMALL,
          },
        }}
      />
      <Stack direction="row" sx={{ ...flexHelper('space-between', 'center'), mt: 1.5 }}>
        <Typography textTransform="capitalize">{shortenPhrase(String(name), 25, 3)}</Typography>
        {isAbleToEdit && children}
      </Stack>
    </Card>
  );
};

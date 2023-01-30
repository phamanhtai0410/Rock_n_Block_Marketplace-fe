import { Button, Skeleton, Typography } from '@mui/material';
import { HeartIcon } from 'components/Icon/components';
import { COLOR_BLACK, COLOR_NEUTRALS_4, COLOR_PRIMARY_1 } from 'theme/colors';

export const LikeButtonSkeleton = () => (
  <Button
    variant="outlined"
    sx={(theme) => ({
      minWidth: 0,
      borderRadius: 2,
      width: 52,
      padding: theme.spacing(1),
      backgroundColor: theme.themeColors.colorLikeButtonBackground,
      border: 'none',
      color: COLOR_NEUTRALS_4,

      '&.MuiButton-outlined': {
        backgroundColor: theme.themeColors.colorLikeButtonBackground,
        border: 'none',
      },
      '&.MuiButton-outlined:hover': {
        backgroundColor: theme.themeColors.colorLikeButtonBackground,
        border: 'none',
      },
      '& > svg': {
        marginRight: theme.spacing(0.5),
      },
      '&:hover': {
        color: COLOR_PRIMARY_1,
        '& > span > p': {
          color: COLOR_BLACK,
        },
      },
    })}
  >
    <HeartIcon sx={{ mr: 0.5 }} />
    <Typography variant="body1" className="s" lineHeight="18px !important">
      <Skeleton variant="text" width={16} />
    </Typography>
  </Button>
);

import { FC, useCallback, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { HeartIcon, HeartIconFilled } from 'components/Icon/components';
import { COLOR_BLACK, COLOR_NEUTRALS_4, COLOR_PRIMARY_1 } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { flexHelper } from 'utils';

export interface LikeButtonProps {
  onClick: (isLiked: boolean) => void;
  isLiked: boolean;
  likeCount: number;
  variant?: 'round' | 'square';
}

export const LikeButton: FC<LikeButtonProps> = ({ isLiked, likeCount, onClick, variant = 'square' }) => {
  const [isLocalLiked, setLocalLiked] = useState(isLiked);
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);

  const handleLikeClick = useCallback(
    (event: Event | React.SyntheticEvent) => {
      event.stopPropagation();
      setLocalLiked(!isLocalLiked);
      onClick(isLocalLiked);

      if (isLocalLiked) {
        setLocalLikeCount(localLikeCount - 1);
      }

      if (!isLocalLiked) {
        setLocalLikeCount(localLikeCount + 1);
      }
    },
    [isLocalLiked, localLikeCount, onClick],
  );

  return (
    <Button
      onClick={handleLikeClick}
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
          // color: theme.themeColors.colorLikeButtonFill,
        },
        '&:hover': {
          color: COLOR_PRIMARY_1,
          '& > span > p': {
            color: COLOR_BLACK,
          },
        },

        ...(variant === 'round' && {
          pt: 1.5,
          width: 48,
          height: 48,
          borderRadius: '50%',
          ...flexHelper(),
          flexDirection: 'column',
          lineHeight: '16px',
          '& > svg': {
            marginRight: 0,
          },
        }),
        ...(isLocalLiked && {
          color: COLOR_PRIMARY_1,
        }),
      })}
    >
      {isLocalLiked ? (
        <HeartIconFilled
          sx={(theme) => ({
            marginRight: theme.spacing(0.5),
          })}
        />
      ) : (
        <HeartIcon
          sx={{
            mr: 0.5,
          }}
        />
      )}
      <Typography
        variant="body1"
        className="s"
        sx={(theme) => ({
          width: 'fit-content',
          ...(variant === 'round' && {
            lineHeight: '16px !important',
            width: '100%',
            textAlign: 'center !important',
          }),
          '&.MuiTypography-root ': {
            fontWeight: FontWeights.fontWeightMedium,
            textAlign: 'right',
            color: theme.themeColors.colorLikeButtonFill,
            lineHeight: '18px',
          },
        })}
      >
        {localLikeCount}
      </Typography>
    </Button>
  );
};

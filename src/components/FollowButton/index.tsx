import { useEffect, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { Add, CheckIcon } from 'components/Icon/components';
import { COLOR_NEUTRALS_4 } from 'theme/colors';

type Variant = 'iconButton' | 'button';

export interface FollowButtonProps {
  isFollowing: boolean;
  onClick: (isFollowing: boolean) => void;
  variant?: Variant;
}

export const FollowButton = ({ isFollowing, onClick, variant = 'iconButton' }: FollowButtonProps) => {
  const [isFollowingState, setIsFollowingState] = useState(isFollowing);

  useEffect(() => {
    setIsFollowingState(isFollowing);
  }, [isFollowing]);

  const handleClick = () => {
    onClick(isFollowingState);
    setIsFollowingState(!isFollowingState);
  };

  return (
    <>
      {variant === 'iconButton' && (
        <IconButton
          onClick={handleClick}
          sx={{
            border: 'none',
          }}
        >
          {isFollowingState ? (
            <CheckIcon sx={{ marginRight: 1.5, color: COLOR_NEUTRALS_4 }} />
          ) : (
            <Add sx={{ marginRight: 1.5, color: COLOR_NEUTRALS_4 }} />
          )}
        </IconButton>
      )}
      {variant === 'button' && (
        <Button onClick={handleClick} size="small" sx={{ width: '156px' }}>
          {isFollowingState ? 'Unfollow' : 'Follow'}
        </Button>
      )}
    </>
  );
};

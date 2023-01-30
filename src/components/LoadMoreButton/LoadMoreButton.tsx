import { FC } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { Spinner } from 'components/Spinner';

export type LoadMoreButtonProps = {
  isLoading?: boolean;
  onLoadMore: () => void;
  anchorEl?: (node?: Element | null | undefined) => void;
};

export const LoadMoreButton: FC<LoadMoreButtonProps & Pick<ButtonProps, 'sx'>> = ({
  isLoading,
  anchorEl,
  onLoadMore,
  sx,
}) => {
  return (
    <Button
      variant="outlined"
      ref={anchorEl}
      size="small"
      disabled={isLoading}
      onClick={onLoadMore}
      endIcon={isLoading ? <Spinner type="simple" /> : null}
      sx={{ fontSize: '14px', mt: 2, mx: 'auto', display: 'flex', ...sx }}
    >
      Load more
    </Button>
  );
};

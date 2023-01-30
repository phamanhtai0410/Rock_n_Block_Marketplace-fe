import { FC } from 'react';
import { Box, Button, SxProps, Theme } from '@mui/material';
import { Spinner } from 'components/Spinner';

export type FormButtonsProps = {
  isStatusRequest?: boolean;
  isEditPage?: boolean;
  onCancelClick: () => void;
  sx?: SxProps<Theme>;
};

export const FormButtons: FC<FormButtonsProps> = ({ isStatusRequest, onCancelClick, isEditPage, sx }) => {
  return (
    <Box sx={{ display: 'flex', gap: '14px', mt: 5, ...sx }}>
      <Button
        disabled={isStatusRequest}
        type="submit"
        sx={{ mr: 1.5 }}
        endIcon={isStatusRequest ? <Spinner type="simple" /> : null}
      >
        {isEditPage ? 'Save' : 'Apply'}
      </Button>
      <Button disabled={isStatusRequest} onClick={onCancelClick} variant="outlined">
        Cancel
      </Button>
    </Box>
  );
};

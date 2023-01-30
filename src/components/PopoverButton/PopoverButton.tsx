import { FC, PropsWithChildren, RefObject } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Button, ButtonProps, Popover } from '@mui/material';

export enum VariantValues {
  more,
  text,
}

export type VariantProps = keyof typeof VariantValues;

export interface ButtonInnerPopoverProps {
  buttonVariant?: VariantProps;
  togglePopover: () => void;
  handleClosePopover: () => void;
  isOptionsOpen: boolean;
  popoverButtonRef: RefObject<HTMLButtonElement>;
}

export const PopoverButton: FC<ButtonInnerPopoverProps & PropsWithChildren & ButtonProps> = ({
  buttonVariant = 'more',
  children,
  isOptionsOpen,
  popoverButtonRef,
  togglePopover,
  handleClosePopover,
  ...buttonProps
}) => {
  return (
    <Box>
      <Button
        sx={{
          marginLeft: 1,
          minWidth: '40px',
          padding: 0,
        }}
        ref={popoverButtonRef}
        size="small"
        variant="contained"
        color="secondary"
        onClick={togglePopover}
        {...buttonProps}
      >
        {buttonVariant === 'more' ? <MoreHorizIcon /> : 'Edit Cover'}
      </Button>
      <Popover
        sx={{ borderRadius: '12px', padding: 1.5, mt: 1 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={popoverButtonRef.current}
        open={isOptionsOpen}
        onClose={handleClosePopover}
      >
        {children}
      </Popover>
    </Box>
  );
};

import { FC, PropsWithChildren, RefObject } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button, ButtonProps, Menu } from '@mui/material';

export type MenuButtonProps = {
  toggleMenu: () => void;
  handleCloseMenu: () => void;
  isMenuOpen: boolean;
  menuButtonRef: RefObject<HTMLButtonElement>;
};

export const MenuButton: FC<MenuButtonProps & PropsWithChildren & ButtonProps> = ({
  children,
  isMenuOpen,
  menuButtonRef,
  toggleMenu,
  handleCloseMenu,
  ...buttonProps
}) => {
  return (
    <>
      <Button
        sx={{
          marginLeft: 1,
          minWidth: '40px',
          padding: 0,
        }}
        ref={menuButtonRef}
        size="small"
        variant="contained"
        color="secondary"
        onClick={toggleMenu}
        {...buttonProps}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        anchorEl={menuButtonRef.current}
        open={isMenuOpen}
        onClose={handleCloseMenu}
        MenuListProps={{ sx: { py: { xs: 1, sm: 1.75 } } }}
        PaperProps={{ sx: { marginTop: 2 } }}
      >
        {children}
      </Menu>
    </>
  );
};

import { FC, PropsWithChildren, useRef } from 'react';
import { Button, styled } from '@mui/material';
import { MenuButton } from 'components';
import { useModal } from 'hooks';
import { COLOR_NEUTRALS_4 } from 'theme/colors';

export const MenuItemButton = styled(Button)({
  padding: 0,
  color: COLOR_NEUTRALS_4,
  justifyContent: 'flex-start',
}) as typeof Button;

export const CategoryMenuButton: FC<PropsWithChildren> = ({ children }) => {
  const menuButtonRef = useRef(null);
  const [isMenuOpen, toggleMenu, handleCloseMenu] = useModal(false);

  return (
    <MenuButton
      toggleMenu={toggleMenu}
      handleCloseMenu={handleCloseMenu}
      isMenuOpen={isMenuOpen}
      menuButtonRef={menuButtonRef}
    >
      {children}
    </MenuButton>
  );
};

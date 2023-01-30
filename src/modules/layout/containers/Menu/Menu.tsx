import { FC, useRef } from 'react';
import { Button } from '@mui/material';
import { useModal } from 'hooks';

import { Burger } from './MenuBurger';
import { MenuPopover } from './Popover';

export const Menu: FC = () => {
  const popoverRef = useRef(null);
  const [isMenuVisible, onOpenMenu, onCloseMenu] = useModal(false);

  return (
    <>
      <Button
        sx={{
          px: 2,
          py: 2.25,
          minWidth: '56px',
        }}
        ref={popoverRef}
        onClick={onOpenMenu}
      >
        <Burger isMenuVisible={isMenuVisible} />
      </Button>

      {isMenuVisible && <MenuPopover visible={isMenuVisible} anchorEl={popoverRef} onClose={onCloseMenu} />}
    </>
  );
};

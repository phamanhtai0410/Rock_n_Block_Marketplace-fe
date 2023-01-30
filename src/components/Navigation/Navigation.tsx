import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, BoxProps, IconButton, Menu, MenuItem } from '@mui/material';
import { routes } from 'appConstants';
import { Burger } from 'components/Icon/components';

import { formatRoutesToArr } from '../../modules/router/utils/formatRoutesToArr';

export const Navigation: FC<BoxProps> = ({ ...boxProps }) => {
  const navigate = useNavigate();

  const anchorRef = useRef(null);
  const navItemRef = useRef<null | string>(null);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleItemClick = (path: string) => {
    setOpen(false);
    navItemRef.current = path;
  };

  // set navItemRef (not to lose path ref) to local variable to further properly navigate after popover close, then clear it
  useEffect(() => {
    if (navItemRef.current) {
      const localRef = navItemRef.current;
      navItemRef.current = null;
      navigate(localRef);
    }
  }, [open]);

  return (
    <Box {...boxProps}>
      <IconButton ref={anchorRef} onClick={handleClick}>
        <Burger />
      </IconButton>
      <Menu anchorEl={anchorRef.current} open={open} onClose={handleClose} PaperProps={{ sx: { marginTop: 2 } }}>
        {formatRoutesToArr(routes).map(
          ({ root: { path, title, isNavItem, isDynamic } }) =>
            isNavItem &&
            !isDynamic && (
              <MenuItem key={path} onClick={() => handleItemClick(path)}>
                {title}
              </MenuItem>
            ),
        )}
      </Menu>
    </Box>
  );
};

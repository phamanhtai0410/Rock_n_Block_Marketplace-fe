import { FC, RefObject } from 'react';
import { Button, Grid, Popover, styled, Typography } from '@mui/material';
import { routes } from 'appConstants';
import { Close } from 'components/Icon/components';
import { COLOR_BLACK, COLOR_GREEN, COLOR_WHITE } from 'theme/colors';
import { FontWeights } from 'theme/Typography';
import { BORDER_MAIN, BORDER_RADIUS_SMALL } from 'theme/variables';

import { formatRoutesToArr } from '../../../../router/utils/formatRoutesToArr';

type LinkItemProps = {
  isActive?: boolean;
};

const LinkItem = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<LinkItemProps>(({ isActive }) => ({
  px: 2,
  height: '44px',
  display: 'flex',
  alignItems: 'center',
  fontSize: '17px',
  lineHeight: '24px',
  justifyContent: 'center',
  fontWeight: FontWeights.fontWeightRegular,
  textTransform: 'none',
  color: isActive ? COLOR_GREEN : COLOR_BLACK,
  textDecoration: isActive ? 'underline' : 'none',
}));

type MenuPopoverProps = {
  visible: boolean;
  anchorEl: RefObject<HTMLElement>;
  onClose: () => void;
};

export const MenuPopover: FC<MenuPopoverProps> = ({ visible, anchorEl, onClose }) => {
  return (
    <Popover
      anchorEl={anchorEl.current}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={visible}
      onClose={onClose}
      sx={{
        '& .MuiPopover-paper': {
          mt: 1,
          pt: 1,
          pb: 2.5,
          width: '189px',
          height: '280px',
          background: COLOR_WHITE,
          borderRadius: BORDER_RADIUS_SMALL,
        },
      }}
    >
      <Grid container direction="column" justifyContent="center" alignItems="flex-start">
        <Grid
          item
          container
          justifyContent="space-between"
          alignItems="center"
          xs={12}
          sx={{ borderBottom: BORDER_MAIN }}
        >
          <Typography variant="body1" className="m" fontWeight={FontWeights.fontWeightRegular} px={2}>
            Menu
          </Typography>
          <Button variant="text" startIcon={<Close />} onClick={onClose} />
        </Grid>
        {formatRoutesToArr(routes).map(
          ({ root, title }, id) =>
            root !== routes.home.root && (
              // eslint-disable-next-line react/no-array-index-key
              <Button key={id} variant="text" onClick={onClose} sx={{ p: 0, width: '100%' }} />
            ),
        )}
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          sx={(theme) => ({
            margin: '0 auto',
            fontSize: '16px',
            p: theme.spacing(0, 1),
            minWidth: 0,
            textTransform: 'lowercase',
            height: '31px',
          })}
        >
          Language
        </Button>
      </Grid>
    </Popover>
  );
};

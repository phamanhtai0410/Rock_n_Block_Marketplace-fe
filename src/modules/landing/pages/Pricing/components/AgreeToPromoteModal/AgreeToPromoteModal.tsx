import { FC } from 'react';
import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Modal } from 'components';

export type AgreeToPromoteModalTypes = {
  visible: boolean;
  onClose: () => void;
  onChangeAgree: (isAgree: boolean) => void;
};

export const AgreeToPromoteModal: FC<AgreeToPromoteModalTypes> = ({ visible, onClose, onChangeAgree }) => {
  const theme = useTheme();
  const isUpMedium = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Modal open={visible} onClose={onClose}>
      <Box
        sx={{
          padding: { xs: 3, md: 4 },
          backgroundColor: theme.themeColors.colorFooterBackground,
          borderRadius: 8,
          mt: 5,
        }}
      >
        <Typography
          className={isUpMedium ? 'xl' : ''}
          sx={{ width: '80%', textAlign: 'center', margin: 'auto', marginBottom: 3 }}
        >
          There are no available seats for Featured Listing right now. Your token will be queued and listed later.
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 2 }} sx={{ justifyContent: 'center' }}>
          <Button sx={{ width: { xs: '100%', md: 128 } }} onClick={() => onChangeAgree(true)}>
            Agree
          </Button>
          <Button variant="outlined" sx={{ width: { xs: '100%', md: 128 } }} onClick={() => onChangeAgree(false)}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

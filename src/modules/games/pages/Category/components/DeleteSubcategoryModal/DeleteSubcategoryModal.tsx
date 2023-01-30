import { FC } from 'react';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { Modal } from 'components';
import { Trash } from 'components/Icon/components';
import { COLOR_NEUTRALS_4 } from 'theme/colors';
import { BORDER_RADIUS_LARGE } from 'theme/variables';

export type DeleteItemProps = {
  id: number | string;
  name: string;
};

export type DeleteSubcategoryModalProps = {
  open: boolean;
  onClose: () => void;
  onDelete: (id: number | string) => void;
  deletedItemProps: DeleteItemProps;
};

export const DeleteSubcategoryModal: FC<DeleteSubcategoryModalProps> = ({
  open,
  onClose,
  deletedItemProps: { id, name },
  onDelete,
}) => {
  const theme = useTheme();

  const handleAgreeClick = () => {
    onClose();
    onDelete(id);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Stack
        sx={{
          pb: 5,
          backgroundColor: theme.themeColors.colorDialogBackground,
          borderRadius: BORDER_RADIUS_LARGE,
        }}
      >
        <Box
          sx={{
            width: 75,
            height: 75,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.themeColors.colorIconButtonSquareBackground,
            borderRadius: '50%',
            alignSelf: 'center',
            mb: 2,
          }}
        >
          <Trash sx={{ fill: 'none', color: COLOR_NEUTRALS_4 }} />
        </Box>
        <Typography maxWidth={270} textAlign="center">{`Are you sure that you want to delete ${name}?`}</Typography>

        <Stack direction="row" spacing={{ xs: 1, md: 2 }} mt={4} sx={{ justifyContent: 'center' }}>
          <Button onClick={handleAgreeClick} sx={{ height: 48 }}>
            Agree
          </Button>

          <Button variant="outlined" onClick={onClose} sx={{ height: 48 }}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

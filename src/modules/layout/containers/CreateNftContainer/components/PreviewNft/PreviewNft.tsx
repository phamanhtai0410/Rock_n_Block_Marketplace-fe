import { FC } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Avatar, Card, Icon, Modal } from 'components';
import { COLOR_NEUTRALS_3, COLOR_NEUTRALS_4, COLOR_NEUTRALS_10, COLOR_PRIMARY_1 } from 'theme/colors';
import { shortenName } from 'utils/shortenName';

export interface PreviewNftProps {
  name: string;
  preview: File | undefined | null;
  onClear: () => void;
  price?: string;
  mode?: 'default' | 'modal';
  withoutBorder?: boolean;
  currency?: string;
  open?: boolean;
  userName?: string;
  onClose?: () => void;
}

export const PreviewNft: FC<PreviewNftProps> = ({
  name,
  price,
  preview,
  onClear,
  currency,
  withoutBorder,
  mode = 'default',
  open = false,
  userName,
  onClose = () => {},
}) => {
  const content = (
    <>
      <Typography sx={{ fontSize: '24px', fontWeight: 600, mb: 3 }}>Preview</Typography>
      <Card sx={{ px: 2, py: 1.5, mb: 3 }}>
        <Stack alignItems="center" direction="row" spacing={1} sx={{ mb: 1.5 }}>
          <Avatar name={shortenName(userName)} />
        </Stack>
        <Box
          sx={{
            maxWidth: '235px',
            height: '220px',
            borderRadius: '16px',
            background: COLOR_NEUTRALS_10,
            mb: 1.5,
            overflow: 'hidden',
          }}
        >
          {preview && (
            <Box
              component="img"
              sx={{ width: '100%', height: '100%', objectFit: 'cover', verticalAlign: 'bottom' }}
              src={URL.createObjectURL(preview)}
            />
          )}
        </Box>
        <Stack
          sx={{ pb: 2, borderBottom: `1px solid ${COLOR_NEUTRALS_3}`, mb: 1 }}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography maxWidth="120px" noWrap>
            {name || 'Token name'}
          </Typography>
          {price && (
            <Box
              sx={{
                border: `2px solid ${COLOR_PRIMARY_1}`,
                borderRadius: '6px',
                py: 0.5,
                px: 1,
                fontSize: '12px',
                fontWeight: 700,
                color: COLOR_PRIMARY_1,
              }}
            >
              {price || '0.00'} {currency}
            </Box>
          )}
        </Stack>
        <Typography sx={{ fontSize: '12px', fontWeight: 600, color: COLOR_NEUTRALS_4 }}>Id #123556</Typography>
      </Card>
      <Button
        onClick={onClear}
        sx={{ p: 0 }}
        variant="text"
        startIcon={<Icon.CrossInRound sx={{ color: COLOR_NEUTRALS_4 }} />}
      >
        <Typography color={COLOR_NEUTRALS_4}>Clear</Typography>
      </Button>
    </>
  );

  if (mode === 'default') {
    return (
      <Box
        sx={{
          border: !withoutBorder ? `1px solid ${COLOR_NEUTRALS_3}` : 'none',
          borderRadius: '20px',
          px: !withoutBorder ? 6 : 0,
          py: !withoutBorder ? 4 : 0,
          minWidth: '352px',
          height: 'fit-content',
          position: 'sticky',
          top: '20px',
        }}
      >
        {content}
      </Box>
    );
  }

  return (
    <Modal sx={{ minWidth: '320px' }} closable open={open} onClose={onClose}>
      {content}
    </Modal>
  );
};

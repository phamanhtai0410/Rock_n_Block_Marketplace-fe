import { FC, PropsWithChildren, ReactNode } from 'react';
import { Box, BoxProps, Dialog, Grid, IconButton, PaperProps, Typography, useTheme } from '@mui/material';
import { CrossInRound, CrossInRoundThin } from 'components/Icon/components';
import { FontWeights } from 'theme/Typography';

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  closable?: boolean;
  title?: string | ReactNode;
  isThinCross?: boolean;
  sx?: PaperProps['sx'];
  contentSx?: BoxProps['sx'];
};

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  open,
  onClose,
  closable = true,
  isThinCross = true,
  title,
  children,
  sx,
  contentSx,
}) => {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      transitionDuration={{
        enter: 250,
        exit: 100,
      }}
      PaperProps={{
        sx: { ...sx, mx: 2 },
      }}
    >
      {title && (
        <Grid
          container
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          sx={{
            padding: theme.spacing(3, 3, 0),
            background: theme.themeColors.colorModalBackground,
          }}
        >
          <Grid item xs={10}>
            {typeof title === 'string' ? (
              <Typography variant="h4" fontWeight={FontWeights.fontWeightSemiBold}>
                {title}
              </Typography>
            ) : (
              title
            )}
          </Grid>
          {closable && (
            <Grid item>
              <IconButton
                size="small"
                onClick={onClose}
                sx={{
                  ...(isThinCross && {
                    border: `1px solid ${theme.themeColors.colorIconButtonBorder}`,
                    width: 40,
                    height: 40,
                  }),
                  borderRadius: '50%',
                  transition: '200ms',
                  '&:hover': {
                    transform: 'rotate(90deg)',
                  },
                }}
              >
                {isThinCross ? (
                  <CrossInRoundThin sx={{ width: '40px', height: '40px' }} />
                ) : (
                  <CrossInRound sx={{ width: '40px', height: '40px' }} />
                )}
              </IconButton>
            </Grid>
          )}
        </Grid>
      )}

      <Box
        sx={{
          padding: theme.spacing(3),
          background: theme.themeColors.colorModalBackground,
          ...contentSx,
        }}
      >
        {children}
      </Box>
    </Dialog>
  );
};

import React, { FC, useMemo, useState } from 'react';
import { Box, BoxProps, Divider, IconButton, Menu, MenuItem, styled, Typography, useTheme } from '@mui/material';
import { Facebook, Link as LinkIcon, Share, Twitter } from 'components/Icon/components';
import { FontWeights } from 'theme/Typography';

export interface ShareButtonProps {
  url: string;
  hasBackground?: boolean;
  variant?: 'square' | 'round';
}

const LinkTypography = styled(Typography)({
  fontWeight: FontWeights.fontWeightBold,
});

export const ShareButton: FC<ShareButtonProps & BoxProps> = ({ url, hasBackground = true, variant, ...boxProps }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = useMemo(() => !!anchorEl, [anchorEl]);

  const handleToggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (anchorEl) {
      setAnchorEl(null);
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(url);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box {...boxProps}>
      <IconButton
        className={hasBackground ? 'square' : ''}
        onClick={handleToggleMenu}
        sx={{
          border: 'none',
          ...(variant === 'round' && {
            pt: 1.5,
            width: 48,
            height: 48,
            borderRadius: '50% !important',
          }),
        }}
      >
        <Share />
      </IconButton>
      <Menu
        id="basic-menu"
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { padding: 0, '& ul': { background: theme.themeColors.colorModalBackground, border: 'none' } },
        }}
      >
        <MenuItem
          sx={{
            px: 1.75,
            pb: 1.5,
            pt: { xs: 1.5, sm: 2 },
            margin: 0,
            borderRadius: 0,
            '&:hover': {
              backgroundColor: theme.themeColors.colorShareButtonHover,
            },
          }}
          onClick={() => {
            handleClose();
            handleCopyAddress();
          }}
        >
          <LinkIcon
            sx={{
              width: '20px',
              height: '20px',
              color: theme.themeColors.colorShareButtonLink,
              marginRight: { xs: 1.5, sm: 2 },
            }}
          />
          <LinkTypography
            sx={{
              color: theme.themeColors.colorShareButtonLink,
              width: '20px',
              height: '20px',
              marginRight: theme.spacing(2),
            }}
          >
            Copy link
          </LinkTypography>
        </MenuItem>
        <Divider
          color={theme.themeColors.colorShareButtonItem}
          variant="middle"
          sx={{ '&.MuiDivider-root': { margin: theme.spacing(0, 2) } }}
        />
        <MenuItem
          onClick={handleClose}
          sx={{
            px: 1.75,
            pb: 1.5,
            pt: { xs: 1.5, sm: 2 },
            margin: 0,
            borderRadius: 0,
            '&:hover': {
              backgroundColor: theme.themeColors.colorShareButtonHover,
            },
          }}
        >
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'flex' }}
          >
            <Facebook
              sx={{
                width: '20px',
                height: '20px',
                color: theme.themeColors.colorShareButtonLink,
                marginRight: { xs: 1.5, sm: 2 },
              }}
            />
            <LinkTypography
              sx={{
                color: theme.themeColors.colorShareButtonLink,
              }}
            >
              Share Facebook
            </LinkTypography>
          </a>
        </MenuItem>
        <Divider
          color={theme.themeColors.colorShareButtonItem}
          variant="middle"
          sx={{ '&.MuiDivider-root': { margin: theme.spacing(0, 2) } }}
        />
        <MenuItem
          onClick={handleClose}
          sx={{
            px: 1.75,
            pb: 1.5,
            pt: { xs: 1.5, sm: 2 },
            margin: 0,
            borderRadius: 0,
            '&:hover': {
              backgroundColor: theme.themeColors.colorShareButtonHover,
            },
          }}
        >
          <a
            className="twitter-share-button"
            href={`https://twitter.com/intent/tweet?text=${url}`}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'flex' }}
          >
            <Twitter
              sx={{
                width: '20px',
                height: '20px',
                color: theme.themeColors.colorShareButtonLink,
                marginRight: { xs: 1.5, sm: 2 },
              }}
            />
            <LinkTypography
              sx={{
                color: theme.themeColors.colorShareButtonLink,
              }}
            >
              Share Twitter
            </LinkTypography>
          </a>
        </MenuItem>
      </Menu>
    </Box>
  );
};

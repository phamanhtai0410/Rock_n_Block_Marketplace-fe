import { FC, ReactNode, useEffect, useState } from 'react';
import { Box, Button, ButtonProps, Typography } from '@mui/material';
import { CSSProperties } from '@mui/material/styles/createTypography';
import { Copy as CopyIcon } from 'components/Icon/components';
import { getToastMessage } from 'utils';

type Variant = 'input' | 'icon';
export interface CopyProps {
  variant?: Variant;
  copyText: string;
  children?: ReactNode;
}

const COPY_TEXT_SHOW_TIME = 2000;

export const Copy: FC<CopyProps & Pick<ButtonProps, 'sx'>> = ({ variant = 'input', copyText, children, sx }) => {
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setHelperText('');
    }, COPY_TEXT_SHOW_TIME);
    return () => clearTimeout(timer);
  }, [helperText]);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      getToastMessage('success', 'Copied');
    } catch (err) {
      getToastMessage('error', 'Not copied!');
    }
  };
  return (
    <>
      {variant === 'input' && (
        <Button
          variant="outlined"
          sx={(theme) => {
            const styles = {
              padding: theme.spacing(1.5, 2),
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: '46px',
              fontSize: '14px',
              borderRadius: '12px',
              cursor: 'pointer',
              backgroundColor: theme.themeColors.colorTextFieldBackground,
              ...(sx as CSSProperties),
            };
            return { ...styles };
          }}
          onClick={handleCopyAddress}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{children}</span>
          {helperText && (
            <Typography
              className="s"
              sx={{
                position: 'absolute',
                bottom: -4,
                left: '50%',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textTransform: 'none',
              }}
            >
              {helperText}
            </Typography>
          )}
          <CopyIcon sx={{ ml: 1 }} />
        </Button>
      )}
      {variant === 'icon' && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {children}
          <Button
            variant="text"
            startIcon={<CopyIcon />}
            sx={{
              p: 0,
              height: 'fit-content',
            }}
            onClick={handleCopyAddress}
          />
        </Box>
      )}
    </>
  );
};

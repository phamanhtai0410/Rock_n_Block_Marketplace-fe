import { ChangeEvent, FC } from 'react';
import { Box, Button, styled, TextField, useTheme } from '@mui/material';
import { CheckIcon, Rocket } from 'components/Icon/components';
import { COLOR_SUCCESS } from 'theme/colors';

const BORDER_RADIUS_INNER_BUTTON = '0 4px 4px 0';
const BORDER_RADIUS_INPUT = '4px 0 0 4px';

export const TexfieldStyled = styled(TextField)(({ theme }) => ({
  width: '100%',
  input: {
    padding: theme.spacing(1, 2),
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: BORDER_RADIUS_INPUT,
    background: theme.themeColors.colorInputInnerButtonBackground,
    minHeight: '44px !important',
    '& fieldset': { border: 0 },
    '&.Mui-focused fieldset': { border: 0 },
  },
}));

export const ButtonStyled = styled(Button)(({ theme }) => ({
  minWidth: '48px',
  padding: theme.spacing(1.25),
  borderRadius: BORDER_RADIUS_INNER_BUTTON,
  height: 'auto',
  '&::before': { border: 0 },
}));

export type InputInnerButtonProps = {
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubscribe: () => void;
  isSubscribeSuccess: boolean;
};

export const InputInnerButton: FC<InputInnerButtonProps> = ({ value, onChange, onSubscribe, isSubscribeSuccess }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <TexfieldStyled value={value} onChange={onChange} placeholder="info@youmail.com" />

      {isSubscribeSuccess ? (
        <ButtonStyled
          variant="contained"
          size="small"
          sx={{
            background: COLOR_SUCCESS,
            pointerEvents: 'none',
          }}
          className="secondary"
        >
          <CheckIcon />
        </ButtonStyled>
      ) : (
        <ButtonStyled variant="contained" size="small" onClick={onSubscribe}>
          <Rocket />
        </ButtonStyled>
      )}
    </Box>
  );
};

import { styled, Typography } from '@mui/material';
import { COLOR_NEUTRALS_5 } from 'theme/colors';

export const TextFieldLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isRegular',
})<{ isRegular?: boolean }>(({ theme, isRegular }) => ({
  textTransform: 'uppercase',
  mb: theme.spacing(1.5),
  color: COLOR_NEUTRALS_5,
  fontWeight: isRegular ? 400 : 700,
  fontSize: 12,
}));

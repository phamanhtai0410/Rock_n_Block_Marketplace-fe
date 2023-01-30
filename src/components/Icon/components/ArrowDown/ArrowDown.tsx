import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const ArrowDown: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 12 8"
    sx={{
      ...sx,
      width: '12px',
      height: '8px',
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.351472 0.751466C0.820101 0.282837 1.5799 0.282837 2.04853 0.751466L6 4.70294L9.95147 0.751466C10.4201 0.282837 11.1799 0.282837 11.6485 0.751466C12.1172 1.22009 12.1172 1.97989 11.6485 2.44852L6.84853 7.24852C6.3799 7.71715 5.6201 7.71715 5.15147 7.24852L0.351472 2.44852C-0.117157 1.97989 -0.117157 1.22009 0.351472 0.751466Z"
      fill="currentColor"
    />
  </SvgIcon>
);

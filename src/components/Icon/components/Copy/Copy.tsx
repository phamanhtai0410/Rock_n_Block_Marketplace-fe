import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const Copy: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 18 18"
    sx={{
      ...sx,
      width: '18px',
      height: '18px',
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 3C0 1.34315 1.34315 0 3 0H11C12.6569 0 14 1.34315 14 3V4H15C16.6569 4 18 5.34315 18 7V15C18 16.6569 16.6569 18 15 18H7C5.34315 18 4 16.6569 4 15V14H3C1.34315 14 0 12.6569 0 11V3ZM6 15C6 15.5523 6.44772 16 7 16H15C15.5523 16 16 15.5523 16 15V7C16 6.44772 15.5523 6 15 6H7C6.44772 6 6 6.44772 6 7V15ZM12 4H7C5.34315 4 4 5.34315 4 7V12H3C2.44772 12 2 11.5523 2 11V3C2 2.44772 2.44772 2 3 2H11C11.5523 2 12 2.44772 12 3V4Z"
      fill="currentColor"
    />
  </SvgIcon>
);

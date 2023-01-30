import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const Bid: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 25 24"
    sx={{
      ...sx,
      width: '25px',
      height: '24px',
    }}
  >
    <path
      d="M6.75 11L7.75 12M13.25 17.5L12.25 16.5M7.75 12L14.75 5L19.25 9.5M7.75 12L12.25 16.5M19.25 9.5L20.25 10.5L13.75 4M19.25 9.5L15.75 13M12.25 16.5L15.75 13M15.75 13L20.75 18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path d="M4.25 20H13.75" stroke="currentColor" strokeWidth="2" />
  </SvgIcon>
);

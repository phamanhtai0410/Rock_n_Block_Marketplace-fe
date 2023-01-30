import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const PlayForward: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 24 24"
    sx={{
      ...sx,
      width: '24px',
      height: '24px',
      path: {
        stroke: 'currentColor',
        fill: 'currentColor',
      },
    }}
  >
    <path
      d="M0 6.20132C0 4.61116 1.76595 3.65695 3.09605 4.5284L11.9466 10.327C13.1519 11.1167 13.1519 12.8832 11.9466 13.6729L3.09605 19.4715C1.76595 20.3429 0 19.3887 0 17.7986V6.20132Z"
      fill="currentColor"
    />
    <path
      d="M11 6.20132C11 4.61116 12.766 3.65695 14.0961 4.5284L22.9466 10.327C24.1519 11.1167 24.1519 12.8832 22.9466 13.6729L14.0961 19.4715C12.766 20.3429 11 19.3887 11 17.7986V6.20132Z"
      fill="currentColor"
    />
  </SvgIcon>
);

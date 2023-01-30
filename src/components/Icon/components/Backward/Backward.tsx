import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const Backward: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 24 24"
    sx={{
      ...sx,
      width: '24px',
      height: '24px',
      path: {
        // stroke: 'currentColor',
        fill: 'currentColor',
      },
    }}
  >
    <g clipPath="url(#clip0_1500_46164)">
      <path
        d="M23.8505 6.20132C23.8505 4.61116 22.0846 3.65695 20.7545 4.5284L11.9039 10.327C10.6987 11.1167 10.6987 12.8832 11.9039 13.6729L20.7545 19.4715C22.0846 20.3429 23.8505 19.3887 23.8505 17.7986V6.20132Z"
        fill="currentColor"
      />
      <path
        d="M12.8505 6.20132C12.8505 4.61116 11.0846 3.65695 9.75449 4.5284L0.903947 10.327C-0.301316 11.1167 -0.301315 12.8832 0.903948 13.6729L9.75449 19.4715C11.0846 20.3429 12.8505 19.3887 12.8505 17.7986V6.20132Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_1500_46164">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </SvgIcon>
);

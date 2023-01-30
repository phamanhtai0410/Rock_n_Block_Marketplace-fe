import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const Warning: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 60 60"
    sx={{
      ...sx,
      width: '60px',
      height: '60px',
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60ZM25.6419 13.2953H34.3497L33.5533 37.8953H26.4382L25.6419 13.2953ZM34.5055 44.7508C34.4709 47.2437 32.3761 49.2519 30.0044 49.2519C27.5115 49.2519 25.4687 47.2437 25.5034 44.7508C25.4687 42.2925 27.5115 40.3017 30.0044 40.3017C32.3761 40.3017 34.4709 42.2925 34.5055 44.7508Z"
      fill="url(#paint0_linear_1410_10892)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1410_10892"
        x1="13.2597"
        y1="-7.92453"
        x2="49.2723"
        y2="4.60433"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6345ED" />
        <stop offset="1" stopColor="#E039FD" />
      </linearGradient>
    </defs>
  </SvgIcon>
);

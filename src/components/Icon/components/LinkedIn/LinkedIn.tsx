import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const LinkedIn: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 12 12"
    sx={{
      ...sx,
      width: '12px',
      height: '12px',
    }}
  >
    <g clipPath="url(#clip0_1557_4445)">
      <path
        d="M11.9969 12.0001V11.9996H11.9999V7.59861C11.9999 5.44561 11.5364 3.78711 9.01939 3.78711C7.80939 3.78711 6.99739 4.45111 6.66589 5.08061H6.63089V3.98811H4.24438V11.9996H6.72939V8.03261C6.72939 6.98811 6.92739 5.97811 8.22089 5.97811C9.49539 5.97811 9.51439 7.17011 9.51439 8.09961V12.0001H11.9969Z"
        fill="#E5E5E5"
      />
      <path d="M0.197998 3.98828H2.686V11.9998H0.197998V3.98828Z" fill="#E5E5E5" />
      <path
        d="M1.441 0C0.6455 0 0 0.6455 0 1.441C0 2.2365 0.6455 2.8955 1.441 2.8955C2.2365 2.8955 2.882 2.2365 2.882 1.441C2.8815 0.6455 2.236 0 1.441 0V0Z"
        fill="#E5E5E5"
      />
    </g>
    <defs>
      <clipPath id="clip0_1557_4445">
        <rect width="12" height="12" fill="white" />
      </clipPath>
    </defs>
  </SvgIcon>
);

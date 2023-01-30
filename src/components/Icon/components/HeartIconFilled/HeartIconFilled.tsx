import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const HeartIconFilled: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 18 15"
    sx={{
      width: '18px',
      height: '15px',
      ...sx,
    }}
  >
    <path
      d="M9 1.53507C8.09754 0.653116 6.87229 0.111084 5.52273 0.111084C2.74875 0.111084 0.5 2.40113 0.5 5.22605C0.5 10.2373 5.88617 13.0047 8.08338 13.9252C8.67512 14.1731 9.32488 14.1731 9.91662 13.9252C12.1138 13.0047 17.5 10.2373 17.5 5.22605C17.5 2.40113 15.2512 0.111084 12.4773 0.111084C11.1277 0.111084 9.90246 0.653116 9 1.53507Z"
      fill="#E039FD"
    />
  </SvgIcon>
);

import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const Play: FC<SvgIconProps> = ({ sx, ...props }) => (
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
      d="M3.69922 4.38562C3.69922 2.03509 6.27971 0.597611 8.27828 1.83482L20.5787 9.44937C22.4733 10.6222 22.4733 13.3781 20.5787 14.551L8.27828 22.1655C6.27971 23.4027 3.69922 21.9652 3.69922 19.6147V4.38562Z"
      fill="currentColor"
    />
  </SvgIcon>
);

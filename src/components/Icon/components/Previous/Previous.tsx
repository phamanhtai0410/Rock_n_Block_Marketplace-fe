import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const Previous: FC<SvgIconProps> = ({ sx, ...props }) => (
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
      d="M22.0007 3.99997C22.0007 2.35188 20.1191 1.41111 18.8007 2.39997L8.13398 10.4C7.06732 11.2 7.06732 12.8 8.13398 13.6L18.8007 21.6C20.1191 22.5888 22.0007 21.6481 22.0007 20V3.99997Z"
      fill="currentColor"
    />
    <path
      d="M5 3.5C5 2.67157 4.32843 2 3.5 2C2.67157 2 2 2.67157 2 3.5V20.5C2 21.3284 2.67157 22 3.5 22C4.32843 22 5 21.3284 5 20.5V3.5Z"
      fill="currentColor"
    />
  </SvgIcon>
);

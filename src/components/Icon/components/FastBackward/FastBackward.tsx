import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const FastBackward: FC<SvgIconProps> = ({ sx, ...props }) => (
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
      d="M21.666 3.5C21.666 2.67157 20.9944 2 20.166 2C19.3376 2 18.666 2.67157 18.666 3.5V20.5C18.666 21.3284 19.3376 22 20.166 22C20.9944 22 21.666 21.3284 21.666 20.5V3.5Z"
      fill="currentColor"
    />
    <path
      d="M16.6667 3.99997C16.6667 2.35188 14.7851 1.41111 13.4667 2.39997L2.8 10.4C1.73333 11.2 1.73333 12.8 2.8 13.6L13.4667 21.6C14.7851 22.5888 16.6667 21.6481 16.6667 20V3.99997Z"
      fill="currentColor"
    />
  </SvgIcon>
);

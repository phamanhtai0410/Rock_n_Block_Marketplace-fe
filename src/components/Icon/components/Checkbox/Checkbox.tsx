import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const Checkbox: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 24 24"
    sx={{
      ...sx,
      width: '24px',
      height: '24px',
    }}
  >
    <rect width="24" height="24" rx="4" fill="#E039FD" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.7071 7.29289C19.0976 7.68342 19.0976 8.31658 18.7071 8.70711L10.7071 16.7071C10.3166 17.0976 9.68342 17.0976 9.29289 16.7071L5.29289 12.7071C4.90237 12.3166 4.90237 11.6834 5.29289 11.2929C5.68342 10.9024 6.31658 10.9024 6.70711 11.2929L10 14.5858L17.2929 7.29289C17.6834 6.90237 18.3166 6.90237 18.7071 7.29289Z"
      fill="#FCFCFD"
    />
  </SvgIcon>
);

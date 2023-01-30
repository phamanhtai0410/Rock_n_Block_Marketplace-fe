import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const Loop: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    width={25}
    height={30}
    viewBox="0 0 20 20"
    sx={{
      width: '20px',
      height: '20px',
      ...sx,
    }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.9056 14.3199C11.551 15.3729 9.84871 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 9.84871 15.3729 11.551 14.3199 12.9056L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12.9056 14.3199ZM14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
      fill="currentColor"
    />
  </SvgIcon>
);

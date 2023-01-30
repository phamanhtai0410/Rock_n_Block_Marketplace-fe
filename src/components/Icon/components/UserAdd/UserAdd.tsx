import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const UserAdd: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 20 20"
    sx={{
      width: '20px',
      height: '20px',
      ...sx,
    }}
  >
    <path
      d="M16 6.99902V9.99902M16 9.99902V12.999M16 9.99902H19M16 9.99902H13M11 4.99902C11 7.20816 9.20914 8.99902 7 8.99902C4.79086 8.99902 3 7.20816 3 4.99902C3 2.78988 4.79086 0.999023 7 0.999023C9.20914 0.999023 11 2.78988 11 4.99902ZM1 17.999C1 14.6853 3.68629 11.999 7 11.999C10.3137 11.999 13 14.6853 13 17.999V17.999C13 18.5513 12.5523 18.999 12 18.999H2C1.44772 18.999 1 18.5513 1 17.999V17.999Z"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
);

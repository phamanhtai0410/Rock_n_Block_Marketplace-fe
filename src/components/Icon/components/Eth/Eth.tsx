import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const Eth: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 28 28"
    sx={{
      ...sx,
      width: '28px',
      height: '28px',
    }}
  >
    <path
      d="M14 28.001C21.732 28.001 28 21.733 28 14.001C28 6.26899 21.732 0.000976562 14 0.000976562C6.26801 0.000976562 0 6.26899 0 14.001C0 21.733 6.26801 28.001 14 28.001Z"
      fill="#627EEA"
    />
    <path d="M14.0864 4.90088V11.6271L19.7715 14.1674L14.0864 4.90088Z" fill="white" fillOpacity="0.602" />
    <path d="M14.0859 4.90088L8.40015 14.1674L14.0859 11.6271V4.90088Z" fill="white" />
    <path d="M14.0864 18.5262V23.0966L19.7753 15.2261L14.0864 18.5262Z" fill="white" fillOpacity="0.602" />
    <path d="M14.0862 23.0966V18.5255L8.40039 15.2261L14.0862 23.0966Z" fill="white" />
    <path d="M14.0864 17.4684L19.7715 14.1675L14.0864 11.6287V17.4684Z" fill="white" fillOpacity="0.2" />
    <path d="M8.40039 14.1675L14.0862 17.4684V11.6287L8.40039 14.1675Z" fill="white" fillOpacity="0.602" />
  </SvgIcon>
);

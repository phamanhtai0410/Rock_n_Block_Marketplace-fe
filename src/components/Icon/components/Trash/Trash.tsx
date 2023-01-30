import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const Trash: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 20 21"
    sx={{
      width: '20px',
      height: '21px',
      ...sx,
    }}
  >
    <path
      d="M15.834 6.33431L15.1112 16.4531C15.0489 17.3252 14.3232 18.001 13.4488 18.001H6.55252C5.67812 18.001 4.95238 17.3252 4.89009 16.4531L4.16732 6.33431M8.33398 9.66764V14.6676M11.6673 9.66764V14.6676M12.5007 6.33431V3.83431C12.5007 3.37407 12.1276 3.00098 11.6673 3.00098H8.33398C7.87375 3.00098 7.50065 3.37407 7.50065 3.83431V6.33431M3.33398 6.33431H16.6673"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIcon>
);

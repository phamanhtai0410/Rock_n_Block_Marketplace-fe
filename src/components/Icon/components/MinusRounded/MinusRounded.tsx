import { FC } from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { COLOR_NEUTRALS_4 } from 'theme/colors';

export const MinusRounded: FC<SvgIconProps> = ({ sx, fill = 'none', ...props }) => (
  <SvgIcon
    {...props}
    viewBox="0 0 20 20"
    sx={{
      color: COLOR_NEUTRALS_4,
      width: '20px',
      height: '20px',
      ...sx,
      '& > path': {
        fill,
      },
    }}
  >
    <path
      d="M13 10H7M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="currentColor"
    />
  </SvgIcon>
);
